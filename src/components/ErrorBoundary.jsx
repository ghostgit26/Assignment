import React from "react";

/**
 * Error Boundary component to catch UI errors
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger mt-3">
          Something went wrong. Please try again later.
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
