const filterButtons = document.querySelectorAll(".filter-button");
const menuCategories = document.querySelectorAll(".menu-category");
const addToOrderButtons = document.querySelectorAll(".add-to-order");
const cart = JSON.parse(localStorage.getItem("sunset73Cart")) || [];
const cartCount = document.querySelector(".cart-count");
const cartItemsContainer = document.querySelector("#cart-items");
const subtotalAmount = document.querySelector("#subtotal-amount");
const taxAmount = document.querySelector("#tax-amount");
const totalAmount = document.querySelector("#total-amount");
const clearOrderButton = document.querySelector("#clear-order");
const pickupEstimate = document.querySelector("#pickup-estimate");
const placeOrderButton = document.querySelector(".checkout-button");
const largeOrderContact = document.querySelector("#large-order-contact");
const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");
const contactSubmitButton = document.querySelector(".contact-submit");
const requestType = document.querySelector("#request-type");
const estimatedItems = document.querySelector("#estimated-items");
const checkoutForm = document.querySelector("#checkout-form");
const confirmationContent = document.querySelector("#confirmation-content");
const missingConfirmation = document.querySelector("#missing-confirmation");
const printReceiptButton = document.querySelector("#print-receipt");
const taxRate = 0.08;
const maximumOnlineItems = 30;
const contactFormUrl = "https://script.google.com/macros/s/AKfycbwMGtCymZB9yTae2guQKCMkbVYCydL0Zt5Y8iWnoJ3uyguSkQrP2kJvlADUSWlFE_0g6A/exec";
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
    "Strawberry Sunset": "images/strawberry-sunset.png",
    "Route 73 Double": "images/route-73-double.jpg",
    "Jukebox Jalapeño Burger": "images/jukebox-jalapeno.jpg",
    "Highway Patty Melt": "images/highway-patty-melt.jpg",
    "Hot Rod Chicken": "images/hot-rod-chicken.jpg",
    "Crispy Chicken Club": "images/crispy-chicken-club.jpg",
    "Deluxe Grilled Cheese": "images/deluxe-grilled-cheese.jpg",
    "Classic Diner Dog": "images/classic-diner-dog.jpg",
    "Loaded Disco Fries": "images/loaded-disco-fries.jpg",
    "Mac & Cheese Bites": "images/mac-cheese-bites.jpg",
    "Roller Rink Tots": "images/roller-rink-tots.jpg"
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
    updatePickupEstimate();
}

function updatePickupEstimate() {
    if (pickupEstimate === null) {
        return;
    }

    let itemCount = 0;

    cart.forEach(function (item) {
        itemCount += item.quantity;
    });

    if (itemCount === 0) {
        pickupEstimate.textContent = "Add items to your order to receive a pickup estimate.";
        pickupEstimate.parentElement.classList.remove("large-order");
        largeOrderContact.hidden = true;
        placeOrderButton.disabled = true;
        return;
    }

    if (itemCount > maximumOnlineItems) {
        pickupEstimate.textContent = `Large order detected: online checkout is limited to ${maximumOnlineItems} items. Send us a large-order request for a custom pickup time.`;
        pickupEstimate.parentElement.classList.add("large-order");
        largeOrderContact.href = `contact.html?type=large-order&items=${itemCount}`;
        largeOrderContact.hidden = false;
        placeOrderButton.disabled = true;
        return;
    }

    pickupEstimate.parentElement.classList.remove("large-order");
    largeOrderContact.hidden = true;
    placeOrderButton.disabled = false;
    const minimumMinutes = 20 + Math.max(0, itemCount - 1) * 2;
    const maximumMinutes = minimumMinutes + 10;
    pickupEstimate.textContent = `${minimumMinutes}–${maximumMinutes} minutes after placing your order`;
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

function getOrderItemCount() {
    let itemCount = 0;

    cart.forEach(function (item) {
        itemCount += item.quantity;
    });

    return itemCount;
}

function updateOrderStatus(savedOrder) {
    const statusSteps = document.querySelectorAll(".order-progress li");

    if (statusSteps.length === 0) {
        return;
    }

    const placedTime = new Date(savedOrder.placedAt).getTime();
    const cookingTime = savedOrder.cookingAt ? new Date(savedOrder.cookingAt).getTime() : placedTime + 3 * 60000;
    const readyTime = savedOrder.readyAt ? new Date(savedOrder.readyAt).getTime() : new Date(savedOrder.pickupStart).getTime();
    const currentTime = Date.now();
    const statusMessage = document.querySelector("#status-message");
    const statusCard = document.querySelector(".status-card");
    let currentStep = 0;
    let nextUpdateTime = cookingTime;

    if (currentTime >= cookingTime) {
        currentStep = 1;
        nextUpdateTime = readyTime;
    }

    if (currentTime >= readyTime) {
        currentStep = 2;
        nextUpdateTime = null;
    }

    const messages = [
        "We received your order and sent it to the kitchen.",
        "Your burgers are sizzling on the griddle!",
        "Your order is ready for pickup!"
    ];

    statusSteps.forEach(function (step, index) {
        step.classList.remove("complete", "current");
        step.removeAttribute("aria-current");

        if (index < currentStep) {
            step.classList.add("complete");
        }

        if (index === currentStep) {
            step.classList.add("current");
            step.setAttribute("aria-current", "step");
        }
    });

    statusMessage.textContent = messages[currentStep];
    statusCard.classList.toggle("ready", currentStep === 2);

    if (nextUpdateTime !== null) {
        setTimeout(function () {
            updateOrderStatus(savedOrder);
        }, Math.max(0, nextUpdateTime - currentTime));
    }
}

function displayOrderConfirmation() {
    if (confirmationContent === null) {
        return;
    }

    const savedOrder = JSON.parse(localStorage.getItem("sunset73LastOrder"));

    if (savedOrder === null) {
        missingConfirmation.hidden = false;
        return;
    }

    const money = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });
    const time = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });
    const confirmationItems = document.querySelector("#confirmation-items");
    const instructionsBox = document.querySelector("#confirmation-instructions");

    confirmationContent.hidden = false;
    document.querySelector("#customer-thanks").textContent = `Thanks, ${savedOrder.customerName}!`;
    document.querySelector("#confirmation-number").textContent = savedOrder.orderNumber;
    document.querySelector("#confirmation-pickup").textContent = `${time.format(new Date(savedOrder.pickupStart))}–${time.format(new Date(savedOrder.pickupEnd))}`;
    document.querySelector("#order-received-time").textContent = time.format(new Date(savedOrder.placedAt));
    document.querySelector("#confirmation-subtotal").textContent = money.format(savedOrder.subtotal);
    document.querySelector("#confirmation-tax").textContent = money.format(savedOrder.tax);
    document.querySelector("#confirmation-total").textContent = money.format(savedOrder.total);

    savedOrder.items.forEach(function (item) {
        const receiptRow = document.createElement("p");
        const itemDescription = document.createElement("span");
        const itemTotal = document.createElement("strong");

        receiptRow.classList.add("receipt-row");
        itemDescription.textContent = `${item.quantity} × ${item.name}`;
        itemTotal.textContent = money.format(item.price * item.quantity);
        receiptRow.appendChild(itemDescription);
        receiptRow.appendChild(itemTotal);
        confirmationItems.appendChild(receiptRow);
    });

    if (savedOrder.instructions !== "") {
        instructionsBox.hidden = false;
        document.querySelector("#confirmation-instructions-text").textContent = savedOrder.instructions;
    }

    updateOrderStatus(savedOrder);
}

