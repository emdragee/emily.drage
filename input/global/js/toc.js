document.addEventListener("DOMContentLoaded", () => {
    const tocContainer = document.getElementById("toc-container");
    const sections = document.querySelectorAll("#main-port section");
    const tocList = document.createElement("ul");
  
    tocContainer.innerHTML = "<h3>TOC</h3>";
  
    sections.forEach((section) => {
      const headings = section.querySelectorAll("h2, h3"); // Select both h2 and h3
      headings.forEach((heading) => {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
  
        // Use the section's ID or generate a unique ID for each heading
        if (!heading.id) {
          heading.id = heading.textContent.trim().toLowerCase().replace(/\s+/g, "-");
        }
        anchor.href = `#${heading.id}`;
        anchor.textContent = heading.textContent;
  
        listItem.appendChild(anchor);
  
        // Indent <h3> items by nesting in a sub-list
        if (heading.tagName.toLowerCase() === "h3") {
          listItem.style.marginLeft = "20px"; // Indent h3 items visually
        }
  
        tocList.appendChild(listItem);
      });
    });
  
    tocContainer.appendChild(tocList);
  });
  