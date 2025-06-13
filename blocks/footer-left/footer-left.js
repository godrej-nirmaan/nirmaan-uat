export default function decorate(block) {
    console.log("FAQ left item", block);
    const pictures = block.querySelectorAll('picture');
    console.log("FAQ left item pictures", pictures);
    const p = block.querySelectorAll('p');
    const allLinks = block.querySelectorAll('a');
    console.log("FAQ left item allLinks", allLinks);
    console.log("FAQ left item p", p);
    const mainDiv = document.createElement('div');
    mainDiv.className = 'footer-left';

    const logoPicture = pictures[0];
    let logoImg;
    if (logoPicture) {
        logoImg = logoPicture.querySelector('img');
        if (logoImg) {
            logoImg.classList.add('footer-logo');
            logoImg.setAttribute('loading', 'lazy');
            logoPicture.removeChild(logoImg);
        }
    }
    if (logoImg) mainDiv.append(logoImg);

    const linkDiv = document.createElement('div');
    linkDiv.className = 'footer-links';
    const pArr = Array.from(p);
    pArr.slice(0, -2).forEach((para) => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = para.textContent;
        link.className = 'footer-link';
        linkDiv.append(link);
    });

    // add a vertical divider 
    const divider = document.createElement('div');
    divider.className = 'footer-divider';
    const contactDiv = document.createElement('div');
    allLinks.forEach((link , index) => {
        const contactLinkDiv = document.createElement('div');
        contactLinkDiv.className = 'footer-contact-link';
        const contactLinkIcon = document.createElement('span');
        contactLinkIcon.className = 'footer-contact-icon';
        // Take the next picture after the logo
        const contactLinkPicture = pictures[index + 1];
        let contactImg;
        if (contactLinkPicture) {
            contactImg = contactLinkPicture.querySelector('img');
            if (contactImg) {
                contactImg.classList.add('footer-contact-picture');
                contactImg.setAttribute('loading', 'lazy');
                contactLinkPicture.removeChild(contactImg);
                contactLinkIcon.append(contactImg);
            }
        }
        if (link.href && link.textContent) {
            const footerLink = document.createElement('a');
            footerLink.href = link.href;
            footerLink.textContent = link.textContent;
            footerLink.className = 'footer-contact';
            contactLinkDiv.append(contactLinkIcon, footerLink);
            contactDiv.append(contactLinkDiv);
        }
    });
    mainDiv.append(linkDiv);
    mainDiv.append(divider);
    mainDiv.append(contactDiv);
    block.replaceChildren(mainDiv);
}