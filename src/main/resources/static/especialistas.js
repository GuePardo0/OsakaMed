const url = 'http://localhost:8080/api/osakamed';

let medicos_display = document.getElementById("medicos_display");

function atualizar_medicos() {
    fetch(`${url}/getmedicos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(medicos => {
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
    })
}
atualizar_medicos();