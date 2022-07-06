const selectedPreviewImages = [];

document.querySelector(".textareaImgPreview").addEventListener("click", e => {
	
	if(e.target?.classList.contains("selection")) {
		e.preventDefault();
		const parent = e.target.closest(".prevImage");
		const index = parseInt(parent.getAttribute("index"));
		selectedPreviewImages[index] = parent.classList.toggle("selected");
		
	}
})


document.querySelector(".textareaImgPreviewTools button").addEventListener("click", e => {
	console.log(selectedPreviewImages);
	const textarea = document.querySelector("textarea");

	let startIndex = -1;
	const textareaImages = textarea.value.split("\n");

	for(let i = 0; i < selectedPreviewImages.length; i++) {
		const value = selectedPreviewImages[i];
		if(startIndex === -1 && value === true) startIndex = i;
		else if(startIndex !== -1 && i - startIndex > 1 && value !== true) {
			console.log("Reverse?", startIndex, i);
			textareaImages.splice(startIndex, i - startIndex, ...textareaImages.slice(startIndex, i).reverse());
		} else if(startIndex !== -1 && i === selectedPreviewImages.length - 1 && value === true) {
			textareaImages.splice(startIndex, i - startIndex + 1, ...textareaImages.slice(startIndex, i + 1).reverse());
		} if(value !== true) startIndex = -1;
	}

	textarea.value = textareaImages.join("\n");
	typeInTextArea(true);
	
});