from flask import Flask
from flask import render_template, jsonify, request
from rest_client.controller import BluePrint
from rest_server.resource_Animal import Animal_Resource
from rest_server.resource_Shelter import resource_Shelter


application = Flask(__name__)
application.register_blueprint(BluePrint, url_prefix='/bp')


#현재지도내 위치 근처 보호업체,동물정보 얻기
@application.route('/search', methods=['POST', 'GET'])
def search():
    if request.method == 'POST':
        # 보호업체정보리스트 얻기
        shelter_info = resource_Shelter().get_NearShelter(
            request.get_json()['address'])
        # 동물정보리스트 얻기
        animal_info = Animal_Resource().get_NearAnimal(
            request.get_json()['address'])

        return jsonify(shelter_info=shelter_info, animal_info=animal_info), 200


@application.route('/')
def main():
    return render_template('main_template.html')


if __name__ == "__main__":
    application.debug = True
    application.run()
