import "./style.css"
import * as PIXI from "pixi.js"

let app = new PIXI.Application({
  width: 640,
  height: 360
})

document.body.appendChild(app.view as HTMLCanvasElement)

let elapsed = 0.0
let interval = 10

app.ticker.add(delta => {
  elapsed += delta

  while (elapsed > interval) {
    logic()
    elapsed -= interval
  }
})


const width = 20
const height = 20


let rect = new PIXI.Graphics()
rect.beginFill(0xff0000)
rect.drawRect(0, 0, width, height)



interface Body {
  rect: PIXI.Graphics
}

interface Snake {
  bodies: Body[]
}

let snake: Snake = {
  bodies: []
}


// Create new body in snake
for (let i = 0; i < 5; i++) {
  let newRect = new PIXI.Graphics(rect.geometry)
  app.stage.addChild(newRect)
  
  newRect.x = i * width
  newRect.y = 0

  let body: Body = {
    rect: newRect
  }

  snake.bodies = [ body, ...snake.bodies ]
}



enum Direction {
  Up, Left, Right, Down
}

let direction = Direction.Right



function logic() {
  let head = snake.bodies.at(0)
  let popped = snake.bodies.pop()

  if (head == undefined || popped == undefined) {
    console.log("Error")
    return
  }

  snake.bodies = [ popped, ...snake.bodies ]

  switch (direction) {
    case Direction.Down:
      popped.rect.y = head.rect.y + height
      popped.rect.x = head.rect.x
      break
    case Direction.Up:
      popped.rect.y = head.rect.y - height
      popped.rect.x = head.rect.x
      break
    case Direction.Left:
      popped.rect.y = head.rect.y
      popped.rect.x = head.rect.x - width
      break
    case Direction.Right:
      popped.rect.y = head.rect.y
      popped.rect.x = head.rect.x + width
      break
  }
}

window.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowDown":
      if (direction != Direction.Up) {
        direction = Direction.Down
      }
      break
    case "ArrowUp": 
     if (direction != Direction.Down) {
        direction = Direction.Up
      }
      break
    case "ArrowLeft": 
      if (direction != Direction.Right) {
        direction = Direction.Left
      }
      break
    case "ArrowRight":
      if (direction != Direction.Left) {
        direction = Direction.Right
      }
      break
  }
  
})
