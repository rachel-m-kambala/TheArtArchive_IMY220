//Rachel Kambala u23559129
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header.jsx";
import CreateAlbum from "../components/CreateAlbum.jsx";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

function Collections() {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    useEffect(() => {
        async function loadAlbums() {
            try {
                const response = await fetch(
                    `${API_URL}/api/albums`
                );

                if (!response.ok) {
                    throw new Error(
                        "Unable to retrieve albums."
                    );
                }

                const data = await response.json();
                setAlbums(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadAlbums();
    }, []);

    function handleAlbumCreated(newAlbum) {
        setAlbums((previousAlbums) => [
            newAlbum,
            ...previousAlbums
        ]);
    }

    return (
        <>
            <Header />
            <main className="page">
                <section className="page-heading">
                    <p className="eyebrow">
                        THE ART ARCHIVE
                    </p>

                    <h1>Collections</h1>
                    <p>
                        Explore curated collections of
                        artwork from the community.
                    </p>
                </section>

                {currentUser && (
                    <CreateAlbum
                        currentUser={currentUser}
                        onAlbumCreated={
                            handleAlbumCreated
                        }
                    />
                )}

                {loading && (
                    <p>Loading albums...</p>
                )}

                {error && (
                    <p className="form-error">
                        {error}
                    </p>
                )}

                <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {albums.map((album) => (
                        <article
                            className="border border-[#D8D3CA] bg-white p-6 transition hover:-translate-y-1"
                            key={album._id}
                        >
                            <p className="mb-2 text-xs uppercase tracking-widest text-[#9D2E36]">
                                COLLECTION
                            </p>
                            <h2 className="mb-3 text-2xl font-semibold text-[#253247]">{album.name}</h2>
                            <p className="mb-4 leading-6 text-[#6B6B6B]">
                                {album.description}
                            </p>
                            <div className="hashtags">
                                {album.hashtags?.map(
                                    (tag) => (
                                        <span key={tag}>
                                            {tag}
                                        </span>
                                    )
                                )}

                            </div>

                            <p className="mb-5 text-sm text-[#253247]">
                                {album.posts?.length || 0}
                                {" "}artworks
                            </p>

                            <Link
                                to={`/album/${album._id}`}
                                className="text-sm font-medium uppercase tracking-wider text-[#9D2E36] hover:underline"
                            >
                                View Collection
                            </Link>

                        </article>
                    ))}

                </section>

            </main>
        </>
    );
}

export default Collections;