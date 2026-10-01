//Rachel Kambala u23559129
import React from "react";
import { Link } from "react-router-dom";

function PostPreview({ post }) {
    return (
        <article className="post-preview">

            <Link to={`/post/${post._id}`}>
                <img
                    className="post-preview-image"
                    src={post.image}
                    alt={post.title}
                />
            </Link>

            <div className="post-preview-content">

                <p className="post-category">
                    {post.hashtags?.join(" ")}
                </p>

                <h3>
                    <Link to={`/post/${post._id}`}>
                        {post.title}
                    </Link>
                </h3>

                <p>
                    By: {post.artistName}
                </p>

                <p className="post-description">
                    {post.description}
                </p>

                <div className="hashtags">
                    {post.hashtags?.map((tag) => (
                        <span key={tag}>
                            {tag}
                        </span>
                    ))}
                </div>

            </div>

        </article>
    );
}

export default PostPreview;