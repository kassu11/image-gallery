const textarea = document.querySelector("textarea");

setTimeout(e => {
	if(textarea.value.length) typeInTextArea(false);
}, 500)


function typeInTextArea(skipUpdate = false) {
	const textareaValue = textarea.value;
	const container = document.querySelector(".textareaImgPreview");
	container.innerHTML = "";
	if(!skipUpdate) selectedPreviewImages.length = 0;

	textareaValue.split("\n").forEach(async (url, index) => {
		const div = document.createElement("div");
		div.classList.add("prevImage");
		const selectedElem = document.createElement("div");
		selectedElem.classList.add("selection");
		const image = document.createElement("img");
		div.style.order = index;
		div.setAttribute("index", index);
		div.classList.toggle("selected", selectedPreviewImages[index] === true);
		
		div.append(selectedElem, image);
		container.append(div);
		
		const imageUrl = await loadPreviewImage(url);
		image.src = imageUrl;
	});

}