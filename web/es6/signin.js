class SignIn {
  constructor() {
    this.clicked = false;
    this.model = [
      {
        selector: "loginEmail",
        rules: {
          regex: {
            value: /\S+@\S+\.\S+/,
            error: "Valid email address is required.",
          },
        },
        value: "",
      },
      {
        selector: "loginPassword",
        rules: {
          required: {
            value: true,
            error: "Password is required.",
          },
        },
        value: "",
      },
    ];
    this.onSignInConfirmClick = this.onSignInConfirmClick.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.setModalListeners = this.setModalListeners.bind(this);
    this.setUpListeners();
  }

  setUpListeners() {
    $(".confirm-signin").click(this.onSignInConfirmClick);
    $(".register-signin").click(function () {
      $("#signinModal").modal("hide");
      if (!window.location.href.includes("/user/login")) {
        $("#signupModal").modal("show");
      } else {
        window.location.href = "/user/register";
      }
    });
    this.setUpOnBlurListeners();
    this.setModalListeners();
  }

  setModalListeners() {
    $("#signinModal").on("hidden.bs.modal", () => {
      if (
        window.location.href.includes("/user/confirm") ||
        window.location.href.includes("/user/login")
      ) {
        window.location.href = "/";
      } else this.resetForm();
    });

    $("#signinModal").on("shown.bs.modal", () => {
      $("body").addClass("modal-open");
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

  resetForm() {
    this.model.forEach((v) => {
      const { selector } = v;
      $(`#${selector}`).val("");
      v.value = "";
    });
    $(".invalid-feedback").hide();
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

  onSignInConfirmClick() {
    this.clicked = true;
    const valid = this.checkValidation();
    if (valid) {
      this.loginUser();
    }
  }

  loginUser() {
    const { model } = this;
    const data = {
      email: model[0].value,
      password: model[1].value,
      remember_me: $("#rememberMe:checked").val() ? 1 : 0,
    };

    axios
      .post("/user/login", data)
      .then(({ data: response }) => {
        console.log(response);
        if (response && response.success) {
          if (typeof $(".confirm-signin").data("nexturl") !== "undefined") {
            const nextUrl = $(".confirm-signin").attr("data-nexturl");
            window.location.href = nextUrl;
          } else if ($("#searchModal").hasClass("show")) {
            $("#signinModal").modal("hide");
          } else window.location.href = "/dashboard";
        } else if (
          response &&
          response.error &&
          response.error === "account not confirmed"
        ) {
          $.toaster({ settings: { timeout: 15000 } });
          $.toaster({
            priority: "danger",
            title: "Error",
            message: `Your account has not been activated yet. Please check your email and click on the activation link. `,
          });
        } else {
          $.toaster({ settings: { timeout: 5000 } });
          $.toaster({
            priority: "danger",
            title: "Error",
            message: `Invalid email and/or password`,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log("Error while saving the data");
      });
  }
}

$(document).ready(function () {
  new SignIn();
});
