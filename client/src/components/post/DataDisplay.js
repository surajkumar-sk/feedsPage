import { makeStyles } from "@material-ui/styles";
import { useEffect, useRef, useState } from "react";
import { CommentButton } from "./CommentButton";
import { LikeButton } from "./LikeButton";
import { UserComment } from "./UserComment";
import { Comments } from "./Comments";

const useStyles =makeStyles({
  root:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start'
  },
  btns:{
    position:"relative",
    top:0,
    left:0,
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    borderBottom: (props) => props.display ? '1px solid #000000' : 'none'
  },
  CommentSection:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start'
  }
})

export function DataDisplay(props){
  const [liked, setLiked] = useState(false);
  const [display , setDisplay] = useState(false);
  const [userComments, setUserComments] = useState([]);
  const [commentCount , setCommentCount]  = useState(props.data.comments.length);
  const [commentDislayNo , setCommentDislayNo] = useState(0);
  const [fetchedComments,setFetchedComments] = useState(props.data.comments)
  const username = window.localStorage.getItem('username');
  const classes = useStyles({display});
  useEffect(()=>{
    props.data.likes.map((like) =>{
      if(like == username){
        setLiked(true);
        setDisplay(true);
      }
    })
  },[])


  return(
    <div className={classes.root}>
      <div className={classes.btns}>
        <LikeButton setCommentDislayNo={setCommentDislayNo} id={props.data.id} count={props.data.likes.length} liked = {liked} setLiked={setLiked} display={display} setDisplay={setDisplay}/>
        <CommentButton setCommentDislayNo={setCommentDislayNo}  display={display} setDisplay={setDisplay} count={commentCount}/>
      </div>
      <div className={classes.CommentSection}>
        <UserComment id={props.data.id} setCommentCount={setCommentCount} commentCount={commentCount} setUserComments={setUserComments} userComments={userComments} display={display} />
        <Comments setCommentCount={setCommentCount} commentCount={commentCount} id={props.data.id} fetchedComments={fetchedComments} setFetchedComments={setFetchedComments} commentDislayNo={commentDislayNo} setCommentDislayNo={setCommentDislayNo} comments={props.data.comments} userComments={userComments} setUserComments={setUserComments}  display={display} />
      </div>
      {/* { display ?
          <UserComment /> : <div></div>          
      }
      { display ? 
        <Comments /> : <div></div>} */}
      
    </div>
  )
}