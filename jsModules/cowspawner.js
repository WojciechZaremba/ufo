import { cowContainer, stolenCows, stolenLamas, stolenCamels, stolenElephants } from "../app.js"

//const cows = document.getElementsByClassName("cow")
const overpopulation = document.querySelector("#overpopulation")
const populationBar = document.querySelector("#populationBar")

function test() {
    console.log(cows)
}

//window.cows = cows

let cowPosMap = []

let interval = 100
let start = setInterval(cowSpawner, interval)
let decreaseInterval = 0.9

let cowCounter = 0
let fiftyCows = false

const cowsLimit = 70

function cowSpawner() {
    const xPos = Math.floor(Math.random() * (game.offsetWidth - 40))
    const yPos = Math.floor(Math.random() * game.offsetHeight / 4 + game.offsetHeight * 0.8) - 70
    
    let randomAnimal = ""
    const draw = Math.floor(Math.random()*1000)

    if (draw<900) {
        randomAnimal = "🐄"
    } else if (draw<980) {
        randomAnimal = "🦙"
    } else if (draw<995) {
        randomAnimal = "&#x1F42B"
    } else {
        randomAnimal = "🐘"
    }

    const newCow = document.createElement("div")
    const newShadow = document.createElement("div")
    newCow.innerHTML = randomAnimal
    newCow.classList.add("cow")
    newCow.setAttribute("data-cowNum", cowCounter)
    newCow.style.top = `${yPos}px`
    newCow.style.left = `${xPos}px`
    newCow.style.zIndex = `${yPos}`
    cowContainer.appendChild(newCow)

    newShadow.innerHTML = ""
    newShadow.classList.add("shadow")
    newShadow.setAttribute("data-shadowNum", cowCounter)
    newShadow.style.top = `${yPos+38}px`
    newShadow.style.left = `${xPos-2}px`
    newShadow.style.zIndex = `-2`
    cowContainer.appendChild(newShadow)

    // the way below breaks transition animation and transitionend event
    // cowContainer.innerHTML += `<div class="cow camel" style="top: ${yPos}px; left: ${xPos}px" data-cowNum="${cowCounter}">🐄</div>`

    cowCounter += 1

    cowPosMap.push([xPos, yPos])

    if (cowContainer.children.length > 50 && !fiftyCows) {
        fiftyCows = true
        interval = 2500
        decreaseInterval = 0.99
    }

    if (cowContainer.children.length > cowsLimit) {
        clearInterval(start)
        // cowContainer.innerHTML = ""
        // interval = 1500
        // cowCounter = 0
        // cowPosMap = []
        // setTimeout(()=>{

            alert(`GAME OVER cows: ${stolenCows}, lamas:${stolenLamas}, camels: ${stolenCamels}, elephants: ${stolenElephants}`)
            location.reload()
        // }, 16)
    }
    // if (interval < 2000) {decreaseInterval = 0.95}
    // if (interval < 1200) {decreaseInterval = 0.99}
    if (interval < 800) {decreaseInterval = 0.999}
    clearInterval(start)
    interval = interval*decreaseInterval
    start = setInterval(cowSpawner, interval)
    //console.log(interval)

    handleBar()
}

function handleBar() {
    const numberOfCows = cowContainer.children.length
    const populationRatio = numberOfCows/cowsLimit

    const barMaxLength = overpopulation.offsetWidth

    const barLength = Math.floor(barMaxLength*populationRatio)

    populationBar.style.width = `${barLength}px`
}

function stopSpawning() {
    clearInterval(start)
    console.log(overpopulation)
}

window.overpopulation = overpopulation
window.populationBar = populationBar
window.interval = interval
window.stopSpawning = stopSpawning

export {test, cowSpawner, cowPosMap, handleBar}
