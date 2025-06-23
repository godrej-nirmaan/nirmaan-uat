export default function decorate(block) {
  const pictures = block.querySelectorAll('picture');
  const paragraphs = block.querySelectorAll('p');
  const links = block.querySelectorAll('a');

  const mainDiv = document.createElement('div');
  mainDiv.className = 'footer-left';

  const logoImg = pictures[0]?.querySelector('img');
  if (logoImg) {
    logoImg.className = 'footer-logo';
    logoImg.loading = 'lazy';
    mainDiv.appendChild(logoImg);
  }

  const linkDiv = document.createElement('div');
  linkDiv.className = 'footer-links';

  paragraphs.forEach((para, i) => {
    if (i < paragraphs.length - 2) {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = para.textContent.trim();
      link.className = 'footer-link';
      linkDiv.appendChild(link);
    }
  });

  const divider = document.createElement('div');
  divider.className = 'footer-divider';

  const contactDiv = document.createElement('div');

  links.forEach((link, i) => {
    const contactLinkDiv = document.createElement('div');
    contactLinkDiv.className = 'footer-contact-link';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'footer-contact-icon';

    const contactImg = pictures[i + 1]?.querySelector('img');
    if (contactImg) {
      contactImg.className = 'footer-contact-picture';
      contactImg.loading = 'lazy';
      iconSpan.appendChild(contactImg);
    }

    const contactAnchor = document.createElement('a');
    contactAnchor.href = link.href;
    contactAnchor.textContent = link.textContent.trim();
    contactAnchor.className = 'footer-contact';

    contactLinkDiv.append(iconSpan, contactAnchor);
    contactDiv.appendChild(contactLinkDiv);
  });

  mainDiv.append(linkDiv, divider, contactDiv);
  block.replaceChildren(mainDiv);
}
