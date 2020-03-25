from flask import Flask
from flask import render_template, jsonify, request
from rest_client.controller import BluePrint
from rest_server.resource_Animal import Animal_Resource
from rest_server.resource_Shelter import resource_Shelter
from rest_server.resource_Map import Geocode_Resource

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

#현재지도내 근처 특정타입의 동물정보 얻기
@application.route('/animalType', methods=['POST', 'GET'])
def animalType():
    if request.method == 'POST':
        # 동물정보리스트 얻기
        animal_info = Animal_Resource().get_NearAnimal(
            request.get_json()['address'], str(request.get_json()['type']))

        return jsonify(animal_info=animal_info), 200


# 입력받은 주소의 좌표값얻기
@application.route('/location', methods=['POST', 'GET'])
def location():
    if request.method == 'POST':
        return jsonify(address=request.get_json()['address'], pos=Geocode_Resource().get(request.get_json()['address'])), 200


@application.route('/')
def main():
    return render_template('main_template.html')


if __name__ == "__main__":
    application.debug = True
    application.run()
