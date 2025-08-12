document.querySelectorAll(".tile").forEach(tile => {
// Find the "Read More" link inside the tile
const readMoreLink = Array.from(tile.querySelectorAll("a"))
    .find(a => a.textContent.trim().toLowerCase() === "read more");

if (readMoreLink) {
    tile.addEventListener("click", () => {
    window.location.href = readMoreLink.href;
    });

    // Stop bubbling if the link itself is clicked
    readMoreLink.addEventListener("click", e => {
    e.stopPropagation();
    });

    tile.style.cursor = "pointer";
}
});