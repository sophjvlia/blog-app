import { Container, Form, FloatingLabel, Button, Modal, Spinner } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import '../App.css'

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await axios.post('https://blog-app-api-alpha-seven.vercel.app/signup', { email, password });
      setSuccess(true); 
      setShowModal(true);
      setEmail('');
      setPassword('');
    } catch (error) {
      setShowModal(true);
      console.error('Error during registration:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container fluid className="d-flex justify-content-center align-items-center h-100">
      <div className="signup-container bg-dark bg-gradient p-4 pb-2 rounded rounded-full">
        <h4 className="text-white mt-1 mb-4">
          Sign Up
        </h4>
        <Form onSubmit={handleSignUp} >
          <Form.Group className="mb-3">
            <FloatingLabel controlId="email" label="Email">
              <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-4">
            <FloatingLabel controlId="password" label="Password">
              <Form.Control type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FloatingLabel>
          </Form.Group>

          <Button type="submit" className="my-1 py-2 w-100" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
          </Button>

          <p className="text-white mt-2">Already have an account? <a href="/login">Log in here</a></p>
        </Form>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{success ? 'Success' : 'Error'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {success ? 'Registration successful!' : 'An error occurred. Please try again.'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}