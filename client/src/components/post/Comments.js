import { makeStyles } from "@material-ui/styles";
import { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { PostAPI } from "../../requests/api";
import { Comment } from "./Comment";

const useStyles =makeStyles({
  root:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    height:(props) => props.display ? `auto` : '0',
    display:'flex',
    overflow:'hidden',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    transition: (props) => props.length ? 'none' : 'all 0.25s ease-in',
    paddingBottom:(props) => props.display ? 20 : '0',
    '& textarea':{
      position:'relative',
      top:0,
      left:0,
      width:'80%',
      height:50,
      borderRadius:'15px',
      border:'1px solid #000000',
      padding:'10px 5px 10px 10px',
      resize:'none'
    },
  },
  Img:{
    position:'relative',
    top:0,
    left:0,
    width:'6%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    margin:'0 3% 0 3%',
    padding:0,
    border:'none',
    backgroundColor:'#ffffff',
    cursor:'pointer',
    '&:after':{
      width:'100%',
      paddingTop:'100%',
      display:'block',
      content:"''"
    },
    "& img":{
      width:'80%',
      height:'80%',
      position:'absolute',
      top:'50%',
      left:'50%',
      transform:'translateX(-50%) translateY(-50%)'
    },
    "@media (max-width:500px)":{
      width:'15%'
    },
    "@media (max-width:320px)":{
      width:'15%'
    }
  },
  loadBtns:{
    position:"absolute",
    top:'100%',
    left:0,
    width:'100%',
    height:20,
    transform:'translateY(-100%)',
    border:'none',
    color:'#ffffff',
    backgroundColor:'#2f2f2f',
    cursor:'pointer',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  loadMoreBtn:{
    position:'relative',
    top:0,
    left:0,
    width:(props) => props.commentDislayNo ? '50%' : '100%',
    border:'none',
    color:'#ffffff',
    backgroundColor:'#2f2f2f',
    cursor:'pointer',
    display:(props)=>props.displayBtn ? 'block' : 'none',
    borderLeft:'1px solid #ffffff'
  },
  HideAllBtn:{
    position:'relative',
    top:0,
    left:0,
    width:(props)=>props.displayBtn ? '50%' : '100%',
    border:'none',
    color:'#ffffff',
    backgroundColor:'#2f2f2f',
    cursor:'pointer',
    display:(props) => props.commentDislayNo ? 'block' : 'none',    
    borderRight:'1px solid #ffffff'
  },
  
})

export function Comments(props){
  const [fetchedComments,setFetchedComments] = [props.fetchedComments,props.setFetchedComments]
  const UserName = window.localStorage.getItem('username');
  const [value, setvalue] = useState();
  const [displayBtn, setDisplayBtn] =useState(true);
  const classes = useStyles(
    {
      length:props.userComments.length,
      display:props.display,
      commentDislayNo:props.commentDislayNo,
      displayBtn
    });

  useEffect(()=>{
    if((props.commentDislayNo) >= (fetchedComments.length-1)){
      setDisplayBtn(false)
    }
  },[])
  function handleLoadMore(){
    if((props.commentDislayNo+3) >= (fetchedComments.length-1)){
      setDisplayBtn(false)
    }
    props.setCommentDislayNo(props.commentDislayNo+3);

  }
  function handleHideAll(){
    props.setCommentDislayNo(0);
    setDisplayBtn(true)
  }
  return(
    <div className={classes.root}>
      {
        props.userComments.map((comment,index)=>{
          
          return <Comment setCommentCount={props.setCommentCount} commentCount={props.commentCount} id={props.id} fetchedComments={fetchedComments} setFetchedComments={setFetchedComments} userComments={props.userComments} setUserComments={props.setUserComments} comment={props.userComments[(props.userComments.length)-1-index]} key={props.userComments[(props.userComments.length)-1-index].commentId} display={true}/>
        })
      }
      {        
        fetchedComments.map((comment,index)=>{
          if(index > props.commentDislayNo){
            return;
          }
          return <Comment setCommentCount={props.setCommentCount} commentCount={props.commentCount} id={props.id} fetchedComments={fetchedComments} setFetchedComments={setFetchedComments} userComments={props.userComments} setUserComments={props.setUserComments} comment={fetchedComments[(fetchedComments.length)-1-index]} key={fetchedComments[(fetchedComments.length)-1-index].commentId} display={true}/>
        })
      }
      
      <div className={classes.loadBtns}>
      <button onClick={handleHideAll} className={classes.HideAllBtn}>Hide All ...</button>
      <button onClick={handleLoadMore} className={classes.loadMoreBtn}>Load More ...</button>
        
      </div>
      
      
    </div>
  )
}