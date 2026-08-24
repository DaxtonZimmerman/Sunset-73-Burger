const filterButtons = document.querySelectorAll(".filter-button");
const menuCategories = document.querySelectorAll(".menu-category");
const menuItems = document.querySelectorAll(".menu-item");
const addToOrderButtons = document.querySelectorAll(".menu-item .add-to-order");
const cartStorageKey = "sunset73Cart1973";
const cart = JSON.parse(localStorage.getItem(cartStorageKey)) || [];
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
const confettiContainer = document.querySelector("#confetti-container");
const printReceiptButton = document.querySelector("#print-receipt");
const productDialog = document.querySelector("#product-dialog");
const productDialogClose = document.querySelector("#product-dialog-close");
const productDialogImage = document.querySelector("#product-dialog-image");
const productDialogName = document.querySelector("#product-dialog-name");
const productDialogPrice = document.querySelector("#product-dialog-price");
const productDialogIngredients = document.querySelector("#product-dialog-ingredients");
const productDialogDescription = document.querySelector("#product-dialog-description");
const productDialogAdd = document.querySelector("#product-dialog-add");
const productCustomization = document.querySelector("#product-customization");
const customizationIntro = document.querySelector("#customization-intro");
const removeToppingOptions = document.querySelector("#remove-topping-options");
const extraOptions = document.querySelector("#extra-options");
const productChoiceHeading = document.querySelector("#product-choice-heading");
const productChoiceLabel = document.querySelector("#product-choice-label");
const productSauce = document.querySelector("#product-sauce");
const productQuantityMinus = document.querySelector("#product-quantity-minus");
const productQuantityPlus = document.querySelector("#product-quantity-plus");
const productQuantityValue = document.querySelector("#product-quantity-value");
const cartToast = document.querySelector("#cart-toast");
const taxRate = 0.08;
const maximumOnlineItems = 30;
const contactFormUrl = "https://script.google.com/macros/s/AKfycbwMGtCymZB9yTae2guQKCMkbVYCydL0Zt5Y8iWnoJ3uyguSkQrP2kJvlADUSWlFE_0g6A/exec";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const removalDelay = prefersReducedMotion.matches ? 0 : 350;
let lastDetailsButton = null;
let cartToastTimer = null;
let currentProductBasePrice = 0;
let currentProductQuantity = 1;
let currentCustomizationConfig = null;
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
    "Roller Rink Tots": "images/roller-rink-tots.jpg",
    "Orange Dream Shake": "images/orange-dream-shake.jpg",
    "Peanut Butter Boogie": "images/peanut-butter-boogie.jpg",
    "Root Beer Float": "images/root-beer-float.jpg",
    "Hot Fudge Brownie Sundae": "images/hot-fudge-brownie-sundae.jpg",
    "Cherry Pie": "images/cherry-pie.jpg",
    "Banana Split": "images/banana-split.jpg",
    "Chocolate Cream Pie": "images/chocolate-cream-pie.jpg"
};

