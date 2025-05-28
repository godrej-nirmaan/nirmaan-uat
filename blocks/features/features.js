export default function decorate(block) {
    const paragraphs = block.querySelectorAll('p');
    const features = Array.from(paragraphs).map(p => p.textContent.trim());

  // Clear existing content
  block.textContent = '';

  // === Banner Container ===
  const banner = document.createElement('div');
  banner.className = 'banner-container';

  features.forEach((feature, index) => {
    const section = document.createElement('div');
    section.className = 'banner-section';
    section.textContent = feature;

    if (index < features.length - 1) {
      const separator = document.createElement('div');
      separator.className = 'banner-separator';
      section.appendChild(separator);
    }

    banner.appendChild(section);
  });

  block.appendChild(banner);
}
