//Rachel Kambala u23559129
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

function EditAlbum({
    album,
    setAlbum,
    posts,
    setPosts
}) {
    const navigate = useNavigate();

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    const [name, setName] =
        useState(album.name);

    const [description, setDescription] =
        useState(album.description);

    const [hashtags, setHashtags] =
        useState(album.hashtags?.join(" ") || "");

    const [userPosts, setUserPosts] = useState([]);

    const [selectedPost, setSelectedPost] =
        useState("");

    const [message, setMessage] = useState("");


    useEffect(() => {

        async function loadUserPosts() {

            try {

                const response = await fetch(
                    `${API_URL}/api/posts`
                );

                const data = await response.json();

                if (!response.ok) {
                    return;
                }

                const ownPosts = data.filter(
                    (post) =>
                        String(post.userId) ===
                        String(currentUser._id)
                );

                setUserPosts(ownPosts);

            } catch (error) {

                console.error(error);

            }
        }

        if (currentUser) {
            loadUserPosts();
        }

    }, [currentUser?._id]);


    async function handleUpdate(event) {

        event.preventDefault();

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
                `${API_URL}/api/albums/${album._id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        description,
                        hashtags: hashtagArray
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to update album."
                );
            }

            setAlbum(data);

            setMessage(
                "Album updated successfully."
            );

        } catch (error) {

            setMessage(error.message);

        }
    }


    async function handleAddPost() {

        if (!selectedPost) {
            setMessage(
                "Please select an artwork."
            );

            return;
        }

        try {

            const response = await fetch(
                `${API_URL}/api/albums/${album._id}/posts`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        postId: selectedPost
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to add artwork."
                );
            }

            setAlbum(data);

            const addedPost =
                userPosts.find(
                    (post) =>
                        post._id === selectedPost
                );

            if (
                addedPost &&
                !posts.some(
                    (post) =>
                        post._id === selectedPost
                )
            ) {
                setPosts((previous) => [
                    ...previous,
                    addedPost
                ]);
            }

            setSelectedPost("");

            setMessage(
                "Artwork added to album."
            );

        } catch (error) {

            setMessage(error.message);

        }
    }


    async function handleRemovePost(postId) {

        try {

            const response = await fetch(
                `${API_URL}/api/albums/${album._id}/posts/${postId}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to remove artwork."
                );
            }

            setAlbum(data);

            setPosts((previous) =>
                previous.filter(
                    (post) =>
                        post._id !== postId
                )
            );

            setMessage(
                "Artwork removed from album."
            );

        } catch (error) {

            setMessage(error.message);

        }
    }


    async function handleDeleteAlbum() {

        const confirmed = window.confirm(
            "Are you sure you want to delete this album?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const response = await fetch(
                `${API_URL}/api/albums/${album._id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to delete album."
                );
            }

            navigate("/collections");

        } catch (error) {

            setMessage(error.message);

        }
    }


    return (
        <section className="edit-album">

            <h2>Manage Album</h2>


            <form onSubmit={handleUpdate}>

                <label htmlFor="album-edit-name">
                    Album Name
                </label>

                <input
                    id="album-edit-name"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                />


                <label htmlFor="album-edit-description">
                    Description
                </label>

                <textarea
                    id="album-edit-description"
                    value={description}
                    onChange={(event) =>
                        setDescription(
                            event.target.value
                        )
                    }
                />


                <label htmlFor="album-edit-hashtags">
                    Hashtags
                </label>

                <input
                    id="album-edit-hashtags"
                    value={hashtags}
                    onChange={(event) =>
                        setHashtags(
                            event.target.value
                        )
                    }
                />


                <button type="submit">
                    Save Changes
                </button>

            </form>


            <div className="album-post-manager">

                <h3>Add Artwork</h3>

                <select
                    value={selectedPost}
                    onChange={(event) =>
                        setSelectedPost(
                            event.target.value
                        )
                    }
                >

                    <option value="">
                        Select one of your artworks
                    </option>

                    {userPosts.map((post) => (

                        <option
                            key={post._id}
                            value={post._id}
                        >
                            {post.title}
                        </option>

                    ))}

                </select>

                <button
                    type="button"
                    onClick={handleAddPost}
                >
                    Add to Album
                </button>

            </div>


            {posts.length > 0 && (

                <div className="album-current-posts">

                    <h3>Artwork in this Album</h3>

                    {posts.map((post) => (

                        <div key={post._id}>

                            <span>
                                {post.title}
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    handleRemovePost(
                                        post._id
                                    )
                                }
                            >
                                Remove
                            </button>

                        </div>

                    ))}

                </div>

            )}


            <button
                type="button"
                onClick={handleDeleteAlbum}
            >
                Delete Album
            </button>


            {message && <p>{message}</p>}

        </section>
    );
}

export default EditAlbum;