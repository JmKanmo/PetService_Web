var isOpen = false;

function utilize_over() {
    if (document.getElementById("Apiuse_list").style.display == '') {
        isOpen = true;
        document.getElementById("Apiuse_list").style.display = 'block';
        $("#up_down_img").attr("src", "../static/images/down-arrow.png");
    }
}

function up_down_func() {
    if (document.getElementById("Apiuse_list").style.display == 'block') {
        document.getElementById("Apiuse_list").style.display = '';
        clicked = true;
        isOpen = false;
        $("#up_down_img").attr("src", "../static/images/up-arrow.png");
    } else {
        isOpen = true;
        document.getElementById("Apiuse_list").style.display = 'block';
        $("#up_down_img").attr("src", "../static/images/down-arrow.png");
    }
}

function utilize_out() {
    if (isOpen == false) {
        document.getElementById("Apiuse_list").style.display = '';
    }
}


var isOpen_s = false;


function utilize_over_s() {
    if (document.getElementById("Apiuse_list_s").style.display == '') {
        isOpen_s = true;
        document.getElementById("Apiuse_list_s").style.display = 'block';
        $("#up_down_img_s").attr("src", "../static/images/down-arrow.png");
    }
}

function up_down_func_s() {
    if (document.getElementById("Apiuse_list_s").style.display == 'block') {
        document.getElementById("Apiuse_list_s").style.display = '';
        clicked_s = true;
        isOpen_s = false;
        $("#up_down_img_s").attr("src", "../static/images/up-arrow.png");
    } else {
        isOpen_s = true;
        document.getElementById("Apiuse_list_s").style.display = 'block';
        $("#up_down_img_s").attr("src", "../static/images/down-arrow.png");
    }
}

function utilize_out_s() {
    if (isOpen_s == false) {
        document.getElementById("Apiuse_list_s").style.display = '';
    }
}
