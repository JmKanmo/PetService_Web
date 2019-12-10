
// 동물의 상세정보를 마크업태그에 삽입.
function parse(str) {
    var y = str.substr(0, 4);
    var m = str.substr(4, 2);
    var d = str.substr(6, 2);
    return y + "-" + m + "-" + d;
}

//보호소좌표값데이터 요청
function get_location() {
    var ret = null;

    $.ajax({
        url: '/location',
        contentType: 'application/json',
        method: 'POST',
        data: JSON.stringify({
            address: animal_info['careAddr']
        }),
        async: false,
        error: function (res) {
            alert('탐색실패');
        }, success: (function (res) { ret = res; })
    });
    return ret;
}

//지도홈페이지로 보호소좌표값json데이터를 전송
function marker_function() {
    json_data = get_location();
    json_data['shelter_name'] = animal_info['careNm'];
    json_data['shelter_tel'] = animal_info['careTel'];
    json_data['offer'] = animal_info['chargeNm'];
    json_data['offer_tel'] = animal_info['officetel'];
    json_data['type'] = 'Animal';
    window.opener.postMessage(json_data, "http://127.0.0.1:5000/bp/maps");
}

document.getElementById("noticeNo").innerHTML = animal_info['noticeNo'];
document.getElementById("notice_date").innerHTML = parse(animal_info['noticeSdt']) + " ~ " + parse(animal_info['noticeEdt']);
document.getElementById("happenDt").innerHTML = parse(animal_info['happenDt']);
document.getElementById("happenPlace").innerHTML = animal_info['happenPlace'];
document.getElementById("careNm").innerHTML = animal_info['careNm'];
$("#careNm").attr("href", "https://www.google.com/search?q=" + animal_info['careNm']);
document.getElementById("careTel").innerHTML = animal_info['careTel'];
document.getElementById("careAddr").innerHTML = animal_info['careAddr'];
document.getElementById("orgNm").innerHTML = animal_info['orgNm'];
document.getElementById("chargeNm").innerHTML = animal_info['chargeNm'];
document.getElementById("officetel").innerHTML = animal_info['officetel'];





