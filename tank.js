/*
    Creates a borad made of hexagonal tiles
    arranged in a parallelogram.
*/

var Tank = function (shaders, x, y, z) {

    var color =  vec4( 0.0, 0.0, 1.0, 1.0 );

    // this.transform = mat4(); // Step #1 initialize object transform as identity matrix

    //create three boxes
    this.base = new Box(shaders, 0, 0, 0, 0.8, 0.4, 0.3, color);
    color =  vec4( 0.0, 1.0, 0.0, 1.0 );
    this.turret = new Box(shaders, 0, 0, 0, 0.3, 0.3, 0.3, color);
    color =  vec4( 0.5, 0.5, 0.5, 1.0 );
    this.barrel = new Box(shaders, 0, 0, 0, 0.4, 0.2, 0.1, color);

    //move three boxes into positions
    this.base.move(-0.3, Z_AXIS);
    this.turret.move(-0.3 + -0.3, Z_AXIS);
    this.barrel.move(-0.3 + -0.3 + -0.1, Z_AXIS);
    this.barrel.move(0.3, X_AXIS);
}

Tank.prototype.draw = function() {
    // console.log(this.boxes);
    // call each box and draw it
    this.base.draw();
    this.turret.draw();
    this.barrel.draw();
}

// need to move all boxes
/* Translate this cube along the specified canonical axis. */
Tank.prototype.move = function(dist, axis) {
    this.base.move(dist, axis);
    this.turret.move(dist, axis);
    this.barrel.move(dist, axis);

    //update the transformation matrix?
}