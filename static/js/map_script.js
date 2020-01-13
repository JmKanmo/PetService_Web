var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(pos_x, pos_y), // 지도의 중심좌표
        level: 7 // 지도의 확대 레벨
    };

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption);
var cur_position = ""; // 현재 위치정보변수

map.setKeyboardShortcuts(true);
// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

var imageSrc = '../static/images/pointer.png', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(40, 45), // 마커이미지의 크기입니다
    imageOption = {
        offset: new kakao.maps.Point(17, 50)
    }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

var marker = new kakao.maps.Marker({
    position: markerPosition,
    // image: markerImage // 마커이미지 설정 
}),
    infowindow = new kakao.maps.InfoWindow({
        zindex: 1
    }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

var shelterMarker_json = {}; // 표시된 보호소마커 저장 json

var map_flag = false; //지도로딩체크

var shelter_info = null; //보호소 상세정보저장
var shelter_list = null; //보호소리스트정보저장
var animal_info = null;//유기동물 상세정보저장
var animal_list = null; //유기동물정보저장

// 현재위치정보를 지정된경로로 전송하는 함수(근처 유기동물,보호시설정보출력을 위함)  
function communicate_info() {
    $.ajax({
        url: '/search',
        contentType: 'application/json',
        method: 'POST',
        data: JSON.stringify({
            address: cur_position //지정한 좌표값
        }),
        error: function (res) {
            alert('탐색실패');
        }
    }).done(function (res) {
        shelter_list = res['shelter_info'];
        animal_list = res['animal_info'];
        add_shelter_list(shelter_list);
        add_animal_list(animal_list);
    });
}

// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
searchAddrFromCoords(map.getCenter(), displayCenterInfo);

// 지도를 클릭했을 때 커스텀을 표시하는 클릭핸들러
var mapClickHandler = function (mouseEvent) {
    searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var detailAddr = !!result[0].road_address ? '<div class="address">도로명주소 : ' + result[0].road_address
                .address_name + '</div>' : '';
            detailAddr += '<div class="address">지번 주소 : ' + result[0].address.address_name + '</div>';

            var full_address = String(result[0].address.address_name) + ',' + String(mouseEvent.latLng.Ga) + ',' + String(mouseEvent.latLng.Ha);
            var address_list = [String(mouseEvent.latLng.Ga) + ',', String(mouseEvent.latLng.Ha)];

            var content = '<div class="bAddr clear_fix">' +
                '<span class="title">주소정보</span>' + detailAddr
                + '<a class="infowindow_menu" href="https://map.kakao.com/link/to/' + full_address + '" target="_blank">길찾기</a>'
                + '<div class="infowindow_menu" onclick="roadView(' + address_list[0] + address_list[1] + ')">로드뷰</div>'
                + '</div>';

            // result에 클릭한 위치의 주소정보가 들어가있다. console.log(result)

            // 마커를 클릭한 위치에 표시합니다 
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker);
            panTo(mouseEvent.latLng.Ha, mouseEvent.latLng.Ga);
            searchAddrFromCoords(mouseEvent.latLng, displayCenterInfo);
        }
    });
};

//클릭한위치로 지도를 이동시키는함수
function panTo(pos_y, pos_x) {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(pos_y, pos_x);

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
}

//로드뷰를 띄우는 함수
function roadView(x, y) {
    var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
    var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
    var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
    var position = new kakao.maps.LatLng(y, x);
    document.getElementById('roadview').style.display = 'block';
    // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.    
    roadviewClient.getNearestPanoId(position, 50, function (panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
    });
}

//로드뷰를 닫는 함수
function close_click() {
    document.getElementById('roadview').style.display = 'none';
}

// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'click', mapClickHandler);
var overlay = null;
var marker_click = false

// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
// kakao.maps.event.addListener(map, 'idle', function () {
//     searchAddrFromCoords(map.getCenter(), displayCenterInfo);
// });

