export default function decorate(block) {
  const paragraphs = block.querySelectorAll('p');
  const bgImage = block.querySelector('picture > img');

  if (paragraphs.length < 3 || !bgImage) return;

  const [headingText, subHeadingText, descText] = [...paragraphs].map(p => p.textContent);

  // Clear the block content
  block.innerHTML = '';

  // Create and append the hero section
  const hero = createHeroSection(bgImage.src, headingText, subHeadingText, descText);
  block.appendChild(hero);
}

/**
 * Creates the hero section element.
 * @param {string} imageUrl - Background image URL.
 * @param {string} heading - Main heading text.
 * @param {string} subHeading - Subheading text.
 * @param {string} description - Description text.
 * @returns {HTMLElement} - The hero section element.
 */
function createHeroSection(imageUrl, heading, subHeading, description) {
  const hero = document.createElement('div');
  hero.className = 'hero';
  hero.style.backgroundImage = `url(${imageUrl})`;

  const content = document.createElement('div');
  content.className = 'hero-content';

  content.appendChild(createHeading(heading, subHeading));
  content.appendChild(createParagraph(description));
  content.appendChild(createCTA());

  hero.appendChild(content);
  return hero;
}

/**
 * Creates the heading element with highlighted subheading.
 * @param {string} heading - Main heading text.
 * @param {string} subHeading - Subheading text.
 * @returns {HTMLElement} - The heading element.
 */
function createHeading(heading, subHeading) {
  const h1 = document.createElement('h1');
  h1.innerHTML = `${heading} <br><span class="highlight">${subHeading}</span>`;
  return h1;
}

/**
 * Creates a paragraph element.
 * @param {string} text - Paragraph text.
 * @returns {HTMLElement} - The paragraph element.
 */
function createParagraph(text) {
  const p = document.createElement('p');
  p.textContent = text;
  return p;
}

/**
 * Creates the call-to-action button.
 * @returns {HTMLElement} - The CTA anchor element.
 */
function createCTA() {
  const a = document.createElement('a');
  a.href = '#learn-more';
  a.className = 'cta-button';
  a.textContent = 'Know how';
  return a;
}
