import { test, cowSpawner, cowPosMap, handleBar } from "./jsModules/cowSpawner.js"
window.test = test
window.cowSpawner = cowSpawner
window.cowPosMap = cowPosMap


const body = document.querySelector("body")
const game = document.querySelector("#game")
const cowContainer = document.querySelector("#cowContainer")
const keys = document.querySelector("#keysBools")
const arrows = document.getElementsByClassName("arrow")
const infoPanel = document.querySelector("#infoPanel")
const ship = document.querySelector("#ship")
let cows = document.querySelectorAll(".cow")
let shadows = document.querySelectorAll(".shadow")
const camel = document.querySelector("#cow5")
const score = document.querySelector("#score")
const cowScore = score.querySelector("#co")
const lamaScore = score.querySelector("#la")
const camelScore = score.querySelector("#ca")
const elephantScore = score.querySelector("#el")

window.body = body
window.infoPanel = infoPanel

let shipMovement

const keysDown = {}

//both handler functions do the same
const handleKeyUp = function(e) {
    if (    e.key === "ArrowUp" 
        ||  e.key === "ArrowDown" 
        ||  e.key === "ArrowRight" 
        ||  e.key === "ArrowLeft"
        ||  e.key === " ") {
            //adds property (e.key) and value (true or false) to the object
            keysDown[e.key] = e.type == "keydown"
            keys.innerHTML = JSON.stringify(keysDown)
            highlightArrows(e.key)
            addAccel(e.key)
            beamToggler(e.key)
        }
}



let testInterval
let isTestOn = false


testInterval = setInterval(beamToggler, 500) // I can't find the way to turn this interval on and off by space(!), the method from acceleration function doesn't prevent from stacking intervals

// for some reason this function works best
function intervalTesting(pass) {
    if (pass === " ") {
        if (keysDown[pass]) {
            if (!isTestOn) { // prevents from spamming intervals
                testInterval = setInterval(testingIntervals, 500)
                isTestOn = true
            } else {
                clearInterval(testingIntervals)
                isTestOn = false;
            }
        }
    }
}

function testingIntervals() {
    console.log("Testing Intervals left arrow")
 }







const handleKeyDown = handleKeyUp

//showing pressed keys 
const highlightArrows = function(pass) {
    const isDown = keysDown[pass]
    if (isDown) {
        arrows[pass].style.backgroundColor = "tomato"
    } else {
        arrows[pass].style.backgroundColor = ""
    }
}

const acceleration = {
            xAxis: 0,
            yAxis: 0
        }

// logic that increases X acceleration BAD; update: but it works
// actually output of this code is speed
let isXON = false;
let intervalX

let isXONdecrease = false;
let intervalXdecrease

let isYON = false;
let intervalY

let isYONdecrease = false;
let intervalYdecrease

let isBeamOn = false
let beamInterval

let intervalTime = 20;

function addAccel(pass) {
    if (pass === "ArrowRight") {
        if (keysDown[pass]) {
            // if in if is for a logical purpose (&& would lead to else when not supposed to)
            if (!isXON) {
                intervalX = setInterval(addX, intervalTime)
                isXON = true
            }
        } else {
            clearInterval(intervalX)
            //acceleration.xAxis = 0
            isXON = false;
        }
    }
    if (pass === "ArrowLeft") {
        if (keysDown[pass]) {
            if (!isXONdecrease) {
                intervalXdecrease = setInterval(subtractX, intervalTime)
                isXONdecrease = true
            }
        } else {
            clearInterval(intervalXdecrease)
            //acceleration.xAxis = 0
            isXONdecrease = false;
        }
    }
    if (pass === "ArrowUp") {
        if (keysDown[pass]) {
            if (!isYON) {
                intervalY = setInterval(addY, intervalTime)
                isYON = true
            }
        } else {
            clearInterval(intervalY)
            //acceleration.xAxis = 0
            isYON = false;
        }
    }  
    if (pass === "ArrowDown") {
        if (keysDown[pass]) {
            if (!isYONdecrease) {
                intervalYdecrease = setInterval(subtractY, intervalTime)
                isYONdecrease = true
            }
        } else {
            clearInterval(intervalYdecrease)
            //acceleration.xAxis = 0
            isYONdecrease = false;
        }
    }      
} 

let accelerationNumber = 1
//how to make it concise?
function addX() {
    acceleration.xAxis += accelerationNumber
 }

function subtractX() {
    acceleration.xAxis -= accelerationNumber
}

function addY() {
    acceleration.yAxis += accelerationNumber
}

function subtractY() {
    acceleration.yAxis -= accelerationNumber
}

