"use strict";

// HEADER ANIMATION
window.onscroll = function () {
  scrollFunction();
};

var element = document.getElementById("body");

function scrollFunction() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    var _element$classList;

    $(".navbar").addClass("fixed-top");
    element === null || element === void 0 ? void 0 : (_element$classList = element.classList) === null || _element$classList === void 0 ? void 0 : _element$classList.add("header-small");
    $("body").addClass("header-small body-top-padding");
  } else {
    var _element$classList2;

    $(".navbar").removeClass("fixed-top");
    element === null || element === void 0 ? void 0 : (_element$classList2 = element.classList) === null || _element$classList2 === void 0 ? void 0 : _element$classList2.remove("header-small");
    $("body").removeClass("body-top-padding");
  }
} // OWL-CAROUSAL


$(".owl-carousel").owlCarousel({
  items: 3,
  loop: true,
  nav: false,
  dot: true,
  autoplay: true,
  slideTransition: "linear",
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      items: 3
    }
  }
}); // SCROLLSPY

$(document).ready(function () {
  $(".nav-link").click(function () {
    var t = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(t).offset().top - 75
    }, {
      duration: 1000
    });
    $("body").scrollspy({
      target: ".navbar",
      offset: $(t).offset().top
    });
    return false;
  });
}); // AOS

AOS.init({
  offset: 120,
  delay: 0,
  duration: 1200,
  easing: "ease",
  once: true,
  mirror: false,
  anchorPlacement: "top-bottom",
  disable: "mobile"
}); //SIDEBAR-OPEN

$("#navbarSupportedContent").on("hidden.bs.collapse", function () {
  $("body").removeClass("sidebar-open");
});
$("#navbarSupportedContent").on("shown.bs.collapse", function () {
  $("body").addClass("sidebar-open");
});

window.onresize = function () {
  var w = window.innerWidth;

  if (w >= 992) {
    $("body").removeClass("sidebar-open");
    $("#navbarSupportedContent").removeClass("show");
  }
};
//# sourceMappingURL=landingpage.js.map
