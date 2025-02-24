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
if (typeof user_id == String) {
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

if (user_id == null) {
    window.location.href = "/osakamed/login";
}

let dia_nenhum = document.getElementById("dia_nenhum");
let dia_livre = document.getElementById("dia_livre");
let dia_lotado = document.getElementById("dia_lotado");

let confirmar_agendamento = document.getElementById("confirmar_agendamento");
let nome_medico = document.getElementById("nome_medico");
let data = document.getElementById("data");
let especialidade = document.getElementById("especialidade");
let error = document.getElementById("error");
function dados_conferem(medicos, nome_medico, especialidade) {
    for (let i = 0; i < medicos.length; i++) {
        if (medicos[i].nome == nome_medico && medicos[i].especialidade == especialidade) {
            return true;
        }
    }
    return false;
}
function agendar_consulta() {
    fetch(`${url}/get-medicos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(medicos => {
        if (nome_medico.value == "" || data.value == "" || especialidade.value == "") {
            error.style.display = "flex";
            error.style.color = "#E76767";
            error.innerText = "Por favor, preencha todos os campos.";
            dia_nenhum.style.display = "block";
            dia_livre.style.display = "none";
            dia_lotado.style.display = "none";
        } else if (!dados_conferem(medicos, nome_medico.value, especialidade.value)) {
            error.style.display = "flex";
            error.style.color = "#E76767";
            error.innerText = "Os dados do médico não conferem ou não existem, por favor tente novamente.";
            dia_nenhum.style.display = "block";
            dia_livre.style.display = "none";
            dia_lotado.style.display = "none";
        } else {
            error.style.display = "flex";
            error.style.color = "#2BA70C";
            error.innerText = "Consulta agendada com sucesso!";
            let medico;
            for (let i = 0; i < medicos.length; i++) {
                if (medicos[i].nome == nome_medico.value && medicos[i].especialidade == especialidade.value) {
                    medico = medicos[i];
                }
            }
            let dados = {
                "idUser": user_id,
                "crm": medico.crm,
                "data": data.value,
                "status": "aguardando"
            }
            fetch(`${url}/add-consulta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
            consultasNoDia = 0;
            for (let i = 0; i < medico.consultas.length; i++) {
                if (medico.consultas[i].data == data.value) {
                    consultasNoDia++;
                }
            }
            if (consultasNoDia < 4) {
                dia_nenhum.style.display = "none";
                dia_livre.style.display = "block";
                dia_lotado.style.display = "none";
            } else {
                dia_nenhum.style.display = "none";
                dia_livre.style.display = "none";
                dia_lotado.style.display = "block";
            }
        }
    })
}
confirmar_agendamento.addEventListener("click", agendar_consulta);