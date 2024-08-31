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
    const authLinks = document.getElementById("auth-links");
    const logoutLink = document.getElementById("logout-link");

    const userId = localStorage.getItem("user_id");

    if (userId) {
      authLinks.style.display = "none";
      logoutLink.style.display = "block";
    } else {
      authLinks.style.display = "block";
      logoutLink.style.display = "none";
    }
  });

