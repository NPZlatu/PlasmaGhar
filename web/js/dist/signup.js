"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Class to handle signup actions
 */
var SignUp = /*#__PURE__*/function () {
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
        selector: "bloodGroup",
        rules: {
          required: {
            value: true,
            conditions: [{
              selector: "input#gridRadios2:checked",
              value: true
            }],
            error: "Blood Group is required."
          }
        },
        value: ""
      }, {
        selector: "state",
        rules: {
          required: {
            value: true,
            error: "State is required."
          }
        },
        value: ""
      }, {
        selector: "district",
        rules: {
          required: {
            value: true,
            error: "District is required."
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
    this.states = [];
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
      $(".signin-register").click(function () {
        $("#signupModal").modal("hide");
        $("#signinModal").modal("show");
      });
      this.setUpOnBlurListeners();
      this.setUpOnChangeListeners();
      this.setModalListeners();
    }
  }, {
    key: "setModalListeners",
    value: function setModalListeners() {
      var _this = this;

      $("#signupModal").on("shown.bs.modal", function () {
        if (_this.states.length === 0) _this.requestStates();
      });
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
        $("#".concat(selector)).blur(function () {
          if (self.clicked) self.showError(selector, rules, index);
        });
      });
    }
  }, {
    key: "setUpOnChangeListeners",
    value: function setUpOnChangeListeners() {
      var self = this;
      $("#state").on("change", function () {
        if (this.value) {
          var code = $("option:selected", this).data("code");
          console.log(code);
          self.requestDistricts(code);
        } else {
          $(".district-wrapper").hide();
        }
      });
      $("input#gridRadios2").on("click", function () {
        $("input#gridRadios1").prop("checked", false);
        var errorElement = $("#bloodGroup").next();
        errorElement.text("");
        errorElement.hide();
      });
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
        if (!rules.required.conditions) {
          valid = false;
          message = rules.required.error;
        } else {
          rules.required.conditions.forEach(function (cond) {
            var selector = cond.selector;

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
        var matchSelectorVal = $("#".concat(rules.match.value)).val();

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
        var _this$model$i = this.model[i],
            selector = _this$model$i.selector,
            rules = _this$model$i.rules;
        valid = this.showError(selector, rules, i);
        if (!valid) retrunVal = false;
      }

      return retrunVal;
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
    key: "checkIfTermsAndConditionsAgreed",
    value: function checkIfTermsAndConditionsAgreed() {
      var agree = true;

      if (!$("#terms:checked").val()) {
        $.toaster({
          settings: {
            timeout: 5000
          }
        });
        $.toaster({
          priority: "danger",
          title: "Terms and Conditions",
          message: "You must agree to our terms and conditions to proceed further."
        });
        agree = false;
      }

      return agree;
    }
  }, {
    key: "onSignUpConfirmClick",
    value: function onSignUpConfirmClick() {
      this.clicked = true;
      var valid = this.checkValidation();

      if (valid) {
        if (this.checkIfTermsAndConditionsAgreed()) this.registerUser();
      }
    }
  }, {
    key: "requestStates",
    value: function requestStates() {
      var _this3 = this;

      axios.get("/address/get-states").then(function (_ref) {
        var states = _ref.data;

        if (states && states.length > 0) {
          _this3.states = states;

          _this3.populateStates();
        }
      })["catch"](function (error) {});
    }
  }, {
    key: "requestDistricts",
    value: function requestDistricts(stateCode) {
      var _this4 = this;

      axios.get("/address/get-districts?code=".concat(stateCode)).then(function (_ref2) {
        var districts = _ref2.data;

        if (districts && districts.length > 0) {
          _this4.populateDistricts(districts);
        }
      })["catch"](function (error) {});
    }
  }, {
    key: "populateStates",
    value: function populateStates() {
      var states = this.states;
      $("#state").html("");
      var options = "<option selected value>SELECT STATE</option>";

      for (var i = 0; i < states.length; i++) {
        options += "<option data-code=".concat(states[i].code, " value=").concat(states[i].name, ">").concat(states[i].name, "</option>");
      }

      $("#state").append(options);
    }
  }, {
    key: "populateDistricts",
    value: function populateDistricts(districts) {
      $("#district").html("");
      var options = "<option selected value>SELECT DISTRICT</option>";

      for (var i = 0; i < districts.length; i++) {
        options += "<option data-code=".concat(districts[i].code, " value=").concat(districts[i].name, ">").concat(districts[i].name, "</option>");
      }

      $(".district-wrapper").show();
      $("#district").append(options);
    }
  }, {
    key: "registerUser",
    value: function registerUser() {
      var _this5 = this;

      var model = this.model;
      var data = {
        phone_number: model[0].value,
        blood_group: model[1].value,
        state: model[2].value,
        district: model[3].value,
        password: model[4].value,
        user_role: $("input#gridRadios1:checked").val() ? 0 : 1
      };
      axios.post("/user/save", data).then(function (_ref3) {
        var response = _ref3.data;

        if (response && response.success) {
          _this5.resetForm();

          $("#signupModal").modal("hide");
          $.toaster({
            settings: {
              timeout: 15000
            }
          });
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
      })["catch"](function (error) {
        console.log(error);
        $.toaster({
          settings: {
            timeout: 5000
          }
        });
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
  axios.defaults.headers.post["X-CSRF-Token"] = $('meta[name="csrf-token"]').attr("content");
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  new SignUp();
});
//# sourceMappingURL=signup.js.map
