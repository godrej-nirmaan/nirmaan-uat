export default function decorate(block) {
  // Clear existing content
  block.innerHTML = '';

  // Create header
  const header = document.createElement('div');
  header.className = 'gc-header';
  header.textContent = 'sample-component';

  // Create logo section
  const logoSection = document.createElement('div');
  logoSection.className = 'gc-logo-section';

  const logoText = document.createElement('div');
  logoText.className = 'gc-logo-text';
  logoText.textContent = 'Godrej | CAPITAL';

  logoSection.appendChild(logoText);

  // Create promo text
  const promoText = document.createElement('div');
  promoText.className = 'gc-promo-text';
  promoText.textContent = 'Take your business to new heights with Godrej Capital Loans for Business.';

  // Create CTA button
  const cta = document.createElement('a');
  cta.className = 'gc-cta-button';
  cta.href = '#';
  cta.textContent = 'Explore Offerings';

  // Append all to block
  block.appendChild(header);
  block.appendChild(logoSection);
  block.appendChild(promoText);
  block.appendChild(cta);
}
