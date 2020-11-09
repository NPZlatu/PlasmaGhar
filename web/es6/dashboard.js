class Dashboard {
  constructor() {
    this.filters = {
      blood_group: "",
      state: "",
      district: "",
    };
    this.setUpListeners();
    this.requestDistricts = this.requestDistricts.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  setUpListeners() {
    this.setUpSearchFieldsListeners();
    this.setUpRequestListsForDonorListeners();
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
        $.toaster({ settings: { timeout: 20000 } });
        $.toaster({
          priority: "success",
          title: "Success",
          message:
            data.t_result +
            ` Your number is now sent to the accepted requester. Please expect a call from him/her. If he/she doesn't call,reject the request. If he/she calls and blood is confirmed, please change the status to Blood Confirmed.`,
        });
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
          $.toaster({ settings: { timeout: 20000 } });

          $.toaster({
            priority: "success",
            title: "Success",
            message: `Thank you for donating the plasma. Your small help does save a needy life.`,
          });
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
          $.toaster({ settings: { timeout: 20000 } });

          $.toaster({
            priority: "success",
            title: "Success",
            message: `Thank you for the confirmation.`,
          });
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
          $.toaster({ settings: { timeout: 20000 } });

          $.toaster({
            priority: "success",
            title: "Success",
            message: data.t_result,
          });
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
          $.toaster({ settings: { timeout: 20000 } });

          $.toaster({
            priority: "success",
            title: "Success",
            message: data.t_result,
          });
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
            self.sendRequestToDonor(donorId, self.filters);
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    $("#searchModal").modal("show");
  }

  sendRequestToDonor(donorId, filters) {
    axios
      .post("/request/donor", {
        p_donor_id: donorId,
        p_requested_blood_group: filters.blood_group,
        p_requested_state: filters.state,
        p_requested_district: filters.district,
      })
      .then(({ data }) => {
        $.toaster({ settings: { timeout: 6000 } });
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
                  (35 - parseInt(data.t_apply_count, 10)) +
                  "."
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
      });
  }
}

$(document).ready(function () {
  new Dashboard();
});
