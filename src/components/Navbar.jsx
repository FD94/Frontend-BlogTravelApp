import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {

    const { isLoggedIn, logOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAvatarClick = () => {
        if (isLoggedIn) {
            navigate("/");
        } else {
            navigate("/login");
        }
    };

    const handleLogOut = () => {
        logOutUser()
        navigate("/");
    }

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


                    <div className="flex items-center gap-3 md:gap-4">

                        <div className="flex items-center cursor-pointer" onClick={handleAvatarClick}>
                            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 hover:ring-2 hover:ring-slate-100 transition-all"></div>
                        </div>

                        {isLoggedIn && (
                            <button
                                onClick={handleLogOut}
                                className="px-3 py-1.5 text-xs md:text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-red-600 hover:border-red-100 transition-all duration-200 flex items-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                                <span className="hidden sm:inline">LogOut</span>
                            </button>
                        )}

                    </div>

                </div>
            </nav>
        </header>
    );
};

export default Navbar;