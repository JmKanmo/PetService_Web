import requests
from urllib.request import Request, urlopen
from urllib.parse import urlencode, quote_plus, unquote
import xmltodict
import json

API_KEY = "ZbgMgKa7yiF%2BH655L2q2bhPmTslw6qWOLQEB2plfkrRtwZPSn4y7V0P%2FXEkSS85j32cYyuDvan4LQSeo0cMuZQ%3D%3D"
url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20140301&endde=20140430&pageNo=1&numOfRows=10'
queryParams = '&ServiceKey='+API_KEY\
    # + '&bgnde='+'20140601'\
# + '&endde='+'20140630'\
# + '&upkind='+'417000'\
# + '&kind=' + ''\
# + '&upr_cd='+''\
# + '&org_cd='+''\
# + '&care_reg_no='+''\
# + '&state=' + 'notice'\
# + '&pageNo='+'1'\
# + '&numOfRows='+'10'\
# + '&neuter_yn='+'Y'\

url = url + queryParams
result = requests.get(url)
dict_type = xmltodict.parse(result.content)
json_type = json.dumps(dict_type)
dict2_type = json.loads(json_type)

body = dict2_type['response']['body']

items = body['items']

print(items['item'][0])

for item in items['item']:
    print(item)

    










