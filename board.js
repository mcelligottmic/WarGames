/*
    Creates a borad made of hexagonal tiles
    arranged in a parallelogram.
*/

// TODO 5/3 Constructor should take in a default color for the tiles
var Board = function (rows, cols, shaders, color) {
    this.rows = rows;
    this.cols = cols;

    var m, n;

    // need a container for the tiles of the board
    // let's use a 2D array so that the array
    // indices are the tile coordinates
    this.tiles = [];

    // for each row that we want
    for (m = 0; m < this.rows; m++) {
        // build the row...
        this.tiles.push([]);
        //      starting x will always be zero
        x = 0;
        //      starting y will depend on row# and Tile.DEFAULT_HEIGHT
        y = 0 - m * (Tile.BORDER_SIZE + Tile.DEFAULT_HEIGHT); 

        // for each column that we want
        for (n = 0; n < this.cols; n++) {
            // compute the x-coord of this col
            //      from col#, Tile.DEFAULT_HEIGHT, and some trig
            if (n != 0) {
                // x = x + Tile.DEFAULT_HEIGHT - Tile.BORDER_SIZE
                x = x + 1.5 * Tile.DEFAULT_DISTANCE + Tile.BORDER_SIZE;
            }
            // compute the y-coord of this col
            if (n != 0) {
                y = y - (Tile.DEFAULT_HEIGHT + Tile.BORDER_SIZE) * 0.5;
            }
            // build a new tile at the desired coords
            // TODO 5/3 Pass in the color for this tile
            var t0 = new Tile(shaders, x, y, color);
            // add this new tile to the board
            this.tiles[m].push(t0);
        }
    }
}

// looping over all Tiles and drawing each
Board.prototype.draw = function() {
    // console.log(this.tiles);
    for (m = 0; m < this.rows; m++) {
        for (n = 0; n < this.cols; n++) {
            this.tiles[m][n].draw();
        }
    }

}

// create a new instance of Board and draw it
window.onload = function() {
    var shaders, i; 
    var color =  vec4( 1.0, 0.0, 0.0, 1.0 );

    initGL(); // basic WebGL setup for the scene 

    // load and compile our shaders into a program object
    var shaders = initShaders( gl, "vertex-shader", "fragment-shader" );
    var board_01 = new Board(10, 10, shaders, color);

    var color =  vec4( 0.0, 1.0, 0.0, 1.0 );
    var box_01 = new Box(shaders, 0, 0, 0, 0.5, 0.5, 0.5, color);
    box_01.move(-0.5, Z_AXIS);
    
    drawables.push(board_01);
    drawables.push(box_01);

    renderScene();
}