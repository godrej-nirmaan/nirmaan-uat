function createContactCard(img1, img2, text, linkText) {
  const card = document.createElement('div');
  card.className = 'contact-card';

  card.innerHTML = `
    <div class="contact-card-img">
      <img src="${img1}" alt="Card image">
    </div>
    <div class="contact-card-content">
      <img src="${img2}" alt="Icon" class="contact-card-icon">
      <p>${text}</p>
      <a class="contact-card-button">${linkText}</a>
    </div>
  `;

  return card;
}

function decorate(block) {
  const fragment = document.createDocumentFragment();

  block.querySelectorAll(':scope > div').forEach((card) => {
    const imgs = card.querySelectorAll('picture img');
    const texts = card.querySelectorAll('p');

    const img1 = imgs[0]?.src || '';
    const img2 = imgs[1]?.src || '';
    const text = texts[0]?.textContent.trim() || '';
    const linkText = texts[1]?.textContent.trim() || 'Learn More';

    fragment.appendChild(createContactCard(img1, img2, text, linkText));
  });

  block.innerHTML = '';
  block.appendChild(fragment);
}

export default decorate;
