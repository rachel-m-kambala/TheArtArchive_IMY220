import React from "react";
import PostPreview from "./PostPreview";

function UserPosts({ posts }) {
    return (
        <section className="user-posts">
            <h2>Portfolio</h2>

            <div className="post-grid">
                {posts.map((post) => (
                    <PostPreview
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>
        </section>
    );
}

export default UserPosts;