<div class="col-md-8 order-md-1">
    <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text-muted">Searching you for plasma donation</span>

    </h4>
    <div class="table-responsive">
        
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Distance (km)</th>
                    <th>Blood Group Requested</th>
                    <th>Options</th>

                </tr>
            </thead>
            <tbody>
                <?php 
                $id=1;
                foreach($request_list as $receiver) {?>
                <tr>
                    <td><?= $id ?></td>
                    <td><?= $receiver['last_name'] ?></td>
                    <td>2 km</td>
                    <td>A positive</td>
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