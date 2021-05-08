<?php
/* @var $this yii\web\View */

use app\models\States;

$states = States::find()
    ->select(['code', 'name'])->all();
?>
<div class="container">
    <div class="row cus-info-parent">
        <div class="col-md-4 offset-md-2 p-4 cus-how ">
            <div class="card plasma-info-cards">
                <div class="card-body cus-p-0">
                    <div class="text-center">
                        <h2 class="font-weight-semibold">How Your Plasma Helps</h2>
                        <p class="m-0 py-3 text-muted">When you recover from COVID-19, you develop antibodies
                            against
                            the virus, which are present in your plasma. This is known as convalescent plasma. By
                            pooling together convalescent plasma from many recovered donors and concentrating these
                            antibodies into a potential therapy, we may be able to help people at risk for serious
                            complications from COVID-19 better fight the disease.
                        </p>
                        <button type="button" class="btn btn-primary cus-btn-hero btn-help">I'll Help</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 p-4 cus-how cus-search">
        <div class="  ">
            <strong class="d-inline-block mb-2">FIND A PLASMA DONOR</strong>
            <div class="dropdown show cus-dropdown">
                <a class="btn btn-opacity-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    SELECT A BLOOD GROUP
                </a>

                <div class="dropdown-menu bg-dropdown" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" href="javascript:void(0)">A positive</a>
                    <a class="dropdown-item" href="javascript:void(0)">A negative</a>
                    <a class="dropdown-item" href="javascript:void(0)">B positive</a>
                    <a class="dropdown-item" href="javascript:void(0)">B negative</a>
                    <a class="dropdown-item" href="javascript:void(0)">AB positive</a>
                    <a class="dropdown-item" href="javascript:void(0)">AB negative</a>
                    <a class="dropdown-item" href="javascript:void(0)">O positive</a>
                    <a class="dropdown-item" href="javascript:void(0)">O negative</a>
                </div>
            </div>

            <div class="dropdown show cus-dropdown">
                <a class="btn btn-opacity-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    SELECT STATE
                </a>

                <div class="dropdown-menu state-dropdown" aria-labelledby="dropdownMenuLink">
                    <?php foreach ($states as $state) { ?>
                        <a class="dropdown-item" data-name="<?php echo $state->name; ?>" data-code="<?php echo $state->code; ?>" href="javascript:void(0)"><?php echo $state->name ?></a>
                    <?php } ?>
                </div>
            </div>


            <div class="dropdown show cus-dropdown">
                <a class="btn btn-opacity-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    SELECT DISTRICT
                </a>
                <button type="button" class="btn btn-secondary search-btn cus-btn-hero search-on-district">SEARCH</button>
                <div class="dropdown-menu district-dropdown" aria-labelledby="dropdownMenuLink">
                </div>
            </div>

            <div class="alert alert-info filter-div" role="alert" style="display:none">
                <div class="filter filter-bg" style="display:none;">
                    Selected Blood Group: <p class="select-bg"></p>
                </div>

                <div class="filter filter-state" style="display:none;">
                    Selected State: <p class="select-state"></p>
                </div>

                <div class="filter filter-district" style="display:none;">
                    Selected District: <p class="select-district"> </p>
                </div>

                <div class="filter">
                    <button class="btn btn-link clear-filter"> Clear </button>
                </div>

            </div>
                    </div>
        </div>

    </div>


</div>
<?php
echo $this->render('./_searchlist.php');

?>