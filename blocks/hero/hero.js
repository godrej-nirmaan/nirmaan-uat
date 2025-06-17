export default function decorate(block) {
  const paragraphs = block.querySelectorAll('p');
  const bgImage = block.querySelector('picture img');

  if (paragraphs.length < 4 || !bgImage) return;

  const [headingText, subHeadingText, descText, additionalText] = [...paragraphs].map(p => p.textContent.trim());
  const imageUrl = bgImage.src;

  block.innerHTML = '';

  const hero = createHeroSection(imageUrl, headingText, subHeadingText, descText, additionalText);
  block.appendChild(hero);
}

function createHeroSection(imageUrl, heading, subHeading, description, additionalText) {
  const hero = document.createElement('div');
  hero.className = 'hero';
  hero.style.backgroundImage = `url(${imageUrl})`;

  const content = document.createElement('div');
  content.className = 'hero-content';

  content.appendChild(createHeading(heading, subHeading));
  content.appendChild(createParagraph(description));

  const additionalLine = createParagraph(additionalText);
  additionalLine.className = 'additional-line';
  content.appendChild(additionalLine);

  content.appendChild(createCTA());

  hero.appendChild(content);
  return hero;
}

function createHeading(heading, subHeading) {
  const h1 = document.createElement('h1');
  h1.innerHTML = `${heading}<br><span class="highlight">${subHeading}</span>`;
  return h1;
}

function createParagraph(text) {
  const p = document.createElement('p');
  p.textContent = text;
  return p;
}

function createCTA() {
  const a = document.createElement('a');
  a.href = '#learn-more';
  a.className = 'cta-button';
  a.textContent = 'Know how';
  return a;
}