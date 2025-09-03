// shift_jis
(function($){
	$(function(){

		var selectMenuCookie = Cookies.get("I-SELECTMENU");
		//===============================
		// cookieの入れ替え
		//===============================
		var nowPage = location.pathname.split("/");
		if(nowPage[1].match(/^(service)|(opt)|(limited)|(price)/)){
			if(selectMenuCookie != "new" && selectMenuCookie != "user"){
				Cookies.set("I-SELECTMENU", "new", { expires: 365 , path: "/" });
				selectMenuCookie = Cookies.get("I-SELECTMENU");
			}
		}

	//touchstartに対応してたらtouchstart、してなければclick
	var tapFlag = window.ontouchstart===null?"touchstart":"click";

/*!
* Hiraku Ver.1.0.6 (https://www.appleple.com)
* Copyright appleple | MIT License
*
*/
//		!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){var s,i={direction:"right",breakpoint:-1},n=0,t={x:window.scrollX,y:window.ScrollY},e="a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]",o=function(){a(".js-hiraku-offcanvas").each(function(){var s=a(this),i=a(this).data("breakpoint");s.hasClass("js-hiraku-offcanvas-open")||(-1===i||i>=window.innerWidth?s.addClass("js-hiraku-offcanvas-active").attr("aria-hidden",!0):s.removeClass("js-hiraku-offcanvas-active").attr("aria-hidden",!1))})};a.fn.extend({hiraku:function(s){var s=a.extend({},i,s),t="js-hiraku-offcanvas-"+n,e=a(this),r=a(s.btn),f=a(s.fixedHeader);e.addClass("js-hiraku-offcanvas-sidebar").data("scroll",scroll),0===e.parent(".js-hiraku-offcanvas").length&&e.wrap('<div class="js-hiraku-offcanvas"/>'),e.attr("role","navigation");var d=e.parent(".js-hiraku-offcanvas");d.attr("aria-hidden","true").attr("aria-labelledby","hiraku-offcanvas-btn-"+n).attr("id",t).data("breakpoint",s.breakpoint).attr("aria-label","close"),a("body").addClass("js-hiraku-offcanvas-body"),"right"==s.direction?e.addClass("js-hiraku-offcanvas-sidebar-right"):e.addClass("js-hiraku-offcanvas-sidebar-left"),s.btn&&r.addClass("js-hiraku-offcanvas-btn").attr("data-toggle-offcanvas","#"+t).attr("aria-expanded",!1).attr("aria-label","Menu").attr("aria-controls",t).attr("id","hiraku-offcanvas-btn-"+n),s.fixedHeader&&f.addClass("js-hiraku-header-fixed"),n++,o()}}),a(document).on("click",".js-hiraku-offcanvas-btn",function(s){var i=a(a(this).data("toggle-offcanvas"));a('<button type="button"><span class="hiraku-open-btn-line"></span><span class="hiraku-open-btn-text">CLOSE</span></button>').attr("aria-label","Close").addClass("js-hiraku-offcanvas-close-btn").appendTo(i);var n=a(this),o=a("body").css({width:a(window).width(),height:a(window).height()}),r=i.find(".js-hiraku-offcanvas-sidebar"),f=i.find(e).first(),d=i.find(e).last();f.off("keydown.hiraku-offcanvas").on("keydown.hiraku-offcanvas",function(a){9===a.which&&a.shiftKey&&(a.preventDefault(),d.focus())}),d.off("keydown.hiraku-offcanvas").on("keydown.hiraku-offcanvas",function(a){9!==a.which||a.shiftKey||(a.preventDefault(),f.focus())}),d.off("click.hiraku-offcanvas").on("click.hiraku-offcanvas",function(){i.click()}),n.addClass("js-hiraku-offcanvas-btn-active").attr("aria-expanded",!0),t.x=window.scrollX,t.y=window.ScrollY,i.attr("aria-hidden",!1).addClass("js-hiraku-offcanvas-open"),setTimeout(function(){a("html").css("marginTop",-1*window.ScrollY),r.hasClass("js-hiraku-offcanvas-sidebar-right")?o.addClass("js-hiraku-offcanvas-body-right"):o.addClass("js-hiraku-offcanvas-body-left"),r.addClass("active"),f.focus()},1),s.preventDefault()}),a(document).on("click touchstart",".js-hiraku-offcanvas",function(s){a(s.target).hasClass("js-hiraku-offcanvas")&&(a(".js-hiraku-offcanvas-body").addClass("js-hiraku-offcanvas-body-moving").removeClass("js-hiraku-offcanvas-body-right").removeClass("js-hiraku-offcanvas-body-left"),a(".js-hiraku-offcanvas-sidebar").removeClass("active"),setTimeout(function(){$(".js-offcanvas-navi").children("dl").each(function(){"show"==$(this).attr("data-show")&&$(this).children("dt").trigger("click")}),$(".js-offcanvas-navi").children("dl").eq(defOpenMenuIndex).children("dt").trigger("click"),a(s.target).removeClass("js-hiraku-offcanvas-open").attr("aria-hidden",!0),a(".js-hiraku-offcanvas-body").removeClass("js-hiraku-offcanvas-body-moving"),a("html").css("marginTop",""),a("body").css({width:"",height:""}),window.scrollTo(t.x,t.y);var i=a(".js-hiraku-offcanvas-btn-active");i.removeClass("js-hiraku-offcanvas-btn-active").attr("aria-expanded",!1).focus(),a(s.target).find(".js-hiraku-offcanvas-close-btn").remove()},300))}),a(window).on("resize",function(){"requestAnimationFrame"in window?(cancelAnimationFrame(s),s=requestAnimationFrame(o)):o()})});

//!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){var s,i={direction:"right",breakpoint:-1},n=0,t={x:window.scrollX,y:window.ScrollY},e="a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]",o=function(){a(".js-hiraku-offcanvas").each(function(){var s=a(this),i=a(this).data("breakpoint");s.hasClass("js-hiraku-offcanvas-open")||(-1===i||i>=window.innerWidth?s.addClass("js-hiraku-offcanvas-active").attr("aria-hidden",!0):s.removeClass("js-hiraku-offcanvas-active").attr("aria-hidden",!1))})};a.fn.extend({hiraku:function(s){var s=a.extend({},i,s),t="js-hiraku-offcanvas-"+n,e=a(this),r=a(s.btn),f=a(s.fixedHeader);e.addClass("js-hiraku-offcanvas-sidebar").data("scroll",scroll),0===e.parent(".js-hiraku-offcanvas").length&&e.wrap('<div class="js-hiraku-offcanvas"/>'),e.attr("role","navigation");var d=e.parent(".js-hiraku-offcanvas");d.attr("aria-hidden","true").attr("aria-labelledby","hiraku-offcanvas-btn-"+n).attr("id",t).data("breakpoint",s.breakpoint).attr("aria-label","close"),a("body").addClass("js-hiraku-offcanvas-body"),"right"==s.direction?e.addClass("js-hiraku-offcanvas-sidebar-right"):e.addClass("js-hiraku-offcanvas-sidebar-left"),s.btn&&r.addClass("js-hiraku-offcanvas-btn").attr("data-toggle-offcanvas","#"+t).attr("aria-expanded",!1).attr("aria-label","Menu").attr("aria-controls",t).attr("id","hiraku-offcanvas-btn-"+n),s.fixedHeader&&f.addClass("js-hiraku-header-fixed"),n++,o()}}),a(document).on("click",".js-hiraku-offcanvas-btn",function(s){var i=a(a(this).data("toggle-offcanvas"));a('<button type="button"><span class="hiraku-open-btn-line"></span><span class="hiraku-open-btn-text">CLOSE</span></button>').attr("aria-label","Close").addClass("js-hiraku-offcanvas-close-btn").appendTo(i);var n=a(this),o=a("body").css({width:a(window).width(),height:a(window).height()}),r=i.find(".js-hiraku-offcanvas-sidebar"),f=i.find(e).first(),d=i.find(e).last();f.off("keydown.hiraku-offcanvas").on("keydown.hiraku-offcanvas",function(a){9===a.which&&a.shiftKey&&(a.preventDefault(),d.focus())}),d.off("keydown.hiraku-offcanvas").on("keydown.hiraku-offcanvas",function(a){9!==a.which||a.shiftKey||(a.preventDefault(),f.focus())}),d.off("click.hiraku-offcanvas").on("click.hiraku-offcanvas",function(){i.click()}),n.addClass("js-hiraku-offcanvas-btn-active").attr("aria-expanded",!0),t.x=window.scrollX,t.y=window.ScrollY,i.attr("aria-hidden",!1).addClass("js-hiraku-offcanvas-open"),setTimeout(function(){a("html").css("marginTop",-1*window.ScrollY),r.hasClass("js-hiraku-offcanvas-sidebar-right")?o.addClass("js-hiraku-offcanvas-body-right"):o.addClass("js-hiraku-offcanvas-body-left"),r.addClass("active"),f.focus()},1),s.preventDefault()}),a(document).on("click touchstart",".js-hiraku-offcanvas",function(s){a(s.target).hasClass("js-hiraku-offcanvas")&&(a(".js-hiraku-offcanvas-body").addClass("js-hiraku-offcanvas-body-moving").removeClass("js-hiraku-offcanvas-body-right").removeClass("js-hiraku-offcanvas-body-left"),a(".js-hiraku-offcanvas-sidebar").removeClass("active"),setTimeout(function(){$(".js-offcanvas-navi").children("dl").each(function(){"show"==$(this).attr("data-show")&&$(this).children("dt").trigger("click")}),$(".js-offcanvas-navi").children("dl").eq(defOpenMenuIndex).children("dt").trigger("click"),a(s.target).removeClass("js-hiraku-offcanvas-open").attr("aria-hidden",!0),a(".js-hiraku-offcanvas-body").removeClass("js-hiraku-offcanvas-body-moving"),a("html").css("marginTop",""),a("body").css({width:"",height:""}),setTimeout(function(){window.scrollTo(t.x,t.y)},300);var i=a(".js-hiraku-offcanvas-btn-active");i.removeClass("js-hiraku-offcanvas-btn-active").attr("aria-expanded",!1).focus(),a(s.target).find(".js-hiraku-offcanvas-close-btn").remove()},300))}),a(window).on("resize",function(){"requestAnimationFrame"in window?(cancelAnimationFrame(s),s=requestAnimationFrame(o)):o()})});



        var $NAV_OPEN_TRIGGER = $('.navbar-toggle');
        var $NAV_WRAPPER = $('.l-gnav__wrapper');
        var $NAV = $('.l-gnav');
        var current_scrollY;

        $NAV_OPEN_TRIGGER.on('click',function(){
        var $this = $(this);
        if(!$NAV_WRAPPER.hasClass('is_open')) {

                current_scrollY = $( window ).scrollTop();
                $( '#warp' ).css( {
                    position: 'fixed',
                    width: '100%',
                    top: -1 * current_scrollY
                } );

        	$NAV_WRAPPER.addClass('is_open').fadeIn(50,function(){
        		$NAV.addClass('is_active');
        		$this.addClass('is_active');
        	});

        } else {
                $( '#warp' ).attr( { style: '' } ).css('padding-top','0px');
                $( 'html, body' ).prop( { scrollTop: current_scrollY } );

        	$NAV.removeClass('is_active').delay(300).fadeIn(0,function(){
        		$NAV_WRAPPER.removeClass('is_open').fadeOut(50);
        		$this.removeClass('is_active');
        	})
        }
        });

        $('.l-gnav__wrapper__close').on('click',function(){

            $( '#warp' ).attr( { style: '' } ).css('padding-top','0px');
            $( 'html, body' ).prop( { scrollTop: current_scrollY } );

            $NAV.removeClass('is_active').delay(300).fadeIn(0,function(){
                $NAV_WRAPPER.removeClass('is_open').fadeOut(50);
                $NAV_OPEN_TRIGGER.removeClass('is_active');
            })
        });



    //---------------------------------
		// 機種判定
		//---------------------------------
		var ua = navigator.userAgent,
				device = "";

		if (ua.indexOf('HB-1000') > 0) {
			// HB-1000
			//device = "tb";
			var css_hb1000 = $('<link rel="stylesheet" type="text/css" href="/assets/css/hb1000.css">');
			$("head").append(css_hb1000);
			//alert("HB-1000");


			var portraitWidth,landscapeWidth;
			$(window).bind("resize", function(){
				if(Math.abs(window.orientation) === 0){
					if(/Android/.test(window.navigator.userAgent)){
						if(!portraitWidth)portraitWidth=$(window).width();
					}else{
						portraitWidth=$(window).width();
					}
					$("html").css("zoom" , portraitWidth/1240 );
				}else{
					if(/Android/.test(window.navigator.userAgent)){
						if(!landscapeWidth)landscapeWidth=$(window).width();
					}else{
						landscapeWidth=$(window).width();
					}
					$("html").css("zoom" , landscapeWidth/1240 );
				}
			}).trigger("resize");

		} else if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
			// スマートフォン用コード
			device = "sp";
		} else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
			// タブレット用コード
			device = "tb";
		} else {
			// PC用コード
			device = "pc";
		}
		//alert(ua);


		//---------------------------------
		// タブレットのみviewport修正
		//---------------------------------
		if(device == "tb")
		{
			if($('meta[name=viewport]').length <= 0)
			{
				var meta = $('<meta name="viewport" content="width=1240px,user-scalable=no,shrink-to-fit=yes">');
				$("head").append(meta);
			}

			function updateMetaViewport(){
				var viewportContent;
				var w = window.outerWidth;
				viewportContent = "width=1240px,user-scalable=no,shrink-to-fit=yes";
				document.querySelector("meta[name='viewport']").setAttribute("content", viewportContent);
			}
			//イベントハンドラ登録
			window.addEventListener("resize", updateMetaViewport, false);
			window.addEventListener("orientationchange", updateMetaViewport, false);
			//初回イベント強制発動
			var ev = document.createEvent("UIEvent");
			ev.initEvent("resize", true, true)
			window.dispatchEvent(ev);
		}





		//---------------------------------
		// ビジネス/フレッツ光のサービス
		// カレント表示用のリスト
		//---------------------------------
		var bizCurrentList = {
		};


		/////////////////////////////////////////////////////////
		//
		// 旧スムーススクロールの削除
		//
		/////////////////////////////////////////////////////////
		$('.insideLink').off('click');
		var defOpenMenuIndex = "";

		/////////////////////////////////////////////////////////
		//
		// 初期表示共通処理 cookieからの各種切り替え
		//
		/////////////////////////////////////////////////////////
		thisUrl = location.pathname.replace(/[^/]*$/i,'');

		// SP版キリカエメニュー矢印削除
		$("head").append("<style>#category-label-kirikae:after{ display:none }</style>");

		// cookie存在チェック なければデフォルト
		if(selectMenuCookie === undefined) {
			selectMenuCookie = 'new';
			Cookies.set("I-SELECTMENU", selectMenuCookie, { expires: 365 , path: "/" });
		}
		// 固定表示用チェック
		if(typeof(currentMenu) != "undefined" && currentMenu != "")
		{
			selectMenuCookie = currentMenu;
			Cookies.set("I-SELECTMENU", selectMenuCookie, { expires: 365 , path: "/" });
		}
		NowViewMenu = selectMenuCookie;


		if(thisUrl == "/"){
			$('#category-panel-general').css('display','none');
			NowViewMenu = "general";
			Cookies.set("I-SELECTMENU","",{path:"/",expires:-1});
		}

		if(bizCurrentList[thisUrl] != undefined)
		{
			NowViewMenu = "biz";
			Cookies.set("I-SELECTMENU", NowViewMenu, { expires: 365 , path: "/" });
		}

		$('#category-panel-kirikae').css('display','none')

		var setHref = "",
			setCrumb = "",
			//NowViewMenuText = $('.selectmenu--list').find('li[data-menu="'+NowViewMenu+'"] a').text();
			NowViewMenuText = $('.gnav').find('li[data-menu="'+NowViewMenu+'"] > a').text();


		//-----------------------------
		// ヘッダ部分の切り替え
		//-----------------------------
		if($('#js-selectmenu').length){
			$('#js-selectmenu').text(NowViewMenuText);
			$('.js-offcanvas-navi').find('dl').each(function(){
				var self = $(this);
				self.attr('data-show','hide');
				self.find('dt').attr('aria-checked','false');
				self.find('dd').attr('aria-expanded','false').attr('aria-hidden','true');
				if(self.attr('data-menu') == NowViewMenu){
					self.attr('data-show','show');
					self.find('dt').attr('aria-checked','true');
					self.find('dd').attr('aria-expanded','true').attr('aria-hidden','false');
				}
			})
		}

		$('.js-offcanvas-navi').children('dl').each(function(){
			if($(this).attr('data-show') == "show")
			{
				defOpenMenuIndex = $('.js-offcanvas-navi').children('dl').index($(this));
			}
		})

		//-----------------------------
		// パンくず変更
		//-----------------------------
		//console.log(NowViewMenuText);
		//alert(NowViewMenuText);

		// biz配下はぱんくずに固定値をセット
		if(nowPage[1] == "biz"){
			NowViewMenuText = "ビジネス（SOHO・企業）でご利用のお客さま";
			NowViewMenu = "biz";
			Cookies.set("I-SELECTMENU", NowViewMenu, { expires: 365 , path: "/" });
		}

		// zenko配下はぱんくずに固定値をセット
		if(nowPage[1] == "zenko"){
			NowViewMenuText = "フレッツ 光ネクスト　マンション・スーパーハイスピードタイプ 隼　全戸加入プランのご案内";
			NowViewMenu = "zenko";
			Cookies.set("I-SELECTMENU", NowViewMenu, { expires: 365 , path: "/" });
		}

		if($('.js-topicpath--select').length){
			$('.js-topicpath--select').attr('data-menu',NowViewMenu).find('a').attr('href','/'+NowViewMenu+'/').text(NowViewMenuText);
		}
		//-----------------------------
		// 白背景フッターサイトマップ
		//-----------------------------
		if($('.l-footersitemap').length){
			$('.l-footersitemap').children('.footersitemap--wrap').each(function(){
				$(this).attr('data-show','hide');
				if($(this).attr('data-menu') == NowViewMenu){
					$(this).attr('data-show','show');
				}
			});
		}
		//-----------------------------
		// 青ボタンCV部分の切り替え
		//-----------------------------
		//if($('.l-cvarea').length){
		//	$('.l-cvarea').each(function(){
		//		$(this).attr('data-show','hide');
		//		if($(this).attr('data-menu') == NowViewMenu){
		//			$(this).attr('data-show','show');
		//		}
		//	});
		//}

		//-----------------------------
		// お問い合わせhref変更
		//-----------------------------
		if($('.js-contact--link').length){
			setHref = '/'+NowViewMenu+'/inquiry/';
			if(NowViewMenu == 'general') { setHref = '/user/inquiry/'; } else
			if(NowViewMenu == 'new') { setHref = '/new/inquiry/'; } else
			if(NowViewMenu == 'kirikae') { setHref = '/user/inquiry/'; } else
			if(NowViewMenu == 'collabo') { setHref = '/collabo/info/'; } else
			if(NowViewMenu == 'biz') { setHref = '/user/inquiry/'; }
			$('.js-contact--link').attr('href',setHref);
		}
		//-----------------------------
		// cookie関連の切り替え
		//-----------------------------
		//$('.l-selectmenu').find('.selectmenu--list').find('li').each(function(){
		//	if($(this).attr('data-menu') == selectMenuCookie)
		//	{
		//		$(this).find('a').trigger('click');
		//	}
		//});

		$('#warp').removeClass('is-opacity');

		/////////////////////////////////////////////////////////
		//
		// ヘッダー検索ボタン
		//
		/////////////////////////////////////////////////////////
		$('.search--btn').on("click", function() {
			var $this =	$(this),
			searchbox = $('#site_all_search'),
			data = searchbox.attr("data-show");
			if(data === "show"){
				searchbox.attr("data-show","hide");
				$this.attr("data-search","close").find('a').text('検索');
			}else {
				searchbox.attr("data-show","show");
				$this.attr("data-search","open").find('a').text('閉じる');
			}
			return false;
		});

		/////////////////////////////////////////////////////////
		//
		// SP版スライドメニュー処理
		//
		/////////////////////////////////////////////////////////
		var spFlag = false;
        //
		// //スライドメニュー
		// if( $('body').hasClass('pattern-a') || $('body').hasClass('pattern-b') ){
		// 	$(".js-offcanvas").hiraku({
		// 		btn: ".js-offcanvas-btn",
		// 		direction: "right",
		// 		breakpoint: 959
		// 	});
		// }
		if($('body').hasClass('pattern-a') || $('body').hasClass('pattern-b') )
		{
			spFlag = true;
			//スライドメニュー親
			$('.js-gnav--category dt:not(:eq(0))').off("click");
			$('.js-gnav--category dt:not(:eq(0))').on("click", function() {
				if($(this).attr('id') == 'category-label-kirikae')
				{
					location.href = $(this).next('dd').find('a').attr('href');
					return false;
				}
				var $this =	$(this),
				content = $this.next('dd'),
				parent = $this.parent(),
				data = parent.attr("data-show");
				if(data === "show"){
					content.slideUp('fast',function(){
						content.attr('style','');
					});
					parent.attr("data-show","hide");
					$this.attr('aria-checked','false');
					content.attr('aria-expanded','false').attr('aria-hidden','true');

				}else {

					content.slideDown('fast',function(){
						content.attr('style','');
					});
					parent.attr("data-show","show");
					$this.attr('aria-checked','true');
					content.attr('aria-expanded','true').attr('aria-hidden','false');
				}
				return false;
			});
		}

		/////////////////////////////////////////////////////////
		//
		// 言語切替ドロップダウン表示
		//
		/////////////////////////////////////////////////////////
		$('.js-lang > a').on("click", function() {
			var $lang = $('html').attr('lang');
			var $this =	$(this),
				data = $this.attr("data-fontchange");
			if(data === "open"){
				if($lang === "ja"){
                    $this.find('.sr-only').text('Language');
				}else{
                    $this.find('.sr-only').text('Language');
				}
				$this.attr("data-fontchange","close");
			}else {
				$this.find('.sr-only').text('閉じる');
				$this.attr("data-fontchange","open");
			}
			return false;
		});


		/////////////////////////////////////////////////////////
		//
		// 共通処理 文字サイズ変更
		//
		/////////////////////////////////////////////////////////
		var selectFontSize = Cookies.get("I-FONTSIZE");
		// cookie存在チェック なければデフォルト
		if(selectFontSize === undefined) selectFontSize = 'normal';
		var ContentsDomObj = $('#l-contents--wrap');
		if(selectFontSize != 'normal')
		{
			// 大
			ContentsDomObj.removeClass('l-fontsize--normal');
			ContentsDomObj.addClass('l-fontsize--big');
			$('.js-fontsize').find('button').removeClass('is-current').end()
				.find('.fontsize--big').addClass('is-current');

			try{ window.__export_method.AdjustmentManager.updateAdjustDelay(); }catch(x_x){}
		}
		// 文字サイズドロップダウン表示
		$('.js-fontsize').find('a').on("click", function() {
			var $lang = $('html').attr('lang');
			var $this =	$(this),
				data = $this.attr("data-fontchange");
			if(data === "open"){
				if($lang === "ja"){
                    $this.find('.sr-only').text('文字サイズ');
				}else{
                    $this.find('.sr-only').text('Font Size');
				}
				$this.attr("data-fontchange","close");
			}else {
				$this.find('.sr-only').text('閉じる');
				$this.attr("data-fontchange","open");
			}
			return false;
		});
		// 文字サイズ変更処理
		$('.js-fontsize').find('button').on('click',function()
		{
			$('.js-fontsize').find('button').removeClass('is-current');
			if($(this).hasClass('fontsize--normal') === true)
			{
				// 標準
				ContentsDomObj.removeClass('l-fontsize--big');
				ContentsDomObj.addClass('l-fontsize--normal');
				Cookies.set("I-FONTSIZE", 'normal', { expires: 365 , path: "/" });
			}
			else
			{
				// 大
				ContentsDomObj.removeClass('l-fontsize--normal');
				ContentsDomObj.addClass('l-fontsize--big');
				Cookies.set("I-FONTSIZE", 'big', { expires: 365 , path: "/" });
			}
			$(this).addClass('is-current');
			$('.js-fontsize').find('a').trigger('click');

			try{ window.__export_method.AdjustmentManager.updateAdjustDelay(); }catch(x_x){}
		});


		/////////////////////////////////////////////////////////
		//
		// 共通処理 ヘッダ追従処理
		//
		/////////////////////////////////////////////////////////
		var HeaderDomObj = $('.js-header');
				HeaderDummyObj = $("<div>");
				HeaderHeight = HeaderDomObj.outerHeight(),
				HeaderFixedFlg = 0, // 0:ヘッダ画面上部に固定 1:ヘッダ追従中
				HeaderTopPoint = 0,
				ScrollY = 0,
				ScrollYBottom = 0,
				TimeoutObj = {},
				PageTopOffsetTop = 0,
				PageTopDomObj = $('.js-pagetop');

		//--------------------------------------
		// ページTOP計算用
		//--------------------------------------
/*
		PageTopDomObj.attr('data-position','absolute');
		PageTopOffsetTop = parseInt(PageTopDomObj.children('p').offset().top)+parseInt(PageTopDomObj.children('p').outerHeight());
		PageTopDomObj.attr('data-position','fixed');
		PageTopOffsetTop = PageTopOffsetTop+parseInt(PageTopDomObj.children('p').css('bottom'))
*/
		if(HeaderDomObj.length >= 1)
		{
			$('#warp').css('padding-top','0px');
		}
/*
		if(HeaderDomObj.length >= 1)
		{
			HeaderDummyObj.css({'height':HeaderHeight+'px','display':'none'});
			HeaderDomObj.attr('data-position','');
			//HeaderDomObj.after(HeaderDummyObj);
			HeaderDummyObj.insertBefore($('.rn2020#l-header'));
			$('#warp').css('padding-top','0px');
			$(window).on('scroll',function()
			{
				ScrollY = $(window).scrollTop();
				if(HeaderHeight <= ScrollY)
				{
					// 追従開始
					if(HeaderFixedFlg == 1) return false;
					HeaderFixedFlg = 1;
					TimeoutObj = setTimeout(function(){
						HeaderTopPoint = HeaderHeight*-1;
						HeaderDummyObj.css('display','block');
						HeaderDomObj.css('top',HeaderTopPoint+'px');
						HeaderDomObj.attr('data-position','fixed');
						HeaderDomObj.animate({'top':'0px'},500,'easeOutExpo');
					},300);

					// TOPボタンの表示
					PageTopDomObj.stop(true).fadeIn(200,function(){
						PageTopDomObj.attr('data-show','show');
					})
				}

				if(ScrollY <= 0)
				{
					// 追従終了
					clearTimeout(TimeoutObj);
					HeaderDomObj.attr('data-position','');
					HeaderDummyObj.css('display','none');
					HeaderFixedFlg = 0;
					PageTopDomObj.stop(true).fadeOut(200,function(){
						PageTopDomObj.attr('data-show','hide');
					})
				}
			});
		} else {
			$(window).on('scroll',function()
			{
				ScrollY = $(window).scrollTop();
				if(HeaderHeight <= ScrollY)
				{
					// TOPボタンの表示
					PageTopDomObj.stop(true).fadeIn(200,function(){
						PageTopDomObj.attr('data-show','show');
					})
				}

				if(ScrollY <= 0)
				{
					// 追従終了
					PageTopDomObj.stop(true).fadeOut(200,function(){
						PageTopDomObj.attr('data-show','hide');
					})
				}
			});
		}
*/
		/////////////////////////////////////////////////////////
		//
		// 共通処理 黒メニュー表示時
		//
		/////////////////////////////////////////////////////////
		var SelectmenuListDomObj = $('.selectmenu--list');
		$('.selectmenu--title').on('click',function(e)
		{
			var $this = $(this),
			show = $this.attr("data-show");
			if(SelectmenuListDomObj.css('display') == 'none')
			{

				$('.js-offcanvas-navi').children('dl[data-show=show]').find('li').each(function()
				{

					if($(this).attr('data-show') == "show")
					{
						$(this).children('a').trigger('click');
					}
				});
				SelectmenuListDomObj.stop(true).slideDown(400).attr({'area-hidden':'false'});
				$this.attr('data-show','show').attr({'aria-expanded':'true'});
				$('body').off('click touchstart');
				$('body').on('click touchstart',function(event){
					if(!$(event.target).closest('.selectmenu--title').length) {
						setTimeout(function(){
							$this.trigger('click')
						},300)
					}
				});
			}else{
				SelectmenuListDomObj.stop(true).slideUp(400).attr({'area-hidden':'true'});
				$this.attr('data-show','hide').attr({'aria-expanded':'false'});
				$('body').off('click touchstart');
			}
		});

		/////////////////////////////////////////////////////////
		//
		// 共通処理 黒メニュー内クリック
		//	 選択したカテゴリをcookieに保管 一旦期限は365日間とする。
		//
		/////////////////////////////////////////////////////////
		var NowViewMenu = "";
		$('.l-selectmenu').find('.selectmenu--list').find('a').on('click',function(){
			var menuName = $(this).text();
				NowViewMenu = setDataMenu = $(this).parent('li').attr('data-menu');

			//-----------------------------
			// cookieセットと黒メニュー閉じる
			//-----------------------------
			Cookies.set("I-SELECTMENU", setDataMenu, { expires: 365 , path: "/" });
		});


		/////////////////////////////////////////////////////////
		//
		// 共通処理 ヘッダ内のグレーメニューのclick処理
		//
		/////////////////////////////////////////////////////////
		var SlideF = 0,
				PrevOpenElem = "";

		$('.js-gnav--category').find('li[data-show]').children('a').on('click',function()
		{
			var self = $(this);
			if(spFlag){

				var $this =	$(this),
				content = $this.next('ul'),
				parent = $this.parent(),
				data = parent.attr("data-show");
				if(data === "show"){
					content.slideUp('fast');
					parent.attr("data-show","hide");
					$this.attr('aria-checked','false');
					content.attr('aria-expanded','false').attr('aria-hidden','true');
					$('body').off('click');
				}else {
					// メニューオープン
					$('.js-offcanvas-navi').children('dl[data-show=show]').find('li').each(function()
					{

						if($(this).attr('data-show') == "show")
						{
							$(this).children('a').trigger('click');
						}
					});

					if($('#js-selectmenu').attr('data-show') == "show")
					{
						$('#js-selectmenu').trigger('click');
					}

					content.slideDown('fast');
					parent.attr("data-show","show");
					$this.attr('aria-checked','true');
					content.attr('aria-expanded','true').attr('aria-hidden','false');
					$('body').off('click touchstart');
					$('body').on('click touchstart',function(event){
						if(!$(event.target).closest('.js-gnav--category').length) {
							setTimeout(function(){
								self.trigger('click')
							},300)
						}
					});

				}
			} else {
				if(SlideF == 1) {
					return false;
				}
				SlideF = 1;
				var self = $(this);
				if(self.parent('li').children('ul').css('display') == 'none')
				{

					if(PrevOpenElem != ""){
						PrevOpenElem.parent('li').children('ul').slideUp(100,function(){
							$(this).parent('li').children('.js-gnav--close').css('display','none');
							$(this).parent('li').children('a').removeClass('is-current');
						});
					}
					self.addClass('is-current');
					self.parent('li').attr("data-show","show");
					self.parent('li').children('.js-gnav--close').css('display','flex');
					self.parent('li').children('ul').slideDown(400,function(){
						PrevOpenElem = $(this);
						SlideF = 0;
					});

					$('body').off('click touchstart');
					$('body').on('click touchstart',function(event){
						if(!$(event.target).closest('.js-gnav--category').length) {
							setTimeout(function(){
								self.trigger('click');
							},300)
						}
					});


				}else{
					$('body').off('click touchstart');
					PrevOpenElem = "";
					self.parent('li').children('.js-gnav--close').css('display','none');
					self.parent('li').children('ul').slideUp(400,function(){
						SlideF = 0;
						if($(this).parent('li').children('a').hasClass('currentHold') == false){
							$(this).parent('li').attr("data-show","hide");
							$(this).parent('li').children('a').removeClass('is-current');
						}
					});
				}
			}
			return false;
		})
		$('.js-gnav--close').on('click',function(){
			$(this).parent('li').children('a').trigger('click');
		})

		/////////////////////////////////////////////////////////
		//
		// 共通処理 SP版スライドメニューのCookie処理
		//
		/////////////////////////////////////////////////////////
		$('.js-gnav--category').find('a:not([aria-checked])').on('click',function()
		{
			if(spFlag){
				var $this =	$(this),
				parent = $this.closest('dl'),
				setDataMenu = parent.attr("data-menu");
				Cookies.set("I-SELECTMENU", setDataMenu, { expires: 365 , path: "/" });
			}
			return true;
		});
		/////////////////////////////////////////////////////////
		//
		// 共通処理 ヘッダ内のグレーメニューのカレント表示
		//
		/////////////////////////////////////////////////////////
		$('.js-offcanvas-navi').find('dl').each(function(){
			var self = $(this),
				accord = 0;

			if(self.attr("data-show") == 'show')
			{
				self.children('dd').children('ul').children('li').each(function()
				{

					$(this).children('a').removeClass('is-current currentHold');
					if($(this).attr('data-show') == "show")
					{
						$(this).children('ul').children('li').each(function()
						{
							if(thisUrl == $(this).children('a').attr('href') && $(this).children('a').attr('href') != "")
							{
								$(this).parents('ul').parents('li').children('a').addClass('is-current currentHold');
								accord = 1;
							}
						});
					}else{
						if(thisUrl == $(this).children('a').attr('href') && $(this).children('a').attr('href') != "")
						{
							$(this).children('a').addClass('is-current currentHold');
							accord = 1;
						}
					}
				});
				if(accord == 0){
					self.children('dd').children('ul').children('li').each(function()
					{
						$(this).children('a').removeClass('is-current currentHold');
						if($(this).attr('data-show') == "show")
						{
							$(this).children('ul').children('li').each(function()
							{
								if(thisUrl.indexOf($(this).children('a').attr('href')) >= 0 && $(this).children('a').attr('href') != "")
								{
									$(this).parents('ul').parents('li').children('a').addClass('is-current currentHold');
									return false;
								}
							});
						}else{
							if(thisUrl.indexOf($(this).children('a').attr('href')) >= 0 && $(this).children('a').attr('href') != "")
							{
								$(this).children('a').addClass('is-current currentHold');
							}
						}
					});

					// ２つ以上ついた場合は階層深いものを優先
					if(self.children('dd').children('ul').children('li').find('.is-current').length >= 2)
					{
						var leaveIndex = 0;
							leaveLength = self.children('dd').children('ul').children('li').find('.is-current').eq(leaveIndex).attr('href').length;

						self.children('dd').children('ul').children('li').find('.is-current').each(function(){
							if($(this).attr('href').length > leaveLength){
								leaveIndex = self.children('dd').children('ul').children('li').index($(this).parent('li'));
								leaveLength = $(this).attr('href').length;
							}
						});
						self.children('dd').children('ul').children('li').find('a').removeClass('is-current currentHold');
						self.children('dd').children('ul').children('li').eq(leaveIndex).children('a').addClass('is-current currentHold');
					}
				}
			}
		})

		/////////////////////////////////////////////////////////
		//
		// 共通処理 ヘッダ内のグレーメニューのカレント表示
		// イレギュラー処理
		// bizCurrentListに入っているページの場合は、category-label-biz-in01にカレントをつける
		/////////////////////////////////////////////////////////
		if(bizCurrentList[thisUrl] != undefined)
		{
			// 念のため全リセット
			$('.js-offcanvas-navi').find('dl').find('a').removeClass('is-current currentHold');
			if($('#category-label-biz-in01').length >= 1){
				$('#category-label-biz-in01').addClass('is-current currentHold');
			}
		}

		//-----------------------------
		// 共通処理 pageTopの処理
		//-----------------------------
		PageTopDomObj.attr('data-show','hide');
		PageTopDomObj.on('click',function(){
			$('body,html').animate({scrollTop:'0px'}, 400, 'easeInOutExpo');
			return false;
		});

		//-----------------------------
		// 共通処理 特定リンククリック時のcookie更新処理
		//-----------------------------
		$('.js-cookieSetLink').on('click',function()
		{
			Cookies.set("I-SELECTMENU", $(this).attr('data-setCookie'), { expires: 365 , path: "/" });
		});

		//-----------------------------
		// 共通処理 アンカーリンククリック時の処理
		//-----------------------------
		$('.js-anchor').on('click touchstart',function()
		{
			var scAnchro = $(this).attr('href').split('#');

			if(scAnchro[0] == thisUrl || scAnchro[0] == ""){
				scrollMethod('#'+scAnchro[1]);
				return false;
			}



		});

		//-----------------------------
		// 共通処理 アンカーつき遷移時の処理
		//-----------------------------
		var hrefHash = location.hash;
		var skipScroll = false;
		if(hrefHash !== "" && $(hrefHash).length > 0)
		{
				var scrollDom = $(hrefHash);
				scrollDom.attr('id','');
				scrollDom.attr('id',hrefHash.replace('#',''));
				$('body,html').stop().animate({scrollTop:0}, 4, '');
				setTimeout(function(){
					if(true === skipScroll){ skipScroll = false; return false; }
					scrollMethod(hrefHash);
				},300);
				// return false;
		}

		//-----------------------------
		// 共通処理 スムーススクロール
		// componentForceTop : responsive.js にてスクロールポイントが確定する際の強制top値。同時にハッシュによるanimateをキャンセル（skipScroll = true;）
		//-----------------------------
		function scrollMethod(scAnchro, componentForceTop)
		{
			var headerHeight = HeaderDomObj.outerHeight();
			if(scAnchro === undefined || scAnchro === "" || $(scAnchro).length <= 0) return false;
			targetOffset = $(scAnchro).offset().top-headerHeight;
			if($("a[href="+scAnchro+"]").length > 0 && $("a[href="+scAnchro+"]").parents(".tab__heading").length > 0){
				targetOffset = $("a[href="+scAnchro+"]").parents(".tab__heading").offset().top-headerHeight;
			}
			var scData = targetOffset - headerHeight;
			if(!isNaN(componentForceTop))
			{
				//scData = componentForceTop;
				skipScroll = true;
			}
			$('body,html').stop().animate({scrollTop:scData}, 400, 'easeInOutExpo');
		}
		// export to responsive.js
		if(!window.__export_method){ window.__export_method = {}; } window.__export_method.scrollMethod = scrollMethod;

		//-----------------------------------------------
		// SP版メニューオープンのままPC版を表示した場合
		//-----------------------------------------------
		$(window).on('resize',function(){
			if(window.matchMedia('(min-width:958px)').matches)
			{
				$('.js-hiraku-offcanvas-close-btn').trigger('click');
			}
		})

		//---------------------------------------
		// 閉じた時の処理をしたい
		//---------------------------------------
		$('.js-hiraku-offcanvas-close-btn').on('click',function()
		{

			$('.js-offcanvas-navi').children('dl').each(function()
			{
				if($(this).attr('data-show') == "show")
				{
					$(this).children('dt').trigger('click');
				}
			})
			$('.js-offcanvas-navi').children('dl').eq(defOpenMenuIndex).children('dt').trigger('click');
		});


	$("a[href*='#']").on('click',function()
	{
		thisHref = $(this).attr('href').split('#');
		if(location.pathname == thisHref[0])
		{
			location.hash=thisHref[1]
			location.reload();
			return false;
		}
	})



	});

	//---------------------------------------
	// mente_top用 開閉処理
	//---------------------------------------
  $(function() {
	$('.mente_top_head').siblings().hide();
	$(".mente_top_head").click(function () {
	  $(this).siblings().toggle();
	  $(this).toggleClass('open');
	  $(this).children('p').children('span').toggle();
	});
	$(".mente_top_head a").focus(function () {
	  $(this).siblings().toggle();
	  $(this).toggleClass('open');
	  $(this).children('p').children('span').toggle();
	});
  });


	//---------------------------------------
	// 閉じるボタン
	//---------------------------------------
  $(function() {
		$(".btn--close").click(function () {
			//alert("CLOSE!");
	  	window.close();
	  	return false;
		});
  });

	// 2018-11-15： body.pattern-c に対し .open-modal の展開処理。responsive.js の CO.ModalManager を移植して調整
    $(function(){
        var $w = $(window);
        var $doc = $(document);
        var $body = $('body');
        var ModalManager = function(option){
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
        ModalManager.prototype = {
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

                self.$trigger.off('click.modaltrigger').on('click.modaltrigger', function(){

                	var my = this;
                    // Androidにて、ラジオボタンクリック時にモーダルを開くための対策としてディレイ処理が必要
                    setTimeout(function(){
                        var _attr;

                        $(my).trigger('updateMVC');

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
                $img.off('click').on('click', function cancelTap(){ return false; });

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

                self.$modal_image.off('click').on('click', function closeModal(){
                    $w.off('resize' + self.eventname_suffix);
                    self.$modal_image.off('click');
                    $img.off('click');
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
                    }
                    else if($tar.hasClass(self.selector_modal_content.replace('.','')) || 0 < $tar.parents(self.selector_modal_content).length){
                        // 選択せずに閉じるボタン : .modal__simulation__footer__close
                        if(!$tar.hasClass(self.selector_modal_close.replace('.', '')) || !$tar.hasClass(('.modal__simulation__footer__close').replace('.', ''))){
                            return true;
                        }
                    }
                    //

                    $w.off('resize' + self.eventname_suffix);
                    $modal.off('click');
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

        new ModalManager({
            selector_trigger : 'body.pattern-c .open-modal',
            selector_co_modal_for_image : 'body.pattern-c .modal--cmn'
        });
    });

})(jQuery151);
