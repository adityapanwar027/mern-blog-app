import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [image, setImage] = useState(null);
const [blogs, setBlogs] = useState([]);

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("token");

  const fetchBlogs = async () => {
    const res = await axios.get("https://mern-blog-backened-fke2bxe0bqdvcyf8.southeastasia-01.azurewebsites.net/api/blogs");
    setBlogs(res.data);
  };

  const createBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData();

formData.append("title", title);
formData.append("content", content);
formData.append("image", image);

await axios.post(
  "https://mern-blog-backened-fke2bxe0bqdvcyf8.southeastasia-01.azurewebsites.net/api/blogs",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

alert("Blog created");

setTitle("");
setContent("");
setImage(null);
fetchBlogs();
  };

  const startEdit = (blog) => {
    setEditId(blog._id);
    setIsEditing(true);
    setTitle(blog.title);
    setContent(blog.content);
  };

  const updateBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData();

formData.append("title", title);
formData.append("content", content);
formData.append("image", image);

await axios.put(
  `https://mern-blog-backened-fke2bxe0bqdvcyf8.southeastasia-01.azurewebsites.net/api/blogs${editId}`,
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    alert("Blog updated");

    setTitle("");
setContent("");
setImage(null);
setEditId(null);
setIsEditing(false);

fetchBlogs();
  };

  const deleteBlog = async (id) => {
    await axios.delete(`https://mern-blog-backened-fke2bxe0bqdvcyf8.southeastasia-01.azurewebsites.net/api/blogs${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Blog deleted");
    fetchBlogs();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBlogs();
  }, []);

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Blog Command Center</h1>
          <p>Draft, update, and manage your stories from one focused workspace.</p>
        </div>

        <button className="ghost-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-grid">
        <section className="editor-panel">
          <div className="section-heading">
            <span className="eyebrow">{isEditing ? "Editing" : "New Post"}</span>
            <h2>{isEditing ? "Refine your blog" : "Write something fresh"}</h2>
          </div>

         <form onSubmit={isEditing ? updateBlog : createBlog} className="stacked-form">
  <label>
    Title
    <input
      type="text"
      placeholder="Enter title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />
  </label>

  <label>
    Content
    <textarea
      placeholder="Enter content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      required
    />
  </label>

  <label>
    Image
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setImage(e.target.files[0])}
    />
  </label>

  <button className="primary-button" type="submit">
    {isEditing ? "Update Blog" : "Create Blog"}
  </button>
</form>
        </section>

        <section className="blogs-panel">
          <div className="section-heading blog-list-heading">
            <div>
              <span className="eyebrow">Library</span>
              <h2>All Blogs</h2>
            </div>
            <span className="blog-count">{blogs.length} posts</span>
          </div>

          <div className="blog-list">
            {blogs.map((blog) => (
              <article className="blog-card" key={blog._id}>

                <div>
  {blog.image && (
  <img
    src={blog.image}
    alt={blog.title}
    style={{
      width: "100%",
      maxHeight: "250px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "10px",
    }}
  />
)}
  <h3>{blog.title}</h3>
  <p>{blog.content}</p>
</div>

                <div className="blog-footer">
                  <small>By {blog.author?.name || "Unknown author"}</small>

                  <div className="button-row">
                    <button className="soft-button" onClick={() => startEdit(blog)}>
                      Edit
                    </button>

                    <button className="danger-button" onClick={() => deleteBlog(blog._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
