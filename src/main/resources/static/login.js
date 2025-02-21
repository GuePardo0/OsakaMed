const url = 'http://localhost:8080/api/osakamed';
const data={
    nome: "Vinicin",
    senha: "1234",
    idade: 13,
    planoDeSaude: "IPM"
}

// interface changes
let header = document.getElementById("login_header");
let header_filler = document.getElementById("header_filler");
let batom_box = document.getElementById("batom_box");
function ajdust_interface() {
    header_height = header.offsetHeight + header.offsetTop;
    header_filler.style.height = `${header_height}px`;
    batom_box.style.top = `${header_height - 157}px`;
}
ajdust_interface();

// sign in script
let nome_senha_invalidos = document.getElementById("nome_senha_invalidos");
nome_senha_invalidos.innerText = "";

function login() {
    let nome = document.getElementById("login_nome");
    let senha = document.getElementById("login_senha");
    fetch(`${url}/getusuarios`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(usuarios => {
        let usuario_invalido = true;
        for (let i = 0; i < usuarios.length; i++) {
            if (nome.value == usuarios[i].nome && senha.value == usuarios[i].senha) {
                usuario_invalido = false;
                localStorage.setItem("user_id", usuarios[i].id);
                localStorage.setItem("user_is_doc", false);
                window.location.href = "/osakamed/";
            }
        }
        if (usuario_invalido) {
            nome_senha_invalidos.innerText = "Nome ou senha incorretos, tente novamente.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
document.getElementById("login").addEventListener("click", login);

// sign up script
function cadastrar() {
    let nome = document.getElementById("cadastro_nome");
    let senha = document.getElementById("cadastro_senha");
    let idade = document.getElementById("cadastro_idade");
    let plano = document.getElementById("cadastro_plano");
    data.nome = nome.value;
    data.senha = senha.value;
    data.idade = Number(idade.value);
    data.plano = plano.value;
    console.log(data);
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
document.getElementById("cadastrar").addEventListener("click", cadastrar);

let cadastro_popup_shadow = document.getElementById("cadastro_popup_shadow");
let cadastro_popup_botao = document.getElementById("cadastro_popup_botao");
let cadastro_popup_box = document.getElementById("cadastro_popup_box");
let cadastro_popup_element = document.getElementById("cadastro_popup");
let html = document.getElementsByTagName("html")[0];
let cadastro_popup_aberto = false;
cadastro_popup_shadow.classList.add("inactive");
cadastro_popup_box.classList.add("inactive");
function cadastro_popup() {
    if (cadastro_popup_aberto) {
        html.style = "overflow-y: scroll";
        cadastro_popup_aberto = false;
        cadastro_popup_shadow.classList.add("inactive");
        cadastro_popup_box.classList.add("inactive");
    } else {
        html.style = "overflow-y: hidden";
        cadastro_popup_aberto = true;
        cadastro_popup_shadow.classList.remove("inactive");
        cadastro_popup_box.classList.remove("inactive");
    }
    ajdust_interface();
}
cadastro_popup_botao.addEventListener("click", cadastro_popup);
cadastro_popup_box.addEventListener("click", cadastro_popup);
cadastro_popup_element.addEventListener("click", cadastro_popup);