document.addEventListener("DOMContentLoaded", () => {
  const tocContainer = document.getElementById("toc-container");
  const sections = document.querySelectorAll("#main-port section");
  const tocList = document.createElement("ul");

  tocContainer.innerHTML = "<h3>TOC</h3>";

  sections.forEach((section, index) => {
    if (!section.id) {
      section.id = `section-${index + 1}`;
    }

    // Select all h2 and h3 within the section
    const headings = section.querySelectorAll("h2, h3");
    headings.forEach((heading, headingIndex) => {
      if (!heading.id) {
        heading.id = `section-${index + 1}-heading-${headingIndex + 1}`; // Ensure each heading has a unique ID
      }

      const listItem = document.createElement("li");
      const anchor = document.createElement("a");

      anchor.href = `#${heading.id}`;
      anchor.textContent = heading.textContent;

      listItem.appendChild(anchor);
      tocList.appendChild(listItem);
    });
  });

  tocContainer.appendChild(tocList);

  // Configure the IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const tocLink = document.querySelector(`a[href="#${id}"]`);

        if (entry.isIntersecting) {
          // Remove "active" from all TOC links
          document.querySelectorAll("#toc-container li").forEach((li) => {
            li.classList.remove("active");
          });

          // Add "active" to the intersecting section
          if (tocLink) {
            tocLink.parentElement.classList.add("active");
          }
        }
      });
    },
    { threshold: 0.5 } // Adjust threshold for when a section becomes active
  );

  // Observe all h2 and h3 elements within sections
  document.querySelectorAll("#main-port section h2, #main-port section h3").forEach((heading) => {
    observer.observe(heading);
  });

  // On page load, set the first heading as active
  const firstHeading = document.querySelector("#main-port section h2, #main-port section h3");
  if (firstHeading) {
    const firstTocLink = document.querySelector(`a[href="#${firstHeading.id}"]`);
    if (firstTocLink) {
      // Remove "active" from all links first to ensure no conflict
      document.querySelectorAll("#toc-container li").forEach((li) => {
        li.classList.remove("active");
      });
      // Add "active" class to the first TOC link
      firstTocLink.parentElement.classList.add("active");
    }
  }
});
