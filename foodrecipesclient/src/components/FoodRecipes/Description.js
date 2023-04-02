import React, { useState , useEffect} from 'react'
import styles from './Description.module.css'
import Navbar from '../Navbar/Navbar'

const Description = () => {

  const [recipe,setRecipe] = useState({
        recipeName:'',
        cuisine:'',
        cookingTime:'',
        imageURL:'',
        ingredients:'',
        method:''
  })

  const path = window.location.pathname
  const array = path.split("/")
  const id = array[2]
  console.log(id)

  const getData = async() => {
    const data = await fetch("https://localhost:7020/api/Recipes/" + id, {
      method: "GET",
      // mode : "cors",
      // credentials : "same-origin",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*"
      }
    })
    const res = await data.json();
    console.log(res)
    setRecipe(res)
  }

  useEffect(() => {
    setTimeout(() => {
      getData()
    }, 1000)
  }, [])

  return (
    <div>
      <Navbar/>
       <div className={styles.dbox}>
        <div className={styles.dimage}>
          <img src={recipe.imageURL} alt="No"/>
        </div>
        <div className={styles.dtext}>
          <h4 className={styles.dh4}>Recipe Name: {recipe.recipeName}</h4> 
          <h6>Cuisine: {recipe.cuisine}</h6>
          <h6>Cooking Time: {recipe.cookingTime} mins</h6>
          <h6>Ingredients: {recipe.ingredients}</h6><br/>
          <p>Method: {recipe.method}</p>
        </div>
    </div>
    </div>
  )
}

export default Description
