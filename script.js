const headerTitle = document.querySelector('.logo h1');
headerTitle.addEventListener('click', function () {
    const messages = [
        'Добро пожаловать в мир мотоциклов!', 
        'Приятного вождения!', 
        'Надеемся, что вы найдете то, что вам нужно!'
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    this.textContent = messages[randomIndex];
});
let logoClickCount = 0;
headerTitle.addEventListener('click', function (e) {
    logoClickCount++;
    console.log(`Логотип был нажат ${logoClickCount} раз`);
 if (logoClickCount === 5) {
        alert('Ты любишь мотики?');
        logoClickCount = 0;
    }
}, true);
const products = document.querySelectorAll('.product-card'); 
const productDetails = [
    [
        'Стант на альфе-это круто',
        'Стантить лучше всего с места',
        'Нужна стант рама'
    ],
    [
        'Стант на пите позволяет нам научиться ездить',
        'Стантить лучше всего со 2 передачи',
        'На нем легче всего вставать на 1 колесо'
    ],
    [
        'Квадроцикл -на нем надо ездить по дороге если хотите стантить',
        'Очень тяжело вставать если более 60кг',
        'На маленьких колесах легче всего вставать',
        'А если хотите ездить по грязи то у вас будут грязные колеса и не получится стантить'
    ],
    [
        'Эндуро -лучший вид мототехники по моему мнению',
        'Подрывает с любой передачи',
        'Нужен сток,но можно и переделать под стант'
    ],
    [
        'Спорт -на нем надо ездить по дороге если хотите стантить',
        'А иначе резина будет слизана',
        'Нужен сток,но можно и переделать под стант'
    ],
    [
        'Дрифт на альфе-это круто',
        'НО!!!Можно пофредить демфера',
        'В любом не сломанном виде'
    ],
    [
        'Дрифт на питбайке-это необычно для меня ',
        'Я пробовал но не получилось',
        'В любом не сломанном виде'
    ],
    [
        'Дрифт на эндуро-это не легко для меня ',
        'Я не пробобовал но думаю получилось бы',
        'В любом не сломанном виде'
    ],
    [
        'Дрифт на квадроцикле-это очень легко',
        'Дрифти хоть на песке,на снегу,и на грязи',
        'В любом не сломанном виде'
    ],
    [
        'Дриифт на спорте-это тяжело но возможно',
        'Для лучшего сцепления нужно на асфальте',
        'В любом не сломанном виде'
    ]
];

document.querySelectorAll('.product-card').forEach(function(card,i)//был index вместо i
{
    const info = card.querySelector('.product-info');
    const footer = card.querySelector('.product-footer');

    if (!info || !footer) return;

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'product-details';
    detailsDiv.style.display = 'none';
    detailsDiv.innerHTML = '<div>'+(productDetails[i] || productDetails[0]).map(item=> `<div>${item}</div>`).join('')+'</div>';
    info.insertBefore(detailsDiv, footer);

    const btn = document.createElement('button');
    btn.className = 'details-btn';
    btn.textContent = 'Подробнее';
    footer.insertBefore(btn, footer.querySelector('.add-to-cart-btn') );

    let isVisible = false;
    btn.addEventListener('click', function(){
        isVisible = !isVisible;//было isVissible
        if(isVisible){
            detailsDiv.style.display = 'block';
            btn.textContent = 'Скрыть';
            
        }else{
            detailsDiv.style.display = 'none';
            btn.textContent = 'Подробнее';
            
        }
    });
});

const scrrollTopBtn = document.createElement('button');
scrrollTopBtn.textContent = '↑';
scrrollTopBtn.style.cssText = 'position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px; border-radius: 50%; background-color: rgb(255, 0, 0); color: rgb(255, 255, 255); cursor: pointer; display: none; z-index: 1000; font-size: 24px; box-shadow: 0 4px 6px rgba(91, 91, 91, 0.3); transition: all 0.3s ;';
document.body.appendChild(scrrollTopBtn);
window.addEventListener('scroll', function(){
    scrrollTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
});

scrrollTopBtn.addEventListener('click', function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function filterProducts(filterType) {
    const productCards = document.querySelectorAll('.product-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active')); 
    filterButtons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(`'${filterType}'`)){
            btn.classList.add('active');
        }
    
    });
    productCards.forEach(function(card) {
        const priceElement = card.querySelector('.price');
        const priceText = priceElement.textContent;
        const price = parseInt(priceText.replace(/\D/g, ''));
        let showProduct = false;

        if (filterType=== "all"){
            showProduct = true;
        } else if (filterType === "low") {
            showProduct = price < 150000;
        } else if (filterType === "medium") {
            showProduct = price >= 150000 && price < 1000000;
        } else if (filterType === "high") {
            showProduct = price >= 4000000;
        }
        if (showProduct) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        } 
    });
}

