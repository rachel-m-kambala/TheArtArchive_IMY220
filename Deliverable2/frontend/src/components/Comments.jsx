//Rachel Kambala u23559129
import React, { useEffect, useState } from "react";

function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const currentUser = JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );
    useEffect(() => {
        async function loadComments() {
            try {
                const response =
                    await fetch(
                        `/api/comments/post/${postId}`
                    );
                const data =
                    await response.json();
                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Unable to retrieve comments."
                    );
                }
                setComments(data);
            } catch (error) {
                setError(
                    error.message
                );
            } finally {
                setLoading(false);
            }
        }
        loadComments();
    }, [postId]);

    async function handleSubmit(
        event
    ) {
        event.preventDefault();
        setError("");
        if (!currentUser) {
            setError(
                "Please log in to comment."
            );
            return;
        }
        if (!text.trim()) {
            return;
        }

        try {
            const response =
                await fetch(
                    "/api/comments",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body:
                            JSON.stringify({
                                postId,

                                userId:
                                    currentUser._id,

                                username:
                                    currentUser.username,

                                text:
                                    text.trim()
                            })
                    }
                );
            const data =
                await response.json();
            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to add comment."
                );
            }
            setComments(
                (previousComments) => [
                    data,
                    ...previousComments
                ]
            );
            setText("");
        } catch (error) {
            setError(
                error.message
            );
        }
    }

    async function handleDelete(
        commentId
    ) {
        const confirmed =
            window.confirm(
                "Delete this comment?"
            );
        if (!confirmed) {
            return;
        }
        try {
            const response =
                await fetch(
                    `/api/comments/${commentId}`,
                    {
                        method:
                            "DELETE"
                    }
                );
            const data =
                await response.json();
            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to delete comment."
                );

            }
            setComments(
                (previousComments) =>
                    previousComments.filter(
                        (comment) =>
                            comment._id !==
                            commentId
                    )
            );
        } catch (error) {

            setError(
                error.message
            );
        }
    }

    return (
        <section className="comments">
            <h2>Comments</h2>
            {currentUser ? (
                <form
                    onSubmit={
                        handleSubmit
                    }
                >
                    <textarea
                        value={text}
                        onChange={
                            (event) =>
                                setText(
                                    event
                                        .target
                                        .value
                                )
                        }
                        placeholder=
                            "Share your thoughts..."
                    />
                    <button
                        type="submit"
                    >
                        Comment
                    </button>
                </form>
            ) : (
                <p>
                    Log in to join
                    the conversation.
                </p>

            )}
            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}
            {loading ? (
                <p>
                    Loading comments...
                </p>

            ) : comments.length === 0 ? (
                <p>
                    No comments yet.
                    Be the first to comment.
                </p>
            ) : (
                <div className="comment-list">
                    {comments.map(
                        (comment) => {

                            const isOwner =
                                currentUser &&
                                String(
                                    currentUser._id
                                ) ===
                                String(
                                    comment.userId
                                );

                            return (
                                <article
                                    className="comment"
                                    key={
                                        comment._id
                                    }
                                >

                                    <strong>
                                        {
                                            comment.username
                                        }
                                    </strong>

                                    <p>
                                        {
                                            comment.text
                                        }
                                    </p>

                                    {isOwner && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(
                                                    comment._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    )}
                                </article>
                            );
                        }
                    )}
                </div>
            )}
        </section>
    );
}

export default Comments;