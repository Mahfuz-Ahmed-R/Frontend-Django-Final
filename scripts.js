document.addEventListener("DOMContentLoaded", function() {
  const searchIcon = document.getElementById("search-icon");
  const searchBoxContent = document.getElementById("search-box-content");

  searchIcon.addEventListener("click", function() {
      if (searchBoxContent.classList.contains("d-none")) {
          searchBoxContent.classList.remove("d-none");
          searchIcon.innerHTML = '<i class="fa-solid fa-x" style="font-size: 1.5rem;"></i>'; // Change icon to "X"
      } else {
          searchBoxContent.classList.add("d-none");
          searchIcon.innerHTML = '<i class="fa-solid fa-search" style="font-size: 1.5rem;"></i>'; // Change icon to "search"
      }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const userId = localStorage.getItem("user_id");

  const authLinks = document.getElementById("auth-links");
  const dropdown = document.getElementById("dropdown-box");
  const cart = document.getElementById("cart-icon");

  if (userId) {
    authLinks.style.display = "none";
    dropdown.style.display = "block";
    cart.style.display = "block";

  } else {
    authLinks.style.display = "block";
    dropdown.style.display = "none";
    cart.style.display = "none";
  }
});