let cart = [];

function addToCart(productName, price) {
   const item = cart.find(i => i.name === productName);
   if (item) {
       item.quantity++;
   } else {
       cart.push({ name: productName, price, quantity:  1 });
   }
   updateCart();
   alert(`${productName} добавлен в корзину за ${price} рублей`);
   
   
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
   
}

function changeQuantity(productName, delta) {
    const item = cart.find(i => i.name === productName);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productName);
    } else {
        updateCart();
    } 

}
function clearCart() {
    cart = [];
    updateCart();
    alert('Корзина очищена' ); //была запятая
}
function checkout() {
    if (!cart.length) {
        alert('Корзина пуста');
        return;
    }
    const totalQuantity = cart.reduce((sum, i) => sum + i.quantity, 0); 
    const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    alert(`Вы купили\nТоваров: ${totalQuantity}\nНа сумму: ${totalPrice} рублей`); 
    clearCart();
      
}
function updateCart() {
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');

    // Очищаем содержимое корзины перед перерисовкой
    itemsEl.innerHTML = '';

    // Если корзина пуста
    if (cart.length === 0) {
        // Создаём сообщение о пустой корзине заново
        itemsEl.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
        totalEl.style.display = 'none';
        countEl.textContent = '0';
        return;
    }

    // Если есть товары
    totalEl.style.display = 'block';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
            <div class="item-name">${item.name}</div>
            <div class="item-price">${item.price} руб.</div>
            <div class="item-quantity">
                <button onclick="changeQuantity('${item.name}', -1)" class="quantity-btn">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity('${item.name}', 1)" class="quantity-btn">+</button>
            </div>
            <div class="item-total">${itemTotal} руб.</div>
            <button onclick="removeFromCart('${item.name}')" class="remove-btn">✖</button>
        `;
        itemsEl.appendChild(row);
    });

    document.getElementById('total-price').textContent = total;
    countEl.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}
updateCart();

// Привязка кнопок "В корзину"
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.product-card');
        if (!card) return;
        const name = card.querySelector('h2')?.textContent; // теперь h3
        const priceEl = card.querySelector('.price');
        if (!name || !priceEl) return;
        const price = parseInt(priceEl.textContent.replace(/\D/g, ''));
        addToCart(name, price);
    });
});

function setTime(theme) {
    console.log('setTime', theme);
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        const btn = document.getElementById('theme-switcher');
        if (btn) btn.textContent = '🌜';
    } else {
        document.body.classList.remove('dark-theme');
        const btn = document.getElementById('theme-switcher');
        if (btn) btn.textContent = '🌞';
    }
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
console.log('savedTheme', savedTheme);
if (savedTheme === 'light') {
    setTime('light');
} else {
    setTime('dark');
}

const themeSwitcher = document.getElementById('theme-switcher');
if (themeSwitcher) {
    themeSwitcher.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        setTime(isDark ? 'light' : 'dark');
    });
}