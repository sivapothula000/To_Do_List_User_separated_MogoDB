// Check login
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// Load tasks when page opens
window.onload = loadTasks;

function addTask() {

    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Enter a task");
        return;
    }

    fetch("http://localhost:5000/add", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify({
            task: taskText
        })

    })

    .then(res => res.text())

    .then(() => {

        taskInput.value = "";

        loadTasks();

    });

}

function loadTasks() {

    fetch("http://localhost:5000/tasks", {

        headers: {
            "Authorization": `Bearer ${token}`
        }

    })

    .then(res => res.json())

    .then(data => {

        let tableBody =
        document.querySelector("#taskTable tbody");

        tableBody.innerHTML = "";

        data.forEach((task, index) => {

            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${task.task}</td>
                <td>
                    <button onclick="deleteTask(${task.id})">
                        Delete
                    </button>
                </td>
            `;

            tableBody.appendChild(row);

        });

    });

}

function deleteTask(id) {

    fetch(`http://localhost:5000/delete/${id}`, {

        method: "DELETE",

        headers: {
            "Authorization": `Bearer ${token}`
        }

    })

    .then(() => loadTasks());

}

function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}