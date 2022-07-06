function typeInTextArea(text) {
	const textareaValue = text.target.value;
	const container = document.querySelector(".textareaImgPreview");
	container.innerHTML = "";

	textareaValue.split("\n").forEach(async (url, index) => {
		const imageUrl = await loadPreviewImage(url);
		const image = document.createElement("img");
		image.src = imageUrl;
		image.style.order = index;
		container.append(image);

		console.log("url")
	});

}