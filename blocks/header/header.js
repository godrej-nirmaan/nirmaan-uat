import { loadFragment } from '../fragment/fragment.js';
import { getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/fragments/nav';
  const fragment = await loadFragment(navPath);
  console.log('Loading navigation from:', navPath);
  console.log('Fragment content:', fragment);
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand?.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navTools = nav.querySelector('.nav-tools') || document.createElement('div');
  navTools.classList.add('nav-tools');

  const loginBtn = document.createElement('a');
  loginBtn.href = '/login';
  loginBtn.className = 'nav-button login';
  loginBtn.textContent = 'Log In';

  const signupBtn = document.createElement('a');
  signupBtn.href = '/signup';
  signupBtn.className = 'nav-button signup';
  signupBtn.textContent = 'Sign Up';

  navTools.append(loginBtn, signupBtn);
  if (!nav.querySelector('.nav-tools')) nav.append(navTools);

  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `
    <button type="button" aria-controls="nav" aria-label="Toggle navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    document.body.style.overflowY = expanded ? '' : 'hidden';
  });

  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);

  block.append(navWrapper);
}
