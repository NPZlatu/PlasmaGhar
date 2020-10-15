class Home {
  constructor() {
    this.clicked = false;
    this.model = [
      {
        selector: "fb-firstName",
        rules: {
          required: {
            value: true,
            error: "First name is required.",
          },
        },
        value: "",
      },
      {
        selector: "fb-lastName",
        rules: {
          required: {
            value: true,
            error: "Last name is required.",
          },
        },
        value: "",
      },
      {
        selector: "fb-email",
        rules: {
          required: {
            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            error: "Please enter a valid email address",
          },
        },
        value: "",
      },
      {
        selector: "fb-msg",
        rules: {
          required: {
            value: true,
            error: "Message is required.",
          },
        },
        value: "Message is required",
      },
    ];
    this.setUpListeners();
  }

  setUpListeners() {
    $(".btn-help").on("click", this.onIWillHelpClick);
  }

  onIWillHelpClick() {
    axios
      .get(`/user/who-am-i`)
      .then(({ data: user }) => {
        if (user.id) {
          window.location.href = "/dashboard";
        } else {
          $("#signinModal").modal("show");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

$(document).ready(function () {
  new Home();
});
