<?php 
use app\models\States;
$states = States::find()
        ->select(['code','name'])->all();


$donorStatus = array(
    0 => "AVAILABLE",
    1 => "WAITING FOR YOUR CALL",
    2 => "BLOOD CONFIRMED",
    9 => "NOT INTERESTED"
);
$pendingApprovals = array_filter($lists, function($list) {
    return $list['request_status'] == 0;
});

$acceptedLists = array_filter($lists, function($list) {
    return $list['request_status'] == 1;
});

$rejectedLists= array_filter($lists, function($list) {
    return $list['request_status'] == 2;
});

$connectedLists= array_filter($lists, function($list) {
    return $list['request_status'] == 3;
});

$allTables = [['pendingApprovals', 'Pending Approvals'], ['acceptedLists', 'Donors who Accepted'], ['rejectedLists', 'Rejected Donors'], ['connectedLists', 'Connected Donors']];

?>
<div class="col-md-8 order-md-1">

<div class="row">

    <div class="col-md-12 order-md-1 ">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Search Donor </span>

        </h4>
        <div class="row cus-search-main">
          
            <div class="col-md-12 mb-1">

                <div class="dropdown show cus-dropdown bg-dropdown">
                    <a class="btn btn-light bg-dropdown-link dropdown-toggle cus-dropdown-toggle"
                        href="javascript:void(0);" role="button" id="dropdownMenuLink"
                        data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        SELECT A BLOOD GROUP
                    </a>

                    <div class="dropdown-menu bg-options" aria-labelledby="bg-dropdown">
                        <a class="dropdown-item" href="javascript:void(0);">A positive</a>
                        <a class="dropdown-item" href="javascript:void(0);">A negative</a>
                        <a class="dropdown-item" href="javascript:void(0);">B positive</a>
                        <a class="dropdown-item" href="javascript:void(0);">B negative</a>
                        <a class="dropdown-item" href="javascript:void(0);">AB positive</a>
                        <a class="dropdown-item" href="javascript:void(0);">O positive</a>
                        <a class="dropdown-item" href="javascript:void(0);">O negative</a>
                    </div>

                    <div class="dropdown show cus-dropdown state-dropdown">
                        <a class="btn btn-light dropdown-toggle" href="javascript:void(0);" role="button" id="dash-state-select"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            SELECT STATE
                        </a>

                        <div class="dropdown-menu state-options">
                        <?php foreach($states as $state) { ?>
                            <a class="dropdown-item" data-name="<?php echo $state->name; ?>" data-code="<?php echo $state->code; ?>" href="javascript:void(0)"><?php echo $state->name ?></a>
                        <?php } ?>
                        </div>
                    </div>

                    <div class="dropdown show cus-dropdown">
                        <a class="btn btn-light dropdown-toggle" href="javascript:void(0);" role="button" id="dash-district-select"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            SELECT DISTRICT
                        </a>
                        <div class="dropdown-menu district-dropdown" aria-labelledby="dash-district-select">
                        </div>
                    </div>
                </div>
                <p>
                    <a class="btn btn-sm btn-outline-primary search-btn-dash" href="javascript:void(0)">SEARCH</a>
                </p>
            </div>

        </div>
    </div>



</div>
<div class="row">
    <div class="col-md-12 order-md-1 ">
        <br />
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">You've applied to : </span>

        </h4>

        <?php 
    
    foreach($allTables as $tableKey => $table) {
    $list = $table[0];
    if(count($$list) > 0) {?>
        <div class="table-responsive">
        <h2 style="font-size:18px;" class="col-form-label col-md-12 pt-0"><strong>
            <?= $table[1]?>
            </strong></h2>

            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Blood Group Requested</th>
                        <th>Status </th>
                        <th>Options</th>

                    </tr>
                </thead>
                <tbody>
                <?php foreach($$list as $key => $donor) { ?>
                    <tr>
                        <td><?php echo ($key+1); ?></td>
                        <td><?php echo 'Donor-'.$donor['donor_id']; ?></td>
                        <td><?php 
                        echo str_replace('\' ', '\'', ucwords(str_replace('\'', '\' ', strtolower($donor['district'])))); ?></td>
                        <td><?php echo $donor['requested_blood_group']; ?></td>
                        <td> <?= $donorStatus[$donor['user_status']] ?> </td>

                        <td>
                        <?php if($table[0] === 'acceptedLists' || $table[0] === 'pendingApprovals') { ?>

                          
                       
                          <?php      if($table[0] === 'acceptedLists') { ?>
                            <button type="button" data-section="<?php echo $table[0]; ?>" 
                        data-params="<?php echo htmlspecialchars(json_encode($donor), ENT_QUOTES, 'UTF-8'); ?>"
                        class="btn btn-sm btn-outline-success receiver-bloodconfirm-btn">
                        Blood Confirmed
                        </button>
                        <?php 
                          } ?>

                        <button type="button" data-section="<?php echo $table[0]; ?>" 
                        data-params="<?php echo htmlspecialchars(json_encode($donor), ENT_QUOTES, 'UTF-8'); ?>"
                                class="btn btn-sm btn-outline-danger receiver-reject-btn">Reject</button>
      
                        
                    <?php } ?>

                        </td>
                    </tr>
                <?php } ?>
                  
                </tbody>
            </table>
            <small id="nameHelp" class="form-text text-muted">* Rejecting will let you
                apply for
                another request to Donor <br />
            </small>
            <hr />
            <?php
        if($tableKey == (count($allTables)-1)) { ?>
        <small id="nameHelp" class="form-text text-muted">* Help us by frequently updating your status. <br />
        </small>
        <?php } ?>

        </div>
    </div>
    <?php } 
    }
    ?>
</div>



</div>