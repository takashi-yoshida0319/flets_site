(function(w){
	'use strict';

	var $ = w.jQuery, ROOT = w.YOZA ? w.YOZA : w.YOZA = {};
	var ID = 'NTT_WEST';
	var VERSION = '1.0.0';
	if(undefined === ROOT[ID]){ ROOT[ID] = {}; }
	ROOT[ID].ID = ID;
	ROOT[ID].VERSION = VERSION;
	if(undefined === ROOT[ID].COMMON){ ROOT[ID].COMMON = {}; }
	if(undefined === ROOT.__SYSTEM__){ ROOT.__SYSTEM__ = {}; }

	var GL = ROOT.GLOBAL || (ROOT.GLOBAL = {});
	var CO = ROOT[ID].COMMON;
	var $w, $doc, $body;

	GL.EventUnifyManager = undefined;
	GL.AdjustmentManager = undefined;
	GL.TabManager = undefined;
	GL.AccordionManager = undefined;
	GL.isSP = false;

	CO.param = {
		isSkipScroll : false,
		resizeFnArray : [
			[w, function(){ GL.isSP = $w.width() < 960; }]
		],
		scrollFnArray : []
	};

	CO.fn = {
		get_headerHeight : function(){
			//return $('#header').height();
			return $('#l-header').outerHeight();
		}
	};

	CO.$ready = function(){
		$w = $(w);
		$doc = $(document);
		$body = $('body');

		new CO.WrappingManager;

		GL.EventUnifyManager = new CO.EventUnifyManager({
			isImmediately : true
		});

		new CO.ModalManager({
			selector_trigger : '.open-modal',
			selector_co_modal_for_image : '.modal--cmn'
		});

		new CO.SlideshowManager({
			selector_wrapper : '.carousel',
			selector_widthManager : '.carousel',
			selector_slideParent : '.carousel__stage > ul',
			selector_slide : '.carousel__stage > ul > li',
			selector_prev : '.carousel__nav .prev',
			selector_next : '.carousel__nav .next',
			selector_pause : '.carousel__ctrl .pause',
			selector_markerParent : '.carousel__ctrl .marker > ul',
			isCarousel : true,
			isEdgeSpring : false,
			isAuto : true,
			isPause : false,
			isPCswipe : true,
			isBtnPause : true,
			isBtnLR : true,
			isBtnMarker : true,
			value_autoInterval : 5000,
			value_animateDuration : 300,
			value_dragDistance : 4 * 4,
			value_flickDistance : 20 * 20,
			classname_noncarousel : 'nonCarousel',
			classname_pause : 'pause',
			classname_unpause : 'play'
		});

		GL.TabManager = new CO.TabManager({
			selector_wrapper : '.tab--cmn',
			selector_trigger : '.tab__heading .tab__item',
			selector_content : '.tab__contents .tab__content__item',
			onOpen : function(){
				if(GL.AdjustmentManager.updateAdjust){ GL.AdjustmentManager.updateAdjust(); }
			}
		});

		GL.AccordionManager = new CO.AccordionManager({
			selector_wrapper : '.layeredNav',
			selector_trigger : '.layeredNav__header, .layeredNav__footer',
			selector_content : '.layeredNav__body',
			onOpen : function(){
				if(GL.AdjustmentManager.updateAdjust){ GL.AdjustmentManager.updateAdjust(); }
			}
		});

		new CO.CustomFormManager;

		new CO.CustomJSAnchor;

		GL.AdjustmentManager = new CO.AdjustmentManager;

		// export
		if(!w.__export_method){ w.__export_method = {}; } w.__export_method.AdjustmentManager = GL.AdjustmentManager;
	};

	/**
	 * EventUnifyManager (resize, scroll)
	 * GL.EventUnifyManager.add('resize', applyTarget, resizeEvent);
	 * GL.EventUnifyManager.add('scroll', applyTarget, scrollEvent);
	 * @constructor
	 */
	CO.EventUnifyManager = function(option){
		var self = this;
		var o = option || {};

		self.isImmediately = true === o.isImmediately;

		self._init.apply(self, arguments);
	};
	CO.EventUnifyManager.prototype = {
		_init : function(){
			var self = this, args = arguments;

			self.suffix = '.EventUnifyManager';

			$(function(){
				self.setup.apply(self, args);
			});
		},
		setup : function(){
			var self = this;
			$w
				.off('resize' + self.suffix).on('resize' + self.suffix, function(e){
				var i = 0, l = CO.param.resizeFnArray.length;
				for(; i < l; ++i){
					if('function' !== typeof(CO.param.resizeFnArray[i][1])){
						continue;
					}
					CO.param.resizeFnArray[i][1].apply(CO.param.resizeFnArray[i][0], [e]);
				}
			})
				.off('scroll' + self.suffix).on('scroll' + self.suffix, function(e){
				var i = 0, l = CO.param.scrollFnArray.length;
				for(; i < l; ++i){
					if('function' !== typeof(CO.param.scrollFnArray[i][1])){
						continue;
					}
					CO.param.scrollFnArray[i][1].apply(CO.param.resizeFnArray[i][0], [e]);
				}
			});

			if(self.isImmediately){
				$w.trigger('resize' + self.suffix).trigger('scroll' + self.suffix);
			}
		},
		add : function(type, applyTarget, fn){
			// var self = this;
			if(!type || !fn){
				return;
			}
			var id;
			switch(type.toLowerCase()){
				case 'resize':
					id = CO.param.resizeFnArray.length;
					CO.param.resizeFnArray[id] = [applyTarget, fn];
					break;
				case 'scroll':
					id = CO.param.scrollFnArray.length;
					CO.param.scrollFnArray[id] = [applyTarget, fn];
					break;
			}
			return id;
		},
		del : function(type, id){
			// var self = this;
			if(!type || isNaN(id)){
				return;
			}
			switch(type.toLowerCase()){
				case 'resize':
					CO.param.resizeFnArray[id] = undefined;
					break;
				case 'scroll':
					CO.param.scrollFnArray[id] = undefined;
					break;
			}
		},
		trigger : function(type){
			var self = this;
			switch(type.toLowerCase()){
				case 'resize':
					$w.trigger('resize' + self.suffix);
					break;
				case 'scroll':
					$w.trigger('scroll' + self.suffix);
					break;
				default:
					$w
						.trigger('resize' + self.suffix)
						.trigger('scroll' + self.suffix);
					break;
			}
		}
	};

	/**
	 * AccordionManager
	 * @constructor
	 */
	CO.AccordionManager = function(option){
		var self = this;
		var o = option || {};

		self.selector_wrapper = undefined !== o.selector_wrapper ? o.selector_wrapper : '';
		self.selector_trigger = undefined !== o.selector_trigger ? o.selector_trigger : '';
		self.selector_content = undefined !== o.selector_content ? o.selector_content : '';
		self.cls_open = undefined !== o.cls_open ? o.cls_open : 'open';
		self.val_slideSpeed = undefined !== o.val_slideSpeed ? o.val_slideSpeed : 300;
		self.onOpen = undefined !== o.onOpen ? o.onOpen : function(){};

		self.hash = location.hash;

		self._init.apply(self, arguments);
	};
	CO.AccordionManager.prototype = {
		_init : function(){
			var self = this, args = arguments;

			self.suffix = '.AccordionManager';
			self.attr_exclusive = 'data-exclusive';

			$(function(){
				self.setup.apply(self, args);
			});
		},
		setup : function(){
			var self = this;

			self.$wrapper = $(self.selector_wrapper);
			self.$trigger = self.$wrapper.find(self.selector_trigger);
			if(0 === self.$trigger.length){ return false; }

			self.scrollAtClosed = false;

			self.v();
			self.c();
		},
		v : function(hash){
			var self = this;

			if(hash){ self.hash = hash; }

			// hash
			var $wrapper = self.$wrapper.filter(function(){ return this.getAttribute('id') === self.hash.replace('#', '');});
			if(0 < $wrapper.length){
				$wrapper.find(self.selector_trigger).addClass('open');
			}
			var $hashTar = self.$wrapper.find(self.hash);
			if(1 === $hashTar.length){
				if($hashTar.hasClass(self.selector_content)){
					$hashTar.addClass('open');
				}
				$hashTar = $hashTar.parents(self.selector_content);
				self.get_$triggers($hashTar).addClass('open');
			}

			// already open
			self.$trigger.each(function(){
				var $t = $(this);
				var $content = self.get_$content($t);
				var hasOpen = self.get_boolean_hasOpen($t);
				// pre open
				if(true === hasOpen){
					$content.show();
				}
			});

			var $tab = (0 < $wrapper.length ? $wrapper : self.$wrapper.find(self.hash)).parents(GL.TabManager.selector_content);
			GL.TabManager.forceOpenFromContent($tab);

		},
		c : function(){
			var self = this;
			self.$trigger
				.off('click' + self.suffix)
				.on('click' + self.suffix, function(){
					var $t = $(this);
					var exclusive = this.getAttribute(self.attr_exclusive);
					var $exclusive = (self.$trigger.not(this).filter('[' + self.attr_exclusive + '="' + exclusive + '"]'));

					self.updateToggle($exclusive, false);

					self.updateToggle($t);
				});
		},
		get_$content : function($tar){
			var self = this;
			var $ret1 = $tar.nextAll(self.selector_content);
			var $ret2 = $tar.find(self.selector_content);
			var $ret3 = $tar.prevAll(self.selector_content);
			self.scrollAtClosed = 0 < $ret3.length;
			return $ret1.length ? $ret1 : $ret2.length ? $ret2 : $ret3.length ? $ret3 : $();
		},
		get_$triggers : function($tar){
			var self = this;
			var $ret1 = $tar.nextAll(self.selector_trigger);
			var $ret2 = $tar.find(self.selector_trigger);
			var $ret3 = $tar.prevAll(self.selector_trigger);
			// self.scrollAtClosed = 0 < $ret3.length;
			// return $ret1.length ? $ret1 : $ret2.length ? $ret2 : $ret3.length ? $ret3 : $();
			return $ret1.add($ret2).add($ret3);
		},
		get_boolean_hasOpen : function($tar){
			var self = this;
			return $tar.hasClass(self.cls_open);
		},
		updateToggle : function($tar, bool){
			var self = this;
			var $t = $tar;
			if(0 === $t.length){ return; }
			var $content = self.get_$content($t);
			var hasOpen = self.get_boolean_hasOpen($t);
			var duration = isNaN($t.parents(self.selector_wrapper).attr('data-duration')) ? self.val_slideSpeed : Number($t.parents(self.selector_wrapper).attr('data-duration'));
			if(undefined !== bool){ hasOpen = !bool; }
			if(true === hasOpen){
				$t.removeClass(self.cls_open);

				var _h = 0, h = 0, wh = 0;
				if(self.scrollAtClosed){
					_h = $t.offset().top - CO.fn.get_headerHeight() - 10;
					$content.stop().hide();
					h = $t.offset().top - CO.fn.get_headerHeight() - 10;
					$content.stop().show();
					wh = $w.height();
				}

				$content.stop().slideUp(self.val_slideSpeed);

				if(self.scrollAtClosed && _h - h > wh){
					var $scroll = $('html, body');
					$scroll.stop().animate({scrollTop : h}, self.val_slideSpeed);
				}
			}
			else{
				$t.addClass(self.cls_open);
				$content.stop().slideDown(duration);
				if(self.onOpen){self.onOpen();}
			}
		},

		updateHash : function(hash){
			var self = this;

			self.v(hash);
		}
	};

	/**
	 * SlideshowManager
	 * @constructor
	 */
	CO.SlideshowManager = function(option){
		var self = this;
		var o = option || {};

		self.selector_wrapper = undefined !== o.selector_wrapper ? o.selector_wrapper : '';
		self.selector_widthManager = undefined !== o.selector_widthManager ? o.selector_widthManager : '';
		self.selector_slideParent = undefined !== o.selector_slideParent ? o.selector_slideParent : '';
		self.selector_slide = undefined !== o.selector_slide ? o.selector_slide : '';
		self.selector_prev = undefined !== o.selector_prev ? o.selector_prev : '';
		self.selector_next = undefined !== o.selector_next ? o.selector_next : '';
		self.selector_pause = undefined !== o.selector_pause ? o.selector_pause : '';
		self.selector_markerParent = undefined !== o.selector_markerParent ? o.selector_markerParent : '';

		self.isCarousel = undefined !== o.isCarousel ? o.isCarousel : true;
		self.isEdgeSpring = undefined !== o.isEdgeSpring ? o.isEdgeSpring : true;

		self.isAuto = undefined !== o.isAuto ? o.isAuto : true;
		self.isPause = undefined !== o.isPause ? o.isPause : false;
		self.value_autoInterval = undefined !== o.value_autoInterval ? o.value_autoInterval : 5000;
		self.isPCswipe = undefined !== o.isPCswipe ? o.isPCswipe : true;

		self.isBtnPause = undefined !== o.isBtnPause ? o.isBtnPause : true;
		self.isBtnLR = undefined !== o.isBtnLR ? o.isBtnLR : true;
		self.isBtnMarker = undefined !== o.isBtnMarker ? o.isBtnMarker : true;

		self.value_animateDuration = undefined !== o.value_animateDuration ? o.value_animateDuration : 300;
		self.value_dragDistance = undefined !== o.value_dragDistance ? o.value_dragDistance : 4 * 4;
		self.value_flickDistance = undefined !== o.value_flickDistance ? o.value_flickDistance : 20 * 20;

		self.classname_noncarousel = undefined !== o.classname_noncarousel ? o.classname_noncarousel : '';
		self.classname_pause = undefined !== o.classname_pause ? o.classname_pause : 'pause';
		self.classname_unpause = undefined !== o.classname_unpause ? o.classname_unpause : 'play';

		return self._init.apply(self, arguments);
	};
	CO.SlideshowManager.prototype = {
		_super : CO.SlideshowManager,
		_init : function(){
			var self = this, args = arguments;

			if(true === ROOT.__SYSTEM__.loaded){
				self.setup.apply(self, args);
			}
			else{
				setTimeout(function(){ self._init.apply(self, args); }, 200);
			}
		},
		setup : function(option){
			var self = this;

			// m:init
			self.$wrapper = $(self.selector_wrapper);
			if(0 === self.$wrapper.length){ return false; }
			else if(1 < self.$wrapper.length){
				self.$wrapper.each(function(){
					option.selector_wrapper = this;
					new self._super(option);
				});
				return;
			}

			self.$w = $(w);
			self.$widthManager = self.$wrapper.find(self.selector_widthManager);
			if(0 === self.$widthManager.length){
				self.$widthManager = $(self.selector_widthManager);
			}
			self.$parent = self.$wrapper.find(self.selector_slideParent);
			self.$slides = self.$wrapper.find(self.selector_slide);
			if(1 >= self.$slides.length){
				self.event_finally();
				return;
			}
			self.$next = self.$wrapper.find(self.selector_next);
			self.$prev = self.$wrapper.find(self.selector_prev);
			self.$pause = self.$wrapper.find(self.selector_pause);
			self.$markerParent = self.$wrapper.find(self.selector_markerParent);
			self.$slides.each(function(i){ this.setAttribute('data-slide-id', i); });
			self.count_originalSlide = self.$slides.length;
			if(2 >= self.count_originalSlide){ self.isCarousel = false; }
			self.btnLock = false;
			self.autoSI = undefined;
			self.isBtnPause = (self.isAuto && self.isBtnPause);
			if(0 < self.$wrapper.length && true === self.$wrapper.hasClass(self.classname_noncarousel)){ self.isCarousel = false; }

			// v:init
			self.$slide_origin = self.$slides;
			self.$markerParent.html((function(){ var src = '', i = 0, l = self.$slide_origin.length; for(; i < l; ++i){ src += '<li></li>'; } return src; }()));
			if(self.isCarousel){
				(function(){
					var $f = self.$slides.eq(0).clone();
					var $l = self.$slides.eq(self.$slides.length - 1).clone();
					self.$parent.prepend($l);
					self.$parent.append($f);
					$f = self.$slides.eq(1).clone();
					$l = self.$slides.eq(self.$slides.length - 2).clone();
					self.$parent.prepend($l);
					self.$parent.append($f);
					self.$slides = self.$wrapper.find(self.selector_slide);
				}());
			}
			self.baseWidth = self.$widthManager.width();
			self.$parent.width(self.baseWidth * self.$slides.length);
			self.firstPositionIndent = self.$slide_origin.eq(0).index();
			self.dataSlideId = Number(self.$slide_origin.eq(0).attr('data-slide-id'));
			self.$parent.css({'left': -(self.firstPositionIndent * self.baseWidth)});
			self.updateMarker();
			self.updatePauseButton();
			if(false === self.isBtnPause){ self.$pause.hide(); }else{ self.$pause.show(); }
			if(false === self.isAuto){ self.$pause.hide(); }
			if(false === self.isBtnLR){ self.$next.hide(); self.$prev.hide(); }else{ self.$next.show(); self.$prev.show(); }
			if(false === self.isBtnMarker){ self.$markerParent.hide(); }else{ self.$markerParent.show(); }

			// c:init
			self.$parent
				.data('isMousedown', false)
				.data('isDrag', false)
				.data('pos', {})
				.data('prepos', {})
				.data('fpos', {})
				.on('touchstart', function(e){self.event_touchStart.apply(self, [e]);})
				.on('touchmove', function(e){self.event_drag.apply(self, [e]);})
				.on('touchend', function(e){self.event_touchEnd.apply(self, [e]);})
				.on('touchcancel', function(e){self.event_touchEnd.apply(self, [e]);})
				.on('click', function(e){
					if(true === self.$parent.data('isDrag')){
						e.preventDefault();
					}
				});
			if(true === self.isPCswipe){
				self.$parent
					.on('mousedown', function(e){self.event_touchStart.apply(self, [e]);})
					.on('mousemove', function(e){self.event_drag.apply(self, [e]);})
					.on('mouseup', function(e){self.event_touchEnd.apply(self, [e]);})
					.on('mouseleave', function(e){self.event_touchEnd.apply(self, [e]);});
			}
			self.$next.on('click', function(){
				if(self.btnLock){ return false; }
				self.directJump((self.dataSlideId + 1) % self.count_originalSlide);
			});
			self.$prev.on('click', function(){
				if(self.btnLock){ return false; }
				self.directJump((self.count_originalSlide + self.dataSlideId - 1) % self.count_originalSlide);
			});
			self.$pause.on('click', function(){
				if(true !== self.isAuto){ return; }
				var isFalse = (false === self.isPause);
				self.isPause = !self.isPause;
				self.updatePauseButton();
				self.autoTimer(isFalse ? 'pause' : 'reset');
			});
			self.$markerParent.children().on('click', function(e){
				if(self.btnLock){ return false; }
				self.directJump($(this).index() % self.count_originalSlide);
			});
			self.$w.on('resize', function(){
				self.$widthManager = self.$wrapper.find(self.selector_widthManager);
				if(0 === self.$widthManager.length){
					self.$widthManager = $(self.selector_widthManager);
				}
				self.baseWidth = self.$widthManager.width();
				self.$parent.width(self.baseWidth * self.$slides.length);

				self.convergePosition(self.dataSlideId, true);
			});

			// onload
			if(true === self.isAuto){ self.autoTimer('reset'); }

			self.event_finally();
		},

		event_touchStart : function(e){
			var self = this;
			self.$parent.data('isMousedown', true);
			self.$parent.data('isDrag', false);

			self.extraLoopLeft = 0;
			self.flickDis = 0;
			self.isFlick = false;
			self.bectorFlick = undefined;

			self.$parent.stop();

			var tar = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
			var pageX = (tar.pageX || tar.clientX || tar.x || 0);
			var pageY = (tar.pageY || tar.clientY || tar.y || 0);
			self.$parent.data('pos', {
				x : pageX,
				y : pageY
			});
			self.$parent.data('prepos', {
				x : pageX,
				y : pageY
			});
			self.$parent.data('fpos', {
				left : parseInt(self.$parent.css('left'))
			});

			if(/^mouse/.test(e.type)){ e.preventDefault(); }
		},
		event_drag : function(e){
			var self = this;
			// drag
			if(true !== self.$parent.data('isMousedown')){
				return false;
			}

			var tar = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
			var pageX = (tar.pageX || tar.clientX || tar.x || 0);
			var pageY = (tar.pageY || tar.clientY || tar.y || 0);
			var Pos = self.$parent.data('pos');
			var prePos = self.$parent.data('prepos');
			var fPos = self.$parent.data('fpos');

			var _xx = pageX - Pos.x;
			var xx = Math.abs(_xx);
			var yy = Math.abs(pageY - Pos.y);
			if(xx * xx + yy * yy > self.value_dragDistance){
				self.$parent.data('isDrag', true);
			}

			self.isFlick = self.value_flickDistance <= (pageX - prePos.x) * (pageX - prePos.x) + (pageY - prePos.y) * (pageY - prePos.y);
			self.bectorFlick = self.isFlick ? ((pageX - prePos.x) < 0 ? 'next' : 'prev') : undefined;

			self.$parent.data('prepos', {
				x : pageX,
				y : pageY
			});

			self.updateRollPosition((fPos.left + _xx - self.extraLoopLeft));
		},
		event_touchEnd : function(e){
			var self = this;
			if(true === self.$parent.data('isMousedown')){
				if(true === self.isFlick && false === self.btnLock){
					switch(self.bectorFlick){
						case 'prev':
							if(false === self.isCarousel && 0 === self.dataSlideId){ break; }
							self.directJump((self.count_originalSlide + self.dataSlideId - 1) % self.count_originalSlide);
							break;
						case 'next':
							if(false === self.isCarousel && 0 === ((self.dataSlideId + 1) % self.count_originalSlide)){ break; }
							self.directJump((self.dataSlideId + 1) % self.count_originalSlide);
							break;
					}
				}
				else{
					self.convergePosition();
				}
			}
			self.$parent.data('isMousedown', false);
		},
		event_finally : function(){
			var self = this;
			self.$wrapper.animate({opacity:1}, self.value_animateDuration);
		},

		directJump : function(dataSlideId){
			var self = this;
			self.convergePosition(dataSlideId);
		},

		convergePosition : function(dataSlideId, isImmediately){
			var self = this;

			var $nearest = $();
			var val_nearest = Infinity;
			self.$slides.each(function(i){
				var $t = $(this);
				var l = parseInt(self.$parent.css('left')) + (self.baseWidth * i);
				var bool1 = Math.abs(val_nearest) > Math.abs(l);
				var bool2 = Math.abs(val_nearest) >= Math.abs(l);
				if((self.dataSlideId < dataSlideId) ? bool2 : bool1){
					if(!isNaN(dataSlideId)){
						if(Number(dataSlideId) === Number($t.attr('data-slide-id'))){
							$nearest = $t;
							val_nearest = l;
						}
					}
					else{
						$nearest = $t;
						val_nearest = l;
					}
				}
			});

			var nextL = -($nearest.index() * self.baseWidth);
			self.dataSlideId = Number($nearest.attr('data-slide-id'));

			self.updateMarker();
			self.autoTimer('reset');

			var dur = self.value_animateDuration * Math.abs(parseInt(self.$parent.css('left')) - nextL) / self.baseWidth;
			if(dur < self.value_animateDuration){ dur = self.value_animateDuration; }
			if(dur > self.value_animateDuration * 2){ dur = self.value_animateDuration * 2; }

			if(true === isImmediately){
				self.$parent.stop().css({'left' : nextL});
				self.extraLoopLeft = 0;
				self.updateRollPosition(nextL);
			}
			else{
				self.btnLock = true;
				self.$parent.stop().animate({'left' : nextL}, {
					duration : dur,
					complete : function(){
						self.extraLoopLeft = 0;
						self.updateRollPosition(nextL);
						self.btnLock = false;
					}
				});
			}
		},

		updateRollPosition : function(nextL){
			var self = this;
			var l = undefined !== nextL ? nextL : parseInt(self.$parent.css('left'));
			var w = self.baseWidth * (self.$slides.length - 1);
			var leftL = -(self.firstPositionIndent * self.baseWidth);
			var rightL = leftL - self.baseWidth * (self.count_originalSlide);
			if(false === self.isCarousel){
				if(l < -(w)){ self.isEdgeSpring ? l = -(w) + (l + w) * 0.025 : l = -(w); }
				else if(l > 0){ self.isEdgeSpring ? l *= 0.025 : l = 0; }
			}
			else if(leftL < l){
				self.extraLoopLeft += self.count_originalSlide * self.baseWidth;
				l -= self.count_originalSlide * self.baseWidth;
			}
			else if(rightL >= l){
				self.extraLoopLeft -= self.count_originalSlide * self.baseWidth;
				l += self.count_originalSlide * self.baseWidth;
			}

			self.$parent.css('left', l);
		},

		updateMarker : function(){
			var self = this;
			self.$markerParent.children().removeClass('active').eq(Number(self.dataSlideId)).addClass('active');
		},

		updatePauseButton : function(){
			var self = this;
			if((true === self.isPause)){
				self.$pause.removeClass(self.classname_pause);
				self.$pause.addClass(self.classname_unpause);
			}
			else{
				self.$pause.removeClass(self.classname_unpause);
				self.$pause.addClass(self.classname_pause);
			}
		},

		autoTimer : function(type){
			var self = this;
			if(true !== self.isAuto || true === self.isPause){ return; }
			switch(type){
				case 'reset':
					if(self.autoSI){
						clearTimeout(self.autoSI);
						self.autoSI = undefined;
					}
					self.autoSI = setTimeout(function(){
						if(true === self.isPause){ return; }
						if(true !== self.$parent.data('isMousedown')){
							self.directJump((self.dataSlideId + 1) % self.count_originalSlide);
						}
						else{
							self.autoTimer('reset');
						}
					}, self.value_autoInterval);
					break;
				case 'pause':
					if(self.autoSI){
						clearTimeout(self.autoSI);
						self.autoSI = undefined;
					}
					break;
			}
		}
	};

	/**
	 * ModalManager
	 * @constructor
	 */
	CO.ModalManager = function(option){
		var self = this;
		var o = option || {};

		self.selector_trigger = undefined !== o.selector_trigger ? o.selector_trigger : '.open-modal';
		self.selector_co_modal_for_image = undefined !== o.selector_co_modal_for_image ? o.selector_co_modal_for_image : '.modal--cmn';

		self.selector_modal_inner = undefined !== o.selector_modal_inner ? o.selector_modal_inner : '.modal__inner';
		self.selector_modal_close = undefined !== o.selector_modal_close ? o.selector_modal_close : '.modal__close';
		self.selector_modal_content = undefined !== o.selector_modal_content ? o.selector_modal_content : '.modal__content';

		self.attr_modal_image = undefined !== o.attr_modal_image ? o.attr_modal_image : 'data-zoomUp';
		self.attr_modal_content = undefined !== o.attr_modal_content ? o.attr_modal_content : 'href';

		self.eventname_suffix = '.ModalManager';

		self.isCenteringH_image = true;
		self.isCenteringV_image = true;
		self.isCenteringV_content = false;

		self.value_duration = 200;

		self._init.apply(self, arguments);
	};
	CO.ModalManager.prototype = {
		selector_trigger : undefined,
		_init : function(){
			var self = this, args = arguments;
			$(function(){
				self.setup.apply(self, args);
			});
		},
		setup : function(){
			var self = this;

			self.$trigger = $(self.selector_trigger);
			if(0 === self.$trigger.length){ return false; }

            // 201810add (tap -変更-> click)
			$(document)
			.off('click.modaltrigger', self.selector_trigger)
			.on('click.modaltrigger', self.selector_trigger, function(){
				var my = this;
				// Androidにて、ラジオボタンクリック時にモーダルを開くための対策としてディレイ処理が必要
				setTimeout(function(){
					var _attr;

					if($(my).parents(".radioCheck").length <= 0)
					{
						$(my).trigger('updateMVC');
					}


                    // 画像
					_attr = my.getAttribute(self.attr_modal_image);
					if(_attr !== null && 0 < _attr.length){
						self.act_openModal_image(_attr, my);
						return false;
					}
					// href
					_attr = my.getAttribute(self.attr_modal_content);
					if(_attr !== null && 1 < _attr.length && '#' === _attr.charAt(0)){
						self.act_openModal_content(_attr, my);
						return false;
					}
					// data-href
					_attr = my.getAttribute('data-' + self.attr_modal_content);
					if(_attr !== null && 1 < _attr.length && '#' === _attr.charAt(0)){
						// data-clear値がtrue時、チェック状態をfalseにする
						if('true' === my.getAttribute('data-clear')){
							my.removeAttribute('data-clear');
							my.checked = false;
							return true;
						}
						else if(false === my.checked){
							self.act_openModal_content(_attr, my);
							return false;
						}else{
							if($(my).parents(".radioCheck").length > 0)
							{
								$(my).parent(".panel_radio").removeClass('_active');
								my.checked = false;
								self.act_openModal_content(_attr, my);
								return false;
							}
						}
                        // 選択状態のラジオボタンをクリックした際にモーダルを開きたい場合
						// else if(true === my.checked){
                        //     self.act_openModal_content(_attr, my, true);
                        //     return false;
						// }
					}
                },1);

				return ('true' === my.getAttribute('data-clear'));
			});
			//

		},
		act_openModal_image : function(_src){
			var self = this;

			self.$modal_image = $(self.selector_co_modal_for_image);
			if(0 === self.$modal_image.length){ return false; }
			self.$modal_image_inner = self.$modal_image.find(self.selector_modal_inner);
			if(0 === self.$modal_image_inner.length){ return false; }

			var $img = $(new Image());
			var el_close_btn = self.$modal_image.find(self.selector_modal_close).get(0);
			var src_close_btn = el_close_btn ? el_close_btn.outerHTML : '';
			self.$modal_image_inner.html(src_close_btn).prepend($img);

			$img.one('load', function(){
				self.$modal_image_inner.attr('style', '');
				if(true === self.isCenteringH_image){
					self.$modal_image_inner.css({'text-align' : 'center'});
				}

				self.$modal_image_inner.css('width', 'auto');

				self.$modal_image.stop(true,true).css({opacity:0}).show();
				var mw = self.$modal_image_inner.width();
				if(this.width > mw){ $img.css('width', mw); }

					if($w.width() > $img.width()){
					self.$modal_image_inner.width($img.width());
				}
				else{
					self.$modal_image_inner.width('auto');
				}

				$w.trigger('resize' + self.eventname_suffix);

				self.$modal_image.hide().css({opacity:1}).fadeIn(self.value_duration);
			});
			$img.off('tap').on('tap', function cancelTap(){ return false; });

			if(true === self.isCenteringV_image){
				var $close = self.$modal_image.find(self.selector_modal_close);
				$w.on('resize' + self.eventname_suffix, function updatePaddingTop(){

					self.$modal_image_inner.css('width', 'auto');
					var mw = self.$modal_image_inner.width();
					if(this.width > mw){ $img.css('width', mw); }
					if($w.width() > $img.width()){
						self.$modal_image_inner.width($img.width());
					}
					else{
						self.$modal_image_inner.width('auto');
					}

					var pT = (0 === $close.length) ? 0 : (parseInt($close.css('top')) * 2 + $close.height());
					pT = ($w.height() > self.$modal_image_inner.outerHeight()) ? Math.max(pT, ($w.height() - self.$modal_image_inner.height()) * 0.5) : pT;
					self.$modal_image_inner.css('padding-top', pT);

					$close.css('margin-top', pT - (parseInt($close.css('top')) * 2 + $close.height()));
				});
			}

			self.$modal_image.off('tap').on('tap', function closeModal(){
				$w.off('resize' + self.eventname_suffix);
				self.$modal_image.off('tap');
				$img.off('tap');
				self.$modal_image.stop().fadeOut(self.value_duration, function(){ self.$modal_image_inner.attr('style', ''); });
			});

			$img.attr('src', _src);
		},
		act_openModal_content : function(_id, el_trigger, force_readonly){
			var self = this;

			var $modal = $(_id);
			if(0 === $modal.length){ return false; }
			var $modal_inner = $modal.find(self.selector_modal_inner);

			// 201810add 選択して閉じる ボタン特定用クラス
			var selector_close_with_select = '.fn-close_with_select';
            //

			if(true === self.isCenteringV_content){
				var $close = $modal.find(self.selector_modal_close);
				$w.on('resize' + self.eventname_suffix, function updatePaddingTop(){
					var pT = (0 === $close.length) ? 0 : (parseInt($close.css('top')) * 2 + $close.height());
					pT = ($w.height() > $modal_inner.outerHeight()) ? Math.max(pT, ($w.height() - $modal_inner.height()) * 0.5) : pT;
					$modal_inner.css('padding-top', pT);
				});
			}

			$modal.off('click').on('click', function closeModal(e){
				var $tar = $(e.target);

                // 201810add 選択して閉じる 選択せずに閉じる ボタンの追加
                if($tar.hasClass(selector_close_with_select.replace('.', ''))){
                	// 選択して閉じる
                    el_trigger.checked = true;
                    $(el_trigger).trigger('updateFromModal');
                    if($(el_trigger).parents(".radioCheck").length > 0)
										{
                    	$(el_trigger).parents(".radioCheck").removeClass('radioCheck');
                    }
                }
                else if($tar.hasClass(self.selector_modal_content.replace('.','')) || 0 < $tar.parents(self.selector_modal_content).length){
                	// 選択せずに閉じるボタン : .modal__simulation__footer__close
					if(!$tar.hasClass(self.selector_modal_close.replace('.', '')) || !$tar.hasClass(('.modal__simulation__footer__close').replace('.', ''))){
						return true;
					}

				}

                //

				$w.off('resize' + self.eventname_suffix);
				$modal.off('tap');
				$modal.stop().fadeOut(self.value_duration);
			});

            // 201810add プロバイダモーダル専用処理
			// 初期化
            var cls_select = 'is_select'; // $selectBtnWrapper に付与すると選択して閉じる／せずに閉じるボタンが出現
            var $selectBtnWrapper = $modal.find('.modal__simulation__footer');
            $selectBtnWrapper.addClass(cls_select);
            var $fn_hideReadOnly = $modal.find('.fn-hideReadOnly'); // 本サービスを選択する場合は、画面下部の「サービスを選択する」ボタンを押してください。
            $fn_hideReadOnly.show();

            // ボタンが動的変化する条件の確認
			if('modal_provider' === $modal.attr('id') || true === force_readonly || 'true' === el_trigger.getAttribute('data-js-modal-readonly')){
				// isReadOnly : 選択する/しないボタンの必要性。true:不要（＝従来通り[閉じる]のみ）
                var isReadOnly = true === force_readonly || 'true' === el_trigger.getAttribute('data-js-modal-readonly');
                $selectBtnWrapper[(true === isReadOnly) ? 'removeClass' : 'addClass'](cls_select);
                // updateProviderModalイベント発火
                $(el_trigger).trigger('updateProviderModal', [$modal.get(0)]);
                // 特定のモーダルにある .fn-hideReadOnly の表示状態(isReadOnly時に非表示)
                $fn_hideReadOnly[true === isReadOnly ? 'hide' : 'show']();
            }
            //

			$modal.stop(true,true).css('opacity', 0).show();
			$w.trigger('resize' + self.eventname_suffix);
            $modal.scrollTop(0);
			$modal.hide().css('opacity', 1).fadeIn(self.value_duration);
		}
	};

	/**
	 * AdjustmentManager
	 * @constructor
	 */
	CO.AdjustmentManager = function(option){
		var self = this;
		var o = option || {};

		self.selector_trigger = undefined !== o.selector_trigger ? o.selector_trigger : '.adjust';

		self.attr_adjust = undefined !== o.attr_adjust ? o.attr_adjust : 'data-adjust';

		self.value_adjustStyleName = 'height';

		self._init.apply(self, arguments);
	};
	CO.AdjustmentManager.prototype = {
		_init : function(){
			var self = this, args = arguments;
			$(function(){
				self.setup.apply(self, args);
			});
		},
		setup : function(){
			var self = this;

			self.selector_trigger_all = self.selector_trigger + '--all';

			self.$trigger = $(self.selector_trigger);
			self.$trigger_all = $(self.selector_trigger_all);
			if(0 === self.$trigger.length && 0 === self.$trigger_all.length){ return false; }

			self.updateAdjust();

			GL.EventUnifyManager.add('resize', self, self.updateAdjust);
			GL.EventUnifyManager.add('resize', self, function(){
				setTimeout(function(){
					self.updateAdjust();
				}, 300);
			});

		},
		updateAdjust : function(){
			var self = this;
			if(undefined === self.$trigger){ return false; }
			self.$trigger.each(function(){
				var selector = this.getAttribute(self.attr_adjust);
				if(!selector || 0 === selector.length){ return true; }

				var $t = $(this);
				var $tar = $t.find(selector);
				if(1 >= $tar.length){ return true; }

				var styleName = self.value_adjustStyleName;

				self.updateStyle($tar, styleName);

				var data = {}, bounds, key, val, d, l;
				$tar.each(function(){
					bounds = this.getBoundingClientRect();
					key = bounds.top;
					val = bounds.height;
					if(!data[key]){ data[key] = { max : 0, pre : 0, $tars : $(), is : true }; }
					data[key].max = Math.max(data[key].max, val);
					data[key].$tars = data[key].$tars.add(this);
					data[key].is = !!data[key].is || (!isNaN(data[key].pre) && 0 < data[key].pre && data[key].pre !== val);
					data[key].pre = data[key].max;
				});

				for(var item in data){
					d = data[item];
					l = d.$tars.length;
					if(1 >= l || false === d.is){ continue; }

					self.updateStyle(d.$tars, styleName, d.max);
				}

			});

			self.$trigger_all.each(function(){
				var selector = this.getAttribute(self.attr_adjust);
				if(!selector || 0 === selector.length){ return true; }

				var $t = $(this);
				var $tar = $t.find(selector);
				if(1 >= $tar.length){ return true; }

				var styleName = self.value_adjustStyleName;

				self.updateStyle($tar, styleName);

				var data = {}, bounds, key, val, d, l;
				$tar.each(function(){
					bounds = this.getBoundingClientRect();
					key = 'all';
					val = bounds.height;
					if(!data[key]){ data[key] = { max : 0, pre : 0, $tars : $(), is : true }; }
					data[key].max = Math.max(data[key].max, val);
					data[key].$tars = data[key].$tars.add(this);
					data[key].is = !!data[key].is || (!isNaN(data[key].pre) && 0 < data[key].pre && data[key].pre !== val);
					data[key].pre = data[key].max;
				});

				for(var item in data){
					d = data[item];
					l = d.$tars.length;
					if(1 >= l || false === d.is){ continue; }

					self.updateStyle(d.$tars, styleName, d.max);
				}

			});
		},
		updateAdjustDelay : function(){
			var self = this;
			self.updateAdjust();
			setTimeout(function(){
				self.updateAdjust();
			}, 300);
		},
		updateStyle : function($tar, name, val){
			if(2 === arguments.length){
				switch(name){
					case 'height':
						$tar.css(name, '');
						break;
				}
			}
			else if(3 <= arguments.length){
				switch(name){
					case 'height':
						$tar.css(name, val);
						break;
				}
			}
		}
	};

	/**
	 * TabManager
	 * @constructor
	 * @require common.js function scrollMethod()
	 */
	CO.TabManager = function(option){
		var self = this;
		var o = option || {};

		self.selector_wrapper = undefined !== o.selector_wrapper ? o.selector_wrapper : '';
		self.selector_trigger = undefined !== o.selector_trigger ? o.selector_trigger : '';
		self.selector_content = undefined !== o.selector_content ? o.selector_content : '';

		self.onOpen = undefined !== o.onOpen ? o.onOpen : function(){};

		self.attr_tabID = 'href';

		self.classname_tab_active = 'active';
		self.classname_content_active = 'active';

		self.suffix = '.TabManager';

		self.hash = location.hash;

		self.duration_scroll = 400;

		self._init.apply(self, arguments);
	};
	CO.TabManager.prototype = {
		_super : CO.TabManager,
		_init : function(){
			var self = this, args = arguments;
			$(function(){
				self.setup.apply(self, args);
			});
		},
		setup : function(option){
			var self = this;

			self.isAnimate = true;

			self.$wrapper = $(self.selector_wrapper);
			if(0 === self.$wrapper.length){ return false; }
			else if(1 < self.$wrapper.length){
				self.$wrapper.each(function(){
					option.selector_wrapper = this;
					new self._super(option);
				});
				return;
			}

			self.$trigger = self.$wrapper.find(self.selector_trigger);
			if(0 === self.$trigger){ return false; }
			self.$contents = self.$wrapper.find(self.selector_content);
			if(0 === self.$contents){ return false; }

			self.$trigger.off('tap' + self.suffix).on('tap' + self.suffix, function(){
				var $t = $(this);
				var hash = this.getAttribute(self.attr_tabID) || $t.find('a:first').attr(self.attr_tabID);
				var $content = self.$contents.filter(hash);
				if(0 === $content.length){ return false; }
				if(true === $content.hasClass(self.classname_content_active)){ return false; }

				self.$trigger.removeClass(self.classname_tab_active);
				$t.addClass(self.classname_tab_active);
				self.$contents.removeClass(self.classname_content_active);
				$content.addClass(self.classname_content_active);

				if(history && history.replaceState){ history.replaceState(null, null, hash); }

				self.isAnimate = true;
				self.animateScrollTop();

				if(self.onOpen){self.onOpen();}

				return false;
			});

			// init v
			self.updateHash();
		},

		updateHash : function(hash){
			var self = this;

			if(!self.$contents){ return false; }

			if(hash){ self.hash = hash; }

			var $content;

			var isSkipJsAnchor = false; // for CO.CustomJSAnchor

			// hash
			var $hashTar = self.$contents.filter(self.hash);
			if(1 === $hashTar.length){
				self.$trigger.removeClass(self.classname_tab_active);
				self.$contents.removeClass(self.classname_content_active);
				var $tri = self.$trigger.filter(function(){
					return self.hash === this.getAttribute(self.attr_tabID) || self.hash === $(this).find('a:first').attr(self.attr_tabID);
				});

				self.isAnimate = false;
				$tri.trigger('tap' + self.suffix);
				self.scrollMethod_CommonJS(self.hash);
				self.isAnimate = true;

				isSkipJsAnchor = true;
			}

			var $activeTar = self.$trigger.filter('.' + self.classname_tab_active).eq(0);
			if(0 === $hashTar.length && 1 === $activeTar.length && 0 === self.$contents.filter('.' + self.classname_tab_active).length){
				self.isAnimate = false;
				$activeTar.trigger('tap' + self.suffix);
				self.isAnimate = true;

				isSkipJsAnchor = true;
			}

			// id
			var $findTar = self.$contents.find(self.hash);
			if(1 === $findTar.length){
				$content = $findTar.parents(self.selector_content);
				if(0 < $content.length){
					isSkipJsAnchor = false;
					self.forceOpenFromContent($content);
				}
			}

			return isSkipJsAnchor;
		},

		animateScrollTop : function(){
			var self = this;

			if(true === CO.param.isSkipScroll){ return; }

			var $scroll = $('html, body');
			var st = self.$wrapper.get(0).getBoundingClientRect().top - CO.fn.get_headerHeight() + $w.scrollTop() - 10;
			if(true === self.isAnimate){
				$scroll.stop().animate({
					scrollTop : st
				}, {duration: self.duration_scroll, easing: 'easeInOutExpo'});

			}
			else{
				$scroll.stop().scrollTop(st);
			}
		},

		forceOpenFromContent : function($content){
			var self = this;

			if(!$content || 0 === $content.length){ return false; }

			var ID = $content.attr('id');

			var $a = $('[href="#' + ID + '"]');

			if(0 < $a.length){
				var $wrapper = $a.parents(self.selector_wrapper);
				if(0 === $wrapper.length){ return false; }

				var $trigger = $wrapper.find(self.selector_trigger);
				if(0 === $trigger){ return false; }
				var $contents = $wrapper.find(self.selector_content);
				if(0 === $contents){ return false; }

				$trigger.removeClass(self.classname_tab_active);
				$a.parents(self.selector_trigger).addClass(self.classname_tab_active);
				$contents.removeClass(self.classname_content_active);
				$content.addClass(self.classname_content_active);

				self.isAnimate = false;
				self.animateScrollTop();
				self.isAnimate = true;

				if(self.onOpen){self.onOpen();}
			}
		},

		// common.js function scrollMethod()
		scrollMethod_CommonJS : function(hash){
			var self = this;

			// import from common.js
			if(!w.__export_method || !w.__export_method.scrollMethod){ return false; }

			var $scroll = $('html, body');
			var st = self.$wrapper.get(0).getBoundingClientRect().top - CO.fn.get_headerHeight() + $w.scrollTop() - 10;

			$scroll.stop();
			w.__export_method.scrollMethod(hash, st);
		}
	};

	/**
	 * CustomFormManager
	 * @param option
	 * @constructor
	 */
	CO.CustomFormManager = function(option){
		var self = this;
		var o = option || {};

		self.selector_wrapper = undefined !== o.selector_wrapper ? o.selector_wrapper : '.customForm--select';
		self.selector_selected = undefined !== o.selector_selected ? o.selector_selected : '.customForm--select__selected';
		self.selector_list = undefined !== o.selector_list ? o.selector_list : '.customForm--select__option';
		self.selector_select = undefined !== o.selector_select ? o.selector_select : '.customForm--select__wrapper select';

		self.defaultFirst = true;
		self.slideUpIfSelected = true;

		self._init.apply(self, arguments);
	};
	CO.CustomFormManager.prototype = {
		_super : CO.CustomFormManager,
		_init : function(){
			var self = this, args = arguments;

			self.li_src = '<li data-value="##VALUE##"##CLASS##>##TEXT##</li>';

			self.suffix = '.CustomFormManager';

			$(function(){
				self.setup.apply(self, args);
			});
		},
		setup : function(option){
			var self = this;

			self.$wrapper = $(self.selector_wrapper);
			if(0 === self.$wrapper.length){ return false; }
			else if(1 < self.$wrapper.length){
				self.$wrapper.each(function(){
					option.selector_wrapper = this;
					new self._super(option);
				});
				return;
			}
			self.$selectedDisplay = self.$wrapper.find(self.selector_selected);
			if(0 === self.$selectedDisplay){ return false; }
			self.$listWrapper = self.$wrapper.find(self.selector_list);
			if(0 === self.$listWrapper){ return false; }
			self.$select = self.$wrapper.find(self.selector_select);
			if(0 === self.$select){ return false; }

			// create li
			var src = '', existSelected = false;
			self.$select.find('option').each(function(){
				var isSelected = null !== this.getAttribute('selected');
				if(true === isSelected){ existSelected = true; }
				src += self.li_src.replace('##TEXT##', this.innerText).replace('##VALUE##', this.value).replace('##CLASS##', isSelected ? ' class="selected"' : '');
			});
			self.$listWrapper.html(src);

			// selected
			if(false === existSelected && true === self.defaultFirst){
				self.$listWrapper.find('li:first').addClass('selected');
				self.$select.find('option:first').attr('selected', 'selected');
			}
			self.$selectedDisplay.html(self.$listWrapper.find('li.selected').html());

			// c
			self.$listWrapper.find('li').off('click' + self.suffix).on('click' + self.suffix, function(e){
				var t = e.target;
				var $t = $(t);
				var val = t.getAttribute('data-value');

				if(!val){ return true; }

				self.$select.val(val);

				self.$listWrapper.find('li').removeClass('selected');
				$t.addClass('selected');

				self.$selectedDisplay.html($t.html());

				if(true === self.slideUpIfSelected){ self.$selectedDisplay.trigger('tap'); }
			});
		}
	};

	/**
	 * CustomJSAnchor
	 * @constructor
	 * @require TabManager
	 * @require AccordionManager
	 * @require common.js $('.js-anchor').on('click')
	 */
	CO.CustomJSAnchor = function(option){
		var self = this;
		var o = option || {};

		self.selector_trigger = '.js-anchor';

		self._init.apply(self, arguments);
	};
	CO.CustomJSAnchor.prototype = {
		_init : function(){
			var self = this, args = arguments;

			self.suffix = '.CustomJSAnchor';

			$(function(){
				self.setup.apply(self, args);
			});
		},
		setup : function(){
			var self = this;

			$(self.selector_trigger).off('tap' + self.suffix).on('tap' + self.suffix, function(){
				var hash = this.getAttribute('href');
				if(0 === $(hash).length){ return false; }

				var isSkipJsAnchor = false;

				CO.param.isSkipScroll = true;
				if(GL.AccordionManager && GL.AccordionManager.updateHash){ GL.AccordionManager.updateHash(hash); }
				if(GL.TabManager && GL.TabManager.updateHash){ isSkipJsAnchor = GL.TabManager.updateHash(hash); }
				CO.param.isSkipScroll = false;

				if(history && history.replaceState){ history.replaceState(null, null, hash); }

				return false;
			});
		}
	};

	/**
	 * WrappingManager
	 * @constructor
	 */
	CO.WrappingManager = function(){
		var self = this;
		self._init.apply(self, arguments);
	};
	CO.WrappingManager.prototype = {
		_init : function(){
			var self = this, args = arguments;
			$(function(){
				self.setup.apply(self, args);
			});
		},
		setup : function(){
			var self = this;
			var platform = w.navigator.platform.toLowerCase();
			var isWin = platform.indexOf("win") === 0;
			var isMac = platform.indexOf("mac") === 0;
			var isWrapping = isWin || isMac;
			if(true === isWrapping){
				var $a = $('#header .utility--login a, #header .utility--search a');
				self.setWrap($a, 'span');
			}
		},
		setWrap : function($target, tagName){
			if(!$target || !tagName){ return false; }
			if(0 === $target.length){ return false; }
			if(0 === tagName.length){ return false; }
			$target.wrapInner('<'+ tagName +' />');
		}
	};

	$(CO.$ready);

	// ROOT.__SYSTEM__.onload
	(function(){ var f = function(){ROOT.__SYSTEM__.loaded = true; f = null;}; try{ w.addEventListener("load", f, false); }catch(x_x){ w.attachEvent("onload", f); } }());
	// ROOT.__SYSTEM__.DOMContentLoaded
	(function(){ var f = function(){ROOT.__SYSTEM__.DOMContentLoaded = true; f = null;}; try{ w.addEventListener("DOMContentLoaded", f, false); }catch(x_x){} try{ document.attachEvent("onreadystatechange", f); }catch(x_x){}  }());
}(window));

// plug.in.tap.min.js
if(window.jQuery){
	!function(a){"use strict";var b=5,c={touched:!1},d=void 0,e=["click","touchstart","touchmove","touchend"],f={click:function(a){a.target===a.currentTarget&&a.preventDefault()},touchstart:function(a){var b=a.originalEvent;d=b.touches[0],c.touched=!0,c.startX=d.pageX,c.startY=d.pageY},touchmove:function(a){if(c.touched){var e=a.originalEvent;d=e.touches[0],Math.sqrt((d.pageX-c.startX)*(d.pageX-c.startX)+(d.pageY-c.startY)*(d.pageY-c.startY))>b&&(c.touched=!1)}},touchend:function(b){if(c.touched){var e=b.originalEvent;d=e.changedTouches[0],c.touched=!1,a.event.dispatch.call(this,a.Event("tap",{originalEvent:b,target:b.target,pageX:d.pageX,pageY:d.pageY}))}}};a.event.special.tap="ontouchstart"in window?{setup:function(){var b=a(this);a.each(e,function(a,c){b.on(c,f[c])})},teardown:function(){var b=a(this);a.each(e,function(a,c){b.off(c,f[c])})}}:{bindType:"click",delegateType:"click"}}(jQuery);
}