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

document.querySelector(".imageRowContainer").addEventListener("paste", e => {
	if(e?.target?.tagName !== "INPUT") return;
	e.stopPropagation();
  e.preventDefault();

	const clipboardData = e.clipboardData || window.clipboardData;
  const pastedData = clipboardData.getData("Text");

	const rowsCount = document.querySelectorAll(".imageRowContainer .header .gg-swap")?.length + 1 || 3;
	const currentInputs = Array.from(document.querySelectorAll(".imageRowContainer .imageRow input"));
	const pasteInputIndex = currentInputs.indexOf(e.target);
	const pasteArray = pastedData.split("\n");
	const howManyInputsToAdd = pasteArray.length - (currentInputs.length - pasteInputIndex);
	const howManyRowsToAdd = Math.ceil(howManyInputsToAdd / rowsCount);
	lisaaUusiRivi(howManyRowsToAdd, rowsCount);

	const allInputs = document.querySelectorAll(".imageRowContainer .imageRow input");

	for(let i = 0; i < pasteArray.length; i+= rowsCount) {
		for(let j = 0; j < rowsCount; j++) {
			const inputIndex = pasteInputIndex + i + j;
			if(pasteArray[i + j] == undefined) break;
			allInputs[inputIndex].value = pasteArray[i + j];
		}
	}
});

function lisaaUusiRivi(num, rows) {
	for(let i = 0; i < num; i++) {
		const rowBox = document.createElement("div");
		rowBox.classList.add("box");
		const moveRow = document.createElement("div");
		moveRow.classList.add("moveRow");
		const moveRowIcons = document.createElement("i");
		moveRowIcons.classList.add("gg-controller");
		const imageRow = document.createElement("div");
		imageRow.classList.add("imageRow");
		const indexNum = document.createElement("div");
		indexNum.classList.add("indexNum");

		moveRow.append(moveRowIcons);
		rowBox.append(moveRow, indexNum, imageRow);
	
		for(let j = 0; j < rows; j++) {
			const input = document.createElement("input");
			const swap = document.createElement("i");
			swap.classList.add("gg-swap");
			imageRow.append(input);
			if(j + 1 !== rows) imageRow.append(swap);
		}
	
		document.querySelector(".imageRowContainer").append(rowBox)
	}
}

document.querySelector(".header").addEventListener("click", e => {
	if(e.target?.tagName !== "BUTTON") return;
	
	const headerDivs = Array.from(document.querySelectorAll(".imageRowContainer .qualityRows div"));
	const index = headerDivs.indexOf(e.target.parentElement);
	headerDivs[index].remove();
	document.querySelector(".header .gg-swap + .gg-swap, .header .gg-swap:last-child")?.remove()
	document.querySelectorAll(".imageRow").forEach(row => {
		console.log(row, row.querySelectorAll("input"), index)
		row.querySelectorAll("input")[index].remove();
		row.querySelector(".gg-swap + .gg-swap, .gg-swap:last-child")?.remove();
	});
});