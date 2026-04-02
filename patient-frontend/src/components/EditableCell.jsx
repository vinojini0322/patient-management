import { useEditableCellContext } from "../context/EditTableCellContext";
function EditableCell({ value, field, patient }) {
  const {
    editingCell,
    cellValue,
    handleCellEditStart,
    handleCellChange,
    handleCellSave,
    handleCellCancel,
  } = useEditableCellContext();
  const isEditing =
    editingCell.id === patient.id && editingCell.field === field;
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleCellSave(patient);
    }
  };

  return (
    <td
      onClick={() => {
        handleCellEditStart(patient, field);
      }}
    >
      {isEditing ? (
        <input
          type="text"
          className="form-controll"
          value={cellValue}
          onChange={handleCellChange}
          onBlur={handleCellCancel}
          autoFocus
          onKeyDown={handleKeyDown}
        ></input>
      ) : (
        value || "-"
      )}
    </td>
  );
}

export default EditableCell;
