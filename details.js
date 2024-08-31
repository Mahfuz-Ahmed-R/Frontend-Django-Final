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

  // Swap the clicked thumbnail with the main image
  mainImage.src = clickedImage.src;
  clickedImage.src = mainImageSrc;

  // Update the sizes of the images
  mainImage.src = mainImage.src.replace("60x60", "400x400");
  clickedImage.src = clickedImage.src.replace("400x400", "60x60");
}

function selectSize(clickedButton) {
  // Remove 'selected' class from all buttons
  document.querySelectorAll(".size-button").forEach((button) => {
    button.classList.remove("selected");
  });

  // Add 'selected' class to clicked button
  clickedButton.classList.add("selected");

  // You can store the selected size in a variable if needed
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
  let customer_id;
  const user_id = localStorage.getItem('user_id');

  fetch(`https://django-final-n0lr.onrender.com/customer/${user_id}/`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Customer Data:', data.id);
      customer_id = data.id;

      const productElement = document.getElementById("product-id");
      const productId = productElement.getAttribute("data-id");
      const quantity = document.getElementById("quantity").textContent;
      const sizeElement = document.querySelector(".size-button.selected");
      const sizeId = sizeElement ? sizeElement.getAttribute("data-id") : null;

      // Ensure all values are captured correctly
      console.log("Product ID:", productId);
      console.log("Quantity:", quantity);
      console.log("Size ID:", sizeId);
      console.log("cs ID:", customer_id);
      console.log("Size ID:", sizeElement);

      fetch("https://django-final-n0lr.onrender.com/order-item/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: productId,
          customer: customer_id,
          size: sizeId,
          quantity: quantity,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching customer:", error);
    });
}

function adding_product_wishlist(event) {
  event.preventDefault();
  let customer_id;
  const user_id = localStorage.getItem('user_id');

  fetch(`https://django-final-n0lr.onrender.com/customer/${user_id}/`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Customer Data:', data.id);
      customer_id = data.id;

      const productElement = document.getElementById("product-id");
      const productId = productElement.getAttribute("data-id");
      const quantity = document.getElementById("quantity").textContent;
      const sizeElement = document.querySelector(".size-button.selected");
      const sizeId = sizeElement ? sizeElement.getAttribute("data-id") : null;

      // Ensure all values are captured correctly
      console.log("Product ID:", productId);
      console.log("Quantity:", quantity);
      console.log("Size ID:", sizeId);
      console.log("cs ID:", customer_id);
      console.log("Size ID:", sizeElement);

      fetch("https://django-final-n0lr.onrender.com/wishlist/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: productId,
          customer: customer_id,
          size: sizeId,
          quantity: quantity,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching customer:", error);
    });
}
document.addEventListener("DOMContentLoaded", function() {
  // Check if user_id is in localStorage
  const userId = localStorage.getItem("user_id");

  // Get the Add to Cart and Add to Wishlist buttons
  const addToCartButton = document.getElementById("add-to-cart");
  const addToWishlistButton = document.getElementById("add-to-wishlist");

  // Function to handle the action if the user is not logged in
  const redirectToLogin = () => {
    alert("Please log in to perform this action.");
    window.location.href = "login.html"; // Redirect to the login page
  };

  if (!userId) {
    // If user is not logged in, prevent adding to cart/wishlist
    addToCartButton.addEventListener("click", redirectToLogin);
    addToWishlistButton.addEventListener("click", redirectToLogin);
  } else {
    // User is logged in, allow adding to cart/wishlist
    addToCartButton.addEventListener("click", function() {
      // Your logic for adding to cart
      console.log("Added to cart!");
    });

    addToWishlistButton.addEventListener("click", function() {
      // Your logic for adding to wishlist
      console.log("Added to wishlist!");
    });
  }
});


// getID(id);
