document.addEventListener("DOMContentLoaded", function() {
    const searchIcon = document.getElementById("search-icon");
    const searchBox = document.getElementById("search-box");

    searchIcon.addEventListener("click", function() {
        if (searchBox.classList.contains("d-none")) {
            searchBox.classList.remove("d-none");
            searchIcon.innerHTML = '<i class="fa-solid fa-x" style="font-size: 1.5rem;"></i>'; // Change icon to "X"
        } else {
            searchBox.classList.add("d-none");
            searchIcon.innerHTML = '<i class="fa-solid fa-search" style="font-size: 1.5rem;"></i>'; // Change icon to "search"
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const userId = localStorage.getItem("user_id");

  const authLinks = document.getElementById("auth-links");
  const profileLink = document.getElementById("profile-link");
  const ordersLink = document.getElementById("orders-link");
  const wishlistLink = document.getElementById("wishlist-link");
  const logoutLink = document.getElementById("logout-link");

  if (userId) {
    authLinks.style.display = "none";
    profileLink.style.display = "block";
    ordersLink.style.display = "block";
    wishlistLink.style.display = "block";
    logoutLink.style.display = "block";
  } else {
    authLinks.style.display = "block";
    profileLink.style.display = "none";
    ordersLink.style.display = "none";
    wishlistLink.style.display = "none";
    logoutLink.style.display = "none";
  }
});


