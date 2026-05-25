import NavItem from "./NavItem.jsx";
import {navItems} from "../utils/constants.js";

const Navigation = () => {
    return (
        <nav className="fixed top-2 left-12 flex gap-3">

                {navItems.map(item => <NavItem itemTitle={item} key={item}/>)}
        </nav>
    )
}

export default Navigation;