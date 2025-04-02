package org.example.reservationservice.service

import org.example.reservationservice.dto.VehicleNoteRequestDTO
import org.example.reservationservice.dto.VehicleNoteResponseDTO
import org.example.reservationservice.exception.VehicleNoteNotFound
import org.example.reservationservice.exception.VehicleNotFound
import org.example.reservationservice.model.VehicleNote
import org.example.reservationservice.repository.VehicleNoteRepository
import org.example.reservationservice.repository.VehicleRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
class VehicleNoteService(
    private val vehicleNoteRepository: VehicleNoteRepository,
    private val vehicleRepository: VehicleRepository
) {

    fun findByVehicleIdWithFilters(
        vehicleId: Long,
        author: String?,
        from: LocalDateTime?,
        to: LocalDateTime?,
        pageable: Pageable
    ): Page<VehicleNoteResponseDTO> {
        val page = vehicleNoteRepository.findByVehicleIdWithFilters(vehicleId, author, from, to, pageable)
        return page.map { VehicleNoteResponseDTO.from(it) }
    }

    fun create(vehicleId: Long, request: VehicleNoteRequestDTO): VehicleNoteResponseDTO {
        val vehicle = vehicleRepository.findById(vehicleId).orElseThrow { VehicleNotFound(vehicleId) }

        val note = VehicleNote(
            vehicle = vehicle,
            author = request.author,
            note = request.note,
            createdAt = request.createdAt ?: LocalDateTime.now()
        )

        return VehicleNoteResponseDTO.from(vehicleNoteRepository.save(note))
    }

    @Transactional
    fun update(noteId: Long, request: VehicleNoteRequestDTO): VehicleNoteResponseDTO {
        val existing = vehicleNoteRepository.findById(noteId).orElseThrow { VehicleNoteNotFound(noteId) }

        val updated = existing.copy(
            author = request.author,
            note = request.note,
            createdAt = request.createdAt ?: existing.createdAt
        )

        return VehicleNoteResponseDTO.from(vehicleNoteRepository.save(updated))
    }

    fun delete(noteId: Long) {
        if (!vehicleNoteRepository.existsById(noteId)) {
            throw VehicleNoteNotFound(noteId)
        }
        vehicleNoteRepository.deleteById(noteId)
    }
}
