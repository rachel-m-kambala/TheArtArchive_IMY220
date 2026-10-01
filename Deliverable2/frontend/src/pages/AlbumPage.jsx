//Rachel Kambala u23559129
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header.jsx";
import PostPreview from "../components/PostPreview.jsx";
import EditAlbum from "../components/EditAlbum.jsx";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

function AlbumPage() {
    const { id } = useParams();

    const [album, setAlbum] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    useEffect(() => {

        async function loadAlbum() {
            try {

                const albumResponse = await fetch(
                    `${API_URL}/api/albums/${id}`
                );

                const albumData =
                    await albumResponse.json();

                if (!albumResponse.ok) {
                    throw new Error(
                        albumData.message ||
                        "Unable to retrieve album."
                    );
                }

                setAlbum(albumData);


                const postsResponse = await fetch(
                    `${API_URL}/api/posts`
                );

                if (!postsResponse.ok) {
                    throw new Error(
                        "Unable to retrieve posts."
                    );
                }

                const allPosts =
                    await postsResponse.json();

                const albumPosts =
                    allPosts.filter((post) =>
                        albumData.posts?.includes(
                            post._id
                        )
                    );

                setPosts(albumPosts);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);
            }
        }

        loadAlbum();

    }, [id]);


    if (loading) {
        return <p>Loading album...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!album) {
        return <p>Album not found.</p>;
    }


    const isOwner =
        currentUser &&
        String(currentUser._id) ===
        String(album.userId);


    return (
        <>
            <Header />

            <main className="page">

                <section className="page-heading">

                    <p className="eyebrow">
                        COLLECTION
                    </p>

                    <h1>{album.name}</h1>

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

                </section>


                {isOwner && (
                    <EditAlbum
                        album={album}
                        setAlbum={setAlbum}
                        posts={posts}
                        setPosts={setPosts}
                    />
                )}


                <section className="post-grid">

                    {posts.length === 0 ? (

                        <p>
                            There are currently no
                            artworks in this album.
                        </p>

                    ) : (

                        posts.map((post) => (
                            <PostPreview
                                key={post._id}
                                post={post}
                            />
                        ))

                    )}

                </section>

            </main>
        </>
    );
}

export default AlbumPage;