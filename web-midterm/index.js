const masonry = document.querySelector(".masonry");
const imgUrls = ["./imgs/photo-1.jpg", "./imgs/photo-2.jpg", "./imgs/photo-3.jpg", "./imgs/photo-4.jpg", "./imgs/photo-5.jpg", "./imgs/photo-8.jpg",
"./imgs/photo-9.jpg", "./imgs/photo-10.jpg", "./imgs/photo-11.jpg", "./imgs/photo-12.jpg", "./imgs/photo-13.jpg"]


let imgData = [];

const addImage = (item) => {
    const newItem = `
        <div class="item" id="${item.id}">
            <img src="${item.url}">
            <p class="count">0</p>
        </div>
    `
    return newItem;
}


const initGenerate = () => {
    let idCount = 0;
    for(let j = 0; j < 2; j++) {
        for(let i of imgUrls) {
                imgData.push({
                id: idCount,
                url: i
            });
            idCount++;
        }
    }

    let imgsHTML = '';
    for(i of imgData) {
        imgsHTML += addImage(i);
    }

    masonry.innerHTML = imgsHTML;
}


const handleAdd = () => {
    let items = masonry.querySelectorAll(".item");
    Array.from(items).forEach(element => {
        element.addEventListener('click', () => {
            let counter = element.querySelector('p');
            let currenetCount = counter.innerText;
            counter.innerHTML = (parseInt(currenetCount) + 1);
        })
    });
}



initGenerate();
handleAdd();

