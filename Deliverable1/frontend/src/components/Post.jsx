import PostImage from "./PostImage";

function Post({ post }) {
    return (
        <article className="single-post">
            <PostImage
                image={post.image}
                title={post.title}
            />

            <div className="single-post-information">
                <p className="post-category">
                    {post.category}
                </p>

                <h1>{post.title}</h1>

                <p>
                    By: <strong>{post.artistName}</strong>
                </p>

                <p>{post.description}</p>

                <div className="hashtags">
                    {post.hashtags.map((hashtag) => (
                        <button
                            key={hashtag}
                            type="button"
                        >
                            {hashtag}
                        </button>
                    ))}
                </div>

                <div className="post-meta">
                    <span>
                        {post.appreciates} Appreciations
                    </span>

                    <span>
                        {post.comments} Comments
                    </span>
                </div>

                <p>
                    Albums: {post.albums.join(", ")}
                </p>
            </div>
        </article>
    );
}

export default Post;