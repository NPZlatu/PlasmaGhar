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
        required: {
          regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
    this.setUpListeners();
  }

  _createClass(Home, [{
    key: "setUpListeners",
    value: function setUpListeners() {
      $(".btn-help").on("click", this.onIWillHelpClick);
    }
  }, {
    key: "onIWillHelpClick",
    value: function onIWillHelpClick() {
      axios.get("/user/who-am-i").then(function (_ref) {
        var user = _ref.data;

        if (user.id) {
          window.location.href = "/dashboard";
        } else {
          $("#signinModal").modal("show");
        }
      })["catch"](function (error) {
        console.log(error);
      });
    }
  }]);

  return Home;
}();

$(document).ready(function () {
  new Home();
});
//# sourceMappingURL=home.js.map
