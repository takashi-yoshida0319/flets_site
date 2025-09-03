(function($){
$(function(){
    //-----------------------------------
    // ページ内ジャンプして開く
    //-----------------------------------
    $('.js-jumpImprovement a').on('click', function( event ){
        var target = $(this).attr('data-id');
        var pad = ( $(window).width() > 768 ) ? 120 : 80;
        if ( $('#' + target ).get(0) ) {
            $('html, body').stop().animate({
                scrollTop : $('#' + target ).offset().top - pad
            }, { 'duration' : 1000, 'easing' : 'easeOutExpo' });
        }
    });
    //-----------------------------------
    // タブ
    //-----------------------------------
    $('input[name="flight-type"]').on('change', function(){
        $('.u-tabContents').removeClass('u-on');
        $('.u-tabContents[data-type="' + $(this).val() + '"]').addClass('u-on');
    });
});
})(jQuery);
