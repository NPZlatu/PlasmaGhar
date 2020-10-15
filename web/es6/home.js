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
    axios
      .get(`/user/who-am-i`)
      .then(({ data: user }) => {
        if (user.id) {
          window.location.href = "/dashboard";
        } else {
          $("#signinModal").modal("show");
        }
      })
      .catch(function (error) {});
  }

  initialize();
});
