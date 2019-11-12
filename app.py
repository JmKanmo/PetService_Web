
from flask import Flask
from flask import request
import requests
from flask import render_template
from news import news_blueprint

application = Flask(__name__)
application.register_blueprint(news_blueprint, url_prefix='/news')


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
