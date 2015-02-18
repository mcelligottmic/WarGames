/*
  To render a hexagon, you will need to compute and set the coordinates of
  each of the six vertices. Add each of the seven (x,y) coordinate pairs to the
  points array. Make sure to render a triangle fan instead of separate triangles.
  See https://www.opengl.org/sdk/docs/man/ for info about specific OpenGL funcs.
 */
var canvas;
var gl;

var points = [];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the Sierpinski Gasket
    //
    var x = 0; //the x coordinate for the center of the hexagon
    var y = 0; //the y coordinate for the center of the hexagon

    // Given the center of a hexagon calaculates all other points and draws
    hexagon(x, y);

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};

// computes the seven hexagon vertices and adds each to the points array.
function hexagon( x, y )
{
    //distance between points, or the length of each side of the hexagon
    var d = .5;
    // TODO replace (1.73205081) with sqrt(3)
    var h = (1.73205081)/2*d;

    var vertices = [
        vec2( x, y ),                 //0 or center point
        vec2( x + d, y ),             //1
        vec2( x + .5*d, y + h),       //2
        vec2( x - 0.5*d, y + h),      //3
        vec2( x - d, y ),             //4
        vec2( x - 0.5*d, y - h),      //5
        vec2( .5*d, y - h)            //6
    ];

    //vertice 1 is added a second time so that points 6 and 1 will be connected.
    points.push( vertices[0], vertices[1], vertices[2], vertices[3],
                  vertices[4], vertices[5], vertices[6] , vertices[1]);
}

// Renders a hexagon, which is really a triangle fan
function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, points.length );
}
