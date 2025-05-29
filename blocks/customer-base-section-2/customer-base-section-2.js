export default function decorate(block) {
  const fragment = document.createDocumentFragment();

  const imageUrl = block.querySelector('picture img')?.getAttribute('src') || '';
  const paragraphs = block.querySelectorAll('p');

  const mainContainer = document.createElement('div');
  mainContainer.className = 'cb-section-2-main-container';

  if (imageUrl) {
    const img = document.createElement('img');
    img.className = 'cb-card-image';
    img.src = imageUrl;
    img.alt = 'Section Image';
    mainContainer.appendChild(img);
  }

  if (paragraphs[0]) {
    const description = document.createElement('p');
    description.className = 'cb-section-2-desc';
    description.textContent = paragraphs[0].textContent.trim();
    mainContainer.appendChild(description);
  }

  if (paragraphs[1]) {
    const button = document.createElement('button');
    button.className = 'cb-section-2-button';
    button.textContent = paragraphs[1].textContent.trim();
    mainContainer.appendChild(button);
  }

  fragment.appendChild(mainContainer);
  block.innerHTML = '';
  block.appendChild(fragment);
}

