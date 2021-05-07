/**
 * Class to handle signup actions
 */
class SignUp {
  getModel() {
    return [
      {
        selector: "phoneNumber",
        rules: {
          regex: {
            value: /^[0-9]{10}$/,
            error: "Phone Number must have 10 digits.",
          },
        },
        value: "",
      },
      {
        selector: "email",
        rules: {
          regex: {
            value: /\S+@\S+\.\S+/,
            error: "Valid email address is required.",
          },
        },
        value: "",
      },
      {
        selector: "bloodGroup",
        rules: {
          required: {
            value: true,
            conditions: [
              {
                selector: "input#gridRadios2:checked",
                value: true,
              },
            ],
            error: "Blood Group is required.",
          },
        },
        value: "",
      },

      {
        selector: "state",
        rules: {
          required: {
            value: true,
            error: "State is required.",
          },
        },
        value: "",
      },
      {
        selector: "district",
        rules: {
          required: {
            value: true,
            error: "District is required.",
          },
        },
        value: "",
      },
      {
        selector: "password",
        rules: {
          regex: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            error:
              "Password must be minimum eight characters, at least one letter and one number",
          },
        },
        value: "",
      },
      {
        selector: "confirm-password",
        rules: {
          match: {
            value: "password",
            error: "Confirm Password does not match.",
          },
        },
        value: "",
      },
    ];
  }

  constructor() {
    this.clicked = false;
    this.signUpProgress = false;
    this.states = [];
    this.model = this.getModel();
    this.onSignUpConfirmClick = this.onSignUpConfirmClick.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.setModalListeners = this.setModalListeners.bind(this);
    this.setUpListeners();
  }

  setUpListeners() {
    $(".confirm-signup").click(this.onSignUpConfirmClick);
    $(".signin-register").click(function () {
      $("#signupModal").modal("hide");
      if (!window.location.href.includes("/user/register")) {
        $("#signinModal").modal("show");
      } else {
        window.location.href = "/user/login";
      }
    });
    this.setUpOnBlurListeners();
    this.setUpOnChangeListeners();
    this.setModalListeners();
  }

  setModalListeners() {
    $("#signupModal").on("shown.bs.modal", () => {
      if (this.states.length === 0) this.requestStates();
      $("body").addClass("modal-open");
    });

    $("#signupModal").on("hidden.bs.modal", () => {
      if (window.location.href.includes("/user/register")) {
        window.location.href = "/";
      } else this.resetForm();
    });
  }

  setUpOnBlurListeners() {
    this.model.map((v, index) => {
      const { selector, rules } = v;
      const self = this;
      $(`#${selector}`).blur(function () {
        if (self.clicked) self.showError(selector, rules, index);
      });
    });
  }

  setUpOnChangeListeners() {
    const self = this;

    $("#state").on("change", function () {
      if (this.value) {
        const code = $("option:selected", this).data("code");
        console.log(code);
        self.requestDistricts(code);
      } else {
        $(".district-wrapper").hide();
      }
    });

    $("input#gridRadios2").on("click", function () {
      $("input#gridRadios1").prop("checked", false);
      $(".plasma-warning").hide();
      $(".confirm-health").hide();
      const errorElement = $("#bloodGroup").next();
      errorElement.text("");
      errorElement.hide();
    });

    $("input#gridRadios1").on("click", function () {
      $("input#gridRadios2").prop("checked", false);
      $(".plasma-warning").show();
      $(".confirm-health").show();
    });
  }

  showError(selector, rules, index) {
    const element = $(`#${selector}`);
    const value = element.val();
    const errorElement = element.next();
    let message = "";
    let valid = true;

    if (!value && rules.required && rules.required.value) {
      if (!rules.required.conditions) {
        valid = false;
        message = rules.required.error;
      } else {
        rules.required.conditions.forEach((cond) => {
          const selector = cond.selector;
          if (!$(selector).val()) {
            valid = false;
            message = rules.required.error;
          }
        });
      }
    } else if (rules.regex) {
      valid = new RegExp(rules.regex.value).test(value);
      if (rules.required && rules.required.value === false) {
        valid = !value || valid;
      }
      if (!valid) message = rules.regex.error;
    } else if (rules.match) {
      const matchSelectorVal = $(`#${rules.match.value}`).val();
      if (value !== matchSelectorVal) {
        valid = false;
        message = rules.match.error;
      }
    }
    if (!valid && message) {
      errorElement.text(message);
      errorElement.show();
    } else {
      errorElement.text("");
      errorElement.hide();
    }
    this.model[index].value = value;
    return valid;
  }

  checkValidation() {
    let valid = true;
    let retrunVal = true;
    for (let i = 0; i < this.model.length; i++) {
      const { selector, rules } = this.model[i];
      valid = this.showError(selector, rules, i);
      if (!valid) retrunVal = false;
    }
    return retrunVal;
  }

  resetForm() {
    this.model.forEach((v) => {
      const { selector } = v;
      $(`#${selector}`).val("");
      v.value = "";
    });
    $(".invalid-feedback").hide();
  }

  checkIfHealthConditionsFine() {
    let healthFine = false;
    const userRole = $("input#gridRadios1:checked").val() ? 0 : 1;
    if (userRole === 1) healthFine = true;
    else {
      if ($("#confirmHealth:checked").val()) {
        healthFine = true;
      } else {
        healthFine = false;
        $.toaster({ settings: { timeout: 5000 } });
        $.toaster({
          priority: "danger",
          title: "Confirm Health",
          message: `You must confirm that you do not have listed health conditions before signup.`,
        });
      }
    }
    return healthFine;
  }

  checkIfTermsAndConditionsAgreed() {
    let agree = true;
    if (!$("#terms:checked").val()) {
      $.toaster({ settings: { timeout: 5000 } });
      $.toaster({
        priority: "danger",
        title: "Terms and Conditions",
        message: `You must agree to our terms and conditions to proceed further.`,
      });
      agree = false;
    }
    return agree;
  }

  onSignUpConfirmClick() {
    this.clicked = true;
    const valid = this.checkValidation();
    if (valid && !this.signUpProgress) {
      if (this.checkIfHealthConditionsFine()) {
        if (this.checkIfTermsAndConditionsAgreed()) this.registerUser();
      }
    }
  }

  requestStates() {
    axios
      .get("/address/get-states")
      .then(({ data: states }) => {
        if (states && states.length > 0) {
          this.states = states;
          this.populateStates();
        }
      })
      .catch(function (error) {});
  }

  requestDistricts(stateCode) {
    axios
      .get(`/address/get-districts?code=${stateCode}`)
      .then(({ data: districts }) => {
        if (districts && districts.length > 0) {
          this.populateDistricts(districts);
        }
      })
      .catch(function (error) {});
  }

  populateStates() {
    const { states } = this;
    $("#state").html("");
    let options = "<option selected value>SELECT STATE</option>";

    for (let i = 0; i < states.length; i++) {
      options += `<option data-code=${states[i].code} value=${states[i].name}>${states[i].name}</option>`;
    }
    $("#state").append(options);
  }

  populateDistricts(districts) {
    $("#district").html("");
    let options = "<option selected value>SELECT DISTRICT</option>";
    for (let i = 0; i < districts.length; i++) {
      options += `<option data-code=${districts[i].code} value=${districts[i].name}>${districts[i].name}</option>`;
    }
    $(".district-wrapper").show();
    $("#district").append(options);
  }

  registerUser() {
    const { model } = this;
    this.signUpProgress = true;
    const data = {
      phone_number: model[0].value,
      email: model[1].value,
      blood_group: model[2].value,
      state: model[3].value,
      district: model[4].value,
      password: model[5].value,
      user_role: $("input#gridRadios1:checked").val() ? 0 : 1,
    };

    axios
      .post("/user/save", data)
      .then(({ data: response }) => {
        if (response && response.success) {
          this.resetForm();
          $("#signupModal").modal("hide");
          $.toaster({ settings: { timeout: 15000 } });

          $.toaster({
            priority: "success",
            title: "Success",
            message: `You are successfully registered, we have sent a confirmation link on your email. 
          Please click on that link to verify your email.          `,
          });
          this.signUpProgress = false;
        } else if (
          response &&
          response.error &&
          response.error === "exist already"
        ) {
          const errorElement = $("#email").next();
          errorElement.text("User already exists with this email");
          errorElement.show();
          $.toaster({ settings: { timeout: 5000 } });
          $.toaster({
            priority: "danger",
            title: "Error",
            message: `The user already exists with the email`,
          });
          this.signUpProgress = false;
        }
      })
      .catch(function (_error) {
        $.toaster({ settings: { timeout: 5000 } });
        $.toaster({
          priority: "danger",
          title: "Error",
          message: `Something is wrong. Please try later`,
        });
        this.signUpProgress = false;
      });
  }
}

$(document).ready(function () {
  axios.defaults.headers.post["X-CSRF-Token"] = $(
    'meta[name="csrf-token"]'
  ).attr("content");
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

  new SignUp();
});
