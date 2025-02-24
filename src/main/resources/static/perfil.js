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
        user_id = parseInt(user_id);
    }
}

let nome = document.getElementById("nome");
let idade = document.getElementById("idade");
let especialidade = document.getElementById("especialidade");
let crm = document.getElementById("crm");
function atualizar_informacoes() {
    if (!user_is_doc) {
        fetch(`${url}/get-usuarios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(usuarios => {
            let nao_possui = document.getElementById("nao_possui");
            let plano_essencial = document.getElementById("plano_essencial");
            let plano_plus = document.getElementById("plano_plus");
            let plano_premium = document.getElementById("plano_premium");
            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i].id == user_id) {
                    nome.innerHTML = "<span>Nome: </span>" + usuarios[i].nome;
                    idade.innerHTML = "<span>Idade: </span>" + usuarios[i].idade;
                    especialidade.style.display = "none";
                    crm.style.display = "none";
                    if (usuarios[i].planoDeSaude == "Não possui") {
                        plano_essencial.style.display = "none";
                        plano_plus.style.display = "none";
                        plano_premium.style.display = "none";
                    } else if (usuarios[i].planoDeSaude == "Essencial") {
                        nao_possui.style.display = "none";
                        plano_plus.style.display = "none";
                        plano_premium.style.display = "none";
                    } else if (usuarios[i].planoDeSaude == "Plus") {
                        nao_possui.style.display = "none";
                        plano_essencial.style.display = "none";
                        plano_premium.style.display = "none";
                    } else if (usuarios[i].planoDeSaude == "Plus") {
                        nao_possui.style.display = "none";
                        plano_essencial.style.display = "none";
                        plano_plus.style.display = "none";
                    }
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        fetch(`${url}/get-medicos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(medicos => {
            let nao_possui = document.getElementById("nao_possui");
            let plano_essencial = document.getElementById("plano_essencial");
            let plano_plus = document.getElementById("plano_plus");
            let plano_premium = document.getElementById("plano_premium");
            for (let i = 0; i < medicos.length; i++) {
                if (Number(medicos[i].crm) == user_id) {
                    nome.innerHTML = "<span>Nome: </span>" + medicos[i].nome;
                    idade.style.display = "none";
                    especialidade.innerHTML = "<span>Especialidade: </span>" + medicos[i].especialidade;
                    crm.innerHTML = "<span>CRM: </span>" + medicos[i].crm;
                    if (medicos[i].planoDeSaude == "Não possui") {
                        plano_essencial.style.display = "none";
                        plano_plus.style.display = "none";
                        plano_premium.style.display = "none";
                    } else if (medicos[i].planoDeSaude == "Essencial") {
                        nao_possui.style.display = "none";
                        plano_plus.style.display = "none";
                        plano_premium.style.display = "none";
                    } else if (medicos[i].planoDeSaude == "Plus") {
                        nao_possui.style.display = "none";
                        plano_essencial.style.display = "none";
                        plano_premium.style.display = "none";
                    } else if (medicos[i].planoDeSaude == "Plus") {
                        nao_possui.style.display = "none";
                        plano_essencial.style.display = "none";
                        plano_plus.style.display = "none";
                    }
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
atualizar_informacoes();

let excluir_conta_element = document.getElementById("excluir_conta");
function excluir_conta() {
    let data = {
        "id": user_id,
        "is_medico": user_is_doc
    }
    fetch(`${url}/excluir-conta`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    perfil_sair();
}
excluir_conta_element.addEventListener("click", excluir_conta);

let alterar_senha_button = document.getElementById("alterar_senha_button");
function alterar_senha() {
    if (!user_is_doc) {
        fetch(`${url}/get-usuarios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(usuarios => {
            let error = document.getElementById("error");
            let senha_atual = document.getElementById("senha_atual");
            let nova_senha = document.getElementById("nova_senha");
            let confirmar_senha = document.getElementById("confirmar_senha");
            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i].id == user_id) {
                    let usuario = usuarios[i];
                    if (senha_atual.value == "" || nova_senha.value == "" || confirmar_senha.value == "") {
                        error.style.display = "flex";
                        error.style.color = "#E76767";
                        error.innerText = "Por favor, digite uma senha.";
                    } else if (senha_atual.value != usuario.senha) {
                        error.style.display = "flex";
                        error.style.color = "#E76767";
                        error.innerText = "Senha incorreta. Tente novamente.";
                    }
                    else if (nova_senha.value != confirmar_senha.value) {
                        error.style.display = "flex";
                        error.style.color = "#E76767";
                        error.innerText = "As senhas estão diferentes. Tente novamente.";
                    } else {
                        error.style.display = "flex";
                        error.style.color = "#2BA70C";
                        error.innerText = "Senha alterada com sucesso!";
                        let data = {
                            "id": user_id,
                            "is_medico": user_is_doc,
                            "nova_senha": nova_senha.value
                        }
                        fetch(`${url}/alterar-senha`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        });
                    }
                    senha_atual.value = "";
                    nova_senha.value = "";
                    confirmar_senha.value = "";
                }
                break;
            }
        })
    } else {
        fetch(`${url}/get-medicos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(medicos => {
            for (let i = 0; i < medicos.length; i++) {
                if (Number(medicos[i].crm) == user_id) {
                }
            }
        })
    }
}
alterar_senha_button.addEventListener("click", alterar_senha);