import os
from database.db_model import db, DB_Model
from flask import Flask
from flask import render_template, jsonify, request
from rest_client.controller import BluePrint
from rest_server.resource_Animal import Animal_Resource
from rest_server.resource_Shelter import resource_Shelter


application = Flask(__name__)
application.register_blueprint(BluePrint, url_prefix='/bp')
basedir = os.path.abspath(os.path.dirname(__file__))  # 현재 파일의 주소 반환
dbfile = os.path.join(basedir, 'db.sqlite')  # 현재 파일의 주소 + 'dp.sqlite'
application.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    dbfile  # SQLALCHEMY URI옵션추가
application.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(application)
db.app = application
db.create_all()


#현재지도내 위치 근처 보호업체,동물정보 얻기
@application.route('/search', methods=['POST', 'GET'])
def search():
    if request.method == 'POST':
        # db 위치정보 갱신
        if len(db.session.query(DB_Model.id, DB_Model.address).all()) != 0:
            db.session.query(DB_Model.id, DB_Model.address).filter(
                DB_Model.id == 1).delete()
        db.session.add(DB_Model(1, request.get_json()['address']))
        db.session.commit()
        # 보호업체, 동물정보 API(함수)호출
        # 원하는정보 GET, jsonify인자로 전송(map.js)
        return jsonify(hello='world', item='apple'), 200


@application.route('/')
def main():
    return render_template('main_template.html')


if __name__ == "__main__":
    application.debug = True
    application.run()
