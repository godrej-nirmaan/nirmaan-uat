import { loadFragment } from '../fragment/fragment.js';
import { getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  const navPath = getMetadata('nav') 
    ? new URL(getMetadata('nav'), window.location).pathname 
    : '/fragments/nav';

  const fragment = await loadFragment(navPath);
  if (!fragment) return;

  const nav = document.createElement('nav');
  nav.id = 'nav';

  while (fragment.firstElementChild) {
    nav.append(fragment.firstElementChild);
  }

  ['brand', 'sections', 'tools'].forEach((cls, i) => {
    nav.children[i]?.classList.add(`nav-${cls}`);
  });

  const brandLink = nav.querySelector('.nav-brand .button');
  brandLink?.classList.remove('button');
  brandLink?.closest('.button-container')?.classList.remove('button-container');

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

  const navItems = nav.querySelectorAll('.nav-sections ul li a');
  const activeHref = localStorage.getItem('activeNavItem');
  if (activeHref) {
    navItems.forEach((item) => {
      if (item.href === activeHref) {
        item.classList.add('active');
      }
    });
  }

  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach((navItem) => {
        navItem.classList.remove('active');
      });
      item.classList.add('active');
      localStorage.setItem('activeNavItem', item.href);
      window.location.href = item.href;
    });
  });
}