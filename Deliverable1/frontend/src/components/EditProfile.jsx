import { useState } from "react";

function EditProfile({ user }) {
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio);
    const [pronouns, setPronouns] = useState(user.pronouns);
    const [role, setRole] = useState(user.role);

    function handleSubmit(event) {
        event.preventDefault();

        console.log({
            name,
            bio,
            pronouns,
            role
        });

        alert("Profile changes saved.");
    }

    return (
        <section className="edit-profile">
            <h2>Edit Your Studio</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="edit-name">
                    Name
                </label>

                <input
                    id="edit-name"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                    required
                />

                <label htmlFor="edit-role">
                    Role
                </label>

                <input
                    id="edit-role"
                    value={role}
                    onChange={(event) =>
                        setRole(event.target.value)
                    }
                    required
                />

                <label htmlFor="edit-pronouns">
                    Pronouns
                </label>

                <input
                    id="edit-pronouns"
                    value={pronouns}
                    onChange={(event) =>
                        setPronouns(event.target.value)
                    }
                />

                <label htmlFor="edit-bio">
                    Bio
                </label>

                <textarea
                    id="edit-bio"
                    value={bio}
                    onChange={(event) =>
                        setBio(event.target.value)
                    }
                    maxLength="250"
                />

                <button type="submit">
                    Save Changes
                </button>
            </form>
        </section>
    );
}

export default EditProfile;