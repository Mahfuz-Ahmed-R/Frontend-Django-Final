function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

const handleRegistration = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const first_name = getValue("firstName");
  const last_name = getValue("lastName");
  const email = getValue("email");
  const password = getValue("password");
  const password2 = getValue("confirmPassword");

  if (password !== password2) {
    alert("Passwords do not match");
    return;
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert(
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
    return;
  }

  fetch("https://django-final-n0lr.onrender.com/user/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      password2: password2, 
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errData) => {
          throw new Error(JSON.stringify(errData));
        });
      }
      return response.json();
    })
    .then((data) => {
      alert("Registration successful!!! Check your EMAIL for confarmation");
      window.location.href = "login.html";
    })
    .catch((error) => {
      const err = JSON.parse(error.message);
      alert(`Error: ${Object.values(err).flat().join(", ")}`);
    });
};

const handleLogin = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const password = getValue("password");

  fetch("https://django-final-n0lr.onrender.com/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: JSON.stringify({
       username,
       password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if(data.user_id === undefined){
        alert("User not found!!");
        window.location.href = "login.html";
      }
      alert("Login successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_id", data.user_id);    
      window.location.href = "index.html";
      if (data.error) {
        alert(data.error);
      }
    });
};

const handleLogout = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage");
    return;
  }

  fetch("https://django-final-n0lr.onrender.com/logout/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Server response:", data);
      if (response.ok) {
        alert('Logout succeful!!')
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        window.location.reload();
      } else {
        console.error("Logout failed:", data);
      }
    })
    .catch((err) => {
      console.error("Error during logout:", err);
    });
};

const getValue = (id) => {
  return document.getElementById(id).value;
};
