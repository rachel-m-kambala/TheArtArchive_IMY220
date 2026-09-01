import { useState } from "react";
import PostPreview from "./PostPreview";

function Feed({ posts, title }) {
    const [sortBy, setSortBy] = useState("recent");

    const sortedPosts = [...posts].sort((a, b) => {
        if (sortBy === "popular") {
            return b.comments - a.comments;
        }

        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return (
        <section className="feed">
            <div className="feed-header">
                <h2>{title}</h2>

                <label>
                    Sort by:
                    <select
                        value={sortBy}
                        onChange={(event) =>
                            setSortBy(event.target.value)
                        }
                    >
                        <option value="recent">
                            Most Recent
                        </option>

                        <option value="popular">
                            Most Popular
                        </option>
                    </select>
                </label>
            </div>

            <div className="feed-grid">
                {sortedPosts.map((post) => (
                    <PostPreview
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>
        </section>
    );
}

export default Feed;