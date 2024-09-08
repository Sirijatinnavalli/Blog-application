import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 

 function Signup() {
  let { register, handleSubmit } = useForm();
  let [err,setErr]=useState('');
  let navigate=useNavigate()

  async function onFormSubmit(obj) {
    console.log(obj);
    //make http post request
    if(obj.role=='user'){
      let res=await axios.post('http://localhost:4000/user-api/register',obj)
      console.log(res)
      if(res.data.message=='User created'){
      //console.log("User registration success")
      navigate('/signin')
      setErr('')
      }
      else
      setErr(res.data.message)
    }
    if(obj.role=='author'){
      let res=await axios.post('http://localhost:4000/author-api/register',obj)
      console.log(res)
      if(res.data.message=='Author created'){
      //console.log("User registration success")
      navigate('/signin')
      setErr('')
      }
      else
      setErr(res.data.message)
      
    }
  }
  return (
    <div>

    <p className="display-1 text-info text-center">Sign Up</p>
    {/* display error message */}
    {err.length!==0 && <p className='text-danger fs-4'>{err}</p>}
    {/* user signup form */}
    <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit(onFormSubmit)}>
    <div className='mb-3'>
        <label>Register as</label>
        <div className='form-check'>
          <input type='radio' {...register("role")} id="user" className='form-check-input' value='user'></input>
          <label htmlFor='author' className='form-label'>User</label>
        </div>
        <div className='form-check'>
          <input type='radio' {...register("role")} id="author" className='form-check-input' value='author'></input>
          <label htmlFor='author' className='form-label'>Author</label>
        </div>
      </div>
      {/* username */}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="form-control"
          {...register("username")}
        />
      </div>
      {/* password */}
      <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" {...register("password")} id="password" className="form-control" />
        </div>

      {/* email */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="form-control"
          {...register("email")}
        />
      </div>
      
      {/* submit button */}
      <button type="submit" className="btn btn-success">
        Sign Up
      </button>
    </form>
  </div>
  )
 
  }
export default Signup