from flask import Blueprint
from flask import render_template
import requests
from flask import request
from rest_server.resource_Map import KakaoMap_Resource
from rest_client.blue_print import BluePrint
from rest_server.resource_Animal import Animal_Resource
from rest_server.resource_Shelter import resource_Shelter
import random


# 지도검색시스템 동작관리 영역
prev_pos = ['', '']


@BluePrint.route('/maps', methods=['POST', 'GET'])
def map():
    address = "충북 음성군 대소면"  # 초기주소
    flag = False

    if request.method == 'POST':
        if not request.form['address']:

            return render_template(
                'map_template.html', pos_y=prev_pos[0], pos_x=prev_pos[1], nav_menu="map"
            )

        address = request.form['address']

    flag = True
    document = KakaoMap_Resource().get(address)

    if not document:
        pos_x = prev_pos[0]
        pos_y = prev_pos[1]
    else:
        shelter_list = resource_Shelter().get(address)
        address_info = dict(document[0])
        pos_x = address_info["address"]['x']
        pos_y = address_info["address"]['y']
        prev_pos[0] = pos_x
        prev_pos[1] = pos_y

    return render_template(
        'map_template.html', pos_y=pos_x, pos_x=pos_y, nav_menu="map", shelter_list=shelter_list
    )


# 유기동물정보조회 코드영역

animal_list = Animal_Resource().get('', '', '', '', '', '')


@BluePrint.route('/dashboard', methods=['POST', 'GET'])
def dashboard():
    if request.method == 'POST':
        start_day = request.form['start_day'].replace("-", "")
        end_day = request.form['end_day'].replace("-", "")
        animal_kinds = request.form['animal_kinds']
        sido_kinds = '' if request.form['sido_kinds'] == '-선택-' else request.form['sido_kinds']
        sigungu_kinds = '' if request.form['sigungu_kinds'] == '-선택-' else request.form['sigungu_kinds']
        neutralization = request.form.getlist('neutralization')
        search_list = Animal_Resource().get(start_day, end_day, animal_kinds,
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


@BluePrint.route('/animal_info')
def animal_info():
    return render_template(
        'animal_info.html'
    )
