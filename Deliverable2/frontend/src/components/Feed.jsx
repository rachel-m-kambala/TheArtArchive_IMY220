//Rachel Kambala u23559129
import React from "react";
import PostPreview from "./PostPreview.jsx";

function Feed({
    posts,
    title
}) {

    return (
        <section className="feed">
            <div className="feed-header">

                <h2>{title}</h2>

            </div>

            {posts.length === 0 ? (
                <p>
                    No artwork to display yet.
                </p>
            ) : (
                <div className="feed-grid">
                    {posts.map((post) => (

                        <PostPreview
                            key={post._id}
                            post={post}
                        />
                    ))}
                </div>
            )}

        </section>
    );
}


export default Feed;