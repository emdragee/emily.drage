document.addEventListener("DOMContentLoaded", () => {
  const tocContainer = document.getElementById("toc-container");
  const sections = document.querySelectorAll("#main-port section");
  const tocList = document.createElement("ul");

  tocContainer.innerHTML = "<h3>Contents</h3>";

  sections.forEach((section, index) => {
    if (!section.id) {
      section.id = `section-${index + 1}`;
    }
    const heading = section.querySelector("h2, h3");
    if (heading) {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");

      anchor.href = `#${section.id}`;
      anchor.textContent = heading.textContent;

      listItem.appendChild(anchor);
      tocList.appendChild(listItem);
    }
  });

  tocContainer.appendChild(tocList);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const tocLink = document.querySelector(`a[href="#${id}"]`);
      if (entry.isIntersecting) {
        tocLink.parentElement.classList.add("active");
      } else {
        tocLink.parentElement.classList.remove("active");
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll("#main-port section[id]").forEach((section) => {
    observer.observe(section);
  });
});
