function NavResult({movies}){
    return(
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
    )
}
export default NavResult;