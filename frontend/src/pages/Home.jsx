import { Link } from "react-router-dom";

function Home({ theme, toggleTheme }) {
  return (
    <div className="taskflow-page">
      

      {/* Hero section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="section-label">TRAINING MANAGEMENT, REIMAGINED</span>

              <h1 className="hero-title mt-3">
                One workspace for your entire training operation.
              </h1>

              <p className="hero-text mt-4">
                TaskFlow helps organizations bring courses, batches, trainers,
                learners, tasks, assessments, attendance, and progress into
                one connected workspace.
              </p>

              <div className="d-flex flex-wrap gap-2 mt-4">
                <Link className="btn taskflow-primary-btn" to="/register">
                  Get started
                </Link>
                <a href="#product" className="btn taskflow-outline-btn">
                  Explore TaskFlow
                </a>
              </div>

              <div className="hero-note mt-4">
                Built for organizations that run real training programs.
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-product">
                <div className="product-window-top">
                  <div className="window-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span>TaskFlow workspace</span>
                </div>

                <div className="product-window-body">
                  <div className="product-mini-nav">
                    <div className="mini-brand">TF</div>
                    <div className="mini-nav-item active">Overview</div>
                    <div className="mini-nav-item">Batches</div>
                    <div className="mini-nav-item">Tasks</div>
                    <div className="mini-nav-item">Progress</div>
                  </div>

                  <div className="product-main">
                    <div className="product-heading">
                      <div>
                        <small>ORGANIZATION OVERVIEW</small>
                        <h5>Training operations</h5>
                      </div>
                      <span className="status-badge">Live</span>
                    </div>

                    <div className="mini-stats">
                      <div>
                        <span>Students</span>
                        <strong>1,248</strong>
                      </div>
                      <div>
                        <span>Active batches</span>
                        <strong>18</strong>
                      </div>
                      <div>
                        <span>Today's classes</span>
                        <strong>12</strong>
                      </div>
                    </div>

                    <div className="progress-card">
                      <div className="progress-card-head">
                        <span>Batch progress</span>
                        <small>This week</small>
                      </div>

                      <div className="progress-row">
                        <span>Python Full Stack</span>
                        <div className="progress-track">
                          <div className="progress-fill fill-one"></div>
                        </div>
                        <strong>78%</strong>
                      </div>

                      <div className="progress-row">
                        <span>Data Science</span>
                        <div className="progress-track">
                          <div className="progress-fill fill-two"></div>
                        </div>
                        <strong>64%</strong>
                      </div>

                      <div className="progress-row">
                        <span>GenAI Program</span>
                        <div className="progress-track">
                          <div className="progress-fill fill-three"></div>
                        </div>
                        <strong>52%</strong>
                      </div>
                    </div>

                    <div className="floating-update">
                      <span className="update-dot"></span>
                      24 submissions reviewed today
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product overview */}
      <section id="product" className="section-padding product-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-label">THE WORKSPACE</span>
            <h2 className="section-title mt-2">
              Everything connected around the training journey.
            </h2>
            <p className="section-text mt-3">
              Instead of managing training across disconnected tools,
              TaskFlow keeps the important pieces connected to the batch,
              course, trainer, and learner.
            </p>
          </div>

          <div className="row g-3 mt-4">
            <div className="col-md-6 col-lg-4">
              <div className="feature-card">
                <span className="feature-number">01</span>
                <h5>Courses & batches</h5>
                <p>
                  Organize programs into courses and batches with the people,
                  schedules, and learning activities attached to them.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card">
                <span className="feature-number">02</span>
                <h5>Classes & schedules</h5>
                <p>
                  Keep upcoming classes, trainers, meeting details, and
                  learning activities in one place.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card">
                <span className="feature-number">03</span>
                <h5>Resources & recordings</h5>
                <p>
                  Give learners one place to find notes, files, links, and
                  class recordings.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card">
                <span className="feature-number">04</span>
                <h5>Tasks & submissions</h5>
                <p>
                  Create assignments, collect submissions, review work, and
                  provide marks and feedback.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card">
                <span className="feature-number">05</span>
                <h5>Assessments & attendance</h5>
                <p>
                  Track tests, results, attendance, and learner activity
                  without maintaining separate records.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card">
                <span className="feature-number">06</span>
                <h5>Progress & mentoring</h5>
                <p>
                  Connect learner progress with trainer feedback, mentor
                  guidance, tasks, attendance, and assessments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connected workflow */}
      <section className="workflow-section section-padding">
        <div className="container">
          <div className="text-center section-heading mx-auto">
            <span className="section-label">ONE CONNECTED SYSTEM</span>
            <h2 className="section-title mt-2">
              Training data stays connected.
            </h2>
            <p className="section-text mt-3">
              A learner does not exist separately from a batch, and a batch
              does not exist separately from its training activity.
            </p>
          </div>

          <div className="workflow mt-5">
            <div className="workflow-step">
              <span>01</span>
              <strong>Organization</strong>
              <small>Workspace</small>
            </div>

            <div className="workflow-arrow">→</div>

            <div className="workflow-step">
              <span>02</span>
              <strong>Course</strong>
              <small>Program</small>
            </div>

            <div className="workflow-arrow">→</div>

            <div className="workflow-step">
              <span>03</span>
              <strong>Batch</strong>
              <small>Learners</small>
            </div>

            <div className="workflow-arrow">→</div>

            <div className="workflow-step">
              <span>04</span>
              <strong>Learning</strong>
              <small>Daily activity</small>
            </div>

            <div className="workflow-arrow">→</div>

            <div className="workflow-step">
              <span>05</span>
              <strong>Progress</strong>
              <small>Outcomes</small>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions by role */}
      <section id="solutions" className="section-padding solutions-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-label">BUILT AROUND PEOPLE</span>
            <h2 className="section-title mt-2">
              Different roles. One shared workspace.
            </h2>
            <p className="section-text mt-3">
              Everyone sees the information and actions relevant to their
              responsibility while the organization keeps control.
            </p>
          </div>

          <div className="row g-3 mt-4">
            <div className="col-md-6">
              <div className="role-card">
                <span className="role-number">01</span>
                <h5>Organization owners & admins</h5>
                <p>
                  Manage members, trainers, mentors, courses, batches,
                  operations, reports, and organization settings.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="role-card">
                <span className="role-number">02</span>
                <h5>Trainers</h5>
                <p>
                  Run classes, share resources, create tasks, review
                  submissions, conduct assessments, and track learners.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="role-card">
                <span className="role-number">03</span>
                <h5>Mentors</h5>
                <p>
                  Follow assigned learners, understand their progress, give
                  guidance, and manage follow-ups.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="role-card">
                <span className="role-number">04</span>
                <h5>Students</h5>
                <p>
                  Access classes, resources, recordings, tasks, assessments,
                  feedback, attendance, and personal progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="about-section section-padding">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <span className="section-label">ABOUT TASKFLOW</span>
              <h2 className="section-title mt-2">
                Designed for the work behind every training program.
              </h2>
            </div>

            <div className="col-lg-6 offset-lg-1">
              <p className="section-text">
                Running training involves much more than delivering classes.
                Organizations have to coordinate people, batches, schedules,
                assignments, assessments, attendance, feedback, and progress.
              </p>

              <p className="section-text mt-3">
                TaskFlow brings those operational pieces together so teams can
                spend less time maintaining scattered information and more
                time running the training itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="contact-section section-padding">
        <div className="container">
          <div className="contact-card">
            <div>
              <span className="section-label">CONTACT US</span>
              <h2 className="section-title mt-2">
                Want to bring your training operation into one workspace?
              </h2>
              <p className="section-text mt-3 mb-0">
                Reach out to learn more about TaskFlow and how it can fit your
                organization's training workflow.
              </p>
            </div>

            <div className="contact-action">
              <span className="contact-label">EMAIL</span>
              <a href="mailto:hello@taskflow.com">mounikaperisetti84@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container">
        <div className="cta-section">
          <div>
            <span className="section-label">GET STARTED</span>
            <h2 className="section-title mt-2">
              Bring your training workflow together.
            </h2>
            <p className="section-text mt-3 mb-0">
              Create your TaskFlow workspace and start organizing your
              training operations.
            </p>
          </div>

          <a href="/register" className="btn taskflow-primary-btn">
            Create your workspace
          </a>
        </div>
      </section>

     
    </div>
  );
}

export default Home;