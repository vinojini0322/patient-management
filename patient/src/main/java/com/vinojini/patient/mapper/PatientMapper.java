package com.vinojini.patient.mapper;

import com.vinojini.patient.dto.PatientRequest;
import com.vinojini.patient.dto.PatientResponse;
import com.vinojini.patient.entity.Patient;

public class PatientMapper {

    public static Patient toEntity(PatientRequest patientRequest) {
        return new Patient(patientRequest.firstName(), patientRequest.lastName(), patientRequest.address(), patientRequest.city(), patientRequest.state(), patientRequest.zipCode(), patientRequest.phoneNumber(), patientRequest.email());
    }

    public static PatientResponse toResponse(Patient patient) {
        return new PatientResponse(
                patient.getId(),
                patient.getFirstName(),
                patient.getLastName(),
                patient.getAddress(),
                patient.getCity(),
                patient.getState(),
                patient.getZipCode(),
                patient.getPhoneNumber(),
                patient.getEmail()
        );
    }
}
