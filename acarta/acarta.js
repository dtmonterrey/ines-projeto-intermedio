const mycanvas = document.getElementById("mycanvas")
const ctx = mycanvas.getContext("2d")

const scenes = [
    "acarta/imagens/casa2.png",
    "acarta/imagens/casa.png",
    "acarta/imagens/casa2.png",
    "acarta/imagens/casa2.png",
]

function loadScene(id) {
    const cenario = new Image()
    cenario.src = scenes[id]
    cenario.onload = () => {
        ctx.drawImage(cenario, 0, 0)
    }
}

let sceneId = 0
loadScene(sceneId)

addEventListener("keyup", (ev) => {
    if (sceneId < 3) sceneId = sceneId + 1
    loadScene(sceneId)
})






function hitbox() {

}



function interacao1() {

}

function interacao2() {

}

function interacao3() {

}

function interacao4() {

}

function interacao5() {

}

function interacao6() {

}

function interacao7() {

}

function interacao8() {

}

function interacao9() {

}

function interacaolivro() {

}

