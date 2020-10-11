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
        selector: "firstName",
        rules: {
          required: {
            value: true,
            error: "Valid first name is required."
          }
        },
        value: ""
      }, {
        selector: "lastName",
        rules: {
          required: {
            value: true,
            error: "Valid last name is required."
          }
        },
        value: ""
      }, {
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
      }, {
        selector: "email",
        rules: {
          required: {
            value: false
          },
          regex: {
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            error: "Please enter a valid email address"
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
    this.setUpListeners();
  }

  _createClass(SignUp, [{
    key: "setUpListeners",
    value: function setUpListeners() {
      $(".confirm-signup").click(this.onSignUpConfirmClick);
      this.setUpOnBlurListeners();
    }
  }, {
    key: "setUpOnBlurListeners",
    value: function setUpOnBlurListeners() {
      var _this = this;

      this.model.map(function (v, index) {
        var selector = v.selector,
            rules = v.rules;

        var self = _this;
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
    key: "onSignUpConfirmClick",
    value: function onSignUpConfirmClick() {
      this.clicked = true;
      var valid = this.checkValidation();
      console.log(valid);
      console.log("is it valid");
      if (valid) {
        this.registerUser();
      }
    }
  }, {
    key: "registerUser",
    value: function registerUser() {
      var model = this.model;

      var data = {
        firstName: model[0].value,
        lastName: model[1].value,
        phoneNumber: model[2].value,
        password: model[3].value,
        email: model[4].value,
        userType: $("input#gridRadios1:checked").val() ? "DONAR" : "RECEIVER"
      };
      console.log(data);
      console.log("this is the data");
    }
  }]);

  return SignUp;
}();

$(document).ready(function () {
  new SignUp();
});