import requests
from urllib.request import Request, urlopen
from urllib.parse import urlencode, quote_plus, unquote
import xmltodict
import json

ANIMAL_API_KEY = "ZbgMgKa7yiF%2BH655L2q2bhPmTslw6qWOLQEB2plfkrRtwZPSn4y7V0P%2FXEkSS85j32cYyuDvan4LQSeo0cMuZQ%3D%3D"
ANIMAL_URL = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?'

bgnde = '20190101'  # 유기날짜(검색시작일)
endde = '20191109'  # 유기날짜(검색종료일)
upkind = '417000'  # 축종코드(기본 - 개 , 고양이 - 422400 , 기타 - 429900)
kind = ''  # 품종코드 - 품종코드API 참조
upr_cd = ''  # 시도조회 API 참조
org_cd = ''  # 시군구조회 API 참조
care_reg_no = ''  # 보호소번호 API 참조
state = 'protect'  # 기본값 protect
neuter_yn = 'Y'  # 중성화여부 (Y , N , U)
pageNo = '1'  # 페이지번호
numOfRows = '12'  # 페이지당 보여줄 개수

option = 'bgnde='+bgnde\
    + '&endde='+endde\
    + '&pageNo='+pageNo\
    + '&numOfRows='+numOfRows\
    + '&upkind='+upkind\
    + '&neuter_yn='+neuter_yn\
    + '&state='+state\

queryParams = option + '&ServiceKey='+ANIMAL_API_KEY\

try:
    URL = ANIMAL_URL + queryParams
    result = requests.get(URL)
    dict_type = xmltodict.parse(result.content)
    json_type = json.dumps(dict_type)
    dict2_type = json.loads(json_type)
    body = dict2_type['response']['body']
    items = body['items']
    animal_list = items['item']

except:
    animal_list = None
