import { useState,useEffect } from "react";
import NavBar from "./component/NavBar/NavBar";
import Main from "./component/Main/Main";
import NavLogo from "./component/NavBar/NavLogo";
import Search from "./component/NavBar/Search";
import NavResult from "./component/NavBar/NavResult";

import MovieList from "./component/Main/MovieList";
import Box from "./component/Main/Box";
import WatchSummary from "./component/Main/WatchSummary";
import WatchMovieList from "./component/Main/WatchMovieList";
import Loader from "./component/Loader/Loader";
import Error from "./component/Error/Error";
import SelectedMovies from "./component/Main/SelectedMovies";
import { useMovies } from "./useMovies";
import {useLocalStorageState} from "./useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  //const [movies, setMovies] = useState([]);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [selectedId,setSelectedId]=useState(null);
  //const [isLoading,setIsLoading]=useState(false);
  //const [error,setError]=useState("");
  const KEY='f9a1d4e3'
  
 // const [watched, setWatched] = useState([]);
  // const [watched, setWatched] = useState(function(){
  //   const storedValue=localStorage.getItem('watched')
  //   return JSON.parse(storedValue);
  // });
  
useEffect(() => {
  document.title = "usePopcorn";
}, []);

  
  function handleSelectMovie(id){
    setSelectedId((selectedId)=>(id===selectedId?null:id));
   
  }
  function handleCloseMoves(){
    setSelectedId(null);
  }

  function handleAddWatched(movie){
    setWatched(watched=>[...watched,movie]);
    //localStorage.setItem('watched',JSON.stringify([...watched,movie]));
  }
  
  function handleDeleteWatched(id){
    setWatched(watched=>watched.filter(movie=>movie.imdbId!==id));
  }

  // useEffect(function(){
  //   localStorage.setItem('watched',JSON.stringify(watched));
  // },[watched])

  const {movies,isLoading,error}=useMovies(query,handleCloseMoves);

  const [watched,setWatched]=useLocalStorageState([],"watched");
  
  // useEffect(function(){
  //   const controller=new AbortController();
  //   async function fetchMovies(){
  //   try{
  //     setIsLoading(true);
  //      setError("");
  //   const res=await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal:controller.signal});

  //   if(!res.ok) throw new Error("something went wrong");

  //   const data=await res.json()

  //   if(data.Response==="False"){
  //     //throw new Error(data.Error||"Movies are not found");
  //      throw new Error(`Movies are not found. (${data.Error})`);
  //   }
  //   setMovies(data.Search);
  //   setError("");
   
  //   }catch(err){    
  //     if(err.name!=="AbortError"){
  //       setError(err?.message||"Movies is not Found");
  //     }
  //   }finally{
  //      setIsLoading(false);
  //   }
  // }
  // if(query.length<3){
  //   setMovies([]);
  //   setError("");
  //   return;
  // }

  // handleCloseMoves();
  // fetchMovies();
  
  // return function(){
  //   controller.abort();
  // }
  // } ,[query]);

  
  return (
    <>
      <NavBar>
        <NavLogo/>
        <Search  query={query} setQuery={setQuery}/>
        <NavResult  movies={movies}/>
      </NavBar>
      <Main >
          <Box isOpen={isOpen1} setIsOpen={setIsOpen1} >
           {/* {isLoading?<Loader/>: <MovieList movies={movies} />} */}
           {isLoading && <Loader/>}
           {!isLoading&& !error &&  <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />}
            {error && <Error message={error}/>}
          </Box>
          <Box isOpen={isOpen2} setIsOpen={setIsOpen2}>
           {
            selectedId?<SelectedMovies selectedId={selectedId} onCloseMovie={handleCloseMoves} watched={watched} onAddWatched={handleAddWatched} KEY={KEY} />:
            <> <WatchSummary watched={watched} />
            <WatchMovieList watched={watched} onDeleteWatch={handleDeleteWatched} /></>}
          </Box>
      </Main>
    </>
  );
}
