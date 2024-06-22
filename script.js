const apiUrl = 'https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json';

async function getMenu() {
  try {
    const response = await fetch(apiUrl);
    const menuItems = await response.json();
    displayMenu(menuItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
  }
}

function displayMenu(menuItems) {
  const menuDiv = document.getElementById('menu-items');
  menuDiv.innerHTML = ''; // Clear previous menu items
  menuItems.forEach(item => {
    const menuItemDiv = document.createElement('div');
    menuItemDiv.className = 'menu-item';
    menuItemDiv.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Price: $${item.price}</p>
    `;
    menuDiv.appendChild(menuItemDiv);
  });
}

function takeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const burgers = ['Cheeseburger', 'Veggie Burger', 'Chicken Burger', 'Bacon Burger', 'Double Cheeseburger'];
      const order = {
        items: [
          burgers[Math.floor(Math.random() * burgers.length)],
          burgers[Math.floor(Math.random() * burgers.length)],
          burgers[Math.floor(Math.random() * burgers.length)]
        ]
      };
      resolve(order);
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

function thankyouFnc() {
  alert('Thank you for eating with us today!');
}

function placeOrder() {
  takeOrder()
    .then(order => {
      console.log('Order:', order);
      return orderPrep();
    })
    .then(prepStatus => {
      console.log('Preparation Status:', prepStatus);
      return payOrder();
    })
    .then(paymentStatus => {
      console.log('Payment Status:', paymentStatus);
      if (paymentStatus.paid) {
        thankyouFnc();
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Load menu on page load
document.addEventListener('DOMContentLoaded', getMenu);
