/*
  To render a hexagon, you will need to compute and set the coordinates of
  each of the six vertices. Add each of the seven (x,y) coordinate pairs to the
  points array. Make sure to render a triangle fan instead of separate triangles.
  See https://www.opengl.org/sdk/docs/man/ for info about specific OpenGL funcs.
 */
// TODO modify constructor to take in center coords for this tile
var Tile = function (program) {
    this.points = [];
    this.transform = mat4(); // initialize object transform as identity matrix

    this.makeTile(0, 0, 0, 1);

    this.program = program;

    this.vBufferId = gl.createBuffer(); // reserve a buffer object
    gl.bindBuffer( gl.ARRAY_BUFFER, this.vBufferId ); // set active array buffer
    /* send vert positions to the buffer, must repeat this
       wherever we change the vert positions for this cube */
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW );
}

// distance between two tile centers
Tile.DEFAULT_HEIGHT = Math.sqrt(3) / 2;
// spacing between adjacent tiles
Tile.BORDER_SIZE = Tile.DEFAULT_HEIGHT * 0.05;

Tile.prototype.draw = function(){
    gl.useProgram(this.program);

    var projId = gl.getUniformLocation(this.program, "projection"); 
    gl.uniformMatrix4fv(projId, false, flatten(projection));

    var xformId = gl.getUniformLocation(this.program, "modeltransform");
    gl.uniformMatrix4fv(xformId, false, flatten(this.transform));

    gl.bindBuffer( gl.ARRAY_BUFFER, this.vBufferId ); // set active array buffer
    // map buffer data to the vertex shader attribute
    var vPosId = gl.getAttribLocation( this.program, "vPosition" );
    gl.vertexAttribPointer( vPosId, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosId );

    gl.drawArrays(gl.TRIANGLE_FAN, 0, this.points.length);
}

Tile.prototype.numVertices = function() {return this.points.length;}

Tile.prototype.makeTile = function(x, y, z, w) {
    //distance between points, or the length of each side of the hexagon
    var d = 0.5;
    var h = Tile.DEFAULT_HEIGHT * d;

    var vertices = [
        vec4( x, y , z, w),                  //0 or center point
        vec4( x + d, y, z, w),              //1
        vec4( x + 0.5*d, y + h, z, w),       //2
        vec4( x - 0.5*d, y + h, z, w),       //3
        vec4( x - d, y, z, w),              //4
        vec4( x - 0.5*d, y - h, z, w),       //5
        vec4( x + 0.5*d, y - h, z, w)        //6
    ];

    //vertice 1 is added a second time so that points 6 and 1 will be connected.
    this.points.push( vertices[0], vertices[1], vertices[2], vertices[3],
                  vertices[4], vertices[5], vertices[6] , vertices[1]);
}

/* Translate this cube along the specified canonical axis. */
Tile.prototype.move = function(dist, axis){
    var delta = [0, 0, 0];

    if (axis === undefined) axis = X_AXIS;
    delta[axis] = dist;

    this.transform = mult(translate(delta), this.transform);
}

// TODO remove this once it is completely moved over to board.js
window.onload = function()
{
    var shaders, i;

    initGL(); // basic WebGL setup for the scene 

    // load and compile our shaders into a program object
    var shaders = initShaders( gl, "vertex-shader", "fragment-shader" );

    //use small move val
    var t0 = new Tile(shaders);
    // t0.move(.5);
    var t1 = new Tile(shaders);
    t1.move(Tile.DEFAULT_HEIGHT + Tile.BORDER_SIZE, Y_AXIS);
    var t2 = new Tile(shaders);
    t2.move(-(Tile.DEFAULT_HEIGHT + Tile.BORDER_SIZE), Y_AXIS);

    drawables.push(t0, t1, t2);
    renderScene();
};

