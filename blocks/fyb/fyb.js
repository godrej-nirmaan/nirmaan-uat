export default function decorate(block) {
  const fragment = document.createDocumentFragment();

  const paragraphs = block.querySelectorAll('p');
  const titleText = block.querySelector('h2')?.textContent.trim() || '';

  const applyNowText = paragraphs[0]?.textContent.trim() || '';
  const descText = paragraphs[1]?.textContent.trim() || '';
  const hashtagText = paragraphs[2]?.textContent.trim() || '';
  const watchNowText = paragraphs[3]?.textContent.trim() || '';

  block.innerHTML = '';

  const title = document.createElement('h2');
  title.className = 'fyb-title';
  title.textContent = titleText;

  const applyNowBtn = document.createElement('button');
  applyNowBtn.className = 'fyb-apply-now-button';
  applyNowBtn.textContent = applyNowText;

  const description = document.createElement('p');
  description.className = 'fyb-desc';
  description.textContent = descText;

  const hashtag = document.createElement('p');
  hashtag.className = 'fyb-hastag';
  hashtag.textContent = hashtagText;

  const watchNowBtn = document.createElement('button');
  watchNowBtn.className = 'fyb-watch-now-button';
  watchNowBtn.textContent = watchNowText;

  fragment.append(title, applyNowBtn, description, hashtag, watchNowBtn);
  block.appendChild(fragment);
}
