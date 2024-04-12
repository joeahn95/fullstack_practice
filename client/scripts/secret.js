document.addEventListener('DOMContentLoaded', () => {

    // HELPER FUNCTIONS

    const addTask = async (input) => {
        try {
            console.log(input);
            const response = await fetch(`/api/task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: input
                })
            })

            const task = await response.json();

            // create each task, set id to the task id for later grabbing if we want to delete
            const item = document.createElement('li');
            item.setAttribute('id', task._id);
            item.innerText = task.name;
            
            // create delete btn
            const btn = document.createElement('button');
            btn.innerText = 'X';
            btn.addEventListener('click', () => deleteTask(task._id));
        
            //append button -> task -> taskList
            item.appendChild(btn);
            taskList.appendChild(item);

            console.log('task added!')
        } catch(err) {
            console.log(err);
        }
    }

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`/api/task/${id}`, {
                method: 'DELETE',
            })

            // remove html task element from list
            document.getElementById(id).remove();

            console.log(`task id: ${id} deleted!`);
        } catch (err) {
            console.log(err);
        }
    }

    const getTasks = async () => {

        // if clicked again, re-render list
        if(document.getElementById('item-list')) {
            console.log('refreshing task list');
            document.getElementById('item-list').innerHTML = '';
        }

        let tasks = [];
        try {
            const response = await fetch('/api/task');
            const tasks = await response.json();
            console.log(tasks);

            // create a line item and delete button for each task
            tasks.forEach(task => {
                // create each task, set id to the task id for later grabbing if we want to delete
                const item = document.createElement('li');
                item.setAttribute('id', task._id);
                item.innerText = task.name;
                
                // create delete btn
                const btn = document.createElement('button');
                btn.innerText = 'X';
                btn.addEventListener('click', () => deleteTask(task._id));

                //append button -> task -> taskList
                item.appendChild(btn);
                taskList.appendChild(item);
            });
        } catch (err) {
            console.log(err);
        }
    }

    // Grab body for appending
    const body = document.querySelector('body');

    // Create and append title
    const title = document.createElement('h1');
    title.innerText = 'Task List';
    title.setAttribute('id', 'title');
    body.appendChild(title);

    // create get tasks button
    const getBtn = document.createElement('button');
    getBtn.innerText = 'Get Tasks';
    getBtn.setAttribute('id', 'getBtn');
    getBtn.addEventListener('click', getTasks);
    body.appendChild(getBtn);

    // create empty task list
    const taskList = document.createElement('ul');
    taskList.setAttribute('id', 'item-list');
    body.appendChild(taskList);

    // create add task text input
    const addInput = document.createElement('input');
    addInput.setAttribute('type', 'text');
    body.appendChild(addInput);

    // create add tasks button
    const addBtn = document.createElement('button');
    addBtn.innerText = 'Add Task';
    addBtn.setAttribute('id', 'addBtn');
    addBtn.addEventListener('click', () => addTask(addInput.value));
    body.appendChild(addBtn);
    

})