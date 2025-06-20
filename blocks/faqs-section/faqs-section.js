export default function decorate(block) {

  Array.from(block.children).forEach(({ children: [label, body] }) => {
    const details = document.createElement('details');
    details.className = 'accordion-item';

    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'accordion-item-body';
    bodyDiv.append(...body.childNodes);

    details.append(summary, bodyDiv);
    block.replaceChild(details, label.parentElement);
  });
}