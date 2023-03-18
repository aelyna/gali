import "./style.css"
import * as PIXI from "pixi.js"

let app = new PIXI.Application({
  width: 640,
  height: 360
})

document.body.appendChild(app.view as HTMLCanvasElement)


let rect = new PIXI.Graphics()
rect.beginFill(0xff0000)
rect.drawRect(100, 100, 20, 20)
app.stage.addChild(rect)


let elapsed = 0.0;

app.ticker.add((delta) => {
  elapsed += delta;
  rect.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
});
