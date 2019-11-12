from flask import Flask
from flask import render_template
from rest_client.controller import BluePrint


application = Flask(__name__)
application.register_blueprint(BluePrint, url_prefix='/bp')


@application.route('/')
def main():
    return render_template('main_template.html')


if __name__ == "__main__":
    application.debug = True
    application.run()
