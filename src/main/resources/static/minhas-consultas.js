const url = 'http://localhost:8080/api/osakamed';
const data_atual = new Date();

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

// avaliar consulta popup
let avaliar_popup_shadow = document.getElementById("avaliar_popup_shadow");
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
avaliar_popup_box.addEventListener("click", avaliar_popup);
avaliar_popup_element.addEventListener("click", avaliar_popup);

// descricao consulta popup
let descricao_popup_shadow = document.getElementById("descricao_popup_shadow");
let descricao_popup_box = document.getElementById("descricao_popup_box");
let descricao_popup_element = document.getElementById("descricao_popup");
let descricao_popup_aberto = false;
descricao_popup_shadow.classList.add("inactive");
descricao_popup_box.classList.add("inactive");

let descricao = document.getElementById("descricao");
let nome_do_medico = document.getElementById("nome_do_medico");
function descricao_popup(descricao_texto, nome_do_medico_texto) {
    if (descricao_texto != null) {
        descricao.value = descricao_texto;
    }
    if (nome_do_medico_texto != null) {
        nome_do_medico.innerText = `Descrição de: ${nome_do_medico_texto}`;
    }
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
descricao_popup_box.addEventListener("click", function() {
    descricao_popup(null);
});
descricao_popup_element.addEventListener("click", function() {
    descricao_popup(null);
});
function ajustar_botoes() {
    let avaliar_popup_botao = document.getElementsByClassName("avaliar_popup_botao");
    for (let i = 0; i < avaliar_popup_botao.length; i++) {
        avaliar_popup_botao[i].addEventListener("click", function() {
            avaliar_popup();
        });
    }
    let descricao_popup_botao = document.getElementsByClassName("descricao_popup_botao");
    for (let i = 0; i < descricao_popup_botao.length; i++) {
        descricao_popup_botao[i].addEventListener("click", function() {
            fetch(`${url}/get-consultas`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(consultas => {
                for (let j = 0; j < consultas.length; j++) {
                    if (consultas[j].id == descricao_popup_botao[i].dataset.consultaid) {
                        fetch(`${url}/get-medicos`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => response.json())
                        .then(medicos => {
                            for (let k = 0; k < medicos.length; k++) {
                                if (medicos[k].crm == consultas[j].crm) {
                                    if (consultas[j].descricao == "null") {
                                        consultas[j].descricao = "";
                                    }
                                    descricao_popup(consultas[j].descricao, medicos[k].nome);
                                    break;
                                }
                            }
                        })
                        break;
                    }
                }
            })
        });
    }
}

let consultas_display = document.getElementById("consultas_display");
function atualizar_consultas() {
    fetch(`${url}/get-usuarios`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(usuarios => {
        let usuario;
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id == user_id) {
                usuario = usuarios[i];
                break;
            }
        }
        for (let i = 0; i < usuario.consultas.length; i++) {
            let consulta = usuario.consultas[i];
            fetch(`${url}/get-medicos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(medicos => {
                let medico;
                for (let j = 0; j < medicos.length; j++) {
                    if (medicos[j].crm == consulta.crm) {
                        medico = medicos[j];
                        break;
                    }
                }
                consultas_display.innerHTML +=`
                        <div class="consulta">
                            <div class="imagem">
                                <img src="/assets/perfil_padrao_medico.png" alt="">
                                <div></div>
                            </div>
                            <div class="dados">
                                <p>${medico.nome}</p>
                                <p>Data da consulta: ${consulta.data}</p>
                                <div class="botoes_div">
                                    <div></div>
                                    <button class="realizar_popup_botao button">
                                        <p>Pagar consulta</p>
                                    </button>
                                </div>
                                <p>${medico.especialidade}</p>
                                <p>Status: ${consulta.status}</p>
                                <div class="botoes_div">
                                    <button data-consultaid="${consulta.id}" class="descricao_popup_botao button">
                                        <p>Descição do médico</p>
                                    </button>
                                    <button class="avaliar_popup_botao button">
                                        <p>Avaliar consulta Cancelar consulta</p>
                                    </button>
                                </div>
                            </div>
                        </div>`;
            })
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
atualizar_consultas();
setTimeout(() => {
    ajustar_botoes();
}, 100);