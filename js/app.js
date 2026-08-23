const filterButtons = document.querySelectorAll(".filter-button");
const menuCategories = document.querySelectorAll(".menu-category");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(function (currentButton) {
            currentButton.classList.remove("active");
            currentButton.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        menuCategories.forEach(function (category) {
            const shouldShow = selectedFilter === "all" || category.dataset.category === selectedFilter;
            category.hidden = !shouldShow;
        });
    });
});
