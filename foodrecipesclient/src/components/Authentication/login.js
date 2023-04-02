import React, { useState  } from 'react'
// import {MDBContainer, MDBCol, MDBRow, MDBBtn,MDBInput } from 'mdb-react-ui-kit';
// import { NavLink } from 'react-router-dom';
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const navigate = useNavigate()
  const [user , setUser] = useState({
    username:'',
    password:''
  })
  
  
  const setValue = ({currentTarget: input}) => {
    setUser({...user, [input.name]:input.value})
  }

  const userLogin = async(e) => {
    e.preventDefault();

    const {username, password} = user;
    console.log(user)
    if(username === "" || password === ""){
      // alert('Fill required field!!')
      toast.error("Fill required field!", {
        position: 'top-center'
    });
    }
    else{
      const data = await fetch('https://localhost:7020/api/Auth/Login', {
            method: "POST",
            withCredentials: true,
            Credentials:"include",
            headers:{
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify({
                username, password
            })
        });
        

        const res = data.json();
        console.log(data)
        console.log(res)
        res.then(function(result) {
          console.log(result.token) 
          
          if(result.status === 200){
            // const str = result.token
            // const array = str.split("/")
            // const token = array[0]
            // console.log(token)
            localStorage.setItem('usertoken', result.token)
            console.log("Doneee")
            navigate('/home')
          }
        //   else {
        //   // alert('Incorrect username or password!')
        //     toast.error("Incorrect username or password!", {
        //       position: 'top-center'
        //   });
        // }

       })
       .catch(error => {
        console.log(error)
            toast.error("Incorrect username or password!", {
               position: 'top-center'
          })
        })
        
        
        // console.log(res)

        
    }

  }


    return (
      <>
      {/* {console.log(user)} */}
       {/* <MDBContainer fluid className="p-3 my-5 h-custom">

<MDBRow>

  <MDBCol col='10' md='6'>
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample" />
  </MDBCol>

  <MDBCol col='4' md='6'>

    <div className="d-flex flex-row align-items-center justify-content-center">

      <h2>Login</h2>

      
    </div>

    <br/><br/><br/><br/><br/>
    <MDBInput wrapperClass='mb-4' name='username' value={user.username} onChange={handleChange} label='Username' id='formControlLg' type='text' size="lg"/>
    <MDBInput wrapperClass='mb-4' name='password' value={user.password} onChange={handleChange}  label='Password' id='formControlLg' type='password' size="lg"/>

    

    <div className='text-center text-md-start mt-4 pt-2'>
      <MDBBtn  type='submit'  onClick={userLogin} className="mb-0 px-5" size='lg'>Login</MDBBtn>
      <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <NavLink to='/register' className="link-danger">Register</NavLink></p>
    </div>

  </MDBCol>

</MDBRow>
</MDBContainer>
<ToastContainer /> */}

{/* <div> */}

<div className={styles.lmain}>
<div className={styles.center}>
      <h1>Login</h1>
      <form onSubmit={userLogin}>
        <div className={styles.txt_field}>
          <input type="text" name="username" onChange={setValue} value={user.username}required/>
          <span></span>
          <label>Username</label>
        </div>
        <div className={styles.txt_field}>
          <input type="password" name="password" onChange={setValue} value={user.password}required/>
          <span></span>
          <label>Password</label>
        </div>
        <button type="submit" value="Login">Login</button>
        <div className={styles.signup_link}><Link to="/register">
          Not a member? Register</Link>
        </div>
      </form>
    </div>
    </div>
      </>
    )
  }


export default Login