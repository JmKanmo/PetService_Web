import requests


# 카카오지도API를 이용해 사용자가 원하는 주소정보값을 조회,관리하는 클래스(Geocode API로 대체)
class KakaoMap_Resource:
    def __init(self):
        pass
    # 사용자가 요청한 주소에대한 좌표정보값을 조회, json데이터형식으로 반환하는 함수

    def get(self, address):
        res = requests.get(
            url="https://dapi.kakao.com" + "/v2/local/search/address.json?query=" + address,
            headers={'Authorization': 'KakaoAK ' +
                     "a9c962b5eb5e9b6fd5eb025eec850e08"}
        )

        docs = res.json()
        return docs["documents"]


# Google Geocode API를 이용해 사용자가 원하는 주소정소값을 조회,관리하는 클래스(적극사용)
class Geocode_Resource:
    def __init(self):
        pass
    # 사용자가 요청한 주소에대한 좌표정보값을 조회, json데이터형식으로 반환하는 함수

    def get(self, address):
        URL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + \
            address+"&key=AIzaSyAPe83VKDQLfw_5kVvTYSvM0j0Z2HX8ff0&language=ko"
        result = requests.get(URL).json()

        if result['status'] == 'OK':
            pos = result['results'][0]['geometry']['location']
            return {'idx_1': pos['lat'], 'idx_2': pos['lng']}

        else:
            return None
    # 사용자가 요청한 주소(생략된 불명확한 주소)에 대한 정확한 주소값을 반환

    def getFormattedAddress(self, address):
        URL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + \
            address+"&key=AIzaSyAPe83VKDQLfw_5kVvTYSvM0j0Z2HX8ff0&language=ko"
        result = requests.get(URL).json()

        if result['status'] == 'OK':
            return result['results'][0]['formatted_address']
