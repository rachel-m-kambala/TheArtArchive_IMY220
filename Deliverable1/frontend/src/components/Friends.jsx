import React from "react";
import ProfilePreview from "./ProfilePreview";

function Friends({ friends }) {
    return (
        <aside className="friends">
            <h2>Friends</h2>

            {friends.length === 0 ? (
                <p>No friends to display.</p>
            ) : (
                <div className="friends-list">
                    {friends.map((friend) => (
                        <ProfilePreview
                            key={friend.id}
                            user={friend}
                        />
                    ))}
                </div>
            )}
        </aside>
    );
}

export default Friends;