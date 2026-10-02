//Rachel Kambala u23559129
import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import PostPreview from "../components/PostPreview.jsx";

function Exhibits() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPosts() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch("/api/posts");

                if (!response.ok) {
                    throw new Error(
                        "Failed to retrieve posts."
                    );
                }

                const data = await response.json();

                console.log(
                    "Exhibits posts from MongoDB:",
                    data
                );

                setPosts(data);
            } catch (error) {
                console.error(
                    "Error loading exhibits:",
                    error
                );

                setError(
                    "Unable to load exhibits."
                );
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    const hasHashtag = (post, hashtag) => {
        return (post.hashtags || []).some(
            (tag) =>
                tag
                    .replace("#", "")
                    .toLowerCase() ===
                hashtag.toLowerCase()
        );
    };

    const exhibits = [
        {
            title: "Digital Dreams",
            description:
                "Explore imaginative digital artwork from emerging creators.",
            posts: posts.filter(
                (post) =>
                    hasHashtag(
                        post,
                        "DigitalArt"
                    ) ||
                    hasHashtag(
                        post,
                        "Illustration"
                    ) ||
                    hasHashtag(
                        post,
                        "SurrealArt"
                    ) ||
                    hasHashtag(
                        post,
                        "ConceptArt"
                    )
            )
        },
        {
            title: "Through the Lens",
            description:
                "A collection of photography capturing people, places and moments.",
            posts: posts.filter(
                (post) =>
                    hasHashtag(
                        post,
                        "Photography"
                    ) ||
                    hasHashtag(
                        post,
                        "Landscape"
                    ) ||
                    hasHashtag(
                        post,
                        "Travel"
                    )
            )
        }
    ];

    if (loading) {
        return (
            <>
                <Header />

                <main className="page">
                    <p>Loading exhibits...</p>
                </main>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />

                <main className="page">
                    <p>{error}</p>
                </main>
            </>
        );
    }

    return (
        <>
            <Header />

            <main className="page">
                <section className="page-heading">
                    <h1>Exhibits</h1>

                    <p>
                        Curated collections from across the Archive.
                    </p>
                </section>

                {exhibits.map((exhibit) => (
                    <section
                        className="exhibit"
                        key={exhibit.title}
                    >
                        <h2>
                            {exhibit.title}
                        </h2>

                        <p>
                            {exhibit.description}
                        </p>

                        {exhibit.posts.length === 0 ? (
                            <p>
                                No artworks in this exhibit yet.
                            </p>
                        ) : (
                            <div className="post-grid">
                                {exhibit.posts.map(
                                    (post) => (
                                        <PostPreview
                                            key={post._id}
                                            post={post}
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </section>
                ))}
            </main>
        </>
    );
}

export default Exhibits;