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

                <section className="album-grid">

                    {albums.map((album) => (
                        <article
                            className="album-card"
                            key={album._id}
                        >

                            <h2>{album.name}</h2>

                            <p>
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

                            <p>
                                {album.posts?.length || 0}
                                {" "}artworks
                            </p>

                            <Link
                                to={`/album/${album._id}`}
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