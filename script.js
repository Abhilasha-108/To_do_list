const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const filterButtons = document.querySelectorAll('.filter-btn');

function addTask() {
    if (inputBox.value.trim() === '') {
        const messageBox = document.createElement("div");
        messageBox.textContent = "Please enter a task.";
        messageBox.className = "text-center text-red-500 mb-4 font-semibold";
        listContainer.prepend(messageBox);
        setTimeout(() => {
            messageBox.remove();
        }, 2000);
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

function clearAllTasks() {
    listContainer.innerHTML = '';
    localStorage.clear();
}

function filterTasks(filterType) {
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filterType}"]`).classList.add('active');

    const tasks = listContainer.children;
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const isCompleted = task.classList.contains('checked');

        switch (filterType) {
            case 'all':
                task.style.display = '';
                break;
            case 'active':
                task.style.display = isCompleted ? 'none' : '';
                break;
            case 'completed':
                task.style.display = isCompleted ? '' : 'none';
                break;
        }
    }
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
    listContainer.innerHTML = localStorage.getItem("data");
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    filterTasks(activeFilter);
}

showData();
