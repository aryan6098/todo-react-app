import React, { useContext, useState } from "react";
import { TodoContext } from "./TodoContext";
import { Badge, ListGroupItem, ListGroup } from 'reactstrap';

interface Todo {
    id: number;
    title: string;
    subtasks: Todo[];
}

interface TodoItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const [isInputOpen, setIsInputOpen] = useState(false);
    const [newSubtask, setNewSubtask] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleTaskClick = () => {
        setIsInputOpen(!isInputOpen);
        setIsCollapsed(!isCollapsed);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSubtask(e.target.value);
    };

    const handleAddSubtask = () => {
        // Add the new subtask to the existing todo's subtasks array
        todo.subtasks.push({
            id: todo.subtasks.length + 1,
            title: newSubtask,
            subtasks: [],
        });

        // Clear the input field and close the input box
        setNewSubtask("");
        setIsInputOpen(false);
    };

    const BadgeIcon = ({ children }: any) => {
        return (
            <Badge
                color="light"
                className="custom-badge"
                style={{
                    borderRadius: "50%",
                    marginRight: "5px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "20px",
                    height: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    border: "1px solid #ccc",
                    color: "#ccc",
                    backgroundColor: "#fff",
                }}
            >
                {children}

            </Badge>
        )
    }

    return (
        <div>

            <ListGroup>
                <ListGroupItem onClick={handleTaskClick} role="button">
                    <BadgeIcon> &#x2713;</BadgeIcon>  <span className="me-2" onClick={handleTaskClick}>{todo.title}</span>
                    {todo.subtasks.length > 0 && (
                        <BadgeIcon>{todo.subtasks.length}</BadgeIcon>
                    )}


                </ListGroupItem>
            </ListGroup>

            {!isCollapsed && todo.subtasks.length > 0 && (
                <ul className="list-unstyled ms-5" >
                    {todo.subtasks.map((subtask) => (
                        <li key={subtask.id}>
                            <TodoItem todo={subtask} />
                        </li>
                    ))}
                </ul >
            )}
            {isInputOpen && (
                <div className="ms-5">
                    <input
                        type="text"
                        value={newSubtask}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleAddSubtask} className="border-0">Add</button>
                </div>
            )}
        </div>
    );
};

const TodoList: React.FC = () => {
    const { todos } = useContext(TodoContext);

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
};

export default TodoList;
