import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, clearError } from "../redux/slices/userSlice";

function AddUser() {
    const [user, setUser] = useState({ name: "", email: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.users);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(addUser(user));
        if (result.payload) {
            navigate("/");
        }
    };

    const handleDismissError = () => {
        dispatch(clearError());
    };

    return (
        <div className="page page-form">
            {error && (
                <div className="error-banner">
                    <p>{error}</p>
                    <button onClick={handleDismissError} className="btn-close">✕</button>
                </div>
            )}

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
                            disabled={loading}
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
                            disabled={loading}
                        />
                    </label>

                    <div className="form-actions">
                        <button className="btn btn-primary" type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save User"}
                        </button>
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => navigate("/")}
                            disabled={loading}
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