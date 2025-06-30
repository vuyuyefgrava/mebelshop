window.addEventListener("DOMContentLoaded", () => {
  const scrollToId = sessionStorage.getItem("scrollTo");
  if (scrollToId) {
    const target = document.getElementById(scrollToId);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
    sessionStorage.removeItem("scrollTo");
  }
});
