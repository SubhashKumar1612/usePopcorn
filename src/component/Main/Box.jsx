function Box({isOpen,setIsOpen,children}){
    return (
        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "–" : "+"}
          </button>
          {isOpen && 
           children
          }
        </div>
    )
}
export default Box;