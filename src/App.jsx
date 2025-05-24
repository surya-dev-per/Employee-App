import React, { useState } from "react";

function EmployeeApp() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [editingId, setEditingId] = useState(null);

  const handleAddEmployee = () => {
    if (!name || !email || !role) {
      alert("Please fill all fields");
      return;
    }

    const newEmployee = {
      id: Date.now(),
      name,
      email,
      role,
    };

    setEmployees([...employees, newEmployee]);
    setName("");
    setEmail("");
    setRole("");
  };

  const handleDelete = (id) => {
    setDeletingId(id);
    setTimeout(() => {
      setEmployees(employees.filter((emp) => emp.id !== id));
      setDeletingId(null);
    }, 500);
  };

  const handleChangeBackground = () => {
    const hex = "0123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];
    }
    setBgColor(color);
  };

  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setName(emp.name);
    setEmail(emp.email);
    setRole(emp.role);
  };

  const handleSaveEdit = () => {
    setEmployees(
      employees.map((emp) =>
        emp.id === editingId ? { ...emp, name, email, role } : emp
      )
    );
    setEditingId(null);
    setName("");
    setEmail("");
    setRole("");
  };

  return (
    <div style={{ padding: 20, backgroundColor: bgColor, minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center" }}>Employee Manager</h2>

      <div style={{ marginBottom: 10, textAlign: "center" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: 5 }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: 5 }}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ marginRight: 5 }}
        />
        {editingId ? (
          <button onClick={handleSaveEdit}>Save</button>
        ) : (
          <button onClick={handleAddEmployee}>Add Employee</button>
        )}
        <button onClick={handleChangeBackground} style={{ marginLeft: 10 }}>
          Change Me
        </button>
      </div>

      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp.id}
              style={{
                backgroundColor: emp.id === deletingId ? "#f8d7da" : "white",
                transition: "background-color 0.5s",
              }}
            >
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button
                  onClick={() => handleDelete(emp.id)}
                  style={{ marginLeft: 5 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeApp;
