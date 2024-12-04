document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.popover-button');
    const menu = document.getElementById('popover-menu');

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggleButton.contains(e.target)) {
            menu.hidePopover(); // Close the menu
        }
    });
});
