from flask import Blueprint
from flask import render_template
import requests
from flask import request
from rest_server.resource_Map import KakaoMap_Resource, Geocode_Resource
from rest_client.blue_print import BluePrint
from rest_server.resource_Animal import Animal_Resource, Location_Resource
import random


# 지도검색시스템 관리영역

@BluePrint.route('/maps', methods=['POST', 'GET'])
def map():
    address = "음성군 대소면"  # 초기주소

    if request.method == 'POST':
        address = request.form['address']  # 사용자가 입력한 주소값

    pos = Geocode_Resource().get(address)  # 주소값을 바탕으로 geocode정보 반환 및 저장

    if pos == None:
        pos = Geocode_Resource().get('음성군 대소면')

    return render_template(
        'map_template.html', pos_y=pos['idx_2'], pos_x=pos['idx_1'], nav_menu="map"
    )


# 유기동물정보조회 코드영역
animal_list = Animal_Resource().get_searchAnimal('', '', '', '', '', '')

# 사용자가 입력한 여러조건 값을 토대로 유기동물데이터를 요청
#  반환된 search_list에서 데이터파싱과정을 거쳐 다시 사용자에게 전달
@BluePrint.route('/dashboard', methods=['POST', 'GET'])
def dashboard():
    if request.method == 'POST':
        start_day = request.form['start_day'].replace("-", "")
        end_day = request.form['end_day'].replace("-", "")
        animal_kinds = request.form['animal_kinds']
        sido_kinds = '' if request.form['sido_kinds'] == '-선택-' else request.form['sido_kinds']
        sigungu_kinds = '' if request.form['sigungu_kinds'] == '-선택-' else request.form['sigungu_kinds']
        neutralization = request.form.getlist('neutralization')
        search_list = Animal_Resource().get_searchAnimal(start_day, end_day, animal_kinds,
                                                         sido_kinds, sigungu_kinds, ''.join(neutralization))
        list_param = []
        if search_list != None:
            if len(search_list) < 15:
                for item in search_list:
                    list_param.append(item)
            else:
                for cnt in range(0, 15):
                    list_param.append(search_list[cnt])

        return render_template(
            'dashboard.html', nav_menu="dashboard", animal_list=list_param
        )

    else:
        list_param = []
        random.shuffle(animal_list)
        if animal_list != None:
            if len(animal_list) < 15:
                for item in animal_list:
                    list_param.append(item)
            else:
                for cnt in range(0, 15):
                    list_param.append(animal_list[cnt])

        return render_template(
            'dashboard.html', nav_menu="dashboard", animal_list=list_param
        )


# 실행템플릿 표시
# 위 함수와 내용이 유사
@BluePrint.route('/execute', methods=['POST', 'GET'])
def execute():
    if request.method == 'POST':
        start_day = request.form['start_day'].replace("-", "")
        end_day = request.form['end_day'].replace("-", "")
        animal_kinds = request.form['animal_kinds']
        newtralization = request.form['newtralization_kinds']
        geocode = Geocode_Resource().getFormattedAddress(
            request.form['location'])
        location = [] if geocode == None else geocode.split(' ')
        sido_code = '' if len(
            location) < 2 else Location_Resource().get_sidocode(location[1])
        sigungu_code = '' if len(location) < 3 else Location_Resource().get_sigungucode(
            sido_code, location[2])
        search_list = Animal_Resource().get_searchAnimal(
            start_day, end_day, animal_kinds, sido_code, sigungu_code, newtralization)

        list_param = []
        if search_list != None:
            if len(search_list) < 15:
                print(search_list)
                for item in search_list:
                    list_param.append(item)
            else:
                if type(search_list).__name__ != 'list':
                    list_param.append([search_list])
                else:
                    for cnt in range(0, 15):
                        list_param.append(search_list[cnt])

        return render_template('execution_template.html', nav_menu="execute", animal_list=list_param)

    return render_template('execution_template.html', nav_menu="execute", animal_list=[])


# 가이드템플릿 표시
@BluePrint.route('/guide')
def guide():
    return render_template('guide_template.html', nav_menu="guide")


# 동물상세정보팝업창호출
@BluePrint.route('/animal_info')
def animal_info():
    return render_template(
        'animal_info.html'
    )

# 보호업체상세정보팝업창호출
@BluePrint.route('/shelter_info')
def shelter_info():
    return render_template(
        'shelter_info.html'
    )
