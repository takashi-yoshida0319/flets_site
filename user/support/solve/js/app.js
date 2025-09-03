(function($) {
  "use strict";

  var COOKIE_KEY = "data";
  /**
   * トラブル診断コンテンツ用ライブラリ
   * dependence library jQuery, Backbone Events, Page.js
   */
  var app = {

    /**
     * Routing Controller
     * イベント発行、Model,Viewの生成、Model,View操作
     */
    router: {
      /**
       * 機器ページ用 Callback Function
       * @param ctx page.js context object.
       * @param next pass control to the following matching route in sequence.
       */
      appliance: function(ctx, next) {
        var qs = ctx.querystring;
        if ($.cookie(COOKIE_KEY) && $.cookie(COOKIE_KEY).length > ctx.querystring.length)
          qs = $.cookie(COOKIE_KEY);
        var pageData = new model.Data(qs);
        var form = new view.FormView({
          ele: $('#main form'),
          model: pageData,
          choice: data.reference.appliance
        });
        var nextAnchor = new view.NextPageAnchorView({ele: $('#next'), model: pageData});
        pageData.on({'change refresh': $.proxy(nextAnchor.render, nextAnchor)});
        pageData.on({'change': $.proxy(form.renderSelectBox, form)});
        pageData.on({'refresh': $.proxy(form.render, form)});
        pageData.refresh();
      },

      /**
       * 機器ランプページ用 Callback Function
       * @param ctx page.js context object.
       * @param next pass control to the following matching route in sequence.
       */
      lamp: function(ctx, next) {
        var qs = ctx.querystring;
        if(!qs.length){
          location.href = '//' + location.host + '/user/support/solve/notconnect/error/';
          return;
        }
        if ($.cookie(COOKIE_KEY) && $.cookie(COOKIE_KEY).length > ctx.querystring.length)
          qs = $.cookie(COOKIE_KEY);
        var pageData = new model.Data(qs);
        var nextAnchor = new view.NextPageAnchorView({ele: $('#next'), model: pageData});
        var form = new view.FormLampView({
          ele: $('#main form'),
          model: pageData,
          choice: data.reference.lamp,
          result: data.result.appliance
        });
        pageData.on({'change refresh': $.proxy(nextAnchor.render, nextAnchor)});
        pageData.on({'refresh': $.proxy(form.render, form)});
        pageData.refresh();
      },

      /**
       * 機器ランプ確認ページ用 Callback Function
       * @param ctx page.js context object.
       * @param next pass control to the following matching route in sequence.
       */
      lampConfirm: function(ctx, next) {
        var qs = ctx.querystring;
        if(!qs.length){
          location.href = '//' + location.host + '/user/support/solve/notconnect/error/';
          return;
        }
        var pageData = new model.Data(ctx.querystring);
        var nextAnchor = new view.NextPageAnchorView({ele: $('#next'), model: pageData});
        var prevAnchor = new view.PrevPageAnchorView({ele: $('#prev'), model: pageData});
        var form = new view.FormConfirmView({
          ele: $('#main form'),
          model: pageData,
          choice: data.reference.lamp,
          result: data.result.appliance
        });
        pageData.on({'change refresh': $.proxy(nextAnchor.render, nextAnchor)});
        pageData.refresh();
      },

      /**
       * 完了画面ページ用 Callback Function
       * @param ctx page.js context object.
       * @param next pass control to the following matching route in sequence.
       */
      complete: function(ctx, next) {
        var pageData = new model.Data(ctx.querystring);
        var targetURL = location.pathname;
        var URLobj = appData.result.premium_page;
        $.extend(URLobj, appData.result.next_page);

        for(var key in URLobj) {
          var url = new RegExp('^' + URLobj[key].replace(/\//g, '\\/') + '(index.html)?'+ '$');
          if (url.test(targetURL) && !pageData.getQueryString()) {
            location.href = '//' + location.host + '/user/support/solve/notconnect/error/';
            return;
          }
        }

        var form = new view.CompleteView({ele: $('body'), model: pageData});
        var nextAnchor = new view.NextPageAnchorView({ele: $('#next, .nextBtn'), model: pageData});
        pageData.on('refresh', $.proxy(nextAnchor.render, nextAnchor));
        pageData.refresh();
      },

      /**
       * 問い合わせページ用 Callback Function
       * @param ctx page.js context object.
       */
      contact: function(ctx, next) {
        var pageData = new model.Data(ctx.querystring);
        var form = new view.ContactView({ele: $('body'), model: pageData});
      },

      /**
       * ○×アンケート用 Callback Function
       * @param ctx page.js context object.
       * @param next pass control to the following matching route in sequence.
       */
      enquete: function(ctx, next) {
        if (!$('.solution').length) return;
        var pageData = new model.Data(ctx.querystring);
        var enquete = new view.EnqueteView({
          ele: $('.solution'),
          model: pageData
        });
        var nextAnchor = new view.NextPageAnchorView({ele: $('.solution_next'), model: pageData});
        pageData.on('refresh', $.proxy(nextAnchor.render, nextAnchor));
        next();
      }
    },

    /**
     * データとロジック、データを扱う為のロジック&クラス(メソッド)
     */
    model: {
      /**
       * アプリ全体を通して使用するデータ専用のModelクラス
       * @param str URL parameter query string.
       * @return {Data} Data Model Object.
       * @constructor
       */
      Data: function(str) {
        /**
         * クエリーストリングから変換したデータ
         * @type {object}
         */
        this.data = {};
        /**
         * エラーID用の文字列
         * @type {string}
         */
        this.exceptionNextId = 'G16';
        /**
         * エラーID用の文字列
         * @type {string}
         */
        this.exceptionPremiumId = 'G53';
        /**
         * 初期化処理、コンストラクタでラップされている為疑似的にコンストラクタの代わりに使用する
         * Eventsを継承してモデルにイベント処理を登録出来るようにしています
         * @param str URL parameter query string.
         */
        this.initialize = function(str) {
          this.data = queryString.parse(str);
          $.extend(this.prototype, Events);
          $.extend(this, Events);
        };
        /**
         * 特定のデータを取得する為に使用する
         * @param key 取得したい添え字
         * @return {string} keyに対応する値を返す
         */
        this.get = function(key) {
          return this.data[key];
        };
        /**
         * データを変更する際に使用する
         * @param key
         * @param value
         * @param bool
         */
        this.set = function(key, value, bool) {
          if (value !== "")
            this.data[key] = value;
          else
            delete this.data[key];
          if (bool != false)
            this.trigger('change', this, key, value);
        };
        /**
         * イベントを発行する為に設置
         * @return {void} 何も返さない
         */
        this.refresh = function() {
          this.trigger('refresh', this);
        };
        /**
         * Query String からモデルに変換したデータを保持しているかどうかのチェックに使用します
         * @return {boolean} true, false を返す
         */
        this.hasModel = function() {
          return !$.isEmptyObject(this.data);
        };
        /**
         * keyをさかのぼって連結した値を返す
         * @param key 取得したい添え字
         * @return {string} 連結した値を返す
         */
        this.getConcatValue = function(key) {
          var prefix = key.slice(0, 1);
          var index = parseFloat(key.slice(1, 2));
          var string = "";

          for (var i = 1; i < index + 1; i++) {
            string += this.data[prefix + i] + '-';
          }
          string = string.replace(/-$/, '');
          if (string == 'undefined')
            return undefined;
          return string;
        };

        this.getPrefix = function() {
          var array = [];
          var arrayKeys = [];
          for (var key in this.data) {
            if (this.data.hasOwnProperty(key)) {
              if (typeof array[key.slice(0, 1)] == 'undefined') {
                arrayKeys.push(key.slice(0, 1));
                array[key.slice(0, 1)] = 1;
              }
            }
          }
          if (arrayKeys.length > 0)
            return arrayKeys;

          // return [$('form select:first-child').attr('name').slice(0, 1)];
          // add 20180430
          return [$('#main form').find('select').first().attr('name').slice(0, 1)];
        };
        /**
         *
         * @return {Array}
         */
        this.getLampResultByArray = function() {
          var lampResult = [];
          var array = [];
          var arrayKeys = [];
          var lampKey = '';

          for (var key in this.data) {
            if (this.data.hasOwnProperty(key)) {
              if (typeof array[key.slice(0, 1)] == 'undefined') {
                arrayKeys.push(key.slice(0, 1));
                array[key.slice(0, 1)] = 1;
              }
              if (typeof array[key.slice(0, 1)] == 'number'){
                array[key.slice(0, 1)]++;
              }
            }
          }
          if (arrayKeys[0] < arrayKeys[1])
            lampKey = arrayKeys[1];
          else
            lampKey = arrayKeys[0];
          var regexp = new RegExp(lampKey);
          lampResult = $.map(this.data, function(value, key) {
            if (regexp.test(key)){
              return value;
            }
          });
          return lampResult;
        };

        /**
         * @return {string}
         */
        this.getApplianceLastKey = function() {
          var prefix = this.getPrefix();
          var applianceLength = 3;
          if (this.isPremium())
            applianceLength = 3;
          else if (this.isDoubleAppliance())
            applianceLength = 5;
          else
            applianceLength = 4;
          return prefix[0] + applianceLength;
        };

        this.getDataLength = function() {
          var num = 0;
          for (var key in this.data) {
            if (this.data.hasOwnProperty(key))
              num++;
          }
          return num;
        };

        /**
         * 選択肢5番目が必要か必要ないかのチェック
         * @return {boolean}
         */
        this.isDoubleAppliance = function() {
          var prefix = this.getPrefix();
          return typeof this.get(prefix[0] + '3') !== "undefind" && this.get(prefix[0] + '3') == 3;
        };

        /**
         * プレミアムかどうかのチェック
         * @return {boolean}
         */
        this.isPremium = function() {
          var prefix = this.getPrefix();
          return typeof this.get(prefix[0] + '1') !== "undefind" && this.get(prefix[0] + '1') == 2;
        };

        /**
         * VDSLかどうかのチェック
         * @return {boolean}
         */
        this.isVDSL = function(){
          var prefix = this.getPrefix();
          var VDSL = data.result.VDSL;
          var appliance = data.result.appliance;
          var concatNum = this.getNumberFirstPrefixKey();
          var concat = this.getConcatValue(prefix[0]+concatNum);
          var resultNum = appliance[concat].number;
          return $.inArray(resultNum, VDSL) !== -1;
        };

        /**
         * イレギュラーデバイスかどうかのチェック
         * @return {boolean}
         */
        this.isIrregularDevice = function(){
          var prefix = this.getPrefix();
          var irregular_device = data.result.irregular_device;
          var appliance = data.result.appliance;
          var concatNum = this.getNumberFirstPrefixKey();
          var concat = this.getConcatValue(prefix[0]+concatNum);
          var resultNum = appliance[concat].number;
          return $.inArray(resultNum, irregular_device) !== -1;
        };

        /**
         * 現在表示しているページがランプの選択ページかどうかのチェック
         * @return {boolean}
         */
        this.isLampPage = function() {
          return /(check|confirm)\.html/.test(location.pathname);
        };

        /**
         * モデルのデータ数と、参照用データを比較して、入力漏れがないかチェックする
         * @return {boolean}
         */
        this.isValid = function() {
          var lampLength = 0;
          var name = this.getApplianceLastKey();
          var applianceLength = parseFloat(name.slice(1, 2));
          if (this.isLampPage()) {
            var idConcat = this.getConcatValue(name);
            var type = data.result.appliance[idConcat].number;
            var lamp = data.reference.lamp[type];
            $.each(lamp, function(i, item) {
              $.each(item, function() {
                lampLength++;
              });
            });
          }
          return this.getDataLength() == applianceLength + lampLength;
        };
        /**
         * 現在のデータの値をURLに追加するための文字列に変換して返す
         * @return {string} query string.
         */
        this.getQueryString = function() {
          return queryString.stringify(this.data);
        };

        /**
         * 参照用データとモデルを使用して、完了画面で使うエラーコードを作成する
         * @return {string}
         */
        this.getErrorCode = function() {
          var resultApplianceData = data.result.appliance;
          var resultLampData = data.result.lamp;

          var name = this.getApplianceLastKey();
          var idConcat = this.getConcatValue(name);
          var errorIdAppliance = resultApplianceData[idConcat].id;
          var lampType = resultApplianceData[idConcat].number;
          var resultLamp = resultLampData[lampType];
          var lampResult = this.getLampResultByArray();
          var errorIdLamp = '';

          for (var key in resultLamp) {
            if (lampResult.toString() == resultLamp[key].toString())
              errorIdLamp = key;
          }
          if (errorIdLamp == '') {
            if (this.isPremium())
              errorIdLamp=this.exceptionPremiumId;
            else
              errorIdLamp=this.exceptionNextId;
          }
          return errorIdAppliance + errorIdLamp;
        };
        /**
         * 最初のプリフィクスと同じプリフィクスのキーの数を返す関数
         * @returns {number}
         */
        this.getNumberFirstPrefixKey = function(){
          var prefix = this.getPrefix();
          var i = 0;
          for( var key in this.data){
            if(new RegExp(prefix[0]).test(key)){
              i++;
            }
          }
          return i;
        };

        this.initialize(str);
        return this;
      }
    },
    /**
     * 画面への描画処理、要素を取得して値を追加、削除、変更する処理
     */
    view: {
      /**
       * フォーム用のViewクラス
       * @param obj argv object
       * @param obj.ele jQuery Object
       * @param obj.model Data Model object
       * @param obj.choice Choice Model object
       * @return {FormView} FormView View Object
       * @constructor
       */
      FormView: function(obj) {
        /**
         * jQuery Object
         * @type {object}
         */
        this.$el = {};
        /**
         * Data Model Object
         * @type {object}
         */
        this.model = {};
        /**
         * Choice Model Object
         * @type {object}
         */
        this.choice = {};
        /**
         * Select box name attrebute
         * @type {string}
         */
        this.prefix = "c";
        /**
         * 3つ目のアコーディオンの中身
         * @type {string}
         */
        this.in_accordion = '';
        /**
         * 初期化処理、コンストラクタでラップされている為疑似的にコンストラクタの代わりに使用する
         * @param obj argv object
         * @param obj.ele jQuery Object
         * @param obj.model Data Model object
         * @param obj.choice Choice Model object
         */
        this.initialize = function(obj) {
          this.$el = obj.ele;
          this.model = obj.model;
          this.choice = obj.choice;
          this.in_accordion = $('.whitebox').eq(2).find('.type01').html();
          this.$el.find('select').bind('change', $.proxy(this.onModelChange, this));
          this.$el.find('#clear').bind('click', $.proxy(this.onModelClear, this));

          // 初期化時にランプのデータモデルがあった場合は削除
          for (var key in this.model.data) {
            if (this.model.data.hasOwnProperty(key) && key.slice(0, 1) != this.prefix)
              this.model.set(key,  '');
          }
          if ( this.$el.hasClass('isIndex') ) {
            var $target = $('#c1');
            var key = $target.attr('name');
            var value = $target.find('option:selected').val();
            var index = this.$el.find('select').index($target);

            this.model.set(key, value);
            // チェンジの発生した以降の内容を空にする
            this.$el.find('select').each($.proxy(function(i, item) {
              if (index < i) {
                $(item).val("");
                this.model.set(this.prefix + parseFloat(i + 1), "", false);
              }
            }, this));

          }
        };
        /**
         * Modelの中にdataが存在している場合は値を使いレンダリングを開始する
         * ブラウザバックで戻って来た場合などに使用する想定
         * @param model Model object
         */
        this.render = function(model) {
          if (!model.hasModel()) return;
          for (var key in model.data) {
            if (model.data.hasOwnProperty(key)) {
              this.renderSelectBox(model, key, model.get(key));
              this.$el.find('select[name="' + key + '"]').val(model.get(key));
            }
          }
        };
        /**
         * モデルに変更があった際にセレクトボックスをレンダリングする
         * @param model Model object
         * @param key selected select box
         * @param value selected select box
         */
        this.renderSelectBox = function(model, key, value) {

          // 何かをレンダリングする処理
          var lastKey = 4;
          var $select3 = $('select[name="' + this.prefix + '3"]');
          var $select4 = $('select[name="' + this.prefix + '4"]');
          var $select5 = $('select[name="' + this.prefix + '5"]');
          if (this.model.isPremium()) {
            lastKey = 3;
            var in_accordion =
                '<p class="text">' +
                'インターネット回線とパソコンの間で使用している高さ15cm程度の機器のことです。<br />' +
                '前面に小さなランプがたくさん付いています。機器はLANケーブル等でパソコンや機器と繋がっています。</p>' +
                '<p class="text">■ 機器のイメージ<br />※ご利用中の回線種別やタイプによって異なります。</p>' +
                '<p class="img_wrap">' +
                '<img src="../img/img_common_p_01.png" width="728" height="198" alt="GE-ONU+CTU VDSL+CTU VDSLモデムが白いもの  VDSL+CTU VDSLモデムが黒いもの" /></p>' +
                '<p class="closer"><span>説明を閉じる</span></p>';

            $select4.val('').parents('.whitebox').hide();
            $select5.val('').parents('.whitebox').hide();
            $('.whitebox').eq(2).find('.type01').html(in_accordion);
          } else {
            lastKey = 4;
            $select4.parents('.whitebox').show();
            $('.whitebox').eq(2).find('.type01').html(this.in_accordion);
          }

          if (this.model.isDoubleAppliance() && !this.model.isPremium()) {
            lastKey = 5;
            // $select5.parent('p').show();
            // add 20180430
            $select5.parent('div').show();
          } else {
            // $select5.val("").parent('p').hide();
            // add 20180430
            $select5.val("").parent('div').hide();
          }

          var string = typeof this.model.getConcatValue(key) != 'undefined' ? this.model.getConcatValue(key) : 1;
          var index, choice;
          index = choice = key.slice(1);
          if (parseFloat(choice) >= lastKey) return;
          index++;
          var name = this.prefix + index;
          if (this.choice[index][string] === undefined) return;
          var data = this.choice[index][string];

          var select_index = this.$el.find('select').index($('select[name="' + name + '"]'));
          this.$el.find('select').each($.proxy(function(i, item) {
            if (select_index == i && value != "") {
              var $select = $(item).html('<option value="">お選びください</option>');
              $.each(data, function(i, item) {
                $('<option>' + $.trim(item) + '</option>').attr({'value': i}).appendTo($select);
              });
            } else if (select_index < i || (select_index == i && value == "")) {
              $(item).html('<option value="">お選びください</option>');
            }
          }, this));

        };
        /**
         * フォーム内の要素の値が変更された時に実行するハンドラー
         * @param e Event Object
         */
        this.onModelChange = function(e) {
          var $target = $(e.currentTarget);
          var key = $target.attr('name');
          var value = $target.find('option:selected').val();
          var index = this.$el.find('select').index($target);

          this.model.set(key, value);
          // チェンジの発生した以降の内容を空にする
          this.$el.find('select').each($.proxy(function(i, item) {
            if (index < i) {
              $(item).val("");
              this.model.set(this.prefix + parseFloat(i + 1), "", false);
            }
          }, this));
        };
        /**
         * 表示上の選択肢をデフォルト値に戻し、選択肢に対応するModel内のデータを空にする
         * 選択肢をクリアする際に使用する
         * @param e Event Object
         */
        this.onModelClear = function(e) {
          var $target = $(e.currentTarget);
          var $form = $target.parents('form');
          var $selects = $form.find('select');
          $selects.each($.proxy(function(i, item) {
            $(item).val("");
            var key = $(item).attr('name');
            this.model.set(key, "");
          }, this));
          $.cookie(COOKIE_KEY, this.model.getQueryString(), { path: '/' });
        };

        this.initialize(obj);
        return this;
      },
      /**
       * フォーム用のViewクラス
       * @param obj argv object
       * @param obj.ele jQuery Object
       * @param obj.model Data Model object
       * @param obj.choice Choice Model object
       * @return {FormView} FormView View Object
       * @constructor
       */
      FormLampView: function(obj) {
        /**
         * jQuery Object
         * @type {object}
         */
        this.$el = {};
        /**
         * Data Model Object
         * @type {object}
         */
        this.model = {};
        /**
         * Choice Model Object
         * @type {object}
         */
        this.choice = {};
        /**
         * Select box name attrebute
         * @type {string}
         */
        this.prefix = "d";
        /**
         *
         */
        this.premiumTitle = {
          a: '回線終端装置',
          b: 'VDSLモデム'
        };
        /**
         * プレミアムの際に表示するDOM
         */
        this.premiumContents='<div class="whitebox premium u-mb03">' +
        '<div class="in_whitebox">' +
        '<p class="img_wrap"><img class="img-center" src="/user/support/solve/img/img_common_p_04.png" width="721" height="240" alt="□の機器のランプ点灯状況をお選びください GE-ONU+CTU CTU+VDSL CTU+VDSL" /></p>' +
        '</div>' +
        '</div>';

        /**
         * 初期化処理、コンストラクタでラップされている為疑似的にコンストラクタの代わりに使用する
         * @param obj argv object
         * @param obj.ele jQuery Object
         * @param obj.model Data Model object
         * @param obj.choice Choice Model object
         */
        this.initialize = function(obj) {
          this.$el = obj.ele;
          this.model = obj.model;
          this.choice = obj.choice;
          this.result = obj.result;
          var name = this.model.getApplianceLastKey();
          var idConcat = this.model.getConcatValue(name);
          this.type = this.result[idConcat].number;
          this.$el.find('select').live('change', $.proxy(this.onModelChange, this));
          this.$el.find('#clear').live('click', $.proxy(this.onModelClear, this));
          if(this.model.isIrregularDevice())
            this.irregularRender();
          if (this.model.isPremium())
            this.premiumRender();
          //if (this.model.getDataLength() <= 5)
          //  this.render();
        };
        /**
         * 画面初期化時に遷移元から引き継いだQueryStringを使って
         * 画面にレンダリングする内容を決定し、実際にレンダリングをおこなう
         * @return {void} 何も返さない
         */
        this.render = function() {
          var select = this.choice[this.type];
          $.each(select, $.proxy(function(i, item) {
            $('#checktable_0' + parseFloat(i + 1)).html();
          }, this));
          $.each(select, $.proxy(function(i, item) {
            this.renderTableRow(item, $('#checktable_0' + parseFloat(i + 1)))
          }, this));
          // ADD 20180430
          // $('.header_beige').last().text(
          //     (this.model.isVDSL()) ? this.premiumTitle.b : this.premiumTitle.a
          // );
          $('.header_beige').last().text(
              (this.model.isVDSL()) ? ('■' + this.premiumTitle.b) : ('■' + this.premiumTitle.a)
          );

          // モデルの値を使ってセレクトボックスの中身をレンダリングする
          for (var key in this.model.data) {
            if (this.model.data.hasOwnProperty(key) && key.slice(0,1) == this.prefix)
              this.$el.find('select[name="' + key + '"]').val(this.model.get(key));
          }

          this.setNormalValue(this.getNormalValue());
        };
        /**
         * 選択肢テーブルの行をレンダリングする
         * @param rows choice object
         * @param $tableObj jQuery Object
         * @return {void} 何も返さない
         */
        this.renderTableRow = function(rows, $tableObj) {
          $.each(rows, $.proxy(function(i, item) {
            var $row = $('<li/>').append('<div/>').append('<div/>');
            $row.find('div').first().text($.trim(item.name));
            $row.find('div').last().append(this.renderSelectBox(item.color, i));
            $tableObj.append($row);
          }, this));
        };

        /**
         *  プレミアム時のレンダリング処理
         */
        this.premiumRender = function() {
          $('#contents').addClass('premium_contents');
          // ADD 20180430
          // $('.header_beige').last().text(
          //     (this.model.isVDSL()) ? this.premiumTitle.b : this.premiumTitle.a
          // );
          // $('.header_beige:first-child + p').next('.blackbox').remove();
          // $('.header_beige:first-child').after(this.premiumContents);
          // $('.header_beige:first-child').remove();
          $('.header_beige').last().text(
              (this.model.isVDSL()) ? ('■' + this.premiumTitle.b) : ('■' + this.premiumTitle.a)
          );
          $('.header_beige').first().next('p').next('.blackbox').remove();
          $('.header_beige').first().after(this.premiumContents);
          $('.header_beige').first().remove();

        };

        /**
         *  イレギュラーデバイス時のレンダリング処理
         */
        this.irregularRender = function(){
          $('#contents').addClass('irregular_contents');
          // ADD 20180430
          // $('.header_beige').last().text(
          //     (this.model.isVDSL()) ? this.premiumTitle.b : this.premiumTitle.a
          // );
          // $('.header_beige:first-child + p').next('.blackbox').remove();
          // $('.header_beige:first-child').remove();
          $('.header_beige').last().text(
              (this.model.isVDSL()) ? ('■' + this.premiumTitle.b) : ('■' + this.premiumTitle.a)
          );
          $('.header_beige').first().next('p').next('.blackbox').remove();
          $('.header_beige').first().remove();
        };
        /**
         * テーブルの中にセレクトボックスをレンダリングする
         * @param colors 選択肢のObject
         * @param num 行番号
         * @return {Object} jQuery Object
         */
        this.renderSelectBox = function(colors, num) {
          var $selectBox = $('<select />').attr({'name': this.prefix + num, 'id': this.prefix + num});
          $.each(colors, function(i, item) {
            var $option = $('<option>' + $.trim(item) + '</option>').attr({'value': i});
            $selectBox.append($option);
          });
          return $selectBox;
        };

        /**
         * ランプの通常時の値をデータからもってくる
         * @returns [] 通常時に表示されているランプの状態のoptionの順番
         */
        this.getNormalValue = function(){
          var prefix = this.model.getPrefix();
          var appliance = data.result.appliance;
          var lamp = data.result.lamp;
          var concatNum = this.model.getNumberFirstPrefixKey();
          var concat = this.model.getConcatValue(prefix[0]+concatNum);
          var resultNum = appliance[concat].number;
          return lamp[resultNum].S00;
        };

        /**
         * ランプを実際に設定する
         * @param lampdata 通常時に表示されているランプの状態のoptionの順番が入っている配列
         */
        this.setNormalValue = function(lampdata){
          this.$el.find('select').each($.proxy(function(i, item){
            $(item).val(lampdata[i]);
            this.model.set( this.prefix + (i+1), lampdata[i]);
          },this));
        };

        /**
         * フォーム内の要素の値が変更された時に実行するハンドラー
         * @param e Event Object
         */
        this.onModelChange = function(e) {
          var $target = $(e.currentTarget);
          var name = $target.attr('name');
          var index = $(e.currentTarget).find('option:selected').val();
          this.model.set(name, index);
        };
        /**
         * 選択肢のクリアー
         * @param e Event Object
         */
        this.onModelClear = function(e) {
          this.setNormalValue(this.getNormalValue());
          $.cookie(COOKIE_KEY, this.model.getQueryString(), { path: '/' });
        };

        this.initialize(obj);
        return this;
      },
      /**
       * 確認フォーム用のViewクラス
       * @param obj argv object
       * @param obj.ele jQuery Object
       * @param obj.model Model object
       * @return {FormConfirmView} FormConfirmView View Object
       * @constructor
       */
      FormConfirmView: function(obj) {
        /**
         * jQuery Object
         * @type {object}
         */
        this.$el = {};
        /**
         * Model Object
         * @type {object}
         */
        this.model = {};
        /**
         * Choice Model Object
         * @type {object}
         */
        this.choice = {};
        /**
         * Select box name attrebute
         * @type {string}
         */
        this.prefix = "d";
        /**
         *
         */
        this.premiumTitle = {
          a: '回線終端装置',
          b: 'VDSLモデム'
        };
        /**
         * 初期化処理、コンストラクタでラップされている為疑似的にコンストラクタの代わりに使用する
         * @param obj argv object
         * @param obj.ele jQuery Object
         * @param obj.model Model object
         */
        this.initialize = function(obj) {
          this.$el = obj.ele;
          this.model = obj.model;
          this.choice = obj.choice;
          this.result = obj.result;
          var name = this.model.getApplianceLastKey();
          var idConcat = this.model.getConcatValue(name);
          this.type = this.result[idConcat].number;
          this.$el.find('select').live('change', $.proxy(this.onModelChange, this));
          if (this.model.isPremium()||this.model.isIrregularDevice())
            this.premiumRender();
          if (this.model.getDataLength() > 5)
            this.render();
        };
        /**
         * モデルに変更があった際に画面上にViewをレンダリングするための処理(外部的にはCallback)
         * Modelでのイベントに設定して外部から使用する、インスタンスメソッドとしては使用しない
         * インスタンスオブジェクトを使う際は$.proxy()を使用してバインドする必要がある
         */
        this.render = function() {
          var select = this.choice[this.type];
          $.each(select, $.proxy(function(i, item) {
            this.renderTableRow(item, $('#confirmTable_0' + parseFloat(i + 1)))
          }, this));
        };
        /**
         *
         */
        this.premiumRender = function() {
          $('#contents').addClass('premium_contents');
          // ADD 20180430
          // $('.header_beige:first-child').next('.blackbox').remove();
          // $('.header_beige').last().text(
          //     (this.model.isVDSL()) ? this.premiumTitle.b : this.premiumTitle.a
          // );
          // $('.header_beige:first-child').remove();
          // $('.blackbox:first-child').remove();
          $('.header_beige').first().next('.blackbox').remove();
          $('.header_beige').last().text(
              (this.model.isVDSL()) ? ('■' + this.premiumTitle.b) : ('■' + this.premiumTitle.a)
          );
          $('.header_beige').first().remove();
          // $('.blackbox:first').remove(); bug?

        };
        /**
         * 選択肢テーブルの行をレンダリングする
         * @param rows choice object
         * @param $tableObj jQuery Object
         * @return {void} 何も返さない
         */
        this.renderTableRow = function(rows, $tableObj) {
          $.each(rows, $.proxy(function(i, item) {
            var $row = $('<li/>').append('<div/>').append('<div/>');
            // ADD 2018
            // $row.find('div:first-child').text($.trim(item.name));
            // $row.find('div:last-child').append(this.renderParagraph(item.color, item.bgcolor, i));
            $row.find('div').first().text($.trim(item.name));
            $row.find('div').last().append(this.renderParagraph(item.color, item.bgcolor, i));

            $tableObj.append($row);
          }, this));
        };
        /**
         * テーブルの中にセレクトボックスをレンダリングする
         * @param color 選択肢のObject
         * @param bgcolor 選択肢のObject
         * @param num 行番号
         * @return {Object} jQuery Object
         */
        this.renderParagraph = function(color, bgcolor, num) {
          var index = this.model.get(this.prefix + num);
          // return $('<p class="light">' + color[index] + '</p>').addClass(bgcolor[index]);
          // ADD 20180430
          return $('<p class="light"><span>' + color[index] + '</span></p>').addClass(bgcolor[index]);
        };

        this.initialize(obj);
        return this;
      },
      /**
       * 完了画面用のViewクラス
       * QueryStringを使用して外部のページに値を渡す処理とエラーコードを画面上にレンダリングする処理を担当
       * @param obj argv object
       * @param obj.ele jQuery Object
       * @param obj.model Data Model object
       * @param obj.choice Choice Model object
       * @return {CompleteView} CompleteView View Object
       * @constructor
       */
      CompleteView: function(obj) {
        /**
         * jQuery Object
         * @type {object}
         */
        this.$el = {};
        /**
         * Model Object
         * @type {object}
         */
        this.model = {};
        /**
         * 初期化処理、コンストラクタでラップされている為疑似的にコンストラクタの代わりに使用する
         * @param obj argv object
         * @param obj.ele jQuery Object
         * @param obj.model Model object
         */
        this.initialize = function(obj) {
          this.$el = obj.ele;
          this.model = obj.model;
          this.model.refresh();
        };

        this.initialize(obj);
        return this;
      },
      /**
       * 次の画面に進む為のリンク又はボタンにQueryStringを追加する為のViewクラス
       * @param obj argv object
       * @param obj.ele jQuery Object
       * @param obj.model Model object
       * @return {NextPageAnchorView} NextPageAnchorView View Object
       * @constructor
       */
      NextPageAnchorView: function(obj) {
        /**
         * jQuery Object
         * @type {object}
         */
        this.$el = {};
        /**
         * Model Object
         * @type {object}
         */
        this.model = {};
        /**
         * Const
         * @type {string}
         */
        this.ERROR_MESSAGE = '選択できていない項目があります。全て選択してから次のページへお進みください。';
        /**
         * Const
         * @type {string}
         */
        this.CONTACT_URL = '/user/support/solve/notconnect/inquiry/';
        /**
         * 初期化処理、コンストラクタでラップされている為疑似的にコンストラクタの代わりに使用する
         * @param obj argv object
         * @param obj.ele jQuery Object
         * @param obj.model Model object
         */
        this.initialize = function(obj) {
          this.$el = obj.ele;
          this.model = obj.model;
          this.$el.bind('click', $.proxy(this.modelValidation, this));
          if (this.$el.hasClass('complete')) {
            this.$el.unbind('click');
            this.$el.bind('click', $.proxy(this.completeRedirect, this));
          } else if (this.$el.hasClass('contact')) {
            this.$el.unbind('click');
            this.$el.bind('click', $.proxy(this.contactRedirect, this));
          } else if (this.$el.hasClass('inForm')) {
            this.$el.unbind('click');
            this.$el.bind('click', $.proxy(this.nextRedirect, this));
          } else if (this.$el.hasClass('through')) {
            this.$el.unbind('click');
          }
        };
        /**
         * モデルに変更があった際にアンカーリンクのクエリーストリングを差し替える処理
         * モデルのイベントで使用している為$.proxyでバインドしています
         * @param model Model object
         */
        this.render = function(model) {
          var hrefs = [];
          this.$el.each(function (i) {
            hrefs[i] = ($(this).prop('tagName')=='A') ? $(this).attr('href') : $(this).attr('DATA-URL');
            if(/(.*?)\?.+/.test(hrefs[i]))
              hrefs[i] = hrefs[i].replace(/(.*?)\?.+/, '$1');
            hrefs[i] = hrefs[i] + "?" + model.getQueryString();
            ($(this).prop('tagName')=='A') ?
                $(this).attr({'href': hrefs[i] }) :
                $(this).attr({'DATA-URL': hrefs[i] });
          });
        };

        this.modelValidation = function() {
          if (!this.model.isValid()) {
            alert(this.ERROR_MESSAGE);
            return false;
          }
          $.cookie(COOKIE_KEY, this.model.getQueryString(), { path: '/' });
          return true;
        };

        this.completeRedirect = function( e ) {
          this.modelValidation();
          var errorId = this.model.getErrorCode();
          var pages = [];
          var key = '';
          // console.log(this.model.isPremium());
          // return false;
          if(this.model.isPremium()) {
            key = errorId.slice(5, 8);
            pages = data.result.premium_page;
          } else if(this.model.isIrregularDevice()){
            key = errorId.slice(5, 8);
            pages = data.result.irregular_page;
          } else {
            key = errorId.slice(5, 6);
            pages = data.result.next_page;
          }
          $.removeCookie(COOKIE_KEY, { path: '/' });
          location.href = pages[key] + '?' + this.model.getQueryString();
          return false;
        };

        this.contactRedirect = function() {
          location.href = this.CONTACT_URL + '?' + this.model.getQueryString();
          return false;
        };

        this.nextRedirect = function() {
          if(!this.modelValidation()) return false;
          location.href = this.$el.attr('DATA-URL');
          return false;
        };

        this.initialize(obj);
        return this;
      },
      /**
       * 次の画面に進む為のリンク又はボタンにQueryStringを追加する為のViewクラス
       * @param obj argv object
       * @param obj.ele jQuery Object
       * @param obj.model Model object
       * @return {NextPageAnchorView} NextPageAnchorView View Object
       * @constructor
       */
      PrevPageAnchorView: function(obj) {
        /**
         * jQuery Object
         * @type {object}
         */
        this.$el = {};
        /**
         * Model Object
         * @type {object}
         */
        this.model = {};

        /**
         * 初期化処理、コンストラクタでラップされている為疑似的にコンストラクタの代わりに使用する
         * @param obj argv object
         * @param obj.ele jQuery Object
         * @param obj.model Model object
         */
        this.initialize = function(obj) {
          this.$el = obj.ele;
          this.model = obj.model;
          this.renderPrevHref();
        };

        this.renderPrevHref = function() {
          this.$el.attr('href', this.$el.attr('href') + '?' + this.model.getQueryString() );
        };

        this.initialize(obj);
        return this;
      },
      /**
       * 殆どのページに追加するアンケート要のViewクラス
       * @param obj argv object
       * @param obj.ele jQuery Object
       * @param obj.model Model object
       * @return {EnqueteView} EnqueteView View Object
       * @constructor
       */
      EnqueteView: function(obj) {
        /**
         * jQuery Object
         * @type {object}
         */
        this.$el = {};
        /**
         * jQuery Object
         * @type {object}
         */
        this.$btn = {
          'yes': $('.app-btns > ul > li:first-child > a'),
          'no': $('.app-btns > ul > li:last-child > a')
        };
        /**
         * Model Object
         * @type {object}
         */
        this.model = {};
        /**
         * 初期化処理、コンストラクタでラップされている為疑似的にコンストラクタの代わりに使用する
         * @param obj argv object
         * @param obj.ele jQuery Object
         * @param obj.model Model object
         */
        this.initialize = function(obj) {
          this.$el = obj.ele;
          this.model = obj.model;
          this.$btn.yes.on('click', this.yesBtnHundler);
          this.$btn.no.on('click', $.proxy(this.noBtnHundler, this));
        };

        this.yesBtnHundler = function(e) {
          var $currentTarget = $(e.currentTarget);
          $currentTarget.parents('.app-btns').hide();
          $currentTarget.parents('.app-btns').siblings('.solute').slideDown();
        };

        this.noBtnHundler = function(e) {
          this.model.refresh();
          var $currentTarget = $(e.currentTarget);
          $currentTarget.parents('.app-btns').hide();
          $currentTarget.parents('.app-btns').siblings('.noSolute').slideDown();
        };

        this.initialize(obj);
        return this;
      },
      /**
       * 問い合わせページ用のViewクラス
       * @param obj
       * @returns {app}
       * @constructor
       */
      ContactView: function(obj) {
        /**
         * jQuery Object
         * @type {object}
         */
        this.$el = {};
        /**
         * Model Object
         * @type {object}
         */
        this.model = {};

        this.errorCode = '';

        this.errorTag = {
          'tag01': $('#errID01'),
          'tag02': $('#errID02')
        };

        this.$formHidden = $('#error_id');

        /**
         * 初期化処理、コンストラクタでラップされている為疑似的にコンストラクタの代わりに使用する
         * @param obj argv object
         * @param obj.ele jQuery Object
         * @param obj.model Model object
         */
        this.initialize = function(obj) {
          this.$el = obj.ele;
          this.model = obj.model;
          if (!this.model.hasModel()) return;
          this.$el.find('.caution').show();
          this.errorCode = this.model.getErrorCode();
          this.renderErrorID();
          this.renderValue();
          this.add();
        };
        /**
         * モデルに変更があった際に画面上にViewをレンダリングするための処理(外部的にはCallback)
         * Modelでのイベントに設定して外部から使用する、インスタンスメソッドとしては使用しない
         * インスタンスオブジェクトを使う際は$.proxy()を使用してバインドする必要がある
         * @param model Model object
         */
        this.renderErrorID = function() {
          var head = this.errorCode.substr(0, 5);
          var tail = this.errorCode.substr(5, 3);
          this.errorTag.tag01.html(head);
          this.errorTag.tag02.html(tail);
        };

        this.renderValue = function() {
          this.$formHidden.val(this.errorCode);
        };

        this.ajaxWrite = function(option) {
          var tmp = [];
          var orgWrite = document.write;
          $.ajax({
            url: option.url,
            dataType: 'script',
            beforeSend: function(xhr) {
              document.write = function(str) {
                tmp.push(str);
              }
            }
          }).done(function(data) {
            option.done(tmp.join(''));
            document.write = orgWrite;
          });
        };

        this.initialize(obj);
        return this;
      }
    },
    /**
     * Util Function
     */
    utils: {
      /**
       * 指定の要素に対してトグル機能を追加します
       * @param $obj jQuery Object
       * @param $target jQuery Object
       */
      toggle: function ($obj, $target) {
      },
      /**
       * Query String の分解と統合
       * ModelとViewの中で頻繁に使用します
       */
      queryString: {
        /**
         * クエリーストリングの文字列を受け取り、オブジェクトの形で返す
         * @param str url query string.
         * @return {object} query string parse object.
         */
        parse: function (str) {
          if (str == '') return {};
          var obj = {};
          var strList = str.split('&').sort(this.compare);
          for (var i = 0, max = strList.length; i < max; i++) {
            var array = strList[i].split('=');
            obj[array[0]] = array[1];
          }
          return obj;
        },
        /**
         * オブジェクトを受け取り、文字列を返す
         * @param obj query string parse object.
         * @return {string} query string.
         */
        stringify: function (obj) {
          var array = [];
          for (var key in obj) {
            if (obj.hasOwnProperty(key))
              array.push(key + '=' + obj[key]);
          }
          array.sort(this.compare);
          return array.join('&');
        },
        /**
         * 比較メソッド
         * @param a
         * @param b
         * @returns {number}
         */
        compare: function (a, b) {
          a = a.split('=')[0];
          b = b.split('=')[0];
          var a1= a.slice(0,1);
          var a2= a.slice(1);
          var b1= b.slice(0,1);
          var b2= b.slice(1);

          if (a1 > b1) {
            return 1;
          } else if (a1 < b1) {
            return -1;
          } else {
            if (parseFloat(a2) > parseFloat(b2)) {
              return 1;
            } else if( (parseFloat(a2) < parseFloat(b2))) {
              return -1;
            } else {
              return 0;
            }
          }
        }
      }
    }
  };

  // ショートカット
  // app
  var router = app.router;
  var model = app.model;
  var view = app.view;
  // utils
  var queryString = app.utils.queryString;
  var toggle = app.utils.toggle;
  // data
  var data = window.appData;

  $(function() {
    /**
     * ルーティングのルールを設定します
     * URIにルールがある場合は正規表現が使用出来ます
     * ページ毎に処理を割り振ることが出来ます
     */
    page('/user/support/solve/notconnect/check_03/(index.html)?', router.appliance);
    page('/user/support/solve/notconnect/check_03/check.html?', router.lamp);
    page('/user/support/solve/notconnect/check_03/confirm.html', router.lampConfirm);
    page('/user/support/solve/notconnect/hgw_only/(index.html)?',router.enquete, router.complete);
    page('/user/support/solve/notconnect/geonu_vdsl/(index.html)?',router.enquete, router.complete);
    page('/user/support/solve/notconnect/n_result_error_ppp/hgw/(index.html)?',router.enquete, router.complete);
    page('/user/support/solve/notconnect/n_result_error_ppp/hgw/network.html',router.enquete, router.complete);
    page('/user/support/solve/notconnect/n_result_error_ppp/hgw_bbr/(index.html)?',router.enquete, router.complete);
    page('/user/support/solve/notconnect/broadband/(index.html)?',router.enquete, router.complete);
    page('/user/support/solve/notconnect/n_result_error_ppp/(index.html)?',router.enquete, router.complete);
    page('/user/support/solve/notconnect/orange/(index.html)?',router.enquete, router.complete);
    page('/user/support/solve/notconnect/result_error/(index.html)?',router.enquete, router.complete);
    page('/user/support/solve/notconnect/result_ok/(index.html)?',router.enquete, router.complete);
    page('/user/support/solve/notconnect/inquiry/(index.html)?',router.contact);
    // premium
    page('/user/support/solve/notconnect/p_result_ok/(index.html)?',router.enquete, router.complete);
    page('/user/support/solve/notconnect/lan_check/(index.html)?',router.enquete, router.complete);
    page('/user/support/solve/notconnect/lan_check/hgw/(index.html)?',router.enquete, router.complete);
    page('/user/support/solve/notconnect/link_check/(index.html)?',router.enquete, router.complete);
    page('/user/support/solve/notconnect/ctu/(index.html)?',router.enquete, router.complete);

    page({click: false, popstate: false});
  });

})(jQuery);
