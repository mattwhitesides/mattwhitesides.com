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

var triangleVertexPositionBuffer;
var triangleVertexColorBuffer;
var squareVertexPositionBuffer;
var squareVertexColorBuffer;

var initBuffers = function() {
	//Load up buffers containing information about the objects in the scene
	triangleVertexPositionBuffer = gl.createBuffer();
	//Specifies the target to which the buffer object is bound. The symbolic constant must be GL_ARRAY_BUFFER or GL_ELEMENT_ARRAY_BUFFER
	//void glBindBuffer(GLenum target,GLuint buffer);
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
	
	var triangleVertices = [
		-1.0,1.0,0.0,
		-1.0,-1.0,0.0,
		 2.0,0.0,0.0
	];
		
	//creates and initializes a buffer object's data store
	//void glBufferData(GLenum target,GLsizeiptr size,const GLvoid * data,GLenum usage);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
	
	triangleVertexPositionBuffer.itemSize = 3;
	triangleVertexPositionBuffer.numItems = 3;
	
	//Set up the Color Buffers for the Triangles
	triangleVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
	
	var triangleColors = [];
	
	triangleColors = rgbaConverter(190,0,0,1,triangleColors);
	triangleColors = rgbaConverter(148,181,0,1,triangleColors);
	triangleColors = rgbaConverter(29,75,111,1,triangleColors);
	//console.log("Triangle Color: " + triangleColors.toString());
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleColors), gl.STATIC_DRAW);
	triangleVertexColorBuffer.itemSize = 4;
	triangleVertexColorBuffer.numItems = 3;
	
	squareVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
	
	var squareVertices = [
		 1.0,  2.0,  0.0,
		-1.0,  1.0,  0.0,
		 1.0, -2.0,  0.0,
		-1.0, -1.0,  0.0
	];
		
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareVertices), gl.STATIC_DRAW);
	
	//non standard variables inserted into the buffer for refrence 
	squareVertexPositionBuffer.itemSize = 3;
	squareVertexPositionBuffer.numItems = 4;
	
	squareVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
	
	var squareColors = [];
	
	squareColors = rgbaConverter(49,53,64,1,squareColors);
	squareColors = rgbaConverter(74,233,255,1,squareColors);
	squareColors = rgbaConverter(233,64,90,1,squareColors);
	squareColors = rgbaConverter(250,186,45,1,squareColors);
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareColors), gl.STATIC_DRAW);
	squareVertexColorBuffer.itemSize = 4;
	squareVertexColorBuffer.numItems = 4;	
}

var rgbaConverter = function(r,g,b,a, array) {
	return array.concat([(r/255),(g/255),(b/255),a]);
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
var rTri = 0;
var rSquare = 0;

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
		mat4.rotate(mvMatrix, degToRad(rTri), [0,1,0]);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
		//glVertexAttribPointer — define an array of generic vertex attribute data
		//void glVertexAttribPointer(GLuint index,GLint size,GLenum type,GLboolean normalized,GLsizei stride,const GLvoid * pointer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, triangleVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
		
		//preforms mapping and moves it to the videocard 
		setMatrixUniforms();
		//glDrawArrays — render primitives from array data
		//void glDrawArrays(GLenum mode,GLint first,GLsizei count);
		gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);
		
	//Retrives the drawn matrix all at once
	mvPopMatrix();
	
	//DRAW SQUARE
	
	//This carries over from the first call to translate we did putting us at 1.5,0.0,-7.0 after this is called
	mat4.translate(mvMatrix, [3.0, 0.0, 0.0]);
	
	mvPushMatrix();
		
		mat4.rotate(mvMatrix, degToRad(rSquare), [1,0,0]);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
								
		gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);							
								
		setMatrixUniforms();
		
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
	
	mvPopMatrix();
}

//Fucntion to keep frames rendering on a set time interval
var lastTime = 0;
var animate = function() {
	var timeNow = new Date().getTime();
	if(lastTime != 0) {
		var elapsed = timeNow - lastTime;
		rTri += (90 * elapsed) / 1000.0;
		rSquare += (75 * elapsed) / 1000.0;
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
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	
	//drawScene();
	
	tick();
}