export default function decorate(block) {
  const fragment = document.createDocumentFragment();

  const image = block.querySelector('picture');
  const title = block.querySelector('h2');
  const description = block.querySelector('p');

  const mainContainer = document.createElement('div');
  mainContainer.className = 'main-container';

  const imageTitleContainer = document.createElement('div');
  imageTitleContainer.className = 'image-title-container';

  if (image) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'image-wrapper';
    imageWrapper.appendChild(image);
    imageTitleContainer.appendChild(imageWrapper);
  }

  if (title) {
    const titleEl = document.createElement('h2');
    titleEl.className = 'title';
    titleEl.textContent = title.textContent.trim();
    imageTitleContainer.appendChild(titleEl);
  }

  mainContainer.appendChild(imageTitleContainer);

  if (description) {
    const descEl = document.createElement('p');
    descEl.className = 'description';
    descEl.textContent = description.textContent.trim();
    mainContainer.appendChild(descEl);
  }

  block.innerHTML = '';
  fragment.appendChild(mainContainer);
  block.appendChild(fragment);
}
