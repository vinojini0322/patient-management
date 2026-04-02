package com.vinojini.patient.service;


import com.vinojini.patient.entity.Patient;
import com.vinojini.patient.exception.ResourceNotFoundException;
import com.vinojini.patient.repository.PatientRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PatientServiceTest {

    @Mock
    PatientRepository patientRepository;

    @InjectMocks
    PatientService patientService;

    @Test
    void getAllPatientsTest() {
        Patient patient = new Patient();
        patient.setFirstName("John");
        patient.setAddress("New York");

        when(patientRepository.findAll()).thenReturn(List.of(patient));

        List<Patient> patients = patientService.getAllPatients();


        assertEquals(1, patients.size());
        assertEquals("John", patients.get(0).getFirstName());
    }

    @Test
    void getPatientByIdTest() {

        Patient patient = new Patient();
        patient.setId(1L);
        patient.setFirstName("John");
        patient.setAddress("New York");

        when(patientRepository.findById(1L)).thenReturn(Optional.of(patient));

        Patient result = patientService.getPatientById(1L);

        assertEquals(1L, result.getId());
        assertEquals("John", result.getFirstName());

    }

    @Test
    void getPatientById_NotFoundTest() {
        when(patientRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> patientService.getPatientById(1L));
    }

    @Test
    void createPatientTest() {
        Patient createdPatient = new Patient();
        createdPatient.setFirstName("John");

        Patient savedPatient = new Patient();
        savedPatient.setId(1L);
        savedPatient.setFirstName("John");

        when(patientRepository.save(createdPatient)).thenReturn(savedPatient);

        Patient result = patientService.createPatient(createdPatient);

        assertNotNull(result.getId());
        assertEquals("John", result.getFirstName());
    }

    @Test
    void updatePatientTest() {
        Patient existingPatient = new Patient();
        existingPatient.setId(1L);
        existingPatient.setFirstName("John");

        Patient update = new Patient();
        update.setFirstName("Dave");

        when(patientRepository.findById(1L)).thenReturn(Optional.of(existingPatient));
        when(patientRepository.save(existingPatient)).thenReturn(existingPatient);


        Patient updatedPatent = patientService.updatePatient(1L, update);

        assertEquals("Dave", updatedPatent.getFirstName());

    }

    @Test
    void updatePatient_NotFoundTest() {
        Patient existingPatient = new Patient();
        existingPatient.setFirstName("John");

        when(patientRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> patientService.updatePatient(1L, existingPatient));
    }

    @Test
    void deletePatientTest(){
        when(patientRepository.existsById(1L)).thenReturn(true);
        patientService.deletePatient(1L);

        verify(patientRepository).deleteById(1L);
    }

    @Test
    void deletePatient_NotFoundTest(){
        when(patientRepository.existsById(1L)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class,()->patientService.deletePatient(1L));
    }
}
