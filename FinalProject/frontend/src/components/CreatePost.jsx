//Rachel Kambala u23559129
import React, { useState } from "react";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

function CreatePost({ currentUser, onPostCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hashtags, setHashtags] = useState("");
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");

    function handleImageChange(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");
        if (
            !title.trim() ||
            !description.trim() ||
            !image
        ) {
            setMessage(
                "Please add a title, description and image."
            );
            return;
        }

        const hashtagArray = hashtags
            .split(" ")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "")
            .map((tag) =>
                tag.startsWith("#") ? tag : `#${tag}`
            );

        const newPost = {
            userId: currentUser._id,
            artist: currentUser.username,
            artistName:
                currentUser.name || currentUser.username,
            title: title.trim(),
            description: description.trim(),
            image,
            hashtags: hashtagArray
        };

        try {
            const response = await fetch(
                `${API_URL}/api/posts`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(newPost)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to create post."
                );
            }

            setMessage("Artwork added successfully.");

            setTitle("");
            setDescription("");
            setHashtags("");
            setImage("");

            if (onPostCreated) {
                onPostCreated(data);
            }

        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <section className="my-10 max-w-3xl border border-[#D8D3CA] bg-white p-8">
            <div className="mb-8">
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#9D2E36]">
                    YOUR STUDIO
                </p>

                <h2 className="text-3xl font-semibold text-[#253247]">
                    Add Artwork
                </h2>
            </div>

            <form onSubmit={handleSubmit}>

                <label htmlFor="post-title">
                    Artwork Title
                </label>

                <input
                    id="post-title"
                    type="text"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                />

                <label htmlFor="post-image">
                    Artwork Image
                </label>

                <input
                    id="post-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <label htmlFor="post-description">
                    Description
                </label>

                <textarea
                    id="post-description"
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                />

                <label htmlFor="post-hashtags">
                    Hashtags
                </label>

                <input
                    id="post-hashtags"
                    type="text"
                    value={hashtags}
                    onChange={(event) =>
                        setHashtags(event.target.value)
                    }
                    placeholder="#art #digitalart"
                />

                <button type="submit">
                    Add to the Archive
                </button>

                {message && <p>{message}</p>}

            </form>
        </section>
    );
}

export default CreatePost;