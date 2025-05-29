export default function decorate(block) {
  const features = Array.from(block.querySelectorAll('p')).map(p => p.textContent.trim());

  const fragment = document.createDocumentFragment();

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

  block.innerHTML = '';
  fragment.appendChild(banner);
  block.appendChild(fragment);
}