const menuIngredients = {
    "Sunset Smash": ["Two beef patties", "American cheese", "Grilled onions", "Pickles", "Sunset Sauce", "Sesame bun"],
    "Boogie Burger": ["Beef patty", "Cheddar", "Bacon", "Caramelized onions", "Barbecue sauce", "Toasted bun"],
    "Garden Groove": ["Veggie patty", "Lettuce", "Tomato", "Pickles", "Avocado", "Herb sauce", "Toasted bun"],
    "Route 73 Double": ["Two beef patties", "Cheddar", "Onion ring", "Pickles", "Barbecue sauce", "Sesame bun"],
    "Jukebox Jalapeño Burger": ["Beef patty", "Pepper jack", "Jalapeños", "Bacon", "Lettuce", "Pickles", "Spicy sauce", "Toasted bun"],
    "Highway Patty Melt": ["Beef patty", "Swiss cheese", "American cheese", "Caramelized onions", "Diner sauce", "Rye bread"],
    "Hot Rod Chicken": ["Crispy chicken", "Hot honey", "Pickles", "Shredded lettuce", "Diner mayo", "Toasted bun"],
    "Crispy Chicken Club": ["Crispy chicken", "Cheddar", "Bacon", "Lettuce", "Tomato", "Pickles", "Mayo", "Toasted bun"],
    "Deluxe Grilled Cheese": ["Cheddar", "American cheese", "Tomato", "Caramelized onions", "Buttered sourdough"],
    "Classic Diner Dog": ["All-beef hot dog", "Yellow mustard", "Sweet relish", "Diced onion", "Toasted bun"],
    "Disco Fries": ["Crinkle-cut fries", "Signature seasoning", "House ketchup"],
    "Far-Out Onion Rings": ["Thick-cut onions", "Crispy coating", "House ranch"],
    "Fried Pickle Chips": ["Dill pickle slices", "Crispy coating", "Sunset Sauce"],
    "Loaded Disco Fries": ["Crinkle-cut fries", "Cheddar sauce", "Bacon", "Green onions", "Creamy diner sauce"],
    "Mac & Cheese Bites": ["Macaroni", "Cheddar", "Crispy coating", "House ketchup"],
    "Roller Rink Tots": ["Seasoned tater tots", "Cheddar", "Green onions", "Sunset Sauce"],
    "Golden Shake": ["Vanilla ice cream", "Golden caramel", "Whipped cream", "Cherry"],
    "Chocolate Boogie": ["Chocolate ice cream", "Hot fudge", "Whipped cream", "Chocolate drizzle"],
    "Strawberry Sunset": ["Strawberry ice cream", "Strawberries", "Whipped cream", "Cherry"],
    "Orange Dream Shake": ["Vanilla ice cream", "Orange syrup", "Whipped cream", "Orange slice", "Cherry"],
    "Peanut Butter Boogie": ["Peanut butter ice cream", "Chocolate fudge", "Whipped cream", "Peanut butter drizzle", "Crushed peanuts", "Cherry"],
    "Root Beer Float": ["Root beer", "Vanilla ice cream", "Cherry"],
    "Hot Fudge Brownie Sundae": ["Warm brownie", "Vanilla ice cream", "Hot fudge", "Whipped cream", "Chopped nuts", "Cherry"],
    "Cherry Pie": ["Lattice pie crust", "Cherry filling", "Vanilla ice cream"],
    "Banana Split": ["Banana", "Vanilla ice cream", "Chocolate ice cream", "Strawberry ice cream", "Chocolate sauce", "Strawberry sauce", "Pineapple topping", "Whipped cream", "Nuts", "Cherries"],
    "Chocolate Cream Pie": ["Chocolate cookie crust", "Chocolate cream filling", "Whipped cream", "Chocolate curls"]
};

