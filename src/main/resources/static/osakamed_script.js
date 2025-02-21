// local storage variables
let user_id = localStorage.getItem("user_id");
let user_is_doc = localStorage.getItem("user_is_doc");
if (user_id == "null") {
    user_id = null;
}
if (user_id == "true") {
    user_id = true;
}
if (user_id == "false") {
    user_id = false;
}
if (user_is_doc == "null") {
    user_is_doc = null;
}
if (user_is_doc == "true") {
    user_is_doc = true;
}
if (user_is_doc == "false") {
    user_is_doc = false;
}

// change the main menu layout based on the user
let semconta = document.getElementsByClassName("semconta");
let usuario = document.getElementsByClassName("usuario");
let medico = document.getElementsByClassName("medico");
function change_layout() {
    for (let i = 0; i < usuario.length; i++) {
        usuario[i].classList.add("inactive");
    }
    for (let i = 0; i < medico.length; i++) {
        medico[i].classList.add("inactive");
    }
    if (user_id != null) {
        for (let i = 0; i < semconta.length; i++) {
            semconta[i].classList.add("inactive");
        }
        console.log(user_is_doc);
        if (user_is_doc) {
            for (let i = 0; i < medico.length; i++) {
                medico[i].classList.remove("inactive");
            }
        } else {
            for (let i = 0; i < usuario.length; i++) {
                usuario[i].classList.remove("inactive");
            }
        }
    } else {
        for (let i = 0; i < semconta.length; i++) {
            semconta[i].classList.remove("inactive");
        }
    }
}
change_layout();

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
    change_layout();
}
perfil_sair_element.addEventListener("click", perfil_sair);