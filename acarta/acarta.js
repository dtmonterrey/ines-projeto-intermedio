import globals from './globals.js'

const loading = document.getElementById("loading")
const progress = document.getElementById("progress")
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
        actors: [],
    },
    quarto: {
        id: 'quarto',
        sprite: "acarta/imagens/quarto2.png",
        image: null,
        left: false,
        right: false,
        actors: [],
    },
    cave: {
        id: 'cave',
        sprite: "acarta/imagens/cave2.png",
        image: null,
        left: false,
        right: false,
        actors: [],
    },
    escola: {
        id: 'escola',
        sprite: "acarta/imagens/escola2.png",
        image: null,
        left: false,
        right: false,
        actors: [],
    },
    biblioteca: {
        id: 'biblioteca',
        sprite: 'acarta/imagens/biblioteca2.png',
        image: null,
        left: false,
        right: false,
        actors: [],
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
    },
    barbara: {
        id: 'barbara',
        sprite: "/acarta/imagens/barbara2.png",
        image: null,
        x: 200,
        y: 300,
    },
    boneca: {
        id: 'boneca',
        sprite: "/acarta/imagens/boneca2.png",
        image: null,
        x: 200,
        y: 300,
    },
    felix: {
        id: 'felix',
        sprite: "/acarta/imagens/felix2.png",
        image: null,
        x: 200,
        y: 300,
    },
    hugo: {
        id: 'hugo',
        sprite: "/acarta/imagens/hugo2.png",
        image: null,
        x: 200,
        y: 300,
    },
}

async function inicializar() {
    const bound = mycanvas.getBoundingClientRect() 
    // init scenes
    scenes.casa.image = new Image()
    scenes.casa.image.src = scenes.casa.sprite
    scenes.casa.left = scenes.escola
    scenes.casa.right = scenes.quarto
    scenes.casa.actors = [actors.barbara] 
    await scenes.casa.image.decode()
    loading.innerHTML = 'A carregar 10%'
    progress.value = .1 
    scenes.quarto.image = new Image()
    scenes.quarto.image.src = scenes.quarto.sprite
    scenes.quarto.left = scenes.casa
    scenes.quarto.right = scenes.cave
    scenes.quarto.actors = [actors.boneca] 
    await scenes.quarto.image.decode()
    loading.innerHTML = 'A carregar 20%'
    progress.value = .2 
    scenes.cave.image = new Image()
    scenes.cave.image.src = scenes.cave.sprite
    scenes.cave.left = scenes.casa
    scenes.cave.actors = [actors.felix] 
    await scenes.cave.image.decode()
    loading.innerHTML = 'A carregar 30%'
    progress.value = .3 
    scenes.escola.image = new Image()
    scenes.escola.image.src = scenes.escola.sprite
    scenes.escola.left = scenes.biblioteca
    scenes.escola.right = scenes.casa
    scenes.escola.actors = [actors.hugo] 
    await scenes.escola.image.decode()
    loading.innerHTML = 'A carregar 40%'
    progress.value = .4 
    scenes.biblioteca.image = new Image()
    scenes.biblioteca.image.src = scenes.biblioteca.sprite
    scenes.biblioteca.right = scenes.escola
    scenes.biblioteca.actors = [actors.barbara] 
    await scenes.biblioteca.image.decode()
    loading.innerHTML = 'A carregar 50%'
    progress.value = .5 
    // init actors
    actors.mario.image = new Image()
    actors.mario.image.src = actors.mario.sprite
    await actors.mario.image.decode() 
    loading.innerHTML = 'A carregar 60%'
    progress.value = .6 
    actors.mario.x = bound.width / 2 - actors.mario.image.width / 2  // initial position middle of scene
    actors.mario.sety(floor)
    actors.barbara.image = new Image()
    actors.barbara.image.src = actors.barbara.sprite
    await actors.barbara.image.decode() 
    loading.innerHTML = 'A carregar 70%'
    progress.value = .7 
    actors.boneca.image = new Image()
    actors.boneca.image.src = actors.boneca.sprite
    await actors.boneca.image.decode() 
    loading.innerHTML = 'A carregar 80%'
    progress.value = .8 
    actors.felix.image = new Image()
    actors.felix.image.src = actors.felix.sprite
    await actors.felix.image.decode() 
    loading.innerHTML = 'A carregar 90%'
    progress.value = .9 
    actors.hugo.image = new Image()
    actors.hugo.image.src = actors.hugo.sprite
    await actors.hugo.image.decode() 
    loading.innerHTML = 'A carregar 100%'
    progress.value = 1
    
    // finish
    stage.scene = scenes.casa
    stage.actors.push(actors.mario)
    renderStage() 
    loading.style.display = "none"
    progress.style.display = "none"
    mycanvas.style.display = "block"
}

mycanvas.addEventListener("click", (ev) => {
    const bound = mycanvas.getBoundingClientRect() 
    const x = ev.clientX - bound.left
    actors.mario.goto = {
        x: x,
        y: actors.mario.y
    }    
})

/** renderiza o palco */
function renderStage() {
    // console.log('rendering scene: ' + stage.scene.id)
    ctx.drawImage(stage.scene.image, 0, 0)
    // render secondary actors for scene
    stage.scene.actors.forEach( (actor) => {
        // console.log('rendering actor ' + actor.id + ` at (${actor.x}, ${actor.y}) goto ` + (actor.goto ? `(${actor.goto.x}, ${actor.goto.y})` : 'false')) 
        ctx.drawImage(actor.image, actor.x, actor.y)
    }) 
    // render main actor
    ctx.drawImage(actors.mario.image, actors.mario.x, actors.mario.y)
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
