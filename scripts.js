class ToDoClass {
    constructor() {
        //localStorage.clear(); uncommnent this line to clear the localStorage
        this.tasks = JSON.parse(localStorage.getItem('TASKS'));
        if (!this.tasks) {
            this.tasks = [
                { task: 'First task', isComplete: false },
                { task: 'Second Task', isComplete: true }
            ];
        }
        this.loadTasks();
        this.addEventListeners();
    }
    addEventListeners() {
        document.getElementById('addTask').addEventListener('keypress', event => {
            if (event.keyCode === 13) {
                this.addTask(event.target.value);
                event.target.value = '';
            }
        });
    }
    loadTasks() {
        localStorage.setItem('TASKS', JSON.stringify(this.tasks));
        let tasksHtml = this.tasks.reduce((html, task, index) => html += this.generateTasksHtml(task, index), '');
        document.getElementById('taskList').innerHTML = tasksHtml;
    }
    generateTasksHtml(task, index) {
        return `
            <li class="list-group-item checkbox">
                <div class="row">
                    <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                        <label><input id="toggleTaskStatus" type="checkbox"  onchange="toDo.toggleTaskStatus(${index})" value="" class="" ${task.isComplete?'checked':''}></label>
                    </div>
                    <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete?'complete':''}">
                        ${task.task}
                    </div>
                    <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
                        <a class="" href="/toDoList" onclick="toDo.deleteTask(event, ${index})"><i id="deleteTask" data-id="${index}" class="material-icons">delete</i></a>
                    </div>
                </div>
            </li>
        `;
    }
    toggleTaskStatus(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadTasks();
    }
    deleteTask(event, taskIndex) {
        event.preventDefault();
        this.tasks.splice(taskIndex, 1);
        this.loadTasks();
    }
    addTaskClick() {
        let target = document.getElementById('addTask');
        this.addTask(target.value);
        target.value = "";
    }
    addTask(task) {
        let newTask = {
            task,
            isComplete: false,
        };
        let parentDiv = document.getElementById('addTask').parentElement;
        if (task === '')
            parentDiv.classList.add('has-error');
        else {
            parentDiv.classList.remove('has-error');
            this.tasks.push(newTask);
            this.loadTasks();
        }
    }
}

let toDo;
window.addEventListener("load", () => { //let a = function(x){} === let a = x => {}
    toDo = new ToDoClass();
})