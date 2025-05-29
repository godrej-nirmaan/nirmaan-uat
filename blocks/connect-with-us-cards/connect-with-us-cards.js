function createContactCard(img1, img2, text, linkText) {
  const card = document.createElement('div');
  card.className = 'contact-card';

  const leftImage = document.createElement('div');
  leftImage.className = 'contact-card-img';

  const imgEl = document.createElement('img');
  imgEl.src = img1;
  imgEl.alt = 'Card image';
  leftImage.appendChild(imgEl);

  const content = document.createElement('div');
  content.className = 'contact-card-content';

  const icon = document.createElement('img');
  icon.src = img2;
  icon.alt = 'Icon';
  icon.className = 'contact-card-icon';

  const paragraph = document.createElement('p');
  paragraph.textContent = text;

  const button = document.createElement('a');
  button.className = 'contact-card-button';
  button.textContent = linkText;

  content.appendChild(icon);
  content.appendChild(paragraph);
  content.appendChild(button);

  card.appendChild(leftImage);
  card.appendChild(content);

  return card;
}

function decorate(block) {
  const originalCards = block.querySelectorAll(':scope > div');

  const cardData = Array.from(originalCards).map((card) => {
    const imgs = card.querySelectorAll('picture img');
    const texts = card.querySelectorAll('p');

    const img1 = imgs[0] ? imgs[0].src : '';
    const img2 = imgs[1] ? imgs[1].src : '';
    const text = texts[0] ? texts[0].textContent : '';
    const link = texts[1] || {};
    const linkText = link.textContent || 'Learn More';

    return { img1, img2, text, linkText };
  });

  block.innerHTML = '';

  cardData.forEach(({ img1, img2, text, linkText }) => {
    const contactCard = createContactCard(img1, img2, text, linkText);
    block.appendChild(contactCard);
  });
}

export default decorate;
