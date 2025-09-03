!function($, w){
  var $ul = $('ul#faq_category'),
      $dl = $('dl#faq_category');
  if(!$ul.length && !$dl.length) return;
  var id = faq_category || 0;
    
  var domain = "";
  if(!(document.domain == "flets-w.com" || document.domain == "www.flets-w.com")){
    domain = "https://flets-w.com";
  }
    
  // jsonの取得
  $.ajax({
    url: domain + '/faq/api/get_category_json.php',
    data: {'category_id':id}
  }).then(function(json){
    if(!json['faqs']) return;
      
    // ulとdlでちょっと違う
    if($ul.length){
      _setFaq(json['faqs'] , $ul , "li");
    }else if($dl.length){
      _setFaq(json['faqs'] , $dl , ".faq_list_item");
    }

    // ブレイクポイントの監視
    var _mq = w.matchMedia('(max-width: 767px)');
    _mq.addListener(_check);
    _check(_mq);
  }, function(r){
    
  });
  // jsonのチェック
  $.ajax({
    url: domain +'/faq/api/check_category_json.php'
  });
    
  // FAQ記事反映
  function _setFaq(_faqs , _root , _selecter){
    var faqs = _faqs;
    var $root = _root;
    var $selecter = $root.find(_selecter + ':eq(0)');
    var count = $root.find(_selecter).remove().length - 1;

    for(var i = 0, len = faqs.length; i < len; i++){
      if(faqs[i] && faqs[i]['faq']){
        var faq = faqs[i]['faq'];
        var selecter = $selecter.clone();
        selecter.find('dt').find('.c-txt').text(faq.title);
        selecter.find('dd').find('.faq_a').html(faq.answer.replace(/src="\/qa-flets-w\//g, 'src="https://qa.flets-w.com/').replace(/href="\/qa-flets-w\//g, 'href="https://qa.flets-w.com/'));
        // HTMLタグをなくした文字数でチェック
        var answer = faq.answer.replace(/(<([^>]+)>)/gi, '');
        selecter.find('dd').find('._more-link').attr('data-length', answer.length);
        $root.append(selecter);
        if(i >= count) break;
      }
    }
  }
  // 続きを読むの出し分け
  function _check(_mq){
    var _moreLink = $('#faq_category').find('._more-link');
    // SP 70文字 PC 40文字
    var _count = _mq.matches ? 70: 40;
    for(var i = 0, len = _moreLink.length; i < len; i++){
      if($(_moreLink[i]).attr('data-length') < _count){
        $(_moreLink[i]).hide();
      }else{
        $(_moreLink[i]).show();
      }
    }
  }
}(jQuery, window);


