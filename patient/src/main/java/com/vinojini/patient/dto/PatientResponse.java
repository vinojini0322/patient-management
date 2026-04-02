package com.vinojini.patient.dto;

public record PatientResponse(
        Long id,
        String firstName,
        String lastName,
        String address,
        String city,
        String state,
        String zipCode,
        String phoneNumber,
        String email
) {
}
