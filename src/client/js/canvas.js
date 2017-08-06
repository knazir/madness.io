class Canvas {
  constructor() {
    this.canvas = this.initCanvas();
    this.graph = this.canvas.getContext("2d");
  }

  initCanvas() {
    const canvas = document.querySelector("#canvas");
    canvas.width = Config.SCREEN_WIDTH;
    canvas.height = Config.SCREEN_HEIGHT;
    return canvas;
  }


  ////////////////////////// Getters //////////////////////////

  get center() {
    return new Point(this.canvas.width / 2, this.canvas.height / 2);
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }


  ////////////////////////// Util /////////////////////////////

  normalizePoint(point, xOffset, yOffset) {
    const newX = point.x - (xOffset / 2);
    const newY = point.y - ((yOffset || xOffset) / 2);
    return new Point(newX, newY);
  }


  ////////////////////////// Drawing //////////////////////////

  drawCircle(point, radius, fillColor) {
    this.graph.beginPath();
    this.graph.arc(point.x, point.y, radius, 0, Math.PI * 2);
    this.graph.stroke();
    this.graph.fillStyle = fillColor || Config.DEFAULT_FILL;
    this.graph.fill();
  }

  drawRectangle(point, width, height, fillColor) {
    point = this.normalizePoint(point, width, height);
    this.graph.rect(point.x, point.y, width, height);
    this.graph.stroke();
    this.graph.fillStyle = fillColor || Config.DEFAULT_FILL;
    this.graph.fill();
  }

  drawSquare(point, size, fillColor) {
    this.drawRectangle(point, size, size, fillColor);
  }

  drawPolygon(point, radius, sides, fillColor) {
    let theta = 0;
    let x = 0;
    let y = 0;

    this.graph.beginPath();
    for (let i = 0; i < sides; i++) {
      theta = (i / sides) * 2 * Math.PI;
      x = point.x + radius * Math.sin(theta);
      y = point.y + radius * Math.cos(theta);
      this.graph.lineTo(x, y);
    }

    this.graph.closePath();
    this.graph.stroke();
    this.graph.fillStyle = fillColor || Config.DEFAULT_FILL;
    this.graph.fill();
  }
}
