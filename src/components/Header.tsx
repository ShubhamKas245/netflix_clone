import { Link, NavLink } from "react-router-dom";
import netflixLogo from "../assets/Netflix_Logo_RGB.png";

const Header = () => {
  const isActiveLink = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "font-semibold text-white" : undefined;
  };

  return (
    <header className="border-b-2 py-3">
      <nav className="grid grid-cols-[200px_auto_200px] items-center gap-4 ">
        <section className="h-12">
          <Link to="/browser">
            <img
              src={netflixLogo}
              alt="netflix Logo"
              className="h-full w-full object-contain object-center mx-12 "
            />
          </Link>
        </section>
        <section className="text-sm text-gray-300 font-thin">
          <ul className="flex items-center gap-2">
            <li>
              <NavLink to="/browser" className={isActiveLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/browser/genre/movies" className={isActiveLink}>
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink to="/browser/genre" className={isActiveLink}>
                Tv Shows
              </NavLink>
            </li>
            <li>
              <NavLink to="/latest" className={isActiveLink}>
                New & Popular
              </NavLink>
            </li>
          </ul>
        </section>
        <section>user_icon user_info</section>
      </nav>
    </header>
  );
};

export default Header;
