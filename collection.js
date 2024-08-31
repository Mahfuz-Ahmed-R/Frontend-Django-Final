fetch("https://django-final-n0lr.onrender.com/product/")
  .then((response) => response.json())
  .then((data) => {
    collection(data);
    console.log(data);
  });

fetch("https://django-final-n0lr.onrender.com/category/")
  .then((response) => response.json())
  .then((data) => {
    category(data), console.log(data);
  });

fetch("https://django-final-n0lr.onrender.com/sub-category/")
  .then((response) => response.json())
  .then((data) => {
    sub_category(data), console.log(data);
  });

// Fetch all products initially (optional, depending on your use case)

const category = (categories) => {
  const main_div = document.getElementById("category-container");
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.classList.add("form-check");
    div.innerHTML = `
      <input
        class="form-check-input"
        type="checkbox"
        value="${category.id}"
        id="category-${category.id}"
      />
      <label class="form-check-label" for="category-${category.id}">${category.name}</label>
    `;
    main_div.appendChild(div);

    const checkbox = div.querySelector(".form-check-input");
    checkbox.addEventListener("change", (event) => {
      // Uncheck all other checkboxes
      document
        .querySelectorAll("#category-container .form-check-input")
        .forEach((input) => {
          if (input !== event.target) {
            input.checked = false;
          }
        });

      if (event.target.checked) {
        // Fetch products for the selected category
        fetch(`https://django-final-n0lr.onrender.com/category_view/${category.slug}/`)
          .then((response) => response.json())
          .then((data) => {
            // Clear the existing products before appending new ones
            document.getElementById("product-container").innerHTML = "";
            console.log(data);
            collection(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        // Optionally, clear products if no category is selected
        document.getElementById("product-container").innerHTML = "";
      }
    });
  });
};

const sub_category = (subcategories) => {
  const main_div = document.getElementById("type-container");
  subcategories.forEach((subcategory) => {
    const div = document.createElement("div");
    div.classList.add("form-check");
    div.innerHTML = `
      <input
        class="form-check-input"
        type="checkbox"
        value="${subcategory.id}"
        id="subcategory-${subcategory.id}"
      />
      <label class="form-check-label" for="subcategory-${subcategory.id}">${subcategory.name}</label>
    `;
    main_div.appendChild(div);

    const checkbox = div.querySelector(".form-check-input");
    checkbox.addEventListener("change", (event) => {
      // Uncheck all other checkboxes in subcategories
      document
        .querySelectorAll("#type-container .form-check-input")
        .forEach((input) => {
          if (input !== event.target) {
            input.checked = false;
          }
        });

      if (event.target.checked) {
        // Fetch products for the selected subcategory
        fetch(`https://django-final-n0lr.onrender.com/category_view/${category.slug}/${subcategory.slug}/`)
          .then((response) => response.json())
          .then((data) => {
            // Clear the existing products before appending new ones
            document.getElementById("product-container").innerHTML = "";
            console.log(data)
            collection(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        // Optionally, clear products if no subcategory is selected
        document.getElementById("product-container").innerHTML = "";
      }
    });
  });
};

const collection = (products) => {
  const main_div = document.getElementById("product-container");
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "col-sm-6 col-md-4 mb-4";
    div.innerHTML = `
  <div class="card">
  <a href="prodcutDetailsPage.html?id=${product.id}" class="text-decoration-none">
            <img src="${product.image_1}" class="card-img-top" alt="Product Image">
            <div class="card-body">
            <h6 class="card-title">${product.name}</h6>
            <p class="card-text">৳${product.price}</p>
            
            </div>
            </a>
        </div>
        `;
    main_div.appendChild(div);
  });
};
