const loading = document.getElementById("loading")
const mycanvas = document.getElementById("mycanvas")
const ctx = mycanvas.getContext("2d")
const floor = 440
const passos = 10

const stage = {
    scene: null,
    actors: [

    ]
}

const scenes = {
    casa: {
        id: 'casa',
        sprite: "acarta/imagens/casa2.png",
        image: null,
        floor: 440,
    },
    casa2: {
        id: 'casa2',
        sprite: "acarta/imagens/casa.png",
        image: null
    }
}
const actors = {
    mario: {
        sprite: "/acarta/imagens/supermario.png",
        image: null,
        x: 300,
        newx: 300,
        updatePos: () => {
            if (actors.mario.newx > actors.mario.x) {
                const diff = actors.mario.newx - actors.mario.x
                if (diff > passos) {
                    actors.mario.x = actors.mario.x + passos
                } else {
                    actors.mario.x = actors.mario.x + diff
                }
            } else {
                const diff = actors.mario.x - actors.mario.newx
                if (diff > passos) {
                    actors.mario.x = actors.mario.x - passos
                } else {
                    actors.mario.x = actors.mario.x - diff
                }
            }
        }
    }
}

async function inicializar() {
    const bound = mycanvas.getBoundingClientRect() 
    // init scenes
    scenes.casa.image = new Image()
    scenes.casa.image.src = scenes.casa.sprite
    await scenes.casa.image.decode()
    scenes.casa2.image = new Image()
    scenes.casa2.image.src = scenes.casa2.sprite
    await scenes.casa2.image.decode()
    // init actors
    actors.mario.image = new Image()
    actors.mario.image.src = actors.mario.sprite
    await actors.mario.image.decode()
    // init stage
    stage.scene = scenes.casa
    stage.actors.push(actors.mario)
    
    actors.mario.scenePos = bound.width / 2 - actors.mario.image.width / 2  // initial position middle of scene
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

async function actorToScene(actor) {
    actorTo(actor, actor.scenePos)
}
async function actorTo(actor, x) {
    // update actor current position
    actor.x = x
    // update scene
    const y = floor - actors.mario.image.height
    loadSceneByKey(sceneKey)
    ctx.drawImage(actor.image, x, y)
}

async function actorMoveTo(actor, x) {
    while (actor.x !== x) {
        let newpos = -1 
        if (actor.x > x) {
            newpos = (actor.x - x) / 2 + x
        } else {
            newpos = actor, (x - actor.x) / 2 + actor.x
        }
        console.log(newpos)
        await actorTo(actor, newpos)
        await delay(500)
    }
}

mycanvas.addEventListener("click", (ev) => {
    const bound = mycanvas.getBoundingClientRect() 
    const x = ev.clientX - bound.left
    stage.actors[0].newx = x
})

/** renderiza o palco */
function renderStage() {
    // render cenário
    ctx.drawImage(stage.scene.image, 0, 0)
    // atualiza atores
    stage.actors.forEach( actor => {
        actor.updatePos()
    })
    // render atores
    stage.actors.forEach( actor => {
        ctx.drawImage(actor.image, actor.x, stage.scene.floor - actor.image.height)
    })
}

function loop() {
   console.log('loop: ' + Date.now()) 
   // render stage
   renderStage()
   // update actors
   setTimeout(loop, 40)
}

let sceneKey = 0
inicializar().then( () => {
    console.log("Loading...")
    loop() 
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

