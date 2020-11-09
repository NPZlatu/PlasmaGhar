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
    this.setUpListeners();
    this.requestDistricts = this.requestDistricts.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  _createClass(Dashboard, [{
    key: "setUpListeners",
    value: function setUpListeners() {
      this.setUpSearchFieldsListeners();
      this.setUpRequestListsForDonorListeners();
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
      axios.post("/accept/requester", model).then(function (_ref) {
        var data = _ref.data;
        $.toaster({
          settings: {
            timeout: 20000
          }
        });
        $.toaster({
          priority: "success",
          title: "Success",
          message: data.t_result + " Your number is now sent to the accepted requester. Please expect a call from him/her. If he/she doesn't call,reject the request. If he/she calls and blood is confirmed, please change the status to Blood Confirmed."
        });
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
      axios.post("/confirm/blood", model).then(function (_ref2) {
        var data = _ref2.data;

        if (data.t_result === "Your accept request is succeeded.") {
          $.toaster({
            settings: {
              timeout: 20000
            }
          });
          $.toaster({
            priority: "success",
            title: "Success",
            message: "Thank you for donating the plasma. Your small help does save a needy life."
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
      axios.post("/confirm/blood", model).then(function (_ref3) {
        var data = _ref3.data;

        if (data.t_result === "Your accept request is succeeded.") {
          $.toaster({
            settings: {
              timeout: 20000
            }
          });
          $.toaster({
            priority: "success",
            title: "Success",
            message: "Thank you for the confirmation."
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
      axios.post("/cancel/request", model).then(function (_ref4) {
        var data = _ref4.data;

        if (data.t_result === "Your cancel request is succeeded.") {
          $.toaster({
            settings: {
              timeout: 20000
            }
          });
          $.toaster({
            priority: "success",
            title: "Success",
            message: data.t_result
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
      axios.post("/cancel/request", model).then(function (_ref5) {
        var data = _ref5.data;

        if (data.t_result === "Your cancel request is succeeded.") {
          $.toaster({
            settings: {
              timeout: 20000
            }
          });
          $.toaster({
            priority: "success",
            title: "Success",
            message: data.t_result
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
            message: "Something is wrong. Please try again later."
          });
        }
      })["catch"](function (error) {
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
    value: function requestDistricts(stateCode) {
      var _this = this;

      axios.get("/address/get-districts?code=".concat(stateCode)).then(function (_ref6) {
        var districts = _ref6.data;

        if (districts && districts.length > 0) {
          _this.populateDistricts(districts);
        }
      })["catch"](function (error) {});
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
      axios.post("/user/search", this.filters).then(function (_ref7) {
        var donors = _ref7.data;

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
      }).then(function (_ref8) {
        var data = _ref8.data;
        $.toaster({
          settings: {
            timeout: 6000
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
            message: "".concat(data.t_result, " ").concat(data.t_apply_count !== null ? "\nRemaining Quota for today is " + (35 - parseInt(data.t_apply_count, 10)) + "." : null)
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
