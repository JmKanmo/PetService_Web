var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(pos_x, pos_y), // 지도의 중심좌표
        level: 7 // 지도의 확대 레벨
    };

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption);
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
    image: markerImage // 마커이미지 설정 
}),
    infowindow = new kakao.maps.InfoWindow({
        zindex: 1
    }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

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
                + '<div class="infowindow_menu" onclick="window_close()">닫기</div>' + '</div>';

            // result에 클릭한 위치의 주소정보가 들어가있다. console.log(result)

            // 마커를 클릭한 위치에 표시합니다 
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }
    });
};

//커스텀뷰를 닫는함수
function window_close() {
    infowindow.close();
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

// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
function closeOverlay() {
    overlay.setMap(null);
    kakao.maps.event.addListener(map, 'click', mapClickHandler);
    marker_click = false;
}

// 마커를 클릭했을 때 오버레이를 표시하는 클릭핸들러 
var markerClickHandler = function () {
    if (marker_click) {
        kakao.maps.event.addListener(map, 'click', mapClickHandler);
        overlay.setMap(null);
        marker_click = false;
    } else {
        var content = '<div class="wrap">' +
            '    <div class="info">' +
            '        <div class="title">' +
            '            카카오 스페이스닷원' +
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
            '        </div>' +
            '        <div class="body">' +
            '            <div class="img">' +
            '                <img src="http://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
            '           </div>' +
            '            <div class="desc">' +
            '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
            '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
            '                <div><a href="http://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '</div>';

        overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: marker.getPosition()
        });
        marker_click = true;
        overlay.setMap(map);
        kakao.maps.event.removeListener(map, 'click', mapClickHandler);
    }
};

// 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
kakao.maps.event.addListener(marker, 'click', markerClickHandler);

// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'idle', function () {
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
});

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

        for (var i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {
                infoDiv.innerHTML = result[i].address_name;
                break;
            }
        }
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

//임시로 마커생성
var dog_marker = new Array();

function marker_make() {
    // 마커를 표시할 위치와 title 객체 배열입니다 
    var positions = [
        {
            content: '<div>카카오</div>',
            latlng: new kakao.maps.LatLng(33.450705, 126.570677)
        },
        {
            content: '<div>마카오</div>',
            latlng: new kakao.maps.LatLng(33.450936, 126.569477)
        },
        {
            content: '<div>코리아텍</div>',
            latlng: new kakao.maps.LatLng(33.450879, 126.569940)
        },
        {
            content: '<div>이리와</div>',
            latlng: new kakao.maps.LatLng(33.451393, 126.570738)
        }
    ];

    for (var i = 0; i < positions.length; i++) {

        // 마커 이미지를 생성합니다    
        var markerImage = new kakao.maps.MarkerImage("../static/images/dog_icon.png", new kakao.maps.Size(30, 45));

        // 마커에 표시할 인포윈도우를 생성합니다 
        var dog_infowindow = new kakao.maps.InfoWindow({
            content: positions[i].content // 인포윈도우에 표시할 내용
        });

        // 마커를 생성합니다
        dog_marker[i] = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            content: positions[i].content, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage // 마커 이미지 
        });

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다 
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(dog_marker[i], 'click', dog_marker_OnClick(map, dog_marker[i], dog_infowindow));
        kakao.maps.event.addListener(dog_marker[i], 'mouseover', makeOverListener(map, dog_marker[i], dog_infowindow));
        kakao.maps.event.addListener(dog_marker[i], 'mouseout', makeOutListener(dog_infowindow));
    }
}

//반려견마커 클릭시 오버레이띄우는 함수입니다
function dog_marker_OnClick(map, dog_marker, dog_infowindow) {
    return function () {
        if (marker_click) {
            kakao.maps.event.addListener(map, 'click', mapClickHandler);
            overlay.setMap(null);
            marker_click = false;
        } else {
            var content = '<div class="wrap">' +
                '    <div class="info">' +
                '        <div class="title">' +
                '            카카오 스페이스닷원' +
                '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
                '        </div>' +
                '        <div class="body">' +
                '            <div class="img">' +
                '                <img src="http://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
                '           </div>' +
                '            <div class="desc">' +
                '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
                '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
                '                <div><a href="http://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</div>';

            overlay = new kakao.maps.CustomOverlay({
                content: content,
                map: map,
                position: dog_marker.getPosition()
            });

            marker_click = true;
            overlay.setMap(map);
            kakao.maps.event.removeListener(map, 'click', mapClickHandler);
        }
    };
};

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
