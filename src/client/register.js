// import './css/bootstrap.css';
// import './css/bootstrap-responsive.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import {Redirect} from 'react-router-dom';

function Register(props){
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [ClassName1, setClassName1] = useState("");
  const [ClassName2, setClassName2] = useState("");
  const [ClassName3, setClassName3] = useState("");
  const [ClassName4, setClassName4] = useState("");
  const [ClassName5, setClassName5] = useState("");
  const [EmailRegistered, setEmailRegistered] = useState(false);
  const [TermsAndCondition, setTermsAndCondition] = useState(false);


  function termsAndCondition(event) {
    if(event.target.checked){
      setTermsAndCondition(true );
    } else{
      setTermsAndCondition(false );
    }
  }

  function checkBeforeSubmit(event) {
      let back = true;
      if ( UserName === ''){
          setClassName1('incomplete');
          back = false;
      }else{
          setClassName1("");
      }
      
      if (Password === '') {
          setClassName2('incomplete');
          back = false;
      } else {
          setClassName2("");
      }
      
      if (Email === ''){
          setClassName3('incomplete');
          back = false;
      }else {
          setClassName3("");
      }

      if(Fname === ''){
          setClassName4('incomplete');
          back = false;
      } else {
          setClassName4("");
      }

      if(Lname === ''){
          setClassName5('incomplete');
          back = false;
      } else {
          setClassName5("");
      }

      if(TermsAndCondition === false){
        document.querySelector('#tAndc').style.color="red";
        back = false;
      } else {
        document.querySelector('#tAndc').style.color="black";
      }

      return back;
  }

  function submitted(event) {
    if ( checkBeforeSubmit(event) ){
      event.preventDefault();
        //  console.log("asdd"); 
        axios.post("http://localhost:3001/user/signup",{UserName,Password,Email,Fname,Lname}).then((resp)=>{
          console.log("data",resp.data);
          if (resp.data == ''){
            //  alert("phone number is already register");
            document.querySelector('#emailRegistered').style.display="inline";
            setEmailRegistered(true);
          }
          else{
            alert("You have been successfully registered.");
            props.history.push('/login');
          }
        })           
    }else{
          event.preventDefault();
    }
  }


  if(localStorage.getItem('Email') != null){
    // return <Redirect to="/timeline"/>
  }

  return(
    <div>
      <Header/>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="register_sec">
              <h1>Create An Account</h1>
              <ul>
                <li>
                  <span>Username</span>
                  <input type="text" placeholder="Enter your username" className = {ClassName1} name="username"  onChange={(event)=>{setUserName(event.target.value)}} />
                </li>
                <li>
                  <span>Password</span>
                  <input type="text" placeholder="Enter your password" className = {ClassName2} name="password"  onChange={(event)=>{setPassword(event.target.value)}} />
                </li>
                <li>
                  <span>Email</span> <span id="emailRegistered"> Email ID is alredy registered </span>
                  <input type="text" placeholder="Enter your email" className = {ClassName3} name="email"  onChange={(event)=>{setEmail(event.target.value)}} />
                </li>
                <li>
                  <span>First Name</span>
                  <input type="text" placeholder="Enter your first name" className = {ClassName4} name="fname"  onChange={(event)=>{setFname(event.target.value)}} />
                </li>
                <li>
                  <span>Last Name</span>
                  <input type="text" placeholder="Enter your last name" className = {ClassName5} name="lname"  onChange={(event)=>{setLname(event.target.value)}} />
                </li>
                <li>
                  <input type="checkbox"  onClick={termsAndCondition}/><span id="tAndc">I agree to Term &amp; Conditions </span>
                </li>
                <li>
                  <input type="submit"  onClick={submitted} />
                </li>
              </ul>
              <div className="addtnal_acnt">
                I already have an account.<Link to="/login">Login My Account !</Link>
              </div>
            </div>
          </div>
          <div className="content_lft">
            <h1>Welcome from PPL!</h1>
            <p className="discrptn">
              There are many variations of passages of Lorem Ipsum available, but
              the majority have suffered alteration in some form, by injected
              humour, or randomised words which don't look even slightly believable.
              If you are going to use a passage of Lorem Ipsum, you need to be sure
              there isn't anything embarrassing hidden in the middle of text.{" "}
            </p>
            <img src="images/img_9.png" alt />{" "}
          </div>
        </div>
      </div>
      <div className="clear" />
      <Footer/>
    </div>
  );
}

export default Register;