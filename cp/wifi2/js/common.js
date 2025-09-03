jQuery151 = jQuery.noConflict();
(function($){

$(function(){

  $('.match').matchHeight();

  $('.tab-top').on('click',function(){
    if($(this).hasClass("open") == true){
      $(this).removeClass("open");
      $(this).addClass("close");
      $(this).closest('.tab-area').addClass("opend");
      $(this).next(".wrap").slideDown(500);
    }else{
      $(this).removeClass("close");
      $(this).addClass("open");
      $(this).closest('.tab-area').removeClass("opend");
      $(this).next(".wrap").slideUp(500);
    }
  });

$('.change-tab li a').on('click', function() {
    if ($(this).hasClass("tab-off") == true) {

        // クリックされたタブの親の<ul>を取得
        var parentUl = $(this).closest('ul');

        // <ul>の親の<div.wrap>を取得
        var parentWrap = parentUl.closest('.wrap');

        // 他のタブの状態をリセットする
        parentUl.find('.tab-on').addClass('tab-off');
        parentUl.find('.tab-on').removeClass('tab-on');

        // クリックされたタブの状態を更新
        $(this).removeClass("tab-off");
        $(this).addClass("tab-on");

        // クリックされたタブに対応するコンテンツの表示/非表示を制御
        if ($(this).hasClass("mant") == true) {
            parentWrap.find(".detached").hide();
            parentWrap.find(".mantion").fadeIn();
        } else {
            parentWrap.find(".mantion").hide();
            parentWrap.find(".detached").fadeIn();
        }
    }
});

  var agentType;

	var ua = navigator.userAgent;

    if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
      $('.open-acordion').on('click',function(){
        headHeight = $('header').height();
        $('.tab-top').trigger('click');

        $('.tab-area2 .tab-top').removeClass("close");
        $('.tab-area2 .tab-top').addClass("open");
        $('.tab-area2 .tab-top').closest('.tab-area').removeClass("opend");
        $('.tab-area2 .tab-top').next(".wrap").css("display","none");

        $("html,body").animate({scrollTop:$('#num01').offset().top});
      });

    }else if(ua.indexOf('iPad') > 0){
        $("meta[name='viewport']").attr('content', 'width=980,initial-scale=0.5');
        $("head").append("<link>");
        css = $("head").children(":last");
        css.attr({
            rel: "stylesheet",
            type: "text/css",
            href: "css/tablet.css"
        });

    agentType="TAB";
  }else{
    $('.open-acordion').on('click',function(){
      headHeight = $('header').height();
      $('.tab-top').trigger('click');

      $('.tab-area2 .tab-top').removeClass("close");
      $('.tab-area2 .tab-top').addClass("open");
      $('.tab-area2 .tab-top').closest('.tab-area').removeClass("opend");
      $('.tab-area2 .tab-top').next(".wrap").css("display","none");

      $("html,body").animate({scrollTop:$('#num01').offset().top - headHeight + 30});
    });
  }

    $('.submit').on('click', function() {

		    //-------------------------------------------------
				// form check
		    //-------------------------------------------------
		    var flag = false; // 選択されているか否かを判定するフラグ

				//ラジオボタンの数だけ判定を繰り返す
		    for(var i=0; i<document.applicationForm.select.length;i++){
	        // i番目のラジオボタンがチェックされているかを判定
	        if(document.applicationForm.select[i].checked){
            flag = true;
            //alert(document.applicationForm.select[i].value + "が選択されました。");
	        }
		    }

		    //エラー処理
				if(!flag){
	        alert("住居タイプを選択してください。");
	        return false;
		    }	else if(document.applicationForm.zip01.value == "" || document.applicationForm.zip02.value == ""){
		      alert("郵便番号を入力して下さい。");
					return false;
		    } else { //alert("OK");
          //パラーメータ設定
	        // /cart/index.php?etc_data_kks=skip_route%3Dskip%40kantan%3D1%40submit_zip%3D1&p_mansion=0&post=1234567
	        var date = "/cart/index.php?etc_data_kks=skip_route%3Dskip%40kantan%3D1%40submit_zip%3D1&p_mansion=";
	        date += $("input:radio[name='select']:checked").val();
	        date += "&post=";
	        date += document.applicationForm.zip01.value;
	        date += document.applicationForm.zip02.value;
		      //date += "&cp=00171110";

					//alert(date);
					//return false;

	        //パラメータ付きに書き換え
	        $('#applicationForm').attr('action', date);
	        document.applicationForm.submit();

		    }
		    //-------------------------------------------------

    });

    $('.submit02').on('click', function() {
		    //-------------------------------------------------
				// form check
		    //-------------------------------------------------
		    var flag = false; // 選択されているか否かを判定するフラグ

				//ラジオボタンの数だけ判定を繰り返す
		    for(var i=0; i<document.applicationForm02.select02.length;i++){
	        // i番目のラジオボタンがチェックされているかを判定
	        if(document.applicationForm02.select02[i].checked){
            flag = true;
            //alert(document.applicationForm02.select02[i].value + "が選択されました。");
	        }
		    }

		    //エラー処理
				if(!flag){
	        alert("住居タイプを選択してください。");
	        return false;
		    }	else if(document.applicationForm02.zip03.value == "" || document.applicationForm02.zip04.value == ""){
		      alert("郵便番号を入力して下さい。");
					return false;
		    } else { //alert("OK");
		      //パラーメータ設定
		      var date2 = "/cart/index.php?etc_data_kks=skip_route%3Dskip%40kantan%3D1%40submit_zip%3D1&p_mansion=";
		      date2 += $("input:radio[name='select02']:checked").val();
		      date2 += "&post=";
		      date2 += document.applicationForm02.zip03.value;
		      date2 += document.applicationForm02.zip04.value;
		      //date2 += "&cp=00171110";

					//alert(date2);
					//return false;

		      //パラメータ付きに書き換え
		      $('#applicationForm02').attr('action', date2);
	        document.applicationForm02.submit();
		    }
		    //-------------------------------------------------

    });

    $('.submit03').on('click', function() {
		    //-------------------------------------------------
				// form check
		    //-------------------------------------------------
		    var flag = false; // 選択されているか否かを判定するフラグ

				//ラジオボタンの数だけ判定を繰り返す
		    for(var i=0; i<document.applicationForm03.select03.length;i++){
	        // i番目のラジオボタンがチェックされているかを判定
	        if(document.applicationForm03.select03[i].checked){
            flag = true;
            //alert(document.applicationForm02.select02[i].value + "が選択されました。");
	        }
		    }

		    //エラー処理
				if(!flag){
	        alert("住居タイプを選択してください。");
	        return false;
		    }	else if(document.applicationForm03.zip05.value == "" || document.applicationForm03.zip06.value == ""){
		      alert("郵便番号を入力して下さい。");
					return false;
		    } else { //alert("OK");
		      //パラーメータ設定
		      var date3 = "/cart/index.php?etc_data_kks=skip_route%3Dskip%40kantan%3D1%40submit_zip%3D1&p_mansion=";
		      date3 += $("input:radio[name='select03']:checked").val();
		      date3 += "&post=";
		      date3 += document.applicationForm03.zip05.value;
		      date3 += document.applicationForm03.zip06.value;
		      //date3 += "&cp=00171110";

					//alert(date3);
					//return false;

		      //パラメータ付きに書き換え
		      $('#applicationForm03').attr('action', date3);
	        document.applicationForm03.submit();
		    }
		    //-------------------------------------------------
    });

    $('.submit04').on('click', function() {
		    //-------------------------------------------------
				// form check
		    //-------------------------------------------------
		    var flag = false; // 選択されているか否かを判定するフラグ

				//ラジオボタンの数だけ判定を繰り返す
		    for(var i=0; i<document.applicationForm04.select04.length;i++){
	        // i番目のラジオボタンがチェックされているかを判定
	        if(document.applicationForm04.select04[i].checked){
            flag = true;
            //alert(document.applicationForm04.select04[i].value + "が選択されました。");
	        }
		    }

		    //エラー処理
				if(!flag){
	        alert("住居タイプを選択してください。");
	        return false;
		    }	else if(document.applicationForm04.zip07.value == "" || document.applicationForm04.zip08.value == ""){
		      alert("郵便番号を入力して下さい。");
					return false;
		    } else { //alert("OK");
		      //パラーメータ設定
		      var date4 = "/cart/index.php?etc_data_kks=skip_route%3Dskip%40kantan%3D1%40submit_zip%3D1&p_mansion=";
		      date4 += $("input:radio[name='select04']:checked").val();
		      date4 += "&post=";
		      date4 += document.applicationForm04.zip07.value;
		      date4 += document.applicationForm04.zip08.value;
		      //date4 += "&cp=00171110";

					//alert(date4);
					//return false;

		      //パラメータ付きに書き換え
		      $('#applicationForm04').attr('action', date4);
	        document.applicationForm04.submit();
		    }
		    //-------------------------------------------------

    });

    //全角数字→半角数字
		$('.num').clearField({
			blurClass: 'myBlurredClass',
			activeClass: 'myActiveClass'
		});

	  $('.num').change(function(){
	  	var txt  = $(this).val();

			//正規表現パターン
			var regex = new RegExp(/[0-9]/);
	  	var han = txt.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)});
		  $(this).val(han);
	  });

            $('.smooth').click(function(){
                if($(this).attr("href") == "javascript:void(0)"){

                }else{
                    var speed = 400;
                    headHeight = $('header').height();
                    var href= $(this).attr("href");
                    var target = $(href == "#" || href == "" ? 'html' : href);
                    var position = target.offset().top - headHeight;
                    $("html, body").animate({scrollTop:position}, speed, "swing");
                    return false;
                }
              });

            if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
                $('.smooth-close').click(function(){
                    if($(this).attr("href") == "javascript:void(0)"){

                    }else{
                        var speed = 400;
                        headHeight = $('header').height();
                        var href= $(this).attr("href");
                        var target = $(href == "#" || href == "" ? 'html' : href);
                        var position = target.offset().top - headHeight -29;
                        $("html, body").animate({scrollTop:position}, speed, "swing");
                        return false;
                    }
                  });
            }else{
                $('.smooth-close').click(function(){
                    if($(this).attr("href") == "javascript:void(0)"){

                    }else{
                        var speed = 400;
                        headHeight = $('header').height();
                        var href= $(this).attr("href");
                        var target = $(href == "#" || href == "" ? 'html' : href);
                        var position = target.offset().top - headHeight -25;
                        $("html, body").animate({scrollTop:position}, speed, "swing");
                        return false;
                    }
                  });
            }

	/*************************************************************************
	 *
	 * cssアニメーション処理
	 *
	 * .moveElemクラスに対して animated tadaを5秒間隔で削除と付与を繰り返す
	 * 秒数間隔についてはsetIntervalの値を修正
	 *
	 * ※setInterval内のseTtimeoutはディレイ
	 *   これがないとうまく動作しない為削除不可
	 *
	 *************************************************************************/
	setInterval(function(){
		$('.moveElem').removeClass('animated tada');
		setTimeout(function(){
			$('.moveElem').addClass('animated tada');
		},400)
	},5000);


	/*************************************************************************
	 *
	 * パネル表示処理
	 *
	 * ウインドウの一番下から-400の位置をトリガーベースにして
	 * 表示させたい要素のoffset位置より、ベースが大きくなれば(通り越せば)
	 * 対象要素を透明度1にさせつつ、top位置を0に戻す
	 *
	 * animateは1.2秒かけて、透明度1とtopを0にさせる。
	 * cssでtop:200pxとしており、下から上がってくる感じにしています。
	 *
	 * 動作秒数(何秒かけて処理するか)じゃfadeMoveクラス内のanimate秒数を変更(ミリ秒)
	 * トリガー位置を変更する場合は、scTopに代入している式内、最後の調整値を
	 * 直接修正(単位:px)
	 *
	 *************************************************************************/
	/*var scTop = 0,
			box1Elem = $('#box01'),
			box2Elem = $('#box02'),
			box3Elem = $('#box03'),
			box1Top = box1Elem.offset().top,
			box2Top = box2Elem.offset().top,
			box3Top = box3Elem.offset().top;

	$(window).on('scroll',function(){
		scTop = $(window).scrollTop() + $(window).outerHeight() - 400;
		if(box1Top <= scTop && box1Elem.css('opacity') <= 0)
		{
			fadeMove(box1Elem)
		}
		else if(box2Top <= scTop && box2Elem.css('opacity') <= 0)
		{
			fadeMove(box2Elem)
		}
		else if(box3Top <= scTop && box3Elem.css('opacity') <= 0)
		{
			fadeMove(box3Elem)
		}
	})*/

	//-------------------------------------------------------------------------------
	//
	// @brief 指定要素のアニメーション、opacity:1とtop:0まで指定秒数アニメーション
	//
	// @param[DomObject] elem アニメーションさせる要素
	//
	// @return false;
	//
	//-------------------------------------
	function fadeMove(elem){
		elem.animate({'opacity':1,'top':0},1200,'swing');
		return false;
	}


	var deg = 1,
			intervalObj = "";

	function createStyle()
	{
		css = document.createElement('style');
		css.media = 'screen';
		css.type = 'text/css';
		css.setAttribute('class','swingkeyFrame');

		swing = '@keyframes swing {' + [
			'0% { transform: rotate('+deg+'deg); }',
			'100% { transform: rotate(-'+deg+'deg); }'
		].join(' ') + '}';
		rules = document.createTextNode([swing].join('\n'));
		css.appendChild(rules);
		document.getElementsByTagName('head')[0].appendChild(css);
		if(deg == 0){
			$('.yellow-box').removeClass('swing');
			$('.swingkeyFrame').remove();
		}
	}

	intervalObj = setInterval(function(){
		deg = deg-0.005;
		if(deg <= 0)
		{
			deg = 0;
			createStyle();
			clearInterval(intervalObj);
		}
		createStyle();

	},100)


});


// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// 入力値の半角数字チェック
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
var _return_value = "";
var _return_value2 = "";
var _return_value3 = "";
var _return_value4 = "";
var _return_value5 = "";
var _return_value6 = "";
var _return_value7 = "";
var _return_value8 = "";

//zip01
function check_numtype(obj){

    var txt_obj = $(obj).val();
    var text_length = txt_obj.length;

    if(txt_obj.match(/^[0-9]+$/)){
        if(text_length > 9){
            $('input[name="zip01"]').val(_return_value);
        }else{
            _return_value = txt_obj;
        }
    }else{
        if(text_length == 0){
            $('input[name="zip01"]').val("");
            _return_value = "";
        }else{
            $('input[name="zip01"]').val(_return_value);
        }
    }
}

//zip02
function check_numtype2(obj2){
    var txt_obj2 = $(obj2).val();
    var text_length2 = txt_obj2.length;

    if(txt_obj2.match(/^[0-9]+$/)){
        if(text_length2 > 9){
            $('input[name="zip02"]').val(_return_value2);
        }else{
            _return_value2 = txt_obj2;
        }
    }else{
        if(text_length2 == 0){
            $('input[name="zip02"]').val("");
            _return_value2 = "";
        }else{
            $('input[name="zip02"]').val(_return_value2);
        }
    }
}

