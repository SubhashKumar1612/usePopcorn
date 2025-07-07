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



const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isLoading,setIsLoading]=useState(false);
  const [selectedId,setSelectedId]=useState(null);
  const [error,setError]=useState("");
  const KEY='f9a1d4e3'
  const Query='interstellar'

  // useEffect(function(){
  //   console.log('A')
  // },[])

  // useEffect(function(){
  //   console.log('b')
  // })

  // useEffect(function(){
  //   console.log("D");
  //   console.log(query);
  // },[query])
  
  // console.log('c')
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
  }
  
  function handleDeleteWatched(id){
    setWatched(watched=>watched.filter(movie=>movie.imdbId!==id));
  }

  
  
  useEffect(function(){
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

  handleCloseMoves();
  fetchMovies();
  
  return function(){
    controller.abort();
  }
  } ,[query]);

  
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
            <> <WatchSummary watched={watched} tempWatchedData={tempWatchedData}/>
            <WatchMovieList watched={watched} onDeleteWatch={handleDeleteWatched} /></>}
          </Box>
      </Main>
    </>
  );
}
