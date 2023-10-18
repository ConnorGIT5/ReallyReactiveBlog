import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const [title, setTitle] = useState(""); // creating a bit of state
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("mario");
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = (e) => {
      e.preventDefault(); // prevents the page from refreshing
      const blog = { title, body, author };

      setIsPending(true);  

      fetch("http://localhost:8000/blogs", {    // makes a post request to this http endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog)
      }).then(() => {
        console.log("New blog added");
        setIsPending(false);
        // navigate(-1); // goes back to the last page
        navigate("/");
      })

    }

    return (

      <div className="create">

        <h2>Add a New Blog</h2>

        <form onSubmit={handleSubmit}>
            <label>Blog title:</label>

            <input
             type="text"
             required
             value={title}
             onChange={(e) => setTitle(e.target.value)} />
            

            <label>Blog body:</label>

            <textarea
             required
             value = {body} 
             onChange={(e) => setBody(e.target.value)}
            ></textarea>

            <label>Blog author:</label>

            <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                >
                <option value="mario">mario</option>
                <option value="yoshi">yoshi</option>
                
            </select>

            { !isPending && <button>Add blog</button> }
            { isPending && <button disabled >Adding blog</button> }

            <p>Title: { title }</p>
            <p>{ body }</p>
            <p>By: { author }</p>
        </form>

      </div>
      
    );
  }
   
  export default Create;
  