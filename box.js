/*
  To render a hexagon, you will need to compute and set the coordinates of
  each of the six vertices. Add each of the seven (x,y) coordinate pairs to the
  points array. Make sure to render a triangle fan instead of separate triangles.
  See https://www.opengl.org/sdk/docs/man/ for info about specific OpenGL funcs.
 */
// TODO 5/3 Constructor should also take in a color for this box
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
Box.DEFAULT_DISTANCE = 0.5;

// TODO 5/3 color should be passed into the corresponding shader program uniform variable
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
Box.prototype.makeSide = function(a, b, c, d) {

    this.points.push(a, b, c, c, d, a);
}

//TODO rotate sides according to the right axis
Box.prototype.makeBox = function(x, y, z) {
    var d = Box.DEFAULT_DISTANCE * 0.5;

    var vertices = [
        vec4( x - d, y + d , z + d, 1),      //FTL
        vec4( x - d, y - d, z + d, 1),      //FBL
        vec4( x + d, y - d, z + d, 1),       //FBR
        vec4( x + d, y + d, z + d, 1),       //FTR
        vec4( x - d, y + d , z - d, 1),      //BTL
        vec4( x - d, y - d, z - d, 1),      //BBL
        vec4( x + d, y - d, z - d, 1),       //BBR
        vec4( x + d, y + d, z - d, 1),       //BTR
    ];

    this.makeSide(vertices[0], vertices[4], vertices[5], vertices[1]); //Left
    this.makeSide(vertices[0], vertices[1], vertices[2], vertices[3]); //Front
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

