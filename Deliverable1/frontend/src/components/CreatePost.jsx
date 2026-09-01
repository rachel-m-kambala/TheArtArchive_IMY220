import { useState } from "react";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hashtags, setHashtags] = useState("");
    const [image, setImage] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();

        console.log({
            title,
            description,
            hashtags,
            image
        });

        alert("Artwork ready to be added to the Archive.");
    }

    return (
        <section className="create-post">
            <h2>Add Artwork</h2>

            <form onSubmit={handleSubmit}>
                <div>
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
                        required
                    />
                </div>

                <div>
                    <label htmlFor="post-image">
                        Artwork Image
                    </label>

                    <input
                        id="post-image"
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                            setImage(event.target.files[0])
                        }
                        required
                    />
                </div>

                <div>
                    <label htmlFor="post-description">
                        Description
                    </label>

                    <textarea
                        id="post-description"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label htmlFor="post-hashtags">
                        Hashtags
                    </label>

                    <input
                        id="post-hashtags"
                        type="text"
                        placeholder="#art #digitalart"
                        value={hashtags}
                        onChange={(event) =>
                            setHashtags(event.target.value)
                        }
                    />
                </div>

                <button type="submit">
                    Add to the Archive
                </button>
            </form>
        </section>
    );
}

export default CreatePost;