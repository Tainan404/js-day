function refImg() {
  const imgElement = document.getElementById("carregarImg");
  console.log('Img Element', imgElement);
  return imgElement;
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
    imgTagRef.onload = ()=> setLoadingOverlay('none');
    imgTagRef.src = imageUrl;

    enableButtons();
}