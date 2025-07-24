const API = 'http://localhost:3000/api/tasks';

async function fetchTasks() {
    const res = await fetch(API);
    const tasks = await res.json();
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.description + (task.completed ? ' ✅' : '');
        li.onclick = () => toggleComplete(task._id, !task.completed);
        const del = document.createElement('button');
        del.textContent = 'delete';
        del.onclick = (e) => {
            e.stopPropagation();
            deleteTask(task._id);
        };
        li.appendChild(del);
        list.appendChild(li);
    });
}

async function addTask() {
    const desc = document.getElementById('taskInput').value;
    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: desc })
    });
    document.getElementById('taskInput').value = '';
    fetchTasks();
}

async function toggleComplete(id, completed) {
    await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
    });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchTasks();
}

fetchTasks();
