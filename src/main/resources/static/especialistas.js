const url = 'http://localhost:8080/api/osakamed';

let medicos_display = document.getElementById("medicos_display");

async function get_medicos() {
    const response = await fetch(`${url}/get-medicos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
    }});
    const json = await response.json();
    return json;
}
function atualizar_medicos(medicos) {
    medicos_display.innerHTML = "";
    for (let i = 0; i < medicos.length; i++) {
        let medico = medicos[i];
        medicos_display.innerHTML += `
                        <div class="medico">
                            <div class="imagem">
                                <img src="/assets/perfil_padrao_medico.png" alt="">
                                <div></div>
                            </div>
                            <div class="dados">
                                <p>${medico.nome}</p>
                                <p>Plano: ${medico.planoDeSaude}</p>
                                <p>${medico.especialidade}</p>
                            </div>
                        </div>`;
    }
}
get_medicos().then(medicos => {
    atualizar_medicos(medicos);
});

async function selecionar_medicos(nome, especialidade, plano) {
    console.log(nome);
    console.log(especialidade);
    console.log(plano);
    const medicos = await get_medicos();
    let medicos_selecionados = [];
    for (let i = 0; i < medicos.length; i++) {
        let medico = medicos[i];
        if ((medico.nome.startsWith(nome) || nome == "Todos")
            && (medico.especialidade == especialidade || especialidade == "Todas")
            && (medico.planoDeSaude == plano || plano == "Todos")) {
            medicos_selecionados.push(medico);
        }
    }
    return medicos_selecionados;
}
let nome_selecionado = "Todos";
let especialidade_selecionada = "Todas";
let plano_selecionado = "Todos";
let especialidade_seletor = document.getElementById("especialidade_seletor");
let elements_especialidade = especialidade_seletor.children;
for (let i = 1; i < elements_especialidade.length; i++) {
    elements_especialidade[i].addEventListener("click", function() {
        setTimeout(() => {
            especialidade_selecionada = elements_especialidade[0].innerText;
            selecionar_medicos(nome_selecionado, especialidade_selecionada, plano_selecionado).then(medicos => {
                atualizar_medicos(medicos);
            })
        }, 1);
    })
}
let plano_seletor = document.getElementById("plano_seletor");
let elements_plano = plano_seletor.children;
for (let i = 1; i < elements_plano.length; i++) {
    elements_plano[i].addEventListener("click", function() {
        setTimeout(() => {
            plano_selecionado = elements_plano[0].innerText;
            selecionar_medicos(nome_selecionado, especialidade_selecionada, plano_selecionado).then(medicos => {
                atualizar_medicos(medicos);
            })
        }, 1);
    })
}
let nome_seletor = document.getElementById("nome_seletor");
nome_seletor.addEventListener("keyup", function() {
    setTimeout(() => {
        nome_selecionado = nome_seletor.value;
        selecionar_medicos(nome_selecionado, especialidade_selecionada, plano_selecionado).then(medicos => {
            atualizar_medicos(medicos);
        })
    }, 1);
})