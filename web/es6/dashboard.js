class Dashboard {
  constructor() {
    this.filters = {
      blood_group: "",
      state: "",
      district: "",
    };
    this.user = {};
    this.clicked = false;
    this.requestToDonorProgress = false;

    this.model = [
      {
        selector: "uBloodGroup",
        rules: {
          required: {
            value: true,
            conditions: "donor",
            error: "Blood Group is required.",
          },
        },
        value: "",
      },

      {
        selector: "uState",
        rules: {
          required: {
            value: true,
            error: "State is required.",
          },
        },
        value: "",
      },
      {
        selector: "uDistrict",
        rules: {
          required: {
            value: true,
            error: "District is required.",
          },
        },
        value: "",
      },
    ];

    this.requestDistricts = this.requestDistricts.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onEditInfoClick = this.onEditInfoClick.bind(this);
    this.onChangePasswordClick = this.onChangePasswordClick.bind(this);
    this.setUpOnBlurListeners = this.setUpOnBlurListeners.bind(this);
    this.onUpdateConfirmClick = this.onUpdateConfirmClick.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.onConfirmPasswordChangeClick = this.onConfirmPasswordChangeClick.bind(
      this
    );
    this.setUpListeners();
    this.handleAlertMessages();
  }

  handleAlertMessages() {
    const message = localStorage.getItem("message");
    if (message) {
      localStorage.removeItem("message");
      $.toaster({ settings: { timeout: 20000 } });
      $.toaster({
        priority: "success",
        title: "Success",
        message: message,
      });
    }
  }

  setUpListeners() {
    this.setUpSearchFieldsListeners();
    this.setUpRequestListsForDonorListeners();
    this.setUpAccountBtnsListeners();
    this.setUpOnBlurListeners();
  }

  setUpRequestListsForDonorListeners() {
    $(".donor-accept-btn").on("click", this.onAcceptBtnClick);
    $(".donor-bloodconfirm-btn").on(
      "click",
      this.onBloodConfirmBtnClickByDonor
    );
    $(".donor-reject-btn").on("click", this.onDonorRejectBtnClick);
    $(".receiver-reject-btn").on("click", this.onReceiverRejectBtnClick);
    $(".receiver-bloodconfirm-btn").on(
      "click",
      this.onBloodConfirmBtnClickByReceiver
    );
  }

  setUpAccountBtnsListeners() {
    $(".btn-not-interested").on("click", () => {
      axios
        .post("/change-active-status", { user_status: 9 })
        .then(({ data }) => {
          if (data.success) {
            localStorage.setItem(
              "message",
              `Your current status is uninterested. You can always change your status.`
            );
            location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    $(".btn-re-interested").on("click", () => {
      axios
        .post("/change-active-status", { user_status: 0 })
        .then(({ data }) => {
          if (data.success) {
            localStorage.setItem(
              "message",
              `Awesome. You are now re-activated. You can contribute on donation from now.`
            );
            location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    $(".edit-info").on("click", this.onEditInfoClick);
    $(".change-password").on("click", this.onChangePasswordClick);
    $(".confirm-update").on("click", this.onUpdateConfirmClick);
    $(".confirm-change-password").on(
      "click",
      this.onConfirmPasswordChangeClick
    );
  }

  onConfirmPasswordChangeClick() {
    const oldPasswordVal = $("#oldpassword").val();
    const newPasswordVal = $("#newpassword").val();
    const confirmNewPasswordVal = $("#confirmnewpassword").val();
    let errorMessage = "";
    if (!oldPasswordVal) {
      errorMessage = "You must enter your current password.";
    } else if (!newPasswordVal) {
      errorMessage = "You must enter your new password";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(newPasswordVal)) {
      errorMessage =
        "New Password must be minimum eight characters, at least one letter and one number";
    } else if (newPasswordVal != confirmNewPasswordVal) {
      errorMessage = "New password and confirm password do not match";
    }

    if (errorMessage) {
      $.toaster({ settings: { timeout: 5000 } });
      $.toaster({
        priority: "danger",
        title: "Error",
        message: errorMessage,
      });
    } else {
      const model = {
        current_password: oldPasswordVal,
        new_password: newPasswordVal,
        id: this.user.id,
      };

      axios
        .post("/user/change-password", model)
        .then(({ data: response }) => {
          if (response && response.success) {
            localStorage.setItem(
              "message",
              "Password is changed successfully."
            );
            location.reload();
          } else if (response && response.error == "Invalid current password") {
            $.toaster({ settings: { timeout: 5000 } });
            $.toaster({
              priority: "danger",
              title: "Error",
              message: `You have entered an invalid current password`,
            });
          } else {
            $.toaster({ settings: { timeout: 5000 } });
            $.toaster({
              priority: "danger",
              title: "Error",
              message: `Something is wrong. Please try again later`,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          $.toaster({ settings: { timeout: 5000 } });
          $.toaster({
            priority: "danger",
            title: "Error",
            message: `Something is wrong. Please try again later`,
          });
        });
    }
  }

  onUpdateConfirmClick() {
    this.clicked = true;
    const valid = this.checkValidation();
    if (valid) {
      this.updateUser();
    }
  }

  updateUser() {
    const user = {
      id: this.user.id,
      blood_group: this.model[0].value,
      state: this.model[1].value,
      district: this.model[2].value,
    };

    axios
      .post("/user/update", user)
      .then(({ data: response }) => {
        if (response && response.success) {
          localStorage.setItem(
            "message",
            "The user info is successfully updated."
          );
          location.reload();
        } else {
          console.log(error);
          $.toaster({ settings: { timeout: 5000 } });
          $.toaster({
            priority: "danger",
            title: "Error",
            message: `Something is wrong. Please try again later`,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        $.toaster({ settings: { timeout: 5000 } });
        $.toaster({
          priority: "danger",
          title: "Error",
          message: `Something is wrong. Please try again later`,
        });
      });
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

  onEditInfoClick() {
    $("#updateModal").modal("show");
    const user = $(".edit-info").data("params");
    this.user = user;
    $("#uBloodGroup").val(user.blood_group);
    $("#uState").val(user.state);
    const code = $("option:selected", "#uState").data("code");
    this.requestDistricts(code, true);
  }

  onChangePasswordClick() {
    $("#changePasswordModal").modal("show");
    const user = $(".change-password").data("params");
    this.user = user;
  }

  setUpOnBlurListeners() {
    const self = this;

    $("#uState").on("change", function () {
      if (this.value) {
        const code = $("option:selected", this).data("code");
        self.user.district = "";
        self.requestDistricts(code, true);
      } else {
        $(".district-wrapper").hide();
      }
    });

    this.model.map((v, index) => {
      const { selector, rules } = v;
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

  onAcceptBtnClick() {
    const receiver = $(this).data("params");

    const model = {
      p_donor_id: receiver.donor_id,
      p_requested_blood_group: receiver.requested_blood_group,
      p_requested_state: receiver.requested_state,
      p_requested_district: receiver.requested_district,
      p_receiver_id: receiver.receiver_id,
      p_action: "accept",
      p_action_by: "donor",
      p_relationship: "diff",
    };

    axios
      .post("/accept/requester", model)
      .then(({ data }) => {
        localStorage.setItem(
          "message",
          data.t_result +
            ` Your number is now sent to the accepted requester. Please expect a call from him/her. If he/she doesn't call,reject the request. If he/she calls and blood is confirmed, please change the status to Blood Confirmed.
            `
        );
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onBloodConfirmBtnClickByDonor() {
    const receiver = $(this).data("params");
    const model = {
      p_donor_id: receiver.donor_id,
      p_requested_blood_group: receiver.requested_blood_group,
      p_requested_state: receiver.requested_state,
      p_requested_district: receiver.requested_district,
      p_receiver_id: receiver.receiver_id,
      p_action: "accept",
      p_action_by: "donor",
      p_relationship: "same",
    };

    axios
      .post("/confirm/blood", model)
      .then(({ data }) => {
        if (data.t_result === "Your accept request is succeeded.") {
          localStorage.setItem(
            "message",
            "Thank you for donating the plasma. Your small help does save a needy life."
          );
          location.reload();
        } else {
          $.toaster({ settings: { timeout: 1000 } });

          $.toaster({
            priority: "danger",
            title: "Error",
            message: `Something is wrong. Please try again later.`,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        $.toaster({ settings: { timeout: 1000 } });

        $.toaster({
          priority: "danger",
          title: "Error",
          message: `Something is wrong. Please try again later.`,
        });
      });
  }

  onBloodConfirmBtnClickByReceiver() {
    const donor = $(this).data("params");
    const model = {
      p_donor_id: donor.donor_id,
      p_requested_blood_group: donor.requested_blood_group,
      p_requested_state: donor.requested_state,
      p_requested_district: donor.requested_district,
      p_receiver_id: donor.receiver_id,
      p_action: "accept",
      p_action_by: "receiver",
      p_relationship: "same",
    };

    axios
      .post("/confirm/blood", model)
      .then(({ data }) => {
        if (data.t_result === "Your accept request is succeeded.") {
          localStorage.setItem("message", "Thank you for the confirmation.");
          location.reload();
        } else {
          $.toaster({ settings: { timeout: 1000 } });

          $.toaster({
            priority: "danger",
            title: "Error",
            message: `Something is wrong. Please try again later.`,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        $.toaster({ settings: { timeout: 1000 } });

        $.toaster({
          priority: "danger",
          title: "Error",
          message: `Something is wrong. Please try again later.`,
        });
      });
  }

  onDonorRejectBtnClick() {
    const receiver = $(this).data("params");
    const section = $(this).data("section");
    let relationship = "same";
    if (section === "pendingApprovals") {
      relationship = "diff";
    }
    const model = {
      p_donor_id: receiver.donor_id,
      p_requested_blood_group: receiver.requested_blood_group,
      p_requested_state: receiver.requested_state,
      p_requested_district: receiver.requested_district,
      p_receiver_id: receiver.receiver_id,
      p_action: "cancel",
      p_action_by: "donor",
      p_relationship: relationship,
    };

    axios
      .post("/cancel/request", model)
      .then(({ data }) => {
        if (data.t_result === "Your cancel request is succeeded.") {
          localStorage.setItem("message", data.t_result);
          location.reload();
        } else {
          $.toaster({ settings: { timeout: 1000 } });

          $.toaster({
            priority: "danger",
            title: "Error",
            message: `Something is wrong. Please try again later.`,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        $.toaster({ settings: { timeout: 1000 } });

        $.toaster({
          priority: "danger",
          title: "Error",
          message: `Something is wrong. Please try again later.`,
        });
      });
  }

  onReceiverRejectBtnClick() {
    const receiver = $(this).data("params");
    const section = $(this).data("section");
    let relationship = "same";
    if (section === "pendingApprovals") {
      relationship = "diff";
    }
    const model = {
      p_donor_id: receiver.donor_id,
      p_requested_blood_group: receiver.requested_blood_group,
      p_requested_state: receiver.requested_state,
      p_requested_district: receiver.requested_district,
      p_receiver_id: receiver.receiver_id,
      p_action: "cancel",
      p_action_by: "receiver",
      p_relationship: relationship,
    };

    axios
      .post("/cancel/request", model)
      .then(({ data }) => {
        if (data.t_result === "Your cancel request is succeeded.") {
          localStorage.setItem("message", data.t_result);
          location.reload();
        } else {
          $.toaster({ settings: { timeout: 1000 } });

          $.toaster({
            priority: "danger",
            title: "Error",
            message: `Something is wrong. Please try again later.`,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        $.toaster({ settings: { timeout: 1000 } });

        $.toaster({
          priority: "danger",
          title: "Error",
          message: `Something is wrong. Please try again later.`,
        });
      });
  }

  setUpSearchFieldsListeners() {
    const self = this;
    $(".state-options a").on("click", function () {
      const code = $(this).attr("data-code");
      const state = $(this).attr("data-name");
      self.filters.state = state;
      $("#dash-state-select").text(state);
      self.requestDistricts(code);
    });

    $(".bg-options a").on("click", function () {
      const bloodGroup = $(this).text();
      $(".bg-dropdown-link").text(bloodGroup);
      self.filters.blood_group = bloodGroup;
    });

    $(".search-btn-dash").on("click", function () {
      self.onSearchClick();
    });

    $("#searchModal").on("hidden.bs.modal", () => {
      location.reload(true);
    });
  }

  requestDistricts(stateCode, isUpdate) {
    axios
      .get(`/address/get-districts?code=${stateCode}`)
      .then(({ data: districts }) => {
        if (districts && districts.length > 0) {
          if (isUpdate) this.populateDistrictsUpdate(districts);
          else this.populateDistricts(districts);
        }
      })
      .catch(function (error) {});
  }

  populateDistrictsUpdate(districts) {
    $("#uDistrict").html("");
    let options = "<option selected value>SELECT DISTRICT</option>";
    for (let i = 0; i < districts.length; i++) {
      options += `<option data-code=${districts[i].code} value=${districts[i].name}>${districts[i].name}</option>`;
    }
    $(".district-wrapper").show();
    $("#uDistrict").append(options);

    if (this.user.district) {
      $("#uDistrict").val(this.user.district);
    }
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
      $("#dash-district-select").text(district);
      self.filters.district = district;
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

    if (valid) this.requestSearchLists();
  }

  requestSearchLists() {
    $(".table-searchlist tbody").html("");
    $(".table-searchlist tbody td button").unbind("click");
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
            if (!self.requestToDonorProgress) {
              self.requestToDonorProgress = true;
              self.sendRequestToDonor(donorId, self.filters, self);
            }
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    $("#searchModal").modal("show");
  }

  sendRequestToDonor(donorId, filters, self) {
    axios
      .post("/request/donor", {
        p_donor_id: donorId,
        p_requested_blood_group: filters.blood_group,
        p_requested_state: filters.state,
        p_requested_district: filters.district,
      })
      .then(({ data }) => {
        self.requestToDonorProgress = false;
        $.toaster({ settings: { timeout: 15000 } });
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
        } else {
          $.toaster({ settings: { timeout: 1000 } });
          $.toaster({
            priority: "danger",
            title: "Error",
            message: `Something is wrong! Please try again later. If the issue persist for long time, please contact us.`,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        $.toaster({
          priority: "danger",
          title: "Error",
          message: `Something is wrong! Please try again later. If the issue persist for long time, please contact us.`,
        });
        self.requestToDonorProgress = true;
      });
  }
}

$(document).ready(function () {
  new Dashboard();
});