const productCustomizationConfigs = {
    "Sunset Smash": {
        removable: ["grilled onions", "pickles", "American cheese"],
        defaultSauce: "Sunset Sauce",
        sauces: ["Sunset Sauce", "Barbecue sauce", "Spicy sauce", "Ketchup", "No sauce"],
        extras: [
            { name: "Extra beef patty", price: 0.45 },
            { name: "Extra cheese", price: 0.15 },
            { name: "Add bacon", price: 0.25 }
        ]
    },
    "Boogie Burger": {
        removable: ["cheddar", "bacon", "caramelized onions"],
        defaultSauce: "Barbecue sauce",
        sauces: ["Barbecue sauce", "Sunset Sauce", "Spicy sauce", "Ketchup", "No sauce"],
        extras: [
            { name: "Extra beef patty", price: 0.45 },
            { name: "Extra cheese", price: 0.15 },
            { name: "Extra bacon", price: 0.25 }
        ]
    },
    "Garden Groove": {
        removable: ["lettuce", "tomato", "pickles", "avocado"],
        defaultSauce: "Herb sauce",
        sauces: ["Herb sauce", "Sunset Sauce", "Spicy sauce", "Ketchup", "No sauce"],
        extras: [
            { name: "Extra veggie patty", price: 0.40 },
            { name: "Extra avocado", price: 0.20 },
            { name: "Add cheese", price: 0.15 }
        ]
    },
    "Route 73 Double": {
        removable: ["cheddar", "onion ring", "pickles"],
        defaultSauce: "Barbecue sauce",
        sauces: ["Barbecue sauce", "Sunset Sauce", "Spicy sauce", "Ketchup", "No sauce"],
        extras: [
            { name: "Extra beef patty", price: 0.45 },
            { name: "Extra cheese", price: 0.15 },
            { name: "Add bacon", price: 0.25 }
        ]
    },
    "Jukebox Jalapeño Burger": {
        removable: ["pepper jack", "jalapeños", "bacon", "lettuce", "pickles"],
        defaultSauce: "Spicy sauce",
        sauces: ["Spicy sauce", "Sunset Sauce", "Barbecue sauce", "Ketchup", "No sauce"],
        extras: [
            { name: "Extra beef patty", price: 0.45 },
            { name: "Extra cheese", price: 0.15 },
            { name: "Extra bacon", price: 0.25 }
        ]
    },
    "Highway Patty Melt": {
        removable: ["Swiss cheese", "American cheese", "caramelized onions"],
        defaultSauce: "Diner sauce",
        sauces: ["Diner sauce", "Sunset Sauce", "Barbecue sauce", "Ketchup", "No sauce"],
        extras: [
            { name: "Extra beef patty", price: 0.45 },
            { name: "Extra cheese", price: 0.15 },
            { name: "Add bacon", price: 0.25 }
        ]
    },
    "Hot Rod Chicken": {
        removable: ["pickles", "shredded lettuce", "hot honey"],
        defaultSauce: "Diner mayo",
        sauces: ["Diner mayo", "Sunset Sauce", "Spicy sauce", "Ketchup", "No sauce"],
        extras: [
            { name: "Extra crispy chicken", price: 0.50 },
            { name: "Add cheese", price: 0.15 },
            { name: "Add bacon", price: 0.25 }
        ]
    },
    "Crispy Chicken Club": {
        removable: ["cheddar", "bacon", "lettuce", "tomato", "pickles"],
        defaultSauce: "Mayo",
        sauces: ["Mayo", "Sunset Sauce", "Spicy sauce", "Ketchup", "No sauce"],
        extras: [
            { name: "Extra crispy chicken", price: 0.50 },
            { name: "Extra cheese", price: 0.15 },
            { name: "Extra bacon", price: 0.25 }
        ]
    },
    "Deluxe Grilled Cheese": {
        removable: ["tomato", "caramelized onions"],
        defaultSauce: "No sauce",
        sauces: ["No sauce", "Sunset Sauce", "Diner sauce", "Spicy sauce", "Ketchup"],
        extras: [
            { name: "Extra cheese", price: 0.15 },
            { name: "Add bacon", price: 0.25 },
            { name: "Extra tomato", price: 0.10 }
        ]
    },
    "Classic Diner Dog": {
        removable: ["sweet relish", "diced onion"],
        defaultSauce: "Yellow mustard",
        sauces: ["Yellow mustard", "Sunset Sauce", "Barbecue sauce", "Ketchup", "No sauce"],
        extras: [
            { name: "Extra hot dog", price: 0.35 },
            { name: "Add cheese", price: 0.15 },
            { name: "Add bacon", price: 0.25 }
        ]
    },
    "Disco Fries": {
        removable: ["signature seasoning"],
        defaultSauce: "House ketchup",
        sauces: ["House ketchup", "Sunset Sauce", "House ranch", "No sauce"],
        extras: [
            { name: "Add cheese sauce", price: 0.15 },
            { name: "Add bacon", price: 0.25 },
            { name: "Extra dipping sauce", price: 0.10 }
        ]
    },
    "Far-Out Onion Rings": {
        removable: [],
        defaultSauce: "House ranch",
        sauces: ["House ranch", "Ketchup", "Sunset Sauce", "No sauce"],
        extras: [
            { name: "Extra house ranch", price: 0.10 },
            { name: "Add cheese sauce", price: 0.15 },
            { name: "Add bacon bits", price: 0.20 }
        ]
    },
    "Fried Pickle Chips": {
        removable: [],
        defaultSauce: "Sunset Sauce",
        sauces: ["Sunset Sauce", "House ranch", "Ketchup", "Spicy sauce", "No sauce"],
        extras: [
            { name: "Extra dipping sauce", price: 0.10 },
            { name: "Add cheese sauce", price: 0.15 },
            { name: "Add bacon bits", price: 0.20 }
        ]
    },
    "Loaded Disco Fries": {
        removable: ["bacon", "green onions", "cheddar sauce"],
        defaultSauce: "Creamy diner sauce",
        sauces: ["Creamy diner sauce", "Ketchup", "Sunset Sauce", "House ranch", "No sauce"],
        extras: [
            { name: "Extra cheese sauce", price: 0.15 },
            { name: "Extra bacon", price: 0.25 },
            { name: "Add jalapeños", price: 0.10 }
        ]
    },
    "Mac & Cheese Bites": {
        removable: [],
        defaultSauce: "House ketchup",
        sauces: ["House ketchup", "House ranch", "Sunset Sauce", "Spicy sauce", "No sauce"],
        extras: [
            { name: "Extra dipping sauce", price: 0.10 },
            { name: "Add cheese sauce", price: 0.15 },
            { name: "Add bacon bits", price: 0.20 }
        ]
    },
    "Roller Rink Tots": {
        removable: ["cheddar", "green onions"],
        defaultSauce: "Sunset Sauce",
        sauces: ["Sunset Sauce", "Ketchup", "House ranch", "Spicy sauce", "No sauce"],
        extras: [
            { name: "Extra cheese", price: 0.15 },
            { name: "Add bacon", price: 0.25 },
            { name: "Add jalapeños", price: 0.10 }
        ]
    },
    "Golden Shake": {
        removable: ["whipped cream", "cherry"],
        choiceHeading: "Choose your drizzle",
        choiceLabel: "Drizzle",
        choicePrefix: "Drizzle",
        defaultChoice: "Golden caramel",
        choices: ["Golden caramel", "Hot fudge", "Strawberry sauce", "No drizzle"],
        extras: [
            { name: "Extra ice cream scoop", price: 0.20 },
            { name: "Make it malted", price: 0.10 },
            { name: "Extra whipped cream", price: 0.10 }
        ]
    },
    "Chocolate Boogie": {
        removable: ["whipped cream", "chocolate drizzle"],
        choiceHeading: "Choose your drizzle",
        choiceLabel: "Drizzle",
        choicePrefix: "Drizzle",
        defaultChoice: "Hot fudge",
        choices: ["Hot fudge", "Golden caramel", "Strawberry sauce", "No drizzle"],
        extras: [
            { name: "Extra ice cream scoop", price: 0.20 },
            { name: "Make it malted", price: 0.10 },
            { name: "Add a cherry", price: 0.05 }
        ]
    },
    "Strawberry Sunset": {
        removable: ["whipped cream", "cherry"],
        choiceHeading: "Choose your drizzle",
        choiceLabel: "Drizzle",
        choicePrefix: "Drizzle",
        defaultChoice: "Strawberry sauce",
        choices: ["Strawberry sauce", "Hot fudge", "Golden caramel", "No drizzle"],
        extras: [
            { name: "Extra ice cream scoop", price: 0.20 },
            { name: "Make it malted", price: 0.10 },
            { name: "Extra strawberries", price: 0.15 }
        ]
    },
    "Orange Dream Shake": {
        removable: ["whipped cream", "orange slice", "cherry"],
        choiceHeading: "Choose your finish",
        choiceLabel: "Finish",
        choicePrefix: "Finish",
        defaultChoice: "Orange syrup",
        choices: ["Orange syrup", "Golden caramel", "Hot fudge", "No drizzle"],
        extras: [
            { name: "Extra ice cream scoop", price: 0.20 },
            { name: "Make it malted", price: 0.10 },
            { name: "Extra whipped cream", price: 0.10 }
        ]
    },
    "Peanut Butter Boogie": {
        removable: ["whipped cream", "crushed peanuts", "cherry"],
        choiceHeading: "Choose your drizzle",
        choiceLabel: "Drizzle",
        choicePrefix: "Drizzle",
        defaultChoice: "Peanut butter drizzle",
        choices: ["Peanut butter drizzle", "Hot fudge", "Golden caramel", "No drizzle"],
        extras: [
            { name: "Extra ice cream scoop", price: 0.20 },
            { name: "Make it malted", price: 0.10 },
            { name: "Extra crushed peanuts", price: 0.10 }
        ]
    },
    "Root Beer Float": {
        removable: ["cherry"],
        choiceHeading: "Choose your soda",
        choiceLabel: "Soda",
        choicePrefix: "Soda",
        defaultChoice: "Root beer",
        choices: ["Root beer", "Cola", "Orange soda", "Cream soda"],
        extras: [
            { name: "Extra ice cream scoop", price: 0.20 },
            { name: "Add whipped cream", price: 0.10 },
            { name: "Extra cherry", price: 0.05 }
        ]
    },
    "Hot Fudge Brownie Sundae": {
        removable: ["whipped cream", "chopped nuts", "cherry"],
        choiceHeading: "Choose your topping",
        choiceLabel: "Topping",
        choicePrefix: "Topping",
        defaultChoice: "Hot fudge",
        choices: ["Hot fudge", "Golden caramel", "Strawberry sauce", "No topping"],
        extras: [
            { name: "Extra ice cream scoop", price: 0.20 },
            { name: "Extra brownie", price: 0.30 },
            { name: "Extra chopped nuts", price: 0.10 }
        ]
    },
    "Cherry Pie": {
        removable: ["vanilla ice cream"],
        choiceHeading: "Choose your drizzle",
        choiceLabel: "Drizzle",
        choicePrefix: "Drizzle",
        defaultChoice: "No drizzle",
        choices: ["No drizzle", "Golden caramel", "Hot fudge", "Strawberry sauce"],
        extras: [
            { name: "Extra vanilla scoop", price: 0.20 },
            { name: "Add whipped cream", price: 0.10 },
            { name: "Extra cherry topping", price: 0.15 }
        ]
    },
    "Banana Split": {
        removable: ["whipped cream", "nuts", "cherries", "pineapple topping"],
        choiceHeading: "Choose your sauce",
        choiceLabel: "Sauce",
        choicePrefix: "Sauce",
        defaultChoice: "Classic three sauces",
        choices: ["Classic three sauces", "Hot fudge only", "Strawberry only", "Golden caramel only"],
        extras: [
            { name: "Extra ice cream scoop", price: 0.20 },
            { name: "Extra banana", price: 0.15 },
            { name: "Extra nuts", price: 0.10 }
        ]
    },
    "Chocolate Cream Pie": {
        removable: ["whipped cream", "chocolate curls"],
        choiceHeading: "Choose your drizzle",
        choiceLabel: "Drizzle",
        choicePrefix: "Drizzle",
        defaultChoice: "No drizzle",
        choices: ["No drizzle", "Hot fudge", "Golden caramel", "Strawberry sauce"],
        extras: [
            { name: "Extra whipped cream", price: 0.10 },
            { name: "Add vanilla scoop", price: 0.20 },
            { name: "Extra chocolate curls", price: 0.10 }
        ]
    }
};

