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

// realizar consulta popup
let realizar_popup_shadow = document.getElementById("realizar_popup_shadow");
let realizar_popup_box = document.getElementById("realizar_popup_box");
let realizar_popup_element = document.getElementById("realizar_popup");
let html = document.getElementsByTagName("html")[0];
let realizar_popup_aberto = false;
realizar_popup_shadow.classList.add("inactive");
realizar_popup_box.classList.add("inactive");
let id_consulta_global;
let index_consulta_element_global;
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
let descricao = document.getElementById("descricao");
let enviar_descricao = document.getElementById("enviar_descricao");
enviar_descricao.addEventListener("click", function() {
    let data = {
        "descricao": descricao.value,
        "id_consulta": id_consulta_global
    }
    fetch(`${url}/enviar-descricao-consulta`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    let consulta = document.getElementsByClassName("consulta");
    consulta[index_consulta_element_global].remove();
    realizar_popup();
});
function ajustar_botoes() {
    let realizar_popup_botao = document.getElementsByClassName("realizar_popup_botao");
    for (let i = 0; i < realizar_popup_botao.length; i++) {
        realizar_popup_botao[i].addEventListener("click", function() {
            realizar_popup();
            id_consulta_global = Number(realizar_popup_botao[i].dataset.consultaid);
            index_consulta_element_global = i;
        });
    }
}
realizar_popup_box.addEventListener("click", realizar_popup);
realizar_popup_element.addEventListener("click", realizar_popup);

let consultas_display = document.getElementById("consultas_display");
function atualizar_consultas() {
    fetch(`${url}/get-medicos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(medicos => {
        let medico;
        for (let i = 0; i < medicos.length; i++) {
            if (Number(medicos[i].crm) == user_id) {
                medico = medicos[i];
                break;
            }
        }
        for (let i = 0; i < medico.consultas.length; i++) {
            let consulta = medico.consultas[i];
            let mes = `${data_atual.getMonth() + 1}`;
            if (mes.length == 1) {
                mes = "0" + mes;
            }
            if (consulta.data == `${data_atual.getFullYear()}-${mes}-${data_atual.getDate()}`) {
                fetch(`${url}/get-usuarios`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(usuarios => {
                    let usuario;
                    for (let j = 0; j < usuarios.length; j++) {
                        if (usuarios[j].id == consulta.idUser) {
                            usuario = usuarios[j];
                            break;
                        }
                    }
                    consultas_display.innerHTML +=`
                    <div class="consulta">
                        <div class="imagem">
                            <img src="/assets/perfil_padrao_user.png" alt="">
                            <div></div>
                        </div>
                        <div class="dados">
                            <p>${usuario.nome}</p>
                            <p></p>
                            <p>${usuario.idade}</p>
                            <p>${usuario.planoDeSaude}</p>
                        </div>
                        <div class="realizar_consulta_div">
                            <button data-consultaid="${consulta.id}" class="realizar_popup_botao button">
                                <p>Realizar Consulta</p>
                            </button>
                        </div>
                    </div>`;
                })
            }
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