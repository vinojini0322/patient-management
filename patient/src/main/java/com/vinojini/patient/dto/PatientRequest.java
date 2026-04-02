package com.vinojini.patient.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record PatientRequest(@NotBlank
                             String firstName,

                             @NotBlank
                             String lastName,

                             String address,
                             String city,
                             String state,
                             String zipCode,
                             String phoneNumber,

                             @Email
                             String email) {
}
