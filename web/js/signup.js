"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class to handle signup actions
 */
var SignUp = function () {
  _createClass(SignUp, [{
    key: "getModel",
    value: function getModel() {
      return [{
        selector: "phoneNumber",
        rules: {
          regex: {
            value: /^[0-9]{10}$/,
            error: "Phone Number must have 10 digits."
          }
        },
        value: ""
      }, {
        selector: "password",
        rules: {
          regex: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            error: "Password must be minimum eight characters, at least one letter and one number"
          }
        },
        value: ""
      }, {
        selector: "confirm-password",
        rules: {
          match: {
            value: "password",
            error: "Confirm Password does not match."
          }
        },
        value: ""
      }];
    }
  }]);

  function SignUp() {
    _classCallCheck(this, SignUp);

    this.clicked = false;
    this.model = this.getModel();
    this.onSignUpConfirmClick = this.onSignUpConfirmClick.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.setModalListeners = this.setModalListeners.bind(this);
    this.setUpListeners();
  }

  _createClass(SignUp, [{
    key: "setUpListeners",
    value: function setUpListeners() {
      $(".confirm-signup").click(this.onSignUpConfirmClick);
      this.setUpOnBlurListeners();
      this.setModalListeners();
    }
  }, {
    key: "setModalListeners",
    value: function setModalListeners() {
      var _this = this;

      $("#signupModal").on("hidden.bs.modal", function () {
        _this.resetForm();
      });
    }
  }, {
    key: "setUpOnBlurListeners",
    value: function setUpOnBlurListeners() {
      var _this2 = this;

      this.model.map(function (v, index) {
        var selector = v.selector,
            rules = v.rules;

        var self = _this2;
        $("#" + selector).blur(function () {
          if (self.clicked) self.showError(selector, rules, index);
        });
      });
    }
  }, {
    key: "showError",
    value: function showError(selector, rules, index) {
      var element = $("#" + selector);
      var value = element.val();
      var errorElement = element.next();
      var message = "";
      var valid = true;

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
        var matchSelectorVal = $("#" + rules.match.value).val();
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
  }, {
    key: "checkValidation",
    value: function checkValidation() {
      var valid = true;
      var retrunVal = true;
      for (var i = 0; i < this.model.length; i++) {
        var _model$i = this.model[i],
            selector = _model$i.selector,
            rules = _model$i.rules;

        valid = this.showError(selector, rules, i);
        if (!valid) retrunVal = false;
      }
      return retrunVal;
    }
  }, {
    key: "resetForm",
    value: function resetForm() {
      this.model.map(function (v) {
        var selector = v.selector;

        $("#" + selector).val("");
      });
      $("invalid-feedback").hide();
    }
  }, {
    key: "onSignUpConfirmClick",
    value: function onSignUpConfirmClick() {
      this.clicked = true;
      var valid = this.checkValidation();
      if (valid) {
        this.registerUser();
      }
    }
  }, {
    key: "registerUser",
    value: function registerUser() {
      var _this3 = this;

      var model = this.model;

      var data = {
        phone_number: model[0].value,
        password: model[1].value,
        user_role: $("input#gridRadios1:checked").val() ? 0 : 1
      };

      axios.defaults.headers.post["X-CSRF-Token"] = $('meta[name="csrf-token"]').attr("content");
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

      axios.post("/user/save", data).then(function (_ref) {
        var response = _ref.data;

        console.log(response);
        if (response && response.success) {
          _this3.resetForm();
          $("#signupModal").modal("hide");
          $.toaster({ settings: { timeout: 15000 } });

          $.toaster({
            priority: "success",
            title: "Success",
            message: "You are successfully registered, we have sent a confirmation link on your phone. \n          Please click on that link to verify your phone."
          });
        } else if (response && response.error && response.error === "exist already") {
          var errorElement = $("#phoneNumber").next();
          errorElement.text("User already exists with this phone number");
          errorElement.show();
        }
      }).catch(function (error) {
        console.log(error);
        $.toaster({ settings: { timeout: 5000 } });
        $.toaster({
          priority: "danger",
          title: "Error",
          message: "Something is wrong. Please try later"
        });
      });
    }
  }]);

  return SignUp;
}();

$(document).ready(function () {
  new SignUp();
});