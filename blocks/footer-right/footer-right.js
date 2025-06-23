export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.className = 'footer-right';

  const imgs = block.querySelectorAll('picture');
  const links = block.querySelectorAll('p');

  imgs.forEach((picture, index) => {
    const img = picture.querySelector('img');
    const link = links[index];

    if (!img || !link) return;

    img.className = `footer-right-img-${index + 1}`;
    img.loading = 'lazy';
    img.alt = `Footer image ${index + 1}`;

    const anchor = document.createElement('a');
    const anchorInP = link.querySelector('a');
    anchor.href = anchorInP?.href || link.textContent.trim();
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.appendChild(img);

    mainDiv.appendChild(anchor);
  });

  block.replaceWith(mainDiv);
}
