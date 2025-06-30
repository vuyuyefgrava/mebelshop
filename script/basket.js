 document.addEventListener("DOMContentLoaded", () => {
  const totalCard = document.querySelector(".card-field");
  const clearCartButton = document.querySelector(".clear-cart");
  const titleBasket = document.querySelector('.basket__title')
  const bill = document.querySelector('.total_card')

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  function renderCart() {
    totalCard.innerHTML = "";
    bill.innerHTML = "";

    if (cart.length === 0) {
      clearCartButton.remove();
      titleBasket.innerHTML += `<h2 class="basket__title-text">Корзина пуста</h2>`;
      titleBasket.style.flexDirection = "column";
      return;
    }

    const fragment = document.createDocumentFragment();
    let totalPrice = 0;
    let quantityElement = 0;

    cart.forEach(({ id, name, price, quantity, img, description }) => {
      const productElement = document.createElement("div");
      productElement.classList.add("card");

      const increaseButtonClass =
        quantity === 20 ? "increase disabled" : "increase";

      productElement.innerHTML = `
      <div class="cardImgInner"><img src="${img}" class="cardImg" alt="Изображение товара"></div>
      <div class="card__description">
        <h2 class="cardContent cardTitle">${name}</h2>
        <h3 class="cardContent cardText cardSubtitle">${description}</h3>
        <button class="remove" data-id="${id}">X</button>
      </div> 
      <h3 class="cardContent cardText">
        <span class="total">${price * quantity}₽</span>
      </h3>
      <div class="end-of-cart">
        <div class="quantityOfGoods">
          <button class="decrease" data-id="${id}">-</button>
          <h2 class="cardContent cardText"><span class="quantity">${quantity}</span></h2>
          <button class="${increaseButtonClass}" data-id="${id}">+</button>
        </div>
        <div><h4 class="cardContent cardText cardSubtitle">${price}Р/ед</h4></div>
      </div>
    `;

      fragment.appendChild(productElement);
      totalPrice += price * quantity;
      quantityElement += quantity
    });

    totalCard.appendChild(fragment);


    let deliveryPrice = 0;
    let deliveryChecked = false;

    // Отображение изначального блока
    bill.innerHTML = `
      <h2>Товары (${quantityElement})</h2>
      <div class="delivery-option" style="margin: 10px 0;">
        <label>
          <input type="checkbox" id="deliveryCheckbox" />
          Оформить доставку (+2000₽, бесплатно при заказе от 70 000₽)
        </label>
      </div>
      <h2 class="final-total">Итого: ${totalPrice}₽</h2>
    `;

    const deliveryCheckbox = document.getElementById("deliveryCheckbox");
    const finalTotal = bill.querySelector(".final-total");

    function updateFinalTotal() {
      if (deliveryChecked && totalPrice < 70000) {
        deliveryPrice = 2000;
      } else {
        deliveryPrice = 0;
      }
      const displayPrice = totalPrice + deliveryPrice;
      finalTotal.textContent = `Итого: ${displayPrice}₽`;
    }

    deliveryCheckbox.addEventListener("change", function () {
      deliveryChecked = this.checked;
      updateFinalTotal();
    });

    updateFinalTotal();
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateQuantity(id, delta) {
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    if (delta === 1) {
      if (item.quantity < 20) {
        item.quantity = Math.max(1, item.quantity + delta);
      }
    } else {
      item.quantity = Math.max(1, item.quantity + delta);
    }

    saveCart();
    renderCart();
  }

  function removeProduct(id) {
    cart = cart.filter((item) => item.id !== id);
    saveCart();
    renderCart();
  }

  clearCartButton.addEventListener("click", () => {
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
    alert("Корзина очищена!");
  });

  totalCard.addEventListener("click", (e) => {
    const target = e.target;
    const id = target.dataset.id;
    if (!id) return;

    if (target.classList.contains("increase")) {
      updateQuantity(id, 1);
    } else if (target.classList.contains("decrease")) {
      updateQuantity(id, -1);
    } else if (target.classList.contains("remove")) {
      removeProduct(id);
    }
  });

  renderCart();
});