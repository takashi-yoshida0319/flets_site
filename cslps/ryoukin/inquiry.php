<?php 
session_start();
// -----------------------------------------------------------
$lib_path = "../../"; // 階層
$mydir = basename(dirname($_SERVER['PHP_SELF']));
?><!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="apple-mobile-web-app-capable" content="no">
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="shortcut icon" href="/cslps/favicon.ico" type="image/vnd.microsoft.icon">
<link rel="icon" href="/cslps/favicon.ico" type="image/vnd.microsoft.icon">

<!-- ===== metaここから ===== -->
<title>お問い合わせ｜お支払方法の変更・ご利用料金の確認｜「SMS送信サービス」お手続き・お問い合わせ｜NTT西日本公式</title>

<link rel="apple-touch-icon" href="https://flets-w.com/apple-touch-icon.png">
<!-- ===== metaここまで ===== -->
<?php require_once($lib_path . 'cslps/include/head.html'); ?>

<!-- ===== ページ独自CSS/JSここから ===== -->
<link href="../css/modules/secondary.css" rel="stylesheet" type="text/css">
<!-- ===== ページ独自CSS/JSここまで ===== -->

<?php require_once($lib_path . 'assets/include/head/ga_utf8.html'); ?>
</head>
<body id="<?php echo $mydir;?>">
<a id="top" name="top"></a>
<?php require_once($lib_path . 'assets/include/body/important_top_utf8.html'); ?>
<?php require_once($lib_path . 'cslps/include/pageheader.html'); ?>
	
<div class="contents">

<main>
<!-- ===== メインコンテンツここから ===== -->
	<section>
		<h1><span>お支払方法の変更・<br class="spOnly">ご利用料金の確認</span></h1>
		<p class="introtext">以下お問い合わせ先より、オペレーターへのご質問をお受けしております。</p>
		<div class="telButton"><a href="tel:0800-333-5550">
			<dl>
				<dt>NTTファイナンスよりご請求のお客さま</dt>
				<dd><span class="number icon0800">0800-333-5550</span><span class="tap">タップで電話がかかります</span></dd>
			</dl>	
		</a></div>
		<div class="telButton"><a href="tel:0120747488">
			<dl>
				<dt>NTT西日本よりご請求のお客さま</dt>
				<dd><span class="number">0120-747488</span><span class="tap">タップで電話がかかります</span></dd>
			</dl>	
		</a></div>
		<p class="note">
			受付時間：午前9時～午後5時<br />
			土曜・日曜・祝日も受付中（年末年始12/29～1/3を除きます）<br />
			※電話番号は、おかけ間違いのないようご注意ください。
		</p>

		<p class="return"><a href="./index.php">前のページへ戻る</a></p>
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
