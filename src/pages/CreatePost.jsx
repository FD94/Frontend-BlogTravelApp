import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [author, setAuthor] = useState("");

    const navigate = useNavigate()


    const labelStyle = "block text-sm font-semibold text-slate-700 mb-1";
    const inputStyle = "w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all duration-200 placeholder:text-slate-400";

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("authToken");

        console.log("TOKEN:", token);

        const newPost = { title, description, author, image }
        try {
            const token = localStorage.getItem("authToken")


            const response = await axios.post("http://localhost:5005/api/posts", newPost, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Post created with successfully", response.data)
            navigate("/")
        } catch (error) {

            console.error("Error to create the post", error)
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-8 px-4">
            <div className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900">Create Post</h2>
                    <p className="text-sm text-slate-500">Comparte tus proyectos con la comunidad.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    <div>
                        <label htmlFor="title" className={labelStyle}>Title</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Ej: Mi increíble App de React"
                            className={inputStyle}
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                            required
                        />
                    </div>


                    <div>
                        <label htmlFor="image" className={labelStyle}>URL de la Imagen</label>
                        <div className="relative">
                            <input
                                type="url"
                                id="image"
                                placeholder="https://example.com/imagen.jpg"
                                className={inputStyle}
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <span className="absolute right-3 top-2.5 text-slate-400">
                                🖼️
                            </span>
                        </div>
                    </div>


                    <div>
                        <label htmlFor="description" className={labelStyle}>Descripción</label>
                        <textarea
                            id="description"
                            rows="4"
                            placeholder="Cuéntanos más sobre esto..."
                            className={`${inputStyle} resize-none`}
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                            required
                        ></textarea>
                    </div>


                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                            type="submit"
                            className="flex-1 bg-brand-primary text-slate-600 font-bold py-2.5 rounded-lg hover:bg-slate-50 transition-colors shadow-md shadow-brand-primary/20 border border-slate-300"
                        >
                            Publish post
                        </button>
                        <button
                            type="button"
                            className="flex-1 bg-white text-slate-600 font-semibold py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors shadow-md shadow-brand-primary/20"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost
