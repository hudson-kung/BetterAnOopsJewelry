const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const bagCount = document.querySelector("#bagCount");
const toast = document.querySelector("#toast");
const filterButtons = document.querySelectorAll(".filter");
const productCards = document.querySelectorAll(".product-card");
const addButtons = document.querySelectorAll(".add-button");
const contactForm = document.querySelector(".contact-form");
const cartItems = document.querySelector("#cartItems");
const summaryItems = document.querySelector("#summaryItems");
const summarySubtotal = document.querySelector("#summarySubtotal");
const checkoutButton = document.querySelector("#checkoutButton");
const productDetail = document.querySelector("#productDetail");

const cartKey = "betterAnOopsCart";
let toastTimer;

const products = [
  {
    id: "celona-onyx-pearl-hoops",
    name: "CELONA Onyx Pearl Hoops",
    price: 399,
    category: "Earrings",
    description: "A snug double-oval hoop design handcrafted in Kyoto-inspired Japanese aesthetic artisanship, finished with black onyx and freshwater pearl accents.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
    pictures: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Gold", "Silver"],
    stats: {
      Material: "Brass, silver, yellow gold",
      Gemstone: "Black onyx and freshwater pearl",
      Made: "Handcrafted in Japan",
      Shipping: "Ships from California"
    }
  },
  {
    id: "fifs-chrysocolla-stackable-ring",
    name: "FIFS Chrysocolla Stackable Ring",
    price: 248.3,
    category: "Ring",
    description: "An adjustable stackable ring handcrafted in Kyoto-inspired Japanese artisanship, pairing chrysocolla, malachite, and Swarovski crystal accents in an 18K gold look.",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=80",
    pictures: [
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Gold", "Green", "Blue"],
    stats: {
      Material: "Brass, silver, yellow gold",
      Gemstone: "Chrysocolla and malachite",
      Fit: "Adjustable",
      Made: "Handcrafted in Japan"
    }
  },
  {
    id: "fifs-rose-quartz-stackable-ring",
    name: "FIFS Rose Quartz Stackable Ring",
    price: 284.3,
    category: "Ring",
    description: "A soft pastel adjustable stackable ring handcrafted in Kyoto-inspired Japanese artisanship, pairing rose quartz with gray-toned druzy agate.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    pictures: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Gold", "Pink", "Gray"],
    stats: {
      Material: "Brass, silver, yellow gold",
      Gemstone: "Rose quartz and druzy agate",
      Fit: "Adjustable",
      Made: "Handcrafted in Japan"
    }
  },
  {
    id: "fifs-oyster-turquoise-stackable-ring",
    name: "FIFS Oyster Turquoise Ring",
    price: 363.3,
    category: "Ring",
    description: "A handcrafted Kyoto-inspired stacking birthstone ring featuring oyster turquoise, copper turquoise, and a pointed gold-tone silhouette.",
    image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=900&q=80",
    pictures: [
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Gold", "Turquoise", "Champagne"],
    stats: {
      Material: "Brass, silver, yellow gold",
      Gemstone: "Oyster turquoise and copper turquoise",
      Fit: "Adjustable",
      Made: "Handcrafted in Japan"
    }
  }
];

const findProduct = (id) => products.find((product) => product.id === id);

const getCart = () =>
  JSON.parse(window.localStorage.getItem(cartKey) || "[]")
    .map((item) => {
      const product = findProduct(item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

const saveCart = (cart) => {
  window.localStorage.setItem(cartKey, JSON.stringify(cart));
};

const getCartTotal = (cart) => cart.reduce((total, item) => total + item.quantity, 0);

const formatPrice = (price) => `$${price.toFixed(2).replace(".00", "")}`;

const showToast = (message) => {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
    toast.textContent = "Added to cart";
  }, 1600);
};

const updateCartCount = () => {
  if (!bagCount) return;
  bagCount.textContent = getCartTotal(getCart());
};

const renderCart = () => {
  if (!cartItems) return;

  const cart = getCart();
  const itemCount = getCartTotal(cart);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  summaryItems.textContent = itemCount;
  summarySubtotal.textContent = formatPrice(subtotal);
  checkoutButton.disabled = itemCount === 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty.</h2>
        <p>There are no products listed right now.</p>
        <a class="button primary" href="shop.html">View Shop</a>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <article class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <span class="tag">${item.category}</span>
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <div class="cart-item-meta">
              <strong>${formatPrice(item.price)}</strong>
              <span>Qty: ${item.quantity}</span>
            </div>
          </div>
          <button class="remove-item" type="button" data-id="${item.id}">Remove</button>
        </article>
      `
    )
    .join("");
};

const addProductToCart = (product) => {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartCount();
  showToast(`${product.name} added to cart`);
};

const renderProductDetail = () => {
  if (!productDetail) return;

  const productId = new URLSearchParams(window.location.search).get("id");
  const product = findProduct(productId);

  if (!product) {
    productDetail.innerHTML = `
      <div class="empty-cart">
        <h1>We could not find that item.</h1>
        <p>No products are listed right now.</p>
        <a class="button primary" href="shop.html">Back to Shop</a>
      </div>
    `;
    return;
  }

  document.title = `${product.name} | BetterAnOops`;
  productDetail.innerHTML = `
    <div class="product-detail-gallery">
      <img class="product-main-image" src="${product.pictures[0]}" alt="${product.name}" />
      <div class="product-thumbs">
        ${product.pictures.map((picture) => `<img src="${picture}" alt="${product.name} preview" />`).join("")}
      </div>
    </div>
    <div class="product-detail-copy">
      <p class="eyebrow">${product.category}</p>
      <h1>${product.name}</h1>
      <p>${product.description}</p>
      <strong class="detail-price">${formatPrice(product.price)}</strong>
      <div class="detail-block">
        <h2>Colors</h2>
        <div class="color-options">
          ${product.colors.map((color) => `<span>${color}</span>`).join("")}
        </div>
      </div>
      <div class="detail-block">
        <h2>Stats</h2>
        <dl class="stats-list">
          ${Object.entries(product.stats)
            .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
            .join("")}
        </dl>
      </div>
      <button class="button primary detail-add-button" type="button" data-product-id="${product.id}">Add to Cart</button>
    </div>
  `;
};

updateCartCount();
renderCart();
renderProductDetail();

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    productCards.forEach((card) => {
      const shouldShow = selectedCategory === "all" || card.dataset.category === selectedCategory;
      card.hidden = !shouldShow;
    });
  });
});

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    const product = findProduct(card.dataset.productId);

    if (!product) return;

    addProductToCart(product);
    button.textContent = "Added";

    window.setTimeout(() => {
      button.textContent = "Add";
    }, 1400);
  });
});

productCards.forEach((card) => {
  const openProduct = () => {
    window.location.href = `product.html?id=${card.dataset.productId}`;
  };

  card.addEventListener("click", (event) => {
    if (event.target.closest(".add-button")) return;
    openProduct();
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      openProduct();
    }
  });
});

if (productDetail) {
  productDetail.addEventListener("click", (event) => {
    const thumb = event.target.closest(".product-thumbs img");
    const addButton = event.target.closest(".detail-add-button");

    if (thumb) {
      productDetail.querySelector(".product-main-image").src = thumb.src;
    }

    if (addButton) {
      const product = findProduct(addButton.dataset.productId);
      if (product) addProductToCart(product);
    }
  });
}

if (cartItems) {
  cartItems.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".remove-item");
    if (!removeButton) return;

    const cart = getCart().filter((item) => item.id !== removeButton.dataset.id);
    saveCart(cart);
    updateCartCount();
    renderCart();
    showToast("Item removed");
  });
}

if (checkoutButton) {
  checkoutButton.addEventListener("click", () => {
    showToast("Checkout is ready to connect");
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Message ready to send");
    contactForm.reset();
  });
}
