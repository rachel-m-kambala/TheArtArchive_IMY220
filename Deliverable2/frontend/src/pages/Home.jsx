//Rachel Kambala u23559129
import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import SearchInput from "../components/SearchInput.jsx";
import Feed from "../components/Feed.jsx";

function Home() {
    const [posts, setPosts] =
        useState([]);

    const [feedType, setFeedType] =
        useState("global");

    const [loading, setLoading] =
        useState(true);
    const [error, setError] =
        useState("");
    const currentUser = JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );
    useEffect(() => {
        async function loadPosts() {
            setLoading(true);
            setError("");
            try {
                let endpoint = "/api/posts";
                if (
                    feedType === "local" &&
                    currentUser
                ) {
                    endpoint =
                        `/api/posts/feed/local/${currentUser._id}`;

                }
                const response = await fetch(endpoint);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Unable to retrieve posts."
                    );
                }
                setPosts(data);
            } catch (error) {
                setError(
                    error.message
                );
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, [
        feedType,
        currentUser?._id
    ]);

    function showGlobalFeed() {
        setFeedType("global");
    }

    function showLocalFeed() {
        if (!currentUser) {
            setError(
                "Please log in to view your local feed."
            );
            return;
        }

        setFeedType("local");
    }

    return (
        <>
            <Header />
            <main className="page">
                <section className="page-heading">
                    <p className="eyebrow">THE ART ARCHIVE</p>

                    <h1>Gallery</h1>

                    <p>Explore activity from artists across the archive.</p>
                </section>

                <SearchInput />

                <div className="feed-toggle">
                    <button
                        type="button"
                        onClick={showLocalFeed}
                        className={feedType ==="local"? "active": ""}
                    >
                        Local
                    </button>

                    <button
                        type="button"
                        onClick={showGlobalFeed}
                        className={feedType === "global" ? "active" : "" }
                    >
                        Global
                    </button>
                </div>

                {loading && (
                    <p>Loading artwork...</p>
                )}

                {error && (
                    <p className="form-error">{error}</p>
                )}

                {!loading &&
                    !error && (
                    <Feed
                        posts={posts}
                        title={
                            feedType ===
                            "local"
                                ? "Your Community"
                                : "Global Showcase"
                        }
                    />
                )}
            </main>
        </>
    );
}


export default Home;