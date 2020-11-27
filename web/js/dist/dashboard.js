"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dashboard = /*#__PURE__*/function () {
  function Dashboard() {
    _classCallCheck(this, Dashboard);

    this.filters = {
      blood_group: "",
      state: "",
      district: ""
    };
    this.user = {};
    this.clicked = false;
    this.model = [{
      selector: "uBloodGroup",
      rules: {
        required: {
          value: true,
          conditions: "donor",
          error: "Blood Group is required."
        }
      },
      value: ""
    }, {
      selector: "uState",
      rules: {
        required: {
          value: true,
          error: "State is required."
        }
      },
      value: ""
    }, {
      selector: "uDistrict",
      rules: {
        required: {
          value: true,
          error: "District is required."
        }
      },
      value: ""
    }];
    this.requestDistricts = this.requestDistricts.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onEditInfoClick = this.onEditInfoClick.bind(this);
    this.onChangePasswordClick = this.onChangePasswordClick.bind(this);
    this.setUpOnBlurListeners = this.setUpOnBlurListeners.bind(this);
    this.onUpdateConfirmClick = this.onUpdateConfirmClick.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.onConfirmPasswordChangeClick = this.onConfirmPasswordChangeClick.bind(this);
    this.setUpListeners();
    this.handleAlertMessages();
  }

  _createClass(Dashboard, [{
    key: "handleAlertMessages",
    value: function handleAlertMessages() {
      var message = localStorage.getItem("message");

      if (message) {
        localStorage.removeItem("message");
        $.toaster({
          settings: {
            timeout: 20000
          }
        });
        $.toaster({
          priority: "success",
          title: "Success",
          message: message
        });
      }
    }
  }, {
    key: "setUpListeners",
    value: function setUpListeners() {
      this.setUpSearchFieldsListeners();
      this.setUpRequestListsForDonorListeners();
      this.setUpAccountBtnsListeners();
      this.setUpOnBlurListeners();
    }
  }, {
    key: "setUpRequestListsForDonorListeners",
    value: function setUpRequestListsForDonorListeners() {
      $(".donor-accept-btn").on("click", this.onAcceptBtnClick);
      $(".donor-bloodconfirm-btn").on("click", this.onBloodConfirmBtnClickByDonor);
      $(".donor-reject-btn").on("click", this.onDonorRejectBtnClick);
      $(".receiver-reject-btn").on("click", this.onReceiverRejectBtnClick);
      $(".receiver-bloodconfirm-btn").on("click", this.onBloodConfirmBtnClickByReceiver);
    }
  }, {
    key: "setUpAccountBtnsListeners",
    value: function setUpAccountBtnsListeners() {
      $(".btn-not-interested").on("click", function () {
        axios.post("/change-active-status", {
          user_status: 9
        }).then(function (_ref) {
          var data = _ref.data;

          if (data.success) {
            localStorage.setItem("message", "Your current status is uninterested. You can always change your status.");
            location.reload();
          }
        })["catch"](function (error) {
          console.log(error);
        });
      });
      $(".btn-re-interested").on("click", function () {
        axios.post("/change-active-status", {
          user_status: 0
        }).then(function (_ref2) {
          var data = _ref2.data;

          if (data.success) {
            localStorage.setItem("message", "Awesome. You are now re-activated. You can contribute on donation from now.");
            location.reload();
          }
        })["catch"](function (error) {
          console.log(error);
        });
      });
      $(".edit-info").on("click", this.onEditInfoClick);
      $(".change-password").on("click", this.onChangePasswordClick);
      $(".confirm-update").on("click", this.onUpdateConfirmClick);
      $(".confirm-change-password").on("click", this.onConfirmPasswordChangeClick);
    }
  }, {
    key: "onConfirmPasswordChangeClick",
    value: function onConfirmPasswordChangeClick() {
      var oldPasswordVal = $("#oldpassword").val();
      var newPasswordVal = $("#newpassword").val();
      var confirmNewPasswordVal = $("#confirmnewpassword").val();
      var errorMessage = "";

      if (!oldPasswordVal) {
        errorMessage = "You must enter your current password.";
      } else if (!newPasswordVal) {
        errorMessage = "You must enter your new password";
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(newPasswordVal)) {
        errorMessage = "New Password must be minimum eight characters, at least one letter and one number";
      } else if (newPasswordVal != confirmNewPasswordVal) {
        errorMessage = "New password and confirm password do not match";
      }

      if (errorMessage) {
        $.toaster({
          settings: {
            timeout: 5000
          }
        });
        $.toaster({
          priority: "danger",
          title: "Error",
          message: errorMessage
        });
      } else {
        var model = {
          current_password: oldPasswordVal,
          new_password: newPasswordVal,
          id: this.user.id
        };
        axios.post("/user/change-password", model).then(function (_ref3) {
          var response = _ref3.data;

          if (response && response.success) {
            localStorage.setItem("message", "Password is changed successfully.");
            location.reload();
          } else if (response && response.error == "Invalid current password") {
            $.toaster({
              settings: {
                timeout: 5000
              }
            });
            $.toaster({
              priority: "danger",
              title: "Error",
              message: "You have entered an invalid current password"
            });
          } else {
            $.toaster({
              settings: {
                timeout: 5000
              }
            });
            $.toaster({
              priority: "danger",
              title: "Error",
              message: "Something is wrong. Please try again later"
            });
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
            message: "Something is wrong. Please try again later"
          });
        });
      }
    }
  }, {
    key: "onUpdateConfirmClick",
    value: function onUpdateConfirmClick() {
      this.clicked = true;
      var valid = this.checkValidation();

      if (valid) {
        this.updateUser();
      }
    }
  }, {
    key: "updateUser",
    value: function updateUser() {
      var user = {
        id: this.user.id,
        blood_group: this.model[0].value,
        state: this.model[1].value,
        district: this.model[2].value
      };
      axios.post("/user/update", user).then(function (_ref4) {
        var response = _ref4.data;

        if (response && response.success) {
          localStorage.setItem("message", "The user info is successfully updated.");
          location.reload();
        } else {
          console.log(error);
          $.toaster({
            settings: {
              timeout: 5000
            }
          });
          $.toaster({
            priority: "danger",
            title: "Error",
            message: "Something is wrong. Please try again later"
          });
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
          message: "Something is wrong. Please try again later"
        });
      });
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
    key: "onEditInfoClick",
    value: function onEditInfoClick() {
      $("#updateModal").modal("show");
      var user = $(".edit-info").data("params");
      this.user = user;
      $("#uBloodGroup").val(user.blood_group);
      $("#uState").val(user.state);
      var code = $("option:selected", "#uState").data("code");
      this.requestDistricts(code, true);
    }
  }, {
    key: "onChangePasswordClick",
    value: function onChangePasswordClick() {
      $("#changePasswordModal").modal("show");
      var user = $(".change-password").data("params");
      this.user = user;
    }
  }, {
    key: "setUpOnBlurListeners",
    value: function setUpOnBlurListeners() {
      var self = this;
      $("#uState").on("change", function () {
        if (this.value) {
          var code = $("option:selected", this).data("code");
          self.user.district = "";
          self.requestDistricts(code, true);
        } else {
          $(".district-wrapper").hide();
        }
      });
      this.model.map(function (v, index) {
        var selector = v.selector,
            rules = v.rules;
        $("#".concat(selector)).blur(function () {
          if (self.clicked) self.showError(selector, rules, index);
        });
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
          if (rules.required.conditions && this.user.user_role == 0) {
            valid = false;
            message = rules.required.error;
          }
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
    key: "onAcceptBtnClick",
    value: function onAcceptBtnClick() {
      var receiver = $(this).data("params");
      var model = {
        p_donor_id: receiver.donor_id,
        p_requested_blood_group: receiver.requested_blood_group,
        p_requested_state: receiver.requested_state,
        p_requested_district: receiver.requested_district,
        p_receiver_id: receiver.receiver_id,
        p_action: "accept",
        p_action_by: "donor",
        p_relationship: "diff"
      };
      axios.post("/accept/requester", model).then(function (_ref5) {
        var data = _ref5.data;
        localStorage.setItem("message", data.t_result + " Your number is now sent to the accepted requester. Please expect a call from him/her. If he/she doesn't call,reject the request. If he/she calls and blood is confirmed, please change the status to Blood Confirmed.\n            SMS: ".concat(data.message, "\n            "));
        location.reload();
      })["catch"](function (error) {
        console.log(error);
      });
    }
  }, {
    key: "onBloodConfirmBtnClickByDonor",
    value: function onBloodConfirmBtnClickByDonor() {
      var receiver = $(this).data("params");
      var model = {
        p_donor_id: receiver.donor_id,
        p_requested_blood_group: receiver.requested_blood_group,
        p_requested_state: receiver.requested_state,
        p_requested_district: receiver.requested_district,
        p_receiver_id: receiver.receiver_id,
        p_action: "accept",
        p_action_by: "donor",
        p_relationship: "same"
      };
      axios.post("/confirm/blood", model).then(function (_ref6) {
        var data = _ref6.data;

        if (data.t_result === "Your accept request is succeeded.") {
          localStorage.setItem("message", "Thank you for donating the plasma. Your small help does save a needy life.");
          location.reload();
        } else {
          $.toaster({
            settings: {
              timeout: 1000
            }
          });
          $.toaster({
            priority: "danger",
            title: "Error",
            message: "Something is wrong. Please try again later."
          });
        }
      })["catch"](function (error) {
        console.log(error);
        $.toaster({
          settings: {
            timeout: 1000
          }
        });
        $.toaster({
          priority: "danger",
          title: "Error",
          message: "Something is wrong. Please try again later."
        });
      });
    }
  }, {
    key: "onBloodConfirmBtnClickByReceiver",
    value: function onBloodConfirmBtnClickByReceiver() {
      var donor = $(this).data("params");
      var model = {
        p_donor_id: donor.donor_id,
        p_requested_blood_group: donor.requested_blood_group,
        p_requested_state: donor.requested_state,
        p_requested_district: donor.requested_district,
        p_receiver_id: donor.receiver_id,
        p_action: "accept",
        p_action_by: "receiver",
        p_relationship: "same"
      };
      axios.post("/confirm/blood", model).then(function (_ref7) {
        var data = _ref7.data;

        if (data.t_result === "Your accept request is succeeded.") {
          localStorage.setItem("message", "Thank you for the confirmation.");
          location.reload();
        } else {
          $.toaster({
            settings: {
              timeout: 1000
            }
          });
          $.toaster({
            priority: "danger",
            title: "Error",
            message: "Something is wrong. Please try again later."
          });
        }
      })["catch"](function (error) {
        console.log(error);
        $.toaster({
          settings: {
            timeout: 1000
          }
        });
        $.toaster({
          priority: "danger",
          title: "Error",
          message: "Something is wrong. Please try again later."
        });
      });
    }
  }, {
    key: "onDonorRejectBtnClick",
    value: function onDonorRejectBtnClick() {
      var receiver = $(this).data("params");
      var section = $(this).data("section");
      var relationship = "same";

      if (section === "pendingApprovals") {
        relationship = "diff";
      }

      var model = {
        p_donor_id: receiver.donor_id,
        p_requested_blood_group: receiver.requested_blood_group,
        p_requested_state: receiver.requested_state,
        p_requested_district: receiver.requested_district,
        p_receiver_id: receiver.receiver_id,
        p_action: "cancel",
        p_action_by: "donor",
        p_relationship: relationship
      };
      axios.post("/cancel/request", model).then(function (_ref8) {
        var data = _ref8.data;

        if (data.t_result === "Your cancel request is succeeded.") {
          localStorage.setItem("message", data.t_result);
          location.reload();
        } else {
          $.toaster({
            settings: {
              timeout: 1000
            }
          });
          $.toaster({
            priority: "danger",
            title: "Error",
            message: "Something is wrong. Please try again later."
          });
        }
      })["catch"](function (error) {
        console.log(error);
        $.toaster({
          settings: {
            timeout: 1000
          }
        });
        $.toaster({
          priority: "danger",
          title: "Error",
          message: "Something is wrong. Please try again later."
        });
      });
    }
  }, {
    key: "onReceiverRejectBtnClick",
    value: function onReceiverRejectBtnClick() {
      var receiver = $(this).data("params");
      var section = $(this).data("section");
      var relationship = "same";

      if (section === "pendingApprovals") {
        relationship = "diff";
      }

      var model = {
        p_donor_id: receiver.donor_id,
        p_requested_blood_group: receiver.requested_blood_group,
        p_requested_state: receiver.requested_state,
        p_requested_district: receiver.requested_district,
        p_receiver_id: receiver.receiver_id,
        p_action: "cancel",
        p_action_by: "receiver",
        p_relationship: relationship
      };
      axios.post("/cancel/request", model).then(function (_ref9) {
        var data = _ref9.data;

        if (data.t_result === "Your cancel request is succeeded.") {
          localStorage.setItem("message", data.t_result);
          location.reload();
        } else {
          $.toaster({
            settings: {
              timeout: 1000
            }
          });
          $.toaster({
            priority: "danger",
            title: "Error",
            message: "Something is wrong. Please try again later."
          });
        }
      })["catch"](function (error) {
        console.log(error);
        $.toaster({
          settings: {
            timeout: 1000
          }
        });
        $.toaster({
          priority: "danger",
          title: "Error",
          message: "Something is wrong. Please try again later."
        });
      });
    }
  }, {
    key: "setUpSearchFieldsListeners",
    value: function setUpSearchFieldsListeners() {
      var self = this;
      $(".state-options a").on("click", function () {
        var code = $(this).attr("data-code");
        var state = $(this).attr("data-name");
        self.filters.state = state;
        $("#dash-state-select").text(state);
        self.requestDistricts(code);
      });
      $(".bg-options a").on("click", function () {
        var bloodGroup = $(this).text();
        $(".bg-dropdown-link").text(bloodGroup);
        self.filters.blood_group = bloodGroup;
      });
      $(".search-btn-dash").on("click", function () {
        self.onSearchClick();
      });
      $("#searchModal").on("hidden.bs.modal", function () {
        location.reload(true);
      });
    }
  }, {
    key: "requestDistricts",
    value: function requestDistricts(stateCode, isUpdate) {
      var _this = this;

      axios.get("/address/get-districts?code=".concat(stateCode)).then(function (_ref10) {
        var districts = _ref10.data;

        if (districts && districts.length > 0) {
          if (isUpdate) _this.populateDistrictsUpdate(districts);else _this.populateDistricts(districts);
        }
      })["catch"](function (error) {});
    }
  }, {
    key: "populateDistrictsUpdate",
    value: function populateDistrictsUpdate(districts) {
      $("#uDistrict").html("");
      var options = "<option selected value>SELECT DISTRICT</option>";

      for (var i = 0; i < districts.length; i++) {
        options += "<option data-code=".concat(districts[i].code, " value=").concat(districts[i].name, ">").concat(districts[i].name, "</option>");
      }

      $(".district-wrapper").show();
      $("#uDistrict").append(options);

      if (this.user.district) {
        $("#uDistrict").val(this.user.district);
      }
    }
  }, {
    key: "populateDistricts",
    value: function populateDistricts(districts) {
      var elements = [];
      $(".district-dropdown").html("");
      districts.forEach(function (district) {
        elements.push("<a class=\"dropdown-item\" href=\"javascript:void(0)\">".concat(district.name, "</a>"));
      });
      $(".district-dropdown").append(elements.join(""));
      $(".district-dropdown a").unbind("click");
      var self = this;
      $(".district-dropdown a").on("click", function () {
        var district = $(this).text();
        $("#dash-district-select").text(district);
        self.filters.district = district;
      });
    }
  }, {
    key: "onSearchClick",
    value: function onSearchClick() {
      var _this$filters = this.filters,
          bloodGroup = _this$filters.blood_group,
          state = _this$filters.state,
          district = _this$filters.district;
      var valid = true;

      if (!bloodGroup) {
        $.toaster({
          settings: {
            timeout: 4000
          }
        });
        $.toaster({
          priority: "danger",
          title: "Error",
          message: "Please choose the blood group!"
        });
        valid = false;
      }

      if (!state) {
        $.toaster({
          settings: {
            timeout: 4000
          }
        });
        $.toaster({
          priority: "danger",
          title: "Error",
          message: "Please choose the state!"
        });
        valid = false;
      }

      if (!district) {
        $.toaster({
          settings: {
            timeout: 4000
          }
        });
        $.toaster({
          priority: "danger",
          title: "Error",
          message: "Please choose the district!"
        });
        valid = false;
      }

      if (valid) this.requestSearchLists();
    }
  }, {
    key: "requestSearchLists",
    value: function requestSearchLists() {
      var _this2 = this;

      $(".table-searchlist tbody").html("");
      $(".table-searchlist tbody td button").unbind("click");
      axios.post("/user/search", this.filters).then(function (_ref11) {
        var donors = _ref11.data;

        if (donors.length > 0) {
          var self = _this2;
          var trElement = [];
          donors.forEach(function (donor, index) {
            trElement.push("\n            <tr>\n            <td> ".concat(index + 1, " </td>\n            <td>Donor-").concat(donor.id, "</td>\n            <td> ").concat(donor.blood_group, "</td>\n            <td> ").concat(donor.district, "</td>\n            <td><button type=\"button\"\n            data-id=\"").concat(donor.id, "\"\n            class=\"btn btn-sm btn-outline-success\">Request</button>\n            </td>\n            </tr>\n            "));
          });
          $(".table-searchlist tbody").append(trElement.join(""));
          $(".table-searchlist tbody td button").on("click", function () {
            var donorId = $(this).attr("data-id");
            self.sendRequestToDonor(donorId, self.filters);
          });
        }
      })["catch"](function (error) {
        console.log(error);
      });
      $("#searchModal").modal("show");
    }
  }, {
    key: "sendRequestToDonor",
    value: function sendRequestToDonor(donorId, filters) {
      axios.post("/request/donor", {
        p_donor_id: donorId,
        p_requested_blood_group: filters.blood_group,
        p_requested_state: filters.state,
        p_requested_district: filters.district
      }).then(function (_ref12) {
        var data = _ref12.data;
        $.toaster({
          settings: {
            timeout: 15000
          }
        });

        if (data && data.t_result && data.t_result === "Your apply request is succeeded.") {
          var selector = "button[data-id='".concat(donorId, "']");
          $(selector).text("Requested");
          $(selector).prop("disabled", true);
          $(selector).prop("onclick", null).off("click");
          $.toaster({
            priority: "success",
            title: "Success",
            message: "".concat(data.t_result, " ").concat(data.t_apply_count !== null ? "\nRemaining Quota for today is " + (35 - parseInt(data.t_apply_count, 10)) + ". \n\n" + " SMS: " + data.message : null)
          });
        } else {
          $.toaster({
            settings: {
              timeout: 1000
            }
          });
          $.toaster({
            priority: "danger",
            title: "Error",
            message: "Something is wrong! Please try again later. If the issue persist for long time, please contact us."
          });
        }
      })["catch"](function (error) {
        console.log(error);
        $.toaster({
          priority: "danger",
          title: "Error",
          message: "Something is wrong! Please try again later. If the issue persist for long time, please contact us."
        });
      });
    }
  }]);

  return Dashboard;
}();

$(document).ready(function () {
  new Dashboard();
});
//# sourceMappingURL=dashboard.js.map
