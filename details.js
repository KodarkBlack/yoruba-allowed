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
      const getAdminName = document.getElementById("adminUserName");

      getAdminName.innerHTML = `${result.admin_name
        .charAt(0)
        .toUpperCase()}${result.admin_name.slice(1)}`;

      pageModal.style.display = "none";
    })
    .catch((error) => console.log("error", error));
}

getDashboardInformation();

//FUNCTION TO GET THE CURRENT CATEGORY URL CATEGORY VALUE TO USE ON THE DETAILS PAGE NAV
function getCategoryDetailsUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  let categoryName = urlParams.get("name");

  const displayCategoryName = document.createElement("span");
  displayCategoryName.innerHTML = categoryName;

  const adminCategoryname = document.getElementById("admin-categoryname");
  adminCategoryname.appendChild(displayCategoryName);
}

getCategoryDetailsUrl();

function createSubCategory(event) {
  event.preventDefault();

  const createSubCategoryBtn = document.getElementById("createSubCategoryBtn");
  createSubCategoryBtn.innerText = "Creating Sub-Category ...";

  const urlParams = new URLSearchParams(window.location.search);
  let categoryId = urlParams.get("id");

  const createSubCategoryName = document.getElementById(
    "createSubCategoryName"
  ).value;
  const createSubCategoryImage = document.getElementById(
    "createSubCategoryImage"
  ).files[0];

  if (createSubCategoryName === "" || createSubCategoryImage === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required!",
      confirmButtonColor: "#2D85DE",
    });
    createSubCategoryBtn.innerText = "Create Sub-Category";
  } else {
    const authToken = localStorage.getItem("adminObj");
    const tokenAcquired = JSON.parse(authToken);
    const token = tokenAcquired.token;

    const createSubCategoryHeaders = new Headers();
    createSubCategoryHeaders.append("Authorization", `Bearer ${token}`);

    const createSubCategoryData = new FormData();
    createSubCategoryData.append("name", createSubCategoryName);
    createSubCategoryData.append("image", createSubCategoryImage);
    createSubCategoryData.append("category_id", categoryId);

    const createSubCategoryRequest = {
      method: "POST",
      headers: createSubCategoryHeaders,
      body: createSubCategoryData,
    };

    const URL =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/create_subcategory";

    fetch(URL, createSubCategoryRequest)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: "Category Created Successfully!",
            confirmButtonColor: "#2D85DE",
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
          createSubCategoryBtn.innerText = "Create Sub-Category";
        } else {
          Swal.fire({
            icon: "error",
            text: "Sub-Category not created!",
            confirmButtonColor: "#2D85DE",
          });
          createSubCategoryBtn.innerText = "Create Sub-Category";
        }
      })
      .catch((error) => console.log("error", error));
  }
}

// FUNCTION TO GET SUBCATEGORY LIST
function subcategoryList() {
  const urlParams = new URLSearchParams(window.location.search);

  let subcategoryId = urlParams.get("id");
  console.log(subcategoryId);

  const subcategorylistContainer = document.getElementById("subcategorylist");

  const authToken = localStorage.getItem("adminObj");
  const tokenAcquired = JSON.parse(authToken);
  const token = tokenAcquired.token;

  const categoryListHeaders = new Headers();
  categoryListHeaders.append("Authorization", `Bearer ${token}`);

  categoryListRequest = {
    method: "GET",
    headers: categoryListHeaders,
  };

  let categoryList = [];

  const URL = `https://pluralcodesandbox.com/yorubalearning/api/admin/category_details/${subcategoryId}`;

  fetch(URL, categoryListRequest)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      result.map((item) => {
        categoryList += `
        <div class="subcategory_cards">
          <div class="subcategory_card">
          <a href="details.html?id=${item.id}&name=${item.name}"><img src=${item.image} alt="image" /></a>
          <div class="subcategory_card_btn">
            <p>${item.name}</p>
            <button onclick="updateSubcategoryModal(${item.id})">Update</button>
          </div>
          </div>
        </div>
        `;
        subcategorylistContainer.innerHTML = categoryList;
      });
    })
    .catch((error) => console.log("error", error));
}
subcategoryList();

// FUNCTION TO DISPLAY SUBCATEGORY MODAL
function updateSubcategoryModal(subcategoryId) {
  localStorage.setItem("id", subcategoryId);

  const subcategoryModal = document.getElementById("subcategory_modal");
  subcategoryModal.style.display = "block";

  const authToken = localStorage.getItem("adminObj");
  const tokenAcquired = JSON.parse(authToken);
  const token = tokenAcquired.token;

  const localStoredId = localStorage.getItem("id");

  const subcategoryModalHeaders = new Headers();
  subcategoryModalHeaders.append("Authorization", `Bearer ${token}`);

  const subcategoryModalRequest = {
    method: "GET",
    headers: subcategoryModalHeaders,
  };

  const URL = `https://pluralcodesandbox.com/yorubalearning/api/admin/update_subcategory=${localStoredId}`;

  fetch(URL, subcategoryModalRequest)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

//FUNCTION TO CLOSE THE MODAL ABOVE
window.onclick = function closeModalFromWindow(e) {
  const subcategory_modal = document.getElementById("subcategory_modal");
  if (e.target == subcategory_modal) {
    subcategory_modal.style.display = "none";
  }
};

//FUNCTION TO UPDATE SUB CATEGORY
function updateSubcategory(event) {
  event.preventDefault();

  const updateSubCategoryBtn = document.getElementById("updateSubCategoryBtn");
  updateSubCategoryBtn.innerText = "Updating...";

  const updateSubCategoryName = document.getElementById(
    "updateSubCategoryName"
  ).value;
  const updateSubCategoryImage = document.getElementById(
    "updateSubCategoryImage"
  ).files[0];

  const localStoredId = localStorage.getItem("id");

  if (updateSubCategoryName === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required",
      confirmButtonColor: "#2D85DE",
    });
    updateSubCategoryBtn.innerText = "Update Sub-Category";
  } else {
    const authToken = localStorage.getItem("adminObj");
    const tokenAcquired = JSON.parse(authToken);
    const token = tokenAcquired.token;

    const updateCategoryHeaders = new Headers();
    updateCategoryHeaders.append("Authorization", `Bearer ${token}`);

    const updateSubCategoryData = new FormData();
    updateSubCategoryData.append("name", updateSubCategoryName);
    updateSubCategoryData.append("image", updateSubCategoryImage);
    updateSubCategoryData.append("subcategory_id", localStoredId);

    const updateSubcategoryRequest = {
      method: "POST",
      headers: updateCategoryHeaders,
      body: updateSubCategoryData,
    };

    const URL =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/update_subcategory";

    fetch(URL, updateSubcategoryRequest)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: "Subcategory Updated Successfully",
            confirmButtonColor: "#2D85DE",
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
          updateSubCategoryBtn.innerText = "Update Sub-Category";
        } else {
          Swal.fire({
            icon: "info",
            text: "Update Unsuccessful!",
            confirmButtonColor: "#2D85DE",
          });
          updateSubCategoryBtn.innerText = "Update Sub-Category";
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
