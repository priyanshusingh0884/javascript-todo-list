let tasks = loadTasks();

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks === null) {
        return [];
    }
    return savedTasks
}

let input = document.getElementById("input")
let addTask = document.getElementById("addTask")
let task = document.getElementById("task-container")
let all = document.getElementById("all")
let pending = document.getElementById("pending")
let completed = document.getElementById("completed")
let taskCounter = document.querySelector(".task-counter")
let clearCompleted = document.getElementById("clear-completed")
let themeBtn = document.getElementById("theme-btn");


function renderTasks() {
    task.innerHTML = "";

    tasks.forEach((item) => {
        console.log("Task:", item);
        let list = document.createElement("li")
        list.classList.add("task-item")

        let span = document.createElement("span")
        span.textContent = item.text

        let checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.addEventListener("change", () => {
            item.completed = checkbox.checked
            span.classList.toggle("completed-task", item.completed)
            saveTasks()
            updateTaskCounter()
        })

        let deletebtn = document.createElement("button")
        deletebtn.textContent = "Delete"
        deletebtn.addEventListener("click", () => {
            let index = tasks.findIndex((task) => {
                return item.id === task.id
            })
            tasks.splice(index, 1)
            saveTasks()
            renderTasks()
            updateTaskCounter()
        })

        checkbox.checked = item.completed;

        if (item.completed === true) {
            span.classList.add("completed-task")
        }
        list.append(checkbox)
        list.append(span)
        list.append(deletebtn)
        console.log("Checkbox:", checkbox);
        console.log("Delete button:", deletebtn);
        console.log("Task list:", task);
        task.append(list)
    });
}


function updateTaskCounter() {
    let tasks = document.querySelectorAll(".task-item")
    let count_all = 0
    let count_pending = 0
    let count_completed = 0

    tasks.forEach((e) => {
        count_all += 1
        if (e.querySelector(".completed-task")) {
            count_completed += 1
        }
        else {
            count_pending += 1
        }

    })

    taskCounter.textContent = `All(${count_all}) | Pending(${count_pending}) | Completed(${count_completed})`;
}


function addNewTask() {
    if (input.value.trim() === "") {
        return
    }
    let taskText = input.value;

    let newtask = { id: Date.now(), text: taskText, completed: false }

    tasks.push(newtask)
    saveTasks()
    renderTasks()
    updateTaskCounter()

    input.value = ""

}


addTask.addEventListener("click", () => {
    addNewTask()
})

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addNewTask()
    }
})

all.addEventListener("click", () => {
    let tasks = document.querySelectorAll(".task-item")
    tasks.forEach((e) => {
        e.style.display = "flex"
    })
})

pending.addEventListener("click", () => {
    let tasks = document.querySelectorAll(".task-item")
    tasks.forEach((e) => {
        if (e.querySelector(".completed-task")) {
            e.style.display = "none"
        }
        else {
            e.style.display = "flex"
        }

    })
})

completed.addEventListener("click", () => {
    let tasks = document.querySelectorAll(".task-item")
    tasks.forEach((e) => {
        if (e.querySelector(".completed-task")) {
            e.style.display = "flex"
        }
        else {
            e.style.display = "none"
        }

    })
})

clearCompleted.addEventListener("click", () => {
    let result = tasks.filter((item) =>{
        return item.completed === false
    })

    tasks = result;
    
    saveTasks()
    renderTasks()
    updateTaskCounter()
})

themeBtn.addEventListener("click", ()=>{
    document.body.classList.toggle("dark-theme")
    localStorage.setItem("theme",document.body.classList.contains("dark-theme"))
})

let savedTheme = localStorage.getItem("theme")

if (savedTheme === "true"){
    document.body.classList.add("dark-theme");
}

renderTasks();
updateTaskCounter();






























































































