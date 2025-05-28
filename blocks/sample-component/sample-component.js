export default function decorate(block) {
  block.classList.add('sample-component');

  const picture = block.querySelector('picture');
  const paragraphs = block.querySelectorAll('p');

  // Clear block content
  block.textContent = '';

  // === Logo Section ===
  const logoSection = document.createElement('div');
  logoSection.className = 'gc-logo-section';

  if (picture) {
    const logoWrapper = document.createElement('div');
    logoWrapper.className = 'gc-logo-image';
    logoWrapper.appendChild(picture);
    logoSection.appendChild(logoWrapper);
  }

  // === Promo Text ===
  const promoText = document.createElement('div');
  promoText.className = 'gc-promo-text';
  if (paragraphs[0]) promoText.textContent = paragraphs[0].textContent;

  // === CTA Button ===
  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'gc-cta-wrapper';

  if (paragraphs[1]) {
    const cta = document.createElement('a');
    cta.className = 'gc-cta-button';
    cta.href = '#';
    cta.textContent = paragraphs[1].textContent;
    ctaWrapper.appendChild(cta);
  }

  // === Append to block ===
  block.appendChild(logoSection);
  block.appendChild(promoText);
  block.appendChild(ctaWrapper);
}
