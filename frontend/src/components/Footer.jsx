function Footer() {
  return (
    <footer className="taskflow-footer">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-5">
            <h4 className="taskflow-logo">
              Task<span>Flow</span>
            </h4>
            <p className="footer-description mt-3">
              A focused workspace for organizations to manage training,
              learners, trainers, and progress in one place.
            </p>
          </div>

          <div className="col-6 col-lg-2">
            <h6>Product</h6>
            <ul className="list-unstyled mt-3 footer-links">
              <li><a href="#product">Product</a></li>
              <li><a href="#solutions">Solutions</a></li>
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h6>Company</h6>
            <ul className="list-unstyled mt-3 footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h6>Get started</h6>
            <ul className="list-unstyled mt-3 footer-links">
              <li><a href="/login">Sign in</a></li>
              <li><a href="/register">Create an account</a></li>
            </ul>
          </div>
        </div>

        <hr />

        <div className="footer-bottom">
          <span>© 2026 TaskFlow. All rights reserved.</span>
          <span>Training operations, simplified.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;