import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Moment from 'moment';
import Header from './header';
import Footer from './footer';
import Posts from './posts/posts';
import Categories from './categories/categories';
import AddSelectCategories from './categories/AddSelectCategories';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';


function Timeline (props){
    
      
            const [UserName, setUserName] = useState(localStorage.getItem('username'));
            // const [Category, setCategory] = useState(0);
            const [Category, setCategory] = useState("doggy");
            const [Description,setDescription] = useState("");
            const [Date,setDate]  = useState("");
            const [Time,setTime]  = useState("");
            const [PostImage,setPostImage] = useState("");
            const [GetPosts,setGetPosts] = useState({});
            const [GetCategories,setGetCategories] = useState({});
            const [NewCategory,setNewCategory]  = useState("");
            const [CategoryImage,setCategoryImage] = useState("")
            const [OneTime,setOneTime] = useState(0);
    

    function logout(){
      localStorage.clear();
      setTime(Time); // just use for re render
    }
    
    function onSelectChange(event){
        setCategory(event.target.value);
        // console.log(event.target.value);
    }
    
    function  onDescriptionChange (event) {
        setDescription(event.target.value);
        // console.log(event.target.value);
    }
    
    function onFileChange (event) {
        setPostImage(event.target.files[0]);
        // console.log("post image",PostImage);
    }

    function checkBeforeUploadPost() {
      let back =true;
      if ( Category == 0){
        document.querySelector('#categoryRequired').style.display="inline";
        back = false;
      }else{
          document.querySelector('#categoryRequired').style.display="none";
      }

      if ( Description === ''){
        document.querySelector('#descriptionRequired').style.display="inline";
        back = false;
      }else{
        document.querySelector('#descriptionRequired').style.display="none";
      }

      if ( PostImage === ''){
        document.querySelector('#fileRequired').style.display="inline";
        back = false;
      }else{
        document.querySelector('#fileRequired').style.display="none";
      }
      
      return back;
    }

     async function uploadPost () {
      if(checkBeforeUploadPost()){
        
        const file = new FormData(); 
        file.append('Image', PostImage);
        file.append('UserName', UserName);
        file.append('Category', Category);
        file.append('Description', Description);
        file.append('Date',Moment().format("DD MMM YYYY"));
        file.append('Time',Moment().format("hh:mm a"));
        file.append('TotalLikes',0);
        // console.log('data',file);

        Axios.post('http://localhost:3001/post/post',file).then((resp) => {
            fetchposts();
            console.log("sete",GetPosts);
        })
      } else{

      }
    }

    function onNewCategory (event) {
      setNewCategory(event.target.value);
    }

    function onCategoryImage (event) {
      setCategoryImage(event.target.files[0]);
    }

    function checkBeforeUploadAddCategory  (){
      let back = true;
      if ( NewCategory == ''){
        document.querySelector('#category1Required').style.display="inline";
        back = false;
      }else{
          document.querySelector('#category1Required').style.display="none";
      }

      if ( CategoryImage == ''){
        document.querySelector('#file1Required').style.display="inline";
        back = false;
      }else{
          document.querySelector('#file1Required').style.display="none";
      }
      return back;
    }

    function addCategory () {
      if( checkBeforeUploadAddCategory()){
        const file = new FormData();
         file.append('Category',NewCategory);
        file.append('Image',CategoryImage);
        Axios.post('http://localhost:3001/category/put',file).then((resp) => {
        console.log("category",resp.data=='',"file",file);
        if(resp.data==""){
          document.querySelector('#categoryAdded').innerText="category is already added";
        }else{
          document.querySelector('#categoryAdded').innerText="category is added";
          fetchcategories();
        }
      })
      }
    }

    async function myUpload(){
        await Axios.post('http://localhost:3001/post/myuploads',this.state).then((resp) => {
          setGetPosts(resp.data);
          console.log("myuploads",resp.data);
        })
    }

    async function postOfCategory (category){
      console.log("category",category);
      await Axios.post('http://localhost:3001/post/postofcategory',{'category':category}).then(resp => {
        setGetPosts(resp.data);
      })
    }

    function timeline() {
      fetchposts();
    }


     function fetchposts(){
       Axios.post('http://localhost:3001/post/getposts',{}).then(async(resp)=>{
        //   console.log("response data",newpost);
       setGetPosts(resp.data);
       
      // for (let j=0;j<GetPosts.length;j++){
      //   let l=0;
      //   GetPosts[j].totallikes=l;
      //   for (let i=0;i<GetPosts[j].likes.length;i++ ){
      //       GetPosts[j].likes[i].likes==1 ? l++ :l=l ;
      //       GetPosts[j].totallikes=l;
      //   }
      // }
        setUserName(localStorage.getItem('UserName'));  // just use for render
       console.log("fetchposts",GetPosts,resp.data);
       })
    }

    async function fetchcategories() {
      await  Axios.post('http://localhost:3001/category/getcategories',{}).then((resp)=>{
              
        if (resp.data.length==0){
          setGetCategories([1])
        }else{
          setGetCategories(resp.data);
        }
        console.log("fetchcategories",GetCategories);
     })
    }

    useEffect(()=>{
        
        if (OneTime==0){
          setOneTime(1);
          fetchposts();
          fetchcategories();
        }
        
    })
       
    
    // async componentDidMount(){
    //   await fetchposts();
    //   await fetchcategories();
    // }

  

        if(localStorage.getItem('Email') == null){
          return <Redirect to="/login"/>
        }

        return(
          <div>
            <Header />
  <div className="container">
    <div className="content">
      <div className="content_rgt">
      <div className="rght_btn"> 
<a onClick={logout} style={{textAlign:"center"}}> Log Out </a>  </div>
        <div className="rght_btn">
        <br/>
          {/* <p> {GetCategories.length}</p> */}
          {/*  */}
          {/* { GetCategories.length>0  ?  <AddSelectCategories selectcategories={onSelectChange} getcategories={GetCategories}></AddSelectCategories> : console.log('lengthcategories',GetCategories) } */}
          <span id="categoryRequired"> category required* </span><br/><br/>
          <input type="text" placeholder="Description" onChange={onDescriptionChange}/>
          <span id="descriptionRequired"> description required* </span><br/>
          <br/>
          <input type="file" name='file'  onChange={onFileChange} />
          <span id="fileRequired"> file required* </span><br/>
          {" "}
          <span className="rght_btn_icon">
          <img src="images/btn_iconb.png" alt="up" />
          </span>{" "}
          <span className="btn_sep">
          <img src="images/btn_sep.png" alt="sep" />
          </span>{" "}
            <a href='#'></a><button type="" onClick={uploadPost}> Upload Post  </button>
          {" "}
        </div>
        
        <div className="rght_btn">
          {" "}
          <br/>
          <input type="text" placeholder="Categories" onChange={onNewCategory}/><br/>
          <span id="category1Required"> Category Required* </span><br/>
          <input type="file" onChange={onCategoryImage}/>
          <span id="file1Required"> Image Required* </span><br/>
          <span className="rght_btn_icon">
            <img src="images/btn_icona.png" alt="up" />
          </span>{" "}
          <span className="btn_sep">
            <img src="images/btn_sep.png" alt="sep" />
          </span>{" "}
         
          <a href="#"><button type="button" onClick={addCategory}>Add Categories</button></a><br/>
          <span id="categoryAdded"></span>
          {" "}
        </div>
        <div className="rght_cate">
          <div className="rght_cate_hd" id="rght_cat_bg">
            Categories
          </div>
          <div className="rght_list">
                        {/* <Categories getcategories={this.state.getcategories}></Categories> */}
            {/* {console.log("getcategories",this.state.getcategories)} */}
              {/* { GetCategories[0] != 1  ?  <Categories GetCategories={GetCategories}></Categories> : console.log('lengthcategories',GetCategories) } */}
              {/* <Categories getcategories={GetCategories} postOfCategory={postOfCategory}></Categories> */}
             
            
          </div>
        </div>
        <div className="rght_cate">
          <div className="rght_cate_hd" id="opn_cat_bg">
            Featured
          </div>
          <div className="sub_dwn">
            <div className="feat_sec">
              <div className="feat_sec_img">
                <img src="images/feat_img1.png" alt="image" />
              </div>
              <div className="feat_txt">Lorem Ipusum Text</div>
            </div>
            <div className="feat_sec">
              <div className="feat_sec_img">
                <img src="images/feat_img2.png" alt="image" />
              </div>
              <div className="feat_txt">Lorem Ipusum Text</div>
              <div className="btm_rgt">
                <div className="btm_arc">Dogs</div>
              </div>
            </div>
            <div className="feat_sec">
              <div className="feat_sec_img">
                <img src="images/feat_img3.png" alt="image" />
              </div>
              <div className="feat_txt">Lorem Ipusum Text</div>
              <div className="btm_rgt">
                <div className="btm_arc">Rabbits</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content_lft">
        <div className="contnt_1">
          <div className="list_1">
            <ul>
              <li>
                <input type="checkbox" className="chk_bx" />
                Friends
              </li>
              <li>
                <input type="checkbox" className="chk_bx" />
                Flaged
              </li>
            </ul>
          </div>
          <div className="timeline_div">
            <div className="timeline_div1">
              <div className="profile_pic">
                <img src="images/timeline_img1.png" />
                <div className="profile_text">
                  <a href="#">Change Profile Pic</a>
                </div>
              </div>
              <div className="profile_info">
                <div className="edit_div">
                  <a href="#">
                    Edit <img src="images/timeline_img.png" />
                  </a>
                </div>
                <div className="profile_form">
                  <ul>
                    <li>
                      <div className="div_name1">Name :</div>
                      <div className="div_name2">Stefiney Gibbs</div>
                    </li>
                    <li>
                      <div className="div_name1">Sex :</div>
                      <div className="div_name2">Female</div>
                    </li>
                    <li>
                      <div className="div_name1">Description :</div>
                      <div className="div_name3">
                        This is an example of a comment. You can create as many
                        comments like this one or sub comments as you like and
                        manage all of your content inside Account.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="timeline_div2">
              <ul>
                <li>
                  <a href="#" className="active" onClick={timeline}>
                    Timeline{" "}
                  </a>
                </li>
                <li>
                  <a href="#">About </a>
                </li>
                <li>
                  <a href="#">Album</a>
                </li>
                <li>
                  <a href="#"> Pets</a>
                </li>
                <li>
                  <a href="#" onClick={myUpload}>My Uploads </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      <div> {GetPosts.length}</div>
        { GetPosts.length>0  ?  <Posts   GetPosts={GetPosts}></Posts> : console.log('length',GetPosts) }
    

      </div>
    </div>
    <div className="clear" />
  </div>
  <Footer>

  </Footer>
</div>

        );
    
  }

export default Timeline;