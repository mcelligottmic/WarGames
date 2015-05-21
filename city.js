/*
    Creates a City unit that is made up of boxes
*/

var City = function (shaders, board, tileNum) {

    var coordinates = board.getTileCoordinates(tileNum[0], tileNum[1]);
    var color =  vec4( 0.3, 0.3, 0.3, 1.0 );

    this.board = board;
    this.tileNum = vec3(tileNum);

    this.startPos = coordinates;
    this.currPos = vec3(coordinates);
    this.endPos = vec3(coordinates);

    // TODO add more boxes or something to make this look better
    this.tower_01 = new Box(shaders, coordinates[0], coordinates[1], -0.6, 
        0.4, 0.4, 1.0, color);
}

City.prototype.draw = function() {
    // call each box and draw it
    this.tower_01.draw();
}

City.prototype.move = function(dist, axis) {
    // A City does not move
}

//get tile 
City.prototype.get = function() {
    return this.tileNum;
}

//set tile
City.prototype.set = function(row, col) {
    // A city does not move
}

City.prototype.update = function() { 
    // TODO check for unit collision;
    // city does not move;              
}