
//보호소좌표값데이터 요청
function get_location() {
    var ret = null;

    $.ajax({
        url: '/location',
        contentType: 'application/json',
        method: 'POST',
        data: JSON.stringify({
            address: shelter_info['orgAddr'] + shelter_info['orgAddrDtl']
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
    json_data['shelter_name'] = shelter_info['orgNm'];
    json_data['shelter_tel'] = shelter_info['tel'];
    json_data['offer'] = shelter_info['memberNm'];
    json_data['offer_tel'] = shelter_info['htel'];
    json_data['type'] = 'Shelter';
    window.opener.postMessage(json_data, "http://127.0.0.1:5000/bp/maps");
}

//보호소상세정보 표시
document.getElementById("shelter_name").innerHTML = shelter_info['orgNm'];
$("#shelter_name").attr("href", "https://www.google.com/search?q=" + shelter_info['orgNm']);
document.getElementById("shelter_addr").innerHTML = shelter_info['orgAddr'] + shelter_info['orgAddrDtl'];
document.getElementById("shelter_tel").innerHTML = shelter_info['tel'];
document.getElementById("offer").innerHTML = shelter_info['memberNm'];
document.getElementById("offer_tel").innerHTML = shelter_info['htel'];

