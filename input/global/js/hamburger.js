document.querySelector(".menu-toggle").addEventListener("click", function(event) {
  const navbarLinks = document.querySelector(".navbar-links");
  navbarLinks.classList.toggle("active");
  event.stopPropagation();
});

document.addEventListener("click", function(event) {
  const navbarLinks = document.querySelector(".navbar-links");
  const menuToggle = document.querySelector(".menu-toggle");

  if (!navbarLinks.contains(event.target) && !menuToggle.contains(event.target)) {
    navbarLinks.classList.remove("active");
  }
});

document.querySelectorAll(".navbar-links a").forEach(item => {
  item.addEventListener("click", function() {
    document.querySelector(".navbar-links").classList.remove("active");
  });
});
