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
	const images = location.search.substring(1).split("&");
	if(location.hash.length === 0) location.hash = 1;
	const image = document.createElement("img");
	let index = parseInt(location.hash.substring(1));
	image.src = images[index - 1];

	const container = document.createElement("div");
	const left = document.createElement("button");
	const right = document.createElement("button");
	container.append(left, right);
	left.textContent = "<";
	right.textContent = ">";
	left.addEventListener("click", e => {
		if(--index < 1) index = images.length;
		location.hash = index;
		image.src = images[index - 1];
	});

	right.addEventListener("click", e => {
		if(++index > images.length) index = 1;
		location.hash = index;
		image.src = images[index - 1];
	});

	document.body.append(image, container);
	
}