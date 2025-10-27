import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3001/api";

function BlogForm({ onSubmit, initial }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [body, setBody] = useState(initial?.body || "");

  useEffect(() => {
    setTitle(initial?.title || "");
    setBody(initial?.body || "");
  }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title required");
    onSubmit({ title: title.trim(), body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border p-2 rounded"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Content"
        className="w-full border p-2 rounded h-24"
      />
      <div className="flex gap-2">
        <button className="px-4 py-2 rounded bg-blue-600 text-white">
          Save
        </button>
      </div>
    </form>
  );
}

function BlogItem({ b, onEdit, onDelete }) {
  return (
    <div className="border p-3 rounded bg-white">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{b.title}</h3>
        <small className="text-gray-500">
          {new Date(b.createdAt).toLocaleString()}
        </small>
      </div>
      <p className="mt-2 text-gray-700">{b.body}</p>
      <div className="mt-3 flex gap-2">
        <button onClick={() => onEdit(b)} className="px-3 py-1 rounded border">
          Edit
        </button>
        <button
          onClick={() => onDelete(b._id)}
          className="px-3 py-1 rounded border text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/blogs`);
      setBlogs(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const createBlog = async (data) => {
    const res = await axios.post(`${API}/blogs`, data);
    // server adds new blog at start (unshift) — refresh list
    setBlogs((prev) => [res.data.data, ...prev]);
  };

  const updateBlog = async (id, data) => {
    console.log("Updating blog", id, data);
    const res = await axios.put(`${API}/blogs/${id}`, data);
    setBlogs((prev) => prev.map((b) => (b._id === id ? res.data.data : b)));
    setEditing(null);
  };

  const deleteBlog = async (id) => {
    if (!confirm("Delete this blog?")) return;
    await axios.delete(`${API}/blogs/${id}`);
    setBlogs((prev) => prev.filter((b) => b._id !== id)); // khi delete
  };

  const search = async (q) => {
    if (!q) {
      fetchBlogs();
      return;
    }
    console.log(q);
    const res = await axios.get(`${API}/blogs/search?title=${q}`);
    console.log("Search results", res.data);
    setBlogs(res.data.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Blog CRUD — Nhóm 4 thao tác</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="font-semibold mb-2">Create / Update (Nhóm 1 & 2)</h2>
            <BlogForm
              onSubmit={async (d) => {
                if (editing) {
                  await updateBlog(editing._id, d);
                } else await createBlog(d);
              }}
              initial={editing}
            />
          </div>

          <div>
            <h2 className="font-semibold mb-2">Search (Nhóm 4)</h2>
            <div className="flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title"
                className="w-full p-2 rounded border"
              />
              <button
                onClick={() => search(query)}
                className="px-4 rounded bg-green-600 text-white"
              >
                Search
              </button>
              <button
                onClick={() => {
                  setQuery("");
                  fetchBlogs();
                }}
                className="px-3 rounded border"
              >
                Clear
              </button>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Delete / Read (Nhóm 3)</h3>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div className="space-y-3">
                  {blogs.length === 0 && (
                    <div className="text-gray-500">No blogs</div>
                  )}
                  {blogs.map((b) => (
                    <BlogItem
                      key={b.id}
                      b={b}
                      onEdit={(x) => {
                        setEditing(x);
                        console.log(x);
                      }}
                      onDelete={deleteBlog}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
