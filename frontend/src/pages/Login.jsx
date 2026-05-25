import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    alert(res.data.message);

    window.location.href = "/dashboard";
  };

  return (
    <div className="auth-page">
      <section className="auth-shell">
        <div className="auth-panel auth-intro">
          <span className="eyebrow">MERN Blog Studio</span>
          <h1>Welcome back to your writing space.</h1>
          <p>
            Sign in to shape drafts, publish ideas, and keep your blog moving.
          </p>
        </div>

        <div className="auth-panel auth-card">
          <div className="form-heading">
            <span className="eyebrow">Login</span>
            <h2>Continue writing</h2>
          </div>

          <form onSubmit={handleLogin} className="stacked-form">
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button className="primary-button" type="submit">
              Login
            </button>
          </form>

          <p className="switch-auth">
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
