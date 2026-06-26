const canvas = document.getElementById("mycanvas")
const ctx = canvas.getContext("2d")

export default {
    canvas: canvas,
    ctx: ctx,
    floor: 440,
    step_distance: 10,  // distancia dos passos dos atores em pixeis
}