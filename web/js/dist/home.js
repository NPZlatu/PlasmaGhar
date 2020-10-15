"use strict";

$(document).ready(function () {
  function initialize() {
    setUpListeners();
  }

  function setUpListeners() {
    $(".btn-help").on("click", function () {
      openModalIfUserIsNotLoggedIn();
    });
  }

  function openModalIfUserIsNotLoggedIn() {
    axios.get("/user/who-am-i").then(function (_ref) {
      var user = _ref.data;

      if (user.id) {
        window.location.href = "/dashboard";
      } else {
        $("#signinModal").modal("show");
      }
    })["catch"](function (error) {});
  }

  initialize();
});
//# sourceMappingURL=home.js.map
