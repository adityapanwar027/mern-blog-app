import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await axios.post("https://mern-blog-backened-fke2bxe0bqdvcyf8.southeastasia-01.azurewebsites.net/api/auth/signup", {
      name,
      email,
      password,
    });

    alert(res.data.message);
    window.location.href = "/";
  };

  return (
    <div className="auth-page">
      <section className="auth-shell signup-shell">
        <div className="auth-panel auth-intro">
          <span className="eyebrow">Start Publishing</span>
          <h1>Build a home for your best ideas.</h1>
          <p>
            Create your account and turn loose notes into polished blog posts.
          </p>
        </div>

        <div className="auth-panel auth-card">
          <div className="form-heading">
            <span className="eyebrow">Signup</span>
            <h2>Create account</h2>
          </div>

          <form onSubmit={handleSignup} className="stacked-form">
            <label>
              Name
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button className="primary-button" type="submit">
              Signup
            </button>
          </form>

          <p className="switch-auth">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Signup;
