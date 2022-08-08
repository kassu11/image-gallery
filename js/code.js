let imageLoaded = false;
const correctUrl = decodeURI(location.href)
if(location.href !== correctUrl) {
	location.replace(correctUrl);
}

if(location.search.length === 0) {
	const button = document.createElement("button");
	button.textContent = "Create";
	button.addEventListener("click", e => {
		location.hash = 1;
		const imageRows = Array.from(document.querySelectorAll(".imageRowContainer .imageRow"));
		const text = imageRows.map(row => {
			const inputs = Array.from(row.querySelectorAll("input"));
			const urls = inputs.map(input => input.value).join("|");
			return urls;
		})
		location.search = text.join("&");
		// window.history.pushState(null, null, "?" + textarea.value.split("\n").join("&"));
	});
	
	lisaaUusiRivi(1, 3);
	document.querySelector(".preview").style.display = "none";
	document.body.append(button);
} else {
	const loadedImages = [];
	const images = location.search.substring(1).split("&").map(e => e.split("|"));
	let index = 1;
	let shuffle = false;
	document.querySelector(".imageRowContainer").remove();
	if(location.hash.length === 0) location.hash = "index=1";
	else {
		location.hash.substring(1).split("&").forEach(value => {
			if(value.startsWith("index=")) {
				index = parseInt(value.substring(6));
			} else if(value === "shuffle") shuffle = true;
		});
	}


	window.addEventListener("keydown", e => {
		const lastIndex = index;

		if(!imageLoaded) return;

		if(e.key === "ArrowRight") {
			if(++index > images.length) index = 1;
		} else if(e.key === "ArrowLeft") {
			if(--index < 1) index = images.length;
		}

		if(lastIndex !== index) updateImage();
	})

	updateImage();
	
	function updateImage() {
		imageLoaded = false;
		const img = document.querySelector(".preview img");
		if(img) document.querySelector("#hideLoadedImages").append(img);

		if(loadedImages[index - 1]) {
			document.querySelector(".preview").append(loadedImages[index - 1]);
			imageLoaded = true;
		} else {
			if(shuffle) {
				const image = document.createElement("img");
				image.crossOrigin = "anonymous";
				image.src = images[index - 1][0];
				image.onload = e => {
					shuffleImage(image, index, loadedImages);
				}
			} else {
				const image = document.createElement("img");
				image.src = images[index - 1][0];
				document.querySelector(".preview").append(image);
				loadedImages[index - 1] = image;
				imageLoaded = true;
			}
		}
		
		window.history.replaceState(null, null, location.search + "#" + `index=${index}${shuffle ? "&shuffle" : ""}`);
	}
}

document.querySelector(".header p")?.addEventListener("click", e => {
	// reverse list
	const images = Array.from(document.querySelectorAll(".imageRowContainer .box"));
	images.reverse();
	const parent = document.querySelector(".imageRowContainer");
	images.forEach(image => {
		parent.append(image);
	});

})