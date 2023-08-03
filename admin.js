function addActiveClass() {
  const item = document.querySelector("a");
  item.classList.add("active");
}

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

//FUNCTION THAT GETS AND DISPLAYS DASHBOARD INFORMATION
function getDashboardInformation() {
  const pageModal = document.getElementById("pageModal");
  pageModal.style.display = "flex";

  const authToken = localStorage.getItem("adminObj");
  const tokenAcquired = JSON.parse(authToken);
  const token = tokenAcquired.token;

  const dashboardInfoHeader = new Headers();

  dashboardInfoHeader.append("Authorization", `Bearer ${token}`);

  const dashboardReq = {
    method: "GET",
    headers: dashboardInfoHeader,
  };

  const URL =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";

  fetch(URL, dashboardReq)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      const getAdminName = document.getElementById("adminUserName");
      const getAdminEmail = document.getElementById("adminUserEmail");

      getAdminName.innerHTML = `${result.admin_name
        .charAt(0)
        .toUpperCase()}${result.admin_name.slice(1)}`;
      getAdminEmail.innerHTML = `${result.admin_email
        .charAt(0)
        .toUpperCase()}${result.admin_email.slice(1)}`;

      pageModal.style.display = "none";
    })
    .catch((error) => console.log("error", error));
}

getDashboardInformation();

//FUNCTION TO UPDATE ADMIN-PROFILE NAME & EMAIL
function updateAdminProfile(event) {
  event.preventDefault();

  const adminName = document.getElementById("updateName").value;
  const adminEmail = document.getElementById("updateEmail").value;

  if (adminName === "" || adminEmail === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required!",
      confirmButtonColor: "#2D85DE",
    });
  } else {
    const pageModal = document.getElementById("pageModal");
    pageModal.style.display = "flex";

    const authToken = localStorage.getItem("adminObj");
    const tokenAcquired = JSON.parse(authToken);
    const token = tokenAcquired.token;

    const adminHeader = new Headers();
    adminHeader.append("Authorization", `Bearer ${token}`);

    const adminFormData = new FormData();
    adminFormData.append("name", adminName);
    adminFormData.append("email", adminEmail);

    const adminRequest = {
      method: "POST",
      headers: adminHeader,
      body: adminFormData,
    };

    const URL =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_update_profile";

    fetch(URL, adminRequest)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
        }
        setTimeout(() => {
          window.location.href = "index.html";
        }, 4000);
      })
      .catch((error) => console.log("error", error));
  }
}

//FUNCTION TO UPDATE ADMIN-PROFILE PASSWORD

function updateAdminPassword(event) {
  event.preventDefault();

  const currentEmail = document.getElementById("currentEmail").value;
  const updatePassword = document.getElementById("updatePassword").value;
  const confirmUpdatePassword = document.getElementById(
    "confirmUpdatePassword"
  ).value;

  if (
    currentEmail === "" ||
    updatePassword === "" ||
    confirmUpdatePassword === ""
  ) {
    Swal.fire({
      icon: "info",
      text: "All fields are required!",
      confirmButtonColor: "#2D85DE",
    });
  } else if (updatePassword !== confirmUpdatePassword) {
    Swal.fire({
      icon: "warning",
      text: "Passwords does not match!",
      confirmButtonColor: "#2D85DE",
    });
  } else {
    const pageModal = document.getElementById("pageModal");
    pageModal.style.display = "flex";

    const authToken = localStorage.getItem("adminObj");
    const tokenAcquired = JSON.parse(authToken);
    const token = tokenAcquired.token;

    const updateAdminPasswordHeaders = new Headers();
    updateAdminPasswordHeaders.append("Authorization", `Bearer ${token}`);

    const updateAdminPasswordFormData = new FormData();
    updateAdminPasswordFormData.append("email", currentEmail);
    updateAdminPasswordFormData.append("password", updatePassword);
    updateAdminPasswordFormData.append(
      "password_confirmation",
      confirmUpdatePassword
    );

    const updateAdminPasswordRequest = {
      method: "POST",
      headers: updateAdminPasswordHeaders,
      body: updateAdminPasswordFormData,
    };

    const URL =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_update_password";

    fetch(URL, updateAdminPasswordRequest)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
          setTimeout(() => {
            window.location.href = "index.html";
          }, 3000);
        }
      })
      .catch((error) => console.log("error", error));
  }
}

//FUNCTION TO LOGOUT OF THE ADMIN APP
function logout() {
  localStorage.removeItem("adminObj");
  Swal.fire({
    icon: "info",
    text: "Logging Out!",
    confirmButtonColor: "#2D85DE",
  });
  setTimeout(() => {
    location.href = "index.html";
  }, 4000);
}
