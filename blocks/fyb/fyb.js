export default function decorate(block) {
    // Extract content first
    const paragraphs = block.querySelectorAll('p');
    const title_text = block.querySelector("h2");

    const apply_now_button_text = paragraphs[0]?.textContent || "";
    const desc_text = paragraphs[1]?.textContent || "";
    const hastag_text = paragraphs[2]?.textContent || "";
    const watch_now_button_text = paragraphs[3]?.textContent || "";
    const title_content = title_text?.textContent || "";

    // Now it's safe to clear the block
    block.innerHTML = '';

    const title = document.createElement("h2");
    title.className = "fyb-title";
    title.textContent = title_content;

    const apply_now_button = document.createElement("button");
    apply_now_button.className = "fyb-apply_now_button";
    apply_now_button.textContent = apply_now_button_text;

    const desc = document.createElement("p");
    desc.className = "fyb-desc";
    desc.textContent = desc_text;

    const hastag = document.createElement("p");
    hastag.className = "fyb-hastag";
    hastag.textContent = hastag_text;

    const watch_now_button = document.createElement("button");
    watch_now_button.className = "fyb-watch_now_button";
    watch_now_button.textContent = watch_now_button_text;
    
    block.appendChild(title);
    block.appendChild(apply_now_button);
    block.appendChild(desc);
    block.appendChild(hastag);
    block.appendChild(watch_now_button);
}
