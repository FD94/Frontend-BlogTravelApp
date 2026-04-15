import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditPostsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formDataUpdate, setFormDataUpdate] = useState({
        title: "",
        description: "",
        image: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                setFormDataUpdate(response.data)
            })
            .catch((error) => {
                console.error("Error fetching post", error);
            })
    }, [id])

    const handleChange = (e) => {
        setFormDataUpdate({
            ...formDataUpdate,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const token = localStorage.getItem("authToken");

            await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, formDataUpdate, { headers: { Authorization: `Bearer ${token}` } })
            navigate("/")
        } catch (error) {
            console.error("Error updating post", error);
        }

    }

    return (
        <>
            <div className="max-w-2xl mx-auto p-8 bg-white border border-slate-200 rounded-2xl shadow-sm mt-10">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-black text-brand-dark tracking-tighter">
                        Edit <span className="text-brand-primary italic">Post</span>
                    </h1>
                    <p className="text-slate-500 font-medium mt-2">Modify the details of your publication below.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Post Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formDataUpdate.title}
                            onChange={handleChange}
                            placeholder="Ex: My amazing trip to Bali"
                            className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 bg-slate-50/50"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={formDataUpdate.image}
                            onChange={handleChange}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 bg-slate-50/50"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Description</label>
                        <textarea
                            name="description"
                            rows="5"
                            value={formDataUpdate.description}
                            onChange={handleChange}
                            placeholder="Tell your story..."
                            className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 bg-slate-50/50 resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 bg-brand-primary text-slate-600 font-bold py-3 px-6 rounded-xl shadow-lg shadow-brand-primary/30 hover:bg-brand-dark transform hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 uppercase tracking-widest text-sm cursor-pointer"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </>

    )
}


export default EditPostsPage;