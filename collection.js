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

fetch("https://django-final-n0lr.onrender.com/size/")
  .then((response) => response.json())
  .then((data) => {
    size(data), console.log(data);
  });

fetch("https://django-final-n0lr.onrender.com/color/")
  .then((response) => response.json())
  .then((data) => {
    color(data), console.log(data);
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
        value="${category.slug}"
        id="category-${category.id}"
      />
      <label class="form-check-label" for="category-${category.id}">${category.name}</label>
    `;
    main_div.appendChild(div);

    const checkbox = div.querySelector(".form-check-input");
    checkbox.addEventListener("change", (event) => {
      document
        .querySelectorAll("#category-container .form-check-input")
        .forEach((input) => {
          if (input !== event.target) input.checked = false;
        });
      applyFilters(); // Trigger filtering instantly when a checkbox is changed
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
        value="${subcategory.slug}"
        id="subcategory-${subcategory.id}"
      />
      <label class="form-check-label" for="subcategory-${subcategory.id}">${subcategory.name}</label>
    `;
    main_div.appendChild(div);

    const checkbox = div.querySelector(".form-check-input");
    checkbox.addEventListener("change", (event) => {
      document
        .querySelectorAll("#type-container .form-check-input")
        .forEach((input) => {
          if (input !== event.target) input.checked = false;
        });
      applyFilters(); // Trigger filtering instantly when a checkbox is changed
    });
  });
};

const color = (colors) => {
  const main_div = document.getElementById("color-container");
  colors.forEach((color) => {
    const div = document.createElement("div");
    div.classList.add("form-check");
    div.innerHTML = `
      <input
        class="form-check-input"
        type="checkbox"
        value="${color.slug}"
        id="color-${color.id}"
      />
      <label class="form-check-label" for="color-${color.id}">${color.name}</label>
    `;
    main_div.appendChild(div);

    const checkbox = div.querySelector(".form-check-input");
    checkbox.addEventListener("change", (event) => {
      document
        .querySelectorAll("#color-container .form-check-input")
        .forEach((input) => {
          if (input !== event.target) input.checked = false;
        });
      applyFilters(); // Trigger filtering instantly when a checkbox is changed
    });
  });
};

const size = (sizes) => {
  const main_div = document.getElementById("size-container");
  sizes.forEach((size) => {
    const div = document.createElement("div");
    div.classList.add("form-check");
    div.innerHTML = `
      <input
        class="form-check-input"
        type="checkbox"
        value="${size.slug}"
        id="size-${size.id}"
      />
      <label class="form-check-label" for="size-${size.id}">${size.name}</label>
    `;
    main_div.appendChild(div);

    const checkbox = div.querySelector(".form-check-input");
    checkbox.addEventListener("change", (event) => {
      document
        .querySelectorAll("#size-container .form-check-input")
        .forEach((input) => {
          if (input !== event.target) input.checked = false;
        });
      applyFilters(); // Trigger filtering instantly when a checkbox is changed
    });
  });
};

// Gather selected checkbox values and call postProducts
const applyFilters = () => {
  const category_slug =
    document.querySelector("#category-container .form-check-input:checked")
      ?.value || null;
  const subcategory_slug =
    document.querySelector("#type-container .form-check-input:checked")
      ?.value || null;
  const color_slug =
    document.querySelector("#color-container .form-check-input:checked")
      ?.value || null;
  const size_slug =
    document.querySelector("#size-container .form-check-input:checked")
      ?.value || null;

  // Call postProducts function with the selected values
  postProducts(category_slug, subcategory_slug, color_slug, size_slug);
};

const postProducts = async (
  category_slug,
  subcategory_slug,
  color_slug,
  size_slug
) => {
  const data = {
    category_slug,
    subcategory_slug,
    color_slug,
    size_slug,
  };

  try {
    const response = await fetch(
      "https://django-final-n0lr.onrender.com/category_view/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const products = await response.json();
      console.log(products);
      collection(products);
    } else {
      console.error("Failed to fetch products:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const sorting_by_price = () => {
  const selectElement = document.getElementById("sortOptions");
  const selectedValue = selectElement.value;

  fetch(
    `https://django-final-n0lr.onrender.com/product_by_price/${selectedValue}`
  )
    .then((response) => response.json())
    .then((data) => {
      collection(data);
      console.log(data);
    });
};

const collection = (products) => {
  document.getElementById("product-container").innerHTML = "";
  const main_div = document.getElementById("product-container");
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "col-sm-6 col-md-4 mb-4";
    div.style.margin = "5px";
    div.style.width = "18rem";
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
