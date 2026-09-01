import { useState } from "react";

function EditPost({ post }) {
    const [description, setDescription] = useState(
        post.description
    );

    const [hashtags, setHashtags] = useState(
        post.hashtags.join(" ")
    );

    function handleSubmit(event) {
        event.preventDefault();

        console.log({
            description,
            hashtags
        });

        alert("Artwork information updated.");
    }

    return (
        <section className="edit-post">
            <h2>Edit Artwork</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="edit-description">
                    Description
                </label>

                <textarea
                    id="edit-description"
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                    required
                />

                <label htmlFor="edit-hashtags">
                    Hashtags
                </label>

                <input
                    id="edit-hashtags"
                    value={hashtags}
                    onChange={(event) =>
                        setHashtags(event.target.value)
                    }
                />

                <p>
                    The artwork image cannot be changed.
                </p>

                <button type="submit">
                    Save Artwork
                </button>
            </form>
        </section>
    );
}

export default EditPost;