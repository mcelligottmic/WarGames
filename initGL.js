/*
    initGL.js - Essential setup for our WebGL application
*/

var canvas; // global to hold reference to an HTML5 canvas
var gl; // global to hold reference to our WebGL context

// a few simple constants
const X_AXIS = 0;
const Y_AXIS = 1;
const Z_AXIS = 2;

var currAngle = 0;

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

    // set the projection matrix
    // note: added rotation just to better see the shapes of our cubes
    projection = ortho( -2, 2, -2, 2, -1, 1);
 }

/* Global render callback - would draw multiple objects if there were more than one */
var renderScene = function(){
    // start from a clean frame buffer for this frame
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // loop over all objects and draw each
    var i;
    for (i in drawables) {
        drawables[i].draw();
    }

    // queue up this same callback for the next frame
    requestAnimFrame(renderScene);
}
