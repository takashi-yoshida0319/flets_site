jQuery = jQuery.noConflict();

(function($){

  /*
   * jQuery throttle / debounce - v1.1 - 3/7/2010
   * http://benalman.com/projects/jquery-throttle-debounce-plugin/
   *
   * Copyright (c) 2010 "Cowboy" Ben Alman
   * Dual licensed under the MIT and GPL licenses.
   * http://benalman.com/about/license/
   */
  (function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);

  $.fn.accordion = {
    init: function(){
      this.$target = $('.js-accordion, .closer');
      $(document).on('click', '.js-accordion, .closer', $.throttle(1000, this.onClickHandler))
      // this.$target.on('click', $.throttle(1000, this.onClickHandler));
    },

    onClickHandler: function(e){
      var $currentTarget = $(e.currentTarget);
      var $accordion = '';
      if(/js-accordion/.test($currentTarget.attr('class'))){
        $accordion = $currentTarget.next('div');
      } else {
        $accordion = $currentTarget.parent('div');
      }
      $accordion.slideToggle(500);
      $accordion.prev('.js-accordion').toggleClass('minus');
    }
  };

  $.fn.dropdown = {
    init: function(){
      this.$target = $('.js-dropdown');
      this.$target.hover(this.onMouseOverHandler, this.onMouseOutHandler);
    },

    onMouseOutHandler: function(e){
      var $target = $(e.currentTarget);
      $target.find('ul').hide();
      $target.removeClass('on');
    },

    onMouseOverHandler: function(e){
      var $target = $(e.currentTarget);
      $target.find('ul').stop(true,true).slideDown(300);
      $target.addClass('on');
    }
  };

  $.fn.tab = {
    $target:'',

    init: function(){
      this.$target = $('.js-tabs li');
      this.$target.on('click', this.onClickHandler);
      this.$target.hover(this.onMouseOverHandler, this.onMouseOutHandler);
    },

    onClickHandler: function(e){
      var $target = $(e.currentTarget);
      var num = $target.attr('class').match(/\d{2}/);
      $target.parent().find('li').removeClass('active').removeClass('on');
      $target.addClass('active');
      $target.parent().next('div').find('div').removeClass('active');
      $target.parent().next('div').find('.tab' + num).addClass('active');
    },

    onMouseOverHandler: function(e){
      var $target = $(e.currentTarget);
      if(!$target.hasClass('active')) {
        $target.addClass('on');
      }
    },

    onMouseOutHandler: function(e){
      var $target = $(e.currentTarget);
      if(!$target.hasClass('active')) {
        $target.removeClass('on');
      }
    }
  };

  $.fn.open = {

    $target : '',

    init: function(){
      this.$target = $('.js-openBtn');
      this.$target.on('click', this.onClickHandler);
    },

    onClickHandler: function(e){
      var $currentTarget = $(e.currentTarget);
      var $target = $($currentTarget.attr('href'));
      $target.slideDown(500, function(){
        var offsetTop = $(this).offset().top;
        $('html,body').animate({ scrollTop: offsetTop - 115 }, 300);
      })
      return false;
    }
  };

  $.fn.animateMove = {
    $target : '',

    init: function(){
      this.$target = $('.js-move');
      this.$target.on('click', this.onClickHandler);
    },

    onClickHandler: function(e){
      var $currentTarget = $(e.currentTarget);
      var $target = $($currentTarget.attr('href'));
      var offsetTop = $target.offset().top;
      $('html,body').animate({ scrollTop: offsetTop - 115 }, 300);
      return false;
    }
  };

  $(function(){
    $.fn.accordion.init();
    $.fn.dropdown.init();
    $.fn.tab.init();
    $.fn.open.init();
    $.fn.animateMove.init();
  });

})(jQuery);

