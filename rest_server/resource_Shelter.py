import requests
import xmltodict
import json

API_KEY = "ZbgMgKa7yiF%2BH655L2q2bhPmTslw6qWOLQEB2plfkrRtwZPSn4y7V0P%2FXEkSS85j32cYyuDvan4LQSeo0cMuZQ%3D%3D"
SHELTER_URL = 'http://openapi.animal.go.kr/openapi/service/rest/recordAgencySrvc/recordAgency?'


class resource_Shelter:
    def __init__(self):
        pass

    def get_searchShelter(self, *param):
        option = 'addr=' + param[0]\

        queryParams = option + '&ServiceKey='+API_KEY\

        try:
            URL = SHELTER_URL + queryParams
            result = requests.get(URL)
            dict_type = xmltodict.parse(result.content)
            json_type = json.dumps(dict_type)
            dict2_type = json.loads(json_type)
            body = dict2_type['response']['body']
            items = body['items']
            return items['item']
        except:
            return None

    def get_NearShelter(self, address):
        parsed_address = address.split(' ')

        # sido_shelter = self.get_searchShelter(parsed_address[0])
        sigungu_shelter = self.get_searchShelter(
            parsed_address[0]+' '+parsed_address[1])

        return sigungu_shelter  # +sido_shelter
