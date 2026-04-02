package com.vinojini.patient.service;

import com.vinojini.patient.entity.Patient;
import com.vinojini.patient.exception.ResourceNotFoundException;
import com.vinojini.patient.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    private static final String PATIENT_NOT_FOUND = "Patient not found with id: ";

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAllByOrderByIdDesc();
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException(PATIENT_NOT_FOUND + id));
    }

    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, Patient patient) {
        Patient existingPatient = patientRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException(PATIENT_NOT_FOUND + id));
        existingPatient.setFirstName(patient.getFirstName());
        existingPatient.setLastName(patient.getLastName());
        existingPatient.setAddress(patient.getAddress());
        existingPatient.setCity(patient.getCity());
        existingPatient.setState(patient.getState());
        existingPatient.setZipCode(patient.getZipCode());
        existingPatient.setPhoneNumber(patient.getPhoneNumber());
        existingPatient.setEmail(patient.getEmail());

        return patientRepository.save(existingPatient);
    }

    public void deletePatient(Long id) {

        if (!patientRepository.existsById(id)) {
            throw new ResourceNotFoundException(PATIENT_NOT_FOUND + id);
        }
        patientRepository.deleteById(id);
    }
}
