jQuery(function ($) {
    $('.cart-fixed-menu-open').on('touchend click', function () {
        let menu = $(this).attr('data-menu');

        $(menu).toggleClass('cart-nemu__expanded');
        $(menu).parent().toggleClass('cart-nemu__expanded');

    });

    $('.cart-menu-wrap, .cart-fixed-menu-close').on('touchend click', function (event) {

        if ($(event.target).hasClass('cart-menu-wrap') || $(event.target).hasClass('cart-fixed-menu-close')) {
            $('.cart-nemu__expanded').removeClass('cart-nemu__expanded');
        }
    });

});