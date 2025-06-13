export default function decorate(block) {
  console.log("FAQ block", block);

  Array.from(block.children).forEach(({ children: [label, body] }) => {
    const details = document.createElement('details');
    details.className = 'accordion-item';

    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    body.className = 'accordion-item-body';

    details.append(summary, body);
    block.replaceChild(details, label.parentElement);
  });
}
