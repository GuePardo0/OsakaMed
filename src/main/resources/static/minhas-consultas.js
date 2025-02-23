// avaliar consulta popup
let avaliar_popup_shadow = document.getElementById("avaliar_popup_shadow");
let avaliar_popup_botao = document.getElementsByClassName("avaliar_popup_botao");
let avaliar_popup_box = document.getElementById("avaliar_popup_box");
let avaliar_popup_element = document.getElementById("avaliar_popup");
let html = document.getElementsByTagName("html")[0];
let avaliar_popup_aberto = false;
avaliar_popup_shadow.classList.add("inactive");
avaliar_popup_box.classList.add("inactive");
function avaliar_popup() {
    if (avaliar_popup_aberto) {
        html.style = "overflow-y: scroll";
        avaliar_popup_aberto = false;
        avaliar_popup_shadow.classList.add("inactive");
        avaliar_popup_box.classList.add("inactive");
    } else {
        html.style = "overflow-y: hidden";
        avaliar_popup_aberto = true;
        avaliar_popup_shadow.classList.remove("inactive");
        avaliar_popup_box.classList.remove("inactive");
    }
}
for (let i = 0; i < avaliar_popup_botao.length; i++) {
    avaliar_popup_botao[i].addEventListener("click", function() {
        avaliar_popup();
    });
}
avaliar_popup_box.addEventListener("click", avaliar_popup);
avaliar_popup_element.addEventListener("click", avaliar_popup);

// descricao consulta popup
let descricao_popup_shadow = document.getElementById("descricao_popup_shadow");
let descricao_popup_botao = document.getElementsByClassName("descricao_popup_botao");
let descricao_popup_box = document.getElementById("descricao_popup_box");
let descricao_popup_element = document.getElementById("descricao_popup");
let descricao_popup_aberto = false;
descricao_popup_shadow.classList.add("inactive");
descricao_popup_box.classList.add("inactive");
function descricao_popup() {
    if (descricao_popup_aberto) {
        html.style = "overflow-y: scroll";
        descricao_popup_aberto = false;
        descricao_popup_shadow.classList.add("inactive");
        descricao_popup_box.classList.add("inactive");
    } else {
        html.style = "overflow-y: hidden";
        descricao_popup_aberto = true;
        descricao_popup_shadow.classList.remove("inactive");
        descricao_popup_box.classList.remove("inactive");
    }
}
for (let i = 0; i < descricao_popup_botao.length; i++) {
    descricao_popup_botao[i].addEventListener("click", function() {
        descricao_popup();
    });
}
descricao_popup_box.addEventListener("click", descricao_popup);
descricao_popup_element.addEventListener("click", descricao_popup);
