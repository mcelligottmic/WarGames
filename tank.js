/*
    Creates a borad made of hexagonal tiles
    arranged in a parallelogram.
*/

var Tank = function (shaders, board, tileNum, z) {

    var coordinates = board.getTileCoordinates(tileNum[0], tileNum[1]);
    var color =  vec4( 0.0, 0.0, 1.0, 1.0 );

    this.board = board;
    this.tileNum = tileNum;

    //do I need a deep level copy?
    this.startPos = coordinates;
    this.currPos = coordinates;
    this.endPos = coordinates;

    //create three boxes
    this.base = new Box(shaders, coordinates[0], coordinates[1], -0.3, 
        0.8, 0.4, 0.3, color);

    color =  vec4( 0.0, 1.0, 0.0, 1.0 );
    this.turret = new Box(shaders, coordinates[0], coordinates[1], -0.3 + -0.3,
         0.3, 0.3, 0.3, color);

    color =  vec4( 0.5, 0.5, 0.5, 1.0 );
    this.barrel = new Box(shaders, coordinates[0]+0.3, coordinates[1], -0.3 + -0.3 + -0.1,
         0.4, 0.2, 0.1, color);
}

Tank.prototype.draw = function() {
    // console.log(this.boxes);
    // call each box and draw it
    this.base.draw();
    this.turret.draw();
    this.barrel.draw();
}

/* Moves all three boxes at once */
Tank.prototype.move = function(dist, axis) {

    // if currPos is only x,y and axis is z does currPos[2] now hold z?
    
    //update position
    this.currPos[axis] = dist;

    this.base.move(dist, axis);
    this.turret.move(dist, axis);
    this.barrel.move(dist, axis);
}


Tank.prototype.update = function() { 
    var distX = 0;
    var distY = 0;

    // 1. check if absolute distance between dest and start is greater than zero
    if ( (Math.abs(this.startPos[0] - this.endPos[0]) > 0) || (Math.abs(this.startPos[1] - this.endPos[1]) > 0) ) {
        // 2. compute distance to move ((dest - start) / 60)
        distX = this.endPos[0] - this.startPos[0] / 60
        distY = this.endPos[1] - this.startPos[1] / 60
        // 3. move that distance
        this.move(distX, 0);
        this.move(distY, 1);
        // 4. check if we went past the destination, and if so "clamp" back to destination
        if ( (this.startPos[0] - this.endPos[0] < 0) && (this.currPos[0] - this.endPos[0] > 0) ||
             (this.startPos[0] - this.endPos[0] > 0) && (this.currPos[0] - this.endPos[0] < 0) ) {
            this.startPos[0] = this.endPos[0];
            this.startPos[1] = this.endPos[1];
            this.currPos[0] = this.endPos[0];
            this.currPos[1] = this.endPos[1];
        }

    }               
}