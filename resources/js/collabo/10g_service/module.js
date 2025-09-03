jQuery151 = jQuery.noConflict();
(function($){
  $(function(){
    //=============================
    // 注釈処理
    //=============================
    var targetPos = $(".collaboService").find(".collaboServiceH2").offset().top,
        floatingAdd = 0;
        targetElem = $("#tax_info").find(".tax_info--wrap").children("p");

    $(window).on("scroll",function(){
      s = $(window).scrollTop();
      //sb = s+$(window).outerHeight();
      sb = s+$(".collaboService").find(".collaboServiceH2").outerHeight();
      s = s / 5;
      if(sb >= targetPos){
        text = "ご利用環境などによっては大きく異なり数Mbpsに低下する場合があります。";
        targetElem.html(text);
        $("#tax_info").css("display","block");
      }else{
        text = "";
        targetElem.html(text);
        $("#tax_info").css("display","none");
      }
    });
    $(window).trigger("scroll");
    
    

    $.ajax({
        type: "GET",
        url: "/resources/js/collabo/10g_service/data.csv",
        dataType: "text",
        success: function(data) { processData(data); }
    });
    function processData(allText) {
      var allTextLines = allText.split(/\r\n|\n/);
      var lines = [];

      for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data[0] != '') { // 1列目が空でない行だけを処理
          lines.push(data);
        }
      }
      buildHtml(lines);
    }
    function buildHtml(lines) {
      var html = "";
      var panelmodal = {};

      lines = shuffleArray(lines);

      lines.forEach(function(line) {
        // CSVデータの変数化（前提として変数が定義されていると仮定）
        let dataId = line[0],
            businessName = line[1],
            businessNum = line[2],
            serviceName = line[3],
            url = line[4],
            tel = line[5],
            businessHours = line[6],
            businessDay = line[7],
            monthlyUsageFee = line[8],
            monthlyUsageFeeText1 = line[9],
            monthlyUsageFeeText2 = line[10],
            monthlyUsageFee2 = line[11],
            monthlyUsageFee2Text1 = line[12],
            monthlyUsageFee2Text2 = line[13],
            planName = line[14],
            modalTextFlg = line[15],
            cancellation_money_flg = line[16],
            cancellation_money = line[17],
            cancellation_money_text = line[18],
            application_deadline = line[19],
            opening_deadline = line[20],
            benefit_start_date = line[21],
            other_text = line[22],
            freeConstructionFee = line[23],
            monthlyUsageFeeDiscount = line[24],
            cashBack = line[25],
            otherBenefits = line[26],
            noMinimumUsagePeriod = line[27],
            logo = line[28];

        // データオブジェクトの格納
        panelmodal[dataId] = {
          "cancellation_money_flg": cancellation_money_flg,
          "cancellation_money": formatMoney(cancellation_money),
          "cancellation_money_text": formatMoney(cancellation_money_text),
          "application_deadline": application_deadline,
          "opening_deadline": opening_deadline,
          "benefit_start_date": benefit_start_date,
          "other_text": formatMoney(other_text)
        };

        // HTMLの構築
        html += '<li>';
        html += '<div class="logo lh-1 spHeightLineDestroy">' + (logo ? '<img src="/resources/img/collabo/10g_service/collabo_panel/' + logo + '" alt="">' : '<p>' + serviceName + '</p>') + '</div>';
        html += '<div class="price lh-2 spHeightLineDestroy"><dl><dt><img src="/resources/img/collabo/10g_service/ico_dt_text.svg" alt="月額料金" width="13" height="59"></dt>';
        html += '<dd>';
        if(monthlyUsageFee2 != ""){
          html += '<span class="lh-6 priceText1 spHeightLineDestroy">' + formatMoney(monthlyUsageFee2Text1) + '</span>';
          html += '<span>' + formatMoney(monthlyUsageFee2) + '</span>';
          html += '<span class="lh-7 priceText2 spHeightLineDestroy">' + formatMoney(monthlyUsageFee2Text2) + '</span>';
        }else{
          html += '<span class="lh-6 priceText1 spHeightLineDestroy">' + formatMoney(monthlyUsageFeeText1) + '</span>';
          html += '<span>' + formatMoney(monthlyUsageFee) + '</span>';
          html += '<span class="lh-7 priceText2 spHeightLineDestroy">' + formatMoney(monthlyUsageFeeText2) + '</span>';
      
        }
        html += '</dd></dl></div>';
        html += '<div class="link lh-5 spHeightLineDestroy">';
        if (modalTextFlg === '1') {
          html += '<a href="javascript:void(0)" class="popup-modal link_icn blank" data-modalid="' + dataId + '">解約金あり・適用条件あり</a>';
        } else if (modalTextFlg === '2') {
          html += '<a href="javascript:void(0)" class="popup-modal link_icn blank" data-modalid="' + dataId + '">解約金あり</a>';
        } else if (modalTextFlg === '3') {
          html += '<a href="javascript:void(0)" class="popup-modal link_icn blank" data-modalid="' + dataId + '">適用条件あり</a>';
        } else if (modalTextFlg === '4') {
          html += '<a href="javascript:void(0)" class="popup-modal link_icn blank" data-modalid="' + dataId + '">留意事項あり</a>';
        }
        html += '</div>';
        html += '<div class="plan_benefits_panel"><p class="planName lh-4 spHeightLineDestroy">' + planName + '<ul>';
        html += '<li class="plan_benefits01 ' + (freeConstructionFee !== '1' ? 'off' : '') + '"><span>回線工事費<br>無料</span></li>';
        html += '<li class="plan_benefits02 ' + (monthlyUsageFeeDiscount !== '1' ? 'off' : '') + '"><span>月額利用料<br>割引</span></li>';
        html += '<li class="plan_benefits03 ' + (cashBack !== '1' ? 'off' : '') + '"><span>キャッシュ<br>バック</span></li>';
        html += '<li class="plan_benefits05 ' + (noMinimumUsagePeriod !== '1' ? 'off' : '') + '"><span>最低利用<br>期間無し</span></li>';
        html += '<li class="plan_benefits04 ' + (otherBenefits !== '1' ? 'off' : '') + '"><span>その他特典</span></li>';
        html += '</ul></div>';
        html += '<div class="btnArea  lh-3 spHeightLineDestroy">' + (url ? '<a href="' + url + '" target="_blank" class="btn btn--secondary blank linkBtn"><div><span class="name">' + businessName + '</span><span class="text">詳しくはこちら</span></div></a>' : (tel ? '<a href="tel:' + tel + '" class="btn btn--secondary telLink"><div><span class="name">' + businessName + '</span><span class="telNum">TEL <span>' + tel + '</span></span><span class="data1">受付時間 <span>' + businessHours + '</span></span><span class="data2"><span>' + businessDay + '</span></span></div></a>' : '')) + '</div>';
        html += '</li>';
      });


      // HTMLをページに追加
      $(".panelList").html(html);
      $(window).trigger('resize');
      setCounterNum();

      $('.searchBtn').on('click', function() {
        $('.panelList > li').removeClass('hide');
        var searchId = [];
            self = "";
        $('.searchArea input[type=checkbox]:checked').each(function() {
          searchId.push($(this).data('searchid'));
        });

        $(".panelList").children("li").each(function() {
          self = $(this);
          searchId.forEach(function(id) {
            if(self.find("." + id).hasClass("off") === true){
              self.addClass('hide');
            }
          });
        });

        if($('.searchArea input[type=checkbox]:checked').length <= 0){
          $('.panelList > li').removeClass('hide');
        }
        setCounterNum();
        $(window).trigger('resize');
      });

      $('.searchClear').on('click', function() {
        $('.panelList > li').removeClass('hide');
        $('.searchArea').find("input[type=checkbox]").prop("checked", false);
        setCounterNum();
        $(window).trigger('resize');
      });


      function formatMoney(text) {
        return text.replace(/(\d+)(円)/g, function(match, number, yen) {
          return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + yen;
        });
      }
      
      function setCounterNum() {
        $(".counterNum").text($(".panelList>li:not(.hide)").length);
      }

      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }


      $(document).on("click",'.popup-modal',function(){
        var modalId = $(this).data("modalid");
        var modalData = panelmodal[modalId];

        if (modalData) {
          // cancellation_money_flg
          if (modalData["cancellation_money_flg"] === '0') {
            $(".cancellation_money_data").addClass("hide");
          } else {
            $(".cancellation_money_data").removeClass("hide");
          }

          // cancellation_money
          if (!modalData["cancellation_money"]) {
            $(".cancellation_money").addClass("hide");
          } else {
            $(".cancellation_money").removeClass("hide");
            $(".cancellation_money > span").html(modalData["cancellation_money"]);
          }

          // cancellation_money_text
          if (!modalData["cancellation_money_text"]) {
            $(".cancellation_money_text").addClass("hide");
          } else {
            $(".cancellation_money_text").removeClass("hide");
            $(".cancellation_money_text > span").html(modalData["cancellation_money_text"]);
          }

          // application_deadline
          if (!modalData["application_deadline"]) {
            $(".application_deadline").addClass("hide");
          } else {
            $(".application_deadline").removeClass("hide");
            $(".application_deadline > span").html(modalData["application_deadline"]);
          }

          // opening_deadline
          if (!modalData["opening_deadline"]) {
            $(".opening_deadline").addClass("hide");
          } else {
            $(".opening_deadline").removeClass("hide");
            $(".opening_deadline > span").html(modalData["opening_deadline"]);
          }

          // benefit_start_date
          if (!modalData["benefit_start_date"]) {
            $(".benefit_start_date").addClass("hide");
          } else {
            $(".benefit_start_date").removeClass("hide");
            $(".benefit_start_date > span").html(modalData["benefit_start_date"]);
          }

          // other_text
          if (!modalData["other_text"]) {
            $(".other_text").addClass("hide");
          } else {
            $(".other_text").removeClass("hide");
            $(".other_text > span").html(modalData["other_text"]);
          }
        }


        $.magnificPopup.open({
          type: 'inline',
          'items': {
            'src': '#note_modal'
          },
          closeOnBgClick: false,
          enableEscapeKey: false,
          callbacks: {
            open: function () {
              $(".mfp-bg").css('position', "fixed");
              $(".mfp-close-inner").on("click", function () {
                $(".mfp-close").trigger("click");
              })
            }
          }
        });

      })

    }

  })
})(jQuery151);