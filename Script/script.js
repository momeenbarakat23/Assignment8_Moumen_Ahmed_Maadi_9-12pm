var cart = document.querySelector(".cart");

let searchInput = document.getElementById("searchInput");
let itemscontaner = document.getElementById("itemscontaner");
let AddItemBTN = document.getElementById("AddItemBTN");
let lightbox = document.querySelector(".lightbox");
let closeicon = document.getElementById("close");

let nameOfitem = document.getElementById("name");
let salary = document.getElementById("salary");
let discount = document.getElementById("discount");
let image = document.getElementById("image");
let myAddbtn = document.querySelector(".myAddbtn");
let myUpdatebtn = document.querySelector(".myUpdatebtn");

let spanName = document.getElementById("spanName");
let spansalary = document.getElementById("spansalary");
let spandisc = document.getElementById("spandiscount");
var currentIndex = 0;
var listOfProduct = [];

if (localStorage.getItem("ListOfItems") !== null) {
  listOfProduct = JSON.parse(localStorage.getItem("ListOfItems"));
  for (let i = 0; i < listOfProduct.length; i++) {
    Read(i);
  }
}









/*search*/
function searchData() {
  var term = searchInput.value; 
  var content = "";

  for (var i = 0; i < listOfProduct.length; i++) {
    if (listOfProduct[i].name.toLowerCase().includes(term.toLowerCase())) {
      content += ` <div class="products col-md-6 ">
                                <div class="product_card ">
                                    <div class="icons">
                                        <span onclick="setUpdateInfo(${i})"><i class="fa-solid fa-pen-to-square"></i></span>
                                        <span><i class="fa-solid fa-heart"></i></span>
                                        <span onclick="deleteitem(${i})"><i class="fa-solid fa-trash" id="delete"></i></span>
                                    </div>
                                    <div class="img_product">
                                        <img src="${listOfProduct[i].img}" alt="product-1" />
                                        <img class="img_hover" src="img/product/product1.jpg" alt="Alternate Text" />
                    
                                    </div>
                                    <h3 class="name_product"><a href="">${listOfProduct[i].name}</a></h3>
                    
                                    <div class="star">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </div>
                    
                                    <div class="price">
                                        <p><span>${listOfProduct[i].dis}$</span></p>
                                        <span class="old_price">${listOfProduct[i].sal}$</span>
                                    </div>
                                </div>
                            </div>`;
    }
  }

  itemscontaner.innerHTML = content; 
}


/*CRUD*/
function AddItem() {
  if (validationName() && validationPrice() && validationdiscount()) {
    let product = {
      name: nameOfitem.value,
      sal: salary.value,
      dis: discount.value,
      img: image.files[0]
        ? `img/Img/product/${image.files[0]?.name}`
        : "img/Img/product/product-1.jpg",
    };
    listOfProduct.push(product);
    var index = listOfProduct.length - 1;
    Read(index);
    localStorage.setItem("ListOfItems", JSON.stringify(listOfProduct));
    clearForm();
  }
}

function setUpdateInfo(index) {
  currentIndex = index;

  nameOfitem.value = listOfProduct[index].name;
  salary.value = listOfProduct[index].sal;
  discount.value = listOfProduct[index].dis;
  lightbox.classList.remove("d-none");
  myAddbtn.classList.add("d-none");
  myUpdatebtn.classList.remove("d-none");
}

function updateData() {
  if (validationName() && validationPrice() && validationdiscount()) {
    let product = {
      name: nameOfitem.value,
      sal: salary.value,
      dis: discount.value,
      img: image.files[0]
        ? `img/Img/product/${image.files[0]?.name}`
        : "img/Img/product/product-1.jpg",
    };

    listOfProduct.splice(currentIndex, 1, product);

    localStorage.setItem("ListOfItems", JSON.stringify(listOfProduct));

    window.location.reload();
  }
}

function Read(i) {
  let content = ` <div class="products col-md-6 ">
                                <div class="product_card ">
                                    <div class="icons">
                                        <span onclick="setUpdateInfo(${i})"><i class="fa-solid fa-pen-to-square"></i></span>
                                        <span><i class="fa-solid fa-heart"></i></span>
                                        <span onclick="deleteitem(${i})"><i class="fa-solid fa-trash" id="delete"></i></span>
                                    </div>
                                    <div class="img_product">
                                        <img src="${listOfProduct[i].img}" alt="product-1" />
                                        <img class="img_hover" src="img/product/product1.jpg" alt="Alternate Text" />
                    
                                    </div>
                                    <h3 class="name_product"><a href="">${listOfProduct[i].name}</a></h3>
                    
                                    <div class="star">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </div>
                    
                                    <div class="price">
                                        <p><span>${listOfProduct[i].dis}$</span></p>
                                        <span class="old_price">${listOfProduct[i].sal}$</span>
                                    </div>
                                </div>
                            </div>`;
  itemscontaner.innerHTML += content;
}

function clearForm() {
  nameOfitem.value = "";
  salary.value = "";
  discount.value = "";
  image.value = "";
}
function deleteitem(i) {
  listOfProduct.splice(i, 1);
  localStorage.setItem("ListOfItems", JSON.stringify(listOfProduct));
  window.location.reload();
}

function validationName() {
  var regex = /^[a-zA-Z][a-zA-Z0-9 _-]{2,19}$/;
  let text = nameOfitem.value;

  if (validation(regex, text, nameOfitem, spanName)) {
    return true;
  }
  return false;
}
function validationPrice() {
  var regex = /^\d{1,10}(\.\d{1,2})?$/;
  let text = salary.value;
  if (validation(regex, text, salary, spansalary)) {
    return true;
  }
  return false;
}
function validationdiscount() {
  var regex = /^\d{1,10}(\.\d{1,2})?$/;
  let text = discount.value;
  if (validation(regex, text, discount, spandisc)) {
    return true;
  }
  return false;
}

function validation(r, t, n, span) {
  if (r.test(t)) {
    n.classList.add("is-valid");
    n.classList.remove("is-invalid");
    span.classList.add("d-none");
    return true;
  } else {
    n.classList.add("is-invalid");
    n.classList.remove("is-valid");
    span.classList.remove("d-none");
    return false;
  }
}

function openCart() {
  cart.classList.add("active");
}
function closeCart() {
  cart.classList.remove("active");
}



myUpdatebtn.addEventListener("click", updateData);
myAddbtn.addEventListener("click", AddItem);
AddItemBTN.addEventListener("click", function () {
  lightbox.classList.remove("d-none");
  myAddbtn.classList.remove("d-none");
  myUpdatebtn.classList.add("d-none");
});
closeicon.addEventListener("click", function () {
  lightbox.classList.add("d-none");
});
deletei.addEventListener("click", function (e) {
  deleteitem(e.target.index);
});
