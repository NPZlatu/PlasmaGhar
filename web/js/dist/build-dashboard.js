"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var s=t[o];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),e}var Dashboard=function(){function e(){_classCallCheck(this,e),this.filters={blood_group:"",state:"",district:""},this.user={},this.clicked=!1,this.model=[{selector:"uBloodGroup",rules:{required:{value:!0,conditions:"donor",error:"Blood Group is required."}},value:""},{selector:"uState",rules:{required:{value:!0,error:"State is required."}},value:""},{selector:"uDistrict",rules:{required:{value:!0,error:"District is required."}},value:""}],this.requestDistricts=this.requestDistricts.bind(this),this.onSearchClick=this.onSearchClick.bind(this),this.onEditInfoClick=this.onEditInfoClick.bind(this),this.onChangePasswordClick=this.onChangePasswordClick.bind(this),this.setUpOnBlurListeners=this.setUpOnBlurListeners.bind(this),this.onUpdateConfirmClick=this.onUpdateConfirmClick.bind(this),this.checkValidation=this.checkValidation.bind(this),this.onConfirmPasswordChangeClick=this.onConfirmPasswordChangeClick.bind(this),this.setUpListeners(),this.handleAlertMessages()}return _createClass(e,[{key:"handleAlertMessages",value:function(){var e=localStorage.getItem("message");e&&(localStorage.removeItem("message"),$.toaster({settings:{timeout:2e4}}),$.toaster({priority:"success",title:"Success",message:e}))}},{key:"setUpListeners",value:function(){this.setUpSearchFieldsListeners(),this.setUpRequestListsForDonorListeners(),this.setUpAccountBtnsListeners(),this.setUpOnBlurListeners()}},{key:"setUpRequestListsForDonorListeners",value:function(){$(".donor-accept-btn").on("click",this.onAcceptBtnClick),$(".donor-bloodconfirm-btn").on("click",this.onBloodConfirmBtnClickByDonor),$(".donor-reject-btn").on("click",this.onDonorRejectBtnClick),$(".receiver-reject-btn").on("click",this.onReceiverRejectBtnClick),$(".receiver-bloodconfirm-btn").on("click",this.onBloodConfirmBtnClickByReceiver)}},{key:"setUpAccountBtnsListeners",value:function(){$(".btn-not-interested").on("click",function(){axios.post("/change-active-status",{user_status:9}).then(function(e){e.data.success&&(localStorage.setItem("message","Your current status is uninterested. You can always change your status."),location.reload())}).catch(function(e){console.log(e)})}),$(".btn-re-interested").on("click",function(){axios.post("/change-active-status",{user_status:0}).then(function(e){e.data.success&&(localStorage.setItem("message","Awesome. You are now re-activated. You can contribute on donation from now."),location.reload())}).catch(function(e){console.log(e)})}),$(".edit-info").on("click",this.onEditInfoClick),$(".change-password").on("click",this.onChangePasswordClick),$(".confirm-update").on("click",this.onUpdateConfirmClick),$(".confirm-change-password").on("click",this.onConfirmPasswordChangeClick)}},{key:"onConfirmPasswordChangeClick",value:function(){var e=$("#oldpassword").val(),t=$("#newpassword").val(),o=$("#confirmnewpassword").val(),s="";e?t?/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(t)?t!=o&&(s="New password and confirm password do not match"):s="New Password must be minimum eight characters, at least one letter and one number":s="You must enter your new password":s="You must enter your current password.",s?($.toaster({settings:{timeout:5e3}}),$.toaster({priority:"danger",title:"Error",message:s})):(t={current_password:e,new_password:t,id:this.user.id},axios.post("/user/change-password",t).then(function(e){e=e.data;e&&e.success?(localStorage.setItem("message","Password is changed successfully."),location.reload()):e&&"Invalid current password"==e.error?($.toaster({settings:{timeout:5e3}}),$.toaster({priority:"danger",title:"Error",message:"You have entered an invalid current password"})):($.toaster({settings:{timeout:5e3}}),$.toaster({priority:"danger",title:"Error",message:"Something is wrong. Please try again later"}))}).catch(function(e){console.log(e),$.toaster({settings:{timeout:5e3}}),$.toaster({priority:"danger",title:"Error",message:"Something is wrong. Please try again later"})}))}},{key:"onUpdateConfirmClick",value:function(){this.clicked=!0,this.checkValidation()&&this.updateUser()}},{key:"updateUser",value:function(){var e={id:this.user.id,blood_group:this.model[0].value,state:this.model[1].value,district:this.model[2].value};axios.post("/user/update",e).then(function(e){e=e.data;e&&e.success?(localStorage.setItem("message","The user info is successfully updated."),location.reload()):(console.log(error),$.toaster({settings:{timeout:5e3}}),$.toaster({priority:"danger",title:"Error",message:"Something is wrong. Please try again later"}))}).catch(function(e){console.log(e),$.toaster({settings:{timeout:5e3}}),$.toaster({priority:"danger",title:"Error",message:"Something is wrong. Please try again later"})})}},{key:"checkValidation",value:function(){for(var e=!0,t=0;t<this.model.length;t++){var o=this.model[t],s=o.selector,o=o.rules;this.showError(s,o,t)||(e=!1)}return e}},{key:"onEditInfoClick",value:function(){$("#updateModal").modal("show");var e=$(".edit-info").data("params");this.user=e,$("#uBloodGroup").val(e.blood_group),$("#uState").val(e.state);e=$("option:selected","#uState").data("code");this.requestDistricts(e,!0)}},{key:"onChangePasswordClick",value:function(){$("#changePasswordModal").modal("show");var e=$(".change-password").data("params");this.user=e}},{key:"setUpOnBlurListeners",value:function(){var r=this;$("#uState").on("change",function(){var e;this.value?(e=$("option:selected",this).data("code"),r.user.district="",r.requestDistricts(e,!0)):$(".district-wrapper").hide()}),this.model.map(function(e,t){var o=e.selector,s=e.rules;$("#".concat(o)).blur(function(){r.clicked&&r.showError(o,s,t)})})}},{key:"showError",value:function(e,t,o){var s=$("#".concat(e)),r=s.val(),i=s.next(),e="",s=!0;return!r&&t.required&&t.required.value?(!t.required.conditions||t.required.conditions&&0==this.user.user_role)&&(s=!1,e=t.required.error):t.regex?(s=new RegExp(t.regex.value).test(r),t.required&&!1===t.required.value&&(s=!r||s),s||(e=t.regex.error)):t.match&&r!==$("#".concat(t.match.value)).val()&&(s=!1,e=t.match.error),!s&&e?(i.text(e),i.show()):(i.text(""),i.hide()),this.model[o].value=r,s}},{key:"onAcceptBtnClick",value:function(){var e=$(this).data("params"),e={p_donor_id:e.donor_id,p_requested_blood_group:e.requested_blood_group,p_requested_state:e.requested_state,p_requested_district:e.requested_district,p_receiver_id:e.receiver_id,p_action:"accept",p_action_by:"donor",p_relationship:"diff"};axios.post("/accept/requester",e).then(function(e){e=e.data;localStorage.setItem("message",e.t_result+" Your number is now sent to the accepted requester. Please expect a call from him/her. If he/she doesn't call,reject the request. If he/she calls and blood is confirmed, please change the status to Blood Confirmed."),location.reload()}).catch(function(e){console.log(e)})}},{key:"onBloodConfirmBtnClickByDonor",value:function(){var e=$(this).data("params"),e={p_donor_id:e.donor_id,p_requested_blood_group:e.requested_blood_group,p_requested_state:e.requested_state,p_requested_district:e.requested_district,p_receiver_id:e.receiver_id,p_action:"accept",p_action_by:"donor",p_relationship:"same"};axios.post("/confirm/blood",e).then(function(e){"Your accept request is succeeded."===e.data.t_result?(localStorage.setItem("message","Thank you for donating the plasma. Your small help does save a needy life."),location.reload()):($.toaster({settings:{timeout:1e3}}),$.toaster({priority:"danger",title:"Error",message:"Something is wrong. Please try again later."}))}).catch(function(e){console.log(e),$.toaster({settings:{timeout:1e3}}),$.toaster({priority:"danger",title:"Error",message:"Something is wrong. Please try again later."})})}},{key:"onBloodConfirmBtnClickByReceiver",value:function(){var e=$(this).data("params"),e={p_donor_id:e.donor_id,p_requested_blood_group:e.requested_blood_group,p_requested_state:e.requested_state,p_requested_district:e.requested_district,p_receiver_id:e.receiver_id,p_action:"accept",p_action_by:"receiver",p_relationship:"same"};axios.post("/confirm/blood",e).then(function(e){"Your accept request is succeeded."===e.data.t_result?(localStorage.setItem("message","Thank you for the confirmation."),location.reload()):($.toaster({settings:{timeout:1e3}}),$.toaster({priority:"danger",title:"Error",message:"Something is wrong. Please try again later."}))}).catch(function(e){console.log(e),$.toaster({settings:{timeout:1e3}}),$.toaster({priority:"danger",title:"Error",message:"Something is wrong. Please try again later."})})}},{key:"onDonorRejectBtnClick",value:function(){var e=$(this).data("params"),t="same";"pendingApprovals"===$(this).data("section")&&(t="diff");t={p_donor_id:e.donor_id,p_requested_blood_group:e.requested_blood_group,p_requested_state:e.requested_state,p_requested_district:e.requested_district,p_receiver_id:e.receiver_id,p_action:"cancel",p_action_by:"donor",p_relationship:t};axios.post("/cancel/request",t).then(function(e){e=e.data;"Your cancel request is succeeded."===e.t_result?(localStorage.setItem("message",e.t_result),location.reload()):($.toaster({settings:{timeout:1e3}}),$.toaster({priority:"danger",title:"Error",message:"Something is wrong. Please try again later."}))}).catch(function(e){console.log(e),$.toaster({settings:{timeout:1e3}}),$.toaster({priority:"danger",title:"Error",message:"Something is wrong. Please try again later."})})}},{key:"onReceiverRejectBtnClick",value:function(){var e=$(this).data("params"),t="same";"pendingApprovals"===$(this).data("section")&&(t="diff");t={p_donor_id:e.donor_id,p_requested_blood_group:e.requested_blood_group,p_requested_state:e.requested_state,p_requested_district:e.requested_district,p_receiver_id:e.receiver_id,p_action:"cancel",p_action_by:"receiver",p_relationship:t};axios.post("/cancel/request",t).then(function(e){e=e.data;"Your cancel request is succeeded."===e.t_result?(localStorage.setItem("message",e.t_result),location.reload()):($.toaster({settings:{timeout:1e3}}),$.toaster({priority:"danger",title:"Error",message:"Something is wrong. Please try again later."}))}).catch(function(e){console.log(e),$.toaster({settings:{timeout:1e3}}),$.toaster({priority:"danger",title:"Error",message:"Something is wrong. Please try again later."})})}},{key:"setUpSearchFieldsListeners",value:function(){var o=this;$(".state-options a").on("click",function(){var e=$(this).attr("data-code"),t=$(this).attr("data-name");o.filters.state=t,$("#dash-state-select").text(t),o.requestDistricts(e)}),$(".bg-options a").on("click",function(){var e=$(this).text();$(".bg-dropdown-link").text(e),o.filters.blood_group=e}),$(".search-btn-dash").on("click",function(){o.onSearchClick()}),$("#searchModal").on("hidden.bs.modal",function(){location.reload(!0)})}},{key:"requestDistricts",value:function(e,t){var o=this;axios.get("/address/get-districts?code=".concat(e)).then(function(e){e=e.data;e&&0<e.length&&(t?o.populateDistrictsUpdate(e):o.populateDistricts(e))}).catch(function(e){})}},{key:"populateDistrictsUpdate",value:function(e){$("#uDistrict").html("");for(var t="<option selected value>SELECT DISTRICT</option>",o=0;o<e.length;o++)t+="<option data-code=".concat(e[o].code," value=").concat(e[o].name,">").concat(e[o].name,"</option>");$(".district-wrapper").show(),$("#uDistrict").append(t),this.user.district&&$("#uDistrict").val(this.user.district)}},{key:"populateDistricts",value:function(e){var t=[];$(".district-dropdown").html(""),e.forEach(function(e){t.push('<a class="dropdown-item" href="javascript:void(0)">'.concat(e.name,"</a>"))}),$(".district-dropdown").append(t.join("")),$(".district-dropdown a").unbind("click");var o=this;$(".district-dropdown a").on("click",function(){var e=$(this).text();$("#dash-district-select").text(e),o.filters.district=e})}},{key:"onSearchClick",value:function(){var e=this.filters,t=e.blood_group,o=e.state,s=e.district,e=!0;t||($.toaster({settings:{timeout:4e3}}),$.toaster({priority:"danger",title:"Error",message:"Please choose the blood group!"}),e=!1),o||($.toaster({settings:{timeout:4e3}}),$.toaster({priority:"danger",title:"Error",message:"Please choose the state!"}),e=!1),s||($.toaster({settings:{timeout:4e3}}),$.toaster({priority:"danger",title:"Error",message:"Please choose the district!"}),e=!1),e&&this.requestSearchLists()}},{key:"requestSearchLists",value:function(){var s=this;$(".table-searchlist tbody").html(""),$(".table-searchlist tbody td button").unbind("click"),axios.post("/user/search",this.filters).then(function(e){var t,o,e=e.data;0<e.length&&(t=s,o=[],e.forEach(function(e,t){o.push("\n            <tr>\n            <td> ".concat(t+1," </td>\n            <td>Donor-").concat(e.id,"</td>\n            <td> ").concat(e.blood_group,"</td>\n            <td> ").concat(e.district,'</td>\n            <td><button type="button"\n            data-id="').concat(e.id,'"\n            class="btn btn-sm btn-outline-success">Request</button>\n            </td>\n            </tr>\n            '))}),$(".table-searchlist tbody").append(o.join("")),$(".table-searchlist tbody td button").on("click",function(){var e=$(this).attr("data-id");t.sendRequestToDonor(e,t.filters)}))}).catch(function(e){console.log(e)}),$("#searchModal").modal("show")}},{key:"sendRequestToDonor",value:function(o,e){axios.post("/request/donor",{p_donor_id:o,p_requested_blood_group:e.blood_group,p_requested_state:e.state,p_requested_district:e.district}).then(function(e){var t=e.data;$.toaster({settings:{timeout:6e3}}),t&&t.t_result&&"Your apply request is succeeded."===t.t_result?(e="button[data-id='".concat(o,"']"),$(e).text("Requested"),$(e).prop("disabled",!0),$(e).prop("onclick",null).off("click"),$.toaster({priority:"success",title:"Success",message:"".concat(t.t_result," ").concat(null!==t.t_apply_count?"\nRemaining Quota for today is "+(35-parseInt(t.t_apply_count,10))+".":null)})):($.toaster({settings:{timeout:1e3}}),$.toaster({priority:"danger",title:"Error",message:"Something is wrong! Please try again later. If the issue persist for long time, please contact us."}))}).catch(function(e){console.log(e),$.toaster({priority:"danger",title:"Error",message:"Something is wrong! Please try again later. If the issue persist for long time, please contact us."})})}}]),e}();$(document).ready(function(){new Dashboard});