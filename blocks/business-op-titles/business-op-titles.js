export default function decorate(block) {
  // console.log('Customer base title block: ', block);

  const images = block.querySelectorAll('picture');
  const titles = block.querySelectorAll('h2');
  const description1s = block.querySelectorAll('p');

  block.textContent = '';

  const mainContainer = document.createElement('div');
  mainContainer.className = 'main-container';

  const imageTitleContainer = document.createElement('div');
  imageTitleContainer.className = 'image-title-container';

  if (images.length > 0) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'image-wrapper';
    imageWrapper.appendChild(images[0]);
    imageTitleContainer.appendChild(imageWrapper);
  }

  if (titles.length > 0) {
    const titleEl = document.createElement('h2');
    titleEl.className = 'title';
    titleEl.textContent = titles[0].textContent;
    imageTitleContainer.appendChild(titleEl);
  }

  mainContainer.appendChild(imageTitleContainer);

  if (description1s.length > 0) {
    const descEl = document.createElement('p');
    descEl.className = 'description1';
    descEl.textContent = description1s[0].textContent;
    mainContainer.appendChild(descEl);
  }

  block.appendChild(mainContainer);
}
