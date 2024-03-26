const baseUrl = "http://localhost:5000";
let productUpdatedId;
async function deleteProduct(id) {
  const response = await fetch(`${baseUrl}/api/v1/deleteProduct/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  getProducts();
}

async function getProducts() {
  const response = await fetch(`${baseUrl}/api/v1/getAllProducts`);
  const products = await response.json();
  displayProducts(products);
}

function displayProducts(products) {
  const { data } = products;

  let cartona = "";
  data.forEach((element) => {
    cartona += `
      <tr>
          <td>${element.title}</td>
          <td>${element.price}</td>
          <td>${element.description}</td>
          <td>
              <button onclick="deleteProduct(${element.id})" class="btn btn-danger">Delete</button>
              <button onclick = "upDateProduct(${element.id})" class="btn btn-warning">UpDate</button>
          </td>
      </tr>
    `;
  });

  document.getElementById("tbody").innerHTML = cartona;
}

function collectData() {
  const product = {
    title: document.getElementById("productName").value,
    description: document.getElementById("productDesc").value,
    price: document.getElementById("productPrice").value,
  };

  return product;
}

function resetForm() {
  document.getElementById("productName").value = "";
  document.getElementById("productDesc").value = "";
  document.getElementById("productPrice").value = "";
}

async function addProduct() {
  const product = collectData();
  const response = await fetch(`${baseUrl}/api/v1/addProduct`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const data = await response.json();
  resetForm();
  getProducts();
}

async function upDateProduct(id) {
  document.getElementById("add").classList.replace("d-flex", "d-none");
  document.getElementById("update").classList.replace("d-none", "d-block");
  const upDatedProduct = await fetch(`${baseUrl}/api/v1/getProductById/${id}`);
  const response = await upDatedProduct.json();
  console.log(response);
  document.getElementById("productName").value = response.data[0].title;
  document.getElementById("productDesc").value = response.data[0].description;
  document.getElementById("productPrice").value = response.data[0].price;
  productUpdatedId = id;
}

async function callUpdateBtn() {
  const product = collectData();
  product.id = productUpdatedId;
  const putDate = await fetch(`${baseUrl}/api/v1/upDateProduct`, {
    method: "PUT",
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify(product)
  });

  const response = await putDate.json();
  resetForm();
  getProducts();
    document.getElementById("add").classList.replace("d-none", "d-flex");
    document.getElementById("update").classList.replace("d-block", "d-none");
}

function main() {
  getProducts();
  document.getElementById("add").addEventListener("click", addProduct);
  document.getElementById("update").addEventListener("click", callUpdateBtn);
}

main();
