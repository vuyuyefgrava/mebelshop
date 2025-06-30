function openModal() {
  const modal = document.getElementById("productModal");
  modal.classList.add("show");
}

function closeModal() {
  const modal = document.getElementById("productModal");
  modal.classList.remove("show");
}

window.addEventListener("click", function (e) {
  const modal = document.getElementById("productModal");
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("userPhone");

  phoneInput.addEventListener("input", function () {
    let x = phoneInput.value.replace(/\D/g, '').slice(0, 11);
    let formatted = '+7 ';
    if (x.length > 1) formatted += `(${x.slice(1, 4)}`;
    if (x.length >= 4) formatted += `) ${x.slice(4, 7)}`;
    if (x.length >= 7) formatted += `-${x.slice(7, 9)}`;
    if (x.length >= 9) formatted += `-${x.slice(9, 11)}`;
    phoneInput.value = formatted;
  });
});