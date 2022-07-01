console.log("??");

if(location.search.length === 0) {
	const textarea = document.createElement("textarea");
	textarea.placeholder = "https://i.imgur.com/123abc.png\nhttps://i.ibb.co/456def/name.jpg"
	
	const button = document.createElement("button");
	button.textContent = "Create";
	button.addEventListener("click", e => {
		location.hash = 1;
		location.search = textarea.value.split("\n").join("&");
	});

	document.body.append(textarea, button);
} else {
	const loadedImages = [];
	const images = location.search.substring(1).split("&");
	if(location.hash.length === 0) location.hash = 1;
	let index = parseInt(location.hash.substring(1));

	const container = document.createElement("div");
	const left = document.createElement("button");
	const right = document.createElement("button");
	container.append(left, right);
	left.textContent = "<";
	right.textContent = ">";

	window.addEventListener("keydown", e => {
		const lastIndex = index;

		if(e.key === "ArrowRight") {
			if(++index > images.length) index = 1;
		} else if(e.key === "ArrowLeft") {
			if(--index < 1) index = images.length;
		}

		if(lastIndex !== index) updateImage();
	})

	left.addEventListener("click", e => {
		if(--index < 1) index = images.length;
		updateImage();
	});

	right.addEventListener("click", e => {
		if(++index > images.length) index = 1;
		updateImage();
	});

	document.body.append(container);
	updateImage();
	
	function updateImage() {
		document.querySelector("img")?.remove();
		const image = document.createElement("img");
		container.before(image);
		image.src = images[index - 1];
		location.hash = index;
		loadedImages[index - 1] = image;
	}
}