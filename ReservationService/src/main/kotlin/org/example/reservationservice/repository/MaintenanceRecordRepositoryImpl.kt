package org.example.reservationservice.repository

import jakarta.persistence.EntityManager
import jakarta.persistence.criteria.Predicate
import org.example.reservationservice.model.MaintenanceRecord
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
class MaintenanceRecordRepositoryImpl(
    private val entityManager: EntityManager
) : MaintenanceRecordRepositoryCustom {

    override fun findByVehicleIdWithFilters(
        vehicleId: Long,
        type: String?,
        from: LocalDateTime?,
        to: LocalDateTime?,
        pageable: Pageable
    ): Page<MaintenanceRecord> {
        val cb = entityManager.criteriaBuilder
        val query = cb.createQuery(MaintenanceRecord::class.java)
        val root = query.from(MaintenanceRecord::class.java)

        val predicates = mutableListOf<Predicate>()
        predicates += cb.equal(root.get<Long>("vehicle").get<Long>("id"), vehicleId)

        type?.let {
            predicates += cb.equal(root.get<String>("type"), it)
        }

        from?.let {
            predicates += cb.greaterThanOrEqualTo(root.get("maintenanceDate"), it)
        }

        to?.let {
            predicates += cb.lessThanOrEqualTo(root.get("maintenanceDate"), it)
        }

        query.where(*predicates.toTypedArray())
        query.orderBy(cb.desc(root.get<LocalDateTime>("maintenanceDate")))

        val typedQuery = entityManager.createQuery(query)
        typedQuery.firstResult = pageable.offset.toInt()
        typedQuery.maxResults = pageable.pageSize

        val results = typedQuery.resultList

        // Count query
        val countQuery = cb.createQuery(Long::class.java)
        val countRoot = countQuery.from(MaintenanceRecord::class.java)
        countQuery.select(cb.count(countRoot))
        countQuery.where(*predicates.toTypedArray())
        val total = entityManager.createQuery(countQuery).singleResult

        return PageImpl(results, pageable, total)
    }
}
