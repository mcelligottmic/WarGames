/*
  To render a hexagon, you will need to compute and set the coordinates of
  each of the six vertices. Add each of the seven (x,y) coordinate pairs to the
  points array. Make sure to render a triangle fan instead of separate triangles.
  See https://www.opengl.org/sdk/docs/man/ for info about specific OpenGL funcs.
 */
var Tile = function (program) { this.init(program); }

Tile.prototype.init = function(program){
    this.points = [];
    //this.colors = [];
    //thistransform = mat4();

    this.program = program;

    this.vBufferId = gl.createBuffer(); // reserve a buffer object
    gl.bindBuffer( gl.ARRAY_BUFFER, this.vBufferId ); // set active array buffer
    /* send vert positions to the buffer, must repeat this
       wherever we change the vert positions for this cube */
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW );
}

Tile.prototype.draw = function(){
    gl.bindBuffer( gl.ARRAY_BUFFER, this.vBufferId ); // set active array buffer
    // map buffer data to the vertex shader attribute
    var vPosId = gl.getAttribLocation( this.program, "vPosition" );
    gl.vertexAttribPointer( vPosId, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosId );

    gl.drawArrays(gl.TRIANGLE_FAN, 0, this.points.length );
}

Tile.prototype.numVertices = function() {return this.points.length;}

Tile.prototype.makeTile = function(x, y) {
    //distance between points, or the length of each side of the hexagon
    var d = 0.5;
    // TODO replace (1.73205081) with sqrt(3)
    var h = Math.sqrt(3)/2*d;

    var vertices = [
        vec2( x, y ),                  //0 or center point
        vec2( x + d, y ),              //1
        vec2( x + 0.5*d, y + h),       //2
        vec2( x - 0.5*d, y + h),       //3
        vec2( x - d, y ),              //4
        vec2( x - 0.5*d, y - h),       //5
        vec2( x + 0.5*d, y - h)        //6
    ];

    //vertice 1 is added a second time so that points 6 and 1 will be connected.
    this.points.push( vertices[0], vertices[1], vertices[2], vertices[3],
                  vertices[4], vertices[5], vertices[6] , vertices[1]);
}

window.onload = function()
{
    var shaders, i;

    initGL(); // basic WebGL setup for the scene 

    // load and compile our shaders into a program object
    var shaders = initShaders( gl, "vertex-shader", "fragment-shader" );

    var t0 = new Tile(shaders);

    drawables.push(t0);
    renderScene();
};
