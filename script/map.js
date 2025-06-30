ymaps.ready(init);

function init() {
  const myMap = new ymaps.Map("yandex-map", {
    center: [55.766346, 37.619001], // координаты центра (Москва по умолчанию)
    zoom: 10,
    controls: ['zoomControl', 'fullscreenControl']
  });

  const myPlacemark = new ymaps.Placemark(
    [55.766346, 37.619001], // те же координаты
    {
      hintContent: "MebelShop",
      balloonContent: "Мы здесь! Добро пожаловать в наш магазин.",
    },
    {
      preset: "islands#redIcon",
    }
  );

  myMap.geoObjects.add(myPlacemark);
}