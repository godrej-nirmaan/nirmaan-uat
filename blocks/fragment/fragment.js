import { decorateMain } from '../../scripts/scripts.js';
import { loadSections } from '../../scripts/aem.js';

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {Promise<HTMLElement>} The root element of the fragment
 */
export async function loadFragment(path) {
  if (!path || !path.startsWith('/')) return null;

  try {
    const resp = await fetch(`${path}.plain.html`);
    if (!resp.ok) return null;

    const main = document.createElement('main');
    main.innerHTML = await resp.text();

    const resetAttributeBase = (tag, attr) => {
      main.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach((elem) => {
        elem[attr] = new URL(elem.getAttribute(attr), new URL(path, window.location)).href;
      });
    };

    resetAttributeBase('img', 'src');
    resetAttributeBase('source', 'srcset');

    decorateMain(main);
    await loadSections(main);
    return main;
  } catch (error) {
    console.error('Error loading fragment:', error);
    return null;
  }
}

export default async function decorate(block) {
  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();

  const fragment = await loadFragment(path);
  if (!fragment) return;

  const fragmentSection = fragment.querySelector(':scope .section');
  if (fragmentSection) {
    const closestSection = block.closest('.section');
    closestSection.classList.add(...fragmentSection.classList);
    block.closest('.fragment').replaceWith(...fragment.childNodes);
  }
}