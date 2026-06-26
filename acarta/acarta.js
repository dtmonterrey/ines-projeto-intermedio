import globals from './globals.js'

const loading = document.getElementById("loading")
const mycanvas = globals.canvas
const ctx = globals.ctx
const step_distance = globals.step_distance
const floor = globals.floor

const stage = {
    scene: null,
    actors: [],
}
const scenes = {
    casa: {
        id: 'casa',
        sprite: "acarta/imagens/casa2.png",
        image: null,
        left: false,
        right: false,
    },
    cave: {
        id: 'cave',
        sprite: "acarta/imagens/cave2.png",
        image: null,
        left: false,
        right: false,
    },
    escola: {
        id: 'escola',
        sprite: "acarta/imagens/escola2.png",
        image: null,
        left: false,
        right: false,
    },
    biblioteca: {
        id: 'biblioteca',
        sprite: 'acarta/imagens/biblioteca2.png',
        image: null,
        left: false,
        right: false,
    },
}
const actors = {
    mario: {
        id: 'mario', 
        sprite: "/acarta/imagens/supermario.png",
        image: null,
        x: 0,
        y: 0,
        sety: (y) => {
            actors.mario.y = y - actors.mario.image.height
        },
        goto: false,
        react: () => {
            // verificar se temos de mover
            if (actors.mario.goto) {
                const distance = actors.mario.x - actors.mario.goto.x
                if (Math.abs(distance) < step_distance) {
                    // ator está a menos de um step do destino, mudar para lá
                    actors.mario.x = actors.mario.goto.x
                    actors.mario.goto = false
                } else if (distance > 0) {
                    // mover ator um step para a direita
                    actors.mario.x -= step_distance
                } else {
                    // mover ator um step para a esquerda
                    actors.mario.x += step_distance
                }
            } 
            // verificar se saimos do cenario
            if (actors.mario.x < 40 && stage.scene.left) {
                stage.scene = stage.scene.left
                actors.mario.x = 600
                actors.mario.goto = false
            }
            if (actors.mario.x > 600 && stage.scene.right) {
                stage.scene = stage.scene.right
                actors.mario.x = 40
                actors.mario.goto = false
            } 
        }
    }
}

async function inicializar() {
    const bound = mycanvas.getBoundingClientRect() 
    // init scenes
    scenes.casa.image = new Image()
    scenes.casa.image.src = scenes.casa.sprite
    scenes.casa.left = scenes.escola
    scenes.casa.right = scenes.cave
    await scenes.casa.image.decode()
    scenes.cave.image = new Image()
    scenes.cave.image.src = scenes.cave.sprite
    scenes.cave.left = scenes.casa
    await scenes.cave.image.decode()
    scenes.escola.image = new Image()
    scenes.escola.image.src = scenes.escola.sprite
    scenes.escola.left = scenes.biblioteca
    scenes.escola.right = scenes.casa
    await scenes.escola.image.decode()
    scenes.biblioteca.image = new Image()
    scenes.biblioteca.image.src = scenes.biblioteca.sprite
    scenes.biblioteca.right = scenes.escola
    await scenes.biblioteca.image.decode()
    // init actors
    actors.mario.image = new Image()
    actors.mario.image.src = actors.mario.sprite
    await actors.mario.image.decode() 
    actors.mario.x = bound.width / 2 - actors.mario.image.width / 2  // initial position middle of scene
    actors.mario.sety(floor)
    stage.scene = scenes.casa
    stage.actors.push(actors.mario)
    renderStage() 
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
        await actorTo(actor, newpos)
    }
}
mycanvas.addEventListener("click", (ev) => {
    const bound = mycanvas.getBoundingClientRect() 
    const x = ev.clientX - bound.left
    actors.mario.goto = {
        x: x,
        y: actors.mario.y
    }    
})

function renderStage() {
    // console.log('rendering scene: ' + stage.scene.id)
    ctx.drawImage(stage.scene.image, 0, 0)
    stage.actors.forEach( (actor) => {
        // console.log('rendering actor ' + actor.id + ` at (${actor.x}, ${actor.y}) goto ` + (actor.goto ? `(${actor.goto.x}, ${actor.goto.y})` : 'false')) 
        ctx.drawImage(actor.image, actor.x, actor.y)
    }) 
}

function loop() {
    // console.log('loop: ' + Date.now())
    // render stage
    renderStage() 
    // update actors
    stage.actors.forEach( (actor) => {
        actor.react()
    })
    setTimeout(loop, 50)
}

let sceneKey = 0
inicializar().then( () => {
    console.log("Loading...")
    // actorToScene(actors.mario)
    loop() 
})
