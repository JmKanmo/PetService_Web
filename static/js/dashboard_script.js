
var info_value =  null; //클릭동물 정보저장 변수

//특정버튼 클릭시 호출되는 클릭이벤트함수작성 
$(document).ready(function(){
    $("#profile1").click(function(){
        info_value = info_arr[0];
    });
    $("#profile2").click(function(){
        info_value = info_arr[1];
    });
     $("#profile3").click(function(){
        info_value = info_arr[2];
    });
     $("#profile4").click(function(){
        info_value = info_arr[3];
    });
     $("#profile5").click(function(){
        info_value = info_arr[4];
    });
     $("#profile6").click(function(){
        info_value = info_arr[5];
    });
     $("#profile7").click(function(){
        info_value = info_arr[6];
    });
     $("#profile8").click(function(){
        info_value = info_arr[7];
    });
     $("#profile9").click(function(){
        info_value = info_arr[8];
    });
     $("#profile10").click(function(){
        info_value = info_arr[9];
    });
    $("#profile11").click(function(){
        info_value = info_arr[10];
    });
    $("#profile12").click(function(){
        info_value = info_arr[11];
    });
    $("#profile13").click(function(){
        info_value = info_arr[12];
    });
    $("#profile14").click(function(){
        info_value = info_arr[13];
    });
     $("#profile15").click(function(){
        info_value = info_arr[14];
    });
  });

// 프로필 클릭시 상세정보팝업창 호출함수
function profile_onclick(){
    var url = '/animal_info';
    var name = "유기동물동물상세정보";
    var option = "width = 500, height = 500, top = 100, left = 350, location = no";
    window.open(url,name,option);
}

// 상세정보팝업창에서 호출되는 함수(상세정보저장변수 반환)
function myfunc(){
    return info_value
}
