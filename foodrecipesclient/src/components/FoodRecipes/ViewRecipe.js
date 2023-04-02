import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './ViewRecipe.module.css'

const ViewRecipe = () => {
    const[recipe,setRecipe] = useState([''])
    const displayFun = async () => {
        const res = await fetch("https://localhost:7020/api/Recipes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await res.json();
        setRecipe(data)
        console.log(data)
    }
    

    useEffect(() => {
        displayFun();
    }, [])

    const display = recipe.map((item) => {
        return (
            <>
            <div className={styles.vrcontainer} >
                <div className={styles.vrmain}>
                    <div className={styles.card} >
                        <img className={styles.cardimg} src = {item.imageURL} />
                        <h5 className={styles.vrtitle}>{item.recipeName}</h5>
                        <NavLink to={`/recipe/${item.id}`} className="vrbtn"><button className={styles.vrbtn}>View Full Recipe</button></NavLink>
                    </div>
                </div>
            </div>
            </>
        )
    })
    
    return(
        <div className={styles.vrbody} style={{ display: "flex", flexWrap:"wrap"}}>
            {display}
        </div>
    )
  
}

export default ViewRecipe
