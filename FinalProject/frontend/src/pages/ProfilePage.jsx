//Rachel Kambala u23559129
import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import UserPosts from "../components/UserPosts.jsx";
import Friends from "../components/Friends.jsx";
import EditProfile from "../components/EditProfile.jsx";
import ProfilePreview from "../components/ProfilePreview.jsx";

function readCurrentUser() {
    try { return JSON.parse(localStorage.getItem("currentUser") || "null"); }
    catch { return null; }
}

function getId(value) {
    if (!value) return "";
    return String(typeof value === "object" ? value._id || value.id || "" : value);
}

function Avatar({ user, size = "large" }) {
    const sizeClass = size === "small" ? "h-12 w-12 text-sm" : "h-28 w-28 text-3xl";
    if (user.profileImage) {
        return <img src={user.profileImage} alt={`${user.name || user.username}'s profile`} className={`${sizeClass} rounded-full border border-[#D8D3CA] object-cover`} />;
    }
    const initials = (user.name || user.username || "A").trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase();
    let hash = 0;
    for (const char of String(user._id || user.username || "artist")) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    const hue = hash % 360;
    return <div role="img" aria-label={`${user.name || user.username}'s profile placeholder`} className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full border border-[#D8D3CA] font-semibold text-white`} style={{ background: `linear-gradient(135deg, hsl(${hue}, 42%, 38%), hsl(${(hue + 48) % 360}, 52%, 58%))` }}>{initials}</div>;
}

function ProfilePage() {
    const { id } = useParams();
    const storedUser = readCurrentUser();
    const signedInId = localStorage.getItem("userId") || getId(storedUser);
    const isOwnProfile = Boolean(signedInId && String(signedInId) === String(id));
    const [currentUser, setCurrentUser] = useState(storedUser);
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [userAlbums, setUserAlbums] = useState([]);
    const [friends, setFriends] = useState([]);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [friendMessage, setFriendMessage] = useState("");
    const [friendBusy, setFriendBusy] = useState(false);
    const [visiblePosts, setVisiblePosts] = useState(9);
    const [visibleAlbums, setVisibleAlbums] = useState(6);

    async function loadProfile() {
        setLoading(true);
        setError("");
        try {
            const requests = [fetch(`/api/users/${id}`), fetch("/api/posts"), fetch("/api/albums"), fetch("/api/users")];
            if (signedInId) requests.push(fetch(`/api/users/${signedInId}`));
            const responses = await Promise.all(requests);
            const parsed = await Promise.all(responses.map(async response => {
                const text = await response.text();
                let data = null;
                try { data = text ? JSON.parse(text) : null; } catch { data = null; }
                if (!response.ok) throw new Error(data?.message || `Request failed (${response.status}).`);
                return data;
            }));
            const profileUser = parsed[0];
            if (!profileUser) throw new Error("User not found.");
            const posts = Array.isArray(parsed[1]) ? parsed[1] : [];
            const albums = Array.isArray(parsed[2]) ? parsed[2] : [];
            const users = Array.isArray(parsed[3]) ? parsed[3] : [];
            const freshCurrentUser = signedInId ? parsed[4] || storedUser : storedUser;
            setUser(profileUser);
            setUserPosts(posts.filter(post => getId(post.userId) === String(id)));
            setUserAlbums(albums.filter(album => getId(album.userId) === String(id)));
            const friendIds = (profileUser.friends || []).map(getId);
            setFriends(users.filter(candidate => friendIds.includes(getId(candidate._id))));
            setCurrentUser(freshCurrentUser);
            if (freshCurrentUser) localStorage.setItem("currentUser", JSON.stringify(freshCurrentUser));
        } catch (loadError) {
            setError(loadError.message || "Unable to load profile.");
        } finally { setLoading(false); }
    }

    useEffect(() => { loadProfile(); /* load when profile id changes */ }, [id]);

    const currentFriendIds = useMemo(() => (currentUser?.friends || []).map(getId), [currentUser]);
    const targetFriends = (user?.friends || []).map(getId);
    const isFriend = currentFriendIds.includes(String(id)) || targetFriends.includes(String(signedInId));
    const hasIncomingRequest = (user?.receivedFriendRequests || []).map(getId).includes(String(signedInId));
    const hasOutgoingRequest = (user?.sentFriendRequests || []).map(getId).includes(String(signedInId));
    const hasSentRequest = (currentUser?.sentFriendRequests || []).map(getId).includes(String(id));
    const hasReceivedRequest = (currentUser?.receivedFriendRequests || []).map(getId).includes(String(id));
    const canSeeFriends = isOwnProfile || isFriend;
    const canViewFullProfile = isOwnProfile || isFriend;

    async function friendshipAction(url, method = "POST", body = {}) {
        setFriendBusy(true); setFriendMessage("");
        try {
            const response = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: method === "GET" ? undefined : JSON.stringify(body) });
            const text = await response.text();
            let data = null; try { data = text ? JSON.parse(text) : null; } catch { data = null; }
            if (!response.ok) throw new Error(data?.message || `Friendship action failed (${response.status}).`);
            await loadProfile();
            setFriendMessage(data?.message || "Friendship updated.");
        } catch (actionError) { setFriendMessage(actionError.message || "Unable to update friendship."); }
        finally { setFriendBusy(false); }
    }

    function handleProfileSaved(updatedUser) {
        setUser(updatedUser);
        setCurrentUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        setEditing(false);
    }

    if (loading) return <><Header /><main className="page"><p>Loading profile...</p></main></>;
    if (error) return <><Header /><main className="page"><p role="alert">{error}</p><button onClick={loadProfile} className="mt-4 rounded border px-4 py-2">Try again</button></main></>;
    if (!user) return <><Header /><main className="page"><p>User not found.</p></main></>;
    
