/*各ステップ共通で変更した箇所*/

(function ($) {

	$(document).ready(function () {
		
		$(".kaizen_text__title").remove();
		$(".kaizen_block__stepNumber").hide();
		$(".shinsa-num").text("審査24-319【250731】");
		$("#kaizen_section__cancel").css({"height":"auto","padding-bottom":"60px"});
		$(".kaizen_block__flow > ul > li:nth-child(1) > a > .kaizen_text__index").text("ご契約内容");
		$(".kaizen_block__flow > ul > li:nth-child(2) > a > .kaizen_text__index").text("お引越し");
		$(".kaizen_block__flow > ul > li:nth-child(3) > a > .kaizen_text__index").text("ご利用料金");
		$(".slick-dots > li:eq(2) > a:eq(0) > span:eq(0)").html("ご利用<br>料金");
		$(".kaizen_block__flow > ul > li:nth-child(4) > a > .kaizen_text__index").text("通信速度");
		$(".kaizen_block__flow > ul > li:nth-child(5) > a > .kaizen_text__index").text("ご解約");
		$(".kaizen_text__index").attr({"style": "font: normal normal bold 14px/21px Noto Sans JP;"});
		$(".kaizen_item__step__1").attr({"style":"width: 100%;display: inline-block;overflow: hidden;"});
		$(".kaizen_item__step__2").attr({"style":"width: 100%;display: inline-block;overflow: hidden;"});
		$(".kaizen_item__step__3").attr({"style":"width: 100%;display: inline-block;overflow: hidden;"});
		$(".kaizen_item__step__4").attr({"style":"width: 100%;display: inline-block;overflow: hidden;"});
		$(".kaizen_item__step__6").attr({"style":"width: 100%;display: inline-block;overflow: hidden;"});

		/*ステップ1 */
		$(".slick-list").attr("style","height:530px;");
		$(".slick-list").addClass("kzStep1Height");
		$("button.slick-next").click(function(){
		  $(".slick-list").removeClass("kzStep1Height");
		});
		$(".kaizen_block__flow  a").click(function(){
		  $(".slick-list").removeClass("kzStep1Height");
		});
		$(".kaizen_section__suggest__1 > h2").html("コラボ光へのご変更は、<br><span>転用</span>のお手続きをお願いします。");
		$(".title > span").attr({"class":"underline"});
		$(".kaizen_section__suggest__1 > .wrap_text > p:eq(0)").remove();
		$(".mb40 > .c-txt").after(
			"<div class=\"kz_step1_content_style\" style=\"width: 782px;height: 119px;border: 5px solid #FC5255;margin: auto;margin-top: 50px;margin-bottom:110px;padding: 30px;\">" +
			"<img src=\"https://cdn.kaizenplatform.net/v2/attachments/000/375/989/017e65844e8d5d70d23487f64dc3a203a186fb3c.png\" style=\"display: inline-block;width: 36px;height: 36px;margin: auto;margin-top: 10px;\">" +
			"<p style=\"display: inline-block;margin-left: 15px;text-align: left;\">" +
			"コラボ光のご解約はこちらから行うことができません。<br>各光コラボレーション事業者さまへお申し込みください。</p>" +
			"</div>"
		  );
		$(".kz_step1_content_style").attr({"style":"height: 100%;width: 100%;border: 5px solid #FC5255;margin: auto;margin-top: 50px;margin-bottom:50px;padding: 20px;display: flex;"});
		$(".kz_step1_content_style > img").attr({"style":"display: inline-block;width: 33px;height: 33px;margin: auto;margin-top: 40px;margin-bottom: 5px;"});
		$(".mb30 > .c-txt").css("text-align", "left");

		/*ステップ2 */
		$(".kaizen_section__suggest__2 > h2").html("NTT西日本エリア内で<br>お引越しの場合<span>継続</span>して<br>ご利用いただけます。")
		$(".title > span").attr({"class":"underline"});
		$(".kaizen_section__suggest__2 > .wrap_text").html("<img src='https://cdn.kaizenplatform.net/v2/attachments/000/376/104/a3322eff7f00c9925b3556f1739665b615f690f5.png' alt='日本地図のイラスト'>");
		$(".wrap_text > img").attr({"style":"top: 618px;left: 533px;width: 209px;height: 192px;margin: auto;margin-bottom: 40px;"});

		/*ステップ3 */
		$(".mt25").html("ご利用中のオプションサービスを<br>見直しませんか？");
		$(".mt25").attr({"style":"text-align: center!important;"});
		$("._sp_mb20 > .c-grid > div:eq(0) > a:eq(0) > dl:eq(0) > dt").html("オプションサービスの見直し").attr({"style":"font-weight: bold;"});
		$("._sp_mb20 > .c-grid > div:eq(0) > a:eq(0) > dl").attr({"style":"margin-top: 15px;"});
		$(".kaizen_section__suggest__3 > .title").html("月額利用料が<br class=\"_sp\">安くなる可能性があります");
		$(".mb40 > .c-txt").css("text-align","left");

		/*ステップ4 */
		$(".kaizen_section__suggest__4 > h2").html("設定の見直しやプラン変更で<br>改善できる可能性があります");
		$(".nowrap").html("設定の見直し").attr({"style":"font-weight: bold;"});
		$("._sp_mb40 > .btn-panel_link > div:eq(0) > p:eq(0)").html("プラン変更");
		$(".mt5").replaceWith("<img src=\"https://cdn.kaizenplatform.net/v2/attachments/000/376/106/57482b248943024b5694fa91b85c9215b641de33.png\" alt=\"設定の見直しの画像\">");
		$("._body > img").attr({"style":"height: 98px;margin: auto;"});
		$("._sp_mt10 > ._sp_mb25 > a:eq(0)").attr({"style":"width: 421px;height: 278px;"});
		$("._sp_mb40 > .btn-panel_link").attr({"style":"width: 421px;height: 278px;"});
		$("._sp_mb40 > .btn-panel_link > div:eq(0) > p:eq(0)").after(
			"<p style=\"font-size: 25px;text-align: center;margin-top: 10px;margin-auto;\">" +
			  "<img src=\"https://cdn.kaizenplatform.net/v2/attachments/000/376/013/40486a23140b78955b48d2a31609fb0e6027a236.png\" alt=\"スラッシュ右.png\" style=\"width: 19px;height: 29px;margin-auto;display: inline-block;\">" +
			  "<span style=\"color: #1973B9;\">最大概ね<span class=\"temp-class5\" style=\";font: var(--unnamed-font-style-normal) normal 900 32.4px/26px var(--unnamed-font-family-noto-sans-jp);text-align: center;font: normal normal 900 25px/26px Noto Sans JP;letter-spacing: 1.62px;color: #1973B9;\">10</span>ギガ</span>の世界へ!" +
			  "<img src=\"https://cdn.kaizenplatform.net/v2/attachments/000/376/015/e48732c29e0901810abcf4dea53fc89b732d3ff3.png\" alt=\"スラッシュ右.png\" style=\"top: 638px;left: 697px;width: 19px;height: 29px;display: inline-block;margin-left: 3px;margin: auto;\">" +
			"</p>"
		  );
		$(".pt25").remove();
		$("._sp_mb40 > .btn-panel_link > div:eq(0) > p:eq(1)").after("<p style=\"margin-top: 10px;margin-bottom: 10px;margin: auto;text-align: center;font-size: 15px;\">ダウンロード時間、<span class=\"underline\">最大速度約10倍!</span> (理論値)</p>");
		$("._sp_mb40 > .btn-panel_link > div:eq(0) > p:eq(2)").after("<img src=\"https://cdn.kaizenplatform.net/v2/attachments/000/375/990/4d54be7bf8af27848ff1dfb44a1c77868161a444.png\" alt=\"プラン変更の画像\" style=\"width: 362px;height: 50px;margin: auto;margin-top: 30px;\">");
		$("._sp_mt10 > ._sp_mb25 > a:eq(0) > div:eq(0) > img:eq(0)").attr({"style":"height: 98px;margin: auto;margin-top: 40px;"});
		$(".kaizen_section__suggest__4 .c-note_list").before("<ul class=\"c-note_list\"><li>規格速度がより高速なタイプでも、利用環境等により実効速度が向上しない場合があります。</li><li>「セキュリティ対策ツール」などの標準機能や一部のオプションサービスがお使いいただけません。</li><li>サービス提供エリアのすべての住所でサービス提供を保証するものではありません。エリアについては、[<a href=\"/cart/\" class=\"link_icn blank\" target=\"_blank\" tabindex=\"0\">https://flets-w.com/cart/</a>]をご確認ください。</li></ul>");
		$(".kaizen_item__step__4 .c-note_list:eq(1) li:eq(2)").remove();
		$("._sp_mb40 > .btn-panel_link").attr({"style":"height: 100%;width: 100%;"});
		$("._sp_mt10 > ._sp_mb25 > a:eq(0)").attr({"style":"height: 100%;"});
		$("._body > .mt20").attr({"style":"font-weight: bold;"});
		$("._sp_mt10 > ._sp_mb25 > a:eq(0) > div:eq(0) > img:eq(0)").attr({"style":"height: 98px;margin: auto;"});
		$("._sp_mb40 > .btn-panel_link > div:eq(0)").attr({"style":"margin-bottom: 30px;"});
		$("._sp_mt10 > ._sp_mb25 > a:eq(0)").attr({"style":"width: 100%;"});
		$("._sp_mt10 > ._sp_mb25 > a:eq(0) > div:eq(0)").attr({"style":"margin-top: 15px;"});
		$("._sp_mb40 > .btn-panel_link > div:eq(0)").attr({"style":"margin-top:10px;"});
		$("._sp_mb40 > .btn-panel_link > div:eq(0) > img:eq(0)").attr({"style":"width: 362px;height: 50px;margin: auto;margin-top: 15px;"});
		$("._sp_mb40 > .btn-panel_link > div:eq(0) > p:eq(1)").attr({"style":"font-size: 25px;text-align: center;margin-top: 10px;margin-bottom: 10px;margin-auto;"});
		$("._sp_mb40 > .btn-panel_link").attr({"href":"/cp/cross/"});
		// $(".c-note_list").hide();
		$("._sp_mb40 > .btn-panel_link > div:eq(0) > p:eq(1)").css("font-size", "20px");

		/*ステップ5 */
		$(".kaizen_elem__step6").remove();
		$("p._sp_mb40").css("text-align","left");
		
	});

})(jQuery);