/*
    Creates a borad made of hexagonal tiles
    arranged in a parallelogram.
*/
var Board = function (rows, cols, shaders) {
    var i, j;

    // need a container for the tiles of the board
    // let's use a 2D array so that the array
    // indices are the tile coordinates
    this.tiles = [];

    // for each row that we want
    for (i = 0; i < rows, i++) {
        // build the row...

        // TODO compute the starting coords of this row
        //      starting x will always be zero
        //      starting y will depend on row# and Tile.DEFAULT_HEIGHT

        // for each column that we want
        for (j = 0; j < cols; j++) {
            // TODO compute the x-coord of this col
            //      from col#, Tile.DEFAULT_HEIGHT, and some trig

            // TODO build a new tile at the desired coords

            // TODO add this new tile to the board
            
        }
    }
}

// TODO add a draw() function to the Board prototype
//      drawing a Board means looping over all Tiles
//      and drawing each

// TODO move the onload function into this file for now
//      initialize WebGL and the shaders
//      create a new instance of Board (whatever size you like)
//      add the Board to the list of drawables
//      render the scene

