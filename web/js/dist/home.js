"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Home = /*#__PURE__*/function () {
  function Home() {
    _classCallCheck(this, Home);

    this.clicked = false;
    this.model = [{
      selector: "fb-firstName",
      rules: {
        required: {
          value: true,
          error: "First name is required."
        }
      },
      value: ""
    }, {
      selector: "fb-lastName",
      rules: {
        required: {
          value: true,
          error: "Last name is required."
        }
      },
      value: ""
    }, {
      selector: "fb-email",
      rules: {
        regex: {
          value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          error: "Please enter a valid email address"
        }
      },
      value: ""
    }, {
      selector: "fb-msg",
      rules: {
        required: {
          value: true,
          error: "Message is required."
        }
      },
      value: "Message is required"
    }];
    this.filters = {
      blood_group: "",
      state: "",
      district: ""
    };
    this.checkValidation = this.checkValidation.bind(this);
    this.onFeedBackSubmit = this.onFeedBackSubmit.bind(this);
    this.requestDistricts = this.requestDistricts.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onRequestClick = this.onRequestClick.bind(this);
    this.setUpListeners();
  }

  _createClass(Home, [{
    key: "setUpListeners",
    value: function setUpListeners() {
      this.setUpOnBlurListeners();
      this.setUpSearchFieldsListeners();
      this.setModalListeners();
      this.setSearchListPageListeners();
      $(".btn-help").on("click", this.onIWillHelpClick);
      $(".feedback-send").on("click", this.onFeedBackSubmit);
      $(".search-btn").on("click", this.onSearchClick);
    }
  }, {
    key: "setSearchListPageListeners",
    value: function setSearchListPageListeners() {
      if (location.href.includes("/search?")) {
        var searchParams = new URLSearchParams(window.location.search);

        if (searchParams.has("blood_group")) {
          this.filters.blood_group = searchParams.get("blood_group");
        }

        if (searchParams.has("state")) {
          this.filters.state = searchParams.get("state");
        }

        if (searchParams.has("district")) {
          this.filters.district = searchParams.get("district");
        }

        var self = this;
        $(".btn-search-req").on("click", function () {
          var donorId = $(this).attr("data-id");
          self.onRequestClick(donorId, self.filters, "not-required");
        });
      }
    }
  }, {
    key: "setModalListeners",
    value: function setModalListeners() {
      if (location.href.includes("/search?")) {
        $("#searchModal").modal("show");
      }

      $("#searchModal").on("hidden.bs.modal", function () {
        if (location.href.includes("/search?")) {
          location.href = "/";
        } else {
          location.reload(true);
        }
      });
    }
  }, {
    key: "setUpSearchFieldsListeners",
    value: function setUpSearchFieldsListeners() {
      var self = this;
      $(".state-dropdown a").on("click", function () {
        var code = $(this).attr("data-code");
        var state = $(this).attr("data-name");
        self.filters.state = state;
        $(".filter-div").show();
        $(".filter-state").show();
        $(".select-state").text(state);
        self.requestDistricts(code);
      });
      $(".bg-dropdown a").on("click", function () {
        var bloodGroup = $(this).text();
        $(".filter-div").show();
        $(".filter-bg").show();
        $(".select-bg").text(bloodGroup);
        self.filters.blood_group = bloodGroup;
      });
      $(".clear-filter").on("click", this.resetFilters);
    }
  }, {
    key: "onRequestClick",
    value: function onRequestClick(donorId, filters, user) {
      if (user === "not-required") {
        donorId = parseInt(donorId, 10);
        this.sendRequestToDonor(donorId, filters);
      } else {
        if (user.id) {
          if (user.role === "donor") {
            $.toaster({
              settings: {
                timeout: 10000
              }
            });
            $.toaster({
              priority: "danger",
              title: "Error",
              message: "You are logged in as a donar. You need to be a receiver to be able to request plasma!"
            });
          } else {
            donorId = parseInt(donorId, 10);
            this.sendRequestToDonor(donorId, filters);
          }
        } else {
          $("#signinModal").modal("show");
        }
      }
    }
  }, {
    key: "sendRequestToDonor",
    value: function sendRequestToDonor(donorId, filters) {
      axios.post("/request/donor", {
        p_donor_id: donorId,
        p_requested_blood_group: filters.blood_group,
        p_requested_state: filters.state,
        p_requested_district: filters.district
      }).then(function (_ref) {
        var data = _ref.data;
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
  }, {
    key: "requestDistricts",
    value: function requestDistricts(stateCode) {
      var _this = this;

      axios.get("/address/get-districts?code=".concat(stateCode)).then(function (_ref2) {
        var districts = _ref2.data;

        if (districts && districts.length > 0) {
          _this.populateDistricts(districts);
        }
      })["catch"](function (error) {});
    }
  }, {
    key: "requestSearchLists",
    value: function requestSearchLists(user) {
      var _this2 = this;

      $(".table-searchlist tbody").html("");
      $(".table-searchlist tbody td button").unbind("click");
      $("#searchModal").modal("show");
      axios.post("/user/search", this.filters).then(function (_ref3) {
        var donors = _ref3.data;

        if (donors.length > 0) {
          var self = _this2;
          var trElement = [];
          donors.forEach(function (donor, index) {
            trElement.push("\n            <tr>\n            <td> ".concat(index + 1, " </td>\n            <td>Donor-").concat(donor.id, "</td>\n            <td> ").concat(donor.blood_group, "</td>\n            <td> ").concat(donor.district, "</td>\n            <td><button type=\"button\"\n            data-id=\"").concat(donor.id, "\"\n            class=\"btn btn-sm btn-outline-success\">Request</button>\n            </td>\n            </tr>\n            "));
          });
          $(".table-searchlist tbody").append(trElement.join(""));
          $(".table-searchlist tbody td button").on("click", function () {
            var donorId = $(this).attr("data-id");
            self.onRequestClick(donorId, self.filters, user);
          });
        }
      })["catch"](function (error) {
        console.log(error);
      });
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
        $(".filter-div").show();
        $(".filter-district").show();
        $(".select-district").text(district);
        self.filters.district = district;
      });
    }
  }, {
    key: "setUpOnBlurListeners",
    value: function setUpOnBlurListeners() {
      var _this3 = this;

      this.model.map(function (v, index) {
        var selector = v.selector,
            rules = v.rules;
        var self = _this3;
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
    key: "onIWillHelpClick",
    value: function onIWillHelpClick() {
      axios.get("/user/who-am-i").then(function (_ref4) {
        var user = _ref4.data;

        if (user.id) {
          window.location.href = "/dashboard";
        } else {
          $("#signinModal").modal("show");
        }
      })["catch"](function (error) {
        console.log(error);
      });
    }
  }, {
    key: "onSearchClick",
    value: function onSearchClick() {
      var _this4 = this;

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

      if (valid) {
        axios.get("/user/who-am-i").then(function (_ref5) {
          var user = _ref5.data;

          if (user.id) {
            if (user.role === "donor") {
              $.toaster({
                settings: {
                  timeout: 10000
                }
              });
              $.toaster({
                priority: "danger",
                title: "Error",
                message: "You are logged in as a donar. You need to be a receiver to be able to request plasma!"
              });
            } else {
              _this4.requestSearchLists(user);
            }
          } else {
            $(".confirm-signin").attr("data-nexturl", "/search?blood_group=".concat(encodeURIComponent(bloodGroup), "&state=").concat(encodeURIComponent(state), "&district=").concat(encodeURIComponent(district)));
            $(".sign-in-text").text("sign in to view donors");
            $("#signinModal").modal("show");
          }
        });
      }
    }
  }, {
    key: "onFeedBackSubmit",
    value: function onFeedBackSubmit(event) {
      event.preventDefault();
      this.clicked = true;
      var valid = this.checkValidation();

      if (valid) {
        this.sendFeedback();
      }
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
    key: "resetFilters",
    value: function resetFilters() {
      this.filters = {
        blood_group: "",
        state: "",
        district: ""
      };
      $(".filter-div").hide();
      $(".filter-state").hide();
      $(".filter-bg").hide();
      $(".select-state").html("");
      $(".select-bg").html("");
      $(".filter-district").hide();
      $(".select-district").html("");
      $(".district-dropdown").html("");
    }
  }, {
    key: "sendFeedback",
    value: function sendFeedback() {
      var _this5 = this;

      var model = this.model;
      var data = {
        name: model[0].value + " " + model[1].value,
        email: model[2].value,
        message: model[3].value
      };
      axios.post("/site/feedback", data).then(function (_ref6) {
        var response = _ref6.data;
        $.toaster({
          settings: {
            timeout: 3000
          }
        });

        if (response && response.success) {
          _this5.resetForm();

          $.toaster({
            priority: "success",
            title: "Success",
            message: "Your feedback has been submitted successfully."
          });
        } else {
          $.toaster({
            priority: "danger",
            title: "Error",
            message: "Something is wrong. Please try later"
          });
        }
      })["catch"](function (error) {
        $.toaster({
          priority: "danger",
          title: "Error",
          message: "Something is wrong. Please try later"
        });
      });
    }
  }]);

  return Home;
}();

$(document).ready(function () {
  new Home();
});
//# sourceMappingURL=home.js.map
