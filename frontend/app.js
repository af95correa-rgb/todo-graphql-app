const API_URL = 'http://localhost:4000/graphql';

async function makeGraphQLRequest(query, variables = {}) {
    try {
        const response = await axios.post(API_URL, {
            query: query,
            variables: variables
        });
        
        if (response.data.errors) {
            console.error('Error de GraphQL:', response.data.errors);
            alert('Error: ' + response.data.errors[0].message);
            return null;
        }
        
        return response.data.data;
    } catch (error) {
        console.error('Error en la petición:', error);
        alert('Error al conectar con el servidor. Verifica que el backend esté corriendo.');
        return null;
    }
}

async function loadTasks() {
    const query = `
        query {
            tasks {
                id
                title
                description
                completed
                createdAt
            }
        }
    `;
    
    const data = await makeGraphQLRequest(query);
    
    if (data && data.tasks) {
        displayTasks(data.tasks);
    }
}

function displayTasks(tasks) {
    const tasksList = document.getElementById('tasksList');
    
    if (tasks.length === 0) {
        tasksList.innerHTML = '<p class="empty-state">📭 No hay tareas. ¡Agrega una nueva!</p>';
        return;
    }
    
    tasksList.innerHTML = tasks.map(task => {
        const date = new Date(parseInt(task.createdAt)).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        
        return `
            <div class="task-item ${task.completed ? 'completed' : ''}">
                <h3 class="task-title">${task.title}</h3>
                ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
                
                <div class="task-meta">
                    <span class="task-date">📅 ${date}</span>
                    <span class="task-status ${task.completed ? 'status-completed' : 'status-pending'}">
                        ${task.completed ? '✅ Completada' : '⏳ Pendiente'}
                    </span>
                </div>
                
                <div class="task-actions">
                    ${!task.completed ? 
                        `<button onclick="toggleTask('${task.id}', true)" class="btn btn-small btn-complete">
                            ✓ Completar
                        </button>` : 
                        `<button onclick="toggleTask('${task.id}', false)" class="btn btn-small btn-complete">
                            ↻ Desmarcar
                        </button>`
                    }
                    <button onclick="deleteTask('${task.id}')" class="btn btn-small btn-delete">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

async function addTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    
    if (!title) {
        alert('Por favor ingresa un título para la tarea');
        return;
    }
    
    const mutation = `
        mutation AddTask($title: String!, $description: String) {
            addTask(title: $title, description: $description) {
                id
                title
                description
                completed
                createdAt
            }
        }
    `;
    
    const variables = {
        title: title,
        description: description
    };
    
    const data = await makeGraphQLRequest(mutation, variables);
    
    if (data && data.addTask) {
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDescription').value = '';
        loadTasks();
    }
}

async function toggleTask(id, completed) {
    const mutation = `
        mutation UpdateTask($id: ID!, $completed: Boolean) {
            updateTask(id: $id, completed: $completed) {
                id
                completed
            }
        }
    `;
    
    const variables = {
        id: id,
        completed: completed
    };
    
    const data = await makeGraphQLRequest(mutation, variables);
    
    if (data && data.updateTask) {
        loadTasks();
    }
}

async function deleteTask(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        return;
    }
    
    const mutation = `
        mutation DeleteTask($id: ID!) {
            deleteTask(id: $id) {
                id
            }
        }
    `;
    
    const variables = { id: id };
    
    const data = await makeGraphQLRequest(mutation, variables);
    
    if (data && data.deleteTask) {
        loadTasks();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('taskTitle').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    loadTasks();
});