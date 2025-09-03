
/*
	カルーセル化
 */
/* スライド生成後に実行する関数 */
//console.log('script loaded');
(function ($) {

	$(document).ready(function () {

		var scrollPos;
		// 遷移ボタンタップでモーダルウィンドウを開く
		$(".kaizen_section__suggest__6 a.kaizen_btn__modal").on("click", function () {
			// 現在のスクロール位置を取得
			scrollPos = $(window).scrollTop();
			// モーダルウィンドウを表示
			$(".kaizen_block__overlay, .kaizen_block__modalWindow").fadeIn();
			// ページ背景を固定
			$("body").addClass("kaizen_fixed");
			$("body").css({ top: -scrollPos });
			return false;
		});

		// 閉じるボタンタップでモーダルウィンドウを閉じる
		$(".kaizen_button__close, .kaizen_block__overlay").on("click", function () {
			// モーダルウィンドウを非表示
			$(".kaizen_block__overlay, .kaizen_block__modalWindow").fadeOut();
			// ページ背景の固定を解除
			$("body").removeClass("kaizen_fixed");
			$("body").css({ top: 0 });
			// スクロール位置を復元
			$(window).scrollTop(scrollPos);
			return false;
		});

		// slick.jsの設定とカルーセル化の実行
		const menu1 = 'ご契約内容',
			menu2 = 'お引越し',
			menu3 = 'ご利用料金',
			menu4 = '通信速度',
			menu5 = 'ご解約';

		var slider = $(".kaizen_slick.kaizen_list__suggest").slick({
			dots: true,
			infinite: false,
			draggable: false,
			swipe: false,
			adaptiveHeight: true,
			prevArrow: "<button type='button' class='slick-prev'><span>戻る</span></button>",
			nextArrow: "<button type='button' class='slick-next'><span>解約へすすむ</span></button>",
			appendArrows: $("#kaizen_section__cancel > .kaizen_block__buttons"),
			appendDots: $("#kaizen_section__cancel .kaizen_wrap > .kaizen_block__flow"),
			customPaging: function (slick, index) {
				var menu = [menu1, menu2, menu3, menu4, menu5];  // 配列にメニューを格納
        		return '<a href="javascript:void(0);" data-step="' + String(index + 1) + '"><!-- span class="kaizen_text__title">ステップ</span --><span class="kaizen_text__index">' + menu[index] + '</span></a>';
			}
		});

		// 決め打ちで遷移
		// var urlHash = location.hash;
		// if (urlHash) {
		// 	if (urlHash == "#step1") {
		// 		slider.slick('slickGoTo', 0);
		// 	} else if (urlHash == "#step2") {
		// 		slider.slick('slickGoTo', 1);
		// 	} else if (urlHash == "#step3") {
		// 		slider.slick('slickGoTo', 2);
		// 	} else if (urlHash == "#step4") {
		// 		slider.slick('slickGoTo', 3);
		// 	} else if (urlHash == "#step5") {
		// 		slider.slick('slickGoTo', 4);
		// 	} else if (urlHash == "#step6") {
		// 		slider.slick('slickGoTo', 5);
		// 	}
		// }

		var urlHash = location.hash;
		if (urlHash) {
			if (urlHash == "#step1") {
				slider.slick('slickGoTo', 0);
			} else if (urlHash == "#step2") {
				slider.slick('slickGoTo', 1);
			} else if (urlHash == "#step3") {
				slider.slick('slickGoTo', 2);
			} else if (urlHash == "#step4") {
				slider.slick('slickGoTo', 3);
			} else if (urlHash == "#step5") {
				slider.slick('slickGoTo', 4);
			}
		}

		/* 矢印にイベントを設定 */
		/* $("#kaizen_section__cancel > .stepArrow.kaizen_block__arrow__suggest a.slidePrev").on("click", function () {
		$(".kaizen_slick.kaizen_list__suggest").slick("slickPrev");
		return false;
		});
		$("#kaizen_section__cancel > .stepArrow.kaizen_block__arrow__suggest a.slideNext").on("click", function () {
		$(".kaizen_slick.kaizen_list__suggest").slick("slickNext");
		return false;
	}); */

		// スライドの変化にあわせて設定
		$(".kaizen_slick.kaizen_list__suggest").on("beforeChange", function (event, slick, currentSlide, nextSlide) {
			//console.log(currentSlide);
			//console.log(nextSlide);
			// 矢印のトグル
			if (nextSlide === 0) {
				$("#kaizen_section__cancel > .stepArrow.kaizen_block__arrow__suggest a.slideNext").removeClass("kaizen_hidden");
				$("#kaizen_section__cancel > .stepArrow.kaizen_block__arrow__suggest a.slidePrev").addClass("kaizen_hidden");
			} else if (nextSlide + 1 === slick.slideCount) {
				$("#kaizen_section__cancel > .stepArrow.kaizen_block__arrow__suggest a.slidePrev").removeClass("kaizen_hidden");
				$("#kaizen_section__cancel > .stepArrow.kaizen_block__arrow__suggest a.slideNext").addClass("kaizen_hidden");
			} else {
				$("#kaizen_section__cancel > .stepArrow.kaizen_block__arrow__suggest a.slidePrev").removeClass("kaizen_hidden");
				$("#kaizen_section__cancel > .stepArrow.kaizen_block__arrow__suggest a.slideNext").removeClass("kaizen_hidden");
			}

			/* ==== #237418 starts ==== */
			// ステップ6の場合のみ「注意事項」以下を表示
			if (nextSlide === 4) {
				$(".kaizen_elem__step6").removeClass("kaizen_hidden");
			} else {
				$(".kaizen_elem__step6").addClass("kaizen_hidden");
			}
			/* ==== #237418 ends ==== */
		});

		// ボタンタップでステップ図までスクロール
		$("#kaizen_section__cancel .kaizen_wrap > .kaizen_block__flow ul.slick-dots li a, #kaizen_section__cancel > .kaizen_wrap + .kaizen_block__buttons button.slick-arrow, #kaizen_section__cancel > .stepArrow.kaizen_block__arrow__suggest a.btn").on("click", function (e) {
			var target = "#kaizen_section__cancel";
			var offset = $(target).offset().top;
			//var margin = $("#ntt-west").height() + $("#l-header").height() + $("#topicpath").height() + $("#main > .title_area").height() + $(".kaizen_block__flow").height(); //190;
			var margin = 0;
			if ($("#l-header.fixed").length > 0) {
				margin = margin + $("#l-header.fixed").height();
			} else {
				margin = margin + $("#l-header").height() + $(".kaizen_block__flow").height();
			}
			//console.log(margin);
			var position = offset - margin;
			/* if ($(".page_nav_area").css("display") === "block") {
				margin = margin + $(".page_nav_area").outerHeight();
			} */

			let btnLabel = $(this).text();
			let nowStep = $(".slick-active .kaizen_text__index").text();

			// ラベルで判定
			if (btnLabel == "次へ") {
				nowStep = (Number(nowStep) - 1);
			} else if (btnLabel == "戻る") {
				nowStep = (Number(nowStep) + 1);
			} else {
				nowStep = Number(nowStep);
			}
			console.log(btnLabel + " :ステップ" + nowStep);
			pushDataLayer(nowStep, btnLabel, false);

			//$("html,body").animate({scrollTop: position - margin,},300,"linear");

			$.when(
				$("html, body").animate({
					scrollTop: position
				}, 400, "swing"),
				e.preventDefault()
			).done(function () {
				var diff = $(target).offset().top - $("#l-header").height();
				if (diff === position) {
				} else {
					$("html, body").animate({
						scrollTop: diff
					}, 10, "swing");
				}
			});

		});
		/* 既存コンテンツの削除 */
		$(".kaizen_elem__removed").remove();

		/* ==== #237418 starts ==== */
		/* 「注意事項」以下をデフォルトで非表示 */
		$(".kaizen_elem__step6").addClass("kaizen_hidden");
		/* ==== #237418 ends ==== */

		/* ==== #230320 追加 ==== */
		$(".kaizen_item a.btn , .kaizen_item a.link_icn , .kaizen_item a.btn-panel_link").on("click", function (e) {
			let redirect = false;
			let href = $(this).attr("href");

			// ポップアップの場合は邪魔しない。
			if (!$(this).hasClass("popup-modal")) {
				e.preventDefault();
				redirect = href;
			}

			let label;
			let step = $(this).parents(".kaizen_item").find(".kaizen_block__stepNumber > span").text();

			// ボタンの場合
			if ($(this).hasClass("btn")) {
				label = $(this).find("span").text();
				// テキストリンク
			} else if ($(this).hasClass("link_icn")) {
				label = $(this).text();
				// ボタンパネル 特殊なのでリンク先で判定する
			} else if ($(this).hasClass("btn-panel_link")) {
				if (href == "/limited/groupwari/") {
					label = "グループ割";
				} else if (href == "/limited/hajimewari/") {
					label = "光はじめ割";
				}
			}

			if (typeof step !== "undefined") {
				step = step.replace(/[^0-9]/g, '');
				if (step) {
					pushDataLayer(step, label, redirect);
				}
			}

		});
	});

	function pushDataLayer(_step, _label, _redirect) {
		let baseUrl = location.protocol + '//' + location.hostname + location.pathname;
		let nowUrl = location.href;

		let resultLabel = _label;
		let resultNo = _step;
		let manageName = 'nad_comh';

		if (typeof resultNo === "undefined") {
			return false;
		}
		console.log("Click STEP" + resultNo + " label：" + resultLabel);

		window.dataLayer = window.dataLayer || [];
		dataLayer.push({
			'event': 'clickElement',
			'contents': 'flets-kaiyaku',
			'clickElement': 'ステップ' + resultNo + ' > ' + resultLabel,
			'clickUrl': baseUrl + "step" + resultNo + "/",
			'virtualPageTitle': 'ステップ' + resultNo + '｜ご解約について｜各種お手続き｜フレッツ光公式｜NTT西日本',
			'virtualPageUrl': nowUrl,
			'manage': manageName
		});

		if (_redirect) {
			window.location.href = _redirect;
		}
	}

})(jQuery);


