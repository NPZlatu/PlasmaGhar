<?php ?>
    
    
    <div class="modal fade" id="searchModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered cus-modal-dialog" role="document">
                <div class="modal-content">

                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 order-md-1 ">
                                <br />
                                <h4 class="d-flex justify-content-between align-items-center mb-3">
                                    <span class="text-muted">Available Donors </span>

                                </h4>
                                <div class="table-responsive">

                                    <table class="table table-striped table-sm table-searchlist">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Blood Group</th>
                                                <th>District</th>
                                                <th>Options</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                        <?php
                                        if(isset($donors) && $donors && count($donors) > 0) {
                                            foreach($donors as $key => $donor) { ?>
                                            <tr>
                                                        <td> <?= $key+1 ?> </td>
                                                        <td><?="Donor-".$donor['id'] ?></td>
                                                        <td><?=$donor['blood_group'] ?></td>
                                                        <td><?=$donor['district']?></td>
                                                        <td><button type="button"
                                                        data-id="<?=$donor['id'] ?>"
                                                        class="btn btn-sm btn-outline-success btn-search-req">Request</button>
                                                        </td>
                                                        </tr>


                                            <?php } 
                                        }

                                        ?>

                                        </tbody>
                                    </table>
                                    <small id="nameHelp" class="form-text text-muted">*You can request only up to 10 plasma donors on an hour due to fair usage policy<br />
                                    </small>
                                    <hr />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

