class Actor {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }

    draw() {}

    updatePos(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Player extends Actor {
    draw(canvas) {
        canvas.drawCircle(new Point(this.x, this.y), 20, "#0000FF");
    }
}
