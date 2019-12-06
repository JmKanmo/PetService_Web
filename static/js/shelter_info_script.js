
document.getElementById("shelter_name").innerHTML = shelter_info['orgNm'];
$("#shelter_name").attr("href", "https://www.google.com/search?q=" + shelter_info['orgNm']);
document.getElementById("shelter_addr").innerHTML = shelter_info['orgAddr'] + shelter_info['orgAddrDtl'];
document.getElementById("shelter_tel").innerHTML = shelter_info['tel'];
document.getElementById("offer").innerHTML = shelter_info['memberNm'];
document.getElementById("offer_tel").innerHTML = shelter_info['htel'];
