import WatchMovie from "./WatchMovie";

function WatchMovieList({watched ,onDeleteWatch}){
    return (
         <ul className="list">
                {watched.map((movie) => (
                 <WatchMovie movie={movie} onDeleteWatch={onDeleteWatch} key={movie.imbID} />
                ))}
              </ul>
    )
}
export default WatchMovieList;