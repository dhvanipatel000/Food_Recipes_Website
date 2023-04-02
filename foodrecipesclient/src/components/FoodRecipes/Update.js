import React from 'react'
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Update = () => {

    const navigate = useNavigate()
    const tokenstr = localStorage.getItem("usertoken")
    const str = tokenstr.split("/")
    const token = str[0]
    const [recipe, setRecipe] = useState({
        id : '',
        recipeName:'',
        cuisine:'',
        cookingTime:'',
        imageURL:'',
        ingredients:'',
        method:'',
        UserId:''
    })

    const setValue = ({currentTarget: input}) => {
        setRecipe({...recipe, [input.name]:input.value})
    }

    const path = window.location.pathname
    const array = path.split("/")
    const id = array[2]
    
    const getData = async() => {
        const data = await fetch("https://localhost:7020/api/Recipes/" + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        })
        const res = await data.json();
        setRecipe(res)     
    }

    const update = async(e) => {
        e.preventDefault()
        
        const { id, recipeName,cuisine , cookingTime , imageURL, ingredients, method, userId } = recipe
        let variable = JSON.stringify({
          id, recipeName,cuisine , cookingTime , imageURL, ingredients, method, userId
      });
      console.log(variable);

      let url = "https://localhost:7020/api/Recipes/" + id;
      console.log(url); 
        const data = await fetch("https://localhost:7020/api/Recipes/" + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            },
            body: JSON.stringify({
               id, recipeName,cuisine , cookingTime , imageURL, ingredients, method, userId
            })
        })
        const res = data
        console.log(res)
        if(res.status === 201){
            toast.success("Recipe Updated successfully!!" ,{
                position:"top-center"
            });
            navigate('/home')
        }
        else if (res.status === 400){
            toast.error("Something went wrong , Please try again later" , {
                position:'top-center'
            });
        }
    }

    useEffect(() => {
          getData()
    }, [])


  return (
    <div>
        <h2>Update Recipe</h2>
        <div className="form-style-2">
        <div className="form-style-2-heading">Update Recipe</div>
        <form onSubmit={update}>
        <label for="field1"><span>Recipe Name<span className="required">*</span></span><input type="text" onChange={setValue} className="input-field" name="recipeName" value={recipe.recipeName} /></label>
        <label for="field2"><span>Cuisine<span className="required">*</span></span><input type="text"onChange={setValue}  className="input-field" name="cuisine" value={recipe.cuisine}/></label>
        <label for="field3"><span>Cooking Time<span className="required">*</span></span><input type="number" onChange={setValue} className="input-field" name="cookingTime" value={recipe.cookingTime} /> <b> mins</b></label>
        <label for="field4"><span>Image URL<span className="required">*</span></span><input type="text" onChange={setValue} className="input-field" name="imageURL" value={recipe.imageURL} /></label>
        <label for="field5"><span>List of Ingredients <span className="required">*</span></span><textarea name="ingredients" onChange={setValue} className="textarea-field" value={recipe.ingredients}></textarea></label>
        <label for="field6"><span>Method<span className="required">*</span></span><textarea name="method" onChange={setValue} className="textarea-field" value={recipe.method}></textarea></label>
        <button>Update</button>
        </form>
        </div>
        <ToastContainer/></div>
  )
}

export default Update