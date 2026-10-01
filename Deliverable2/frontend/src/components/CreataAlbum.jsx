//Rachel Kambala u23559129
import React, { useState } from "react";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

function CreateAlbum({ currentUser, onAlbumCreated }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [hashtags, setHashtags] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        setMessage("");

        if (!name.trim() || !description.trim()) {
            setMessage(
                "Please enter an album name and description."
            );

            return;
        }

        const hashtagArray = hashtags
            .split(" ")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "")
            .map((tag) =>
                tag.startsWith("#")
                    ? tag
                    : `#${tag}`
            );

        try {
            const response = await fetch(
                `${API_URL}/api/albums`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        userId: currentUser._id,
                        name: name.trim(),
                        description: description.trim(),
                        hashtags: hashtagArray
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to create album."
                );
            }

            setName("");
            setDescription("");
            setHashtags("");

            setMessage(
                "Album created successfully."
            );

            if (onAlbumCreated) {
                onAlbumCreated(data);
            }

        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <section className="create-album">

            <h2>Create Album</h2>

            <form onSubmit={handleSubmit}>

                <label htmlFor="album-name">
                    Album Name
                </label>

                <input
                    id="album-name"
                    type="text"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                />

                <label htmlFor="album-description">
                    Description
                </label>

                <textarea
                    id="album-description"
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                />

                <label htmlFor="album-hashtags">
                    Hashtags
                </label>

                <input
                    id="album-hashtags"
                    type="text"
                    value={hashtags}
                    onChange={(event) =>
                        setHashtags(event.target.value)
                    }
                    placeholder="#digitalart #portraits"
                />

                <button type="submit">
                    Create Album
                </button>

                {message && <p>{message}</p>}

            </form>

        </section>
    );
}

export default CreateAlbum;