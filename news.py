from flask import Blueprint
from flask import render_template
import requests
from flask import request
import pprint
import random
from rest_client.read_Kakao import KAKAO_BASE_URL
from rest_client.read_Kakao import Kakao_Key
from rest_client.read_Animal import set_animal_list
from rest_client.read_Animal import animal_list

news_blueprint = Blueprint('news', __name__)


@news_blueprint.route('/dashboard')
def dashboard():
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


# 지도검색시스템 동작관리 영역
prev_pos = ['', '']


@news_blueprint.route('/maps', methods=['POST', 'GET'])
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

    headers = {'Authorization': 'KakaoAK ' + Kakao_Key}

    res3 = requests.get(
        url=KAKAO_BASE_URL + "/v2/local/search/address.json?query="+address,
        headers=headers
    )

    if res3.status_code == 200:
        try:
            flag = True
            docs = res3.json()
            document = docs["documents"]
            if not document:
                pos_x = prev_pos[0]
                pos_y = prev_pos[1]
            else:
                address_info = dict(document[0])
                pos_x = address_info["address"]['x']
                pos_y = address_info["address"]['y']
                prev_pos[0] = pos_x
                prev_pos[1] = pos_y

            return render_template(
                'map_template.html', pos_y=pos_x, pos_x=pos_y, nav_menu="map"
            )
        except:
            print('주소입력데이터오류')
