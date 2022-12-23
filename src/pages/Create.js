import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import supabase from "../server/supabaseClient"

const Create = () => {
  const navigate = useNavigate()

  const [author, setAuthor] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  async function handleSubmit (e) {
    e.preventDefault()

    if (!author || !method || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { data, error } = await supabase
      .from('blogs')
      .insert([{ author, method, rating }])

    if (error) {
      setFormError('Please fill in all the fields correctly.')
    }
    if (data) {
      setFormError(null)
    }
    navigate('/')
  } // handleSubmit

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="author">Author:</label>
        <input 
          type="text" 
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea 
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button type="submit">Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create