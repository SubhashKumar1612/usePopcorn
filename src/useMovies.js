import{useEffect,useState} from 'react'
const KEY='f9a1d4e3'

export function useMovies(query,callback){
    
const [movies, setMovies] = useState([]);
const [isLoading,setIsLoading]=useState(false);
const [error,setError]=useState("");

    useEffect(function(){
         callback?.();
    const controller=new AbortController();
    async function fetchMovies(){
    try{
      setIsLoading(true);
       setError("");
    const res=await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal:controller.signal});

    if(!res.ok) throw new Error("something went wrong");

    const data=await res.json()

    if(data.Response==="False"){
      //throw new Error(data.Error||"Movies are not found");
       throw new Error(`Movies are not found. (${data.Error})`);
    }
    setMovies(data.Search);
    setError("");
   
    }catch(err){    
      if(err.name!=="AbortError"){
        setError(err?.message||"Movies is not Found");
      }
    }finally{
       setIsLoading(false);
    }
  }
  if(query.length<3){
    setMovies([]);
    setError("");
    return;
  }

  //handleCloseMoves();
  fetchMovies();
  
  return function(){
    controller.abort();
  }
  } ,[query]);
  return {movies,isLoading,error}
}