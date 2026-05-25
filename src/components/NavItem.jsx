import {useContext} from "react";
import {SWContext} from "../utils/context.js";

const NavItem = ({itemTitle}) => {
    const {changePage} = useContext(SWContext);

    return (
        <div onClick={() => changePage(itemTitle)}
             className="bg-danger rounded-md px-3 cursor-pointer text-center
             hover:bg-red-500 hover:text-white"
        >{itemTitle}</div>
    )
}

export default NavItem;