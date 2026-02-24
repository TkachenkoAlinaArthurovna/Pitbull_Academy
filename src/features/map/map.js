const filterNav = document.querySelector(".map-navigation");
document.body.addEventListener("click", (evt) => {
  const target = evt.target.closest("#filter-button");
  if (!target) return;

  evt.preventDefault();
  evt.stopPropagation(); // ← ДОДАЙ
  evt.stopImmediatePropagation(); // ← ДОДАЙ
  filterNav.classList.toggle("oppened");
});

export default function googleMap() {
  global.initMap = initMap;
}
// Google map start
async function func() {
  const script = document.createElement("script");
  let key = "";
  // if (window.location.href.match(/localhost/)) key = '';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&language=ua`;
  document.getElementsByTagName("head")[0].appendChild(script);
}

// setTimeout(func, 1000);
const maps = document.querySelectorAll(".map");
const options = {
  rootMargin: "0px",
  threshold: 0.1,
};

maps.forEach((image) => {
  const callback = (entries, observer) => {
    /* Content excerpted, show below */
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        observer.unobserve(image);
        func();
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  const target = image;
  observer.observe(target);
});
// eslint-disable-next-line no-unused-vars
function initMap() {
  const gmarkers1 = [];
  // const center = {
  //   lat: 49.2281012,
  //   lng: 28.3925433,
  // };
  const center = {
    lat: 50.382970841274535,
    lng: 30.39003054233024,
  };

  const choosedCategories = new Set();
  choosedCategories.add("main");
  const filterItems = document.querySelectorAll("[data-marker]");
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,
    language: "ua",
    styles: getMapTheme(),
  });
  window.googleMap = map;
  const filterMarkers = function (category, categoriesArray) {
    gmarkers1.forEach((el) => {
      if (categoriesArray.has(el.category) || categoriesArray.size === 1) {
        el.setMap(map);
        // el.setAnimation(google.maps.Animation.DROP);
      } else {
        el.setMap(null);
      }
    });
  };
  filterItems.forEach((item) => {
    item.addEventListener("click", (evt) => {
      evt.stopImmediatePropagation();
      item.classList.toggle("active");
      if (item.classList.contains("active")) {
        choosedCategories.add(item.dataset.category);
      } else {
        choosedCategories.delete(item.dataset.category);
      }
      filterMarkers("main", choosedCategories);
    });
  });
  const baseFolder =
    window.location.href.match(/localhost/) || window.location.href.match(/inzhur-bud-verstka/)
      ? "./assets/images/map/"
      : "/wp-content/themes/3d/assets/images/map/";

  var defaultMarkerSize = new google.maps.Size(56, 90);
  var buildLogoSize = new google.maps.Size(82, 82);
  if (document.documentElement.clientWidth < 1600) {
    var defaultMarkerSize = new google.maps.Size(71, 65);
    var buildLogoSize = new google.maps.Size(114, 109);
  }
  const markersAdresses = {
    main: `${baseFolder}main.svg`,
    mall: `${baseFolder}mall.svg`,
    park: `${baseFolder}park.svg`,
    pharmacy: `${baseFolder}pharmacy.svg`,
    restaurant: `${baseFolder}restaurant.svg`,
    school: `${baseFolder}school.svg`,
    sport: `${baseFolder}sport.svg`,
    supermarket: `${baseFolder}supermarket.svg`,
    busStop: `${baseFolder}busStop.svg`,
    pet: `${baseFolder}pet.svg`,
    novaPoshta: `${baseFolder}novaPoshta.svg`,
    beautyParlor: `${baseFolder}beautyParlor.svg`,
    ATM: `${baseFolder}ATM.svg`,
  };
  const markersData = [
    {
      type: "main",
      icon: { url: markersAdresses.main, scaledSize: buildLogoSize },
      position: { lat: 50.3829603860473, lng: 30.39004610421891 },
      text: "ЖК Свідомі - Крюківщина, Київська область",
    },
    // supermarket
    {
      type: "supermarket",
      icon: { url: markersAdresses.supermarket, scaledSize: defaultMarkerSize },
      position: { lat: 50.383529856200894, lng: 30.38806250000001 },
      text: "Сільпо - вулиця Європейська, 30, Вишневе, Київська область, 08132",
    },
    {
      type: "supermarket",
      icon: { url: markersAdresses.supermarket, scaledSize: defaultMarkerSize },
      position: { lat: 50.382627960867964, lng: 30.38446559782232 },
      text: "Оливка market - вулиця Молодіжна, 32, Вишневе, Київська область, 08132",
    },
    {
      type: "supermarket",
      icon: { url: markersAdresses.supermarket, scaledSize: defaultMarkerSize },
      position: { lat: 50.388131546836725, lng: 30.391747599437384 },
      text: `Фора - вулиця В'ячеслава Чорновола, 46Б, Вишневе, Київська область, 08132`,
    },
    {
      type: "supermarket",
      icon: { url: markersAdresses.supermarket, scaledSize: defaultMarkerSize },
      position: { lat: 50.38655215422168, lng: 30.3899555389242 },
      text: `АТБ-Маркет - вулиця В'ячеслава Чорновола, 46Б, Вишневе, Київська область, 08132`,
    },
    // mall
    {
      type: "mall",
      icon: { url: markersAdresses.mall, scaledSize: defaultMarkerSize },
      position: { lat: 50.37382236125806, lng: 30.37459953334079 },
      text: "ТРЦ Наше Nebo - вул. Балукова 1-Е, с. Крюківщина",
    },
    {
      type: "mall",
      icon: { url: markersAdresses.mall, scaledSize: defaultMarkerSize },
      position: { lat: 50.38579634605273, lng: 30.390335433340706 },
      text: "ТРЦ ParkSmall - вул. Василя Стуса 16, с. Крюківщина",
    },
    {
      type: "mall",
      icon: { url: markersAdresses.mall, scaledSize: defaultMarkerSize },
      position: { lat: 50.374464086577774, lng: 30.447231024806666 },
      text: "ТРЦ Республіка - Кільцева дорога, 1",
    },
    // school
    {
      type: "school",
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 50.38122674954772, lng: 30.373696988895684 },
      text: "Вишнівський академічний ліцей №1 - вулиця Освіти, 9, Вишневе, Київська область, 08133",
    },
    {
      type: "school",
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 50.37499352319826, lng: 30.36986974755579 },
      text: "Крюківщинська ЗОШ - вулиця Мічуріна, 12А, Крюківщина, Київська область, 08136",
    },
    {
      type: "school",
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 50.384463748751486, lng: 30.389022789222782 },
      text: "Nest Academy - Вулиця Івана Богуна, 1, Крюківщина, Київська область, 08131",
    },
    {
      type: "school",
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 50.38939968080313, lng: 30.374732033404598 },
      text: "Вишнівська ЗОШ №2 - вулиця Остапа Вишні, 2, Вишневе, Київська область, 08132",
    },
    {
      type: "school",
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 50.38939968080313, lng: 30.374732033404598 },
      text: "Вишнівська ЗОШ №2 - вулиця Остапа Вишні, 2, Вишневе, Київська область, 08132",
    },
    {
      type: "school",
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 50.392987721003095, lng: 30.372562793952103 },
      text: "Smart Up - вулиця Європейська, Вишневе, Київська область, 08132",
    },
    {
      type: "school",
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 50.37410862911629, lng: 30.398704159165085 },
      text: "Shkola Navpaky  - вулиця Повітрофлотська, 9б, Крюківщина, Київська область, 08136",
    },
    {
      type: "school",
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 50.3684586383556, lng: 30.38607337738682 },
      text: "Ідея - Загородна, 3, Крюківщина, Київська область, 08136",
    },
    {
      type: "school",
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 50.38551716321081, lng: 30.387900289609576 },
      text: "Ігринка - вулиця Франка, 23, Вишневе, Київська область, 08132",
    },
    {
      type: "school",
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 50.38097116994306, lng: 30.376074399698837 },
      text: "ЯБЛУНЬКА - вулиця Освіти, 11, Вишневе, Київська область, 08132",
    },
    {
      type: "school",
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 50.37510283938992, lng: 30.37510537151658 },
      text: "Mamaya - вулиця Дружби, 25, Крюківщина, Київська область, 08136",
    },
    {
      type: "school",
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 50.37719083736883, lng: 30.37947143907566 },
      text: "Світлячок - вул. Жулянська, 1А, Крюківщина, Київська область, 08136",
    },
    {
      type: "school",
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 50.37691548768682, lng: 30.37647241762802 },
      text: "Елмер і Лео - вулиця Івана Франка, 58, Крюківщина, Київська область, 08136",
    },
    {
      type: "school",
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 50.37666719250724, lng: 30.379794282412114 },
      text: "SKILLS - вул. Жулянська, 1Г, Крюківщина, Київська область, 08136",
    },
    // pharmacy
    {
      type: "pharmacy",
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 50.380224084350544, lng: 30.379418904482662 },
      text: "Амбулаторія МЕДЕСАНА - вулиця Освіти, 15/31, Вишневе, Київська область, 08132",
    },
    {
      type: "pharmacy",
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 50.37556813621202, lng: 30.37700561174995 },
      text: 'Медичний Центр Родовід - ЖК "Євромісто, вул. Щастя, 1, Крюківщина, Київська область, 08119',
    },
    {
      type: "pharmacy",
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 50.379111179945546, lng: 30.380315919911705 },
      text: "Клініка PULSE - вулиця Київська, 37, Крюківщина, Київська область, 08132",
    },
    {
      type: "pharmacy",
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 50.37836972682036, lng: 30.378932492296094 },
      text: "Ami Clinic - вулиця Ярослава Мудрого, 51, Крюківщина, Київська область, 08136",
    },
    {
      type: "pharmacy",
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 50.379935551329865, lng: 30.38086677047554 },
      text: "Сімейна клініка DIMEDA - вулиця Освіти, 19, Крюківщина, Київська область, 08136",
    },
    // sport
    {
      type: "sport",
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 50.382996527383, lng: 30.385552278679942 },
      text: "GRAFIT GYM - вулиця Василя Стуса, 52, Крюківщина, Київська область, 08132",
    },
    {
      type: "sport",
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 50.37676901474812, lng: 30.381857457992268 },
      text: "Фітнес простір SOVA - вул. Жулянська, 1д, Крюківщина, Київська область, 08136",
    },
    {
      type: "sport",
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 50.377185218620426, lng: 30.379480045446137 },
      text: "Euro Gym - вул. Жулянська, 1А, Крюківщина, Київська область, 08136",
    },
    {
      type: "sport",
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 50.38273570256064, lng: 30.37966315119557 },
      text: "Олімп - вулиця Ватутіна, 21/25, Вишневе, Київська область, 08132",
    },
    // restaurant
    {
      type: "restaurant",
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 50.38372630676323, lng: 30.387968620898437 },
      text: `McDonald's - вулиця Богуна Івана, 2, Крюківщина, Київська область, 08132`,
    },
    {
      type: "restaurant",
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 50.383140396159554, lng: 30.386529921135768 },
      text: "Lviv Croissants - вулиця Єдності, 1а, Крюківщина, Київська область, 08160",
    },
    {
      type: "restaurant",
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 50.38623613144917, lng: 30.39074945706401 },
      text: "Ivory ресторан європейської кухні - вулиця Василя Стуса, 16, Крюківщина, Київська область, 08132",
    },
    {
      type: "restaurant",
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 50.385066477673156, lng: 30.389301701878377 },
      text: "Canary Vibe - вулиця Бакинська, 1, Крюківщина, Київська область",
    },
    {
      type: "restaurant",
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 50.382500250062336, lng: 30.38467850537398 },
      text: "Чічілакі Молодіжна - вулиця Молодіжна, 32, Вишневе, Київська область, 08132",
    },
    // pet
    {
      type: "pet",
      icon: { url: markersAdresses.pet, scaledSize: defaultMarkerSize },
      position: { lat: 50.38502518782579, lng: 30.38880397460217 },
      text: "Зоосвіт ветеринарний центр - вулиця Балукова, 1 Д, Крюківщина, Київська область, 08136",
    },
    {
      type: "pet",
      icon: { url: markersAdresses.pet, scaledSize: defaultMarkerSize },
      position: { lat: 50.38338560138441, lng: 30.388015777147277 },
      text: "Зоомагазин E-ZOO - вулиця Балукова, 1 Д, Крюківщина, Київська область, 08136",
    },
    {
      type: "pet",
      icon: { url: markersAdresses.pet, scaledSize: defaultMarkerSize },
      position: { lat: 50.38105773453715, lng: 30.382189922616433 },
      text: "Зоомаркет MasterZoo - вулиця Першотравнева, 26, Вишневе, Київська область, 08132",
    },
    {
      type: "pet",
      icon: { url: markersAdresses.pet, scaledSize: defaultMarkerSize },
      position: { lat: 50.380990375760014, lng: 30.382131318726486 },
      text: "ЗооБонус - вулиця Першотравнева, 26, Вишневе, Київська область, 08132",
    },
    {
      type: "pet",
      icon: { url: markersAdresses.pet, scaledSize: defaultMarkerSize },
      position: { lat: 50.37826825917881, lng: 30.380854725146886 },
      text: "V.O.G DOG SALON - вулиця Європейська, 2А, Крюківщина, Київська область, 08136",
    },
    // novaPoshta
    {
      type: "novaPoshta",
      icon: { url: markersAdresses.novaPoshta, scaledSize: defaultMarkerSize },
      position: { lat: 50.38182124742931, lng: 30.385299481358775 },
      text: "Нова Пошта №2 - вулиця Єдності, 2, Крюківщина, Київська область, 08121",
    },
    {
      type: "novaPoshta",
      icon: { url: markersAdresses.novaPoshta, scaledSize: defaultMarkerSize },
      position: { lat: 50.38028688685997, lng: 30.379856104916396 },
      text: "Нова Пошта. Поштове відділення №16 - Марії Приймаченко, 24 г, Вишневе, Київська область, 08133",
    },
    {
      type: "novaPoshta",
      icon: { url: markersAdresses.novaPoshta, scaledSize: defaultMarkerSize },
      position: { lat: 50.37826001818927, lng: 30.380902541945584 },
      text: "Нова Пошта. Поштове відділення №3 - вулиця Європейська, 2А, Крюківщина, Київська область, 08121",
    },
    // beautyParlor
    {
      type: "beautyParlor",
      icon: { url: markersAdresses.beautyParlor, scaledSize: defaultMarkerSize },
      position: { lat: 50.38128849652146, lng: 30.38314961673823 },
      text: "Beauty Hair - вулиця Освіти, 16, Вишневе, Київська область, 08132",
    },
    {
      type: "beautyParlor",
      icon: { url: markersAdresses.beautyParlor, scaledSize: defaultMarkerSize },
      position: { lat: 50.38109188889153, lng: 30.381254471477995 },
      text: "Health&Beauty studio - вулиця Першотравнева, 24 б, Вишневе, Київська область, 08132",
    },
    {
      type: "beautyParlor",
      icon: { url: markersAdresses.beautyParlor, scaledSize: defaultMarkerSize },
      position: { lat: 50.37978519848762, lng: 30.380554984439737 },
      text: "Viktoriya Gaponova Beauty Studio - вулиця Освіти, 19, Вишневе, Київська область, 08132",
    },
    {
      type: "beautyParlor",
      icon: { url: markersAdresses.beautyParlor, scaledSize: defaultMarkerSize },
      position: { lat: 50.38297162114273, lng: 30.38557355661104 },
      text: "Mr.BARBED - вулиця Василя Стуса, 52, Крюківщина, Київська область, 08132",
    },
    {
      type: "beautyParlor",
      icon: { url: markersAdresses.beautyParlor, scaledSize: defaultMarkerSize },
      position: { lat: 50.3820712471585, lng: 30.385372523670835 },
      text: "Barbershop Rufford Kryukovshchyna - вулиця Єдності, 2, Крюківщина, Київська область, 08136",
    },
    {
      type: "beautyParlor",
      icon: { url: markersAdresses.beautyParlor, scaledSize: defaultMarkerSize },
      position: { lat: 50.37958004556171, lng: 30.38097520462645 },
      text: "Барбершоп THE BOYS 2 - вулиця Київська, 37, Крюківщина, Київська область, 08136",
    },
    // ATM
    {
      type: "ATM",
      icon: { url: markersAdresses.ATM, scaledSize: defaultMarkerSize },
      position: { lat: 50.38090698029035, lng: 30.38210970099621 },
      text: "ПриватБанк банкомат - Вишневе, Київська область, 08132",
    },
    {
      type: "ATM",
      icon: { url: markersAdresses.ATM, scaledSize: defaultMarkerSize },
      position: { lat: 50.38171183512865, lng: 30.372382822407037 },
      text: "Банкомат Укргазбанк - вулиця Святоюріївська, 20, Вишневе, Київська область, 08133",
    },
    {
      type: "ATM",
      icon: { url: markersAdresses.ATM, scaledSize: defaultMarkerSize },
      position: { lat: 50.38254781003261, lng: 30.374967986879696 },
      text: "ПриватБанк банкомат - вулиця Першотравнева, 6-8, Вишневе, Київська область, 08132",
    },
    {
      type: "ATM",
      icon: { url: markersAdresses.ATM, scaledSize: defaultMarkerSize },
      position: { lat: 50.38197013236089, lng: 30.385466089980675 },
      text: "Акордбанк, Відділення №92 - вулиця Єдності, 2, Крюківщина, Київська область, 08121",
    },
    {
      type: "ATM",
      icon: { url: markersAdresses.ATM, scaledSize: defaultMarkerSize },
      position: { lat: 50.38089510644868, lng: 30.36583116164205 },
      text: `ПриватБанк - вулиця В'ячеслава Чорновола, 1, Вишневе, Київська область, 08132`,
    },
    // busStop
    {
      type: "busStop",
      icon: { url: markersAdresses.busStop, scaledSize: defaultMarkerSize },
      position: { lat: 50.38467852052184, lng: 30.38831373016249 },
      text: `99MQ+V8 Крюківщина, Київська область`,
    },
    {
      type: "busStop",
      icon: { url: markersAdresses.busStop, scaledSize: defaultMarkerSize },
      position: { lat: 50.382028175992836, lng: 30.384451061179025 },
      text: `99JM+RQ Вишневе, Київська область`,
    },
    {
      type: "busStop",
      icon: { url: markersAdresses.busStop, scaledSize: defaultMarkerSize },
      position: { lat: 50.38154189482182, lng: 30.384425210490377 },
      text: `99JM+JQ Крюківщина, Київська область`,
    },
    // park
    {
      type: "park",
      icon: { url: markersAdresses.park, scaledSize: defaultMarkerSize },
      position: { lat: 50.38622968348872, lng: 30.390748685728695 },
      text: `Квітковий сад Камелія - вул. В.Стуса, 16, вулиця Бакинська, 2, Крюківщина, Київська область, 08131`,
    },
    {
      type: "park",
      icon: { url: markersAdresses.park, scaledSize: defaultMarkerSize },
      position: { lat: 50.37107667176664, lng: 30.374869751556577 },
      text: `Парк імені Андрія Шевченка - вулиця Одеська, 26, Крюківщина, Київська область, 08136`,
    },
    {
      type: "park",
      icon: { url: markersAdresses.park, scaledSize: defaultMarkerSize },
      position: { lat: 50.3660123467584, lng: 30.35772124446065 },
      text: `Family park - вулиця Володимирська, 6, Крюківщина, Київська область, 08136`,
    },
    {
      type: "park",
      icon: { url: markersAdresses.park, scaledSize: defaultMarkerSize },
      position: { lat: 50.36300338786988, lng: 30.377993506447638 },
      text: `Характер парк - Крюківщина, Київська область, 08136`,
    },
    {
      type: "park",
      icon: { url: markersAdresses.park, scaledSize: defaultMarkerSize },
      position: { lat: 50.380163980927165, lng: 30.370145007273454 },
      text: `Парк "Південний" з фонтаном - Unnamed Road, Вишневе, Київська область, 08132`,
    },
  ];
  /* beautify preserve:end */
  const infowindow = new google.maps.InfoWindow({
    text: "",
    maxWidth: 300,
  });
  markersData.forEach((marker) => {
    const category = marker.type;
    const mapMarker = new google.maps.Marker({
      map,
      category,
      // animation: google.maps.Animation.DROP,
      zIndex: marker.zIndex || 1,
      icon: marker.icon,
      cursor: "pointer", // курсор при наведении на макркер жк
      position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
    });

    google.maps.event.addListener(mapMarker, "click", function () {
      infowindow.setContent(marker.text);
      infowindow.open(map, mapMarker);
      map.panTo(this.getPosition());
    });

    mapMarker.name = marker.type;
    gmarkers1.push(mapMarker);
  });
}

