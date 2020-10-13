<?php ?>
<div class="modal fade" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        
        <div class="modal-body">
            <div class="container row cus-feedback">
                <div class="col-md-12">
                    <br/>
                    <h3 class="cus-border-bottom">
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
                              <div class="row">
                           
                                
                            </div>
                              <div class=" mb-1">
                                <label for="lastName">Phone Number</label>
                              </div>
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <div class="input-group-text">+977-</div>
                                </div>
                                <input type="text" class="form-control" id="phoneNumber" placeholder="">
                                <div class="invalid-feedback">
                                  </div>
                              </div>

                              <div class="mb-1">
                                <label for="password">Password <span class=""></span></label>
                                <input type="password" class="form-control" id="password" >
                                <div class="invalid-feedback">
                                </div>
                              </div>
                              <div class="mb-1">
                                <label for="confirm-password">Confirm Password <span class=""></span></label>
                                <input type="password" class="form-control" id="confirm-password" >
                                <div class="invalid-feedback">
                                </div>
                              </div>
                      
                              
                              <br/>
                              <fieldset class="form-group">
                                <div class="row">
                                  <legend class="col-form-label col-sm-3 pt-0">You are: </legend>
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
                                        Plasma Receiver
                                      </label>
                                    </div>
                                    
                                  </div>
                                </div>
                              </fieldset>
                      
                             <button type="button" class="btn btn-secondary close-signup" data-dismiss="modal">Close</button>
                             <button type="button" class="btn btn-primary confirm-signup">Sign Up</button>
                            </form>
                          </div>  
                    </div>
                    
                    
                </div>
                
                
            </div>
        </div>
      </div>
    </div>
</div>