updateCartCount();
displayCartItems();
updateOrderTotals();
updatePickupEstimate();
displayOrderConfirmation();

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

if (clearOrderButton !== null) {
    clearOrderButton.addEventListener("click", function () {
        cart.length = 0;
        saveCart();
    });
}

if (checkoutForm !== null) {
    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const itemCount = getOrderItemCount();

        if (itemCount === 0 || itemCount > maximumOnlineItems) {
            return;
        }

        let subtotal = 0;

        cart.forEach(function (item) {
            subtotal += item.price * item.quantity;
        });

        const placedAt = new Date();
        const minimumMinutes = 20 + Math.max(0, itemCount - 1) * 2;
        const maximumMinutes = minimumMinutes + 10;
        const cookingDelayMinutes = Math.min(5, Math.max(2, Math.round(minimumMinutes * 0.15)));
        const order = {
            orderNumber: `S73-${String(Date.now()).slice(-6)}`,
            customerName: document.querySelector("#pickup-name").value.trim(),
            instructions: document.querySelector("#special-instructions").value.trim(),
            items: cart.map(function (item) {
                return { ...item };
            }),
            subtotal: subtotal,
            tax: subtotal * taxRate,
            total: subtotal + subtotal * taxRate,
            placedAt: placedAt.toISOString(),
            cookingAt: new Date(placedAt.getTime() + cookingDelayMinutes * 60000).toISOString(),
            readyAt: new Date(placedAt.getTime() + minimumMinutes * 60000).toISOString(),
            pickupStart: new Date(placedAt.getTime() + minimumMinutes * 60000).toISOString(),
            pickupEnd: new Date(placedAt.getTime() + maximumMinutes * 60000).toISOString()
        };

        localStorage.setItem("sunset73LastOrder", JSON.stringify(order));
        cart.length = 0;
        localStorage.setItem("sunset73Cart", JSON.stringify(cart));
        window.location.href = "confirmation.html";
    });
}

if (printReceiptButton !== null) {
    printReceiptButton.addEventListener("click", function () {
        window.print();
    });
}

if (contactForm !== null) {
    const pageParameters = new URLSearchParams(window.location.search);

    if (pageParameters.get("type") === "large-order") {
        requestType.value = "Large Order";
    }

    if (pageParameters.has("items")) {
        estimatedItems.value = pageParameters.get("items");
    }

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        contactSubmitButton.disabled = true;
        contactForm.setAttribute("aria-busy", "true");
        contactStatus.textContent = "Sending your request...";

        try {
            const formData = new FormData(contactForm);

            await fetch(contactFormUrl, {
                method: "POST",
                body: formData,
                mode: "no-cors"
            });

            contactForm.reset();
            contactStatus.textContent = "Far out! Your request was sent to the Sunset 73 crew.";
        } catch (error) {
            contactStatus.textContent = "We couldn't send your request. Check your connection and try again.";
        } finally {
            contactSubmitButton.disabled = false;
            contactForm.removeAttribute("aria-busy");
        }
    });
}
