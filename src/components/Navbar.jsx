import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function AppNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const isLoggedIn = !!userId || !!token;
    
    setIsAuthenticated(isLoggedIn);
    
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/signup') {
      navigate('/login');
    } else if (isLoggedIn && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/blogs');
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/blogs">Minimalist.blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <Nav.Link as={Link} to="/blogs/add">Add Blog Post</Nav.Link>
            )}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
