//Rachel Kambala u23559129
import React from "react";
import { Link } from "react-router-dom";

function ProfilePreview({ user }) {
    const label = user.name || user.username || "Artist";
    const initials = label.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase();
    let hash = 0;
    for (const char of String(user._id || user.username || "artist")) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    const hue = hash % 360;
    return <article className="flex items-center gap-3 rounded-lg border border-[#D8D3CA] bg-white p-3">
        <Link to={`/profile/${user._id}`} aria-label={`View ${label}'s profile`} className="shrink-0">
            {user.profileImage ? <img src={user.profileImage} alt="" className="h-12 w-12 rounded-full object-cover" /> : <span className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-white" style={{ background: `linear-gradient(135deg, hsl(${hue}, 42%, 38%), hsl(${(hue + 48) % 360}, 52%, 58%))` }}>{initials}</span>}
        </Link>
        <div className="min-w-0">
            <Link to={`/profile/${user._id}`} className="font-medium text-[#253247] hover:text-[#9D2E36]">{label}</Link>
            <p className="text-sm text-[#6B6B6B]">@{user.username}</p>
            {user.role && <p className="truncate text-xs text-[#6B6B6B]">{user.role}</p>}
        </div>
        <div className="mb-2 flex flex-wrap gap-2 text-xs uppercase tracking-widest text-[#9D2E36]">
            {post.hashtags?.map(tag => (
                <Link
                    key={tag}
                    to={`/?search=${encodeURIComponent(
                        String(tag).replace(/^#/, "")
                    )}`}
                    onClick={event => event.stopPropagation()}
                    className="hover:underline"
                >
                    {tag.startsWith("#") ? tag : `#${tag}`}
                </Link>
            ))}
        </div>
    </article>;
}
export default ProfilePreview;