<?php
/* @var $this yii\web\View */
?>
<div class="container row cus-feedback">
                <div class="col-md-6 offset-md-3">
                    <br/>
                    <h3 class="cus-border-bottom">
                        Send us a feedback
                    </h3>
                    <div class="container row">
                        <div class="col-md-12 mb-4 p-3 order-md-1">
                            <form class="needs-validation" novalidate="">
                              <div class="row">
                                <div class="col-md-6 mb-1">
                                  <label for="fb-firstName">First name</label>
                                  <input type="text" class="form-control" id="fb-firstName" placeholder="" value="" required="">
                                  <div class="invalid-feedback">
                                    Valid first name is required.
                                  </div>
                                </div>
                                <div class="col-md-6 mb-1">
                                  <label for="fb-lastName">Last name</label>
                                  <input type="text" class="form-control" id="fb-lastName" placeholder="" value="" required="">
                                  <div class="invalid-feedback">
                                    Valid last name is required.
                                  </div>
                                </div>
                              </div>
                      
                              <div class="mb-1">
                                <label for="fb-email">Email <span class="">(Optional)</span></label>
                                <input type="email" class="form-control" id="fb-email" placeholder="johndoe@gmail.com">
                                <div class="invalid-feedback">
                                  Please enter a valid email address for shipping updates.
                                </div>
                              </div>
                      
                              
                              <div class="mb-3">
                                <label for="exampleFormControlTextarea1">Message</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                <div class="invalid-feedback">
                                  Please enter a valid email address for shipping updates.
                                </div>
                              </div>
                              
                              <button class="btn btn-light btn-md btn-block" type="submit">SEND</button>
                            </form>
                          </div>  
                    </div>
                    
                    
                </div>
                
                
            </div>

            