const url = 'http://localhost:8080/api/osakamed';

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
    fetch(`${url}/get-usuarios`, {
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
            fetch(`${url}/get-medicos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(medicos => {
                let medico_invalido = true;
                for (let i = 0; i < medicos.length; i++) {
                    if (nome.value == medicos[i].nome && senha.value == medicos[i].senha) {
                        medico_invalido = false;
                        localStorage.setItem("user_id", medicos[i].crm);
                        localStorage.setItem("user_is_doc", true);
                        window.location.href = "/osakamed/";
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
            if (medico_invalido) {
                nome_senha_invalidos.innerText = "Nome ou senha incorretos, tente novamente.";
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
document.getElementById("login").addEventListener("click", login);

// sign up script
let cadastrar_element = document.getElementsByClassName("cadastrar");
function cadastrar() {
    let is_cliente = 0;
    if (cadastro_drop_down.children[0].innerText == "Cliente") {
        is_cliente = 1;
    }
    let nome = document.getElementsByClassName("cadastro_nome")[is_cliente];
    let idade = document.getElementsByClassName("cadastro_idade")[0];
    let plano = document.getElementsByClassName("cadastro_plano")[0];
    let especialidade = document.getElementsByClassName("cadastro_especialidade")[0];
    let crm = document.getElementsByClassName("cadastro_crm")[0];
    let senha = document.getElementsByClassName("cadastro_senha")[is_cliente];
    let confirmar_senha = document.getElementsByClassName("cadastro_confirmar_senha")[is_cliente];
    let error_element = document.getElementsByClassName("error")[is_cliente];
    let data = {};
    if (is_cliente == 1) {
        if (nome.value == "" || idade.value == "" || senha.value == "" || confirmar_senha.value == "") {
            error_element.style.display = "flex";
            error_element.style.color = "#E76767";
            error_element.innerText = "Por favor, preencha todos os campos.";
        } else if (senha.value != confirmar_senha.value) {
            error_element.style.display = "flex";
            error_element.style.color = "#E76767";
            error_element.innerText = "As senhas estão diferentes. Tente novamente.";
        } else if (isNaN(Number(idade.value))) {
            error_element.style.display = "flex";
            error_element.style.color = "#E76767";
            error_element.innerText = "Você digitou uma idade inválida. Tente novamente.";
        } else {
            error_element.style.display = "flex";
            error_element.style.color = "#2BA70C";
            error_element.innerText = "Cadastro realizado com sucesso!";
            data = {
                "nome": nome.value,
                "senha": senha.value,
                "idade": Number(idade.value),
                "planoDeSaude": "Não possui"
            }
            fetch(`${url}/add-usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            fetch(`${url}/get-usuarios`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(usuarios => {
                let usuario = usuarios[usuarios.length - 1];
                localStorage.setItem("user_id", usuario.id + 1);
                localStorage.setItem("user_is_doc", false);
            })
            window.location.href = "/osakamed/";
        }
    }
    else {
        if (nome.value == "" || plano.value == "" || especialidade.value == "" || crm.value == "" || senha.value == "" || confirmar_senha.value == "") {
            error_element.style.display = "flex";
            error_element.style.color = "#E76767";
            error_element.innerText = "Por favor, preencha todos os campos.";
        } else if (senha.value != confirmar_senha.value) {
            error_element.style.display = "flex";
            error_element.style.color = "#E76767";
            error_element.innerText = "As senhas estão diferentes. Tente novamente.";
        } else {
            error_element.style.display = "flex";
            error_element.style.color = "#2BA70C";
            error_element.innerText = "Cadastro realizado com sucesso!";
            data = {
                "crm": crm.value,
                "nome": nome.value,
                "senha": senha.value,
                "especialidade": especialidade.innerText,
                "planoDeSaude": plano.innerText
            }
            fetch(`${url}/add-medico`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            localStorage.setItem("user_id", crm.value);
            localStorage.setItem("user_is_doc", true);
            window.location.href = "/osakamed/";
        }
    }
}
for (let i = 0; i < cadastrar_element.length; i++) {
    cadastrar_element[i].addEventListener("click", cadastrar);
}

// cadastro popup
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

// mudar cadastro
let usuario = document.getElementsByClassName("usuario");
let medico = document.getElementsByClassName("medico");
let cadastro_drop_down = document.getElementById("cadastro_drop_down");
function mudar_cadastro() {
    for (let i = 0; i < usuario.length; i++) {
        usuario[i].style.display = "none";
    }
    for (let i = 0; i < medico.length; i++) {
        medico[i].style.display = "none";
    }
    if (cadastro_drop_down.children[0].innerText == "Médico") {
        for (let i = 0; i < medico.length; i++) {
            medico[i].style.display = "grid";
        }
    } else {
        for (let i = 0; i < usuario.length; i++) {
            usuario[i].style.display = "grid";
        }
    }
}
mudar_cadastro()
let elements = cadastro_drop_down.children;
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", mudar_cadastro);
}