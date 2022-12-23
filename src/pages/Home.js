import supabase from "../server/supabaseClient"
import { useEffect, useState } from "react"
import Blog from "../components/Blog"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [blogs, setBlogs] = useState(null)
    const [error, setError] = useState(null)
    const [orderBy, setOrderBy] = useState("created_at")

    //* react to the delete event + toast
    const handleDelete = (id) => {
        setBlogs((prev) => prev.filter((blog) => blog.id !== id))
        toast('blog has been deleted succesfully', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            type: 'success'
            })
        }



    async function fetchBlogs() {
        const { data, error } = await supabase
            .from("blogs")
            .select()
            .order(orderBy, { ascending: false })

        // if there is an error, set the error state to the error
        if (error) {
            setError(error)
        }
         // if the data are returned, set the blogs state to the data 
        if (data) {
            setError(null)
            setBlogs(data)
        } 
    }

    useEffect(() => {
        fetchBlogs()
    }, [orderBy])
    
    return (
        <div className="page home">
            <ToastContainer />
            <div className="smoothies">
                <div className="order-by">
                    <button onClick={() => setOrderBy('method')}>method</button>
                    <button onClick={() => setOrderBy('created_at')}>date</button>
                    <button onClick={() => setOrderBy('rating')}>rating</button>
                </div>
                <div className="smoothie-grid">{blogs && blogs.map((blog) => <Blog key={blog.id} {...blog} onDelete={handleDelete} />)}</div>
            </div>
            {error && <p>{error.message}</p>}
        </div>
    )
}

export default Home
