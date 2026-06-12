// objetos da página
const mycanvas = document.getElementById("mycanvas")
const ctx = mycanvas.getContext("2d")
const progressMeter = document.getElementById("loaderProgress")

// configurações do jogo
const fundosCenarios = [
    "acarta/imagens/casa2.png",
    "acarta/imagens/casa.png",
    "acarta/imagens/casa2.png",
    "acarta/imagens/casa2.png",
]
const cenarios = [
]
const floor = 423
const mario = {
    image: null
}

// inicializar o jogo
loadGame().then( () => {
    console.log(cenarios)
    let sceneId = 0
    loadScene(sceneId)
})
initMainActor()

// eventos
addEventListener("keyup", (ev) => {
    console.log(ev.code)
    
    if (ev.code === "ArrowRight") {
        if (sceneId < 3) sceneId = sceneId + 1
    }
    else if (ev.code === "ArrowLeft") {
        if (sceneId > 0) sceneId = sceneId -1
    }

    loadScene(sceneId)
})

mycanvas.addEventListener("click", (ev) => {
    const bound = mycanvas.getBoundingClientRect() 
    const x = ev.clientX - bound.left
    const y = ev.clientY - bound.top
    console.log(x + " x " + y)
    ctx.drawImage(mario.image, x, y)
})
/////////////////////////////////////////////////

async function loadGame() {
    // inicializa cenários
    fundosCenarios.forEach(url => {
        const cenario = {
            image: new Image()
        }
        cenario.image.src = url
        cenario.image.onload = () => {
            cenarios.push(cenario)
            progressMeter.value += 0.1
        }
    }); 

    // inicializa atores
    mario.image = new Image()
    mario.image.src = "/acarta/imagens/supermario.png"
    mario.image.onload = () => {
        progressMeter.value = 1
    }
}

/**
 * inicializa o cenário pretendido
 * @param {int} id 
 */
function loadScene(id) {
    console.log(cenarios[id].image)
    ctx.drawImage(cenarios[id].image, 0, 0)
}

function initMainActor() {
    
}


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

