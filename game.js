import { controls, getGridData } from "./others.js"

let settings = { speed: 200, border: true }

// UI
const scoreDiv = document.getElementById("score")
const modal = document.querySelector(".modal")
const startBtn = modal.querySelectorAll(".modal-btn")[0]
const restartBtn = modal.querySelectorAll(".modal-btn")[1]

// Get grid and populate it with boxes
const grid = document.querySelector("#grid")
const box = document.createElement("div")
box.classList.add("box")
for (let i = 0; i < 64; i++) {
  grid.appendChild(box.cloneNode())
}

const { cols, rows } = getGridData()
let gameEnd = false
let snek = { body: [{ x: 0, y: 0 }], move: "right" }

/** from 2D index to 1D index. (row * width) + column */
const oneDIndex = ({ x, y }) => y * cols + x

const randomApplePos = () => {
  let index = Math.floor(Math.random() * cols * rows)

  // 1D to 2D (x,y) index
  const y = Math.floor(index / cols)
  const x = Math.floor(index % cols)

  // Prevent apple at 0 and at snake's body
  if (index === 0 || snek.body.some(coord => coord.x === x && coord.y === y)) {
    index = randomApplePos()
  }
  return index
}

const game = () => {
  // START
  let { body } = snek
  let head = body[body.length - 1]
  grid.children.item(randomApplePos()).classList.add("food")

  // UPDATE
  setInterval(() => {
    if (gameEnd) return
    // Remove tail
    grid.children.item(oneDIndex(snek.body.shift())).classList.remove("active")

    // Updating head
    if (snek.move === "down") {
      head = { x: head.x, y: head.y === rows - 1 ? 0 : head.y + 1 }
    } else if (snek.move === "up") {
      head = { x: head.x, y: head.y === 0 ? rows - 1 : head.y - 1 }
    } else if (snek.move === "right") {
      head = { x: head.x === cols - 1 ? 0 : head.x + 1, y: head.y }
    } else if (snek.move === "left") {
      head = { x: head.x === 0 ? cols - 1 : head.x - 1, y: head.y }
    }

    // Always push new coordinates to body
    snek.body.push(head)

    // Updating head element
    let headClass = grid.children.item(oneDIndex(head)).classList
    if (headClass.contains("active")) {
      // End game
      gameEnd = true
      startBtn.style.display = "none"
      restartBtn.style.display = "grid"
      modal.querySelector('p').style.display = "none"
      modal.querySelector("h1").textContent = "GAME OVER 🙁"
      modal.style.display = "grid"
    } else if (headClass.contains("food")) {
      headClass.remove("food")
      headClass.add("active")
      // Push new coordinate/body
      snek.body.push(head)
      scoreDiv.textContent = `Score: ${snek.body.length - 1}`
      // New food position
      grid.children.item(randomApplePos()).classList.add("food")
    } else {
      headClass.add("active")
    }
  }, settings.speed)
}

// UI & game start
document.querySelectorAll(".modal-btn").forEach(btn => {
  startBtn.style.display = "grid"
  restartBtn.style.display = "none"
  btn.addEventListener("click", e => {
    const btn = e.currentTarget

    if (btn.value === "start") {
      modal.style.display = "none"
      controls(snek)
      game()
    } else if (btn.value === "restart") {
      window.location.reload()
    }
  })
})
