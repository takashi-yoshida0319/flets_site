/*global jQuery151,window,setTimeout,document,AOS,location*/
(function ($) {
	var n4k8k = (function () {
		'use strict';

		var closeSPNav, toggleNavFixed, chkWidth, scrollToAnker,
			slideSpeed = 2000,
			$overray = $(document.createElement('div')).attr({ 'id': 'n4k8k-overray' }),
			isSP = false,
			hedH,
			navH,
			userAgent,
			fletsGNavH = 64,
			ME;

		ME = {
			init: function () {
				//IE check
				userAgent = window.navigator.userAgent.toLowerCase();
				if (userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1 || userAgent.indexOf('edge') != -1) {
					$('html').addClass('ua-ie');
				}

				// slide init
				$('#n4k8k-header--slide').slick({
					fade: true,
					autoplay: true,
					arrows: false,
					pauseOnFocus: false,
					pauseOnHover: false,
					swipe: false,
					autoplaySpeed: 5000,
					speed: slideSpeed
				});

				$('#n4k8k-header--slide').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
					$('.slick-slide').eq(nextSlide).addClass('slick-isshow');
					setTimeout(function () {
						$('.slick-slide').eq(currentSlide).removeClass('slick-isshow');
					}, slideSpeed);
				});

				// AOS init
				AOS.init({
					offset: 200,
					duration: 1000,
					easing: 'ease',
					once: true
				});

				// check SPwidth
				chkWidth();
				$(window).on('resize', chkWidth);

				// overlay init
				$overray.prependTo('body');

				// nav SP
				$(document).on('click', '#n4k8k-nav-toggle', function (e) {
					e.preventDefault();

					var $this = $(this),
						target = $this.attr('href');

					$overray.toggleClass('n4k8k-isactive');
					$(target).toggleClass('n4k8k-isopen').slideToggle(function () {
						if (!$(this).hasClass('n4k8k-isopen')) {
							$(this).attr({ 'style': '' });
						}
					});
					$this.toggleClass('n4k8k-isopen');
				});

				$(document).on('click', '#n4k8k-overray', closeSPNav);

				// ankerlink
				$('a[href^="#"].n4k8k-ankerlink, area[href^="#"]').not('a[href="#"], area[href="#"]').click(function (event) {
					var $this = $(this),
						target = $this.attr('href');

					if (target.match('TAB_')) {
						$('.tab__item').each(function () {
							var $this = $(this),
								href = $this.find('a').attr('href');

							if (href === target) {
								if (!$this.hasClass('active')) {
									$this.parent('.tab__heading').find('.tab__item').removeClass('active');
									$this.addClass('active');
									$this.parents('.tab--cmn').find('.tab__content__item').removeClass('active');
									$(target).addClass('active');
								}

								scrollToAnker('#n4k8k-tab');
							}
						});
					} else {
						scrollToAnker(target);
					}
				});

				// nav fixed
				toggleNavFixed();
				$(window).on('scroll', toggleNavFixed).on('resize', toggleNavFixed);

				//has hash
				var hash = location.hash;
				if (hash) {
					setTimeout(function () {
						scrollToAnker(hash);
					}, 350);
				}
			}
		};

		scrollToAnker = function (target) {
			setTimeout(function () {
				var targetTop = $(target).offset().top;

				navH = $('#n4k8k-header--nav').outerHeight();

				if (isSP) {
					if ($('#n4k8k-nav-toggle').hasClass('n4k8k-isopen')) {
						closeSPNav();
					}
					targetTop -= hedH;
				} else {
					targetTop -= (navH + fletsGNavH);
				}

				$('html, body').stop().animate({ 'scrollTop': targetTop }, 500);
			}, 550);
		};

		chkWidth = function () {
			var winW = $(window).width();

			navH = $('#n4k8k-header--nav').outerHeight();
			hedH = $('#header').outerHeight();

			if (winW > 767 && isSP) {
				isSP = false;
			} else if (winW <= 767 && !isSP) {
				isSP = true;
			}
		};

		toggleNavFixed = function () {
			var navTop = $('#n4k8k-about').offset().top - navH - fletsGNavH,
				scTop = $(window).scrollTop();

			if (scTop > navTop) {
				$('#n4k8k-header--nav').addClass('fixed');
			} else {
				$('#n4k8k-header--nav').removeClass('fixed');
			}
		};

		closeSPNav = function () {
			$overray.removeClass('n4k8k-isactive');
			$('#n4k8k-header--nav').removeClass('n4k8k-isopen').slideToggle(function () {
				$(this).attr({ 'style': '' });
			});
			$('#n4k8k-nav-toggle').removeClass('n4k8k-isopen');
		};

		return ME;
	}());
	$(n4k8k.init);
})(jQuery151);
