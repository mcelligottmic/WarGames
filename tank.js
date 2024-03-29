/*
    Creates a Tank unit that is made up of boxes
*/

var Tank = function (shaders, board, tileNum) {

    var coordinates = board.getTileCoordinates(tileNum[0], tileNum[1]);
    var color =  vec4( 0.0, 0.0, 1.0, 1.0 );

    this.board = board;
    this.tileNum = vec3(tileNum);

    this.startPos = coordinates;
    this.currPos = vec3(coordinates);
    this.endPos = vec3(coordinates);

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
    // call each box and draw it
    this.base.draw();
    this.turret.draw();
    this.barrel.draw();
}

/* Moves all three boxes at once */
Tank.prototype.move = function(dist, axis) {

    // if currPos is only x,y and axis is z does currPos[2] now hold z?

    // TODO Check for invalid board movement
    // Tank.set checks it as of now

    
    //update position
    this.currPos[axis] += dist;

    this.base.move(dist, axis);
    this.turret.move(dist, axis);
    this.barrel.move(dist, axis);
}

//get tile 
Tank.prototype.get = function() {
    return this.tileNum;
}

//set tile
Tank.prototype.set = function(row, col) {
    // check movement for off board
    if ( (row >= this.board.rows) || (col >= this.board.cols) ||
         (row < 0) || (col < 0)) {
        console.log("Invalid Move");
    } else {
        this.tileNum = [row, col];

        this.endPos = this.board.getTileCoordinates(row, col);
        console.log(this.endPos);
    }
}

Tank.prototype.update = function() { 
    var distX = 0;
    var distY = 0;

    // 1. check if absolute distance between dest and start is greater than zero
    if ( (Math.abs(this.startPos[0] - this.endPos[0]) > 0) || (Math.abs(this.startPos[1] - this.endPos[1]) > 0) ) {
        // 2. compute distance to move ((dest - start) / 60)
        distX = (this.endPos[0] - this.startPos[0]) / 60
        distY = (this.endPos[1] - this.startPos[1]) / 60
        // 3. move that distance
        this.move(distX, 0);
        this.move(distY, 1);
        /* TODO see if there is a better way to handle step 4, if statement seems complex */
        // 4. check if we went past the destination, and if so "clamp" back to destination
        // console.log("Current Position: "+this.currPos);
        if ( ((this.startPos[0] < this.endPos[0]) && (this.currPos[0] > this.endPos[0])) ||
             ((this.startPos[0] > this.endPos[0]) && (this.currPos[0] < this.endPos[0])) ||
             ((this.startPos[1] < this.endPos[1]) && (this.currPos[1] > this.endPos[1])) ||
             ((this.startPos[1] > this.endPos[1]) && (this.currPos[1] < this.endPos[1])) ) {
            this.startPos = vec3(this.endPos);
            this.currPos = vec3(this.endPos);
            // console.log("End Position: "+this.endPos);
            // console.log("Current Position(E): "+this.currPos);
        }

    }               
}