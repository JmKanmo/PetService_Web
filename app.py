from flask import Flask
from flask import render_template, jsonify, request
from rest_client.controller import BluePrint


application = Flask(__name__)
application.register_blueprint(BluePrint, url_prefix='/bp')


@application.route('/search', methods=['POST', 'GET'])
def search():
    if request.method == 'POST':
        # database에 request 데이터(위치정보) 저장
        return jsonify('deletion completed'), 204


@application.route('/')
def main():
    return render_template('main_template.html')


if __name__ == "__main__":
    application.debug = True
    application.run()
