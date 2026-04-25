import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
    const [user, setUser] = useState({ name: "", email: "" });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/users/${id}`).then((res) => setUser(res.data));
    }, [id]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.put(`/users/${id}`, user);
        navigate("/");
    };

    return (
        <div className="page page-form">
            <div className="form-card">
                <div className="form-header">
                    <div>
                        <h2>Edit User</h2>
                        <p className="form-description">
                            Update the user’s details and save the changes.
                        </p>
                    </div>
                    <span className="user-badge">ID {id}</span>
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            required
                        />
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            required
                        />
                    </label>

                    <div className="form-actions">
                        <button className="btn btn-primary" type="submit">
                            Update User
                        </button>
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUser;