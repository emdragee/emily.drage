document.addEventListener("DOMContentLoaded", () => {
    const breadcrumbsContainer = document.getElementById("breadcrumbs");
    const pathArray = window.location.pathname.split("/").filter((path) => path);
    const breadcrumbsList = document.createElement("ol");
    breadcrumbsList.style.listStyle = "none";
    breadcrumbsList.style.display = "flex";
    breadcrumbsList.style.gap = "5px";
  
    // Add "Home" link as the first breadcrumb
    const homeItem = document.createElement("li");
    const homeLink = document.createElement("a");
    homeLink.href = "/";
    homeLink.textContent = "Home";
    homeItem.appendChild(homeLink);
    breadcrumbsList.appendChild(homeItem);
  
    if (pathArray.length > 0) {
      const separator = document.createElement("span");
      separator.textContent = "›";
      breadcrumbsList.appendChild(separator);
    }
  
    let fullPath = "";
  
    pathArray.forEach((path, index) => {
      fullPath += `/${path}`;
      const listItem = document.createElement("li");
  
      if (index === pathArray.length - 1) {
        // Current page: not clickable
        listItem.textContent = decodeURIComponent(path.replace(/-/g, " "));
        listItem.style.color = "gray"; // Optional: Style the current page differently
      } else {
        // Create clickable breadcrumb link
        const anchor = document.createElement("a");
        anchor.href = fullPath;
        anchor.textContent = decodeURIComponent(path.replace(/-/g, " "));
        listItem.appendChild(anchor);
      }
  
      breadcrumbsList.appendChild(listItem);
  
      // Add separator for all but the last item
      if (index !== pathArray.length - 1) {
        const separator = document.createElement("span");
        separator.textContent = "›";
        breadcrumbsList.appendChild(separator);
      }
    });
  
    breadcrumbsContainer.appendChild(breadcrumbsList);
  });
  