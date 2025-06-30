document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("tiH0p0rEtVDnNZrfU");

  document.getElementById("sendCartBtn").addEventListener("click", function () {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
      alert("Корзина пуста!");
      return;
    }

    const userEmail = document.getElementById("userEmail").value.trim();
    const userPhone = document.getElementById("userPhone").value.trim();

    if (!userEmail || !userPhone) {
      alert("Введите Email и Телефон.");
      return;
    }

    const cartText = cart
      .map(
        (item) =>
          `ID: ${item.id}
Название: ${item.name}
Описание: ${item.description}
Количество: ${item.quantity}
---`
      )
      .join("\n");

    const params = {
      to_email: "mebelshop17@gmail.com",
      user_email: userEmail,
      user_phone: userPhone,
      message: cartText,
    };

    emailjs
      .send("service_x8pw2e7", "template_kwa9wp9", params)
      .then(() => {
        const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
        cart.forEach((item) => {
          history.push({
            title: item.name,
            price: `${item.price * item.quantity}₽`,
            time: new Date().toLocaleString(),
          });
        });
        localStorage.setItem("orderHistory", JSON.stringify(history));

        alert("Заказ успешно отправлен!");
        closeModal();
        localStorage.removeItem("cart");
        location.reload();
      })
      .catch((error) => {
        console.error(error);
        alert("Ошибка отправки: " + error.text);
      });
  });
});

function openModal() {
  const modal = document.getElementById("productModal");
  modal.classList.add("show");
}

function closeModal() {
  const modal = document.getElementById("productModal");
  modal.classList.remove("show");
}

window.onclick = function (event) {
  const modal = document.getElementById("productModal");
  if (event.target === modal) {
    closeModal();
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("userPhone");

  phoneInput.addEventListener("input", function (e) {
    let x = phoneInput.value.replace(/\D/g, "").slice(0, 11);
    let formatted = "+7 ";
    if (x.length > 1) formatted += `(${x.slice(1, 4)}`;
    if (x.length >= 4) formatted += `) ${x.slice(4, 7)}`;
    if (x.length >= 7) formatted += `-${x.slice(7, 9)}`;
    if (x.length >= 9) formatted += `-${x.slice(9, 11)}`;
    phoneInput.value = formatted;
  });
});
