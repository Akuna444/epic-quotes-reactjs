import classes from "./MainHeader.module.css";
import { NavLink } from "react-router-dom";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/welcome">
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/product">
              Product
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainHeader;
