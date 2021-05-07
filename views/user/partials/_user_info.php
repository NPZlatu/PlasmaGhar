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

$user = \Yii::$app->user;
$userStatus = $user->identity->user_status;
$email = $user->identity->email;

$userDetails = [
    'id' => $user->id, 
    'user_role' => $user->identity->user_role,
    'blood_group' => $user->identity->blood_group, 
    'state' => $user->identity->state, 
    'district' => $user->identity->district
];

?>



<div class="col-md-4 order-md-2 mb-4">
    <div class="col-md-12 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Your info</span>
        </h4>
        <p><button type="button"
         data-params="<?php echo htmlspecialchars(json_encode($userDetails), ENT_QUOTES, 'UTF-8'); ?>"
         class="btn btn-sm btn-outline-danger edit-info">Edit My Info</button>
         
         <button type="button"
         data-params="<?php echo htmlspecialchars(json_encode($userDetails), ENT_QUOTES, 'UTF-8'); ?>"
         class="btn btn-sm btn-outline-danger change-password">Change Password</button>
         
         </p>
        
        
        
        <p>Identity : <strong><?=$name ?></strong></p>

        <p>Email : <strong><?=$email ?></strong></p>


        <p>User Status : <span class="badge badge-md badge-primary badge-pill">
        <?php echo $statuses[$res['model']['user_status']];   ?>
        </span></p>
        
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
        <br>
        <small id="nameHelp" class="form-text text-muted">
             <?php if($userStatus != 9) { ?>
                <strong>You are <span style="color:green;">active</span> currently. If you are not interested in this donation, press the button below. </strong> 
             <button type="button"  style="margin-top:5px;" class="btn btn-sm btn-outline-danger btn-not-interested">I am not Interested in this donation</button>
             <?php } else { ?>
                
                <strong>You are <span style="color:red;">inactive</span> currently. If you are re-interested in this donation, press the button below. </strong> 

                <button type="button" class="btn btn-sm btn-outline-success btn-re-interested" style="margin-top:5px;">I am Interested again in this donation</button>
             <?php } ?>
              <br />
        </small>
        </p>
        
        
    </div>
</div>