function createCustomizationCheckbox(container, name, value, labelText, price) {
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.type = "checkbox";
    input.name = name;
    input.value = value;

    if (price !== undefined) {
        input.dataset.extraPrice = price;
    }

    label.appendChild(input);
    label.appendChild(document.createTextNode(` ${labelText}`));
    container.appendChild(label);
}

function renderProductCustomization(productName) {
    currentCustomizationConfig = productCustomizationConfigs[productName] || null;
    productCustomization.hidden = currentCustomizationConfig === null;
    removeToppingOptions.textContent = "";
    extraOptions.textContent = "";
    productSauce.textContent = "";

    if (currentCustomizationConfig === null) {
        return;
    }

    customizationIntro.textContent = `Choose exactly how you want your ${productName}.`;
    removeToppingOptions.hidden = currentCustomizationConfig.removable.length === 0;
    removeToppingOptions.previousElementSibling.hidden = currentCustomizationConfig.removable.length === 0;
    productChoiceHeading.textContent = currentCustomizationConfig.choiceHeading || "Choose your sauce";
    productChoiceLabel.textContent = currentCustomizationConfig.choiceLabel || "Sauce";

    currentCustomizationConfig.removable.forEach(function (topping) {
        createCustomizationCheckbox(
            removeToppingOptions,
            "remove-topping",
            `No ${topping}`,
            `No ${topping}`
        );
    });

    const productChoices = currentCustomizationConfig.choices || currentCustomizationConfig.sauces;

    productChoices.forEach(function (choice) {
        const option = document.createElement("option");
        option.value = choice;
        option.textContent = choice;
        productSauce.appendChild(option);
    });

    currentCustomizationConfig.extras.forEach(function (extra) {
        createCustomizationCheckbox(
            extraOptions,
            "extra",
            extra.name,
            `${extra.name} (+$${extra.price.toFixed(2)})`,
            extra.price
        );
    });
}

