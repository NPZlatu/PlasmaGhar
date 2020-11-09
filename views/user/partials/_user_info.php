<?php 
if($res['role_value'] === 'Donor') {
$name = 'Donor-'.$res['model']['id'];
$statuses = array(
    0 => "available",
    1 => "waiting for a call",
    2 => "blood confirmed",
    9 => "not interested"
);

} else if($res['role_value'] === 'Receiver') {
$name = 'Requester-'.$res['model']['id'];


$statuses = array(
    0 => "searching for a donor",
    1 => "received sms",
    2 => "blood confirmed",
    9 => "not interested"
);

}
?>



<div class="col-md-4 order-md-2 mb-4">
    <div class="col-md-12 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Your info</span>
        </h4>
        <p><button type="button" class="btn btn-sm btn-outline-danger">Edit My Info</button></p>
        <p>Identity : <strong><?=$name ?></strong></p>

        <p>User Status : <span class="badge badge-md badge-primary badge-pill">
        <?php echo $statuses[$res['model']['user_status']];   ?>
        </span> Change</p>
        
        <?php if($res['role_value'] === 'Donor') { ?>
        <p>Blood Group : <strong><?=$res['model']['blood_group'] ?></strong></p>
        <?php } ?>
        <p>Location : <strong><?=                             
            str_replace('\' ', '\'', ucwords(str_replace('\'', '\' ', strtolower($res['model']['district'])))); 
          ?></strong></p>
        <p>Phone Number : <strong><?= $res['model']['phone_number']?></strong></p>
        <p>Role: <strong><?=$res['role_value'] ?></strong></p>
        <hr/>
        <small id="nameHelp" class="form-text text-muted">* Donor's
            information will be confidential. Unless you wish to donate to
            one of the receiver. Your phone number will be provided only to
            the accepted receiver.<br />
        </small>
        <hr/>
        <small id="nameHelp" class="form-text text-muted">* You have the complete right not to 
            get listed in the search. If you don't want, you can change your status to "Not
            Interested"<br />
        </small>
        <small id="nameHelp" class="form-text text-muted">
            Not Interested Now. I would like to change my status <button type="button" class="btn btn-sm btn-outline-danger">Not Interested in this donation</button> <br />
        </small>
        </p>
        
        
    </div>
</div>