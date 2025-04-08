import { Link } from "react-router-dom";
import logo from "../../assets/family_feud_logo.png";
import style from "./menu.module.css";
function Menu() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={logo} alt="logo" />
      <div className="flex flex-col items-center justify-center mt-4 w-full">
        <Link to="/play" className={style.btn}>
          <button>Join</button>
        </Link>

        <Link to="/host" className={style.btn}>
          <button>Host</button>
        </Link>

        <Link to="/spectate" className={style.btn}>
          <button>Spectate</button>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
