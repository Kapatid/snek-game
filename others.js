export const getGridData = () => {
  const gridComputedStyle = window.getComputedStyle(
    document.querySelector("#grid")
  )

  return {
    rows: gridComputedStyle.getPropertyValue("grid-template-rows").split(" ")
      .length,
    cols: gridComputedStyle.getPropertyValue("grid-template-columns").split(" ")
      .length,
  }
}

export const controls = snek => {
  window.addEventListener("keydown", event => {
    switch (event.code) {
      case "KeyS":
      case "ArrowDown":
        if (snek.move !== "up") snek.move = "down"
        break
      case "KeyW":
      case "ArrowUp":
        if (snek.move !== "down") snek.move = "up"
        break
      case "KeyA":
      case "ArrowLeft":
        if (snek.move !== "right") snek.move = "left"
        break
      case "KeyD":
      case "ArrowRight":
        if (snek.move !== "left") snek.move = "right"
        break
    }
  })
}

/* Not neeaded since I only needed a 1D array
const grid = document.querySelector("#grid")
const gridArray = []
let item = 0
for (let i = 0; i < rows; i++) {
  let xArray = []
  for (let j = 0; j < cols; j++) {
    xArray.push(grid.children.item(item))
    item += 1
  }
  gridArray.push(xArray)
} */
