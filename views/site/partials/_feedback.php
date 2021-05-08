<?php
/* @var $this yii\web\View */
?>
<section class="partners" id="partners-section">
  <div class="col-12 text-center pt-5 pb-5 content-header " >
    <h2>Our Supporting Partners</h2>
  </div>
  <div class="container">
    <div class="row">

    <div class="col-md-3"> </div>

    <div class="col-md-3">
        <a href="https://www.facebook.com/Lakuri-Samaj-104998591532944" target="_blank">
          <img src="./images/lakuri.jpeg" alt="..."  class="img-thumbnail cus-logo rounded mx-auto d-block">
        </a>
        <!-- <p class="text-center"><a href="" target="_blank">
            Lakuri Samaj
            <br>Lamatar, Lalitpur
          </a>

        </p> -->
      </div>

      <div class="col-md-3">
        <a href="https://bpazes.com" target="_blank">
          <img src="./images/logo.jpg" alt="..." style="width: 200px; height: 200px;" class="img-thumbnail cus-logo rounded mx-auto d-block">
        </a>
      
      </div>

      <div class="col-md-3">

      </div>
    </div>

   
  </div>

</section>

<section>
  <div class="col-12 text-center pt-5 pb-5 content-header" data-aos="zoom-out-down">
    <h2>Send us a feedback</h2>
  </div>
  <div class="col-md-6 offset-md-3" data-aos="zoom-out-up">
    <div class="container row text-c">
      <div class="col-md-12 mb-4 p-3 order-md-1">
        <form class="needs-validation" novalidate="">
          <div class="row">
            <div class="col-md-6 mb-1">
              <label for="fb-firstName">First name</label>
              <input type="text" class="form-control" id="fb-firstName" placeholder="" value="" required="">
              <div class="invalid-feedback">
              </div>
            </div>
            <div class="col-md-6 mb-1">
              <label for="fb-lastName">Last name</label>
              <input type="text" class="form-control" id="fb-lastName" placeholder="" value="" required="">
              <div class="invalid-feedback">
              </div>
            </div>
          </div>

          <div class="mb-1">
            <label for="fb-email">Email</label>
            <input type="email" class="form-control" id="fb-email" placeholder="abc@gmail.com">
            <div class="invalid-feedback">
            </div>
          </div>


          <div class="mb-3">
            <label for="fb-msg">Message</label>
            <textarea class="form-control" id="fb-msg" rows="3"></textarea>
            <div class="invalid-feedback">
            </div>
          </div>

          <button class="btn btn-rounded btn-outline-danger btn-md btn-block feedback-send" type="submit">SEND</button>
        </form>
      </div>
    </div>


  </div>
</section>