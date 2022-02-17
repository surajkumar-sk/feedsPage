import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { Post } from "./post/Post";
import { GetAPI, PostAPI } from '../requests/api';

const useStyles =makeStyles({
  root:{
    zIndex:1,
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    marginTop:40,
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  endMsg:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    fontSize:'1.2rem',
    textAlign:'center'
  }
});

export function Posts(){
  console.log('posts');
  const UserName = window.localStorage.getItem('username')
  const [data,setData] = useState([]);
  const [ParamData, setParamData] = useState({});
  const [twitch , settwitch] = useState(false);
  const [startLoading, setStartLoading] = useState(false);

  async function loadData(){
    let resData = await GetAPI("http://localhost:8000/posts",{LastEvalValue:JSON.stringify(ParamData)});
    setData([...data, ...resData.data]);
    resData.LastEvalValue ? setParamData(resData.LastEvalValue) : setParamData({})
  }

  useEffect(()=>{
    loadData();
    let scriptURL = 'https://embed.twitch.tv/embed/v1.js';
      
    const script = document.createElement('script');
    script.setAttribute('src',scriptURL);
    script.addEventListener('load', () => {
      settwitch(true);
    }); 
    document.body.appendChild(script);

    return () =>{
      script.removeEventListener('load', () => {
        settwitch(true);
      }); 
    }
  },[]);

  useEffect(()=>{
    if(startLoading && JSON.stringify(ParamData) != '{}'){
      loadData();
      setStartLoading(false);  
    }
  },[startLoading])

  useEffect(()=>{
    document.addEventListener('scroll',()=>{
      if((parseInt(window.scrollY)+parseInt(window.innerHeight)) == (parseInt(document.body.scrollHeight))){
        setStartLoading(true);
      }
    });
    return () =>{
      document.removeEventListener('scroll',()=>{
        if((parseInt(window.scrollY)+parseInt(window.innerHeight)) == (parseInt(document.body.scrollHeight) - 700)){
          setStartLoading(true);
        }
      });
    }
  },[])

  const classes = useStyles();
  return(
    <div className={classes.root}>
      {UserName && twitch && data.map((d) =>{
        return <Post twitch={twitch} key={d.id} data={d} />
      })}
      {JSON.stringify(ParamData) != '{}' ? <p className={classes.endMsg}>Loading ...</p> : <p className={classes.endMsg}>You Reached an End ;-)</p>} 
    </div>
    
  )
}