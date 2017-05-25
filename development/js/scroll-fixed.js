window.onscroll = function() {myFunction()};

function myFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("hidden-menu").className = "show-menu";
    } else {
        document.getElementById("hidden-menu").className = "";
    }
}