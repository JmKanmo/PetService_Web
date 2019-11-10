from flask import Blueprint
from flask import render_template
import requests
import request
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
