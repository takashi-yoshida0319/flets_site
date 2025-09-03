<?php
session_start();
// -----------------------------------------------------------
$lib_path = "../../"; // 階層
$mydir = basename(dirname($_SERVER['PHP_SELF']));
?>
<!DOCTYPE html>
<html lang="ja">

<head>
	<meta charset="utf-8">
	<meta name="apple-mobile-web-app-capable" content="no">
	<meta name="format-detection" content="telephone=no">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<link rel="shortcut icon" href="/cslps/favicon.ico" type="image/vnd.microsoft.icon">
	<link rel="icon" href="/cslps/favicon.ico" type="image/vnd.microsoft.icon">

	<!-- ===== metaここから ===== -->
	<title>お支払方法の変更・ご利用料金の確認｜「SMS送信サービス」お手続き・お問い合わせ｜NTT西日本公式</title>

	<link rel="apple-touch-icon" href="https://flets-w.com/apple-touch-icon.png">
	<!-- ===== metaここまで ===== -->
	<?php require_once($lib_path . 'cslps/include/head.html'); ?>

	<!-- ===== ページ独自CSS/JSここから ===== -->
	<link href="../css/modules/secondary.css" rel="stylesheet" type="text/css">
	<!-- ===== ページ独自CSS/JSここまで ===== -->

	<?php require_once($lib_path . 'assets/include/head/ga_utf8.html'); ?>
</head>

<body id="<?php echo $mydir; ?>">
	<a id="top" name="top"></a>
	<?php require_once($lib_path . 'assets/include/body/important_top_utf8.html'); ?>
	<?php require_once($lib_path . 'cslps/include/pageheader.html'); ?>

	<div class="contents">

		<main>
			<!-- ===== メインコンテンツここから ===== -->
			<section>
				<h1><span>お支払方法の変更・<br class="spOnly">ご利用料金の確認</span></h1>
				<p class="buttonStyle"><a href="https://www.ntt-west.co.jp/denwa/charge/payment/bank_list.html" target="_blank"><span>口座振替のお手続き</span></a></p>
				<p class="buttonStyle mb20"><a href="https://www.ntt-west.co.jp/denwa/charge/payment/payment.html" target="_blank"><span>クレジット支払のお手続き</span></a></p>
				<section>
					<h2 class="title">ご利用料金の確認</h2>
					<p class="buttonStyle"><a href="https://www.ntt-west.co.jp/my/pc/index.html" target="_blank"><span>「Myビリング」へログイン</span></a></p>
					<dl class="selecter">
						<dt>「Myビリング」新規登録</dt>
						<dd>
							<ul>
								<li><a href="https://www.ntt-west.co.jp/my/pc/hikari/" target="_blank"><span>フレッツ光を<br class="spOnly">ご利用の方</span></a></li>
								<li><a href="https://www.ntt-west.co.jp/my/pc/kanyu/" target="_blank"><span>加入電話を<br class="spOnly">ご利用の方</span></a></li>
							</ul>
						</dd>
					</dl>
				</section>
				<section>
					<h2 class="title">よくあるご質問</h2>
					<p class="buttonStyle"><a href="https://qa.flets-w.com/category/show/2481?site_domain=default" target="_blank"><span>お支払方法について</span></a></p>
					<p class="buttonStyle"><a href="https://qa.flets-w.com/category/show/2460?site_domain=default" target="_blank"><span>ご利用料金について</span></a></p>
				</section>

				<ul class="otherLink">
					<li><a href="./inquiry.php">解決できない場合はこちら</a></li>
				</ul>
				<p class="return"><a href="../index.php">前のページへ戻る</a></p>
			</section>
			<!-- ===== メインコンテンツここまで ===== -->
		</main>

	</div>
	<!-- /.contents -->
	<footer>

		<?php require_once($lib_path . 'cslps/include/copyright.html'); ?>
	</footer>
	<?php require_once($lib_path . 'assets/include/body/important_foot_utf8.html'); ?>

</body>

</html>
