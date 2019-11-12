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
