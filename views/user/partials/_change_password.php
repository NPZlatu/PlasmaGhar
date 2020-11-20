<?php 
$user = \Yii::$app->user->identity;
use app\models\States;
$states = States::find()
        ->select(['code','name'])->all();

?>
<div class="modal fade" id="changePasswordModal" tabindex="-1" role="dialog" aria-labelledby="changePasswordModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        
        <div class="modal-body">
            <div class="container row cus-feedback">
                <div class="col-md-12">
                    <br/>
                    <h3 class="cus-border-bottom header-text">
                        Change Password
                    </h3>
                    <div class="container row">
                        <div class="col-md-12 mb-4 p-3 order-md-1">
                            <form class="needs-validation" novalidate="">
            
                            <div class="mb-1 hidden-edit">
                                <label for="oldpassword">Current Password <span class=""></span></label>
                                <input type="password" class="form-control" id="oldpassword" >
                                <div class="invalid-feedback">
                                </div>
                              </div>

                              <div class="mb-1 hidden-edit">
                                <label for="newpassword">New Password <span class=""></span></label>
                                <input type="password" class="form-control" id="newpassword" >
                                <div class="invalid-feedback">
                                </div>
                              </div>

                              <div class="mb-1 hidden-edit">
                                <label for="confirmnewpassword">Confirm Password <span class=""></span></label>
                                <input type="password" class="form-control" id="confirmnewpassword" >
                                <div class="invalid-feedback">
                                </div>
                              </div>

                             <button type="button" class="btn btn-secondary close-change-password" data-dismiss="modal">Close</button>
                             <button type="button" class="btn btn-primary confirm-change-password">Change</button>
                             
                            
                            </form>
                          </div>  
                    </div>
                    
                    
                </div>
                
                
            </div>
        </div>
      </div>
    </div>
</div>