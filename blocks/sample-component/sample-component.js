export default function decorate(block) {
  const cols = [...block.firstElementChild.children];

  const logoText = cols[0]?.textContent?.trim();
  const promoText = cols[1]?.textContent?.trim();
  const ctaText = cols[2]?.textContent?.trim();

  block.innerHTML = `
    <div class="gc-logo-section">
      <div class="gc-logo-text">${logoText}</div>
    </div>
    <div class="gc-promo-text">${promoText}</div>
    <div class="gc-cta-wrapper">
      <a href="#" class="gc-cta-button">${ctaText}</a>
    </div>
  `;
}
