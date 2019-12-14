import requests


class KakaoMap_Resource:
    def __init(self):
        pass

    def get(self, address):
        res = requests.get(
            url="https://dapi.kakao.com" + "/v2/local/search/address.json?query=" + address,
            headers={'Authorization': 'KakaoAK ' +
                     "a9c962b5eb5e9b6fd5eb025eec850e08"}
        )

        docs = res.json()
        return docs["documents"]


class Geocode_Resource:
    def __init(self):
        pass

    def get(self, address):
        URL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + \
            address+"&key=AIzaSyAPe83VKDQLfw_5kVvTYSvM0j0Z2HX8ff0&language=ko"
        result = requests.get(URL).json()

        if result['status'] == 'OK':
            pos = result['results'][0]['geometry']['location']
            return {'idx_1': pos['lat'], 'idx_2': pos['lng']}

        else:
            return None

    def getFormattedAddress(self, address):
        URL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + \
            address+"&key=AIzaSyAPe83VKDQLfw_5kVvTYSvM0j0Z2HX8ff0&language=ko"
        result = requests.get(URL).json()

        if result['status'] == 'OK':
            return result['results'][0]['formatted_address']
