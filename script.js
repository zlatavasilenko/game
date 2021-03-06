const startBtn = document.getElementById('start')
const display = document.querySelectorAll('.display')
const timeController = document.getElementById('time-list')
const timeEl = document.getElementById('time')
const boardEl = document.getElementById('board')
const modal = document.getElementById('modal')
const restart = document.getElementById('restart')
const exit = document.getElementById('exit')
const closeBtn = document.getElementById('modal-close')


let time = 0
let score = 0
let idSetInterval = null

startBtn.addEventListener('click', handlerStartBtn)

function handlerStartBtn(e) {
    e.preventDefault()
    display[0].classList.add('up')
}

timeController.addEventListener('click', handlerTimeController)

function handlerTimeController(e) {
    if (e.target.classList.contains('time-list__button')) {
        display[1].classList.add('up')
        time = parseInt(e.target.dataset.time)
        startGame()
    }
}

boardEl.addEventListener('click', handlerCircleClick)

function handlerCircleClick(e) {
    if (e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomCircle()
    }
}

function createRandomCircle() {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    const size = getRandomNum(5, 50)
    const {width, height} = boardEl.getBoundingClientRect()
    circle.style.width = circle.style.height = size + 'px'
    circle.style.background = getRandomColor()
    const x = getRandomNum(0, width - size)
    const y = getRandomNum(0, height - size)
    circle.style.left = x + 'px'
    circle.style.top = y + 'px'
    boardEl.append(circle)
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomColor() {
    return `rgb(${getRandomNum(0, 255)}, ${getRandomNum(5, 255)},${getRandomNum(0, 255)})`
}

function setTime(timeGame) {
    timeEl.innerHTML = `00:${timeGame}`
}

function startGame() {

    setInterval(decTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function finishGame() {
    timeEl.parentNode.style.display = 'none'
    clearInterval(idSetInterval)
    boardEl.innerHTML = `<p> score:${score}</p>`
    modal.classList.add('on')
}


/*
closeBtn.addEventListener('click', handlercloseBtn)
function handlercloseBtn(e) {
    modal.classList.remove('on')
}*/


exit.addEventListener('click', handlerExit)
function handlerExit(e) {
    location.reload()
}


/*
restart.addEventListener('click', handlerRestart)

function handlerRestart(e) {
    restartGame()

}

function restartGame() {

    setInterval(decTimeRestart, 1000)
    createRandomCircle()
    setTime(time)
}

/*
function decTimeRestart() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}
 */
