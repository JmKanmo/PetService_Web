import requests

KAKAO_BASE_URL = "https://dapi.kakao.com"
KAKAO_KEY = "a9c962b5eb5e9b6fd5eb025eec850e08"
headers = {'Authorization': 'KakaoAK ' + KAKAO_KEY}


class KakaoMap_Resource:
    def __init(self):
        pass

    def get(self, address):
        res = requests.get(
            url=KAKAO_BASE_URL + "/v2/local/search/address.json?query=" + address,
            headers=headers
        )

        docs = res.json()
        return docs["documents"]


class Geocode_Resource:
    def __init(self):
        pass

    def get(self, address):
        URL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + \
            address+"&key=AIzaSyAPe83VKDQLfw_5kVvTYSvM0j0Z2HX8ff0"
        result = requests.get(URL).json()

        if result['status'] == 'OK':
            pos = result['results'][0]['geometry']['location']
            return {'idx_1': pos['lat'], 'idx_2': pos['lng']}

        else:
            return None
