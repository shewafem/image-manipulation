const imageInput = document.getElementById("image-input");
const urlInput = document.getElementById("url-input");
const clearButton = document.getElementById("clear-button");
const canvas = document.getElementById("image")
const ctx = canvas.getContext("2d");

// Event listener for form submission
document
	.getElementById("image-form")
	.addEventListener("submit", function (event) {
		event.preventDefault(); // Prevent form submission

		const imageUrl = urlInput.value;
		if (imageUrl && imageInput.files[0]) {
			alert("Выберите один источник!");
		} else if (imageInput.files[0]) {
			// If file input has a file selected, load image from file input
			loadImageFromFile(imageInput.files[0]);
		} else if (imageUrl) {
			loadImageFromUrl(imageUrl);
		} else {
			alert("Изображение не выбрано.");
		}
		clearButton.style.display = "block";
	});

// Function to load image from URL
function loadImageFromUrl(url) {
	const img = new Image();
	img.onload = function () {
		drawImageOnCanvas(img);
	};
	img.onerror = function () {
		console.error("Ошибка загрузки URL.");
	};
    img.crossOrigin = "Anonymous";
	img.src = url;
}

// Function to load image from file input
function loadImageFromFile(file) {
	const reader = new FileReader();
	reader.onload = function (event) {
		const img = new Image();
		img.onload = function () {
			drawImageOnCanvas(img);
		};
		img.onerror = function () {
			console.error("Ошибка загрузки файла.");
		};
		img.src = event.target.result;
	};
	reader.readAsDataURL(file);
}

// Function to draw image onto canvas
function drawImageOnCanvas(img) {
    const canvas = document.getElementById("image")
    const ctx = canvas.getContext("2d");
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0);
	document.body.main.appendChild(canvas);
}

canvas.addEventListener("mousemove", (e) => {
    const canvas = document.getElementById("image")
	const { offsetX: x, offsetY: y } = e;
	const {
		data: [red, green, blue],
	} = canvas.getContext("2d").getImageData(x, y, 1, 1);

	updateInfo({
		x,
		y,
		red,
		green,
		blue,
		width: canvas.width,
		height: canvas.height,
	});
});

function updateInfo({ x, y, red, green, blue, width, height }) {
	document.querySelector(
		".color"
	).innerHTML = `R: ${red}, G: ${green}, B: ${blue}`;
	document.querySelector(".coordinates").innerHTML = `X: ${x}, Y: ${y}`;
	document.querySelector(
		".size"
	).innerHTML = `Ширина: ${width} x Высота: ${height}`;
}

function clearCanvas() {
    const canvas = document.getElementById("image")
    const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = 0;
	canvas.height = 0;
	clearButton.style.display = "none";
	document.querySelector(".color").innerHTML = "";
	document.querySelector(".coordinates").innerHTML = "";
	document.querySelector(".size").innerHTML = "";
}

clearButton.addEventListener("click", clearCanvas);
