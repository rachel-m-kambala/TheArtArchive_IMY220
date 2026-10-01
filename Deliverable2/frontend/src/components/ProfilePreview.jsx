import React from "react";
import { Link } from "react-router-dom";

function ProfilePreview({ user }) {
    return (
        <article className="profile-preview">
            <img
                src={user.profileImage}
                alt={`${user.name}'s profile`}
            />

            <div>
                <h3>{user.name}</h3>

                <p>@{user.username}</p>

                <p>{user.role}</p>

                <Link to={`/profile/${user.id}`}>
                    View Studio
                </Link>
            </div>
        </article>
    );
}

export default ProfilePreview;