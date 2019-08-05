(function() {
  'use strict';

  // ** TODO - firestoreに接続してデータを取得する処理

  // ** 送信ボタンを押す処理
  $('#submit').on('click', function() {
    var name = $('#name').val();
    var tweet = $('#tweet').val();

    console.log(name);
    console.log(tweet);

    // ** TODO - 変数nameと変数hogeをfirestoreにデータを登録する処理
  });

  const checkTweet = function(tweet) {
    // ** TODO - 一言のチェックをする関数
  };

  $('#tweet').on('change keyup', function() {
    // ** TODO - フォームに何か入力があったときに、残りの文字数を表示する処理
    console.log('一言に何か呟かれています');
  });
})();
