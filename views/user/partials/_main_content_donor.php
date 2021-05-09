<?php

$user = \Yii::$app->user->identity;
$donorStatus = $user->user_status;


$receiverStatus = array(
    0 => "SEARCHING FOR A DONOR",
    1 => "WILL BE CALLING YOU",
    2 => "BLOOD CONFIRMED",
    9 => "NOT INTERESTED"
);
$pendingApprovals = array_filter($lists, function ($list) {
    return $list['request_status'] == 0;
});

$acceptedLists = array_filter($lists, function ($list) {
    return $list['request_status'] == 1;
});

$rejectedLists = array_filter($lists, function ($list) {
    return $list['request_status'] == 2;
});

$connectedLists = array_filter($lists, function ($list) {
    return $list['request_status'] == 3;
});

$allTables = [['pendingApprovals', 'Pending Approvals'], ['acceptedLists', 'Accepted Receivers'], ['rejectedLists', 'Rejected Receivers'], ['connectedLists', 'Connected Receivers']];
?>

<div class="col-md-8 order-md-1">
    <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text-muted">Plasma seekers will be searching you.</span>
        

    </h4>
    <?php

    foreach ($allTables as $tableKey => $table) {
        $list = $table[0];
        if (count($$list) > 0) { ?>

            <div class="table-responsive">
                <h2 style="font-size:18px;" class="col-form-label col-md-12 pt-0"><strong>
                        <?= $table[1] ?>
                    </strong></h2>
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th colspan=3> Name </th>
                            <th>Requested Blood Group</th>
                            <th colspan=3>Requested Location</th>
                            <th> Receiver Status </th>
                            <th>Requested Date</th>
                            <th>Options</th>

                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        foreach ($$list as $key => $receiver) {
                        ?>
                            <tr>
                                <td><?= ($key + 1) ?></td>
                                <td colspan=3> <?= 'Requester-' . $receiver['receiver_id'] ?> </td>
                                <td><?= $receiver['requested_blood_group'] ?></td>

                                <td colspan=3><?=
                                                str_replace('\' ', '\'', ucwords(str_replace('\'', '\' ', strtolower($receiver['requested_district'])))); ?></td>

                                <td> <?= $receiverStatus[$receiver['receiver_status']] ?> </td>

                                <td><?= $receiver['requested_date'] ?></td>


                                <?php if ($receiver['receiver_status'] != 9 && $receiver['receiver_status'] != 2) { ?>
                                    <td>
                                        <?php if ($table[0] === 'acceptedLists' || $table[0] === 'pendingApprovals') {

                                            if ($table[0] === 'pendingApprovals' && (in_array($donorStatus, [1, 2, 9]))) {                                                
                                                ?>
                                                <button disabled type="button" class="btn btn-sm btn-outline-secondary">
                                                    Accept
                                                </button>
                                            <?php } else { ?>
                                                <button type="button" data-section="<?php echo $table[0]; ?>" data-params="<?php echo htmlspecialchars(json_encode($receiver), ENT_QUOTES, 'UTF-8'); ?>" class="btn btn-sm btn-outline-success <?php echo $table[0] === 'pendingApprovals' ? 'donor-accept-btn' : 'donor-bloodconfirm-btn'; ?>">
                                                    <?php
                                                    if ($table[0] === 'acceptedLists') {
                                                        echo 'Blood Confirmed';
                                                    } else {
                                                        echo 'Accept';
                                                    }
                                                    ?>
                                                </button>
                                            <?php } ?>

                                            <button data-section="<?php echo $table[0]; ?>" data-params="<?php echo htmlspecialchars(json_encode($receiver), ENT_QUOTES, 'UTF-8'); ?>" type="button" class="btn btn-sm btn-outline-danger donor-reject-btn">Reject</button>
                                        <?php } ?>

                                    </td>
                                <?php } else { ?>
                                    <td>
                                    <?php if($receiver['receiver_status'] == 9) { ?>
                                     <button class="btn btn-sm btn-outline-danger">Not Active</button>
                                    <?php }  ?>
                                        
                                      </td>
                                <?php } ?>
                            </tr>
                        <?php } ?>

                    </tbody>
                </table>
                <?php
                if ($table[0] === 'pendingApprovals' &&  (in_array($donorStatus, [1, 2, 9]))) {
                ?>
                    <small id="nameHelp" class="form-text text-muted">You cannot accept more than one request at a time. If you want to accept the request above, you should reject the request below for already accepted receiver. <br />
                    </small>
                    <hr />
                <?php } else if ($table[0] === 'acceptedLists') { ?>
                    <small id="nameHelp" class="form-text text-muted">
                        * It seems like your phone number is shared with receiver. Please click on "Blood Confirm" if blood is confirmed, if conversation did not happen or did not go as expected, click on "Reject"
                        <br />
                    </small>
                    <hr />
                <?php  } else if ($table[0] === 'connectedLists') {
                ?>
                    <small id="nameHelp" class="form-text text-muted">
                        * Thank you for your donation and confirming with us. You are a hero. Because of the people like yourself, there is a hope.
                        <br />
                    </small>
                    <hr />
                <?php } ?>


                <?php
                if ($tableKey == (count($allTables) - 1)) { ?>
                    <small id="nameHelp" class="form-text text-muted">* Help us by frequently updating your status. <br />
                    </small>
                <?php } ?>
            </div>
    <?php }
    }
    ?>

</div>