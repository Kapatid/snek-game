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
