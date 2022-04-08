document.addEventListener('DOMContentLoaded', function () {

    const templateTodolist = (name, done, id) => '<li class="todolist__item"><input class="todolist__checkbox" type="checkbox" id="todolist'+ id +'" ' + (done && 'checked') + ' name="text" value="yes">\n' +
        '                    <label class="todolist__label" for="todolist'+ id +'"><span class="todolist__indicator"></span><span class="todolist__text">' + name + '</span>\n' +
        '                        <button class="todolist__cart" id="todolist__cart--js" data-id="'+ id +'" > <svg height="30" fill="#959fbd" viewBox="0 0 30 30" width="30" xmlns="http://www.w3.org/2000/svg">  <path d="M18.5 12c.294 0 .525.246.497.54l-1 11.984c-.054.693-1.055.61-.994-.082l1-11.984c.016-.262.234-.458.496-.458zm-7 0c-.294 0-.525.246-.497.54l1 11.984c.054.693 1.055.61.994-.082l-1-11.984c-.016-.262-.234-.458-.496-.458zm1-12c-.822 0-1.5.678-1.5 1.5V4H5.5c-.277 0-.5.223-.5.5s.223.5.5.5h19c.277 0 .5-.223.5-.5s-.223-.5-.5-.5H19V1.5c0-.822-.678-1.5-1.5-1.5zm0 1h5c.286 0 .5.214.5.5V4h-6V1.5c0-.286.214-.5.5-.5zm-6 5c-.824 0-1.58.673-1.498 1.547l2 21C7.074 29.307 7.676 30 8.5 30h13c.824 0 1.426-.692 1.498-1.453l2-21C25.08 6.673 24.324 6 23.5 6zm0 1h17c.284 0 .524.224.502.453l-2 21c-.033.342-.218.547-.502.547h-13c-.284 0-.47-.205-.502-.547l-2-21C5.976 7.223 6.216 7 6.5 7z"/></svg></button>\n' +
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
        const id = catrTodoitem.target.getAttribute("data-id");
        const deletedDataId = data.filter(item => item.id !== id)
        data = [...deletedDataId]
        renderToDoList(data)
    }

    document.body.addEventListener( 'click', function ( event ) {
        if(event.target.id === 'todolist__cart--js' ) {
            deleteTodoitem(event)
        }
    });

})