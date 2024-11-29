let imgsContainer = document.getElementById("imgs-container");
let imgsArr = Array.from(document.querySelectorAll("img"));
let indicators = document.querySelector(".indicators");
let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");
let currentImg = 1;

let paginationList = document.createElement("ul");
paginationList.setAttribute("id", "paginationList");
for (let listItem = 1; listItem <= imgsArr.length; listItem++) {
  let paginationListItems = document.createElement("li");
  paginationListItems.setAttribute("listIndex", listItem);
  paginationListItems.appendChild(document.createTextNode(listItem));
  paginationList.appendChild(paginationListItems);
}
indicators.appendChild(paginationList);

let paginationUl = document.getElementById("paginationList");
let paginationLi = Array.from(document.querySelectorAll("li"));

function checkCurrent() {
  removeActive();
  imgsArr[currentImg - 1].classList.add("active");
  paginationLi[currentImg - 1].classList.add("active");
  addDisabled();
}
checkCurrent();
function removeActive() {
  imgsArr.forEach(function (img) {
    img.classList.remove("active");
  });
  paginationLi.forEach(function (li) {
    li.classList.remove("active");
  });
}
function addDisabled() {
  if (currentImg == 1) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }
  if (currentImg == 4) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }
}
const prevSlide = () => {
  currentImg -= 1;
  checkCurrent();
};
const nextSlide = () => {
  currentImg += 1;
  checkCurrent();
};
prevBtn.addEventListener("click", () => {
  if (prevBtn.classList.contains("disabled")) {
    return false;
  } else {
    prevSlide();
  }
});
nextBtn.addEventListener("click", () => {
  if (nextBtn.classList.contains("disabled")) {
    return false;
  } else {
    nextSlide();
  }
});

(function paginate() {
  for (let i = 0; i < paginationLi.length; i++) {
    paginationLi[i].addEventListener("click", () => {
      currentImg = parseInt(paginationLi[i].getAttribute("listIndex"));
      checkCurrent();
    });
  }
})();
function autoNavigate() {
  if (currentImg < 4) {
    nextSlide();
  } else if (currentImg == 4) {
    currentImg = 1;
    checkCurrent();
  }
  setTimeout(autoNavigate, 3000);
}
// autoNavigate();
// imgsContainer.addEventListener("mouseout", autoNavigate());

// handle navigate on touch screens
let start = 0;
let end = 0;
let distance = 0;
imgsContainer.addEventListener("touchstart", (event) => {
  start = event.touches[0].clientX;
});
imgsContainer.addEventListener("touchend", (event) => {
  end = event.changedTouches[0].clientX;
  distance = end - start;

  if (distance > 0) {
    if (currentImg !== 1) {
      prevSlide();
    }
  } else if (distance < 0) {
    if (currentImg !== 4) {
      nextSlide();
    }
  }
});