function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
function displayCenterInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');
        var position = "";
        infoDiv.innerHTML = result[0].address_name;
        position += result[0].address_name;
        cur_position = position;
        if (map_flag == false) {

            var detailAddr = !!result[0].road_address ? '<div class="address">도로명주소 : ' + result[0].road_address + '</div>' : '';
            detailAddr += '<div class="address">지번 주소 : ' + result[0].address_name + '</div>';

            var address_list = [String(map.getCenter()['Ga']) + ',', String(map.getCenter()['Ha'])];

            var content = '<div class="bAddr clear_fix">' +
                '<span class="title">주소정보</span>' + detailAddr
                + '<a class="infowindow_menu" href="https://map.kakao.com/link/to/' + + result[0].address_name + '" target="_blank">길찾기</a>'
                + '<div class="infowindow_menu" onclick="roadView(' + String(address_list[0]) + String(address_list[1]) + ')">로드뷰</div>'
                + '</div>';

            //마커표시
            marker.setPosition(map.getCenter());
            marker.setMap(map);
            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker);
            map_flag = true;
        }
        communicate_info();
    }
}

// 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
function setMapType(maptype) {
    var roadmapControl = document.getElementById('btnRoadmap');
    var skyviewControl = document.getElementById('btnSkyview');
    if (maptype === 'roadmap') {
        map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
        roadmapControl.className = 'selected_btn';
        skyviewControl.className = 'btn';
    } else {
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
        skyviewControl.className = 'selected_btn';
        roadmapControl.className = 'btn';
    }
}

// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
    return function () {
        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
    return function () {
        infowindow.close();
    };
}

// 보호소리스트에 동적으로 보호소데이터추가
function add_shelter_list(shelter_list) {
    var li_list = new Array();
    var checker_json = {};
    var ul = document.getElementById("shelter_info");

    if (ul) {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    }

    for (var i = 0; i < shelter_list.length; i++) {
        if (checker_json.hasOwnProperty(shelter_list[i]['orgNm'])) continue;
        checker_json[shelter_list[i]['orgNm']] = 1;
        li_list[i] = document.createElement('li');
        ul.style.textAlign = "left";
        li_list[i].style.padding = "10px";
        li_list[i].style.borderBottom = "1px solid #d1d1d1";
        li_list[i].style.cursor = "pointer";
        li_list[i].className = 'shelter'
        li_list[i].appendChild(document.createTextNode(shelter_list[i]['orgNm'] + " ☎: " + (shelter_list[i]['tel'] == '비공개' || shelter_list[i]['memberNm'] == '비공개' ? ' → 인터넷검색, 유기동물정보 확인' : shelter_list[i]['tel'] + " / " + shelter_list[i]['memberNm'])));
        ul.appendChild(li_list[i]);
    }

    $(document).ready(function () {
        $('.shelter').click(function () {
            var url = '/bp/shelter_info';
            var name = "유기동물보호시설상세정보";
            var option = "width = 100%, height = 100%, top = 100, left = 350, location = no";
            window.open(url, name, option);
            shelter_info = shelter_list[$('.shelter').index(this)];
        });
    });
}

//유기동물리스트에 동적으로 유기동물데이터추가
function add_animal_list(animal_list) {
    var li_list = new Array();
    var ul = document.getElementById('animal_info');

    if (ul) {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    }

    for (var i = 0; i < animal_list.length; i++) {
        li_list[i] = document.createElement('li');
        li_list[i].className = 'animal';
        li_list[i].style.cssFloat = "left";
        // li_list[i].style.width = '25%';
        li_list[i].style.height = '222.2px';
        li_list[i].style.maxHeight = '223px';
        li_list[i].style.overflowY = 'auto';
        li_list[i].style.border = '1px solid #d1d1d1';
        li_list[i].style.cursor = 'pointer';

        var img = document.createElement('img');
        img.src = animal_list[i]['popfile'];
        img.style.display = 'block';
        img.style.width = '100%';
        img.style.height = '150px';

        var info_div = document.createElement('div');
        var info = new Array();

        info_div.style.textAlign = 'left';
        info_div.style.padding = '5px 5px 5px 10px';

        for (var n = 1; n <= 4; n++) {
            info[n] = document.createElement('span');
            info[n].style.display = 'block';
            info[n].style.fontWeight = 'bold';
            info[n].style.fontSize = '13px';
            if (n < 4) { info[n].style.marginBottom = '3px'; }

            switch (n) {
                case 1:
                    info[n].innerHTML = '나이: ' + animal_list[i]['age'];
                    break;

                case 2:
                    if (animal_list[i]['sexCd'] == 'M') info[n].innerHTML = '성별: 수컷';
                    else info[n].innerHTML = '성별: 암컷';
                    break;

                case 3:
                    info[n].innerHTML = '몸무게: ' + animal_list[i]['weight'];
                    break;

                case 4:
                    info[n].innerHTML = '품종: ' + animal_list[i]['kindCd'];
                    break;
            }
            info_div.appendChild(info[n]);
        }

        li_list[i].appendChild(img);
        li_list[i].appendChild(info_div);
        ul.appendChild(li_list[i]);
    }

    $(document).ready(function () {
        $('.animal').click(function () {
            var url = '/bp/animal_info';
            var name = "유기동물상세정보";
            var option = "width = 100%, height = 100%, top = 100, left = 350, location = no";
            window.open(url, name, option);
            animal_info = animal_list[$('.animal').index(this)];
        });
    });
}

