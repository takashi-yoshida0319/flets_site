(function($){
  $(function(){
    var check01Apps = {
      $firstButton: '',
      $fancyButton: '',
      $nextButton: '',
      $closeButton: '',
      $anoterhCloseButton: '',
      $autoheight: '',
      targetClassName:'',

      init: function () {
        this.$firstButton = $('#firstButton');
        this.$fancyButton = $('a.fancybox');
        this.$nextButton = $('.js-nextBtn');
        this.$nextFancyButton = '';
        this.$closeButton = $('#fancybox-close');
        this.$anotherCloseButton = $('.anotherclose');
        this.$autoheight = $('#js-autoheight');
        this.targetClassName = 'js-autoheight-target';
        window.__check01 = false;

        this.fancyBoxInit();
        if(!$.cookie('hasTroubleShindan'))
          this.firstVisitHandler();

        this.$anotherCloseButton.on('click', $.proxy(function(){ this.$closeButton.click();}, this));
        this.$nextButton.on('click', $.proxy(this.chnageModal, this));

        this.autoHeight(this.$autoheight, this.targetClassName);
      },

      firstVisitHandler: function() {
        this.$firstButton.click();
        $.cookie('hasTroubleShindan', true, {expire: 7});
      },

      fancyBoxInit: function(){
        var _this = this;
        this.$fancyButton.fancybox({
          padding: 30,
          scrolling: 'no',
          width: 770,
          height: 'auto',
          // autoDimensions: false,
          showNavArrows: false,
          onComplete: function() {
            $('#fancybox-close').html('<img src="../img/modal_close.png" width="25" height="26" alt="•Â‚¶‚é">');
          },
          onClosed: function(){
            if(window.__check01){
              setTimeout(function(){
                _this.$nextFancyButton.click();
                window.__check01 = false;
              }, 500);
            }
          }
        });
      },

      chnageModal: function( e ){
        this.$closeButton.click();
        var nextNum = parseFloat($(e.currentTarget).closest('div').attr('id').match(/\d/)[0]) + 1;
        if(!$('#fancy' + nextNum).length)
          nextNum = 1;
        this.$nextFancyButton = $('#fancy' + nextNum).find('a');
        window.__check01 = true;
      },

      autoHeight: function( $parentEl, targetClassName ){
        var heights = [];
        $parentEl.children().find('.' + targetClassName).each(function(i){
          heights[i] =  $(this).height();
        });
        $parentEl.children().find('.' + targetClassName).each(function(j){
          $(this).height(Math.max.apply(null, heights));
        });
      }
    };
    check01Apps.init();
  });
})(jQuery);