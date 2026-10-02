import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import PostPreview from "../components/PostPreview";
import ProfilePreview from "../components/ProfilePreview";

function Discover() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDiscoverData() {
            try {
                setLoading(true);
                setError("");

                const postsResponse = await fetch(
                    "/api/posts"
                );

                if (!postsResponse.ok) {
                    throw new Error(
                        "Failed to retrieve posts."
                    );
                }

                const usersResponse = await fetch(
                    "/api/users"
                );

                if (!usersResponse.ok) {
                    throw new Error(
                        "Failed to retrieve users."
                    );
                }

                const postsData =
                    await postsResponse.json();

                const usersData =
                    await usersResponse.json();

                console.log(
                    "Discover posts:",
                    postsData
                );

                console.log(
                    "Discover users:",
                    usersData
                );

                setPosts(postsData);
                setUsers(usersData);
            } catch (error) {
                console.error(
                    "Error loading Discover:",
                    error
                );

                setError(
                    "Unable to load Discover content."
                );
            } finally {
                setLoading(false);
            }
        }

        loadDiscoverData();
    }, []);

    return (
        <>
            <Header />

            <main className="page">
                <section className="page-heading">
                    <h1>Discover</h1>

                    <p>
                        Explore artwork, artists and creative
                        collections from The Art Archive.
                    </p>
                </section>

                <SearchInput />

                <nav
                    className="category-navigation"
                    aria-label="Artwork categories"
                >
                    <button>Vector Art</button>
                    <button>Illustrations</button>
                    <button>Painting</button>
                    <button>Physical Art</button>
                    <button>Character Design</button>
                </nav>

                {loading && (
                    <p>Loading Discover...</p>
                )}

                {error && (
                    <p>{error}</p>
                )}

                {!loading && !error && (
                    <>
                        <section>
                            <h2>
                                Featured Artwork
                            </h2>

                            {posts.length === 0 ? (
                                <p>
                                    No artwork available.
                                </p>
                            ) : (
                                <div className="post-grid">
                                    {posts.map(
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

                        <section>
                            <h2>
                                Artist of the Week
                            </h2>

                            {users.length > 0 ? (
                                <ProfilePreview
                                    user={
                                        users[2] ||
                                        users[0]
                                    }
                                />
                            ) : (
                                <p>
                                    No artists available.
                                </p>
                            )}
                        </section>
                    </>
                )}
            </main>
        </>
    );
}

export default Discover;