import { loadFragment } from '../fragment/fragment.js';
import { getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  const navPath = getMetadata('nav') 
    ? new URL(getMetadata('nav'), window.location).pathname 
    : '/fragments/nav';

  console.log('Loading navigation from:', navPath);

  const fragment = await loadFragment(navPath);
  if (!fragment) return;

  const nav = document.createElement('nav');
  nav.id = 'nav';

  Array.from(fragment.children).forEach((child) => nav.appendChild(child));

  ['brand', 'sections', 'tools'].forEach((cls, i) => {
    nav.children[i]?.classList.add(`nav-${cls}`);
  });

  const brandLink = nav.querySelector('.nav-brand .button');
  if (brandLink) {
    brandLink.classList.remove('button');
    brandLink.closest('.button-container')?.classList.remove('button-container');
  }

  let navTools = nav.querySelector('.nav-tools');
  if (!navTools) {
    navTools = document.createElement('div');
    navTools.className = 'nav-tools';
    nav.appendChild(navTools);
  }

  const createNavButton = (href, text, className) => {
    const btn = document.createElement('a');
    btn.href = href;
    btn.textContent = text;
    btn.className = `nav-button ${className}`;
    return btn;
  };

  navTools.append(
    createNavButton('/login', 'Log In', 'login'),
    createNavButton('/signup', 'Sign Up', 'signup')
  );

  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = `
    <button type="button" aria-controls="nav" aria-label="Toggle navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;

  hamburger.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', String(!expanded));
    document.body.style.overflowY = expanded ? '' : 'hidden';
  });

  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.appendChild(nav);

  block.textContent = '';
  block.appendChild(navWrapper);
}