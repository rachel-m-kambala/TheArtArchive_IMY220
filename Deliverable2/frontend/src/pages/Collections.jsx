import React from "react";
import Header from "../components/Header.jsx";
import PostPreview from "../components/PostPreview.jsx";
import posts from "../data/posts.js";

function Collections() {
    const collections = [
        {
            name: "Mindscape Unbound",
            description:
                "Digital artwork inspired by imagination and dreams.",
            posts: posts.filter((post) =>
                post.albums.includes("Worlds of Imagination")
            )
        },
        {
            name: "Golden Hour",
            description:
                "Illustration inspired by the natural world.",
            posts: posts.filter((post) =>
                post.albums.includes("Paintings")
            )
        },
        {
            name: "City Twilight Reverie",
            description:
                "Visual stories from cities around the world.",
            posts: posts.filter((post) =>
                post.albums.includes("Cityscapes")
            )
        }
    ];

    return (
        <>
            <Header />

            <main className="page">
                <section className="page-heading">
                    <h1>Collections</h1>

                    <p>
                        Browse artwork grouped into creative
                        collections.
                    </p>
                </section>

                {collections.map((collection) => (
                    <section
                        className="collection"
                        key={collection.name}
                    >
                        <h2>{collection.name}</h2>

                        <p>{collection.description}</p>

                        <div className="post-grid">
                            {collection.posts.map((post) => (
                                <PostPreview
                                    key={post.id}
                                    post={post}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </>
    );
}

export default Collections;