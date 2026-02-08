import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="text-muted mb-4">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary rounded-pill px-4">
        Go Home
      </Link>
    </div>
  );
}
