import React, { useContext, useState } from "react";
import { TodoContext } from "./TodoContext";
const TodoForm: React.FC = () => {
    const { addTodo } = useContext(TodoContext);
    const [title, setTitle] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (title.trim() === "") {
            return;
        }

        const newTodo = {
            id: Date.now(),
            title: title,
            subtasks: [],
        };

        addTodo(newTodo);
        setTitle("");
    };

    return (
        <div className="ms-4 ">
            <form onSubmit={handleSubmit}>
                <button type="submit" className="border-0">Add Task</button>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter todo title"
                    className="border-0"
                />


            </form>
        </div>

    );
};

export default TodoForm;
