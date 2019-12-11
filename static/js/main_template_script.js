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