import { memo } from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import supabase from "../server/supabaseClient"

function Blog({ id, method, author, rating, onDelete }) {

    async function handleDelete() {
        const { data, error } = await supabase
            .from('blogs')
            .delete()
            .eq('id', id)
            .select()

        if (error) console.log('error', error)

        if (data) {
            console.log('Blog deleted')
            onDelete(id)
        }
    }

    return (
        <div className="smoothie-card">
            <h2>{method}</h2>
            <p>Written by <b>{author}</b></p>
            <p className="rating"><b>{rating}</b></p>
            <div className="buttons">
                <Link to={`/blog/${id}`}>
                    <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick={handleDelete}>delete</i>
            </div>
        </div>
    )
}

export default memo(Blog)