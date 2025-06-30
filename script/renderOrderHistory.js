document.addEventListener("DOMContentLoaded", () => {
  const historySection = document.getElementById("order-history");
  const orderList = document.getElementById("order-list");
  const clearHistoryBtn = document.getElementById("clear-order-history");

  const history = JSON.parse(localStorage.getItem("orderHistory")) || [];

  if (history.length === 0) {
    historySection.style.display = "none";
    return;
  }

  historySection.style.display = "block";

  history.reverse().forEach((order) => {
    const orderItem = document.createElement("div");
    orderItem.classList.add("order-history__item");

    orderItem.innerHTML = `
      <strong>${order.title}</strong><br>
      Цена: ${order.price}<br>
      Дата: ${order.time}
    `;

    orderList.appendChild(orderItem);
  });

  clearHistoryBtn.addEventListener("click", () => {
    if (confirm("Вы уверены, что хотите удалить историю заказов?")) {
      localStorage.removeItem("orderHistory");
      orderList.innerHTML = "";
      historySection.style.display = "none";
    }
  });
});