jQuery(function($) {
	
    // 追加するHTMLコード
    const htmlToAdd = `
		<div class="c-panel pt15 pr15 pb15 pl15 _sp_pt15 _sp_pr15 _sp_pb15 _sp_pl15 mt40 _sp_mt30">
			<p class="c-note"><span class="change-text"></span>はイメージです。「サービス提供中」として表示されているエリアにおいても、全ての住所でのサービス提供を保証するものではございません。設備の都合上しばらくお待ちいただく場合や、ご利用できない場合がございますので、あらかじめご了承ください。</p>
		</div>
		<p class="annotation mt20 _sp_mt20 txt--small">
			<span>インターネットのご利用には、本サービスに対応したプロバイダーとのご契約・ご利用料金が必要です。</span>
		</p>
		`;
	
	const htmlToInsert = `
		<h5 class="_lv4">市区町村名</h5>
			<h6 class="_lv6 mt30 _sp_mt30 mb10 _sp_mb10 bold">フレッツ 光ネクスト提供エリア</h6>
	`;

    // jQueryを使用して、すべてのdiv.col > p.c-txtの直後にHTMLを追加
    $('div.c-grid.col2').each(function() {
		$('div.c-col:eq(1)' , this).append(htmlToAdd);
		$('div.c-col:eq(1)' , this).prepend(htmlToInsert);
	});
	
	// ページのURLのハッシュを取得
   const hash = window.location.hash;

    // ハッシュが存在し、対応する要素がある場合
    if (hash && $(hash).length) {
        const $accordionTrigger = $(hash).find('.acTrigger');

        // activeクラスを付与してアコーディオンを開く
        if ($accordionTrigger.length) {
            // デフォルトのハッシュジャンプを防止
            history.pushState('', document.title, window.location.pathname + window.location.search);

            // アコーディオンを開く
            $accordionTrigger.addClass('active');
            $accordionTrigger.trigger('click');

            // アコーディオンが開くのを待ってからスクロール
            setTimeout(function() {
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 500); // 500msでスムーズにスクロール
            }, 100); // アコーディオンが開くのを少し待つ（時間は調整可能）
        }
    }
});