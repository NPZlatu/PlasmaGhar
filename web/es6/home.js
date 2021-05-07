class Home {
  constructor() {
    this.clicked = false;
    this.requestToDonorProgress = false;
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
          regex: {
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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

    this.filters = {
      blood_group: "",
      state: "",
      district: "",
    };

    this.checkValidation = this.checkValidation.bind(this);
    this.onFeedBackSubmit = this.onFeedBackSubmit.bind(this);
    this.requestDistricts = this.requestDistricts.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onRequestClick = this.onRequestClick.bind(this);
    this.setUpListeners();
  }

  setUpListeners() {
    this.setUpOnBlurListeners();
    this.setUpSearchFieldsListeners();
    this.setModalListeners();
    this.setSearchListPageListeners();
    $(".btn-help").on("click", this.onIWillHelpClick);
    $(".feedback-send").on("click", this.onFeedBackSubmit);
    $(".search-btn").on("click", this.onSearchClick);
  }

  setSearchListPageListeners() {
    if (location.href.includes("/search?")) {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has("blood_group")) {
        this.filters.blood_group = searchParams.get("blood_group");
      }
      if (searchParams.has("state")) {
        this.filters.state = searchParams.get("state");
      }
      if (searchParams.has("district")) {
        this.filters.district = searchParams.get("district");
      }
      const self = this;

      $(".btn-search-req").on("click", function () {
        const donorId = $(this).attr("data-id");
        self.onRequestClick(donorId, self.filters, "not-required");
      });
    }
  }

  setModalListeners() {
    if (location.href.includes("/search?")) {
      $("#searchModal").modal("show");
    }

    $("#searchModal").on("hidden.bs.modal", () => {
      if (location.href.includes("/search?")) {
        location.href = "/";
      } else {
        location.reload(true);
      }
    });
  }

  setUpSearchFieldsListeners() {
    const self = this;
    $(".state-dropdown a").on("click", function () {
      const code = $(this).attr("data-code");
      const state = $(this).attr("data-name");
      self.filters.state = state;
      $(".filter-div").show();
      $(".filter-state").show();
      $(".select-state").text(state);
      self.requestDistricts(code);
    });

    $(".bg-dropdown a").on("click", function () {
      const bloodGroup = $(this).text();
      $(".filter-div").show();
      $(".filter-bg").show();
      $(".select-bg").text(bloodGroup);
      self.filters.blood_group = bloodGroup;
    });

    $(".clear-filter").on("click", this.resetFilters);
  }

  onRequestClick(donorId, filters, user) {
    if (user === "not-required") {
      donorId = parseInt(donorId, 10);
      if (!this.requestToDonorProgress)
        this.sendRequestToDonor(donorId, filters);
    } else {
      if (user.id) {
        if (user.role === "donor") {
          $.toaster({ settings: { timeout: 10000 } });
          $.toaster({
            priority: "danger",
            title: "Error",
            message: `You are logged in as a donar. You need to be a receiver to be able to request plasma!`,
          });
        } else {
          donorId = parseInt(donorId, 10);
          if (!this.requestToDonorProgress)
            this.sendRequestToDonor(donorId, filters);
        }
      } else {
        $("#signinModal").modal("show");
      }
    }
  }

  sendRequestToDonor(donorId, filters) {
    this.requestToDonorProgress = true;
    axios
      .post("/request/donor", {
        p_donor_id: donorId,
        p_requested_blood_group: filters.blood_group,
        p_requested_state: filters.state,
        p_requested_district: filters.district,
      })
      .then(({ data }) => {
        $.toaster({ settings: { timeout: 16000 } });
        if (
          data &&
          data.t_result &&
          data.t_result === "Your apply request is succeeded."
        ) {
          const selector = `button[data-id='${donorId}']`;
          $(selector).text("Requested");
          $(selector).prop("disabled", true);
          $(selector).prop("onclick", null).off("click");

          $.toaster({
            priority: "success",
            title: "Success",
            message: `${data.t_result} ${
              data.t_apply_count !== null
                ? "\nRemaining Quota for today is " +
                  (35 - parseInt(data.t_apply_count, 10))
                : null
            }`,
          });
          this.requestToDonorProgress = false;
        } else {
          $.toaster({ settings: { timeout: 1000 } });
          $.toaster({
            priority: "danger",
            title: "Error",
            message: `Something is wrong! Please try again later. If the issue persist for long time, please contact us.`,
          });
          this.requestToDonorProgress = false;
        }
      })
      .catch(function (error) {
        console.log(error);
        $.toaster({
          priority: "danger",
          title: "Error",
          message: `Something is wrong! Please try again later. If the issue persist for long time, please contact us.`,
        });
        this.requestToDonorProgress = false;
      });
  }

  requestDistricts(stateCode) {
    axios
      .get(`/address/get-districts?code=${stateCode}`)
      .then(({ data: districts }) => {
        if (districts && districts.length > 0) {
          this.populateDistricts(districts);
        }
      })
      .catch(function (error) {});
  }

  requestSearchLists(user) {
    $(".table-searchlist tbody").html("");
    $(".table-searchlist tbody td button").unbind("click");
    $("#searchModal").modal("show");

    axios
      .post("/user/search", this.filters)
      .then(({ data: donors }) => {
        if (donors.length > 0) {
          const self = this;
          const trElement = [];
          donors.forEach((donor, index) => {
            trElement.push(`
            <tr>
            <td> ${index + 1} </td>
            <td>Donor-${donor.id}</td>
            <td> ${donor.blood_group}</td>
            <td> ${donor.district}</td>
            <td><button type="button"
            data-id="${donor.id}"
            class="btn btn-sm btn-outline-success">Request</button>
            </td>
            </tr>
            `);
          });
          $(".table-searchlist tbody").append(trElement.join(""));
          $(".table-searchlist tbody td button").on("click", function () {
            const donorId = $(this).attr("data-id");
            self.onRequestClick(donorId, self.filters, user);
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  populateDistricts(districts) {
    const elements = [];
    $(".district-dropdown").html("");
    districts.forEach((district) => {
      elements.push(
        `<a class="dropdown-item" href="javascript:void(0)">${district.name}</a>`
      );
    });
    $(".district-dropdown").append(elements.join(""));
    $(".district-dropdown a").unbind("click");
    const self = this;

    $(".district-dropdown a").on("click", function () {
      const district = $(this).text();
      $(".filter-div").show();
      $(".filter-district").show();
      $(".select-district").text(district);
      self.filters.district = district;
    });
  }

  setUpOnBlurListeners() {
    this.model.map((v, index) => {
      const { selector, rules } = v;
      const self = this;
      $(`#${selector}`).blur(function () {
        if (self.clicked) self.showError(selector, rules, index);
      });
    });
  }

  showError(selector, rules, index) {
    const element = $(`#${selector}`);
    const value = element.val();
    const errorElement = element.next();
    let message = "";
    let valid = true;

    if (!value && rules.required && rules.required.value) {
      if (!rules.required.conditions) {
        valid = false;
        message = rules.required.error;
      } else {
        rules.required.conditions.forEach((cond) => {
          const selector = cond.selector;
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
      const matchSelectorVal = $(`#${rules.match.value}`).val();
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

  checkValidation() {
    let valid = true;
    let retrunVal = true;
    for (let i = 0; i < this.model.length; i++) {
      const { selector, rules } = this.model[i];
      valid = this.showError(selector, rules, i);
      if (!valid) retrunVal = false;
    }
    return retrunVal;
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

  onSearchClick() {
    const { blood_group: bloodGroup, state, district } = this.filters;
    let valid = true;
    if (!bloodGroup) {
      $.toaster({ settings: { timeout: 4000 } });
      $.toaster({
        priority: "danger",
        title: "Error",
        message: `Please choose the blood group!`,
      });
      valid = false;
    }

    if (!state) {
      $.toaster({ settings: { timeout: 4000 } });
      $.toaster({
        priority: "danger",
        title: "Error",
        message: `Please choose the state!`,
      });
      valid = false;
    }

    if (!district) {
      $.toaster({ settings: { timeout: 4000 } });
      $.toaster({
        priority: "danger",
        title: "Error",
        message: `Please choose the district!`,
      });
      valid = false;
    }

    if (valid) {
      axios.get(`/user/who-am-i`).then(({ data: user }) => {
        if (user.id) {
          if (user.role === "donor") {
            $.toaster({ settings: { timeout: 10000 } });
            $.toaster({
              priority: "danger",
              title: "Error",
              message: `You are logged in as a donar. You need to be a receiver to be able to request plasma!`,
            });
          } else {
            this.requestSearchLists(user);
          }
        } else {
          $(".confirm-signin").attr(
            "data-nexturl",
            `/search?blood_group=${encodeURIComponent(
              bloodGroup
            )}&state=${encodeURIComponent(state)}&district=${encodeURIComponent(
              district
            )}`
          );
          $(".sign-in-text").text("sign in to view donors");
          $("#signinModal").modal("show");
        }
      });
    }
  }

  onFeedBackSubmit(event) {
    event.preventDefault();
    this.clicked = true;
    const valid = this.checkValidation();
    if (valid) {
      this.sendFeedback();
    }
  }

  resetForm() {
    this.model.forEach((v) => {
      const { selector } = v;
      $(`#${selector}`).val("");
      v.value = "";
    });
    $(".invalid-feedback").hide();
  }

  resetFilters() {
    this.filters = {
      blood_group: "",
      state: "",
      district: "",
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

  sendFeedback() {
    const { model } = this;
    const data = {
      name: model[0].value + " " + model[1].value,
      email: model[2].value,
      message: model[3].value,
    };

    axios
      .post("/site/feedback", data)
      .then(({ data: response }) => {
        $.toaster({ settings: { timeout: 3000 } });
        if (response && response.success) {
          this.resetForm();
          $.toaster({
            priority: "success",
            title: "Success",
            message: `Your feedback has been submitted successfully.`,
          });
        } else {
          $.toaster({
            priority: "danger",
            title: "Error",
            message: `Something is wrong. Please try later`,
          });
        }
      })
      .catch(function (error) {
        $.toaster({
          priority: "danger",
          title: "Error",
          message: `Something is wrong. Please try later`,
        });
      });
  }
}

$(document).ready(function () {
  new Home();
});