function getSelectedCustomizations() {
    if (productCustomization === null || productCustomization.hidden) {
        return [];
    }

    const customizations = [];
    const removedToppings = productCustomization.querySelectorAll("input[name='remove-topping']:checked");
    const selectedExtras = productCustomization.querySelectorAll("input[name='extra']:checked");

    removedToppings.forEach(function (option) {
        customizations.push(option.value);
    });

    const defaultChoice = currentCustomizationConfig.defaultChoice || currentCustomizationConfig.defaultSauce;
    const choicePrefix = currentCustomizationConfig.choicePrefix || "Sauce";

    if (productSauce.value !== defaultChoice) {
        customizations.push(`${choicePrefix}: ${productSauce.value}`);
    }

    selectedExtras.forEach(function (option) {
        customizations.push(option.value);
    });

    return customizations;
}

function getExtrasPrice() {
    if (productCustomization === null || productCustomization.hidden) {
        return 0;
    }

    let extrasPrice = 0;
    const selectedExtras = productCustomization.querySelectorAll("input[name='extra']:checked");

    selectedExtras.forEach(function (option) {
        extrasPrice += Number(option.dataset.extraPrice);
    });

    return extrasPrice;
}

function updateProductDialogTotal() {
    const unitPrice = currentProductBasePrice + getExtrasPrice();
    const orderPrice = unitPrice * currentProductQuantity;

    productDialogPrice.textContent = `$${unitPrice.toFixed(2)} each`;
    productQuantityValue.textContent = currentProductQuantity;
    productDialogAdd.dataset.price = unitPrice.toFixed(2);
    productDialogAdd.textContent = `Add ${currentProductQuantity} to Order — $${orderPrice.toFixed(2)}`;
}

