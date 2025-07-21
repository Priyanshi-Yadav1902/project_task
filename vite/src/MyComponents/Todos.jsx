import { Todo} from "./Todo"; // fixed path
export const Todos = (props) => {
  let myStyle = {
    minHeight: "100vh",
    margin: "40px auto",
  };
  return (
    <div className="container my-3" style={myStyle}>
      <h3 className="text-center my-3">Todos List</h3>
      {props.todos.length === 0 ? (
        "No Todos to display"
      ) : (
        props.todos.map((todo) => {
          console.log(todo.sno); // fixed typo
          return <Todo todo={todo} key={todo.sno} onDelete={props.onDelete} />;
        })
      )}
    </div>
  );
};

export default Todos;
