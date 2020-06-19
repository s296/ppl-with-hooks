import React, { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

function SinglePost(props){
    
        // console.log(props);
        const [Id,setId] = useState("");
        const [UserComment,setUserComment] = useState( localStorage.getItem('username'));
        const [UserName,setUserName] = useState("unknown");
        const [Category,setCategory] = useState("pet");
        const [Description,setDescription] = useState("unknown");
        const [Date,setDate] = useState("01 jan 0000");
        const [Time,setTime] = useState("12:00 am");
        const [Image,setImage] = useState("feat_img3.png");
        const [Check,setCheck] = useState(-1);
        const [Comment,setComment] = useState("");
        const [Comments,setComments] = useState(0);
        const [Likes,setLikes] = useState(0);
        const [TotalLikes,setTotalLikes] = useState(0);
        const [GetComments,setGetComments] = useState([{user:'bharat',comment:'add comment'}]);
        const [TotalComments,setTotalComments] = useState(1);

    
    function logout() {
      localStorage.clear("token");
      setCheck(Check);     // just use for re render
    }

    function comment(event) {
      setComment(event.target.value)
    }

    function addComment () {
      if(Id != ""){
          
          Axios.post('http://localhost:3001/post/addcomment',this.state).then((resp) => {
              console.log("fetch data with comment",resp.data);
              fetchData();
          })
      }
    }

    function likes() {
      if(Date !="01 jan 0000"){
          Axios.post('http://localhost:3001/post/addlike',this.state).then((resp) => {
            console.log("fetch data of like",resp.data[0].likes);
            setTotalLikes(resp.data[0].TotalLikes);
          })
      }  
    } 

    async function fetchData() {


      await Axios.post('http://localhost:3001/post/singlepost',{I}).then((resp) =>{
        console.log("fetchdata",resp.data[0]);
        setTotalLikes(resp.data[0].totallikes);
        setUserName(resp.data[0].username);
        setCategory(resp.data[0].category);
        setDescription(resp.data[0].description);
        setDate(resp.data[0].date);
        setTime(resp.data[0].time);
        setImage(resp.data[0].image);
        setGetComments(resp.data[0].comment);
        setTotalComments(resp.data[0].comment.length);
      })  
    }

   useEffect(() => {
     console.log(props.location.post);
      if (props.location.post != undefined){
          setId(props.location.post._id);
         
      }
   })


    if(localStorage.getItem('Email') == null){
      return <Redirect to="/login" path={true}/>
    }
  
    // if (Check  <=0 && props.location.post != undefined){
      if (props.location.post != undefined){
      setCheck(Check+1);
      Check==1 ? fetchData(): console.log("no fetch data"); 
      }

      
    return (
      <div>
        <Header></Header>
        {/* <h1 onClick={logout} style={{float:'right'}}> Log Out </h1> */}
        
        <div className="container">
          <div className="content">
            <div className="content_rgt">
            <div className="rght_btn"> <a onClick={logout} style={{textAlign:"center"}}> Log Out </a>  </div>
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#">Upload Post</a> </div>
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#">Invite Friends</a> </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div className="rght_list">
                  <ul>
                    <li><a href="#"><span className="list_icon"><img src="images/icon_01.png" alt="up" /></span> CATS</a></li>
                    <li><a href="#"><span className="list_icon"><img src="images/icon_02.png" alt="up" /></span> Dogs</a></li>
                    <li><a href="#"><span className="list_icon"><img src="images/icon_03.png" alt="up" /></span> Birds</a></li>
                    <li><a href="#"><span className="list_icon"><img src="images/icon_04.png" alt="up" /></span> Rabbit</a></li>
                    <li><a href="#"><span className="list_icon"><img src="images/icon_05.png" alt="up" /></span> Others</a></li>
                  </ul>
                </div>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img1.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img2.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img3.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">{Description}</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">{Category}</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft"><img src="images/img_6.png" />{UserName}</div>
                    <div className="div_top_rgt"><span className="span_date">{Date}</span><span className="span_time">{Time}</span></div>
                  </div>
                  <div className="div_image"><img src={"http://localhost:3001/"+Image} alt="pet" /></div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                        <li><a href="#" onClick={Likes}><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>{TotalLikes} Likes</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{TotalComments} Comments</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contnt_3">
                <ul>
                  {
                    GetComments.map((data,index)=>(
                    <li>
                      <div className="list_image">
                        <div className="image_sec"><img src="images/post_img.png" /></div>
                          <div className="image_name">{data.user}</div>
                      </div>
                      <div className="list_info">
                        {data.Comment}
                      </div>
                      <input type="button" defaultValue="Reply" className="orng_btn" />
                    </li> 
                    ))
                  }
                  <li>
                    <div className="list_image">
                      <div className="image_sec"><img src="images/post_img.png" /></div>
                <div className="image_name">{UserComment}</div>
                    </div>
                    
                    <div className="cmnt_div">
                      <input type="text" placeholder="Add a Comment" className="cmnt_bx" onChange={comment}/>
                      <input type="submit" className="sub_bttn" defaultValue="Submit Comment" onClick={addComment}/>
                    </div>
                  </li>
                </ul>
                <div className="view_div"><a href="#">View more</a></div>
              </div>
            </div>
          </div>
          <div className="clear" />
        </div>
        <Footer></Footer>
      </div>
          );
        
}

export default SinglePost;