import React, { useState , useEffect} from 'react'
import styles from './Uploaded.module.css'
import { NavLink } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { FaPen ,FaTrash,FaEye } from "react-icons/fa";

const Uploaded = () => {
    const tokenstr = localStorage.getItem("usertoken")
    const array = tokenstr.split("/")
    const token = array[0]
    const id = array[1]

    const[recipe,setRecipe] = useState([''])
    const displayFun = async () => {
        const res = await fetch("https://localhost:7020/recipe/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }
        });
        const data = await res.json();
        setRecipe(data)
    }

    function handleDelete(id)  {
        console.log(id)
        const res = fetch("https://localhost:7020/api/Recipes/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }
        });
    }
    
    useEffect(() => {
        displayFun();    
    }, [handleDelete])

    const display = recipe.map((item) => {
        return (
            <>
            <div className={styles.ucontainer}>
                <div className={styles.umain}>
                    <div className={styles.ucard}>
                        <img className={styles.ucardimg} src = {item.imageURL} />
                        <h6 className={styles.utitle}>{item.recipeName}</h6>
                        <NavLink to={`/recipe/${item.id}`} ><button className={styles.ubtn1}>< FaEye/></button></NavLink>
                        <NavLink to={`/update/${item.id}`}><button  className={styles.ubtn2}><FaPen/></button></NavLink>
                        <button className={styles.ubtn3} value={item.id} onClick={() => handleDelete(item.id)}><FaTrash/> </button>
                    </div>
                </div>
            </div>
            </>
        )
    })


  return (
    <>
    <Navbar/>
    <div className={styles.ubody} style={{ display: "flex", flexWrap:"wrap"}}>
            {display}
        </div>
    </>
  )
}

export default Uploaded
