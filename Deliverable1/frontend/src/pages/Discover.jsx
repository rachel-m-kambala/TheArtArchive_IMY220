import React from "react";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import PostPreview from "../components/PostPreview";
import ProfilePreview from "../components/ProfilePreview";
import posts from "../data/posts";
import users from "../data/users";

function Discover() {
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

                <section>
                    <h2>Featured Artwork</h2>

                    <div className="post-grid">
                        {posts.map((post) => (
                            <PostPreview
                                key={post.id}
                                post={post}
                            />
                        ))}
                    </div>
                </section>

                <section>
                    <h2>Artist of the Week</h2>

                    <ProfilePreview user={users[2]} />
                </section>
            </main>
        </>
    );
}

export default Discover;