import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
    const [user, setUser] = useState({ name: "", email: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/users", user);
        navigate("/");
    };

    return (
        <div className="page page-form">
            <div className="form-card">
                <div className="form-header">
                    <div>
                        <h2>Add New User</h2>
                        <p className="form-description">
                            Create a user record with a name and email address.
                        </p>
                    </div>
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
                            Save User
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

export default AddUser;