return (
    <>
        <Header />

        <main className="page mx-auto max-w-7xl px-5 py-8 md:px-8">
            <section className="mb-10 border-b border-[#D8D3CA] pb-8">
                <div className="flex flex-wrap items-start gap-6">
                    <Avatar user={user} />

                    <div className="min-w-0 flex-1">
                        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#9D2E36]">
                            Artist profile
                        </p>

                        <h1 className="text-4xl font-semibold text-[#253247]">
                            {user.name || user.username}
                        </h1>

                        <p className="mt-1 text-[#6B6B6B]">
                            @{user.username}
                        </p>

                        {user.role && (
                            <p className="mt-3 font-medium text-[#253247]">
                                {user.role}
                            </p>
                        )}

                        {user.pronouns && (
                            <p className="mt-1 text-sm text-[#6B6B6B]">
                                {user.pronouns}
                            </p>
                        )}

                        {user.bio && (
                            <p className="mt-3 max-w-2xl whitespace-pre-wrap leading-7 text-[#253247]">
                                {user.bio}
                            </p>
                        )}

                        <p className="mt-4 text-sm text-[#6B6B6B]">
                            {userPosts.length}{" "}
                            {userPosts.length === 1 ? "artwork" : "artworks"}
                            {" · "}
                            {userAlbums.length}{" "}
                            {userAlbums.length === 1 ? "collection" : "collections"}
                        </p>

                        {isOwnProfile ? (
                            <button
                                type="button"
                                onClick={() => setEditing(value => !value)}
                                className="mt-4 rounded bg-[#9D2E36] px-4 py-2 text-white"
                            >
                                {editing ? "Cancel Editing" : "Edit Profile"}
                            </button>
                        ) : (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {isFriend ? (
                                    <>
                                        <span className="rounded-full bg-[#E8E4DC] px-3 py-2 text-sm text-[#253247]">
                                            Friends
                                        </span>

                                        <button
                                            disabled={friendBusy}
                                            onClick={() =>
                                                friendshipAction(
                                                    `/api/users/${signedInId}/friends/${id}`,
                                                    "DELETE"
                                                )
                                            }
                                            className="rounded border border-[#D8D3CA] px-4 py-2 text-sm"
                                        >
                                            {friendBusy ? "Please wait…" : "Remove Friend"}
                                        </button>
                                    </>
                                ) : hasReceivedRequest ? (
                                    <>
                                        <span className="rounded-full bg-[#E8E4DC] px-3 py-2 text-sm">
                                            Friend request received
                                        </span>

                                        <button
                                            disabled={friendBusy}
                                            onClick={() =>
                                                friendshipAction(
                                                    `/api/users/${signedInId}/friend-requests/${id}/accept`
                                                )
                                            }
                                            className="rounded bg-[#9D2E36] px-4 py-2 text-sm text-white"
                                        >
                                            Accept Request
                                        </button>

                                        <button
                                            disabled={friendBusy}
                                            onClick={() =>
                                                friendshipAction(
                                                    `/api/users/${signedInId}/friend-requests/${id}`,
                                                    "DELETE"
                                                )
                                            }
                                            className="rounded border px-4 py-2 text-sm"
                                        >
                                            Decline
                                        </button>
                                    </>
                                ) : hasSentRequest || hasOutgoingRequest ? (
                                    <>
                                        <span className="rounded-full bg-[#E8E4DC] px-3 py-2 text-sm">
                                            Request pending
                                        </span>

                                        <button
                                            disabled={friendBusy}
                                            onClick={() =>
                                                friendshipAction(
                                                    `/api/users/${signedInId}/friend-requests/${id}`,
                                                    "DELETE"
                                                )
                                            }
                                            className="rounded border px-4 py-2 text-sm"
                                        >
                                            Cancel Request
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        disabled={friendBusy}
                                        onClick={() =>
                                            friendshipAction(
                                                `/api/users/${id}/friend-requests`,
                                                "POST",
                                                { requesterId: signedInId }
                                            )
                                        }
                                        className="rounded bg-[#9D2E36] px-4 py-2 text-white"
                                    >
                                        {friendBusy ? "Sending…" : "Add Friend"}
                                    </button>
                                )}
                            </div>
                        )}

                        {friendMessage && (
                            <p role="status" className="mt-3 text-sm text-[#6B6B6B]">
                                {friendMessage}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {editing && isOwnProfile && (
                <EditProfile
                    user={user}
                    onSaved={handleProfileSaved}
                    onCancel={() => setEditing(false)}
                />
            )}

            <section className="my-10">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#9D2E36]">
                            Selected works
                        </p>

                        <h2 className="mt-1 text-2xl font-semibold text-[#253247]">
                            {isOwnProfile
                                ? "Your Artwork"
                                : `${user.name || user.username}'s Artwork`}
                        </h2>
                    </div>
                </div>

                {userPosts.length ? (
                    <>
                        <UserPosts posts={userPosts.slice(0, visiblePosts)} />

                        {visiblePosts < userPosts.length && (
                            <button
                                onClick={() => setVisiblePosts(count => count + 9)}
                                className="mt-5 rounded border border-[#D8D3CA] px-5 py-2 text-[#253247]"
                            >
                                Load more artwork
                            </button>
                        )}
                    </>
                ) : (
                    <p className="rounded border border-dashed border-[#D8D3CA] p-6 text-[#6B6B6B]">
                        No artwork has been published yet.
                    </p>
                )}
            </section>

            <section className="my-12">
                <div className="mb-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#9D2E36]">
                        Curated by this artist
                    </p>

                    <h2 className="mt-1 text-2xl font-semibold text-[#253247]">
                        {isOwnProfile
                            ? "Your Collections"
                            : `${user.name || user.username}'s Collections`}
                    </h2>
                </div>

                {userAlbums.length ? (
                    <>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {userAlbums.slice(0, visibleAlbums).map(album => (
                                <article
                                    key={album._id}
                                    className="flex min-h-48 flex-col border border-[#D8D3CA] bg-white p-5"
                                >
                                    <p className="text-xs uppercase tracking-widest text-[#9D2E36]">
                                        Collection · {album.posts?.length || 0} artworks
                                    </p>

                                    <h3 className="mt-3 text-xl font-semibold text-[#253247]">
                                        {album.name}
                                    </h3>

                                    <p className="mt-2 flex-1 leading-6 text-[#6B6B6B]">
                                        {album.description}
                                    </p>

                                    {album.hashtags?.length > 0 && (
                                        <p className="mt-3 text-sm text-[#9D2E36]">
                                            {album.hashtags.join(" ")}
                                        </p>
                                    )}

                                    <Link
                                        to={`/album/${album._id}`}
                                        className="mt-5 font-medium text-[#9D2E36] hover:underline"
                                    >
                                        View collection →
                                    </Link>
                                </article>
                            ))}
                        </div>

                        {visibleAlbums < userAlbums.length && (
                            <button
                                onClick={() => setVisibleAlbums(count => count + 6)}
                                className="mt-5 rounded border border-[#D8D3CA] px-5 py-2 text-[#253247]"
                            >
                                Load more collections
                            </button>
                        )}
                    </>
                ) : (
                    <p className="rounded border border-dashed border-[#D8D3CA] p-6 text-[#6B6B6B]">
                        No collections have been created yet.
                    </p>
                )}
            </section>

            {canSeeFriends ? (
                <Friends friends={friends} />
            ) : (
                <section className="my-10 border-t border-[#D8D3CA] pt-6">
                    <h2 className="text-2xl font-semibold text-[#253247]">
                        Friends
                    </h2>

                    <p className="mt-2 text-[#6B6B6B]">
                        This artist's friends list is visible to friends only.
                    </p>
                </section>
            )}

            {canViewFullProfile && (
                <>
                    {user.role && (
                        <p className="mt-3 font-medium text-[#253247]">
                            {user.role}
                        </p>
                    )}

                    {user.pronouns && (
                        <p className="mt-1 text-sm text-[#6B6B6B]">
                            {user.pronouns}
                        </p>
                    )}

                    {user.bio && (
                        <p className="mt-3 max-w-2xl whitespace-pre-wrap leading-7 text-[#253247]">
                            {user.bio}
                        </p>
                    )}

                    <p className="mt-4 text-sm text-[#6B6B6B]">
                        {userPosts.length}{" "}
                        {userPosts.length === 1 ? "artwork" : "artworks"}
                        {" · "}
                        {userAlbums.length}{" "}
                        {userAlbums.length === 1 ? "collection" : "collections"}
                    </p>
                </>
            )}

                {isOwnProfile && (
                <p className="mt-8">
                    <Link
                        to="/collections"
                        className="text-[#9D2E36] hover:underline"
                    >
                        Manage all collections
                    </Link>
                </p>
            )}
        </main>
    </>
    );
} 

export default ProfilePage;