const imgList = {
    img1: "../pic/chest3.png",
    img2: "../pic/chest4.png",
    img3: "../pic/chest5.png",
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                id: button.getAttribute('data-id'),
                name: button.getAttribute('data-name'),
                price: parseFloat(button.getAttribute('data-price')),
                quantity: 1, // Добавляем количество
                img: button.getAttribute('data-img'),
                description: button.getAttribute('data-description')
            };
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingProductIndex = cart.findIndex(item => item.id === product.id);
            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            alert(`Товар "${product.name}" добавлен в корзину!`);
        });
    });
});
