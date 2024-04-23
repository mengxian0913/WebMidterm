let newId = parseInt(Object.keys(localStorage)[0]) + 1 || 0, editId;
const input = document.getElementById('text');
const submit = document.getElementById('submit');
const LIST = document.getElementById('list-container');

const buildNewNode = (text, id) => {
    const newLi = document.createElement('li');
    newLi.setAttribute('data-id', id);
    newLi.innerHTML = `
        <p>${text}</p>
        <i class="fi fi-rr-edit"></i>
        <i class="fi fi-sr-trash-xmark"></i>
    `;
    return newLi;
}

const fetchData = () => {
    LIST.innerHTML = "";
    Object.entries(localStorage).sort((a, b) => parseInt(a[0]) - parseInt(b[0])).forEach(([id, value]) => {
        document.getElementById('list-container').appendChild(buildNewNode(value, id));
    });

    Array.from(document.getElementsByClassName('fi-rr-edit')).forEach(el => {
        el.addEventListener('click', () => {
            input.value = el.previousElementSibling.innerHTML;
            submit.value = '編輯';
            editId = el.parentElement.getAttribute('data-id');
        })
    })
    Array.from(document.getElementsByClassName('fi-sr-trash-xmark')).forEach(el => {
        console.log('ok');
        el.addEventListener('click', () => {
            localStorage.removeItem(el.parentElement.getAttribute('data-id'));
            fetchData();
        })
    })

    if(LIST.childElementCount > 0){
        if(!document.getElementById('clear')){
            const clearElement = document.createElement('p');
            clearElement.id = 'clear';
            clearElement.textContent = '清除所有項目';
            document.getElementById('all').appendChild(clearElement);
        }
        document.getElementById('clear').addEventListener('click', () => {
            localStorage.clear();
            fetchData();
        });
    }else{
        document.getElementById('clear').remove();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    fetchData();
    document.getElementById('FORM').addEventListener('submit', function(event) {
        event.preventDefault();
        const buttonType = submit.value;
        const formData = new FormData(event.target);
        input.value = '';
        if(buttonType === '編輯'){
            localStorage.setItem(editId, formData.get('text'));
            submit.value = '新增';
        }
        else if(buttonType === '新增'){
            localStorage.setItem(newId, formData.get('text'));
            newId ++;
        }
        fetchData();
    });
})