// Check if user logged in
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// Load tasks when page opens
window.onload = loadTasks;

// Add Task
function addTask() {

    let taskInput = document.getElementById("taskInput");

    let taskText = taskInput.value.trim();

    if (taskText === "") {

        alert("Enter a task");

        return;
    }

    fetch("https://to-do-list-p8hi.onrender.com/add", {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

            "Authorization": `Bearer ${token}`

        },

        body: JSON.stringify({

            task: taskText

        })

    })

    .then(res => res.json())

    .then(data => {

        taskInput.value = "";

        loadTasks();

    })

    .catch(err => {

        console.log(err);

    });

}

// Load Tasks
function loadTasks() {

    fetch("https://to-do-list-p8hi.onrender.com/tasks", {

        headers: {

            "Authorization": `Bearer ${token}`

        }

    })

    .then(res => res.json())

    .then(data => {

        let tableBody =
        document.querySelector("#taskTable tbody");

        tableBody.innerHTML = "";

        // Empty tasks message
        if (data.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="3">
                        No tasks available
                    </td>
                </tr>
            `;

            return;
        }

        data.forEach((task, index) => {

            let row = document.createElement("tr");

            row.innerHTML = `

                <td>${index + 1}</td>

                <td>${task.task}</td>

                <td>

                    <button onclick="deleteTask('${task._id}')">

                        Delete

                    </button>

                </td>

            `;

            tableBody.appendChild(row);

        });

    })

    .catch(err => {

        console.log(err);

    });

}

// Delete Task
function deleteTask(id) {

    fetch(`https://to-do-list-p8hi.onrender.com/delete/${id}`, {

        method: "DELETE",

        headers: {

            "Authorization": `Bearer ${token}`

        }

    })

    .then(res => res.json())

    .then(data => {

        loadTasks();

    })

    .catch(err => {

        console.log(err);

    });

}

// Logout
function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}