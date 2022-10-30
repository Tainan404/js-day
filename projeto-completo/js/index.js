function refImg() {
  const imgElement = document.getElementById("carregarImg");
  console.log('Img Element', imgElement);
  return imgElement;
}

function refFigure() {
  const figure = document.getElementById('figure');
  console.log('Figure', figure);
  return figure;
}

const getImageURL = async (type = ''/* normal or gray image*/) => {
  const opts = {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json'
    },
  };
  let urlObj = null;
  const forceRandom = Math.floor(Math.random() * 100) + 1;
  try {
    urlObj = await fetch(`https://picsum.photos/600/400?random=${forceRandom}&${type}`, opts);
  } catch (error) {
    alert('um erro aconteceu');
    enableButtons();
  }
  console.log('urlObj', urlObj);
  return urlObj.url;
}

const getImageId = (url) => {
  const urlSplited = url.split('/id/');
  const imageId = urlSplited[1].split('/')[0];
  return imageId;
}

const getImageInfo = async (url) => {
  const imageId = getImageId(url);
  const opts = {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json'
    },
  };
  let imageInfo = null;
  try {
    imageInfo = await fetch(`https://picsum.photos/id/${imageId}/info`, opts).then((response) => response.json());
  } catch (error) {
    alert('erro ao buscar dados da imagem');
    enableButtons();
  }
  return imageInfo;
}

const addImageCaption = (imageInfo) => {
  const figure = refFigure();
  const oldFigCaption = figure.getElementsByTagName('figcaption')[0];
  const figCaption = document.createElement("figcaption");
  const text = document.createTextNode("Autor: " + imageInfo.author);
  figCaption.appendChild(text);
  oldFigCaption != undefined && figure.removeChild(oldFigCaption);
  figure.appendChild(figCaption);
}

const disableButtons = () => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.disabled = true);
}

const setLoadingOverlay = (display) => {
  const loadingOverlay = document.querySelector('#loadOverlay');
  loadingOverlay.style.display = display
}

const enableButtons = () => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.disabled = false);
}

async function attachImage(type = ''){
    disableButtons();
    setLoadingOverlay('inherit');
    const imgTagRef = refImg();
    const imageUrl = await getImageURL(type);
    const imageInfo = await getImageInfo(imageUrl);
    imgTagRef.onload = ()=> setLoadingOverlay('none');
    imgTagRef.src = imageUrl;
    addImageCaption(imageInfo);

    enableButtons();
}