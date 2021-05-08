<?php

use app\models\UserNotifications;
$user = \Yii::$app->user;
$userId = $user->id;
$notifications = UserNotifications::find()
                 ->where(['user_id' => $userId])
                 ->andWhere(['is_read' => 0])
                 ->all();
$count = count($notifications);
?>

<div class="col-md-4 text-left">
<div class="btn-group ">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
        <i class="fa fa-bell-o"></i>
        <span class="label notification-count"><?php echo $count > 0 ? $count:'' ?></span>
    </a>

    <div class="dropdown-menu">
    <p class="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
        <ul class="menu">

        <?php  if($count > 0) {
            foreach($notifications as $notification) {
          ?>
        <li class="dropdown-item">
                <a>
                    <div class="preview-item-content">
                        <h6 class="preview-subject font-weight-bold"> <i class="fa fa-dot-circle-o  notification-icon">
                         </i><?= html_entity_decode($notification->notification); ?></h6>
                        <p class="font-weight-light small-text mb-0 text-muted notification-date">
                        <?= $notification->created_time ?>
                        </p>
                    </div>
                </a>
            </li>
        <?php }
        }
        ?>
           

        </ul>
        <p class="mb-0 font-weight-normal float-left dropdown-header"><a href="#">View All</a></p>
    </div>
</div>
<br /><br />
</div>

