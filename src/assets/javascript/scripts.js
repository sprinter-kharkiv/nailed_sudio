/* Masonry grid initial function */
function mansoryGrid() {
    if ($(window).width() < 767) {
        $('.grid-floatet').masonry('destroy');
    } else {
        $('.grid-floatet').masonry({
            // options
            itemSelector: '.grid-floatet__item',
            columnWidth: 5,
            percentPosition: true
        });
    }
}
/* ScrollTrigger animation */
function ScrollTriggerInitial() {
    if ($(window).width() > 767) {
        document.addEventListener('DOMContentLoaded', function () {
            var trigger = new ScrollTrigger({
                addHeight: true
            });
        });
    }
}
/* ScrollTrigger animation initial */
ScrollTriggerInitial();


$(document).ready(function () {

    /* Collapsed section action */
    $('.collapse-btn').on('click', function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $('.collapsed-holder').slideToggle(500);
    });

    /* Masonry grid initial */
    mansoryGrid();


    /* Slick carousel initial */

    $('.home_slider').slick({
        arrows: true,
        dots: false
    });
    $('.services_item__slider').slick({
        arrows: false,
        dots: true
    });

    $('.about_slider').slick({
        arrows: false,
        dots: true
    });
    $('.team_slider').slick({
        centerMode: true,
        centerPadding: '160px',
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '60px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 560,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '20px',
                    slidesToShow: 1
                }
            }
        ]
    });


    $('.grid-floatet__carousel').slick({
        arrows: false,
        draggable: false,
        fade: true,
        speed: 1000,
        pauseOnFocus: false,
        pauseOnHover: false,
        swipe: false,
        touchMove: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    });


    //Floatet label in form action
    $('.form-control').focusout(function () {
        $('.form-group').removeClass('focus');
    });
    $('.form-control').focus(function () {
        $(this).closest('.form-group').addClass('focus');
    });
    $('select.form-control').change(function () {
        $(this).closest('.form-group').addClass('filled');
    });


    /// Input Kepress Filled  Focus
    $('.form-control').keyup(function () {
        if ($(this).val().length > 0) {
            $(this).closest('.form-group').addClass('filled');
        }

        else {
            $(this).closest('.form-group').removeClass('filled');
        }
    });

    /// Input Check Filled Focus
    var $formControl = $('.form-control');
    var values = {};
    var validate = $formControl.each(function () {
        if ($(this).val().length > 0) {
            $(this).closest('.form-group').addClass('filled');
        }
        else {
            $(this).closest('.form-group').removeClass('filled');
        }
    });


});

var feed = new Instafeed({
    //get: ‘user’,
    //userId: 205862632,
    get: 'tagged',
    tagName: 'awesome',
    clientId: '9ae81caa3fc24422b87a1dc33913fdc4',
    target: 'instafeed',
    links: true,
    limit: 8,
    sortBy: 'most-recent',
    resolution: 'standard_resolution',
    /* template: '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
     <div class="photo-box">
     <div class="image-wrap">
     <a href="{{link}}">
     <img src="{{image}}">
     </a>
     <div class="likes">{{likes}} Likes</div>
     </div>
     <div class="description">{{caption}}
     <div class="date">{{model.date}}</div>
     </div>
     </div>
     </div>'
     */
});
feed.run();

$(window).resize(function () {
    /* Masonry grid initial */
    mansoryGrid();

    /* ScrollTrigger animation initial */
    ScrollTriggerInitial();
});
