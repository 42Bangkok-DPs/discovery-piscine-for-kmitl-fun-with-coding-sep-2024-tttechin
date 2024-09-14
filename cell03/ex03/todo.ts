// Get the to-do list container
const ftList = document.getElementById('ft_list');

// Function to add a new TO DO item
function addTodo(text) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.textContent = text;

    // Add click event to remove the TO DO
    todoDiv.addEventListener('click', () => {
        if (confirm('Do you want to remove this TO DO?')) {
            ftList.removeChild(todoDiv);
            saveTodos(); // Save list after removal
        }
    });

    // Insert new TO DO at the top of the list
    ftList.insertBefore(todoDiv, ftList.firstChild);
    saveTodos(); // Save list after addition
}

// Function to save TO DOs to cookies
function saveTodos() {
    const todos = [];
    document.querySelectorAll('.todo').forEach(todo => {
        todos.push(todo.textContent);
    });
    document.cookie = `todos=${JSON.stringify(todos)};path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

// Function to load TO DOs from cookies
function loadTodos() {
    const cookies = document.cookie.split(';');
    let todosCookie = cookies.find(cookie => cookie.trim().startsWith('todos='));
    if (todosCookie) {
        todosCookie = todosCookie.split('=')[1];
        const todos = JSON.parse(todosCookie);
        todos.forEach(todo => {
            addTodo(todo);
        });
    }
}

// Event listener for 'New' button to create a new TO DO
document.getElementById('newButton').addEventListener('click', () => {
    const todoText = prompt('Enter a new TO DO:');
    if (todoText && todoText.trim() !== '') {
        addTodo(todoText); // Add TO DO if it's not empty
    } else {
        alert('The TO DO cannot be empty.');
    }
});

// Load TO DOs when the page is loaded
window.onload = () => {
    loadTodos();
};