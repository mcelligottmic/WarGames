/*
    initGL.js - Essential setup for our WebGL application
*/

//Global references
var canvas; // global to hold reference to an HTML5 canvas
var gl; // global to hold reference to our WebGL context

var projection;

// Global to hold reference to the game board
var BOARD;
// TODO remove drawables and replace with blue and red player
var drawables = []; // used to store any objects that need to be drawn
var currUnit = 1;
// TODO create a var to keep track of which player is moving
// var currPlayer = 0;

/* Initialize global WebGL stuff - not object specific */
function initGL()
{
    // look up our canvas element
    canvas = document.getElementById( "gl-canvas" );

    // obtain a WebGL context bound to our canvas
    gl = WebGLUtils.setupWebGL( canvas);
    if ( !gl ) { alert( "WebGL isn't available"); }

    gl.viewport( 0, 0, canvas.width, canvas.height); // use the whole canvas
    gl.clearColor( 0.0, 0.0, 0.0, 1.0); // background color
    gl.enable(gl.DEPTH_TEST); // required for 3D hidden-surface elimination

    // compute aspect ratio from the canvas dimensions
    var aspectRatio = canvas.width / canvas.height

    // set the projection matrix
    // note: added rotation just to better see the shapes of our cubes
    // TODO adjust these view boundaries to look nice
    projection = ortho( -5*aspectRatio, 5*aspectRatio,
                        -2.5, 7.5, -10, 10);
    projection = mult(projection, translate(-5, -3, 0));
    projection = mult(projection, rotate(80, 1, 0, 0));
    projection = mult(projection, rotate(30, 0, 0, 1));

    window.addEventListener("keyup", 
        function(event) {
            //listen for key input
            console.log(event.keyCode);
            switch (event.keyCode) {
                //Left Arrow
                case 37 :
                    drawables[currUnit].set(drawables[currUnit].get()[0], drawables[currUnit].get()[1]-1);
                    break;
                //Right Arrow
                case 39 :
                    drawables[currUnit].set(drawables[currUnit].get()[0], drawables[currUnit].get()[1]+1);
                    break;
                //Up Arrow
                case 38 :
                    drawables[currUnit].set(drawables[currUnit].get()[0]-1, drawables[currUnit].get()[1]);
                    break;
                //Down Arrow
                case 40 :
                    drawables[currUnit].set(drawables[currUnit].get()[0]+1, drawables[currUnit].get()[1]);
                    break;
                //1
                case 49 :
                    currUnit = 1;
                    break;
                //2
                case 50 :
                    currUnit = 2;
                    break;
                //3
                case 51 :
                    currUnit = 3;
                    break;
                default:
                    //Not handling this key code yet
                    break;
            }
            console.log("Unit: "+currUnit);
        }
    )

 }

/* Global render callback - would draw multiple objects if there were more than one */
var renderScene = function(){
    // start from a clean frame buffer for this frame
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Update
        // We don't really need to update Board yet
    // BOARD.update();

    // loop over all objects and update each
    var j;
    for (j in drawables) {
        drawables[j].update();
    }

    // Render
    BOARD.draw();

    // loop over all objects and draw each
    var i;
    for (i in drawables) {
        drawables[i].draw();
    }


    // queue up this same callback for the next frame
    requestAnimFrame(renderScene);
}
