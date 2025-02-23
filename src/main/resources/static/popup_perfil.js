// profile popup
let perfil_popup_box = document.getElementById("perfil_popup_box");
let perfil_popup_botao = document.getElementById("perfil_popup_botao");
let perfil_popup_element = document.getElementById("perfil_popup");
let perfil_popup_aberto = false;
function perfil_popup() {
    if (perfil_popup_aberto) {
        perfil_popup_aberto = false;
        perfil_popup_box.classList.add("inactive");
        perfil_popup_element.classList.add("inactive");
    } else {
        perfil_popup_aberto = true;
        perfil_popup_box.classList.remove("inactive");
        perfil_popup_element.classList.remove("inactive");
    }
}
perfil_popup_botao.addEventListener("click", perfil_popup);
perfil_popup_box.addEventListener("click", perfil_popup);
perfil_popup_element.addEventListener("click", perfil_popup);

// leave profile
let perfil_sair_element = document.getElementById("perfil_sair");
function perfil_sair() {
    localStorage.setItem("user_id", null);
    localStorage.setItem("user_is_doc", null);
    user_id = null;
    user_is_doc = null;
    window.location.href = "/osakamed/";
}
perfil_sair_element.addEventListener("click", perfil_sair);