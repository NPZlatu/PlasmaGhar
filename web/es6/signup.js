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
    this.model = this.getModel();
    this.onSignUpConfirmClick = this.onSignUpConfirmClick.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.setModalListeners = this.setModalListeners.bind(this);
    this.setUpListeners();
  }

  setUpListeners() {
    $(".confirm-signup").click(this.onSignUpConfirmClick);
    this.setUpOnBlurListeners();
    this.setModalListeners();
  }

  setModalListeners() {
    $("#signupModal").on("hidden.bs.modal", () => {
      this.resetForm();
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

  showError(selector, rules, index) {
    const element = $(`#${selector}`);
    const value = element.val();
    const errorElement = element.next();
    let message = "";
    let valid = true;

    if (!value && rules.required && rules.required.value) {
      valid = false;
      message = rules.required.error;
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
    this.model.map((v) => {
      const { selector } = v;
      $(`#${selector}`).val("");
    });
    $("invalid-feedback").hide();
  }

  onSignUpConfirmClick() {
    this.clicked = true;
    const valid = this.checkValidation();
    if (valid) {
      this.registerUser();
    }
  }

  registerUser() {
    const { model } = this;
    const data = {
      phone_number: model[0].value,
      password: model[1].value,
      user_role: $("input#gridRadios1:checked").val() ? 0 : 1,
    };

    axios.defaults.headers.post["X-CSRF-Token"] = $(
      'meta[name="csrf-token"]'
    ).attr("content");
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

    axios
      .post("/user/save", data)
      .then(({ data: response }) => {
        console.log(response);
        if (response && response.success) {
          this.resetForm();
          $("#signupModal").modal("hide");
          $.toaster({ settings: { timeout: 15000 } });

          $.toaster({
            priority: "success",
            title: "Success",
            message: `You are successfully registered, we have sent a confirmation link on your phone. 
          Please click on that link to verify your phone.`,
          });
        } else if (
          response &&
          response.error &&
          response.error === "exist already"
        ) {
          const errorElement = $("#phoneNumber").next();
          errorElement.text("User already exists with this phone number");
          errorElement.show();
        }
      })
      .catch(function (error) {
        console.log(error);
        $.toaster({ settings: { timeout: 5000 } });
        $.toaster({
          priority: "danger",
          title: "Error",
          message: `Something is wrong. Please try later`,
        });
      });
  }
}

$(document).ready(function () {
  new SignUp();
});
