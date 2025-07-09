import {useEffect,useState,useRef} from 'react'
import StarRating from '../StarRating/StarRating';
import Loader from '../Loader/Loader';
import { useKey } from '../../useKey';
const selectStyle = {
  color: "white",
  fontWeight: "bold"
};

function SelectedMovies({ selectedId ,onCloseMovie,KEY ,onAddWatched ,watched}) {
    const [movie,setMovie]=useState({});
    const [isLoading,setIsLoading]=useState(false);
    const [userRating, setUserRating] = useState(0);
    
    const countRef=useRef(0);

    useEffect(function(){
      if(userRating) countRef.current++;
    },[userRating])
    
    const isWatched=watched.some(obj=>obj.imdbId===selectedId);
    const watchedUserRating=watched.find(movie=>movie.imdbId===selectedId)?.userRating;

    const {
        Title:title,
        Year:year,
        Poster:poster,
        Runtime:runtime,
        imdbRating,
        Plot:plot,
        Released:released,
        Actors:actors,
        Director:director,
        Genre:genre
    }=movie;

    function handleAdd(){
        const newWatchMovie={
            imdbId:selectedId,
            title,
            year,
            poster,
            imdbRating:Number(imdbRating),
            runtime:Number(runtime.split(" ").at(0)),
            userRating,
            countRatingDecision:countRef.current,
        }
        onAddWatched(newWatchMovie);
        onCloseMovie();
    }
    
    
    useEffect(function(){
        async function getMovieDetails() {
            setIsLoading(true);
          const res= await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)  ;
          const data=await res.json();
          setMovie(data);
          setIsLoading(false);
        }
        getMovieDetails();
    },[selectedId])

    useEffect(function(){
        if(!title) return;
        document.title=`${title}`;
        return function(){
            document.title="usePopCorn";
        }
    },[title])
    
    useKey("Escape",onCloseMovie);
    
//     useEffect(() => {
//   function handleKeyDown(e) {
//      //console.log("Key pressed:", e.code);
//     if (e.code === "Escape") {
//       //console.log("Escape key pressed. Closing movie.");
//       onCloseMovie();
//     }
//   }

//   document.addEventListener("keydown", handleKeyDown);
//   //console.log("Escape key listener added");

//   return () => {
//     document.removeEventListener("keydown", handleKeyDown);
//     //console.log("Escape key listener removed");
//   };
// }, [onCloseMovie]);


  return (
    <div className="details" >
        {isLoading?<Loader/>:<>
        <header>
             <button className="btn btn-back" onClick={onCloseMovie}>&larr;</button>
             <img src={poster} alt={`Poster of ${movie} movie`} />
             <div className="details-overview">
                <h2>{title}</h2>
                <p>
                    {released}&bull; {runtime}
                </p>
                <p>{genre}</p>
                <p><span>⭐</span>{imdbRating} IMDB rating</p>
                
             </div>
        </header>
        <section>
            <div className="rating"> 
                {!isWatched?(<><StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                { userRating>0 &&( <button className="btn-add" onClick={handleAdd} >&#43; Add to list</button>)}</>):
                (<p>You rated with movie {watchedUserRating}</p>)} 
                {/* <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                { userRating>0 &&( <button className="btn-add" onClick={handleAdd} >&#43; Add to list</button>)} */}
            </div>
            <p><em>{plot}</em></p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
        </section>
        </>}
    </div>
  );
}

export default SelectedMovies;
