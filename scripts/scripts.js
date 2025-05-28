import {
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
} from './aem.js';

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

export function createCard({ title, image, service, description, promo }) {
  const card = document.createElement('div');
  card.className = 'promo-card';

  const header = document.createElement('div');
  header.className = 'card-header';
  header.textContent = title;

  // Body
  const body = document.createElement('div');
  body.className = 'card-body';

  // Icon + Service
  const logoSection = document.createElement('div');
  logoSection.className = 'logo-section';

  const logoIcon = document.createElement('div');
  logoIcon.className = 'logo-icon';
  logoIcon.textContent = '🛒';

  const logoTextWrapper = document.createElement('div');
  const logoText = document.createElement('div');
  logoText.className = 'logo-text';

  const serviceName = document.createElement('div');
  serviceName.className = 'service-name';
  serviceName.textContent = service;

  logoTextWrapper.appendChild(logoText);
  logoTextWrapper.appendChild(serviceName);
  logoSection.appendChild(logoIcon);
  logoSection.appendChild(logoTextWrapper);

  // Description
  const desc = document.createElement('p');
  desc.className = 'description';
  desc.textContent = description;

  // Divider
  const divider = document.createElement('hr');
  divider.className = 'divider';

  // Promo
  const promoSection = document.createElement('div');
  promoSection.className = 'promo-section';

  const promoIcon = document.createElement('div');
  promoIcon.className = 'promo-icon';
  promoIcon.textContent = '%';

  const promoText = document.createElement('div');
  promoText.className = 'promo-text';
  promoText.textContent = promo;

  promoSection.appendChild(promoIcon);
  promoSection.appendChild(promoText);

  // Buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'card-buttons';

  const btnPrimary = document.createElement('button');
  btnPrimary.className = 'btn primary';
  btnPrimary.textContent = 'Avail Now';

  const btnSecondary = document.createElement('button');
  btnSecondary.className = 'btn secondary';
  btnSecondary.textContent = 'Know More';

  buttonContainer.appendChild(btnPrimary);
  buttonContainer.appendChild(btnSecondary);

  // Assemble
  body.appendChild(logoSection);
  body.appendChild(desc);
  body.appendChild(divider);
  body.appendChild(promoSection);
  body.appendChild(buttonContainer);

  card.appendChild(header);
  card.appendChild(body);

  return card;
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
