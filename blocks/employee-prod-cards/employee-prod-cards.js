export function createCard({ title, image, service, description, promo }) {
  const card = document.createElement('div');
  card.className = 'promo-card';

  card.innerHTML = `
    <div class="card-header">${title}</div>
    <div class="card-body">
      <div class="upper-section">
        ${image ? `<img class="card-image" src="${image}" alt="${service || title}">` : ''}
        <h4 class="card-service">${service}</h4>
      </div>
      <p class="description">${description}</p>
      <hr class="divider">
      <div class="promo-wrapper">
        <div class="promo-section">
          <div class="promo-icon">%</div>
          <div class="promo-text">${promo}</div>
        </div>
        <div class="card-buttons">
          <button class="btn primary">Avail Now</button>
          <button class="btn secondary">Know More</button>
        </div>
      </div>
    </div>
  `;

  return card;
}

export default function decorate(block) {
  const fragment = document.createDocumentFragment();

  const cards = Array.from(block.querySelectorAll(':scope > div')).map((card) => {
    const texts = card.querySelectorAll('p');
    const image = card.querySelector('picture img')?.getAttribute('src') || '';

    return {
      title: texts[0]?.textContent.trim() || '',
      image,
      service: texts[1]?.textContent.trim() || '',
      description: texts[2]?.textContent.trim() || '',
      promo: texts[3]?.textContent.trim() || '',
    };
  });

  block.innerHTML = '';

  const carouselWrapper = document.createElement('div');
  carouselWrapper.className = 'carousel-wrapper';

  const carousel = document.createElement('div');
  carousel.className = 'carousel';

  cards.forEach((cardData) => {
    carousel.appendChild(createCard(cardData));
  });

  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-btn prev';
  prevBtn.textContent = '‹';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-btn next';
  nextBtn.textContent = '›';

  const scrollCarousel = (direction) => {
    carousel.scrollBy({ left: direction * carousel.offsetWidth, behavior: 'smooth' });
  };

  prevBtn.addEventListener('click', () => scrollCarousel(-1));
  nextBtn.addEventListener('click', () => scrollCarousel(1));

  let autoplay = setInterval(() => scrollCarousel(1), 4000);

  carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoplay));
  carouselWrapper.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => scrollCarousel(1), 4000);
  });

  let startX = 0;
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) scrollCarousel(diff > 0 ? 1 : -1);
  });

  carouselWrapper.append(prevBtn, carousel, nextBtn);
  fragment.appendChild(carouselWrapper);
  block.appendChild(fragment);
}
