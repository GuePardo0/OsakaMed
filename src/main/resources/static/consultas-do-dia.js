// realizar consulta popup
let realizar_popup_shadow = document.getElementById("realizar_popup_shadow");
let realizar_popup_botao = document.getElementsByClassName("realizar_popup_botao");
let realizar_popup_box = document.getElementById("realizar_popup_box");
let realizar_popup_element = document.getElementById("realizar_popup");
let html = document.getElementsByTagName("html")[0];
let realizar_popup_aberto = false;
realizar_popup_shadow.classList.add("inactive");
realizar_popup_box.classList.add("inactive");
function realizar_popup() {
    if (realizar_popup_aberto) {
        html.style = "overflow-y: scroll";
        realizar_popup_aberto = false;
        realizar_popup_shadow.classList.add("inactive");
        realizar_popup_box.classList.add("inactive");
    } else {
        html.style = "overflow-y: hidden";
        realizar_popup_aberto = true;
        realizar_popup_shadow.classList.remove("inactive");
        realizar_popup_box.classList.remove("inactive");
    }
}
for (let i = 0; i < realizar_popup_botao.length; i++) {
    realizar_popup_botao[i].addEventListener("click", function() {
        realizar_popup();
    });
}
realizar_popup_box.addEventListener("click", realizar_popup);
realizar_popup_element.addEventListener("click", realizar_popup);
