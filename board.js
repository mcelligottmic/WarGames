/*
    Creates a borad made of hexagonal tiles
    arranged in a parallelogram.
*/

// a few simple constants
const X_AXIS = 0;
const Y_AXIS = 1;
const Z_AXIS = 2;

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
            var t0 = new Tile(shaders, x, y, color);
            // add this new tile to the board
            this.tiles[m].push(t0);
        }
    }
}

/* Given m (row) and n (column) */
Board.prototype.getTileCoordinates = function (m, n) {
    return this.tiles[m][n].getCoordinates();
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

// Does nothing right now
Board.prototype.update = function() { 
    return;               
}

// create a new instance of Board and draw it
window.onload = function() {
    var shaders, i; 
    var color =  vec4( 1.0, 0.0, 0.0, 1.0 );

    initGL(); // basic WebGL setup for the scene 

    // load and compile our shaders into a program object
    var shaders = initShaders( gl, "vertex-shader", "fragment-shader" );
    
    var board_01 = new Board(10, 10, shaders, color);

    var city_01 = new City(shaders, board_01, [9, 9]);

    var soldier_01 = new Soldier(shaders, board_01, [0,5]);
    
    var tank_01 = new Tank(shaders, board_01, [0,1]);
    var tank_02 = new Tank(shaders, board_01, [0,2]);
    
    BOARD = board_01;
    drawables.push(city_01);
    drawables.push(tank_01);
    drawables.push(tank_02);
    drawables.push(soldier_01);

    renderScene();
}