function PostImage({ image, title }) {
    return (
        <figure className="post-image-container">
            <img
                src={image}
                alt={title}
                className="post-image"
            />

            <figcaption>
                {title}
            </figcaption>
        </figure>
    );
}

export default PostImage;