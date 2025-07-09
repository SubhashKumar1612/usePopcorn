import WatchMovie from "./WatchMovie";

function WatchMovieList({watched ,onDeleteWatch}){
    return (
         <ul className="list">
                {watched.map((movie,index) => (
                 <WatchMovie movie={movie} onDeleteWatch={onDeleteWatch} key={movie.imdbID || index} />
                ))}
              </ul>
    )
}
export default WatchMovieList;