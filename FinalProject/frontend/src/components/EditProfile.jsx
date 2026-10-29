import React from "react";
import { useState, useEffect } from "react";


function EditProfile({ user, onSaved, onCancel }) {
    const [name, setName] = useState(user.name || "");
    const [bio, setBio] = useState(user.bio || "");
    const [pronouns, setPronouns] = useState(user.pronouns || "");
    const [role, setRole] = useState(user.role || "Artist");
    const [profileImage, setProfileImage] = useState(user.profileImage || "");
    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setName(user.name || "");
        setBio(user.bio || "");
        setPronouns(user.pronouns || "");
        setRole(user.role || "Artist");
        setProfileImage(user.profileImage || "");
    }, [user]);

    function loadImageFile(file) {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            setMessage("Please choose an image file.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setMessage("Choose an image smaller than 5 MB.");
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setProfileImage(String(reader.result));
            setMessage("");
        };
        reader.onerror = () => setMessage("Unable to read this image.");
        reader.readAsDataURL(file);
    }

    function handleImageChange(event) {
        loadImageFile(event.target.files?.[0]);
    }

    function handleImageDrop(event) {
        event.preventDefault();
        loadImageFile(event.dataTransfer.files?.[0]);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setSaving(true);
        setMessage("");
        try {
            const response = await fetch(`/api/users/${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    bio: bio.trim(),
                    pronouns: pronouns.trim(),
                    role: role.trim(),
                    profileImage
                })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Unable to save profile.");
            localStorage.setItem("currentUser", JSON.stringify(data));
            localStorage.setItem("username", data.username);
            setMessage("Profile updated successfully.");
            onSaved?.(data);
        } catch (error) {
            setMessage(error.message || "Unable to save profile.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <section className="my-8 max-w-2xl border border-[#D8D3CA] bg-white p-6">
            <h2 className="mb-5 text-2xl font-semibold text-[#253247]">Edit Your Profile</h2>
            <form onSubmit={handleSubmit} className="grid gap-3">
                <label htmlFor="edit-name">Display name</label>
                <input id="edit-name" value={name} onChange={event => setName(event.target.value)} required maxLength={80} />
                <label htmlFor="edit-role">Creative role</label>
                <input id="edit-role" value={role} onChange={event => setRole(event.target.value)} required maxLength={80} />
                <label htmlFor="edit-pronouns">Pronouns</label>
                <input id="edit-pronouns" value={pronouns} onChange={event => setPronouns(event.target.value)} maxLength={40} />
                <label htmlFor="edit-bio">Bio</label>
                <textarea id="edit-bio" value={bio} onChange={event => setBio(event.target.value)} maxLength={250} rows={4} />
                <label htmlFor="edit-profile-image">Profile picture</label>
                <div onDragOver={event => event.preventDefault()} onDrop={handleImageDrop} className="rounded-lg border-2 border-dashed border-[#D8D3CA] p-4">
                    <p className="mb-2 text-sm text-[#6B6B6B]">Drag an image here, or choose a file below (maximum 5 MB).</p>
                    <input id="edit-profile-image" type="file" accept="image/*" onChange={handleImageChange} />
                    {profileImage && <img src={profileImage} alt="Profile picture preview" className="mt-3 h-24 w-24 rounded-full object-cover" />}
                </div>
                {message && <p role="status">{message}</p>}
                <div className="flex gap-3">
                    <button type="submit" disabled={saving} className="rounded bg-[#9D2E36] px-4 py-2 text-white">{saving ? "Saving..." : "Save Changes"}</button>
                    <button type="button" onClick={onCancel} className="rounded border px-4 py-2">Cancel</button>
                </div>
            </form>
        </section>
    );
}

export default EditProfile;