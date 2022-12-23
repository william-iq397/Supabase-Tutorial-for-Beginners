import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import supabase from "../../server/supabaseClient"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Update = ({toastUpdated}) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [author, setAuthor] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [errorForm, setErrorForm] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (!author || !method || !rating) {
      setErrorForm('Please fill in all fields')
      return
    }

    const { data, error } = await supabase
      .from('blogs')
      .update({ author, method, rating })
      .eq('id', id)
      
      
    if (error) {
      setErrorForm(error.message)
      return
    }

    if (data) {
      setErrorForm(null)
    }
    navigate(`/`)
    toastUpdated()
}

  async function fetchBlogs() {
    const { data, error } = await supabase
      .from('blogs')
      .select()
      .eq('id', id)
      .single()


    if (error) {
      setError(error.message)
      navigate('/')
      return
    }

    if (data) {
      setAuthor(data.author)
      setMethod(data.method)
      setRating(data.rating)
    }
   }

  useEffect(() => {
    fetchBlogs()
  }, [id, navigate])

  return (
    <div className="page update">
      <ToastContainer/>
      <form onSubmit={handleSubmit}>
        <label>Author</label>
        <input type="text" name="author" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <label>Method</label>
        <input type="text" name="method" id="method" value={method} onChange={(e) => setMethod(e.target.value)} />
        <label>Rating</label>
        <input type="text" name="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} />
        <button type="submit">Update</button>
      </form>

      {errorForm && <div className="error">{errorForm}</div>}
    </div>
  )
}

export default Update