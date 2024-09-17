const UpdateBtn = document.getElementById("update-button");
const TaskList = document.getElementById("Container-list");
let input = document.getElementById("input-js");
let DateDisplay = document.getElementById("date-js");

document.addEventListener("DOMContentLoaded", () => {
  let storedTasks = JSON.parse(localStorage.getItem("Tasks")) || [];
  let date = new Date();
  let day = date.getDate();
  let month = date.toLocaleString('default', { month: 'short' });

  console.log(date);
  console.log(day);
  console.log(month);
  const formattedDate = `${day} ${month}`;
  DateDisplay.innerHTML = `<h1 id = "date-js" class="display-3 fw-bold text-primary text-center my-5">${formattedDate} </h1>`;
  storedTasks.forEach((taskValue, index) => {
    addTaskToDOM(taskValue, index);
  });
});

function check() {
  if (input.value === "") {
    console.log("empty");
  } else {
    let taskValue = input.value;
    let storedTasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    storedTasks.push(taskValue);
    localStorage.setItem("Tasks", JSON.stringify(storedTasks));
    addTaskToDOM(taskValue, storedTasks.length - 1);
    input.value = "";
  }
}

UpdateBtn.addEventListener("click", () => {
  check();
});

input.addEventListener("onchange",()=>{
  check();
})
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    check();
  }
});

function addTaskToDOM(taskValue, index) {
  let Task = document.createElement("div");
  Task.classList.add("d-flex", "flex-row", "justify-content-center", "my-3");
  Task.setAttribute("data-index", index);

  Task.innerHTML = `
    <input type="checkbox" class="form-check-input me-5 my-4 task-checkbox">
    <p class="text-primary w-50 lead text-start fw-bold mx-5 my-3">${taskValue}</p>
    <div class="btn-group">
      <button class="btn btn-primary btn-m my-3">Edit Task</button>
      <button class="btn btn-danger btn-m my-3">Delete</button>
    </div>
  `;

  const deleteButton = Task.querySelector(".btn-danger");
  deleteButton.addEventListener("click", () => {
    let storedTasks = JSON.parse(localStorage.getItem("Tasks"));
    storedTasks.splice(index, 1);
    localStorage.setItem("Tasks", JSON.stringify(storedTasks));
    Task.remove();
  });

  const editButton = Task.querySelector(".btn-primary");
  editButton.addEventListener("click", () => {
    let newTask = prompt("Edit your task:", taskValue);
    if (newTask !== null && newTask !== "") {
      let storedTasks = JSON.parse(localStorage.getItem("Tasks"));
      storedTasks[index] = newTask; 
      localStorage.setItem("Tasks", JSON.stringify(storedTasks));
      Task.querySelector("p").textContent = newTask;
    }
  });

  TaskList.appendChild(Task);


  const checkBox = Task.querySelector(".task-checkbox");
  checkBox.addEventListener("change", () => {
    checkBox.nextElementSibling.classList.toggle("text-decoration-line-through");
  });
}


const oneDay = 1000 * 60 * 60 * 24;
setTimeout(() => {
  localStorage.clear();
}, oneDay);
