let tasks = [];

// Chargement des tâches depuis le stockage local lors du chargement de la page
window.onload = function() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        displayTasks();
    }
};

function addTask() {
    const nomPersonne = document.getElementById('nom-personne').value; // Récupérer le nom de la personne
    const title = document.getElementById('titre-tache').value;
    const description = document.getElementById('tache-dscription').value;
    const deadline = document.getElementById('tache-deadline').value;
    const priority = document.getElementById('tache-priorite').value;

    if (nomPersonne === '' || title === '' || description === '' || deadline === '') {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    const task = {
        nomPersonne, // Ajouter le nom de la personne à l'objet de la tâche
        title,
        description,
        deadline,
        priority,
        completed: false
    };
    tasks.push(task);
    saveTasks(); // Sauvegarde des tâches
    displayTasks();
    clearForm();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasks() {
    const taskList = document.getElementById('tache-list-ul');
    taskList.innerHTML = '';

    tasks.sort((task1, task2) => (task1.deadline > task2.deadline) ? 1 : -1)

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <strong>${task.nomPersonne}</strong><br>
        <strong>${task.title}</strong><br>  
        Description: ${task.description}<br>
        Date Limite: ${task.deadline}<br>
        Priorité: ${task.priority}<br> 
        État d'Avancement: ${task.completed ? 'Terminé' : 'En Cours'}
        <div class="task-actions">
            <button onclick="toggleTaskCompletion(${index})" class="btn btn-toggle-completion">Marquer comme Terminé</button>
            <button onclick="editTask(${index})" class="btn btn-edit">Modifier</button>
            <button onclick="deleteTask(${index})" class="btn btn-delete">Supprimer</button>
        </div>
        `;

        if (task.completed) { 
            li.classList.toggle('completed');
        }
  
        taskList.appendChild(li);
    });
} 

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed
    saveTasks(); // Sauvegarde des tâches
    displayTasks();
}

function editTask(index) {
    const updatedTitle = prompt('Nouveau titre:', tasks[index].title);
    const updatedDescription = prompt('Nouvelle description:', tasks[index].description);
    const updatedDeadline = prompt('Nouvelle date limite:', tasks[index].deadline);
    const updatedPriority = prompt('Nouvelle priorité:', tasks[index].priority);

    if (updatedTitle && updatedDescription && updatedDeadline && updatedPriority) {
        tasks[index].title = updatedTitle;
        tasks[index].description = updatedDescription;
        tasks[index].deadline = updatedDeadline;
        tasks[index].priority = updatedPriority;
        saveTasks(); // Sauvegarde des tâches
        displayTasks();
    }
}

function deleteTask(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
        tasks.splice(index, 1)
        saveTasks(); // Sauvegarde des tâches
        displayTasks()
    }
}

function clearForm() {
    document.getElementById('titre-tache').value = '';
    document.getElementById('tache-dscription').value = '';
    document.getElementById('tache-deadline').value = '';
    document.getElementById('tache-priorite').value = 'Faible';
}
