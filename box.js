/*
  To render a hexagon, you will need to compute and set the coordinates of
  each of the six vertices. Add each of the seven (x,y) coordinate pairs to the
  points array. Make sure to render a triangle fan instead of separate triangles.
  See https://www.opengl.org/sdk/docs/man/ for info about specific OpenGL funcs.
 */

var Box = function (program, x, y, z, distX, distY, distZ,color) {
    this.points = [];
    this.color = color;

    this.transform = mat4(); // initialize object transform as identity matrix

    this.makeBox(x, y, z, distX, distY, distZ);

    this.program = program;

    this.vBufferId = gl.createBuffer(); // reserve a buffer object
    gl.bindBuffer( gl.ARRAY_BUFFER, this.vBufferId ); // set active array buffer
    /* send vert positions to the buffer, must repeat this
       wherever we change the vert positions for this cube */
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW );
}

//distance between two points
Box.DEFAULT_DISTANCE = 0.5;

Box.prototype.draw = function() {
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

    gl.drawArrays(gl.TRIANGLES, 0, this.points.length);
}

Box.prototype.numVertices = function() {return this.points.length;}

//build two triangles and put them together to make a rectangle
Box.prototype.makeSide = function(a, b, c, d) {

    this.points.push(a, b, c, c, d, a);
}

//creates a rectangle given the center point, x distance, y distance, and z distance
Box.prototype.makeBox = function(x, y, z, distX, distY, distZ) {
    distX = distX * 0.5;
    distY = distY * 0.5;
    distZ = distZ * 0.5;

    var vertices = [
        vec4( x - distX, y + distY , z + distZ, 1),      //FTL
        vec4( x - distX, y - distY, z + distZ, 1),      //FBL
        vec4( x + distX, y - distY, z + distZ, 1),       //FBR
        vec4( x + distX, y + distY, z + distZ, 1),       //FTR
        vec4( x - distX, y + distY , z - distZ, 1),      //BTL
        vec4( x - distX, y - distY, z - distZ, 1),      //BBL
        vec4( x + distX, y - distY, z - distZ, 1),       //BBR
        vec4( x + distX, y + distY, z - distZ, 1),       //BTR
    ];

    this.makeSide(vertices[0], vertices[4], vertices[5], vertices[1]); //Left
    //looks like bottom
    this.makeSide(vertices[0], vertices[1], vertices[2], vertices[3]); //Front
    this.makeSide(vertices[3], vertices[7], vertices[6], vertices[2]); //Right
    //looks like top
    this.makeSide(vertices[7], vertices[6], vertices[5], vertices[4]); //Back
    //looks like back
    this.makeSide(vertices[7], vertices[4], vertices[0], vertices[3]); //Top
    //looks like front
    this.makeSide(vertices[1], vertices[5], vertices[6], vertices[2]); //Bottom
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

