const loading = document.getElementById("loading")
const mycanvas = document.getElementById("mycanvas")
const ctx = mycanvas.getContext("2d")

const scenes = {
    casa: {
        id: 'casa',
        sprite: "acarta/imagens/casa2.png",
        image: null
    },
    casa2: {
        id: 'casa2',
        sprite: "acarta/imagens/casa2.png",
        image: null
    }
}
const actors = {
    mickey: {
        sprite: "/acarta/imagens/supermario.png",
        image: null
    }
}

async function inicializar() {
    // init scenes
    scenes.casa.image = new Image()
    scenes.casa.image.src = scenes.casa.sprite
    await scenes.casa.image.decode()
    scenes.casa2.image = new Image()
    scenes.casa2.image.src = scenes.casa2.sprite
    await scenes.casa2.image.decode()
    // init actors
    actors.mickey.image = new Image()
    actors.mickey.image.src = actors.mickey.sprite
    await actors.mickey.image.decode() 
    loading.style.display = "none"
    mycanvas.style.display = "block"
}

async function loadSceneByKey(key) {
    const scene = scenes[Object.keys(scenes)[sceneKey]]
    await loadScene(scene) 
}
async function loadScene(scene) {
    ctx.drawImage(scene.image, 0, 0)
}

addEventListener("keyup", (ev) => {
    console.log(ev.code)
    
    if (ev.code === "ArrowRight") {
        if (sceneKey < 2) sceneKey = sceneKey + 1
    }
    else if (ev.code === "ArrowLeft") {
        if (sceneKey > 0) sceneKey = sceneKey -1
    }

    loadSceneByKey(sceneKey)
})

mycanvas.addEventListener("click", (ev) => {
    const bound = mycanvas.getBoundingClientRect() 
    const x = ev.clientX - bound.left
    const y = ev.clientY - bound.top
    console.log(x + " x " + y)
    
    loadSceneByKey(sceneKey)
    ctx.drawImage(actors.mickey.image, x, y)
})


let sceneKey = 0
inicializar().then( () => {
    console.log("carregar fundo")
    loadSceneByKey(sceneKey)
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