//zip03
function check_numtype3(obj3){
    var txt_obj3 = $(obj3).val();
    var text_length3 = txt_obj3.length;

    if(txt_obj3.match(/^[0-9]+$/)){
        if(text_length3 > 9){
            $('input[name="zip03"]').val(_return_value3);
        }else{
            _return_value3 = txt_obj3;
        }
    }else{
        if(text_length3 == 0){
            $('input[name="zip03"]').val("");
            _return_value3 = "";
        }else{
            $('input[name="zip03"]').val(_return_value3);
        }
    }
}

//zip04
function check_numtype4(obj4){
    var txt_obj4 = $(obj4).val();
    var text_length4 = txt_obj4.length;

    if(txt_obj4.match(/^[0-9]+$/)){
        if(text_length4 > 9){
            $('input[name="zip04"]').val(_return_value4);
        }else{
            _return_value4 = txt_obj4;
        }
    }else{
        if(text_length4 == 0){
            $('input[name="zip04"]').val("");
            _return_value4 = "";
        }else{
            $('input[name="zip04"]').val(_return_value4);
        }
    }
}

//zip05
function check_numtype5(obj5){
    var txt_obj5 = $(obj5).val();
    var text_length5 = txt_obj5.length;

    if(txt_obj5.match(/^[0-9]+$/)){
        if(text_length5 > 9){
            $('input[name="zip05"]').val(_return_value5);
        }else{
            _return_value5 = txt_obj5;
        }
    }else{
        if(text_length5 == 0){
            $('input[name="zip05"]').val("");
            _return_value5 = "";
        }else{
            $('input[name="zip05"]').val(_return_value5);
        }
    }
}

