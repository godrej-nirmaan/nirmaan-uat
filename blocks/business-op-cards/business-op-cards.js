export function createCard({
  title,
  image,
  service,
  description,
  promo,
}) {
  const card = document.createElement('div');
  card.className = 'promo-card';

  const header = document.createElement('div');
  header.className = 'card-header';
  header.textContent = title;

  const body = document.createElement('div');
  body.className = 'card-body';

  const cardService = document.createElement('h4');
  cardService.className = 'card-service';
  cardService.textContent = service;

  const upperSection = document.createElement('div');
  upperSection.className = 'upper-section';

  if (image) {
    const img = document.createElement('img');
    img.className = 'card-image';
    img.src = image;
    img.alt = service || title;
    upperSection.appendChild(img);
  }

  upperSection.appendChild(cardService);

  const desc = document.createElement('p');
  desc.className = 'description';
  desc.textContent = description;

  const divider = document.createElement('hr');
  divider.className = 'divider';

  const promoSection = document.createElement('div');
  promoSection.className = 'promo-section';

  const promoIcon = document.createElement('div');
  promoIcon.className = 'promo-icon';
  promoIcon.textContent = '%';

  const promoText = document.createElement('div');
  promoText.className = 'promo-text';
  promoText.textContent = promo;

  promoSection.appendChild(promoIcon);
  promoSection.appendChild(promoText);

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'card-buttons';

  const btnPrimary = document.createElement('button');
  btnPrimary.className = 'btn primary';
  btnPrimary.textContent = 'Avail Now';

  const btnSecondary = document.createElement('button');
  btnSecondary.className = 'btn secondary';
  btnSecondary.textContent = 'Know More';

  buttonContainer.appendChild(btnPrimary);
  buttonContainer.appendChild(btnSecondary);

  const promoWrapper = document.createElement('div');
  promoWrapper.className = 'promo-wrapper';
  promoWrapper.appendChild(promoSection);
  promoWrapper.appendChild(buttonContainer);

  body.appendChild(upperSection);
  body.appendChild(desc);
  body.appendChild(divider);
  body.appendChild(promoWrapper);
  card.appendChild(header);
  card.appendChild(body);

  return card;
}

export default function decorate(block) {
  // console.log('Customer Base Card Block:', block);
  const cards = [];
  const cardElements = block.querySelectorAll(':scope > div');

  cardElements.forEach((card) => {
    const texts = card.querySelectorAll('p');
    const image = card.querySelector('picture > img');
    const imageUrl = image?.getAttribute('src') || '';

    const cardData = {
      title: texts[0]?.textContent.trim() || '',
      image: imageUrl,
      service: texts[1]?.textContent.trim() || '',
      description: texts[2]?.textContent.trim() || '',
      promo: texts[3]?.textContent.trim() || '',
    };

    cards.push(cardData);
  });

  block.innerHTML = '';

  const carouselWrapper = document.createElement('div');
  carouselWrapper.className = 'carousel-wrapper';

  const carousel = document.createElement('div');
  carousel.className = 'carousel';

  cards.forEach((cardData) => {
    const cardEl = createCard(cardData);
    carousel.appendChild(cardEl);
  });

  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-btn prev';
  prevBtn.textContent = '‹';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-btn next';
  nextBtn.textContent = '›';

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
  });

  let autoplayInterval = setInterval(() => {
    carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
  }, 4000);

  carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  carouselWrapper.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
      carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
    }, 4000);
  });

  let startX = 0;
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (diff > 50) {
      carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
    } else if (diff < -50) {
      carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
    }
  });

  carouselWrapper.appendChild(prevBtn);
  carouselWrapper.appendChild(carousel);
  carouselWrapper.appendChild(nextBtn);
  block.appendChild(carouselWrapper);
}
