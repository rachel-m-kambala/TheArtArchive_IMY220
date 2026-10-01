//Rachel Kambala u23559129
import React, { useState } from "react";

import Header from "../components/Header.jsx";
import CreatePost from "../components/CreatePost.jsx";

function Studio() {
    const [posts, setPosts] = useState([]);

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    function handlePostCreated(newPost) {
        setPosts((previousPosts) => [
            newPost,
            ...previousPosts
        ]);
    }

    if (!currentUser) {
        return (
            <>
                <Header />

                <main className="page">
                    <h1>Studio</h1>

                    <p>
                        Please log in to add artwork.
                    </p>
                </main>
            </>
        );
    }

    return (
        <>
            <Header />

            <main className="page">
                <h1>Portfolio</h1>

                <CreatePost
                    currentUser={currentUser}
                    onPostCreated={handlePostCreated}
                />

            </main>
        </>
    );
}

export default Studio;