//zip06
function check_numtype6(obj6){
    var txt_obj6 = $(obj6).val();
    var text_length6 = txt_obj6.length;

    if(txt_obj6.match(/^[0-9]+$/)){
        if(text_length6 > 9){
            $('input[name="zip06"]').val(_return_value6);
        }else{
            _return_value6 = txt_obj6;
        }
    }else{
        if(text_length6 == 0){
            $('input[name="zip06"]').val("");
            _return_value6 = "";
        }else{
            $('input[name="zip06"]').val(_return_value6);
        }
    }
}

//zip07
function check_numtype7(obj7){
    var txt_obj7 = $(obj7).val();
    var text_length7 = txt_obj7.length;

    if(txt_obj7.match(/^[0-9]+$/)){
        if(text_length7 > 9){
            $('input[name="zip07"]').val(_return_value7);
        }else{
            _return_value7 = txt_obj7;
        }
    }else{
        if(text_length7 == 0){
            $('input[name="zip07"]').val("");
            _return_value7 = "";
        }else{
            $('input[name="zip07"]').val(_return_value7);
        }
    }
}

//zip08
function check_numtype8(obj8){
    var txt_obj8 = $(obj8).val();
    var text_length8 = txt_obj8.length;

    if(txt_obj8.match(/^[0-9]+$/)){
        if(text_length8 > 9){
            $('input[name="zip08"]').val(_return_value8);
        }else{
            _return_value8 = txt_obj8;
        }
    }else{
        if(text_length8 == 0){
            $('input[name="zip08"]').val("");
            _return_value8 = "";
        }else{
            $('input[name="zip08"]').val(_return_value8);
        }
    }
}


