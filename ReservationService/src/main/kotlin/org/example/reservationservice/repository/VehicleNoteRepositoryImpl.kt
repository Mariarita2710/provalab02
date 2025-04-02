package org.example.reservationservice.repository

import jakarta.persistence.EntityManager
import jakarta.persistence.criteria.Predicate
import org.example.reservationservice.model.VehicleNote
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
class VehicleNoteRepositoryImpl(
    private val entityManager: EntityManager
) : VehicleNoteRepositoryCustom {

    override fun findByVehicleIdWithFilters(
        vehicleId: Long,
        author: String?,
        from: LocalDateTime?,
        to: LocalDateTime?,
        pageable: Pageable
    ): Page<VehicleNote> {
        val cb = entityManager.criteriaBuilder
        val query = cb.createQuery(VehicleNote::class.java)
        val root = query.from(VehicleNote::class.java)

        val predicates = mutableListOf<Predicate>()
        predicates += cb.equal(root.get<Long>("vehicle").get<Long>("id"), vehicleId)

        author?.let {
            predicates += cb.like(cb.lower(root.get("author")), "%${it.lowercase()}%")
        }

        from?.let {
            predicates += cb.greaterThanOrEqualTo(root.get("createdAt"), it)
        }

        to?.let {
            predicates += cb.lessThanOrEqualTo(root.get("createdAt"), it)
        }

        query.where(*predicates.toTypedArray())
        query.orderBy(cb.desc(root.get<LocalDateTime>("createdAt")))

        val typedQuery = entityManager.createQuery(query)
        typedQuery.firstResult = pageable.offset.toInt()
        typedQuery.maxResults = pageable.pageSize

        val results = typedQuery.resultList

        val countQuery = cb.createQuery(Long::class.java)
        val countRoot = countQuery.from(VehicleNote::class.java)
        countQuery.select(cb.count(countRoot)).where(*predicates.toTypedArray())
        val total = entityManager.createQuery(countQuery).singleResult

        return PageImpl(results, pageable, total)
    }
}
