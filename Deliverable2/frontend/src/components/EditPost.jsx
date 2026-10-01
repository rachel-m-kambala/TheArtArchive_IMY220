//Rachel Kambala u23559129
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000";

function EditPost({ post, setPost }) {
    const navigate = useNavigate();

    const [description, setDescription] =
        useState(post.description);

    const [hashtags, setHashtags] =
        useState(post.hashtags?.join(" ") || "");

    const [message, setMessage] = useState("");

    async function handleUpdate(event) {
        event.preventDefault();

        const hashtagArray = hashtags
            .split(" ")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "")
            .map((tag) =>
                tag.startsWith("#") ? tag : `#${tag}`
            );

        try {
            const response = await fetch(
                `${API_URL}/api/posts/${post._id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        description,
                        hashtags: hashtagArray
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to update post."
                );
            }

            setPost(data);

            setMessage(
                "Post updated successfully."
            );

        } catch (error) {
            setMessage(error.message);
        }
    }

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/api/posts/${post._id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to delete post."
                );
            }

            navigate("/home");

        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <section className="edit-post">

            <h2>Edit Artwork</h2>

            <form onSubmit={handleUpdate}>

                <label htmlFor="edit-description">
                    Description
                </label>

                <textarea
                    id="edit-description"
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                />

                <label htmlFor="edit-hashtags">
                    Hashtags
                </label>

                <input
                    id="edit-hashtags"
                    type="text"
                    value={hashtags}
                    onChange={(event) =>
                        setHashtags(event.target.value)
                    }
                />

                <button type="submit">
                    Save Changes
                </button>

            </form>

            <button
                type="button"
                onClick={handleDelete}
            >
                Delete Artwork
            </button>

            {message && <p>{message}</p>}

        </section>
    );
}

export default EditPost;