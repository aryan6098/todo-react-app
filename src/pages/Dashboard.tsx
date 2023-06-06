import React from "react";
import { TodoProvider } from "./component/TodoContext";
import TodoList from "./component/TodoList";
import TodoForm from "./component/TodoForm";
import { Row, Col } from 'reactstrap'
import Accordion from "./component/Accordion";
const Dashboard: React.FC = () => {

    return (
        <TodoProvider>
            <Row className=" mt-10">
                <Col>
                    <Accordion title="My ToDo">
                        <TodoList />
                        <TodoForm />
                    </Accordion>
                </Col>
            </Row>

        </TodoProvider>
    )
}
export default Dashboard;