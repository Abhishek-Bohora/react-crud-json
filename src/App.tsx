import { useState, useEffect } from "react";
import { addCourse, getCourses, updateCourse, deleteCourse } from "./api";
import "./App.css";

interface Post {
  id: number;
  name: string;
  description: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = !searchTerm
    ? posts
    : posts.filter((post) =>
        post.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCourses();
      setPosts(data);
    };
    fetchData();
  }, []);

  const addPost = async () => {
    const newPost = await addCourse(name, description);
    setPosts([...posts, newPost]);
    setName("");
    setDescription("");
  };

  const editPost = (id: number) => {
    const postToEdit = posts.find((post) => post.id === id);
    if (postToEdit) {
      setName(postToEdit.name);
      setDescription(postToEdit.description);
      setSelectedPostId(id);
    }
  };

  const updatePost = async () => {
    if (selectedPostId !== null) {
      const updatedPost = await updateCourse(selectedPostId, name, description);
      setPosts(
        posts.map((post) => (post.id === selectedPostId ? updatedPost : post))
      );
      setName("");
      setDescription("");
      setSelectedPostId(null);
    }
  };

  const deletePost = async (id: number) => {
    await deleteCourse(id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <>
      <div className="container">
        <h1 className="header">About Javascript libraries</h1>
        <input
          className="search-input"
          type="text"
          placeholder="Search posts"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <input
          className="title-input"
          type="text"
          placeholder="Enter title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="description-input"
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className={
            selectedPostId === null ? "add-post-button" : "update-post-button"
          }
          onClick={selectedPostId === null ? addPost : updatePost}
        >
          {selectedPostId === null ? "Add Post" : "Update Post"}
        </button>
        {filteredPosts.map((post) => (
          <div key={post.id} className="post">
            <h2>{post.name}</h2>
            <p>{post.description}</p>
            <button
              onClick={() => editPost(post.id)}
              className="edit-post-button"
            >
              edit
            </button>
            <button
              onClick={() => deletePost(post.id)}
              className="delete-post-button"
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default App;
