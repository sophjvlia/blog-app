import { Container, Form, Button, FloatingLabel, Modal, Spinner } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'

export default function AddBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  async function handleAddBlog(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await axios.post('https://blog-app-api-alpha-seven.vercel.app/blogs', { title, content, user_id: userId });
      setSuccess(true); 
      setShowModal(true);
      setTitle('');
      setContent('');
    } catch (error) {
      setShowModal(true);
      console.error('Error during submission:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container fluid className="d-flex justify-content-center align-items-start h-100">
      <div className="mt-5 pt-5 col-11 col-md-8 col-lg-6">
        <h3 className="mb-4">Add Blog Post</h3>
        <Form onSubmit={handleAddBlog} >
          <Form.Group className="mb-3">
            <FloatingLabel controlId="title" label="Title">
              <Form.Control type="text" placeholder="Your title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-4">
            <FloatingLabel controlId="content" label="Content">
              <Form.Control
                as="textarea"
                placeholder="Write your content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ height: '100px' }}
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Button type="submit" className="mt-1 mb-3 py-2 w-100" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
          </Button>
        </Form>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{success ? 'Success' : 'Error'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {success ? 'Blog post added successfully!' : 'An error occurred. Please try again.'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}