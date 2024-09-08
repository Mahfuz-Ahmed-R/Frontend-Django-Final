document.addEventListener("DOMContentLoaded", function() {
  const searchIcon = document.getElementById("search-icon");
  const searchBoxContent = document.getElementById("search-box-content");
  const searchButton = document.getElementById("search-button");

  searchButton.addEventListener("click", function() {
      if (searchBoxContent.classList.contains("d-none")) {
          searchBoxContent.classList.remove("d-none");
          searchIcon.classList.remove("fa-magnifying-glass");
          searchIcon.classList.add("fa-x");
      } else {
          searchBoxContent.classList.add("d-none");
          searchIcon.classList.remove("fa-x");
          searchIcon.classList.add("fa-magnifying-glass");
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


