document.addEventListener('DOMContentLoaded', function () {

    const templateTodolist = (name, done, id) => '<li class="todolist__item" data-id="'+ id +'"><input class="todolist__checkbox" type="checkbox" id="todolist'+ id +'" ' + (done && 'checked') + ' name="text" value="yes">\n' +
        '                    <label class="todolist__label" for="todolist'+ id +'"><span class="todolist__indicator"></span><span class="todolist__text">' + name + '</span>\n' +
        '                         <button class="todolist__copy" id="todolist__copy--js"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="#959fbd" xml:space="preserve"><path d="M53.98 9.143h-3.97c-.082 0-.155.028-.232.047V5.023C49.778 2.253 47.473 0 44.64 0H10.217C7.384 0 5.08 2.253 5.08 5.023v46.843c0 2.77 2.305 5.023 5.138 5.023h6.037v2.268c0 2.67 2.216 4.843 4.941 4.843H53.98c2.725 0 4.942-2.173 4.942-4.843v-45.17c0-2.671-2.217-4.844-4.942-4.844zM7.11 51.866V5.023c0-1.649 1.394-2.991 3.106-2.991H44.64c1.712 0 3.106 1.342 3.106 2.99v46.844c0 1.649-1.394 2.991-3.106 2.991H10.217c-1.712 0-3.106-1.342-3.106-2.99zm49.778 7.29c0 1.551-1.306 2.812-2.91 2.812H21.195c-1.604 0-2.91-1.26-2.91-2.811v-2.268H44.64c2.833 0 5.138-2.253 5.138-5.023V11.128c.077.018.15.047.233.047h3.968c1.604 0 2.91 1.26 2.91 2.811v45.17z"/><path d="M38.603 13.206H16.254a1.015 1.015 0 1 0 0 2.032h22.35a1.015 1.015 0 1 0 0-2.032zM38.603 21.333H16.254a1.015 1.015 0 1 0 0 2.032h22.35a1.015 1.015 0 1 0 0-2.032zM38.603 29.46H16.254a1.015 1.015 0 1 0 0 2.032h22.35a1.015 1.015 0 1 0 0-2.032zM28.444 37.587h-12.19a1.015 1.015 0 1 0 0 2.032h12.19a1.015 1.015 0 1 0 0-2.032z"/></svg></button>\n' +
        '                        <button class="todolist__cart" id="todolist__cart--js"  > <svg height="30" fill="#959fbd" viewBox="0 0 30 30" width="30" xmlns="http://www.w3.org/2000/svg">  <path d="M18.5 12c.294 0 .525.246.497.54l-1 11.984c-.054.693-1.055.61-.994-.082l1-11.984c.016-.262.234-.458.496-.458zm-7 0c-.294 0-.525.246-.497.54l1 11.984c.054.693 1.055.61.994-.082l-1-11.984c-.016-.262-.234-.458-.496-.458zm1-12c-.822 0-1.5.678-1.5 1.5V4H5.5c-.277 0-.5.223-.5.5s.223.5.5.5h19c.277 0 .5-.223.5-.5s-.223-.5-.5-.5H19V1.5c0-.822-.678-1.5-1.5-1.5zm0 1h5c.286 0 .5.214.5.5V4h-6V1.5c0-.286.214-.5.5-.5zm-6 5c-.824 0-1.58.673-1.498 1.547l2 21C7.074 29.307 7.676 30 8.5 30h13c.824 0 1.426-.692 1.498-1.453l2-21C25.08 6.673 24.324 6 23.5 6zm0 1h17c.284 0 .524.224.502.453l-2 21c-.033.342-.218.547-.502.547h-13c-.284 0-.47-.205-.502-.547l-2-21C5.976 7.223 6.216 7 6.5 7z"/></svg></button>\n' +
        '                    </label></li>'


    let data = [
        {
            id: '1',
            name: 'Buy products',
            done: true,
        },
        {
            id: '2',
            name: 'Learn js',
            done: true,
        },
        {
            id: '3',
            name: 'Cook food',
            done: true,
        },
        {
            id: '4',
            name: 'Watch movie',
            done: false,
        },
    ]


    const rootToDoList = document.querySelector('.todolist__list')

    function renderToDoList(todoItems) {
        //очищаем все элементы todolist перед render renderToDoList
        rootToDoList.innerHTML = "";

        //циклом проходимся по массиву data
        todoItems.forEach(todoItem => {
            const name = todoItem.name
            const done = todoItem.done
            const id = todoItem.id
            // добавляем значения в список
            const templateTodo = templateTodolist(name, done, id)
            // добавляем (append) ul в li
            rootToDoList.innerHTML += templateTodo
        })
    }

    renderToDoList(data)

    //добавление новой todoitem
    const button = document.querySelector('.form-add__btn--js')
    button.addEventListener('click', function (e) {
        //берем значения с инпута (то что в нем печатаем)
        const inputName = document.querySelector('.form-add__input--js')
        //проверяем пустой ли инпут, чтобы при нажатии на корку add не оправляло пустые данные
        if (!inputName.value.trim()) return false

        //добавляем новый объект, данные в наш основной массив data
        let tempToDoListItem = {}
        //уникальное id
        tempToDoListItem.id = Math.random().toString(16).slice(2)
        tempToDoListItem.name = inputName.value
        tempToDoListItem.done = false
        data.push(tempToDoListItem)

        renderToDoList(data)
        //после тго как добавили мы очищаем инпут
        inputName.value = ""

    })

    //убираем дейтсивя по умолчанию формы (отправка submit)
    document.querySelector('.form-add--js').addEventListener("submit", function (evt) {
        evt.preventDefault();
    });

    //
    const buttonNewTask = document.querySelector('.todolist__button')
    buttonNewTask.addEventListener('click', function () {
        document.querySelector('.form-add--js').classList.toggle('active')

    })

    // удаление todoitem
    function deleteTodoitem(catrTodoitem) {
        const id = catrTodoitem.target.closest('.todolist__item').getAttribute("data-id");
        const deletedDataId = data.filter(item => item.id !== id)
        data = [...deletedDataId]
        renderToDoList(data)
    }

    document.body.addEventListener( 'click', function ( event ) {
        if(event.target.id === 'todolist__cart--js' ) {
            deleteTodoitem(event)
        }
    });

    //поиск
    const buttonSearch = document.querySelector('.navigation__btn--js')
    buttonSearch.addEventListener('click' , function () {
        // пишеться то что работате при клике
        const inputSearch = document.querySelector('.navigation__input--js')
        const inputSearchValue = inputSearch.value.trim().toLowerCase()
        if (!inputSearchValue) return false

        const found = data.filter(todoitem => todoitem.name.toLowerCase().includes(inputSearchValue))

        console.log(found)
        renderToDoList(found)
    })

    //копирование
    const copyTexts = document.querySelectorAll('.todolist__copy')
    copyTexts.forEach(function (copyText, index) {
        copyText.addEventListener('click', function (){

        })

    })



})