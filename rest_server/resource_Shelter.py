import requests
import xmltodict
import json
import random
from rest_server.resource_Animal import Location_Resource

API_KEY = "ZbgMgKa7yiF%2BH655L2q2bhPmTslw6qWOLQEB2plfkrRtwZPSn4y7V0P%2FXEkSS85j32cYyuDvan4LQSeo0cMuZQ%3D%3D"
SHELTER_URL = 'http://openapi.animal.go.kr/openapi/service/rest/recordAgencySrvc/recordAgency?'


class resource_Shelter:
    def __init__(self):
        pass

    def get_searchAgency(self, *param):
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
        sigungu_agency = self.get_searchAgency(
            parsed_address[0]+' '+parsed_address[1])

        sigungu_shelter = []

        for sido_body in Location_Resource().get_sidocode(parsed_address):
            if sido_body['orgdownNm'] == parsed_address[0]:
                for sigungu_body in Location_Resource().get_sigungucode(sido_body['orgCd']):
                    if sigungu_body['orgdownNm'] == parsed_address[1]:
                        URL = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/shelter?upr_cd=' + \
                            sido_body['orgCd']+'&org_cd=' + \
                            sigungu_body['orgCd']+'&ServiceKey='+API_KEY

                        result = requests.get(URL)
                        dict_type = xmltodict.parse(result.content)
                        json_type = json.dumps(dict_type)
                        dict2_type = json.loads(json_type)
                        body = dict2_type['response']['body']
                        items = body['items']
                        for item in items['item']:
                            if type(item).__name__ != 'dict':
                                continue
                            if item['careNm'].rfind('동물병원') != -1 or item['careNm'].rfind('동물클리닉') != -1:
                                continue
                            sigungu_shelter.append({
                                'addr': '비공개',
                                'addrDtl': '비공개',
                                'htel': '비공개',
                                'memberNm': '비공개',
                                'orgNm': item['careNm'],
                                'tel': '비공개'
                            })
                break

        if sigungu_shelter is None:
            sigungu_shelter = []

        if(type(sigungu_shelter) is dict):
            sigungu_shelter = list(sigungu_shelter)

        if sigungu_agency is None:
            sigungu_agency = []

        if(type(sigungu_agency) is dict):
            sigungu_agency = list(sigungu_agency)

        ret = sigungu_shelter+sigungu_agency
        random.shuffle(ret)
        return ret
