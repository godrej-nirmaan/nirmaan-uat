export default function decorate(block) {
  const fragment = document.createDocumentFragment();

  const imageSrc = block.querySelector('picture img')?.getAttribute('src') || '';
  const descriptionText = block.querySelector('p')?.textContent.trim() || '';

  const mainContainer = document.createElement('div');
  mainContainer.className = 'cb-search-main-container';

  // === Image Section ===
  if (imageSrc) {
    const img = document.createElement('img');
    img.className = 'cb-card-image';
    img.src = imageSrc;
    img.alt = 'Search Card Image';
    mainContainer.appendChild(img);
  }

  // === Description ===
  if (descriptionText) {
    const description = document.createElement('p');
    description.className = 'cb-search-desc';
    description.textContent = descriptionText;
    mainContainer.appendChild(description);
  }

  // === Search Input ===
  const searchWrapper = document.createElement('div');
  searchWrapper.className = 'cb-search-wrapper';

  searchWrapper.innerHTML = `
    <input type="text" class="cb-search-input" placeholder="Search..." />
    <button class="cb-search-button">Search</button>
  `;

  mainContainer.appendChild(searchWrapper);
  fragment.appendChild(mainContainer);

  block.innerHTML = '';
  block.appendChild(fragment);
}
