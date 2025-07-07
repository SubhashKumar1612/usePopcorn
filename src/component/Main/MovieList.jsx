import Movie from "./Movie";

function MovieList({movies,handleSelectMovie}){
 
    return(
         <ul className="list list-movies">
              {movies?.map((movie) => (
                <Movie movie={movie} handleSelectMovie={handleSelectMovie} key={movie.imdbID} />
              ))}
            </ul>
    )
}

export default MovieList;