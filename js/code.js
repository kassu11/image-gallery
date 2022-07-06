console.log("??");




if(location.search.length === 0) {
	
	const button = document.createElement("button");
	button.textContent = "Create";
	button.addEventListener("click", e => {
		location.hash = 1;
		location.search = textarea.value.split("\n").join("&");
		// window.history.pushState(null, null, "?" + textarea.value.split("\n").join("&"));
	});

	textarea.addEventListener("input", e => typeInTextArea(false))

	document.body.append(button);
} else {
	// remove later
	textarea.remove();
	document.querySelector(".textareaImgPreviewTools").remove();


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
		const img = document.querySelector(".preview img");
		if(img) document.querySelector("#hideLoadedImages").append(img);

		if(loadedImages[index - 1]) {
			document.querySelector(".preview").append(loadedImages[index - 1]);
		} else {
			const image = document.createElement("img");
			image.src = images[index - 1];
			document.querySelector(".preview").append(image);
			loadedImages[index - 1] = image;
		}
		
		window.history.replaceState(null, null, location.search + "#" + index);
	}
}

