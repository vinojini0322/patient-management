import Button from "./Button";

function PatientModal({ title, children, onClose, onSubmit }) {
  return (
    <div className="modal d-block patient-modal" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <Button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <Button
              type="button"
              className="patient-close"
              onClick={onClose}
              label="Close"
            />
            <Button className="patient-save" onClick={onSubmit} label="Save" />
          </div>
        </div>
      </div>
      {}
    </div>
  );
}

export default PatientModal;
