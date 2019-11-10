
from flask import Flask
from flask import request
import requests
from flask import render_template
from news import news_blueprint
from news import KAKAO_BASE_URL
from news import Kakao_Key

application = Flask(__name__)
application.register_blueprint(news_blueprint, url_prefix='/news')

prev_pos = ['', '']


# 지도검색시스템 동작관리 영역

@application.route('/map', methods=['POST', 'GET'])
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


@application.route('/animal_info')
def animal_info():
    return render_template(
        'animal_info.html'
    )


@application.route('/')
def main():
    return render_template('main_template.html')


if __name__ == "__main__":
    application.debug = True
    application.run()
