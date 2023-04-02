import React, { useState } from 'react'
import  "./AddRecipe.modules.css";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const AddRecipe = () => {
    
    const tokenstr = localStorage.getItem("usertoken")
    const array = tokenstr.split("/")
    const token = array[0]
    const userid = array[1]
    const navigate = useNavigate()
    const [recipe , setRecipe] = useState({
        recipeName:'',
        cuisine:'',
        cookingTime:'',
        imageURL:'',
        ingredients:'',
        method:''
    })

    const setValue = ({currentTarget: input}) => {
        setRecipe({...recipe, [input.name]:input.value})
    }

    const addRecipe = async(e) =>{
        e.preventDefault();
        const {recipeName, cuisine,cookingTime,imageURL,ingredients,method} = recipe;
        console.log(recipe)
        if(recipeName === "" || cuisine === "" || cookingTime === "" || imageURL === "" || ingredients === "" || method === ""){
          toast.error("Fill required field!", {
            position: 'top-center'
        });
        }
        else{
          const data = await fetch('https://localhost:7020/api/Recipes', {
                method: "POST",
                withCredentials: true,
                Credentials:"include",
                headers:{
                    'accept': "text/plain",
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `bearer ${token}`
                },
                body:JSON.stringify({
                    recipeName, cuisine,cookingTime,imageURL,ingredients,method,userid
                })
            });
        
    
            const res = data;
            console.log(res)
            if(res.status === 201){
              // alert('Blog added successfully!')
              toast.success("Recipe added successfully!", {
                position: 'top-center'
              });
              navigate('/home')
            }
            else if(res.status === 400){
              toast.error("Unauthorized!", {
                position: 'top-center'
            });
            }
        }
    }

    
      

    return (
      <div>
        <h2>Add New Recipe</h2>
        <div className="form-style-2">
            <div className="form-style-2-heading">Add meaningful recipe</div>
            <form>
            <label for="field1"><span>Recipe Name<span className="required">*</span></span><input type="text" onChange={setValue} className="input-field" name="recipeName"  /></label>
            <label for="field2"><span>Cuisine<span className="required">*</span></span><input type="text"onChange={setValue}  className="input-field" name="cuisine" /></label>
            <label for="field3"><span>Cooking Time<span className="required">*</span></span><input type="number" onChange={setValue} className="input-field" name="cookingTime"  /> <b> mins</b></label>
            <label for="field4"><span>Image URL<span className="required">*</span></span><input type="text" onChange={setValue} className="input-field" name="imageURL"  /></label>
            <label for="field5"><span>List of Ingredients <span className="required">*</span></span><textarea name="ingredients" onChange={setValue} className="textarea-field"></textarea></label>
            <label for="field6"><span>Method<span className="required">*</span></span><textarea name="method" onChange={setValue} className="textarea-field"></textarea></label>
            <button onClick={addRecipe} >Submit</button>
            </form>
            </div>
            <ToastContainer/>
      </div>
    )
}


export default AddRecipe
