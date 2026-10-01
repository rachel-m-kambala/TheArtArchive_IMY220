import React, { useEffect, useState } from "react";

function Comments({ comments }) {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadComments() {
            try {
                const response = await fetch(
                    `/api/comments/post/${postId}`
                );

                if (!response.ok) {
                    throw new Error(
                        "Unable to retrieve comments."
                    );
                }

                const data = await response.json();

                setComments(data);

            } catch (error) {
                console.error(error);
                setError(error.message);
            }
        }

        loadComments();
    }, [postId]);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!text.trim()) {
            return;
        }

        try {
            const currentUserId =
                localStorage.getItem("userId");

            const response = await fetch(
                "/api/comments",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        postId,
                        userId: currentUserId,
                        text: text.trim()
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Unable to create comment."
                );
            }

            const newComment =
                await response.json();

            setComments((previous) => [
                newComment,
                ...previous
            ]);

            setText("");

        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <section className="comments">
            <h2>Comments</h2>

            <form onSubmit={handleSubmit}>
                <textarea
                    value={text}
                    onChange={(event) =>
                        setText(event.target.value)
                    }
                    placeholder="Share your thoughts..."
                    required
                />

                <button type="submit">
                    Comment
                </button>
            </form>

            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}

            {comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                comments.map((comment) => (
                    <article
                        className="comment"
                        key={comment._id}
                    >
                        <p>{comment.text}</p>
                    </article>
                ))
            )}
        </section>
    );
}

export default Comments;