function shelter_func() {
    return shelter_info;
}

function animal_func() {
    return animal_info;
}

// 커스텀 오버레이를 닫기위해 호출되는 함수입니다 
function closeOverlay() {
    overlay.setMap(null);
    kakao.maps.event.addListener(map, 'click', mapClickHandler);
    marker_click = false;
}

// 커스텀 오버레이를 열기위해 호출되는 함수입니다
function openOverlay(data, shelter_marker) {
    var address_list = [String(data['pos']['idx_2']) + ',', String(data['pos']['idx_1'])];

    var content = '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' +
        data['shelter_name'] +
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
        '        </div>' +
        '        <div class="body">' +
        '            <div class="img">' +
        '                <img src="http://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
        '           </div>' +
        '            <div class="desc">' +
        '                <div class="ellipsis">' + data['address'] + '</div>' +
        '                <div class="jibun ellipsis">연락처: ' + data['shelter_tel'] + '</div>' +
        '                <div class="menu_box clear_fix">' +
        '                <div class="elem search"><a href="' + 'https://www.google.com/search?q=' + data['shelter_name'] + '"' + 'target="_blank" id="shelter_link" class="link">검색하기</a></div>' +
        '                <div class="elem roadview"><a class="link" onclick="roadView(' + address_list[0] + address_list[1] + ')">로드뷰</a></div>' +
        '                <div class="elem del_marker"><a class="link"">마커삭제</a></div>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';

    $(document).ready(function () {
        $('.del_marker').click(function () {
            shelterMarker_json[data['address']].setMap(null);
            delete shelterMarker_json[data['address']];
            closeOverlay();
        });
    });

    overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: shelter_marker.getPosition()
    });
    marker_click = true;
    overlay.setMap(map);
    kakao.maps.event.removeListener(map, 'click', mapClickHandler);
}

//보호시설 마커를 지도에 표시
window.addEventListener('message', function (event) {
    if (event.srcElement.location.href == window.location.href) {
        if (shelterMarker_json.hasOwnProperty(event.data['address']) != true) {

            if (event.data['type'] == 'Animal') {
                imageSrc = '../static/images/dog_icon.png';
                imageSize = new kakao.maps.Size(35, 40);
            } else {
                imageSrc = '../static/images/pointer.png';
            }

            var shelter_marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(event.data['pos']['idx_1'], event.data['pos']['idx_2']), // 마커가 표시될 위치입니다,
                image: markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption), // 마커이미지 설정 
            })

            shelter_marker.setMap(map);
            shelterMarker_json[event.data['address']] = shelter_marker;

            // 마커를 클릭했을 때 오버레이를 표시하는 클릭핸들러 
            var markerClickHandler = function () {
                if (marker_click) {
                    closeOverlay();
                } else {
                    openOverlay(event.data, shelter_marker);
                }
            };
            // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
            kakao.maps.event.addListener(shelter_marker, 'click', markerClickHandler);
            // openOverlay(event.data, shelter_marker);
        }
        panTo(event.data['pos']['idx_1'], event.data['pos']['idx_2']);
    }
});


(function () {
    document.addEventListener('keydown', function (e) {
        const keyCode = e.keyCode;
        const keywich = e.which;
        // console.log('pushed key ' + keyCode);

        if (keyCode == 27) { // Enter key
            document.getElementById("roadview").style.display = "None";
        }
    })
})();