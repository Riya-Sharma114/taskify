import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  Modal,
} from "react-bootstrap";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  // Add Task
  const addTask = () => {
    if (task.trim() === "") return;
    const newTask = { id: Date.now(), text: task, completed: false };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  // Toggle Complete
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Open Edit Modal
  const handleEdit = (task) => {
    setEditTaskId(task.id);
    setEditText(task.text);
    setShowModal(true);
  };

  // Save Edited Task
  const saveEdit = () => {
    setTasks(
      tasks.map((t) =>
        t.id === editTaskId ? { ...t, text: editText } : t
      )
    );
    setShowModal(false);
    setEditTaskId(null);
    setEditText("");
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <h2 className="text-center mb-3">📝 Todo App</h2>

              {/* Input */}
              <Form className="d-flex mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter task..."
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
                <Button variant="primary" className="ms-2" onClick={addTask}>
                  Add
                </Button>
              </Form>

              {/* Task List */}
              {tasks.length === 0 ? (
                <p className="text-muted text-center">No tasks yet...</p>
              ) : (
                tasks.map((t) => (
                  <Card key={t.id} className="mb-2">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div>
                        <span
                          style={{
                            textDecoration: t.completed ? "line-through" : "none",
                          }}
                        >
                          {t.text}
                        </span>{" "}
                        {t.completed ? (
                          <Badge bg="success">Done</Badge>
                        ) : (
                          <Badge bg="warning">Pending</Badge>
                        )}
                      </div>

                      <div>
                        <Button
                          variant={t.completed ? "secondary" : "success"}
                          size="sm"
                          className="me-2"
                          onClick={() => toggleTask(t.id)}
                        >
                          {t.completed ? "Undo" : "Complete"}
                        </Button>
                        <Button
                          variant="info"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(t)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteTask(t.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;
