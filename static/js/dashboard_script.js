
var info_value = null; //클릭동물 정보저장 변수

//특정버튼 클릭시 호출되는 클릭이벤트함수작성 
$(document).ready(function () {
    $("#profile1").click(function () {
        info_value = info_arr[0];
    });
    $("#profile2").click(function () {
        info_value = info_arr[1];
    });
    $("#profile3").click(function () {
        info_value = info_arr[2];
    });
    $("#profile4").click(function () {
        info_value = info_arr[3];
    });
    $("#profile5").click(function () {
        info_value = info_arr[4];
    });
    $("#profile6").click(function () {
        info_value = info_arr[5];
    });
    $("#profile7").click(function () {
        info_value = info_arr[6];
    });
    $("#profile8").click(function () {
        info_value = info_arr[7];
    });
    $("#profile9").click(function () {
        info_value = info_arr[8];
    });
    $("#profile10").click(function () {
        info_value = info_arr[9];
    });
    $("#profile11").click(function () {
        info_value = info_arr[10];
    });
    $("#profile12").click(function () {
        info_value = info_arr[11];
    });
    $("#profile13").click(function () {
        info_value = info_arr[12];
    });
    $("#profile14").click(function () {
        info_value = info_arr[13];
    });
    $("#profile15").click(function () {
        info_value = info_arr[14];
    });
});

// 프로필 클릭시 상세정보팝업창 호출함수
function profile_onclick() {
    var url = '/bp/animal_info';
    var name = "유기동물동물상세정보";
    var option = "width = 500, height = 500, top = 100, left = 350, location = no";
    window.open(url, name, option);
}

// 상세정보팝업창에서 호출되는 함수(상세정보저장변수 반환)
function animal_func() {
    return info_value
}

var cat1_num = new Array(6110000, 6260000, 6270000, 6280000, 6290000, 6300000, 6310000, 6410000, 6420000);
var cat1_name = new Array('서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '경기도', '강원도');

var cat2_num = new Array();
var cat2_name = new Array();

cat2_num[6110000] = new Array(3220000, 3240000, 3080000, 3150000, 6119998, 3200000, 3040000, 3160000, 3170000, 3100000, 3090000, 3050000, 3190000, 3130000, 3120000, 3210000, 3030000, 3070000, 3230000, 3140000, 3180000, 3020000, 3110000, 3000000, 3010000, 3060000);
cat2_name[6110000] = new Array('강남구', '강동구', '강북구', '강서구', '개별사업', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구');

cat2_num[6260000] = new Array(3360000, 3350000, 3400000, 3310000, 3270000, 3300000, 3290000, 3320000, 3390000, 3340000, 3260000, 3380000, 3370000, 3280000, 3250000, 9990099, 3330000);
cat2_name[6260000] = new Array('강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '테스트시', '해운대구');

cat2_num[6270000] = new Array(3440000, 3470000, 3480000, 3420000, 3450000, 3430000, 3460000, 3410000);
cat2_name[6270000] = new Array('남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구');

cat2_num[6280000] = new Array(3570000, 3550000, 3530000, 3500000, 3510500, 3540000, 3560000, 3520000, 3580000, 3490000);
cat2_name[6280000] = new Array('강화군', '계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구', '옹진군', '중구');

cat2_num[6290000] = new Array(3630000, 3610000, 3590000, 3620000, 3600000);
cat2_name[6290000] = new Array('광산구', '남구', '동구', '북구', '서구');

cat2_num[6300000] = new Array(3680000, 3640000, 3660000, 3670000, 3650000);
cat2_name[6300000] = new Array('대덕구', '동구', '서구', '유성구', '중구');

cat2_num[6310000] = new Array(3700000, 3710000, 3720000, 3730000, 3690000);
cat2_name[6310000] = new Array('남구', '동구', '북구', '울주군', '중구');

cat2_num[6410000] = new Array(4160000, 3940000, 3970000, 3900000, 5540000, 3980000, 4020000, 4090000, 3990000, 3920000, 3860000, 3780000, 3740000, 4010000, 3930000, 4080000, 3830000, 5590000, 4170000, 5700000, 4140000, 4000000, 4050000, 5630000, 4030000, 3820000, 4070000, 4060000, 3910000, 5600000, 4040000, 5530000);
cat2_name[6410000] = new Array('가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '양평군', '여주시', '연천군', '오산시', '용인시', '용인시 기흥구', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시');

cat2_num[6420000] = new Array(4200000, 4340000, 4210000, 4240000, 4230000, 4320000, 4350000, 4270000, 4190000, 4330000, 4290000, 4300000, 4180000, 4220000, 4280000, 4250000, 4310000, 4260000);
cat2_name[6420000] = new Array('강릉시', '고성군', '동해시', '삼척시', '속초시', '양구군', '양양군', '영월군', '원주시', '인제군', '정선군', '철원군', '춘천시', '태백시', '평창군', '홍천군', '화천군', '횡성군');


function find_sido(key, sel) {

    if (key == '') return;

    var name = cat2_name[key];
    var val = cat2_num[key];

    for (i = sel.length - 1; i >= 0; i--)
        sel.options[i] = null;

    sel.options[0] = new Option('-선택-', '', '', 'true');

    for (i = 0; i < name.length; i++) {
        sel.options[i + 1] = new Option(name[i], val[i]);
    }
}