//zip check
//function check() {
	//txt = document.applicationForm.zip01.value;
	//data = txt.match(/^＼d{3}-＼d{4}$|^＼d{3}-＼d{2}$|^＼d{3}$/);
	//if(!data) alert("郵便番号が不正です");
//}



// -----------------------------------------------------------
// form
// -----------------------------------------------------------
//$('.submit').attr("disabled","disabled");
//$('.submit02').attr("disabled","disabled");

/*
$('#checkbox').click(function(){

  if($(this).prop('checked') == false){
    $('#submit').attr("disabled","disabled");
  }
  else {
    $('#submit').removeAttr('disabled');
  }
});
*/


function myCheck(){
	//alert("myCheck click");
    var flag = false; // 選択されているか否かを判定するフラグ

   //　ラジオボタンの数だけ判定を繰り返す（ボタンを表すインプットタグがあるので１引く）
    for(var i=0; i<document.applicationForm.select.length-1;i++){

        // i番目のラジオボタンがチェックされているかを判定
        if(document.applicationForm.select[i].checked){
            flag = true;
            alert(document.applicationForm.select[i].value + "が選択されました。");
        }
    }

    // 何も選択されていない場合の処理
    //if(!flag){
        //alert("項目が選択されていません。");
        //return false;
    //}

		if(document.applicationForm.zip01.value == "" || document.form1.zip02.value == "" || !flag){
      alert("必須項目を入力して下さい。");
      $('.submit').attr("disabled","disabled");
			return false;
    }else{
	    $('.submit').removeAttr('disabled');
			return true;
    }


}



//追従（SP表示のみ）
$(window).scroll(function(){
var st = $(window).scrollTop();
if(st > 100){
	$("#tax_info").removeClass("bottom0");

	$("header .cv-area").addClass("display");
	$("header .logo-area").addClass("none");

	$("header .cv-area").removeClass("none");
	$("header .logo-area").removeClass("display");


	//header 非表示
	$("header").addClass("none");
	$("header").removeClass("display");


	setTimeout(function(){

		//top
		$("#tax_info_top").addClass("top");

		//bottom
		$("#tax_info").addClass("bottom");
		$(".btn_cv_footer").addClass("display_bottom");


	},400);



}else{


	$("header .cv-area").addClass("none");
	$("header .logo-area").addClass("display");

	$("header .cv-area").removeClass("display");
	$("header .logo-area").removeClass("none");


	//header 表示
	$("header").addClass("display");
	$("header").removeClass("none");

	setTimeout(function(){

		//top
		$("#tax_info_top").removeClass("top");

		//bottom
		$("#tax_info").removeClass("bottom");
		$(".btn_cv_footer").removeClass("display_bottom");

	},400);

}
});



//きらりんボタン
//setTimeout('appealBlight()', 1000);
setInterval( function() {appealBlight();}, 5000 );
function appealBlight() {
    $('.blight1').animate({
        backgroundPositionX: '500px',
    }, {
        duration: 500,
        easing: 'swing',
        complete: function() {
            $('.blight').css('background-position-x', '-200px');
            setTimeout('appealBlight()', 5000);
        },
    });

    $('.blight2').animate({
        backgroundPositionX: '700px',
    }, {
        duration: 800,
        easing: 'swing',
        complete: function() {
            $('.blight2').css('background-position-x', '-300px');
        },
    });

    $('.blight3').animate({
        backgroundPositionX: '500px',
    }, {
        duration: 500,
        easing: 'swing',
        complete: function() {
            $('.blight3').css('background-position-x', '-200px');
        },
    });

    $('.blight4').animate({
        backgroundPositionX: '500px',
    }, {
        duration: 500,
        easing: 'swing',
        complete: function() {
            $('.blight4').css('background-position-x', '-200px');
        },
    });
}
})(jQuery151);
