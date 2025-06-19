import { loadFragment } from '../fragment/fragment.js';
import { getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  const fragmentPath = getMetadata('footer') || '/fragments/footer';
  const fragment = await loadFragment(fragmentPath);

  if (!fragment) {
    console.warn('Footer fragment not found at:', fragmentPath);
    return;
  }

  block.replaceWith(fragment);
}