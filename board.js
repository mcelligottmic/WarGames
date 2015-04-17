/*
    Creates a borad made of hexagonal tiles
    arranged in a parallelogram.
*/
var Board = function (rows, cols, shaders) {
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
        // TODO compute the starting coords of this row
        //      starting x will always be zero
        x = 0;
        //      starting y will depend on row# and Tile.DEFAULT_HEIGHT
        y = 0 - m * (Tile.BORDER_SIZE + Tile.DEFAULT_HEIGHT); 

        // for each column that we want
        for (n = 0; n < this.cols; n++) {
            // TODO 1 compute the x-coord of this col
            //      from col#, Tile.DEFAULT_HEIGHT, and some trig
            if (n != 0) {
                // x = x + Tile.DEFAULT_HEIGHT - Tile.BORDER_SIZE
                x = x + 1.5 * Tile.DEFAULT_DISTANCE + Tile.BORDER_SIZE;
            }
            //TODO compute the y-coord of this col
            if (n != 0) {
                y = y - (Tile.DEFAULT_HEIGHT + Tile.BORDER_SIZE) * 0.5;
            }
            // TODO 2 build a new tile at the desired coords
            var t0 = new Tile(shaders, x, y);
            // TODO 3 add this new tile to the board
            this.tiles[m].push(t0);
        }
    }
}

// TODO 4 add a draw() function to the Board prototype
//      drawing a Board means looping over all Tiles
//      and drawing each
Board.prototype.draw = function() {
    // console.log(this.tiles);
    for (m = 0; m < this.rows; m++) {
        for (n = 0; n < this.cols; n++) {
            this.tiles[m][n].draw();
        }
    }

}

// TODO move the onload function into this file for now
//      initialize WebGL and the shaders
//      create a new instance of Board (whatever size you like)
//      add the Board to the list of drawables
//      (go through the array and print each tile?)
//      render the scene
window.onload = function() {
    var shaders, i;

    initGL(); // basic WebGL setup for the scene 

    // load and compile our shaders into a program object
    var shaders = initShaders( gl, "vertex-shader", "fragment-shader" );
    var board_01 = new Board(10, 10, shaders);
    drawables.push(board_01);
    renderScene();
};
