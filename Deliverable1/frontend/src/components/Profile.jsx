import React from "react";
function Profile({ user, isOwnProfile = false }) {
    return (
        <section className="profile">
            <img
                src={user.profileImage}
                alt={`${user.name}'s profile`}
                className="profile-image"
            />

            <div className="profile-information">
                <h1>{user.name}</h1>

                <p>@{user.username}</p>

                <p>{user.role}</p>

                <p>{user.pronouns}</p>

                <p>{user.bio}</p>

                <div className="profile-stats">
                    <span>
                        {user.followers} Followers
                    </span>

                    <span>
                        {user.following} Following
                    </span>

                    <span>
                        {user.artworks} Artworks
                    </span>
                </div>

                {!isOwnProfile && (
                    <div className="friendship-actions">
                        <button type="button">
                            Add Friend
                        </button>

                        <button type="button">
                            Message
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Profile;