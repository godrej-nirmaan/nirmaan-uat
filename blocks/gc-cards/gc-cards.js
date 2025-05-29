function createGCCard(imageUrl, textContent) {
    const cardContainer = document.createElement("div");
    cardContainer.className = "gc-card";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "gc-card-image";

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = textContent || "GC Card Image";

    imageWrapper.appendChild(img);

    const textWrapper = document.createElement("div");
    textWrapper.className = "gc-card-text";

    const paragraph = document.createElement("p");
    paragraph.textContent = textContent;

    textWrapper.appendChild(paragraph);

    cardContainer.appendChild(imageWrapper);
    cardContainer.appendChild(textWrapper);

    return cardContainer;
}

export default function decorate(block) {
    const cardElements = block.querySelectorAll(':scope > div');

    block.innerHTML = '';
    block.classList.add('gc-cards-container');

    cardElements.forEach(card => {
        const text = card.querySelector('p')?.textContent || '';
        const image = card.querySelector('picture img');
        const imageUrl = image?.src || '';

        const cardNode = createGCCard(imageUrl, text);
        block.appendChild(cardNode);
    });
}
