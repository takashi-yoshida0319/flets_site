<?php

// 設定ファイルの読み込み
require_once('category_json_conf.php');

// 日付のチェック
$currentDate = strtotime(Date('Y/m/d'));
$prevDate = strtotime(file_get_contents(CATEGORY_JSON_SAVE_PATH . 'category_date.txt'));

if(!(($currentDate - $prevDate) / (60 * 60 * 24) >= CATEGORY_JSON_UPDATE_DATE)){
	exit;
}

// 指定日数過ぎているのでjsonを作り直す
file_put_contents(CATEGORY_JSON_SAVE_PATH . 'category_date.txt', Date('Y/m/d', $currentDate));

// jsonファイルを生成する
foreach($CATEGORY_JSON_CONF as $val){
	$strJson = trim(file_get_contents(CATEGORY_JSON_UPDATE_URL . $val . CATEGORY_JSON_UPDATE_EXT));
	// 取得したjsonのチェック
	if($strJson !== '' && $strJson !== false && is_array(json_decode($strJson, true))){
		file_put_contents(CATEGORY_JSON_SAVE_PATH . 'c_' . $val . CATEGORY_JSON_UPDATE_EXT, $strJson);
	}
}

// faq_category.jsonの生成
$aryJson = array();
foreach($CATEGORY_JSON_CONF as $val){
	$strText = file_get_contents(CATEGORY_JSON_SAVE_PATH . 'c_' . $val . CATEGORY_JSON_UPDATE_EXT);
	if($strText !== '' && $strText !== false && is_array(json_decode($strText, true))){
		$aryJson[] = '"' . $val . '":' . $strText;
	}
}

// カテゴリ以外にも「最近よく見られているご質問」も作る
$strJson = trim(file_get_contents(rtrim(CATEGORY_JSON_UPDATE_URL, '/') . CATEGORY_JSON_UPDATE_EXT));
// 取得したjsonのチェック
if($strJson !== '' && $strJson !== false && is_array(json_decode($strJson, true))){
	file_put_contents(CATEGORY_JSON_SAVE_PATH . 'c_0' . CATEGORY_JSON_UPDATE_EXT, $strJson);
}

$strText = file_get_contents(CATEGORY_JSON_SAVE_PATH . 'c_0' . CATEGORY_JSON_UPDATE_EXT);
if($strText !== '' && $strText !== false && is_array(json_decode($strText, true))){
	$aryJson[] = '"0":' . $strText;
}

file_put_contents(CATEGORY_JSON_FILE_PATH, '{' . implode(',', $aryJson) . '}');

