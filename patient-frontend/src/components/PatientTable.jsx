import Button from "./Button";
import { FaTrash, FaEdit } from "react-icons/fa";
import EditableCell from "./EditableCell";

function PatientTable({ patients, onEdit, onDelete }) {
  return (
    <table className="table table-hover shadow-lg table-bordered table-striped patient-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {patients.length > 0 ? (
          patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <EditableCell
                value={patient.firstName}
                field="firstName"
                patient={patient}
              />
              <EditableCell
                value={patient.lastName}
                field="lastName"
                patient={patient}
              />
              <EditableCell
                value={patient.city}
                field="city"
                patient={patient}
              />
              <EditableCell
                value={patient.phoneNumber}
                field="phoneNumber"
                patient={patient}
              />
              <EditableCell
                value={patient.email}
                field="email"
                patient={patient}
              />
              <td>
                <div>
                  <Button
                    type="button"
                    className="btn btn-light me-2 shadow-sm"
                    // className="btn bg-transparent border-0 me-2"
                    label={<i className="bi bi-pencil-square text-secondary" />}
                    onClick={() => {
                      onEdit(patient);
                    }}
                  />
                  <Button
                    type="button"
                    className="btn btn-light shadow-sm"
                    label={<i className="bi bi-trash text-danger" />}
                    onClick={() => {
                      onDelete(patient.id);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">
              No patients found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default PatientTable;
