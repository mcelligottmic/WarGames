/*
  To render a hexagon, you will need to compute and set the coordinates of
  each of the six vertices. Add each of the seven (x,y) coordinate pairs to the
  points array. Make sure to render a triangle fan instead of separate triangles.
  See https://www.opengl.org/sdk/docs/man/ for info about specific OpenGL funcs.
 */
 
// TODO 5/3 Constructor should take in a color for this tile
var Tile = function (program, x, y, color) {
    this.points = [];
    this.color = color;

    this.transform = mat4(); // initialize object transform as identity matrix

    this.makeTile(x, y, 0, 1);

    this.program = program;

    this.vBufferId = gl.createBuffer(); // reserve a buffer object
    gl.bindBuffer( gl.ARRAY_BUFFER, this.vBufferId ); // set active array buffer
    /* send vert positions to the buffer, must repeat this
       wherever we change the vert positions for this cube */
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW );
}

//distance between two points
Tile.DEFAULT_DISTANCE = 0.5;
// distance between two tile centers
Tile.DEFAULT_HEIGHT = Math.sqrt(3) / 2;
// spacing between adjacent tiles
Tile.BORDER_SIZE = Tile.DEFAULT_HEIGHT * 0.05;

// TODO 5/3 This tile's color should be passed via the corresponding shader program uniform variable
Tile.prototype.draw = function() {
    gl.useProgram(this.program);

    var projId = gl.getUniformLocation(this.program, "projection"); 
    gl.uniformMatrix4fv(projId, false, flatten(projection));

    var xformId = gl.getUniformLocation(this.program, "modeltransform");
    gl.uniformMatrix4fv(xformId, false, flatten(this.transform));

    var colorId = gl.getUniformLocation(this.program, "color"); 
    gl.uniform4fv(colorId, flatten(this.color));

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
    var d = Tile.DEFAULT_DISTANCE;
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
Tile.prototype.move = function(dist, axis) {
    var delta = [0, 0, 0];

    if (axis === undefined) axis = X_AXIS;
    delta[axis] = dist;

    this.transform = mult(translate(delta), this.transform);
}

