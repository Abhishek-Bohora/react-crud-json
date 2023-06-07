import { useState, useEffect } from "react";
import { addCourse, getCourses, updateCourse, deleteCourse } from "./api";

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
      <div>
        <h1 className="bg-red-200">About Javascript libraries</h1>
        <input
          type="text"
          placeholder="Search posts"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          placeholder="Enter title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={selectedPostId === null ? addPost : updatePost}>
          {selectedPostId === null ? "Add Post" : "Update Post"}
        </button>
        {filteredPosts.map((post) => (
          <div key={post.id}>
            <h2>{post.name}</h2>
            <p>{post.description}</p>
            <button
              onClick={() => editPost(post.id)}
              className="btn btn-primary"
            >
              edit
            </button>
            <button onClick={() => deletePost(post.id)}>delete</button>
          </div>
        ))}{" "}
      </div>{" "}
    </>
  );
}
export default App;
