import React , {useState} from 'react';
// import Post from './post';
import {Link} from 'react-router-dom';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

function Posts (props){
 
    const [GetPosts,setGetPosts] = useState(props.GetPosts);
    
    
    if(props.GetPosts != GetPosts){
        setGetPosts(props.GetPosts);            
    }
    console.log("posts",GetPosts);
    return(
        <p>
            {GetPosts.map((post,index) => (
                <div className="contnt_2">
                    <div className="div_a">
                        <div className="div_title">
                            {post.Description}
                        </div>
                        <div className="btm_rgt">
                            <div className="btm_arc"> {post.Category} </div>
                        </div>
                        <div className="div_top">
                            <div className="div_top_lft">
                            <img src="images/img_6.png" />
                                {post.UserName}
                            </div>
                            <div className="div_top_rgt">
                            <span className="span_date"> {post.Date} </span>
                            <span className="span_time"> {post.Time} </span>
                            </div>
                        </div>
                        <div className="div_image">
                            <Link to ={{pathname:'/singlepost',post}}>
                                <img src={"http://localhost:3001/"+post.Image} alt="pet" />
                            </Link>
                        </div>
                        <div className="div_btm">
                            <div className="btm_list">
                                <ul>
                                    <li>
                                    <a href="#">
                                        <span className="btn_icon">
                                        <img src="images/icon_001.png" alt="share" />
                                        </span>
                                        Share
                                    </a>
                                    </li>
                                    <li>
                                    <a href="#">
                                        <span className="btn_icon">
                                        <img src="images/icon_002.png" alt="share" />
                                        </span>
                                        Flag
                                    </a>
                                    </li>
                                    <li>
                                    <a href="#">
                                        <span className="btn_icon">
                                        <img src="images/icon_003.png" alt="share" />
                                        </span>
                                        {post.TotalLikes} Likes
                                    </a>
                                    </li>
                                    <li>
                                    <a href="#">
                                        <span className="btn_icon">
                                        <img src="images/icon_004.png" alt="share" />
                                        </span>
                                        {post.Comment.length} Comments
                                    </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </p>
    );
    
}

export default Posts;