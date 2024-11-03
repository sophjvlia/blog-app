import { Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs';
import '../App.css'

export default function ViewBlog() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function fetchBlogPost() {
      setLoading(true);
      try {
        const response = await axios.get(`https://blog-app-api-alpha-seven.vercel.app/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error during retrieval:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchBlogPost();
  }, [id]);

  function formatDate(dateString) {
    return dayjs(dateString).format('DD MMMM YYYY');
  }

  return post ? (
    <div className="mt-5 pt-5 d-flex justify-content-center align-items-start w-100">
      <Card className="col-11 col-md-8 col-lg-6 p-2">
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Subtitle className="mb-4 text-muted">{formatDate(post.updated_at)}</Card.Subtitle>
          <Card.Text>
            {post.content}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  ) : (
    <p>Loading...</p>
  );
}