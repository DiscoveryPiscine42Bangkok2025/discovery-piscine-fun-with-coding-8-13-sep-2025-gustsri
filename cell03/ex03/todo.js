window.onload = function() {
    const ftList = document.getElementById('ft_list');
    const newButton = document.getElementById('new-btn');

    function saveTodos() {
        const todos = [];
        const todoItems = ftList.children;
        for (let i = 0; i < todoItems.length; i++) {
            todos.push(todoItems[i].textContent);
        }
        document.cookie = "todos=" + JSON.stringify(todos) + ";path=/;max-age=31536000";
    }

    function createTodoElement(text) {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo-item';
        todoDiv.textContent = text;
        
        todoDiv.addEventListener('click', function() {
            if (confirm('Do you want to remove this to do?')) {
                ftList.removeChild(todoDiv);
                saveTodos();
            }
        });

        return todoDiv;
    }
    
    function loadTodos() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.startsWith('todos=')) {
                const storedTodos = JSON.parse(cookie.substring(6));
                storedTodos.forEach(function(todoText) {
                    const newTodo = createTodoElement(todoText);
                    ftList.appendChild(newTodo);
                });
                break;
            }
        }
    }

    function addNewTodo() {
        const todoText = prompt('Enter a new TO DO:');
        if (todoText && todoText.trim() !== '') {
            const newTodo = createTodoElement(todoText.trim());
            ftList.insertBefore(newTodo, ftList.firstChild);
            saveTodos();
        }
    }

    newButton.addEventListener('click', addNewTodo);
    
    loadTodos();
};