document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtns = document.querySelectorAll(".cart");
  const shopBtn = document.querySelector("#hero button");
  const navbar = document.querySelector("#navbar");

  let cartCount = document.createElement("span");
  cartCount.id = "cart-count";
  cartCount.style.position = "absolute";
  cartCount.style.top = "0";
  cartCount.style.right = "0";
  cartCount.style.background = "red";
  cartCount.style.color = "white";
  cartCount.style.fontSize = "12px";
  cartCount.style.fontWeight = "bold";
  cartCount.style.borderRadius = "50%";
  cartCount.style.padding = "2px 6px";
  cartCount.style.transform = "translate(50%, -50%)";

  const cartIcon = navbar.querySelector(".fa-shopify").parentElement;
  cartIcon.style.position = "relative";
  cartIcon.appendChild(cartCount);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount();

  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const product = btn.closest(".pro");
      const title = product.querySelector("span").textContent;
      const price = product.querySelector("h4").textContent;
      const img = product.querySelector("img").getAttribute("src");

      const productObj = { title, price, img };

      const exists = cart.find((item) => item.title === title && item.price === price);
      if (!exists) {
        cart.push(productObj);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        showToast(`${title} added to cart 🛒`);
      } else {
        showToast(`${title} is already in your cart ⚠️`);
      }
    });
  });

  shopBtn.addEventListener("click", () => {
    document.querySelector("#product").scrollIntoView({ behavior: "smooth" });
  });

  function updateCartCount() {
    cartCount.textContent = cart.length;
  }
  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "#088178";
    toast.style.color = "white";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "6px";
    toast.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
    toast.style.zIndex = "9999";
    toast.style.fontWeight = "600";
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.5s";
      setTimeout(() => toast.remove(), 500);
    }, 1500);
  }
});
