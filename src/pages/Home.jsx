import { Container, Card, Form, FloatingLabel, Button, Modal, Spinner } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs';
import '../App.css'

export default function Home() {
  const [userId, setUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchBlogPosts(storedUserId);
    }
  }, []);

  async function fetchBlogPosts(userId) {
    setLoading(true);
    try {
      const response = await axios.get('https://blog-app-api-alpha-seven.vercel.app/blogs', { 
        params: { user_id: userId },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error during submission:', error);
    } finally {
      setLoading(false);
    }
  }

  async function editBlogPost(e) {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      const response = await axios.patch(`https://blog-app-api-alpha-seven.vercel.app/blogs/${currentPostId}`, {
        title,
        content,
        user_id: userId
      });
      setLoadingSubmit(false);
      setShowEditModal(false);
      fetchBlogPosts(userId)
      setSuccess(true);
      setShowModal(true);
    } catch (error) {
      console.error('Error during deletion:', error);
    } finally {
      setLoadingSubmit(false);
    }
  }

  async function deleteBlogPost(postId) {
    try {
      const response = await axios.delete(`https://blog-app-api-alpha-seven.vercel.app/blogs/${postId}`);
      setShowDeleteModal(false);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error during deletion:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString) {
    return dayjs(dateString).format('DD MMMM YYYY');
  }

  function handleEdit(post) {
    setShowEditModal(true);
    setCurrentPostId(post.id);
    setTitle(post.title);
    setContent(post.content);
  }

  function handleDelete(postId) {
    setPostToDelete(postId);
    setShowDeleteModal(true);
  }

  return (
    <Container fluid className="mt-5 pt-5 d-flex justify-content-center align-items-start h-100">
      <div className="d-flex justify-content-center align-items-start w-100">
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" />
            <p>Loading posts...</p>
          </div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id} className="p-2 col-11 col-md-8 col-lg-6">
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{formatDate(post.updated_at)}</Card.Subtitle>
                <Card.Text className="text-clamp">
                  {post.content}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Link href={`/blogs/${post.id}`}>Read more</Card.Link>
                  <div className="d-flex">
                    <Button variant="dark" onClick={() => handleEdit(post)}>
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                    <Button variant="danger" className="ms-2" onClick={() => handleDelete(post.id)}>
                      <i className="bi bi-trash3-fill"></i>
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{success ? 'Success' : 'Error'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {success ? 'Post updated successfully!' : 'An error occurred. Please try again.'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editBlogPost} >
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
                  style={{ height: '200px' }}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Button type="submit" className="my-1 py-2 w-100" disabled={loadingSubmit}>
              {loadingSubmit ? <Spinner animation="border" size="sm" /> : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteBlogPost(postToDelete)}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}