import React, { useState } from "react";
import UserForm from "./userForm";
import { useDispatch, useSelector } from "react-redux";
import { add, remove, update } from "../components/userSlice";
import { Button, Modal, Table } from "react-bootstrap";

export default function Users() {
    const users = useSelector((state) => state.users);
    const roles = useSelector((state) => state.roles);
    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const openUpdateForm = (data) => {
        setEditUser(data);
        setShowForm(true);
    };

    const openDeletePopup = (data) => {
        setConfirmDelete(data);
    };

    const closeForm = () => {
        setEditUser(null);
        setShowForm(false);
    };

    const handleSave = (data) => {
        if (editUser) dispatch(update(data));
        else dispatch(add(data));
        closeForm();
    };

    const hideModal = () => {
        setConfirmDelete(null);
    };

    const deleteUser = () => {
        dispatch(remove(confirmDelete?.id));
        hideModal();
    };

    return (
        <>
            <div className="container py-3">
                <div className="d-flex justify-content-between py-3 border-bottom ">
                    <h2 className="m-0 text-primary">Users</h2>
                    <Button variant="primary" onClick={() => setShowForm(true)}>
                        Add User
                    </Button>
                </div>
                {showForm && (<UserForm
                    editUser={editUser}
                    onComplete={handleSave}
                    onCancel={closeForm}
                />)}

                <div className="mt-3">
                    <Table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>UserName</th>
                                <th>Email</th>
                                <th>Mobile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>
                                        <Button className="btn btn-secondary" onClick={() => openUpdateForm(user)}>Edit</Button>
                                    </td>
                                    <td style={{ width: "80px" }}>
                                        <Button className="btn btn-danger"
                                            onClick={() => openDeletePopup(user)}>Delete</Button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

            </div>

            <Modal show={!!confirmDelete} onHide={hideModal} centered>
                <Modal.Header>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the user{" "}
                    <span className="fw-bold">{confirmDelete?.name}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" size="sm" onClick={hideModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" size="sm" onClick={deleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}