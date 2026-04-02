import FormInput from "./FormInput";

function PatientForm({ formData, handleChange, errors }) {
  return (
    <div className="card p-4 mb-4 patient-input">
      <form>
        <div className="row">
          <FormInput
            label="FirstName"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            error={errors.firstName}
          />

          <FormInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />

          <FormInput
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <FormInput
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

          <FormInput
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />

          <FormInput
            label="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />

          <FormInput
            label="Phone Number"
            name="phoneNumber"
            type="number"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
          />

          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>
      </form>
    </div>
  );
}

export default PatientForm;
