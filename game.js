import { controls, getGridData } from "./others.js"

// UI
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

/** from 2D index to 1D index. (row * length_of_row) + column */
const oneDIndex = ({ x, y }) => y * rows + x

const randomPos = () => {
  let index = Math.floor(Math.random() * cols * rows)

  // 1D to 2D (x,y) index
  let y = index / cols
  let x = index % cols

  // Prevent apple at 0 and at snake's body
  if (index === 0 || snek.body.some(coord => coord === { x, y })) {
    index = randomPos()
  }
  return index
}

const game = () => {
  // Start
  let { body } = snek
  let head = body[body.length - 1]
  grid.children.item(randomPos()).classList.add("food")

  // Update
  setInterval(() => {
    if (gameEnd) return
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

    // Updating head element
    let headClass = grid.children.item(oneDIndex(head)).classList
    if (headClass.contains("active")) {
      // End game
      gameEnd = true
      startBtn.style.display = "none"
      restartBtn.style.display = "grid"
      modal.querySelector("h1").textContent = "GAME OVER"
      modal.style.display = "grid"
    } else if (headClass.contains("food")) {
      headClass.remove("food")
      headClass.add("active")
      // Push new coordinate/body
      snek.body.push(head)
      // New food position
      grid.children.item(randomPos()).classList.add("food")
    } else {
      headClass.add("active")
    }

    // Always push new coordinates to body
    snek.body.push(head)
  }, 250)
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
