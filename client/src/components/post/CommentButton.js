import { makeStyles } from "@material-ui/styles";
import { useEffect, useRef, useState } from "react";

const useStyles =makeStyles({
  root:{
    position:'relative',
    top:0,
    left:0,
    width:'50%',
    height:50,
    borderLeft:'1px solid #000000',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    cursor:'pointer',
    '& img':{
      position:'relative',
      top:'0',
      left:'0',
      width:30,
      height:30
    },
    '& p':{
      position:'relative',
      top:0,
      left:0,
      fontSize:'1.1rem',
      margin:'0 0 0 15px',
      fontFamily:"'Orbitron', sans-serif;"
    }
  }
})

export function CommentButton(props){
  const classes=useStyles();

  function handleCommentClick(){
    props.display ? props.setDisplay(false) : props.setDisplay(true)
    props.display && props.setCommentDislayNo(0)
  }

  return(
    <div onClick={handleCommentClick} className={classes.root}>
      <img src='./comment.svg' />
      <p>{props.count}</p>
    </div>
  )
}