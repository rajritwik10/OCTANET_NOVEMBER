const addBtn = document.querySelector("#add-btn");
const newTask = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");

let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};

const addTask = () => {
    const taskName = newTask.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = `<div class = "task">
    <input type="checkbox" class = "task-check">
    <span class="taskname">${taskName}</span>
    <button class="edit">
    <i class='bx bxs-edit'></i>
    </button>
    <button class="delete">
    <i class='bx bxs-trash-alt'></i>
    </button>
    </div>`;

    tasksContainer.insertAdjacentHTML("beforeend", task);

    const deleteButton = document.querySelectorAll(".delete");
    deleteButton.forEach((button) => {
        button.onclick = () => {
            const checkbox = button.parentElement.querySelector(".task-check");

            if (!checkbox.checked) {
                taskCount -= 1;
            }
            displayCount(taskCount);
            button.parentNode.remove();
        };
    });



    const editButton = document.querySelectorAll(".edit");
    editButton.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if (!(e.target.className == "edit")) {
                targetElement = e.target.parentElement;
            }
            newTask.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        };
    });
    const tasksCheck = document.querySelectorAll(".task-check");
    tasksCheck.forEach((checkbox) => {
        checkbox.onchange = () => {
            checkbox.nextElementSibling.classList.toggle("completed");
            if (checkbox.checked) {
                taskCount -= 1;
            }
            else {
                taskCount += 1;
            }
            displayCount(taskCount);
        };
    });
    taskCount += 1;
    displayCount(taskCount);
    newTask.value = "";
};

addBtn.addEventListener("click", addTask);

