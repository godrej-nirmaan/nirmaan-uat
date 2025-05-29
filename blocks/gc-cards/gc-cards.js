function createGCCard(imageUrl, textContent) {
  const cardContainer = document.createElement('div');
  cardContainer.className = 'gc-card';

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'gc-card-image';

  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = textContent || 'GC Card Image';

  imageWrapper.appendChild(img);

  const textWrapper = document.createElement('div');
  textWrapper.className = 'gc-card-text';

  const paragraph = document.createElement('p');
  paragraph.textContent = textContent;

  textWrapper.appendChild(paragraph);

  cardContainer.append(imageWrapper, textWrapper);
  return cardContainer;
}

export default function decorate(block) {
  const fragment = document.createDocumentFragment();
  block.classList.add('gc-cards-container');

  const cardElements = block.querySelectorAll(':scope > div');

  cardElements.forEach((card) => {
    const text = card.querySelector('p')?.textContent.trim() || '';
    const imageUrl = card.querySelector('picture img')?.src || '';

    const cardNode = createGCCard(imageUrl, text);
    fragment.appendChild(cardNode);
  });

  block.innerHTML = '';
  block.appendChild(fragment);
}
