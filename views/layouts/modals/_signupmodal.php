<?php 
?>
<div class="modal fade" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        
        <div class="modal-body">
            <div class="container row cus-feedback">
                <div class="col-md-12">
                    <br/>
                    <h3 class="cus-border-bottom header-text">
                        Sign Up
                    </h3>
                    <div class="container row">
                        <div class="col-md-12 mb-4 p-3 order-md-1">
                            <form class="needs-validation" novalidate="">
                                <div class="col-md-12">
                                    <small id="nameHelp" class="form-text text-muted">* Donor's information will be confidential. Unless you wish to donate to one of the receiver. Your phone number will be provided to only the accepted receiver.<br/>
                                    </small>
                                    <br/>
                                </div>

                                <br/>

                                <fieldset class="form-group hidden-edit">
                                <div class="row">
                                  <legend class="col-form-label col-sm-3 pt-0">You Are </legend>
                                  <div class="col-sm-6">
                                    <div class="form-check">
                                      <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
                                      <label class="form-check-label" for="gridRadios1">
                                        Plasma Donor
                                      </label>
                                    </div>
                                    <div class="form-check">
                                      <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                                      <label class="form-check-label" for="gridRadios2">
                                        Plasma Seeker
                                      </label>
                                    </div>
                                    
                                  </div>
                                </div>
                              </fieldset>
                              
                              <div class=" mb-1">
                                <label for="phoneNumber">Phone Number</label>
                              </div>
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <div class="input-group-text">+977-</div>
                                </div>
                                <input type="text" class="form-control" id="phoneNumber" placeholder="">
                                <div class="invalid-feedback">
                                  </div>
                              </div>


                              <div class=" mb-1">
                              <label for="bloodGroup">Blood Group <span class="">(Mandatory for Blood Donor)</span></label>
                                <select id="bloodGroup" class="form-control">
                                <option selected="true" value="">SELECT A BLOOD GROUP</option>    
                                <option value="A positive"> A positive </option>
                                <option value="B positive"> B positive </option>
                                <option value="B negative"> B negative </option>
                                <option value="AB positive"> AB positive </option>
                                <option value="AB negative"> AB negative </option>
                                <option value="O positive"> O positive </option>
                                <option value="O negative"> O negative </option>

                                  </div>
                                </select>
                                <div class="invalid-feedback">
                                </div>
                              </div>

                              <div class=" mb-1">
                                <label for="state">State</label>
                                <select id="state" class="form-control">
                                </select>
                                <div class="invalid-feedback">
                                </div>
                              </div>

                              <div class="district-wrapper mb-1" style="display:none">
                                <label for="district">District </label>
                                <select id="district" class="form-control">
                                </select>
                                <div class="invalid-feedback">
                                </div>
                              </div>


                              <div class="mb-1 hidden-edit">
                                <label for="password">Password <span class=""></span></label>
                                <input type="password" class="form-control" id="password" >
                                <div class="invalid-feedback">
                                </div>
                              </div>
                              <div class="mb-1 hidden-edit">
                                <label for="confirm-password">Confirm Password <span class=""></span></label>
                                <input type="password" class="form-control" id="confirm-password" >
                                <div class="invalid-feedback">
                                </div>
                              </div>
                      
                          
                              <div class="alert alert-warning plasma-warning hidden-edit" role="alert">
                              <h4 class="alert-heading">You <span style="color:red;">can't</span> donate plasma if you:</h4>
                                <ul>
                                <li>are still recovering from coronavirus </li>
                                <li>are less than 17 years old </li>
                                <li>have had most types of cancer</li>
                                <li>have tested positive for HIV or HTLV </li>
                                <li>have some heart conditions </li>
                                <li>have had an organ transplant </li>
                                <li>are pregnant </li>
                                <li>have had a baby in the last 9 months </li>
                                <li> are a hepatitis B carrier </li>
                                <li> are a hepatitis C carrier </li>
                                <li> have injected non-prescribed drugs including body-building and injectable tanning agent </li>
                                <ul>
                              </div>

                              <br>

                              <fieldset class="form-group confirm-health hidden-edit">
                                <div class="row">
                                  <div class="col-sm-12">
                                    <div class="form-check">
                                      <input class="form-check-input" type="checkbox" name="confirmHealth" id="confirmHealth" value="option1">
                                      <label class="form-check-label" for="terms">
                                        I confirm that I do not have any health conditions as mentioned above</a>
                                      </label>
                                    </div>
                                    </div>
                              </div>
                              </fieldset>


                              <fieldset class="form-group hidden-edit">
                                <div class="row">
                                  <div class="col-sm-12">
                                    <div class="form-check">
                                      <input class="form-check-input" type="checkbox" name="terms" id="terms" value="option1">
                                      <label class="form-check-label" for="terms">
                                        I agree to <a target="_blank" href="/terms-and-conditions">terms and conditions</a>
                                      </label>
                                    </div>
                                    </div>
                              </div>
                              </fieldset>
                      
                             <button type="button" class="btn btn-secondary close-signup" data-dismiss="modal">Close</button>
                             <button type="button" class="btn btn-primary confirm-signup hidden-edit">Sign Up</button>
                             <div style="margin-top: 10px;"class="alert alert-light hidden-edit" role="alert">
                                If you have already registered an account, please <a class="signin-register" href="javascript:void(0);">click here</a> to login
                                </div>
                            
                            </form>
                          </div>  
                    </div>
                    
                    
                </div>
                
                
            </div>
        </div>
      </div>
    </div>
</div>