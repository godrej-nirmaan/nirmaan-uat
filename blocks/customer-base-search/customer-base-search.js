export default function decorate(block) {
  const image = block.querySelector('picture > img');
  const imageUrl = image?.getAttribute('src') || '';

  const mainContainer = document.createElement('div');
  mainContainer.className = 'cb-search-main-container';

  // === Image Section ===
  if (imageUrl) {
    const img = document.createElement('img');
    img.className = 'cb-card-image';
    img.src = imageUrl;
    mainContainer.appendChild(img);
  }

  // === Description ===
  const desc = block.querySelector('p');
  if (desc) {
    const description = document.createElement('p');
    description.className = 'cb-search-desc';
    description.textContent = desc.textContent;
    mainContainer.appendChild(description);
  }

  // === Search Input ===
  const searchWrapper = document.createElement('div');
  searchWrapper.className = 'cb-search-wrapper';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Search...';
  input.className = 'cb-search-input';

  const button = document.createElement('button');
  button.className = 'cb-search-button';
  button.textContent = 'Search';

  searchWrapper.appendChild(input);
  searchWrapper.appendChild(button);
  mainContainer.appendChild(searchWrapper);

  // Clear and append
  block.innerHTML = '';
  block.appendChild(mainContainer);
}
