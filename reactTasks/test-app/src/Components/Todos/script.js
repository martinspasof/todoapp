import {Todo, Header, AddTodo, TodoCount} from "../Todo/script";
import {todos} from "./todos";

function Todos(props){
    return 		<div className="page">
    <Header />
    <AddTodo />
    <hr/>
    <ul className="todos">
        {todos.map(todo=><Todo key={todo.id} todo={todo}/>)}
    </ul>
    
    <TodoCount length={todos.length}/>			
</div>
    

}

export {Todos}