const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let dataInventory = [];
let allReviews = [];
let allSize = [];

fetch(`https://django-final-n0lr.onrender.com/product/${id}/`)
  .then(response => response.json())
  .then(productData => {
    console.log('Product Data:', productData);
    fetch(`https://django-final-n0lr.onrender.com/get_inventory/${id}/`)
      .then(response => response.json())
      .then(inventoryData => {
        // dataInventory = inventoryData.filter(item => item.product === parseInt(id));
        console.log('Inventory Data:', inventoryData);
        detailed_product(inventoryData, productData);
      })
      .catch(error => console.error('Error fetching inventory:', error));
  })
  .catch(error => console.error('Error fetching product:', error));



fetch(`https://django-final-n0lr.onrender.com/review/`)
  .then((response) => response.json())
  .then((reviewData) => {
    reviewData.forEach((item) => {
      if (item.product === parseInt(id)) {
        allReviews.push(item);
      }
    })
    show_review(allReviews);
    console.log(allReviews);
  });


const show_review = (reviews) => {
  const reviews_div = document.getElementById("reviews");

  reviews.forEach((review) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card mb-4">
        <div class="card-body">
            <h5 class="card-title">${review.customer_name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">★${review.rating}</h6>
            <p class="card-text">${review.review}</p>
            <p class="text-muted">Reviewed on: ${review.date_added}</p>
        </div>
    </div>
    `;
    reviews_div.appendChild(div);
  });
};

const detailed_product = (inventory, product) => {
  const container = document.getElementById("extra-details-container");
  const container_img = document.getElementById("details-container");
  const product_part = document.getElementById("product-part");
  const inventory_part = document.getElementById("inventory-part");
  const image_part = document.getElementById("image-part");
  const main_image = document.getElementById("main-image");
  const title = document.getElementsByTagName('title')
  title[0].innerHTML = product.name;

  image_part.innerHTML = `
<div class="product-images">
    <img src="${product.image_2}" alt="Thumbnail 1" class="thumbnail" onclick="swapImage(this)">
    <img src="${product.image_3}" alt="Thumbnail 2" class="thumbnail" onclick="swapImage(this)">
</div>
`;
  main_image.innerHTML = `
<img src="${product.image_1}" alt="Main Product Image" class="main-image" id="mainImage">
`;

  product_part.innerHTML = `
<h2 id="product-id" data-id="${product.id}">${product.name}</h2>
<div class="star-rating">
    ★${product.rating}
</div>
<h3 class="mt-3">৳${product.price}</h3>
<p>
    ${product.description}
</p>
`;

  let sizeButtonsHTML = "";
  inventory.forEach((size) => {
    sizeButtonsHTML += `<button class="size-button" data-id="${size.id}" onclick="selectSize(this)">${size.size}</button>`;
  });

  inventory_part.innerHTML = `
<h5 class="mt-2">Select Size</h5>
<div id="sizeButtons">
    ${sizeButtonsHTML}
</div>
<div class="d-flex align-items-center mt-4 mb-4">
    <div class="quantity-control">
        <button class="quantity-btn" onclick="quantity(this)">-</button>
        <span class="quantity-display" id="quantity">1</span>
        <button class="quantity-btn" onclick="quantity(this)">+</button>
    </div>
    <button id="add-to-cart" class="btn btn-dark add-to-cart" onclick="adding_product(event)">ADD TO CART</button>
    <button id="add-to-wishlist" class="btn btn-success add-to-cart" onclick="adding_product_wishlist(event)">ADD TO WISHLIST</button>
</div>
`;
  container_img.appendChild(image_part);
  container_img.appendChild(main_image);
  container.appendChild(product_part);
  container.appendChild(inventory_part);
};

function swapImage(clickedImage) {
  const mainImage = document.getElementById("mainImage");
  const mainImageSrc = mainImage.src;

  mainImage.src = clickedImage.src;
  clickedImage.src = mainImageSrc;

  mainImage.src = mainImage.src.replace("60x60", "400x400");
  clickedImage.src = clickedImage.src.replace("400x400", "60x60");
}

function selectSize(clickedButton) {
  document.querySelectorAll(".size-button").forEach((button) => {
    button.classList.remove("selected");
  });

  clickedButton.classList.add("selected");

  let selectedSize = clickedButton.textContent;
}

function quantity(clickedButton) {
  let quantity = document.querySelector(".quantity-display");
  if (clickedButton.textContent === "+") {
    quantity.textContent = parseInt(quantity.textContent) + 1;
  } else if (clickedButton.textContent === "-" && quantity.textContent > 1) {
    quantity.textContent = parseInt(quantity.textContent) - 1;
  }
}

function adding_product(event) {
  event.preventDefault();
  const user_id = localStorage.getItem('user_id');
  if(!user_id){
    alert("Please login to add to wishlist");
    window.location.href = "login.html"; 
  }

  fetch(`https://django-final-n0lr.onrender.com/customer/${user_id}/`)
    .then((response) => response.json())
    .then((data) => {
      const customer_id = data.id;
      const productElement = document.getElementById("product-id");
      const productId = productElement.getAttribute("data-id");
      const quantity = document.getElementById("quantity").textContent;
      const sizeElement = document.querySelector(".size-button.selected");
      const size = sizeElement ? sizeElement.getAttribute("data-id") : null;

      if(size == null){
        alert("Please select a size");
        return;
      }

      fetch("https://django-final-n0lr.onrender.com/order-item/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: productId,
          customer: customer_id,
          size: parseInt(size),
          quantity: quantity,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Added to cart");
          location.reload();
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching customer:", error);
    });
}

function adding_product_wishlist(event) {
  event.preventDefault();
  const user_id = localStorage.getItem('user_id');
  if(!user_id){
    alert("Please login to add to wishlist");
    window.location.href = "login.html"; 
  }

  fetch(`https://django-final-n0lr.onrender.com/customer/${user_id}/`)
    .then((response) => response.json())
    .then((data) => {
      const customer_id = data.id;
      const productElement = document.getElementById("product-id");
      const productId = productElement.getAttribute("data-id");
      const quantity = document.getElementById("quantity").textContent;
      const sizeElement = document.querySelector(".size-button.selected");
      const sizeId = sizeElement ? sizeElement.getAttribute("data-id") : null;

      if(sizeId == null){
        alert("Please select a size");
        return;
      }

      fetch("https://django-final-n0lr.onrender.com/wishlist/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: productId,
          customer: customer_id,
          size: parseInt(sizeId),
          quantity: quantity,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Added to wishlist");
         location.reload();
        })
        .catch((error) => {
          console.error("Error adding to wishlist:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching customer:", error);
    });
}

