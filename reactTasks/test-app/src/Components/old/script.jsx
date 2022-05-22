import React from "react";

export const Header = (props)=>{
	let h1 = <h1 className="head">HW - lists with dynamic background</h1>

	return h1
}

export const AddTodo = (props)=>{
	let inputTextField = <input id="input-text-field" type="text" placeholder="add todo title" ></input>
	let buttonAdd = <button id="btn-add">Add</button>


	return (
	<div className="add-todo">
		{inputTextField}
		{buttonAdd}
	</div>
	)
}

export const RenderList=(props)=>{
	let todos = [
		{
			id:1,
			title:"Item1",
			completed: false
		},
		{
			id:2,
			title:"Item2",
			completed: false
		},
		{
			id:3,
			title:"Item3",
			completed: false
		},
		{
			id:4,
			title:"Item4",
			completed: false
		}
	]

	return(		
		<div className="page">
			<Header />
			<AddTodo />
			<hr/>
			<ul className="todos">
				{todos.map(todo=><ListItem key={todo.id} todo={todo}/>)}
			</ul>
			
			<TodoCount length={todos.length}/>			
		</div>
	)

}


const ListItem = ({todo})=>{

	function evenNumber(x) {
		return x%2 ? 'odd' : 'even'
	}

	let img = <input className="img" type="image" src="../trash.png" />
	let checkbox = <input type='checkbox'/>

	return <li className={evenNumber(todo.id)}>{todo.title}{checkbox}{img}</li>
}

const TodoCount = (todos)=>{
	return (
		<div className="total-items">{`total items: ${todos.length}`}</div>
	)
}
