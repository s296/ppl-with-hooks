import React,{useState} from 'react';
import AddSelectCategory from './AddSelectCategory';

function AddSelectCategories (props){
        
    const [GetCategories,setGetCategories] = useState(props.GetCategories);
    


        if(props.GetCategories != GetCategories){
            setGetCategories(props.GetCategories);
            console.log("categories",props.GetCategories);
        }
        const showcategories=[];
        const defaultcategory = () => {
            showcategories.push(<option value="0">Select Categories</option>);
            showcategories.push(<option value="Cats">CATS</option>);
            showcategories.push(<option value="Dogs">DOGS</option>);
            showcategories.push(<option value="Birds">BIRDS</option>);
            showcategories.push(<option value="Rabbits">RABBITS</option>);
            showcategories.push(<option value="Others">OTHERS</option>);
        }
        const category = () => {
            defaultcategory();
            console.log("category",GetCategories)
            // console.log("length",this.state.getcategories.length);
            if (props.GetCategories[0] != 1)
            {
                for(let i=0;i<GetCategories.length ;i++ ) {
                    // console.log("add category",this.state.getcategories[i]);
                    showcategories.push(
                        <AddSelectCategory category = {GetCategories[i].Category} ></AddSelectCategory>
                    );
                }
            }
            return showcategories
        }
        return(
            <select onChange={props.selectcategories}>  {category()} </select>
        );

    
}

export default AddSelectCategories;