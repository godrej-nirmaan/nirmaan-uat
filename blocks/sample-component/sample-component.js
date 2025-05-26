export default function decorate(block) {
  const cols = [...block.firstElementChild.children];

  const logoText = cols[0]?.textContent?.trim();
  const promoText = cols[1]?.textContent?.trim();
  const ctaText = cols[2]?.textContent?.trim();

  // Clear existing content
  block.textContent = '';
  block.classList.add('sample-component');

  // Logo Section
  const logoSection = document.createElement('div');
  logoSection.className = 'gc-logo-section';

  const logo = document.createElement('div');
  logo.className = 'gc-logo-text';
  logo.textContent = logoText;

  logoSection.appendChild(logo);
  
  const promo = document.createElement('div');
  promo.className = 'gc-promo-text';
  promo.textContent = promoText;

  // CTA Button
  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'gc-cta-wrapper';

  const cta = document.createElement('a');
  cta.className = 'gc-cta-button';
  cta.href = '#';
  cta.textContent = ctaText;

  ctaWrapper.appendChild(cta);

  // Append all to block
  block.appendChild(logoSection);
  block.appendChild(promo);
  block.appendChild(ctaWrapper);
}
