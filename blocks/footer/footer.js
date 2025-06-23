import { loadFragment } from '../fragment/fragment.js';
import { getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  const fragmentPath = getMetadata('footer');
  const fragment = await loadFragment(fragmentPath, '/fragments/footer');

  if (!fragment) {
    console.warn('Fragment faqs-section not found at', fragmentPath);
    return;
  }

  block.replaceWith(fragment);
}
