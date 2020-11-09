<?php
$script = <<< JS
        $("#signinModal").modal("show");
JS;
$script2 = '';
if($confirm && $confirm == 'yes') {
        $script2 = <<< JS
        $.toaster({ settings: { timeout: 30000 } });

        $.toaster({
        priority: "success",
        title: "Success",
        message: `Your phone number is confirmed. Please enter your phone and password to login!
        `});
JS;
}
$this->registerJs($script);

if($script2)
$this->registerJs($script2);

?>