<div class="col-md-8 order-md-1">
    <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text-muted">Searching you for plasma donation</span>

    </h4>
    <div class="table-responsive">
        
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Requested Blood Group</th>
                    <th colspan=3>Requested Location</th>
                    <th>Requested Date</th>
                    <th>Options</th>

                </tr>
            </thead>
            <tbody>
                <?php 
                $id=1;
                if(is_null($request_list)) $request_list = [];
                foreach($request_list as $receiver) {?>
                <tr>
                    <td><?= $id ?></td>
                    <td><?= $receiver['requested_blood_group'] ?></td>
                    <td colspan=3><?= 
                            strtoupper($receiver['requested_municipality']).",<br/> WARD NO.". $receiver['requested_ward_no'].", <br/>".
                            strtoupper($receiver['requested_district']).",<br/>". strtoupper($receiver['requested_state']);
                        ?></td>
                    <td><?= $receiver['requested_date'] ?></td>
                    <td>
                        <button type="button" class="btn btn-sm btn-outline-success">Accept</button>
                        <button type="button" class="btn btn-sm btn-outline-danger">Reject</button>

                    </td>
                </tr>
                <?php
                    $id+=1;
                } ?>
            </tbody>
        </table>
        <hr/>
        <small id="nameHelp" class="form-text text-muted">* Help us by frequently updating your status. <br />
        </small>
    </div>
</div>