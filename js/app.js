const filterButtons = document.querySelectorAll(".filter-button");
const menuCategories = document.querySelectorAll(".menu-category");
const addToOrderButtons = document.querySelectorAll(".add-to-order");
const cart = JSON.parse(localStorage.getItem("sunset73Cart")) || [];
const cartCount = document.querySelector(".cart-count");
const cartItemsContainer = document.querySelector("#cart-items");
const subtotalAmount = document.querySelector("#subtotal-amount");
const taxAmount = document.querySelector("#tax-amount");
const totalAmount = document.querySelector("#total-amount");
const taxRate = 0.08;
const removalDelay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 350;
const menuImages = {
    "Sunset Smash": "images/sunset-smash.png",
    "Boogie Burger": "images/boogie-burger.png",
    "Garden Groove": "images/garden-groove.png",
    "Disco Fries": "images/disco-fries.png",
    "Far-Out Onion Rings": "images/far-out-onion-rings.png",
    "Fried Pickle Chips": "images/fried-pickle-chips.png",
    "Golden Shake": "images/golden-shake.png",
    "Chocolate Boogie": "images/chocolate-boogie.png",
    "Strawberry Sunset": "images/strawberry-sunset.png"
};

function updateCartCount() {
    let totalItems = 0;

    cart.forEach(function (item) {
        totalItems += item.quantity;
    });

    cartCount.textContent = totalItems;
}

function saveCart() {
    localStorage.setItem("sunset73Cart", JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
    updateOrderTotals();
}

function updateOrderTotals() {
    if (subtotalAmount === null) {
        return;
    }

    let subtotal = 0;

    cart.forEach(function (item) {
        subtotal += item.price * item.quantity;
    });

    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
    taxAmount.textContent = `$${tax.toFixed(2)}`;
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

function displayCartItems() {
    if (cartItemsContainer === null) {
        return;
    }

    cartItemsContainer.textContent = "";

    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Your order is empty. Head back to the menu and pick something delicious!";
        cartItemsContainer.appendChild(emptyMessage);
        return;
    }

    cart.forEach(function (item, index) {
        const itemTotal = item.price * item.quantity;
        const itemElement = document.createElement("article");
        const itemInfo = document.createElement("div");
        const itemName = document.createElement("h3");
        const itemDetails = document.createElement("p");
        const quantityControls = document.createElement("div");
        const decreaseButton = document.createElement("button");
        const quantityText = document.createElement("span");
        const increaseButton = document.createElement("button");
        const removeButton = document.createElement("button");
        const itemImage = document.createElement("img");

        itemElement.classList.add("cart-item");
        itemInfo.classList.add("cart-item-info");
        quantityControls.classList.add("quantity-controls");
        itemImage.classList.add("cart-item-image");
        itemName.textContent = item.name;
        itemDetails.textContent = `$${itemTotal.toFixed(2)}`;
        itemImage.src = menuImages[item.name];
        itemImage.alt = "";
        decreaseButton.type = "button";
        decreaseButton.textContent = "−";
        decreaseButton.setAttribute("aria-label", `Decrease ${item.name} quantity`);
        quantityText.textContent = `Quantity: ${item.quantity}`;
        increaseButton.type = "button";
        increaseButton.textContent = "+";
        increaseButton.setAttribute("aria-label", `Increase ${item.name} quantity`);
        removeButton.type = "button";
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-item");
        removeButton.setAttribute("aria-label", `Remove ${item.name} from order`);

        decreaseButton.addEventListener("click", function () {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart.splice(index, 1);
            }

            saveCart();
        });

        increaseButton.addEventListener("click", function () {
            item.quantity += 1;
            saveCart();
        });

        removeButton.addEventListener("click", function () {
            removeButton.disabled = true;
            itemElement.classList.add("removing");

            setTimeout(function () {
                cart.splice(index, 1);
                saveCart();
            }, removalDelay);
        });

        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemDetails);
        quantityControls.appendChild(decreaseButton);
        quantityControls.appendChild(quantityText);
        quantityControls.appendChild(increaseButton);
        itemInfo.appendChild(quantityControls);
        itemInfo.appendChild(removeButton);
        itemElement.appendChild(itemInfo);
        itemElement.appendChild(itemImage);
        cartItemsContainer.appendChild(itemElement);
    });
}

updateCartCount();
displayCartItems();
updateOrderTotals();

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

addToOrderButtons.forEach(function (addButton) {
    addButton.addEventListener("click", function () {
        const itemName = addButton.dataset.name;
        const itemPrice = Number(addButton.dataset.price);
        const existingItem = cart.find(function (item) {
            return item.name === itemName;
        });

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            const item = {
                name: itemName,
                price: itemPrice,
                quantity: 1
            };

            cart.push(item);
        }

        saveCart();
    });
});
