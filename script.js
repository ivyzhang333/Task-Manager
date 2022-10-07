const inputEl = document.querySelector("#input");
const buttonEl = document.querySelector("#delete");
const outputEl = document.querySelector("#list-container");
const form = document.querySelector("form");

//delete task
const removeTask = id => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks", tasks));
  }

  tasks = tasks.filter(task => {
    return task.id !== +id; //use "+id" to convert id string to number
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  getTasks();
};

//get tasks
const getTasks = () => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  console.log(tasks);

  //display task to DOM
  let output;
  const allTasks = tasks.map(task => {
    return `
    <li id="item">
            <span>${task.title}</span>
            <button onclick="removeTask('${task.id}')" id="delete">X</button>
          </li>
    `;
  });

  output = allTasks.join("");

  outputEl.innerHTML = output;
};

getTasks();

//add task and save to local storage
const addTask = e => {
  e.preventDefault(); //prevent the browser from refreshing itself
  //console.log(inputEl.value); //if enter "work" in the form, this will print "work"

  //check if input is empty
  if (inputEl.value === "") {
    alert("Please enter a task");
  }

  //get the item
  const task = inputEl.value;
  if (task) {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
      tasks = []; //we want to create an array of tasks
      console.log(tasks);
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
      console.log(tasks);
    }

    tasks.unshift({
      id: Date.now(),
      title: task,
    });

    //save to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    //empty all input
    inputEl.value = "";
  }

  getTasks();
};

//event listener: this is to bind event listener to the form
form.addEventListener("submit", addTask);
