//********  有用処理・汎用処理　 ********

/*
*　paramsをチェックする
*/
function isValidParams(params) {

    if (params.editLunch != null &&
        params.editStart != null &&
        params.eventName != null &&
        params.editEnd != null &&
        params.viewYearAndMonth != null &&
        params.editDay != null &&
        params.lineId != null &&
        params.user_email != null &&
        params.worktype &&
        params.editEnd != null &&
        params.editStart != null
    ) {
        return true;
    }
    return false;
}

/*
* 勤怠時間のスタートと終わりの『差』をミリビョウで返す
* @return ミリ秒を返す（diff）
* @month_and_year 201804 → 注意
* @day 01
* @startTime 09:00
* @endTime 17:00
*/
function getDiffTimeToMillisecond(month_and_year, day, startTime, endTime) {
    var params = doYearSplit(month_and_year);
    var startDay = new Date(params.year + '/' + params.month + '/' + day + ' ' + startTime);
    var endDay = new Date(params.year + '/' + params.month + '/' + day + ' ' + endTime);
    var diff = endDay.getTime() - startDay.getTime();
    return diff;
}

/*
* 実働を計算する
* @return 実働(8時間30分)
* @month_and_year 201804 → 注意
* @day 01
* @startTime 09:00
* @endTime 17:00
*/
function dayWorkingTime(month_and_year, day, startTime, endTime){
    var params = doYearSplit(month_and_year);
    var startDay = new Date(params.year + '/' + params.month + '/' + day + ' ' + startTime);
    var endDay = new Date(params.year + '/' + params.month + '/' + day + ' ' + endTime);
    var diff = endDay.getTime() - startDay.getTime();
    return changeViewTimeANDMinutes(diff);
}

/*
* 1日の残業時間を調べる
* @return 0 残業がない場合
* @return ミリビョウ 残業がある場合
*/
function dayOverWorkingTime(day_preset_working_time, day_total_working_time){

}

/*
* ミリ秒を時間に変換するメソッド
* 引数はミリ秒で持たせること！
* @diff ミリ秒
* @return 08時30分
*/
function changeViewTimeANDMinutes(diff) {
    var h = String(Math.floor(diff / 3600000))
    var m = String(Math.floor((diff - h * 3600000) / 60000))
    return h + "時間" + m + "分";
}

/*
* ミリビョウを少数点で表示させるメソッド
* 引数はミリ秒で持たせること！
* @diff ミリ秒
* @return 8.5
*/
function changeDecimalPointTime(diff) {

    if(diff==0){
        return 0;
    }
    var h = String(Math.floor(diff / 3600000))
    // var m = String(Math.round(((diff - h * 3600000) / 276000)))
    var m = String(Math.floor((diff - h * 3600000) / 60000));
    m = m / 60;
    m = Math.round(m * 100) / 100;
    if (m<=0){
        total = parseFloat(h + ".00");
        total = Math.round(total * 100) / 100;
        return total;
    }
    total = parseFloat(h + ".00") + parseFloat(m);
    total = Math.round(total * 100) / 100;
    return total;
}

/*
* ミリ秒を時間に変換するメソッド
* 引数はミリ秒で持たせること！
* @diff ミリ秒
* @return 08:30
*/
function changeViewWorkingTime(diff) {
    var h = String(Math.floor(diff / 3600000) + 100).substring(1);
    var m = String(Math.floor((diff - h * 3600000) / 60000) + 100).substring(1);
    return h + ":" + m;
}

/*
* 時間をミリ秒にして変換する
* Time 0100
* return 3600000
*/
function timeChangeMillisecond(Time) {
    var milliSecond = 3600000;
    var hour = 0;
    var minutes;
    if (Time.length == 4) {
        hour = parseFloat(Time.slice(0, 2));
        minutes = parseFloat(Time.slice(2, 4));
        minutes += hour * 60;
        milliSecond = minutes * 60000;
        return milliSecond;
    } else if (Time.length == 3) {
        hour = parseFloat(Time.slice(0, 1));
        minutes = parseFloat(Time.slice(1, 3));
        minutes += hour * 60;
        milliSecond = minutes * 60000;
        return milliSecond;
    } else if (Time.length == 2 || Time.length == 1) {
        var minutes;
        minutes += parseFloat(Time * 60);
        milliSecond = minutes * 60000;
        return milliSecond;
    } else {
        return milliSecond;
    }
}

/*
* 時間をミリビョウに変換して、2つの時間を比較する
* @startTime 0900
* @endTime 1730
* return true or false
*/
function millTimeCompare(startTime, endTime) {

    if (!(stringNotEnpty(startTime)) && !(stringNotEnpty(endTime))){
        return false;
    }

    var startMillTime = timeChangeMillisecond(startTime);
    var endMillTime = timeChangeMillisecond(endTime);    

    if (startMillTime < endMillTime) {
        return true;
    } else {
        return false;
    }
}


/*
* ”201711”の文字列を2017,11に分割するメソッド
* @month_and_year 201711 
* @return params[0] 2017
* @return params[1] 11
*/
function doYearSplit(month_and_year) {
    params = {};
    params.year = month_and_year.slice(0, 4);
    params.month = month_and_year.slice(4, 6);
    return params;
}

