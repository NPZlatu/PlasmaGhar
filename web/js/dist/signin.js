"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SignIn = /*#__PURE__*/function () {
  function SignIn() {
    _classCallCheck(this, SignIn);

    this.clicked = false;
    this.model = [{
      selector: "loginPhone",
      rules: {
        regex: {
          value: /^[0-9]{10}$/,
          error: "Phone Number must have 10 digits."
        }
      },
      value: ""
    }, {
      selector: "loginPassword",
      rules: {
        required: {
          value: true,
          error: "Password is required."
        }
      },
      value: ""
    }];
    this.onSignInConfirmClick = this.onSignInConfirmClick.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.setModalListeners = this.setModalListeners.bind(this);
    this.setUpListeners();
  }

  _createClass(SignIn, [{
    key: "setUpListeners",
    value: function setUpListeners() {
      $(".confirm-signin").click(this.onSignInConfirmClick);
      $(".register-signin").click(function () {
        $("#signinModal").modal("hide");
        $("#signupModal").modal("show");
      });
      this.setUpOnBlurListeners();
      this.setModalListeners();
    }
  }, {
    key: "setModalListeners",
    value: function setModalListeners() {
      var _this = this;

      $("#signinModal").on("hidden.bs.modal", function () {
        if (window.location.href.includes("/user/login")) {
          window.location.href = "/";
        } else _this.resetForm();
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
        $("#".concat(selector)).blur(function () {
          if (self.clicked) self.showError(selector, rules, index);
        });
      });
    }
  }, {
    key: "resetForm",
    value: function resetForm() {
      this.model.forEach(function (v) {
        var selector = v.selector;
        $("#".concat(selector)).val("");
        v.value = "";
      });
      $(".invalid-feedback").hide();
    }
  }, {
    key: "showError",
    value: function showError(selector, rules, index) {
      var element = $("#".concat(selector));
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
        var _this$model$i = this.model[i],
            selector = _this$model$i.selector,
            rules = _this$model$i.rules;
        valid = this.showError(selector, rules, i);
        if (!valid) retrunVal = false;
      }

      return retrunVal;
    }
  }, {
    key: "onSignInConfirmClick",
    value: function onSignInConfirmClick() {
      this.clicked = true;
      var valid = this.checkValidation();

      if (valid) {
        this.loginUser();
      }
    }
  }, {
    key: "loginUser",
    value: function loginUser() {
      var model = this.model;
      var data = {
        phone_number: model[0].value,
        password: model[1].value,
        remember_me: $("#rememberMe:checked").val() ? 1 : 0
      };
      axios.post("/user/login", data).then(function (_ref) {
        var response = _ref.data;

        if (response && response.success) {
          if ($("#searchModal").hasClass("show")) {
            $("#signinModal").modal("hide");
          } else window.location.href = "/dashboard";
        } else {
          $.toaster({
            settings: {
              timeout: 5000
            }
          });
          $.toaster({
            priority: "danger",
            title: "Error",
            message: "Invalid phone and/or password"
          });
        }
      })["catch"](function (error) {
        alert("Error while saving the data");
      });
    }
  }]);

  return SignIn;
}();

$(document).ready(function () {
  new SignIn();
});
//# sourceMappingURL=signin.js.map
