<?php 
$user = \Yii::$app->user->identity;
use app\models\States;
$states = States::find()
        ->select(['code','name'])->all();

?>
<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        
        <div class="modal-body">
            <div class="container row cus-feedback">
                <div class="col-md-12">
                    <br/>
                    <h3 class="cus-border-bottom header-text">
                        Edit Your Information
                    </h3>
                    <div class="container row">
                        <div class="col-md-12 mb-4 p-3 order-md-1">
                            <form class="needs-validation" novalidate="">
            <div class=" mb-1">
                              <label for="uBloodGroup">Blood Group</label>
                                <select id="uBloodGroup" value="<?= 'A positive' ?>" class="form-control">
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
                                <label for="uState">State</label>
                                <select id="uState" class="form-control">
                                <option value="">SELECT A STATE</option>    
                                <?php foreach($states as $state) { ?>
                                <option data-code="<?= $state->code ?>" value="<?= $state->name?>"> <?php echo $state->name; ?> </option>
                                 <?php } ?>
                                </select>
                                <div class="invalid-feedback">
                                </div>
                              </div>

                              <div class="district-wrapper mb-1">
                                <label for="uDistrict">District </label>
                                <select id="uDistrict" class="form-control">
                                </select>
                                <div class="invalid-feedback">
                                </div>
                              </div>


                      
                             <button type="button" class="btn btn-secondary close-update" data-dismiss="modal">Close</button>
                             <button type="button" class="btn btn-primary confirm-update">Update</button>
                             
                            
                            </form>
                          </div>  
                    </div>
                    
                    
                </div>
                
                
            </div>
        </div>
      </div>
    </div>
</div>