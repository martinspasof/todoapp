function render(todos){	
	let styleStrikeThrough = '';
	let checked = '';
	let liStr = '';	
	let todoId = 0;
	saveToLocalStorage('todos', JSON.stringify(todos));

	todos.forEach(todo => {
		styleStrikeThrough = '';
		checked = '';
		if (todo.completed === true) {
			styleStrikeThrough = ' class="strikethrough" ';
			checked = 'checked';
		}
		
		if(todo.id == todoId){
			todo.id = todos.length + 1;			
		}
		todoId = todo.id;
		liStr += `<li><span>${todo.id}</span>. 
		<span ${styleStrikeThrough} >${todo.title}</span> 
		<input type='checkbox' data-update-id=${todo.id} data-title-todo=${todo.title} data-checked=${checked} ${checked}/>
		<input class="img" type="image" src="../trash.png" data-id=${todo.id} />
		</li> `;
	});

	dom.totalItems.innerHTML = "total items: " + todos.length;
	dom.todos.innerHTML = liStr;
}

function get_todos(url) {
	fetch(url)
		.then(res => {
			return processResponse(res);
		})
		.then(data => {		
			todos = [...data];
			render(todos);			
		})
		.catch(err => {
			render([...todos]);
			console.log(err);
		})
}

function processResponse(r) {
	if (r.status > 199 && r.status < 300) {
		return r.json()
	} else {
		throw new Error(`Error: ${r.status}`)
	}
}


function delete_todo(id) {
	fetch(api + '/todos/' + id, {
		method: 'DELETE'
	})
	.then(res => {
		return processResponse(res);
	})
	.then(() => {
		get_todos(api + '/todos');
	})
	.catch(err => {
		todos = todos.filter(function (todo) {
			return todo.id != id;
		});

		render([...todos]);
		console.log(err);
	})
}

function add_todo(todoTitle) {
	const todo = {
		'title': todoTitle,
		'completed': false
	};

	fetch(api + '/todos', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify(todo)
	})
	.then(res => {
		return processResponse(res);
	})
	.then(todo => {
		todos.push(todo);
		render(todos);
	})
	.catch(err => {
		todo.id = todos.length + 1;
		todos.push(todo);
		render([...todos]);
		console.log(err);
	})
}

function update_todo(id, todoTitle, completed) {
	const todo = {
		'title': todoTitle,
		'completed': completed
	};

	fetch(api + '/todos/'+id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify(todo)
	})
	.then(res => {
		get_todos(api + '/todos');
		return processResponse(res);
	}).catch(err => {

		todos.forEach(todoKey => {
			if(todoKey.id == id){
				todoKey.title = todo.title;
				todoKey.completed = todo.completed;
			}
		})

		render([...todos]);
		console.log(err);
	})
}

function saveToLocalStorage(key, value) {
	// save to local storage
	ls = window.localStorage;
	ls.setItem(key,value);
}

function readFromLocalStorage(key) {
	// save to local storage
	let ls = window.localStorage;
	return ls.getItem(key);
}

const dom = {
	todos: document.querySelector('.todos'),
	todoInput: document.querySelector('.add-todo>input'),
	btnAdd: document.querySelector('#btn-add'),
	totalItems: document.getElementsByClassName('total-items')[0],	
}

api = 'http://localhost:3000'

const todosStr = readFromLocalStorage('todos');
todos = JSON.parse(todosStr);

window.onload = function (e) {
	get_todos(api + '/todos');
}

dom.todos.addEventListener('click', function (e) {
	if (e.target.type === 'image') {
		if(e.target.dataset.id !== undefined){
			delete_todo(e.target.dataset.id);
		}
	} else if (e.target.type === 'checkbox') {
		if (e.target.dataset.updateId !== undefined && e.target.dataset.titleTodo !== undefined) {
			let completed = true;
			if(e.target.dataset.checked === 'checked'){
				completed = false;
			}			
			update_todo(e.target.dataset.updateId, e.target.dataset.titleTodo, completed);
		}
	}
})

dom.btnAdd.addEventListener('click', function (e) {
	const todoTitle = dom.todoInput.value;	
	add_todo(todoTitle);
})

