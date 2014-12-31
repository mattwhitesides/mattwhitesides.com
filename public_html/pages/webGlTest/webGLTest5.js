var gl;
var initGL = function(canvas) {
	//Initialise a WebGL context
	try {
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
	} catch(e) {console.log(e);}
	if (!gl)
		alert("Error initializing webGL your browser may not be as rad as mine. If you are using internet explorer that won't work. Microsoft does not like open ");
}

var getShader = function(gl,id) {
	//Load the shaders from the shader-fs and shader-vs script tags in the html
	var shaderScript = document.getElementById(id);
	if(!shaderScript) {
		return null;
	}
	
	var str = "";
	var k = shaderScript.firstChild;
	while(k) {
		if (k.nodeType == 3) {
			str += k.textContent;
		}
		k = k.nextSibling;
	}
	
	var shader; 
	if(shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	}
	else if(shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	}
	else {
		return null;
	}
		
	gl.shaderSource(shader, str);
	gl.compileShader(shader);
		
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(shader));
        return null;
    }
	
	return shader;
}

var shaderProgram;
var initShaders = function() {
	//Load the shaders into a WebGL program object using getShader and initShaders.
	
	var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl, "shader-vs");
	
	//Create a WebGLProgram object and initialize it with a program object name as if by calling glCreateProgram.
	shaderProgram = gl.createProgram();
	
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);
	
	if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert("COuld not initialize shaders, brah");
	}
	
	//install a program object as part of current rendering state
	gl.useProgram(shaderProgram);
	
	//Non standard variable set for Program but useful
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	//enable or disable a generic vertex attribute array
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
	
	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
	gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
	
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	
}

var neheTexture;
var initTexture = function(){
	neheTexture = gl.createTexture;
	//Create Non standard variables and functions into the texture variable
	neheTexture.image = new Image();
	neheTexture.image.onload = function() {
		handleLoadedTexture(neheTexture)
	}
	neheTexture.image.src = "ltcTexture.png";
}

var handleLoadedTexture = function() {
	
}

//Holds the Model View Matrix
var mvMatrix = mat4.create();
//Projection matrix
var pMatrix = mat4.create();
//Holds the matrix Stack
var mvMatrixStack = [];

//Creates a mat4 matrix and adds to the stack
var mvPushMatrix = function() {
	var copy = mat4.create();
	mat4.set(mvMatrix, copy);
	mvMatrixStack.push(copy);
}
//Removes a matrix from the stack
var mvPopMatrix = function() {
	if(mvMatrixStack.length == 0) {
		throw "No matricies in the stack to pop! (mvPopMatrix())";
	}
	mvMatrixStack.pop();
}

var setMatrixUniforms = function() {
	//Gets the Model View Matrix and Projection Matrix for pushing them over the JavaScript/WebGL divide so that the shaders can see them
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
}

var degToRad = function(degrees) {
	return degrees * Math.PI / 180;
}

var pyramidVertexPositionBuffer;
var pyramidVertexColorBuffer;
var cubeVertexPositionBuffer;
var cubeVertexColorBuffer;
var cubeVertexIndexBuffer;

var initBuffers = function() {
	//Load up buffers containing information about the objects in the scene
	pyramidVertexPositionBuffer = gl.createBuffer();
	//Specifies the target to which the buffer object is bound. The symbolic constant must be GL_ARRAY_BUFFER or GL_ELEMENT_ARRAY_BUFFER
	//void glBindBuffer(GLenum target,GLuint buffer);
	gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexPositionBuffer);
	
	var pyramidVertices = [
		//Front
		 0.0, 1.0, 0.0,
		-1.0,-1.0, 1.0,
		 1.0,-1.0, 1.0,
		 //Right
		 0.0, 1.0, 0.0,
		 1.0,-1.0, 1.0,
		 1.0,-1.0,-1.0,		 
		 //Back
		 0.0, 1.0, 0.0,
		 1.0,-1.0,-1.0,
		-1.0,-1.0,-1.0,
		 //Left
		 0.0, 1.0, 0.0,
		-1.0,-1.0,-1.0,
		-1.0,-1.0, 1.0
	];
		
	//creates and initializes a buffer object's data store
	//void glBufferData(GLenum target,GLsizeiptr size,const GLvoid * data,GLenum usage);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pyramidVertices), gl.STATIC_DRAW);
	
	pyramidVertexPositionBuffer.itemSize = 3;
	pyramidVertexPositionBuffer.numItems = 12;
	
	//Set up the Color Buffers for the pyramids
	pyramidVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexColorBuffer);
	
	var pyramidColors = [];
	
	for(var i = 0; i < 4; i++) {
		pyramidColors = pyramidColors.concat(rgbaConverter(190,0,0,1,pyramidColors));
		pyramidColors = pyramidColors.concat(rgbaConverter(148,181,0,1,pyramidColors));
		pyramidColors = pyramidColors.concat(rgbaConverter(29,75,111,1,pyramidColors));
	}
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pyramidColors), gl.STATIC_DRAW);
	pyramidVertexColorBuffer.itemSize = 4;
	pyramidVertexColorBuffer.numItems = 12;
	
	cubeVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
	
	var cubeVertices = [
		// Front face
		-1.0, -1.0,  1.0,
		1.0, -1.0,  1.0,
		1.0,  1.0,  1.0,
		-1.0,  1.0,  1.0,

		// Back face
		-1.0, -1.0, -1.0,
		-1.0,  1.0, -1.0,
		1.0,  1.0, -1.0,
		1.0, -1.0, -1.0,

		// Top face
		-1.0,  1.0, -1.0,
		-1.0,  1.0,  1.0,
		1.0,  1.0,  1.0,
		1.0,  1.0, -1.0,

		// Bottom face
		-1.0, -1.0, -1.0,
		1.0, -1.0, -1.0,
		1.0, -1.0,  1.0,
		-1.0, -1.0,  1.0,

		// Right face
		1.0, -1.0, -1.0,
		1.0,  1.0, -1.0,
		1.0,  1.0,  1.0,
		1.0, -1.0,  1.0,

		// Left face
		-1.0, -1.0, -1.0,
		-1.0, -1.0,  1.0,
		-1.0,  1.0,  1.0,
		-1.0,  1.0, -1.0
	];
		
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);
	
	//non standard variables inserted into the buffer for refrence 
	cubeVertexPositionBuffer.itemSize = 3;
	cubeVertexPositionBuffer.numItems = 24;
	
	cubeVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
	
	var cubeColors = [];
	var unpackedCubeColors = [];

	cubeColors = [
		rgbaConverter(255,253,222,1,cubeColors), 	//Front		
		rgbaConverter(43,77,153,1,cubeColors),		//Back 		
		rgbaConverter(139,244,255,1,cubeColors),	//Top		
		rgbaConverter(255,183,32,1,cubeColors),		//Bottom		
		rgbaConverter(168,61,31,1,cubeColors),		//Right		
		rgbaConverter(20,204,58,1,cubeColors) 		//Left	
	]		
	
	for (var i in cubeColors) {
		for(var j = 0; j < 4; j++) {
			unpackedCubeColors = unpackedCubeColors.concat(cubeColors[i]);
		}
	}
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpackedCubeColors), gl.STATIC_DRAW);
	cubeVertexColorBuffer.itemSize = 4;
	cubeVertexColorBuffer.numItems = 24;	
	
	cubeVertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
	
	var cubeVertexIndices = [
		0, 1, 2,	0, 2, 3, 	//Front
		4, 5, 6,	4, 6, 7, 	//Back
		8, 9, 10,	8, 10, 11,	//Top
		12, 13, 14,	12, 14, 15,	//Bottom
		16, 17, 18,	16, 18, 19,	//Right
		20, 21, 22,	20, 22, 23	//Left
	]
	
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
	cubeVertexIndexBuffer.itemSize = 1;
	cubeVertexIndexBuffer.numItems = 36;
}

