import "./main.css";

function Todo(props){

    const {todo} = props;
    function evenNumber(x) {
		return x%2 ? 'odd' : 'even'
	}

	let img = <input className="img" type="image" src="../trash.png" alt="trash"/>
	let checkbox = <input type='checkbox'/>

	return <li className={evenNumber(todo.id)}>
        {todo.title}{checkbox}
        {img}
    </li>
}


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

export const TodoCount = (todos)=>{
	return (
		<div className="total-items">{`total items: ${todos.length}`}</div>
	)
}

export {Todo}