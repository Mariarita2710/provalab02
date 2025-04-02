package org.example.reservationservice.service

import org.example.reservationservice.dto.VehicleRequestDTO
import org.example.reservationservice.dto.VehicleResponseDTO
import org.example.reservationservice.exception.VehicleNotFound
import org.example.reservationservice.model.Vehicle
import org.example.reservationservice.model.VehicleStatus
import org.example.reservationservice.repository.CarModelRepository
import org.example.reservationservice.repository.VehicleRepository
import org.springframework.stereotype.Service
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable


@Service
class VehicleService(
    private val vehicleRepository: VehicleRepository,
    private val carModelRepository: CarModelRepository
) {

    fun findAll(): List<VehicleResponseDTO> =
        vehicleRepository.findAll().map { VehicleResponseDTO.from(it) }

    fun findById(id: Long): VehicleResponseDTO =
        vehicleRepository.findById(id).orElseThrow { VehicleNotFound(id) }
            .let { VehicleResponseDTO.from(it) }

    fun findAllFiltered(status: String?, carModelId: Long?, pageable: Pageable): Page<VehicleResponseDTO> {
        val page = vehicleRepository.findAllFiltered(status, carModelId, pageable)
        return page.map { VehicleResponseDTO.from(it) }
    }

    fun create(request: VehicleRequestDTO): VehicleResponseDTO {
        val carModel = carModelRepository.findById(request.carModelId)
            .orElseThrow { IllegalArgumentException("CarModel with ID ${request.carModelId} not found") }

        val statusEnum = VehicleStatus.valueOf(request.status.uppercase())

        val vehicle = Vehicle(
            licensePlate = request.licensePlate,
            vin = request.vin,
            status = statusEnum,
            kilometersTravelled = request.kilometersTravelled,
            pendingCleaning = request.pendingCleaning,
            pendingRepairs = request.pendingRepairs,
            carModel = carModel
        )

        return VehicleResponseDTO.from(vehicleRepository.save(vehicle))
    }

    fun update(id: Long, request: VehicleRequestDTO): VehicleResponseDTO {
        val existing = vehicleRepository.findById(id)
            .orElseThrow { VehicleNotFound(id) }

        val carModel = carModelRepository.findById(request.carModelId)
            .orElseThrow { IllegalArgumentException("CarModel with ID ${request.carModelId} not found") }

        val statusEnum = VehicleStatus.valueOf(request.status.uppercase())

        val updated = existing.copy(
            licensePlate = request.licensePlate,
            vin = request.vin,
            status = statusEnum,
            kilometersTravelled = request.kilometersTravelled,
            pendingCleaning = request.pendingCleaning,
            pendingRepairs = request.pendingRepairs,
            carModel = carModel
        )

        return VehicleResponseDTO.from(vehicleRepository.save(updated))
    }

    fun delete(id: Long) {
        if (!vehicleRepository.existsById(id)) {
            throw VehicleNotFound(id)
        }
        vehicleRepository.deleteById(id)
    }
}
