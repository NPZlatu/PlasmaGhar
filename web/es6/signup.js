/**
 * Class to handle signup actions
 */
class SignUp {
  getModel() {
    return [
      {
        selector: "firstName",
        rules: {
          required: {
            value: true,
            error: "Valid first name is required.",
          },
        },
        value: "",
      },
      {
        selector: "lastName",
        rules: {
          required: {
            value: true,
            error: "Valid last name is required.",
          },
        },
        value: "",
      },
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
      {
        selector: "email",
        rules: {
          required: {
            value: false,
          },
          regex: {
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            error: "Please enter a valid email address",
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
    this.setUpListeners();
  }

  setUpListeners() {
    $(".confirm-signup").click(this.onSignUpConfirmClick);
    this.setUpOnBlurListeners();
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

  onSignUpConfirmClick() {
    this.clicked = true;
    const valid = this.checkValidation();
    console.log(valid);
    console.log("is it valid");
    if (valid) {
      this.registerUser();
    }
  }

  registerUser() {
    const { model } = this;
    const data = {
      first_name: model[0].value,
      last_name: model[1].value,
      phone_number: model[2].value,
      password: model[3].value,
      email: model[4].value,
      user_role: $("input#gridRadios1:checked").val() ? 0 : 1,
    };
  }
}

$(document).ready(function () {
  new SignUp();
});
