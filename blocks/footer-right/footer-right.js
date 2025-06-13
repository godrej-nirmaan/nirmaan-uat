export default function decorate(block) {
    const imgs = block.querySelectorAll('picture');
    const links = block.querySelectorAll('p');
    console.log("All imgs" , imgs);
    console.log("All links" , links);

    const mainDiv = document.createElement('div');
    mainDiv.className = 'footer-right';
    imgs.forEach((img, index) => {
        const imgElement = img.querySelector('img');
        const linkElement = links[index];
        if (imgElement && linkElement) {
            imgElement.classList.add('footer-right-img');
            imgElement.setAttribute('loading', 'lazy');
            imgElement.setAttribute('alt', `Footer image ${index + 1}`);
            let url = '';
            const anchorInP = linkElement.querySelector('a');
            if (anchorInP) {
                url = anchorInP.href;
            } else {
                url = linkElement.textContent.trim();
            }

            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';
            anchor.appendChild(imgElement);

            mainDiv.append(anchor);
        }
    });
    block.replaceWith(mainDiv);
}