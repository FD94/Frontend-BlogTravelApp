const HomePage = () => {
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
                    {/* Aquí iría tu lógica actual (ej. {posts.map(...)}) 
                        Los componentes PostCard heredarán la consistencia 
                        automáticamente gracias al layout de este contenedor.
                    */}


                    <div className="flex items-center gap-4 mb-2">
                        <span className="h-px flex-1 bg-slate-200"></span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Últimas Publicaciones</span>
                        <span className="h-px flex-1 bg-slate-200"></span>
                    </div>

                    {/* Espacio reservado para los posts */}
                    <section className="space-y-6">
                        {/* Tu lógica de mapeo de posts aquí */}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default HomePage;