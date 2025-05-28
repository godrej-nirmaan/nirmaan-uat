export default function decorate(block) {
  console.log("Block is this is: ", block);

  const image = block.querySelector("picture > img");
  const imageUrl = image?.getAttribute('src') || '';

  const mainContainer = document.createElement('div');
  mainContainer.className = "cb-section-2-main-container";

  if (imageUrl) {
    const img = document.createElement('img');
    img.className = 'cb-card-image';
    img.src = imageUrl;
    mainContainer.appendChild(img);
  }

  const paragraphs = block.querySelectorAll("p");

  if (paragraphs[0]) {
    const description = document.createElement('p');
    description.className = 'cb-section-2-desc';
    description.textContent = paragraphs[0].textContent;
    mainContainer.appendChild(description);
  }

  if (paragraphs[1]) {
    const button = document.createElement("button");
    button.className = "cb-section-2-button";
    button.textContent = paragraphs[1].textContent;
    mainContainer.appendChild(button);
  }

  // Clear and append
  block.innerHTML = '';
  block.appendChild(mainContainer);
}
