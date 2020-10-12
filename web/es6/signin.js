class SignIn {
  constructor() {
    this.clicked = false;
    this.model = [
      {
        selector: "loginPhone",
        rules: {
          regex: {
            value: /^[0-9]{10}$/,
            error: "Phone Number must have 10 digits.",
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
    this.setUpOnBlurListeners();
    this.setModalListeners();
  }

  setModalListeners() {
    $("#signinModal").on("hidden.bs.modal", () => {
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

  resetForm() {
    this.model.map((v) => {
      const { selector } = v;
      $(`#${selector}`).val("");
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
      phone_number: model[0].value,
      password: model[1].value,
    };

    axios.defaults.headers.post["X-CSRF-Token"] = $(
      'meta[name="csrf-token"]'
    ).attr("content");
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

    axios
      .post("/user/login", data)
      .then(({ data: response }) => {
        if (response && response.success) {
          console.log("here we are");
        } else {
          const errorElement = $("#loginPassword").next();
          errorElement.text("Invalid phone/password.");
          errorElement.show();
        }
      })
      .catch(function (error) {
        alert("Error while saving the data");
      });
  }
}

$(document).ready(function () {
  new SignIn();
});
