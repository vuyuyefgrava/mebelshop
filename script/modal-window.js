function openModal(title, price, description, imageSrc) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalPrice").textContent = price;
  document.getElementById("modalDescription").textContent = description;
  document.getElementById("modalImage").src = imageSrc;
  document.getElementById("productModal").style.display = "block";
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

function selectSize(button) {
  const buttons = document.querySelectorAll(".size-buttons button");
  buttons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
}

function addToCart() {
  alert("Товар добавлен в корзину!");
  closeModal();
}

window.onclick = function (event) {
  const modal = document.getElementById("productModal");
  if (event.target == modal) {
    closeModal();
  }
};