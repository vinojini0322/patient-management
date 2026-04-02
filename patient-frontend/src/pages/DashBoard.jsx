import { useEffect, useState } from "react";
import {
  createPatient,
  deletePatient,
  getAllPatients,
  updatePatient,
} from "../services/PatientService";
import PatientTable from "../components/PatientTable";
import PatientForm from "../components/PatientForm";
import PatientModal from "../components/PatientModal";
import Button from "../components/Button";
import { EditableCellProvider } from "../context/EditTableCellContext";
import "../styles/patient-dashboard.css";

const initialFormData = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  phoneNumber: "",
  email: "",
};

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [editingCell, setEditingCell] = useState({
    id: null,
    field: "",
  });
  const [cellValue, setCellValue] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await getAllPatients();
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    e.preventDefault();
    try {
      if (editingId) {
        await updatePatient(editingId, formData);
      } else {
        await createPatient(formData);
      }
      fetchPatients();
      handleCloseModal();
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };

  const handleEdit = (patient) => {
    setFormData({
      firstName: patient.firstName || "",
      lastName: patient.lastName || "",
      address: patient.address || "",
      city: patient.city || "",
      state: patient.state || "",
      zipCode: patient.zipCode || "",
      phoneNumber: patient.phoneNumber || "",
      email: patient.email || "",
    });
    setEditingId(patient.id);
    setIsModalOpen(true);
  };

  const handleCellEditStart = (patient, field) => {
    setEditingCell({ id: patient.id, field });
    setCellValue(patient[field] || "");
  };

  const handleCellChange = (e) => {
    setCellValue(e.target.value);
  };

  const handleCellSave = async (patient) => {
    try {
      const updatedPatient = {
        ...patient,
        [editingCell.field]: cellValue,
      };
      await updatePatient(patient.id, updatedPatient);
      await fetchPatients();
      setEditingCell({ id: null, field: "" });
      setCellValue("");
    } catch (error) {
      console.error("Error updating cell: ", error);
    }
  };

  const handleCellCancel = () => {
    setEditingCell({ id: null, field: "" });
    setCellValue("");
  };

  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient: ", error);
    }
  };
  return (
    <div className="patient-page">
      <div className="container h-100">
        <div className="patient-shell">
          <div className="patient-layout">
            <div className="patient-sidebar">
              <div className="patient-title-wrap">
                <h2>Patient Management</h2>
                <p>Dashboard</p>
              </div>
              <Button
                className="patient-add-btn"
                onClick={handleOpenModal}
                label={
                  <div className="d-flex align-items-center gap-2">
                    <span>Add patient </span>
                    <span className="add-icon-circle">
                      <i className="bi bi-plus" />
                    </span>
                  </div>
                }
              />
            </div>
            {/* </div> */}
            <div className="patient-content">
              {loading ? (
                <div className="text-center my-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading</span>
                  </div>
                </div>
              ) : (
                <div className="patient-table-scroll">
                  <EditableCellProvider
                    value={{
                      editingCell,
                      cellValue,
                      handleCellEditStart,
                      handleCellChange,
                      handleCellSave,
                      handleCellCancel,
                    }}
                  >
                    <PatientTable
                      patients={patients}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </EditableCellProvider>
                </div>
              )}
            </div>
          </div>

          {isModalOpen && (
            <PatientModal
              title={editingId ? "Edit Patient" : "Add Patient"}
              onClose={handleCloseModal}
              onSubmit={handleSubmit}
            >
              <PatientForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                editingId={editingId}
                handleCancel={handleCloseModal}
                errors={errors}
              />
            </PatientModal>
          )}
          {isModalOpen && <div className="modal-backdrop fade show"></div>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
