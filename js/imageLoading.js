const loadedImages = {};

function loadNewImageUrl(url) {
	const image = document.createElement("img");
	image.src = url;
	loadedImages[url] = {img: image};
	return image;
}

function getImage(url) {
	return loadedImages[url]?.img;
}

function deloadImage(elem) {
	const container = document.querySelector("#hideLoadedImages");
	if(typeof elem === "object") container.append(elem);
}

async function loadPreviewImage2(url) {
	// const image = new Image(url);
	const image = getImage(url) ?? loadNewImageUrl(url);
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = 100;
	canvas.height = 100;

	// document.body.append(image);

	let loaded = false;
	const loadPromise = new Promise(resolve => loaded = resolve);

	if(!image.complete) image.onload = v => loaded();
	else loaded();

	console.log("eka")
	
	await loadPromise;
	console.log("toka")

	ctx.drawImage(image, 0, 0);
	const jpegUrl = canvas.toDataURL("image/jpeg");
	loadedImages[url].preview = jpegUrl;
	

	return jpegUrl;
}
async function loadPreviewImage3(url) {
	const image = document.createElement("img");
	image.src = url;
	image.crossOrigin="anonymous"
	console.log(url)
	// const image = getImage(url) ?? loadNewImageUrl(url);
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = 100;
	canvas.height = 100;

	// document.body.append(image);

	let loaded = false;
	const loadPromise = new Promise(resolve => loaded = resolve);

	image.onload = v => {
		console.log("??")
		loaded()
	};

	console.dir(image)
	
	await loadPromise;
	console.log("toka")

	const width = image.naturalWidth > image.naturalHeight ? Math.round(image.naturalWidth / image.naturalHeight * canvas.width) : canvas.width;
	const height = image.naturalHeight > image.naturalWidth ? Math.round(image.naturalHeight / image.naturalWidth * canvas.height) : canvas.height;

	console.log(width, height)

	ctx.drawImage(image, Math.ceil(canvas.width - width) / 2, Math.ceil(canvas.height - height), width, height);
	const jpegUrl = canvas.toDataURL("image/jpeg");
	// loadedImages[url].preview = jpegUrl;

	// console.log(jpegUrl)
	

	return jpegUrl;
}

async function loadPreviewImage(url) {
	const image = getImage(url) ?? loadNewImageUrl(url);
	image.crossOrigin = "anonymous";
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = 100;
	canvas.height = 100;

	if(loadedImages[url]?.preview) return loadedImages[url].preview;

	let loaded = false;
	const loadPromise = new Promise(resolve => loaded = resolve);
	image.onload = loaded;

	await loadPromise;
	
	const width = image.naturalWidth > image.naturalHeight ? Math.round(image.naturalWidth / image.naturalHeight * canvas.width) : canvas.width;
	const height = image.naturalHeight > image.naturalWidth ? Math.round(image.naturalHeight / image.naturalWidth * canvas.height) : canvas.height;

	ctx.drawImage(image, Math.ceil(canvas.width - width) / 2, Math.ceil(canvas.height - height), width, height);
	const jpegUrl = canvas.toDataURL("image/jpeg");
	loadedImages[url].preview = jpegUrl;

	return jpegUrl;
}