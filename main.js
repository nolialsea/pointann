let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

var width = window.innerWidth,
	height = window.innerHeight;

canvas.width = width;
canvas.height = height;
canvas.style.width = width;
canvas.style.height = height;
document.body.appendChild(canvas);

//let nn = new synaptic.Architect.Perceptron(2,5,5,5,5,2);
let nn = new neataptic.architect.Perceptron(2,5,5,5,2);

//Lower/raise random initial weights
let connLength = nn.connections.length;
for (var i = 0; i < connLength; i++) {
	nn.connections[i].weight /= 10;
}

let pix = [];
let nbPixel = 3;
for (let i=0; i<nbPixel; i++){
	pix.push([Math.random(), Math.random()]);
}

(function render() {
	window.requestAnimationFrame(render);
	ctx.fillStyle = "rgba(0,0,0,0.05)";
	ctx.fillRect(0, 0, width, height);
	
	ctx.fillStyle = "rgba(255,255,255,1)";
	for (let i=0; i<nbPixel; i++){
		ctx.fillRect(pix[i][0]*width, pix[i][1]*height, 1, 1);
		pix[i] = nn.activate(pix[i]);
	}
})()