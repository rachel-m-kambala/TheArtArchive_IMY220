import React from "react";
import { useState } from "react";

function Comments({ comments }) {
    const [newComment, setNewComment] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (!newComment.trim()) {
            return;
        }

        console.log("New comment:", newComment);

        setNewComment("");
    }

    return (
        <section className="comments">
            <h2>Comments</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="new-comment">
                    Add a comment
                </label>

                <textarea
                    id="new-comment"
                    value={newComment}
                    onChange={(event) =>
                        setNewComment(event.target.value)
                    }
                    placeholder="Share your thoughts..."
                    required
                />

                <button type="submit">
                    Comment
                </button>
            </form>

            <div className="comment-list">
                {comments.map((comment) => (
                    <article
                        className="comment"
                        key={comment.id}
                    >
                        <h3>@{comment.username}</h3>

                        <p>{comment.text}</p>

                        <small>{comment.date}</small>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Comments;