function resetProductOptions() {
    currentProductQuantity = 1;
}

function updateCartCount() {
    let totalItems = 0;

    cart.forEach(function (item) {
        totalItems += item.quantity;
    });

    cartCount.textContent = totalItems;
}

function saveCart() {
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
    updateOrderTotals();
    updatePickupEstimate();
}

function animateAddToCart(sourceImage, itemName, quantity) {
    if (cartToast !== null) {
        window.clearTimeout(cartToastTimer);
        cartToast.classList.remove("show");
        cartToast.textContent = quantity === 1
            ? `${itemName} added to your order.`
            : `${quantity} ${itemName} orders added to your order.`;

        window.requestAnimationFrame(function () {
            cartToast.classList.add("show");
        });

        cartToastTimer = window.setTimeout(function () {
            cartToast.classList.remove("show");
        }, 2400);
    }

    if (prefersReducedMotion.matches || sourceImage === null || cartCount === null) {
        return;
    }

    const imagePosition = sourceImage.getBoundingClientRect();
    const cartPosition = cartCount.getBoundingClientRect();
    const flyingImage = sourceImage.cloneNode();
    const imageStartX = imagePosition.left + imagePosition.width / 2 - 40;
    const imageStartY = imagePosition.top + imagePosition.height / 2 - 40;
    const imageEndX = cartPosition.left + cartPosition.width / 2 - 40;
    const imageEndY = cartPosition.top + cartPosition.height / 2 - 40;

    flyingImage.removeAttribute("id");
    flyingImage.alt = "";
    flyingImage.className = "cart-fly-image";
    flyingImage.style.left = `${imageStartX}px`;
    flyingImage.style.top = `${imageStartY}px`;
    document.body.appendChild(flyingImage);

    window.requestAnimationFrame(function () {
        flyingImage.style.transform = `translate(${imageEndX - imageStartX}px, ${imageEndY - imageStartY}px) scale(0.2)`;
        flyingImage.style.opacity = "0";
    });

    flyingImage.addEventListener("transitionend", function () {
        flyingImage.remove();
    }, { once: true });

    cartCount.classList.remove("cart-count-pop");
    void cartCount.offsetWidth;
    cartCount.classList.add("cart-count-pop");
}

