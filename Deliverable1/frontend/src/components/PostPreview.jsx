//u23559129 Rachel Kambala
import { Link } from "react-router-dom";

import { Link } from "react-router-dom";

function PostPreview({ post }) {
    return (
        <article className="post-preview">
            <Link to={`/post/${post.id}`}>
                <img
                    src={post.image}
                    alt={post.title}
                    className="post-preview-image"
                />
            </Link>

            <div className="post-preview-content">
                <div className="post-category">
                    {post.category}
                </div>

                <h3>
                    <Link to={`/post/${post.id}`}>
                        {post.title}
                    </Link>
                </h3>

                <p>
                    By:{" "}
                    <Link to={`/profile/${post.artistId}`}>
                        {post.artist}
                    </Link>
                </p>

                <p className="post-description">
                    {post.description}
                </p>

                <div className="hashtags">
                    {post.hashtags.map((hashtag) => (
                        <button
                            key={hashtag}
                            type="button"
                            onClick={() =>
                                console.log("Search:", hashtag)
                            }
                        >
                            {hashtag}
                        </button>
                    ))}
                </div>

                <div className="post-actions">
                    <button type="button">
                        Appreciate {post.appreciates}
                    </button>

                    <Link to={`/post/${post.id}`}>
                        Comments {post.comments}
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default PostPreview;