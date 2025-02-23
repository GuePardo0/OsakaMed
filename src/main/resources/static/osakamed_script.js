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
    for (let i = 0; i < semconta.length; i++) {
        semconta[i].classList.add("inactive");
    }
    if (user_id != null) {
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