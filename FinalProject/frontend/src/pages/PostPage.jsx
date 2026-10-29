//Rachel Kambala u23559129
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header.jsx";
import EditPost from "../components/EditPost.jsx";
import Comments from "../components/Comments.jsx";
import ReportPost from "../components/ReportPost.jsx";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

function PostPage() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    useEffect(() => {
        async function loadPost() {
            try {
                const response = await fetch(
                    `${API_URL}/api/posts/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Unable to retrieve post."
                    );
                }

                setPost(data);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        }

        loadPost();

    }, [id]);

    if (loading) {
        return <p>Loading post...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!post) {
        return <p>Post not found.</p>;
    }

    const isCreator =
        currentUser &&
        String(currentUser._id) === String(post.userId);

    return (
        <>
            <Header />

            <main className="page">

                <article className="single-post">

                    <figure className="post-image-container">
                        <img
                            className="post-image"
                            src={post.image}
                            alt={post.title}
                        />
                    </figure>

                    <section className="single-post-information">

                        <h1>{post.title}</h1>

                        <p>
                            By {post.artistName}
                        </p>

                        <p>{post.description}</p>

                        <div className="hashtags">
                            {post.hashtags?.map((tag) => (
                                <span key={tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>

                    </section>

                </article>

                {isCreator && (
                    <EditPost
                        post={post}
                        setPost={setPost}
                    />
                )}
                {!isCreator && (
                    <ReportPost
                        postId={post._id}
                    />
                )}

                <Comments
                    postId={post._id}
                />
            </main>
        </>
    );
}

export default PostPage;