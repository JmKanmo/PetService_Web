// 동물의 상세정보를 마크업태그에 삽입.

function parse(str) {
    var y = str.substr(0, 4);
    var m = str.substr(4, 2);
    var d = str.substr(6, 2);
    return y + "-" + m + "-" + d;
}

document.getElementById("noticeNo").innerHTML = animal_info['noticeNo'];
document.getElementById("notice_date").innerHTML = parse(animal_info['noticeSdt']) + " ~ " + parse(animal_info['noticeEdt']);
document.getElementById("happenDt").innerHTML = parse(animal_info['happenDt']);
document.getElementById("happenPlace").innerHTML = animal_info['happenPlace'];
document.getElementById("careNm").innerHTML = animal_info['careNm'];
document.getElementById("careTel").innerHTML = animal_info['careTel'];
document.getElementById("careAddr").innerHTML = animal_info['careAddr'];
document.getElementById("orgNm").innerHTML = animal_info['orgNm'];
document.getElementById("chargeNm").innerHTML = animal_info['chargeNm'];
document.getElementById("officetel").innerHTML = animal_info['officetel'];





