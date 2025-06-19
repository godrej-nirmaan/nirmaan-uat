export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.className = 'footer-bottom';

  const paragraphs = block.querySelectorAll('p');
  paragraphs.forEach((text, index) => {
    const textDiv = document.createElement('div');
    textDiv.className = 'footer-bottom-text';
    textDiv.textContent = text.textContent.trim();

    if (index === paragraphs.length - 1) {
      textDiv.classList.add('footer-text-last');
    }

    mainDiv.appendChild(textDiv);
  });

  block.replaceWith(mainDiv);
}