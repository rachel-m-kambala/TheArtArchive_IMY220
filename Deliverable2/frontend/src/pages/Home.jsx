//Rachel Kambala u23559129
import React, { useEffect, useState } from "react";

import Header from "../components/Header.jsx";
import SearchInput from "../components/SearchInput.jsx";
import Feed from "../components/Feed.jsx";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPosts() {
            try {
                const response = await fetch(
                    `${API_URL}/api/posts`
                );

                if (!response.ok) {
                    throw new Error(
                        "Unable to retrieve posts."
                    );
                }

                const data = await response.json();

                setPosts(data);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    return (
        <>
            <Header />

            <main className="page">

                <section className="page-heading">
                    <p className="eyebrow">
                        THE ART ARCHIVE
                    </p>

                    <h1>Gallery</h1>

                    <p>
                        Explore the latest activity from
                        your creative community.
                    </p>
                </section>

                <SearchInput />

                {loading && (
                    <p>Loading artwork...</p>
                )}

                {error && (
                    <p className="form-error">
                        {error}
                    </p>
                )}

                {!loading && !error && (
                    <Feed
                        posts={posts}
                        title="Global Showcase"
                    />
                )}

            </main>
        </>
    );
}

export default Home;