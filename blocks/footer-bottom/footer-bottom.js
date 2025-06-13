export default function decorate(block) {
    const texts = block.querySelectorAll('p');

    const mainDiv = document.createElement('div');
    mainDiv.className = 'footer-bottom';

    texts.forEach((text, index) => {
        const textDiv = document.createElement('div');
        textDiv.className = 'footer-bottom-text';
        textDiv.textContent = text.textContent.trim();
        if (index === texts.length - 1) {
            textDiv.classList.add('footer-text-last');
        }
        mainDiv.append(textDiv);
    });
    block.replaceWith(mainDiv);
}