export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.className = 'footer-right';

  const pictures = Array.from(block.querySelectorAll('picture'));
  const paragraphs = Array.from(block.querySelectorAll('p'));

  pictures.forEach((picture, index) => {
    const img = picture.querySelector('img');
    const paragraph = paragraphs[index];

    if (!img || !paragraph) return;

    img.className = `footer-right-img-${index + 1}`;
    img.loading = 'lazy';
    img.alt = `Footer image ${index + 1}`;

    const anchor = document.createElement('a');
    const anchorInParagraph = paragraph.querySelector('a');
    anchor.href = anchorInParagraph?.href || paragraph.textContent.trim();
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.appendChild(img);

    mainDiv.appendChild(anchor);
  });

  block.replaceWith(mainDiv);
}