//beam mechanics and effects
function beamToggler() {
    if (keysDown[" "]) {
        console.log("beam")
        cows = document.querySelectorAll(".cow")
        //shadows = document.querySelectorAll(".shadow")
        ship.classList.add("beam")
    } else ship.classList.remove("beam")

    cows.forEach( cow => {
        cows = document.querySelectorAll(".cow")
        const dataNumber = cow.getAttribute("data-cowNum")
        const shadow = document.querySelector(`div[data-shadowNum='${dataNumber}']`)

        //shadow.addEventListener('transitionend', abductionHandler) // shadow is being abducted aswell THROWS ERRORS
        cow.addEventListener('transitionend', abductionHandler)
        
        if (keysDown[" "] &&
            Math.abs(cow.offsetLeft - positionX) < 15 &&
            10 < cow.offsetTop - positionY &&
            cow.offsetTop - positionY < 130) {
                cow.classList.add("levitate")
                cow.classList.remove("standing")
                cow.style.top = `${cow.offsetTop - 50}px`
                shadow.classList.add("blurredShadow")
        } else {
            cow.style.top = `${cowPosMap[dataNumber][1]}px` // spawned Y pos
            cow.classList.remove("levitate")
            cow.classList.add("standing")
        
        shadow.removeEventListener('transitionend', abductionHandler)
        shadow.classList.remove("blurredShadow")
        cow.removeEventListener('transitionend', abductionHandler)
        }
    })
}

let countedArr = []
let stolenCows = 0
let stolenLamas = 0
let stolenCamels = 0
let stolenElephants = 0

function abductionHandler(e) {
    const currentCow = e.target.getAttribute("data-cowNum")
    const animal = e.target.innerHTML
    if (countedArr.indexOf(currentCow) === -1) {
        if (animal === "🐄") {
            countedArr.push(currentCow)
            stolenCows += 1
            cowScore.innerHTML = `🐄 x ${stolenCows}` 
        } else if (animal === "🦙") {
            countedArr.push(currentCow)
            stolenLamas += 1
            lamaScore.innerHTML = `🦙 x ${stolenLamas}`
        } else if (animal === "🐫") {
            countedArr.push(currentCow)
            stolenCamels += 1
            camelScore.innerHTML = `🐫 x ${stolenCamels}`
        } else if (animal === "🐘") {
            countedArr.push(currentCow)
            stolenElephants += 1
            elephantScore.innerHTML = `🐘 x ${stolenElephants}`
        }
        
    }
    e.target.remove()
    handleBar()
}

let positionX = 100
let positionY = 100

let airResistance = 0.02

function updateShipPosition() {

    //air resistance
    if (acceleration.xAxis > 0) {
        acceleration.xAxis -= airResistance
    }
    if (acceleration.xAxis < 0) {
        acceleration.xAxis += airResistance
    }
    if (acceleration.yAxis > 0) {
        acceleration.yAxis -= airResistance
    }
    if (acceleration.yAxis < 0) {
        acceleration.yAxis += airResistance
    }

    //crossing borders
    if (positionX + acceleration.xAxis >= game.offsetWidth - 10) {
        positionX = -42
    } else if (positionX + acceleration.xAxis + 42 <= 0) {
        positionX = game.offsetWidth - 5
    } else if (positionY + acceleration.yAxis < -200) { 
        positionY = 50
    } else if (positionY >= game.offsetHeight - 40) {
        // why does this alert glitches game?
        //alert("crash")
        ship.style.top = `${body.offsetHeight - 100}px`
        clearInterval(shipMovement)
        acceleration.xAxis = 0
        acceleration.yAxis = 0
        ship.innerHTML = "🔥"
        
        setTimeout( () => {
            positionY = 40
            positionX = 40

            shipMovement = setInterval(updateShipPosition, 10)
            acceleration.xAxis = 0
            acceleration.yAxis = 0
            ship.innerHTML = "🛸"
        }, 1000)
    }


    let speedLimiter = 5

    if ( Math.abs( acceleration.xAxis ) - 6 < 0 ) {
        airResistance = 0.08
    } else {
        airResistance = 0.02
    }
    
    ship.style.transitionTimingFunction = "linear"
    ship.style.top = `${positionY - acceleration.yAxis/speedLimiter}px`
    ship.style.left = `${Math.floor(positionX + acceleration.xAxis/speedLimiter)}px`

    positionX = positionX + acceleration.xAxis/speedLimiter
    positionY = positionY - acceleration.yAxis/speedLimiter

    infoPanel.innerHTML = `x: ${acceleration.xAxis} </br>y: ${acceleration.yAxis}`
}

// adjust all intervals and acceleration
shipMovement = setInterval(updateShipPosition, 10)

document.addEventListener("keydown", handleKeyDown)
document.addEventListener("keyup", handleKeyUp)

window.cows = cows
window.shadows = shadows
window.isBeamOn = isBeamOn
window.beamInterval = beamInterval
window.keysDown = keysDown
window.beamToggler = beamToggler

export { body, cowContainer, stolenCows, stolenLamas, stolenCamels, stolenElephants}