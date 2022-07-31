function shuffleImage(img, index, loadedImages) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const encryptedData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const deCryptedData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const dataWidth = encryptedData.width * 4;

  const randomXClone = getRandomLength(canvas.width);
  let randomY = getRandomLength(canvas.height);

  for(let y = 0; y < canvas.height; y++) {
    const placeToY = randomY.index;
    randomY = randomY.next;
    let randomX = randomXClone;
    for(let x = 0; x < canvas.width; x++) {
      const placeToX = randomX.index;
      randomX = randomX.next;
      moveColorData(x, y, placeToX, placeToY, encryptedData.data, deCryptedData.data, dataWidth);
    }
  }
  
  ctx.putImageData(deCryptedData, 0, 0);
  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const image = document.createElement("img");
    image.src = url;
    document.querySelector(".preview").append(image);
    loadedImages[index - 1] = image;
    imageLoaded = true;
  });
}


function getColorForCoods(x, y, array) {
  const startIndex = x * 4 + array.width * 4 * y;
  const rgba = `rgba(${array.data[startIndex + 0]}, ${array.data[startIndex + 1]}, ${array.data[startIndex + 2]}, ${array.data[startIndex + 3] / 255})`;

  return rgba;
}
function moveColorData(x1, y1, x2, y2, encryptedData, decrypted, dataWidth) {
  const startIndex1 = x1 * 4 + dataWidth * y1;
  const startIndex2 = x2 * 4 + dataWidth * y2;

  decrypted[startIndex2] = encryptedData[startIndex1];
  decrypted[startIndex2 + 1] = encryptedData[startIndex1 + 1];
  decrypted[startIndex2 + 2] = encryptedData[startIndex1 + 2];
  decrypted[startIndex2 + 3] = encryptedData[startIndex1 + 3];
}

function getRandomLength(length) {
  let start = .23454646;
  const output = [{index: 0, next: null, prev: null}];
  let first = output[0];
  for(let i = 1; i < length; i++) {
    start = start * 5.5 % 1;
    const index = Math.floor(start * (i - 1));
    
    const parent = output[index];
    if(i % 2 === 0) {
      const obj = {index: i, next: parent, prev: parent.prev};
      if(parent.prev?.next) parent.prev.next = obj;
      parent.prev = obj;
      output.push(obj);
      if(obj.prev === null) first = obj;
    } else {
      const obj = {index: i, next: parent.next, prev: parent};
      if(parent.next?.prev) parent.next.prev = obj;
      parent.next = obj;
      output.push(obj);
    }
  }

  return first;
}