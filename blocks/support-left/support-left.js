export default function decorate(block) {
  const paragraphs = block.querySelectorAll('p');
  const images = block.querySelectorAll('picture img'); 

  if (paragraphs.length < 3 || images.length < 2) return;

  const [headingText, phoneText, emailText] = [...paragraphs].map((p) => p.textContent.trim());
  const [phoneImg, emailImg] = images; 

  block.innerHTML = '';

  const supportLeft = createSupportLeft(headingText, phoneText, phoneImg, emailText, emailImg);

  block.appendChild(supportLeft);
}

function createSupportLeft(heading, phone, phoneImg, email, emailImg) {
  const leftContent = document.createElement('div');
  leftContent.className = 'support-left';

  const headingElement = document.createElement('h2');
  headingElement.textContent = heading;
  leftContent.appendChild(headingElement);

  const phoneWrapper = document.createElement('div');
  phoneWrapper.className = 'support-phone';
  phoneImg.loading = 'lazy'; 
  phoneWrapper.appendChild(phoneImg);
  const phoneElement = document.createElement('p');
  phoneElement.textContent = phone;
  phoneWrapper.appendChild(phoneElement);

  const emailWrapper = document.createElement('div');
  emailWrapper.className = 'support-email';
  emailImg.loading = 'lazy'; 
  emailWrapper.appendChild(emailImg);
  const emailElement = document.createElement('a');
  emailElement.href = `mailto:${email}`;
  emailElement.textContent = email;
  emailWrapper.appendChild(emailElement);

  leftContent.appendChild(phoneWrapper);
  leftContent.appendChild(emailWrapper);

  return leftContent;
}