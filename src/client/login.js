import Axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import React, { useState, useEffect } from 'react';

function Login(props) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ClassName1, setClassName1] = useState("");
    const [ClassName2, setClassName2] = useState("");
    
    
    function checkBeforeSubmit (event){
        let back = true;
        if ( Email === ''){
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

        return back;
    }

    function submitted(event){
        console.log("Submitted clicked");
        document.querySelector('#emailAndPasswordIncorrect').style.display="none";
        if (checkBeforeSubmit(event)){
            // console.log("state",this.state);
            event.preventDefault();
            Axios.post('http://localhost:3001/user/login',{Email,Password}).then((resp) => {
            if(resp.data == "" ){
                document.querySelector('#emailAndPasswordIncorrect').style.display="inline";
                console.log("Error");
            }else{
                console.log("Resp data",resp.data);
                localStorage.setItem('UserName',resp.data.UserName);
                localStorage.setItem('Email',resp.data.Email);
                // ls.set('lname',resp.data[0].lname);
                props.history.push('/timeline');
            }
        })
        }else{
            event.preventDefault();
        }
    }
    
    {console.log(localStorage.getItem('Email'))}

    if(localStorage.getItem('Email') != null){
        return <Redirect to="/timeline" path={true}/>
    } 

    return(
        <div>
            <Header/>
            
            <div className="container">
                <div className="content">
                    <div className="content_rgt">
                        <div className="login_sec">
                            <h1>Log In</h1>
                            <ul>
                                <li>
                                <span>Email-ID</span>
                                <input type="text" placeholder="Enter your email" name="email" className={ClassName1} onChange={(event)=>{setEmail(event.target.value)}} />
                                </li>
                                <li>
                                <span>Password</span>
                                <input type="text" placeholder="Enter your password" className={ClassName2} name="password" onChange={(event)=>{setPassword(event.target.value)}} />
                                </li>
                                <li>
                                <input type="checkbox" />
                                Remember Me
                                </li>
                                <li>
                                <input type="submit" defaultValue="Log In" onClick={submitted} />
                                <span id="emailAndPasswordIncorrect"> Email ID or password is incorrect </span>
                                <Link to="/forgot"> Forgot Password </Link>
                                </li>
                            </ul>
                            <div className="addtnal_acnt">
                                I do not have any account yet.<Link to="/">Create My Account Now !</Link>
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
                    <img src="images/img_9.png" alt />
                </div>
            </div>
        
            <div className="clear" />
                <Footer/>
            </div>
        </div>
    );
}


export default Login;