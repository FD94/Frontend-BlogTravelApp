import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {

    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAvatarClick = () => {
        if (isLoggedIn) {
            navigate("/profile");
        } else {
            navigate("/login");
        }
    };



    const activeClass = "text-brand-primary border-b-2 border-brand-primary";
    const inactiveClass = "text-slate-500 hover:text-brand-primary border-b-2 border-transparent transition-all";

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
            <nav className="max-w-5xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">


                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold text-brand-primary tracking-tight">
                            BlogTravel
                        </h1>
                    </div>


                    <div className="flex gap-4 md:gap-8 h-full">
                        <NavLink
                            to="/"
                            className={({ isActive }) => `flex items-center px-1 pt-1 text-sm font-medium ${isActive ? activeClass : inactiveClass}`}
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/create"
                            className={({ isActive }) => `flex items-center px-1 pt-1 text-sm font-medium ${isActive ? activeClass : inactiveClass}`}
                        >
                            <span className="md:hidden">＋</span>
                            <span className="hidden md:inline">Crear Post</span>
                        </NavLink>
                    </div>


                    <div className="flex items-center cursor-pointer" onClick={handleAvatarClick}>
                        <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300"></div>
                    </div>

                </div>
            </nav>
        </header>
    );
};

export default Navbar;