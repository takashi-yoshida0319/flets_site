(function ($) {
    $(document).ready(function () {
        // var slideTexts = ["1枚目のスライドへ", "2枚目のスライドへ", "3枚目のスライドへ", "4枚目のスライドへ"];

        function updatePagerText() {
            $('.bx-pager-link').each(function (index) {
                $(this).text(slideTexts[index]);
            });
        }

        var slider = $('.accentBox ul.slider').bxSlider({
            auto: true,
            pause: 5000,
            speed: 400,
            pager: true,
            controls: true,
            useCSS: false,
            touchEnabled: false,
            autoControls: true,
            autoControlsCombine: true,
            pagerCustom: '.bxslider_thumbnail',
            onSliderLoad: function () {
                var bxControlsAuto = $('.bx-controls-auto');
                var bxSliderThumbnail = $('.bxslider_thumbnail');
                bxControlsAuto.before(bxSliderThumbnail);

                // updatePagerText();
            },
            onSlideAfter: function ($slideElement, oldIndex, newIndex) {
                // updatePagerText();
            }
        });

        // setTimeout(updatePagerText, 500);
    });
})(jQuery151);



