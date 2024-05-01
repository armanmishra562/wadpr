// public/script.js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('userForm');
    const updateForm = document.getElementById('updateForm');
    const deleteForm = document.getElementById('deleteForm');
    const userList = document.getElementById('userList');

    // Function to fetch and display users
    async function fetchUsers() {
        try {
            const response = await fetch('/users');
            const users = await response.json();
            userList.innerHTML = users.map(user => `
                <div>
                    <div>ID: ${user._id}</div>
                    <div>Name: ${user.name}</div>
                    <div>Email: ${user.email}</div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    // Fetch and display users when the page loads
    fetchUsers();

    // Function to handle form submission to add a new user
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const userData = {
            name: formData.get('name'),
            email: formData.get('email')
        };

        try {
            // Send POST request to create a new user
            const response = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                // If user created successfully, fetch and display updated user list
                fetchUsers();
                form.reset();
            } else {
                console.error('Failed to create user:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    });

    // Function to handle form submission to update a user
    updateForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const formData = new FormData(updateForm);
        const userId = formData.get('updateId');
        const userData = {
            name: formData.get('updateName'),
            email: formData.get('updateEmail')
        };

        try {
            // Send PUT request to update an existing user
            const response = await fetch(`/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                // If user updated successfully, fetch and display updated user list
                fetchUsers();
                updateForm.reset();
            } else {
                console.error('Failed to update user:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    });

    // Function to handle form submission to delete a user
    deleteForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const formData = new FormData(deleteForm);
        const userId = formData.get('deleteId');

        try {
            // Send DELETE request to delete an existing user
            const response = await fetch(`/users/${userId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // If user deleted successfully, fetch and display updated user list
                fetchUsers();
                deleteForm.reset();
            } else {
                console.error('Failed to delete user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    });
});
