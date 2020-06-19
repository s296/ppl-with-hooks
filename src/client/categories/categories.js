import React ,{useState}from 'react';
// import Category from './category.js';
import Axios from 'axios';

function Categories (props){
   
  const [GetCategories,setGetCategories] = useState([]);


        let morecategories=[];
        if(props.GetCategories != GetCategories && props.GetCategories.__proto__.constructor==Array && props.GetCategories[0]!=[1]){
            setGetCategories( {getcategories:props.getcategories});
            // console.log("categories",this.props.getcategories);
        }
        // console.log("render categories",this.state.getcategories);

        
        if(GetCategories.length!=0 ){
          morecategories = GetCategories.map((category,index)=> (
            <li>
              <a href="#" onClick={() => props.postOfCategory(category.Category)}>
                <span className="list_icon">
                  <img src={"http://localhost:3001/"+category.mage} alt="up" />
                </span>{" "}
                {category.Category}
              </a>
            </li>                    
          ))
        }
        

        return(
            // <li>category</li>
        // <div> {category()} </div>
        <ul> 
              <li  >
                <a href="#" onClick={() => props.postOfCategory("Cats")}>
                  <span className="list_icon">
                    <img src="images/icon_01.png" alt="up" />
                  </span>{" "}
                  CATS
                </a>
              </li>
              <li>
                <a href="#" onClick={() => props.postOfCategory("Dogs")}>
                  <span className="list_icon">
                    <img src="images/icon_02.png" alt="up" />
                  </span>{" "}
                  Dogs
                </a>
              </li>
              <li>
                <a href="#" onClick={() => props.postOfCategory("Birds")}>
                  <span className="list_icon">
                    <img src="images/icon_03.png" alt="up" />
                  </span>{" "}
                  Birds
                </a>
              </li>
              <li>
                <a href="#" onClick={() => props.postOfCategory("Rabbits")}>
                  <span className="list_icon">
                    <img src="images/icon_04.png" alt="up" />
                  </span>{" "}
                  Rabbits
                </a>
              </li>
            {/* {console.log(this.state.getcategories,"this.state.categories")} */}
            

            {morecategories}
                
            <li>
                <a href="#" onClick={() => props.postOfCategory("Others")}>
                  <span className="list_icon">
                    <img src="images/icon_05.png" alt="up" />
                  </span>{" "}
                  Others
                </a>
            </li>
        </ul>
        );

    
}

export default Categories;