import requests
import pprint

Kakao_Key = "a9c962b5eb5e9b6fd5eb025eec850e08"
KAKAO_BASE_URL = "https://dapi.kakao.com"

# if __name__ == "__main__":
#     headers = {'Authorization': "KakaoAK "+Kakao_Key}

#     res1 = requests.get(
#         url=KAKAO_BASE_URL + "/v3/search/book?target=title&query=미움받을 용기",
#         headers=headers
#     )

#     res2 = requests.get(
#         url=KAKAO_BASE_URL + "/v2/search/image?query=설현",
#         headers=headers
#     )

#     res3 = requests.get(
#         url=KAKAO_BASE_URL + "/v2/local/search/address.json?query=충청남도 천안시 동남구 병천면 충절로 1600",
#         headers=headers
#     )

# if res1.status_code == 200:
#     books = res1.json()

#     for book in books['documents']:
#         print("{0} - {1}".format(book['title'], book['authors']))

# else:
#     print("Error {0}".format(res1.status_code))

    # if res2.status_code == 200:
    #     images = []
    #     docs = res2.json()

    #     print(docs)
    #     for image in docs['documents']:
    #         print(image)
    #         images.append(image['image_url'])

    # print(images)

    # if res3.status_code == 200:
    #     docs = res3.json()
    #     document = docs["documents"]
    #     address_info = dict(document[0])
    #     print(address_info["address"]['x'])
    #     print(address_info["address"]['y'])

    # else:
    #     print("Error {0}".format(res2.status_code))
