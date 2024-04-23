const myForm = document.getElementById("myForm");
const currentValue = document.getElementById("addItem");
const itemList = document.getElementById("itemList");
const submitButton = document.getElementById("submitButton");

let listData = [];
let currentModify = null;
let listCount = 0;


myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const item = currentValue.value.trim();
  if(item !== '') {
    console.log(submitButton.value);
    if(submitButton.value == "新增") {
      addItem(item);
      console.log(listData);
    }

    else {
      modifyItem(item);
    }
    currentValue.value = "";
  }
})


const modifyItem = (item) => {
  for(let i of listData) {
    if(i.id == currentModify) {
        i.text = item;
    }
  }
  submitButton.value = "新增"
  submitButton.innerText = "新增"
  generateList();
  return;
}

const addItem = (itemName) => {
  const newItem = {text: itemName, id: listCount};
  listCount++;
  listData.push(newItem);
  generateList();
}

const buildHTML = (item) => {
  const newLi = `
    <li id="${item.id}">
      <p>${item.text}</p>
      <i class="fi fi-rr-edit"></i>
      <i class="fi fi-sr-trash-xmark"></i>
    </li>
    `;
  return newLi;
}

const generateList = () => {
  let listHTML = '';
  for(let i of listData) {
    listHTML += buildHTML(i);
  }

  itemList.innerHTML = listHTML;

  let currentList = itemList.getElementsByTagName("li");
  Array.from(currentList).forEach(element => {
    const mod = element.querySelector(".fi-rr-edit");
    const del = element.querySelector(".fi-sr-trash-xmark");
    mod.addEventListener("click", () => {
      submitButton.value = "修改";
      submitButton.innerText = "修改"
      currentModify = element.id;
    });

    del.addEventListener("click", () => {
      remove(element.id);
    });
  })
}

const remove = (removeID) => {
  console.log(removeID);
  console.log(listData);
  listData = listData.filter(item => item.id !== parseInt(removeID));
  generateList();
}




