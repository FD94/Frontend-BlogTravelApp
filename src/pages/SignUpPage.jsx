import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate, Link } from "react-router-dom";

function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const { logInUser } = useContext(AuthContext);
    const navigate = useNavigate();


    const inputStyle = "w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all duration-200 placeholder:text-slate-400";
    const labelStyle = "block text-sm font-semibold text-slate-700 mb-1.5 ml-1";

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5005/auth/signup", { email, password, name });
            const token = response.data.authToken;
            logInUser(token);
            navigate("/");
        } catch (error) {
            const errorDescription = error.response?.data?.message || "Error al crear la cuenta";
            setErrorMessage(errorDescription);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-brand-light px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-soft border border-slate-100 p-8 md:p-10">


                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-brand-dark tracking-tight">Create your account</h2>
                    <p className="text-slate-500 mt-2">Join our community today</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">

                    <div>
                        <label className={labelStyle}>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className={inputStyle}
                            required
                        />
                    </div>
                    <div>
                        <label className={labelStyle}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className={inputStyle}
                            required
                        />
                    </div>

                    <div>
                        <label className={labelStyle}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className={inputStyle}
                            required
                        />
                    </div>




                    {errorMessage && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
                            ⚠️ {errorMessage}
                        </div>
                    )}


                    <button
                        type="submit"
                        className="w-full bg-brand-primary text-slate-600 font-bold py-3.5 rounded-xl hover:bg-brand-secondary transition-all duration-300 shadow-lg shadow-brand-primary/25 active:scale-[0.98] cursor-pointer"
                    >
                        Create profile
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center ">
                    <p className="text-slate-600 text-sm">
                        Do you already have an account?{" "}
                        <Link to="/login" className="text-brand-primary font-bold hover:underline">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;