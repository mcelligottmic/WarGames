/*
    initGL.js - Essential setup for our WebGL application
*/

var canvas; // global to hold reference to an HTML5 canvas
var gl; // global to hold reference to our WebGL context

var projection;

var drawables = []; // used to store any objects that need to be drawn

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
                        -7.5, 2.5, -10, 10);
    projection = mult(projection, translate(-5, -3, 0));
    projection = mult(projection, rotate(80, 1, 0, 0));
    projection = mult(projection, rotate(30, 0, 0, 1));

    // set up an event handler for this button
    var a = document.getElementById("Btn_TR");
    a.addEventListener("click",
        function() {
            //Tank probably has to keep track what tile it is on
            drawables[1].endPos = drawables[0].getTileCoordinates(0, 3);
        },
        false
    );

 }

/* Global render callback - would draw multiple objects if there were more than one */
var renderScene = function(){
    // start from a clean frame buffer for this frame
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // TODO loop over all objects and update each
    drawables[1].update();

    // loop over all objects and draw each
    var i;
    for (i in drawables) {
        drawables[i].draw();
    }

    // queue up this same callback for the next frame
    requestAnimFrame(renderScene);
}
