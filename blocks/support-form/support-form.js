export default function decorate(block) {
  const paragraphs = block.querySelectorAll('p');

  if (paragraphs.length < 6) return;

  const [formHeading, ...fieldTexts] = [...paragraphs].map((p) => p.textContent.trim());

  block.innerHTML = '';

  const supportForm = createSupportForm(formHeading, fieldTexts);

  block.appendChild(supportForm);
}

function createSupportForm(formHeading, fieldTexts) {
  const formContent = document.createElement('div');
  formContent.className = 'support-form';

  const formHeadingElement = document.createElement('h3');
  formHeadingElement.textContent = formHeading;

  const form = document.createElement('form');

  fieldTexts.forEach((text, index) => {
    let input;
    input = document.createElement('input');
    input.type = 'text';
    input.name = text.toLowerCase().replace(/\s+/g, '-');
    input.placeholder = text; 

    form.appendChild(input);
  });

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Proceed';
  form.appendChild(submitButton);

  formContent.appendChild(formHeadingElement);
  formContent.appendChild(form);

  return formContent;
}