function addItemToCart(itemName, itemPrice, sourceImage, quantity = 1, customizations = []) {
    const customizationKey = JSON.stringify(customizations);
    const existingItem = cart.find(function (item) {
        return item.name === itemName
            && item.price === itemPrice
            && JSON.stringify(item.customizations || []) === customizationKey;
    });

    if (existingItem) {
        existingItem.price = itemPrice;
        existingItem.quantity += quantity;
    } else {
        const item = {
            name: itemName,
            price: itemPrice,
            quantity: quantity,
            customizations: customizations
        };

        cart.push(item);
    }

    saveCart();
    animateAddToCart(sourceImage, itemName, quantity);
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
        const itemCustomizations = document.createElement("p");
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
        itemCustomizations.classList.add("cart-item-customizations");
        itemName.textContent = item.name;
        itemCustomizations.textContent = (item.customizations || []).join(" • ");
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
        if ((item.customizations || []).length > 0) {
            itemInfo.appendChild(itemCustomizations);
        }
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

function launchOrderCelebration() {
    confirmationContent.classList.add("celebrate");

    if (prefersReducedMotion.matches || confettiContainer === null) {
        return;
    }

    const confettiColors = ["#b84927", "#e2a72e", "#617438", "#fff1cf"];
    confettiContainer.textContent = "";

    for (let index = 0; index < 36; index += 1) {
        const confettiPiece = document.createElement("span");
        const drift = Math.round(Math.random() * 240 - 120);

        confettiPiece.classList.add("confetti-piece");
        confettiPiece.style.left = `${Math.random() * 100}%`;
        confettiPiece.style.backgroundColor = confettiColors[index % confettiColors.length];
        confettiPiece.style.animationDelay = `${Math.random() * 0.45}s`;
        confettiPiece.style.animationDuration = `${1.8 + Math.random() * 0.8}s`;
        confettiPiece.style.setProperty("--confetti-drift", `${drift}px`);
        confettiContainer.appendChild(confettiPiece);
    }

    window.setTimeout(function () {
        confettiContainer.textContent = "";
    }, 3200);
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
    launchOrderCelebration();
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
        const itemCustomizations = document.createElement("small");
        const itemTotal = document.createElement("strong");

        receiptRow.classList.add("receipt-row");
        itemCustomizations.classList.add("receipt-customizations");
        itemDescription.textContent = `${item.quantity} × ${item.name}`;
        itemCustomizations.textContent = (item.customizations || []).join(" • ");
        itemTotal.textContent = money.format(item.price * item.quantity);

        if ((item.customizations || []).length > 0) {
            itemDescription.appendChild(itemCustomizations);
        }

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
        const itemImage = addButton.closest(".menu-item").querySelector(".menu-item-image");
        addItemToCart(itemName, itemPrice, itemImage);
    });
});

menuItems.forEach(function (menuItem) {
    const addButton = menuItem.querySelector(".add-to-order");
    const detailsButton = document.createElement("button");

    detailsButton.className = "view-details";
    detailsButton.type = "button";
    detailsButton.textContent = "View Details";
    menuItem.insertBefore(detailsButton, addButton);

    detailsButton.addEventListener("click", function () {
        const itemImage = menuItem.querySelector(".menu-item-image");
        const itemName = menuItem.querySelector("h3");
        const itemDescription = itemName.nextElementSibling;

        productDialogImage.src = itemImage.src;
        productDialogImage.alt = itemImage.alt;
        productDialogName.textContent = itemName.textContent;
        productDialogIngredients.textContent = `${menuIngredients[addButton.dataset.name].join(", ")}.`;
        productDialogDescription.textContent = itemDescription.textContent;
        productDialogAdd.dataset.name = addButton.dataset.name;
        currentProductBasePrice = Number(addButton.dataset.price);
        resetProductOptions();
        renderProductCustomization(addButton.dataset.name);
        updateProductDialogTotal();
        lastDetailsButton = detailsButton;
        productDialog.showModal();
    });
});

if (productDialogClose !== null) {
    productDialogClose.addEventListener("click", function () {
        productDialog.close();
    });

    productDialog.addEventListener("click", function (event) {
        if (event.target === productDialog) {
            productDialog.close();
        }
    });

    productDialog.addEventListener("close", function () {
        if (lastDetailsButton !== null) {
            lastDetailsButton.focus();
        }
    });

    productCustomization.addEventListener("change", function () {
        updateProductDialogTotal();
    });

    productQuantityMinus.addEventListener("click", function () {
        if (currentProductQuantity > 1) {
            currentProductQuantity -= 1;
            updateProductDialogTotal();
        }
    });

    productQuantityPlus.addEventListener("click", function () {
        if (currentProductQuantity < 10) {
            currentProductQuantity += 1;
            updateProductDialogTotal();
        }
    });

    productDialogAdd.addEventListener("click", function () {
        addItemToCart(
            productDialogAdd.dataset.name,
            Number(productDialogAdd.dataset.price),
            productDialogImage,
            currentProductQuantity,
            getSelectedCustomizations()
        );
        productDialog.close();
    });
}

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
        localStorage.setItem(cartStorageKey, JSON.stringify(cart));
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
