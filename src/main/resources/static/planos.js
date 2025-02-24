const url = 'http://localhost:8080/api/osakamed';

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
if (typeof user_id == "string") {
    const numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let is_number = true;
    for (let i = 0; i < user_id.length; i++) {
        if (!numeros.includes(user_id[i])) {
            is_number = false;
            break;
        }
    }
    if (is_number) {
        user_id = Number(user_id);
    }
}

// interface changes
let header = document.getElementById("login_header");
let header_height = header.offsetHeight + header.offsetTop;
let header_filler = document.getElementById("header_filler");
let batom_box = document.getElementById("batom_box");
header_filler.style.height = `${header_height}px`;
batom_box.style.top = `${header_height - 157}px`;

let botoes = document.getElementsByClassName("button_div");
let textos = document.getElementsByClassName("texto");
function alterar_plano(plano) {
    let data = {
        "id": user_id,
        "plano": plano
    }
    fetch(`${url}/alterar-plano`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", function() {
        alterar_plano(textos[i].children[0].innerText.split(" ")[1]);
    })
}