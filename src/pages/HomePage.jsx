import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState({});

    const navigate = useNavigate();

    const fetchComments = async (postId) => {
        try {
            const response = await axios.get(
                `http://localhost:5005/api/comments/${postId}`
            );

            setComments((prev) => ({
                ...prev,
                [postId]: response.data,
            }));
        } catch (error) {
            console.error("Error fetching comments", error);
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:5005/api/posts");
                setPosts(response.data);

                response.data.forEach((post) => {
                    fetchComments(post._id)
                })

            } catch (error) {
                console.error("Error fetching posts", error);
            }
        }
        fetchPosts()
    }, []);





    const handleDelete = async (postId) => {
        try {
            const token = localStorage.getItem("authToken");

            await axios.delete(
                `http://localhost:5005/api/posts/${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setPosts((prev) => prev.filter((p) => p._id !== postId));

        } catch (error) {
            console.error("Error deleting post", error);
        }
    };

    const handleAddComment = async (postId) => {
        try {
            const token = localStorage.getItem("authToken");

            const response = await axios.post(
                "http://localhost:5005/api/comments",
                {
                    text: newComment[postId],
                    post: postId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            setComments((prev) => ({
                ...prev,
                [postId]: [response.data, ...(prev[postId] || [])],
            }));


            setNewComment((prev) => ({
                ...prev,
                [postId]: "",
            }));
        } catch (error) {
            console.error("Error adding comment", error);
        }
    };




    const handleEdit = (postId) => {
        navigate(`/edit/${postId}`);
    };

    return (
        <div className="min-h-screen bg-brand-light">
            <header className="relative py-16 md:py-24 bg-gradient-to-br from-white to-slate-100 border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter mb-4">
                        Welcome to <span className="text-brand-primary italic">Blog Travel App!</span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Explore destinations, share experiences, and connect with travelers from around the world.
                    </p>
                </div>

                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-primary rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-secondary rounded-full blur-3xl"></div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-10 md:-mt-10 relative z-10">
                <div className="flex flex-col gap-8">
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className="relative bg-white border border-slate-200 rounded-xl p-6 shadow-sm group"
                        >
                            <div className="absolute top-4 right-4 flex gap-2 z-20">
                                <button
                                    onClick={() => handleEdit(post._id)}
                                    className="p-2 text-slate-400 bg-white border border-slate-100 rounded-full shadow-sm hover:bg-brand-light hover:text-brand-primary hover:border-brand-primary/20 transition-all duration-200"
                                    title="Editar post"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="p-2 text-slate-400 bg-white border border-slate-100 rounded-full shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-200"
                                    title="Eliminar post"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>

                            <h2 className="text-xl font-bold text-slate-800 pr-20">
                                {post.title}
                            </h2>

                            {post.image && (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="mt-4 rounded-lg w-full h-auto object-cover border border-slate-100 shadow-inner"
                                />
                            )}
                            <p className="text-slate-600 mt-4 leading-relaxed">
                                {post.description}
                            </p>

                            {/* Sección de Comentarios */}
                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Comentarios</h3>

                                <div className="space-y-3 mb-6">
                                    {comments[post._id]?.map((comment) => (
                                        <div key={comment._id} className="bg-slate-50 border border-slate-100 p-3 rounded-xl shadow-sm">
                                            <p className="text-xs font-bold text-brand-dark mb-1">
                                                {comment.author?.name || "Viajero anónimo"}
                                            </p>
                                            <p className="text-sm text-slate-600 leading-snug">{comment.text}</p>

                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-3">
                                    <input
                                        type="text"
                                        placeholder="Escribe un comentario..."
                                        value={newComment[post._id] || ""}
                                        onChange={(e) =>
                                            setNewComment({
                                                ...newComment,
                                                [post._id]: e.target.value,
                                            })
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200"
                                    />
                                    <button
                                        onClick={() => handleAddComment(post._id)}
                                        className="self-end bg-brand-primary text-slate-400 text-xs font-bold px-5 py-2.5 rounded-lg shadow-md shadow-brand-primary/20 hover:bg-brand-dark hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wider"
                                    >
                                        Coment
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center gap-4 my-8">
                        <span className="h-px flex-1 bg-slate-200"></span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Latest Publications</span>
                        <span className="h-px flex-1 bg-slate-200"></span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;