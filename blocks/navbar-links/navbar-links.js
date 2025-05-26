export default function decorate(block) {
  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';

  const nav = document.createElement('nav');
  nav.className = 'navbar';

  // navbar-links
  const links = ['Home', 'Solutions', 'Resources', 'Support', 'FAQs'];
  const linksList = document.createElement('ul');
  linksList.className = 'navbar-links';

  links.forEach((text) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#'; // Replace with actual URLs
    a.textContent = text;
    li.appendChild(a);
    linksList.appendChild(li);
  });

  // navbar-buttons
  const buttons = ['Login', 'Signup'];
  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'navbar-buttons';

  buttons.forEach((text) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.className = `btn-${text.toLowerCase()}`;
    buttonsDiv.appendChild(btn);
  });

  nav.appendChild(linksList);
  nav.appendChild(buttonsDiv);
  navWrapper.appendChild(nav);
  block.appendChild(navWrapper);
}
