import $ from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';
// import 'owl.carousel';
import '@fortawesome/fontawesome-free/js/all.js'
import "@fortawesome/fontawesome-free/css/all.css";


import './style.scss';


$(window).scroll(function(){
    if ($(this).scrollTop() > 300) {
        $('.scrollToTop').fadeIn();
    } else {
        $('.scrollToTop').fadeOut();
    }
});

$('.scrollToTop').click(function(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
});

// Плавный переход по якорям
$("#mainMenu").on("click","a", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
});