import React from "react";
import TodoTask from "./TodoTask";
import useTodosContext from "../hooks/useTodosContext";

type Props = {
  // onMark: (id: string, isDone: boolean) => void;
  isDone?: boolean;
};

const TodoList = (props: Props) => {
  const todosContext = useTodosContext();

  // const renderedTasks = props.todos.map((todo) => {
  //     return <TodoTask key={todo.id}/>
  // })

    const renderedTasks = todosContext.todos?.filter(todo => props.isDone === undefined || todo.isDone === props.isDone)
    .map(todo => <TodoTask key={todo.id} todo={todo}/>)

//   const renderedTasks = todosContext.todos.map((todo) => {
//     return <TodoTask todo={todo} key={todo.id} />;
//   });

  return (
    <div className="flex flex-wrap gap-3 justify-center ">{renderedTasks}</div>
  );
};

export default TodoList;
