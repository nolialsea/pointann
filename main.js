let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

var width = window.innerWidth,
	height = window.innerHeight;

canvas.width = width;
canvas.height = height;
canvas.style.width = width;
canvas.style.height = height;
document.body.appendChild(canvas);

//Create layers
let structure = [
	new neataptic.Layer.Dense(2),	//Input
	new neataptic.Layer.Dense(5),
	new neataptic.Layer.Dense(5),
	new neataptic.Layer.Dense(5),
	new neataptic.Layer.Dense(2)	//Output
];

//Change activation function (input/output layers stays logistic)
for (var i = 1; i < structure.length-1; i++) {
	for (var j = 0; j < structure[i].nodes[0].nodes.length; j++) {
		structure[i].nodes[0].nodes[j].squash = 
			i <= 2 ? activation.TANH :  //Two first hidden layers
			activation.RELU;			//Third and last hidden layer
	}
}

//Connect layers
for (var i = 0; i < structure.length-1; i++) {
	structure[i].connect(structure[i+1]);
}

//Create NN from layers
let nn = new neataptic.architect.Construct(structure);

//Lower/raise initial random weights
let connLength = nn.connections.length;
for (var i = 0; i < connLength; i++) {
	nn.connections[i].weight /= 10;
}

//Create cloud random of points
let point = [];
let nbPoint = 3;
for (let i=0; i<nbPoint; i++){
	point.push([Math.random(), Math.random()]);
}

(function render() {
	window.requestAnimationFrame(render);
	ctx.fillStyle = "rgba(0,0,0,0.05)";
	ctx.fillRect(0, 0, width, height);
	
	//Transforms and draw points
	ctx.fillStyle = "rgba(255,255,255,1)";
	for (let i=0; i<nbPoint; i++){
		ctx.fillRect(point[i][0]*width, point[i][1]*height, 1, 1);
		point[i] = nn.activate(point[i]);
	}
})()