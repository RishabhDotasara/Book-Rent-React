import React, { useContext, useState } from 'react'
import "./admin.css"
import loadingContext from '../contexts/LoadingContext'
import { ImSpinner3 } from 'react-icons/im'
import {useNavigate} from 'react-router-dom'


export default function AddBook() {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [tags, setTags] = useState([])
    const [description, setDescription] = useState('')
    const [imageUrl, setImage] = useState('')
    const {loading,setLoading,SERVER_URL} = useContext(loadingContext)

    const navigate = useNavigate()

    // console.log(`${SERVER_URL}/admin/book`)
    const addBook = (e) => {
        e.preventDefault();
        if (!title || !author || !category || !price || !tags || !description || !imageUrl) {
            alert('Please fill all the fields')
            return
        }
        setLoading(true)
        const book = { title, author, category, price, tags, description, imageUrl };
        //create a request to the server to add the book
        fetch(`${SERVER_URL}/admin/book`, {
            method:"POST",
            body:JSON.stringify(book),
            headers:{
                'Content-Type':'application/json', 
                'Authorization':`Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.error)
                {
                    console.log(data.error)
                }
            else 
                {
                    console.log(data)
                    navigate("/")
                    setLoading(false)
                }
        })
    }


  return (
    <>
        <form className="block-admin book-block">
            <h1 className="admin-heading">Add Book</h1>
            <input type="text" placeholder='Title'  required onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
            <input type="text" placeholder='Author'  required onChange={(e)=>{setAuthor(e.target.value)}} value={author}/>
            <input type="text" placeholder='category'  required onChange={(e)=>{setCategory(e.target.value)}} value={category}/>
            <input type="number" placeholder='price'  required onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
            <input type="text" placeholder='tags'  required onChange={(e)=>{setTags(e.target.value.split(" "))}}/>
            <input type="text" placeholder='image link'  required onChange={(e)=>{setImage(e.target.value)}} value={imageUrl}/>
            <textarea name="description" id="description" placeholder='Description' required onChange={(e)=>{setDescription(e.target.value)}} value={description}></textarea>
            <button className='btn' type='submit' onClick={(e)=>{addBook(e)}}>
                Add
                {loading && <ImSpinner3 className={loading ? "spinner" : "spinner hide"}/>}
            </button>
        </form>
    </>
  )
}