// window.addEventListener("load", () => {
// const legend = document.querySelector("[data-accordeon]");
// const legendTitle = document.querySelector(".infrastructure-markers__btn");
// const openedMarker = document.querySelector(".infrastructure-markers__btn svg");
// const markersHeight = getComputedStyle(
//   document.querySelector(".infrastructure-markers__ul")
// ).height;
// if (document.documentElement.clientWidth < 575) {
//     legend.classList.remove("opened");
//     gsap.timeline().fromTo(legend, { y: 0 }, { y: markersHeight });
//     gsap.timeline().fromTo(legendTitle, {y: 0}, {y: markersHeight});
// }

// legendTitle.addEventListener("click", () => {
//   const legendWrapper = document.querySelector('.infastructure-markers__wrapper');
//   legend.classList.toggle('opened');
//   openedMarker.classList.toggle('rotate');
//   if (legend.classList.contains("opened")) {
//     legendWrapper.classList.remove('closed');
//     gsap.timeline().fromTo(legend, { y: markersHeight }, { y: 0 });
//     gsap.timeline().fromTo(legendTitle, {y: markersHeight}, {y: 0});
//   } else {
//     legendWrapper.classList.add('closed')
//     gsap.timeline().fromTo(legend, { y: 0 }, { y: markersHeight });
//     gsap.timeline().fromTo(legendTitle, {y: 0}, {y: markersHeight});
//   }
// });
// });

function getMapTheme() {
  return [
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
  ];
}
