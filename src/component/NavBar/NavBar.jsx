import NavLogo from "./NavLogo";
import NavResult from "./NavResult";
import Search from "./Search";

function NavBar({children}){
    return (
        <nav className="nav-bar">
        {children}
      </nav>
    )
}
export default NavBar;