var rgbaConverter = function(r,g,b,a, array) {
	return ([(r/255),(g/255),(b/255),a]);
}

var scaleObject = function(objVerticies, itemSize, numItems, scale) {
	for(var i = 0; i < numItems; i++) {
		var iteration = i * itemSize;
		for(var j = 0; j < itemSize; j++) {
			objVerticies[j + iteration] = objVerticies[j + iteration] * scale;
		}
	}
	return objVerticies
}

//Rotation Tracking in degrees
var rPyramid = 0;
var rCube = 0;

var drawScene = function() {
	//Tells webGL about the size of the canvas
	//void glViewport(GLint x,GLint y,GLsizei width,GLsizei height);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	//Clear canvas before the draw 
	//void glClear(	GLbitfield mask);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	//Sets up perspective as by default it is orthographic 
	//mat4.perspective(fovy, aspect, near, far, dest)
	mat4.perspective(45, (gl.viewportWidth / gl.viewportHeight), 0.1, 100.0, pMatrix);
	//Set dest to an identity matrix.
	//mat4.identity(dest)
	mat4.identity(mvMatrix);
	
	//DRAW TRIANGLE
	 
	//Translates mat by the vector vec.
	//mat4.translate(mat, vec, dest)
	mat4.translate(mvMatrix, [-1.5, 0.0, -7.0]);
	
	//Stores the state of the matrix while being drawn 
	mvPushMatrix();

		//mat4.rotate(mat, angle, axis, dest)
		//Rotates mat by angle (given in radians) around the axis given by the vector axis.
		mat4.rotate(mvMatrix, degToRad(rPyramid), [0,1,0]);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexPositionBuffer);
		//glVertexAttribPointer — define an array of generic vertex attribute data
		//void glVertexAttribPointer(GLuint index,GLint size,GLenum type,GLboolean normalized,GLsizei stride,const GLvoid * pointer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, pyramidVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexColorBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, pyramidVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
		
		//preforms mapping and moves it to the videocard 
		setMatrixUniforms();
		//glDrawArrays — render primitives from array data
		//void glDrawArrays(GLenum mode,GLint first,GLsizei count);
		gl.drawArrays(gl.TRIANGLES, 0, pyramidVertexPositionBuffer.numItems);
		
	//Retrives the drawn matrix all at once
	mvPopMatrix();
	
	//DRAW SQUARE
	
	//This carries over from the first call to translate we did putting us at 1.5,0.0,-7.0 after this is called
	mat4.translate(mvMatrix, [3.0, 0.0, 0.0]);
	
	mvPushMatrix();
		
		mat4.rotate(mvMatrix, degToRad(rCube), [1,1,1]);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
								
		gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, cubeVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);							
		
		//Makes the cubes array buffer the current one to be used
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
		setMatrixUniforms();
		gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		
	mvPopMatrix();
}

//Fucntion to keep frames rendering on a set time interval
var lastTime = 0;
var animate = function() {
	var timeNow = new Date().getTime();
	if(lastTime != 0) {
		var elapsed = timeNow - lastTime;
		rPyramid += (90 * elapsed) / 1000.0;
		rCube += (75 * elapsed) / 1000.0;
	}
	lastTime = timeNow;
}

var tick = function() {
	requestAnimFrame(tick);
	drawScene();
	animate();
}

var webGLStart = function() {
	var canvas = document.getElementById("testCanvas");
	initGL(canvas);
	initShaders();
	initBuffers();
	initTexture();
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	
	//drawScene();
	
	tick();
}