function render(todos){
	let liStr = ''
	todos.forEach(todo => {
		liStr += `<li><span>${todo.id}</span>.<span>${todo.title}</span>-<span>${todo.completed}</span><button data-update-id=${todo.id} data-title-todo=${todo.title}>update</button><button data-id=${todo.id}>X</button></li> `
	});

	dom.totalItems.innerHTML = "total items: " +todos.length;

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
		}).then(data => {
			console.log(data);			
		}).catch(err => {
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
	}).then(res => {
		return processResponse(res);
	}).then(() => {
		get_todos(api + '/todos');
	}).catch(err => {
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
	}).catch(err => {
		console.log(err);
	})
}

function update_todo(id, todoTitle) {
	const todo = {
		'title': todoTitle,
		'completed': true
	};

	fetch(api + '/todos/'+id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify(todo)
	})
	.then(res => {
		return processResponse(res);
	}).catch(err => {
		console.log(err);
	})
}

const dom = {
	todos: document.querySelector('.todos'),
	todoInput: document.querySelector('.add-todo>input'),
	btnAdd: document.querySelector('#btn-add'),
	totalItems: document.getElementsByClassName('total-items')[0],
}

api = 'http://localhost:3000'

todos = []

window.onload = function (e) {
	get_todos(api + '/todos');
}

dom.todos.addEventListener('click', function (e) {
	// conrinue if e.target  is button
	if (e.target.tagName === 'BUTTON') {
		if(e.target.dataset.id !== undefined){
			console.log(`DELETE>....`,);
			delete_todo(e.target.dataset.id)
		} else if(e.target.dataset.updateId !== undefined && e.target.dataset.titleTodo !== undefined){
			console.log(`Update>....`,);
			update_todo(e.target.dataset.updateId, e.target.dataset.titleTodo)
		}

	}

})

dom.btnAdd.addEventListener('click', function (e) {
	const todoTitle = dom.todoInput.value;
	console.log(todoTitle);
	add_todo(todoTitle);
})

