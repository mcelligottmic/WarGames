/*
  To render a hexagon, you will need to compute and set the coordinates of
  each of the six vertices. Add each of the seven (x,y) coordinate pairs to the
  points array. Make sure to render a triangle fan instead of separate triangles.
  See https://www.opengl.org/sdk/docs/man/ for info about specific OpenGL funcs.
 */

var Box = function (program, x, y, z) {
    this.points = [];

    this.transform = mat4(); // initialize object transform as identity matrix

    this.makeBox(x, y, z, 1);

    this.program = program;

    this.vBufferId = gl.createBuffer(); // reserve a buffer object
    gl.bindBuffer( gl.ARRAY_BUFFER, this.vBufferId ); // set active array buffer
    /* send vert positions to the buffer, must repeat this
       wherever we change the vert positions for this cube */
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW );
}

//distance between two points
Tile.DEFAULT_DISTANCE = 0.5;

Box.prototype.draw = function() {
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

    gl.drawArrays(gl.TRIANGLES, 0, this.points.length);
}

Box.prototype.numVertices = function() {return this.points.length;}


//TODO expand makeSquare to makeSide(not limited to cube)
//build two triangles and put them together
Box.prototype.makeSquare = function(x, y, z, w) {
    //TODO change distance to Length, Width, and Height
    var d = Tile.DEFAULT_DISTANCE * 0.5;

    //vertices going counterclockwise starting with the top left point
    var vertices = [
        vec4( x - d, y + d , z, w),      //TL
        vec4( x - d, y - d, z , w),      //BL
        vec4( x + d, y - d, z, w),       //BR
        vec4( x + d, y + d, z, w),       //TR
    ];

    this.points.push( vertices[0], vertices[1], vertices[2], vertices[0],
                  vertices[2], vertices[3]);
}

//TODO rotate sides according to the right axis
Box.prototype.makeCube = function(x, y, z, w) {
    var d = Tile.DEFAULT_DISTANCE * 0.5;

    this.makeSquare(x, y, z-d, w); //Back
    this.makeSquare(x, y, z+d, w); //Front
    //rotate
    this.makeSquare(x-d, y, z, w); //Left
    //rotate
    this.makeSquare(x+d, y, z, w); //Right
    //rotate
    this.makeSquare(x, y+d, z, w); //Top
    //rotate
    this.makeSquare(x, y-d, z, w); //Bot
}

/* Translate this cube along the specified canonical axis. */
Box.prototype.move = function(dist, axis) {
    var delta = [0, 0, 0];

    if (axis === undefined) axis = X_AXIS;
    delta[axis] = dist;

    this.transform = mult(translate(delta), this.transform);
}

/* Rotate this side around the specified canonical axis. */
Box.prototype.turnSquare = function(angle, axis){
    var avec = [0, 0, 0];

    if (axis === undefined) axis = Y_AXIS;
    avec[axis] = 1;

    this.transform = mult(this.transform, rotate(angle, avec));
}