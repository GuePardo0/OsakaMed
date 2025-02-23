let drop_down_elements = document.getElementsByClassName("drop_down");
let drop_down_abertos = [];
for (let index = 0; index < drop_down_elements.length; index++) {
    drop_down_abertos.push(false);
}

function drop_down(index) {
    let elements = drop_down_elements[index].children;
    if (drop_down_abertos[index]) {
        drop_down_abertos[index] = false;
        elements[0].style = "border-radius: 7px 7px 7px 7px;";
        elements[0].children[1].style = "transform: rotate(180deg);";
        for (let i = 1; i < elements.length; i++) {
            elements[i].style.display = "none";
        }
    } else {
        drop_down_abertos[index] = true;
        elements[0].style = "border-radius: 7px 7px 0 0;";
        elements[0].children[1].style = "transform: rotate(0deg);";
        let past0 = false;
        for (let i = 1; i < elements.length; i++) {
            elements[i].style.top = `${i*30}px`;
            if (elements[i].dataset.id == "0") {
                if (drop_down_elements[index].dataset.removefirstelement == "true") {
                    elements[i].style.display = "none";
                    past0 = true;
                } else {
                    elements[i].style.display = "flex";
                }
            } else {
                elements[i].style.display = "flex";
                if (past0) {
                    elements[i].style.top = `${(i-1)*30}px`;
                } else {
                    elements[i].style.top = `${i*30}px`;
                }
            }
        }
    }
}

function ajustar_ativadores() {
    let drop_down_ativadores = document.getElementsByClassName("drop_down_ativador");
    for (let index = 0; index < drop_down_elements.length; index++) {
        drop_down_ativadores[index].addEventListener("click", function() {
            drop_down(index);
        });
    }
}
ajustar_ativadores();

function reset_drop_down(index) {
    let elements = drop_down_elements[index].children;
    for (let i = 0; i < elements.length; i++) {
        if (`${i}` != elements[i].dataset.id) {
            let text_buffer = null;
            let id_buffer = null;
            for (let j = 0; j < elements.length; j++) {
                if (`${j}` == elements[i].dataset.id) {
                    text_buffer = elements[j].innerText;
                    id_buffer = elements[j].dataset.id;
                    elements[j].children[0].innerHTML = elements[i].innerText;
                    elements[j].dataset.id = elements[i].dataset.id;
                    elements[i].children[0].innerHTML = text_buffer;
                    elements[i].dataset.id = id_buffer;
                    break;
                }
            }
        }
    }
}
function change_ativador(index, item) {
    let elements = drop_down_elements[index].children;
    let text_buffer = elements[item].innerText;
    let id_buffer = elements[item].dataset.id;
    elements[item].children[0].innerHTML = elements[0].innerText;
    elements[item].dataset.id = elements[0].dataset.id;
    elements[0].children[0].innerHTML = text_buffer;
    elements[0].dataset.id = id_buffer;
    let past0 = false;
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].dataset.id == "0") {
            if (drop_down_elements[index].dataset.removefirstelement == "true") {
                elements[i].style.display = "none";
                past0 = true;
            } else {
                elements[i].style.display = "flex";
            }
        } else {
            elements[i].style.display = "flex";
            if (past0) {
                elements[i].style.top = `${(i-1)*30}px`;
            } else {
                elements[i].style.top = `${i*30}px`;
            }
        }
        if (i == elements.length - 2 && elements[i+1].dataset.id == "0" && drop_down_elements[index].dataset.removefirstelement == "true" || i == elements.length - 1) {
            elements[i].style.borderRadius = "0 0 7px 7px";
        } else if (i != 0) {
            elements[i].style.borderRadius = "0 0 0 0";
        }
    }
}
for (let index = 0; index < drop_down_elements.length; index++) {
    let elements = drop_down_elements[index].children;
    for (let i = 1; i < elements.length; i++) {
        elements[i].addEventListener("click", function() {
            if (elements[i].dataset.id != "0") {
                reset_drop_down(index);
                change_ativador(index, i);
            } else {
                reset_drop_down(index);
            }
        });
    }
}