/*
*Dateライブラリで取得した日付を二桁にして変換するメソッド
* @day 1
* @return 01 
*/
function changeViewDoubleDigit(day) {
    var strDay = day.toString();
    if (strDay.length == 1) {
        day = "0" + day;
    }
    return day;
}

/*
*時間入力が正しいかチェックする（OK：true、NG：false）
*/
function checkHour(hour) {
    if (!$.isNumeric(hour)) {
        return false;
    }
    if (0 <= hour && hour <= 24) {
        return true;
    }
    return false;
}

/*
*分が正しいかチェックする（OK：true、NG：false）
*/
function checkMinutes(minutes) {
    if (!$.isNumeric(minutes)) {
        return false;
    }
    if (0 <= minutes && minutes <= 60) {
        return true;
    }
    return false;
}

/*
* WORKING_HOURSテーブルから取得した時間をに":"を追加して返す
* @hour 0100
* @return 01:00
*/
function changeViewingHour(hour) {
    if (hour == null) {
        return;
    }

    var hour = hour.toString();
    if (hour.length == 4) {
        var shortTime = hour.slice(0, 2);
        var longTime = hour.slice(2, 4);
        hour = shortTime + ":" + longTime;
    } else if (hour.length == 3) {
        //100
        hour = "0" + hour;
        var shortTime = hour.slice(0, 2);
        var longTime = hour.slice(2, 4);
        hour = shortTime + ":" + longTime;
    } else if (hour.length == 2) {

    } else if (hour.length == 1) {
        //0
        hour = "000" + hour;
        var shortTime = hour.slice(0, 2);
        var longTime = hour.slice(2, 4);
        hour = shortTime + ":" + longTime;
    }
    return hour;
}

/*
*画面に表示されている時間8時間30分を 08:30に変換する
* @worktime 8時間30分
* @return 08:30
*/
function changeExcelFormatTime(workTime) {

    var workHourTime = workTime.substring(0, workTime.indexOf('時間'));
    workHourTime = changeViewDoubleDigit(workHourTime);

    var workMinutesTime = workTime.substring(workTime.indexOf('間') + 1, workTime.indexOf('分'));
    workMinutesTime = changeViewDoubleDigit(workMinutesTime);

    var changeWorkTime = workHourTime + workMinutesTime;
    changeWorkTime = changeViewingHour(changeWorkTime);
    return changeWorkTime;
}

/*
* 入力されたフォーマット「01:00」から':'をsubstringして'0100'のフォーマットに変換する
*/
function changeSplitViewHours(viewTime) {
    var insertTime = viewTime.replace(":", "");
    return insertTime;
}

/*
* 入力値がnull or 空文字かどうかを調査する
* @value 文字列
* @return true → null&&空文字でない
* @return false → null若しくは空文字
*/
function stringNotEnpty(value) {
    if (value != null && value != '') {
        return true;
    } else {
        return false;
    }
}

/*
* 入力値AとBどちらが大きいかをTrue or Falseで返却する
* @A 比較したい値(小さいとされる値)
* @B 比較したい値(大きいとされる値)
* @return true → Bの方が大きい
* @return false → Aが大きい
*/
function compareAandB(A,B){
    if (!(stringNotEnpty(A) && stringNotEnpty(B))){
        return false;
    }

    if (!(isFinite(A) && isFinite(B))){
        return false;
    }

    parseInt(A)
    if (parseInt(A) >= parseInt(B)){
        return false
    }else{
        return true;
    }
}

/*
* 文字列を二桁に分割する
* @data 0900
* @return params[0] 09
* @return params[1] 00
*/
function substringHourAndMinutes(data){
    params = {};
    params.hour = data.slice(0, 2);
    params.minutes = data.slice(2, 4);
    return params;
}

//******** UI ********

/*
* アイコンのラベルを表示する
* @workingType 
* @workingTypeのラベルを表示させる
*/
function addWorkType(workType,sex){
    // ラベルを変更
    if (workType == "アルバイト") {
        $('#user_work_type').attr('class', 'ui teal ribbon label');
    } else if (workType == "正社員") {
        $('#user_work_type').attr('class', 'ui blue ribbon label');
    } else if (workType == "契約社員") {
        $('#user_work_type').attr('class', 'ui orange ribbon label');
    } else if (workType == "管理者") {
        $('#user_work_type').attr('class', 'ui red ribbon label');
    }
    $('#user_work_type').html(workType);

    // 写真変更
    // 性別
    if (sex == "女性") {
        $('#sex_imag').attr('src', '../assets/images/avatar/helen.jpg');
    } else {
        $('#sex_imag').attr('src', '../assets/images/avatar/tom.jpg');
    }
}

/*
* 出勤区分を返す
* @workingType 
* @出勤,休み,有給
*/
function convertFlagToWorkType(Yukyu_flag, Yasumi_flag, holiday_flag){
    if (Yukyu_flag == 1){
        return "有給";
    } else if (Yasumi_flag == 1){
        return "休み";
    } else if (holiday_flag == 1){
        return "祝日";
    }else{
        return "出勤";
    }
}