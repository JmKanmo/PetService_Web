from flask import Blueprint
from flask import render_template
import requests
import request
import pprint
from rest_client.read_Kakao import KAKAO_BASE_URL
from rest_client.read_Kakao import Kakao_Key

news_blueprint = Blueprint('news', __name__)


@news_blueprint.route('/dashboard')
def dashboard():
     return render_template(
         'dashboard.html', nav_menu="dashboard"
     )
