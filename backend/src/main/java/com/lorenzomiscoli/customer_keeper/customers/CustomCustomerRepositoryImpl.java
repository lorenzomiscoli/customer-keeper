package com.lorenzomiscoli.customer_keeper.customers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Pageable;

import com.lorenzomiscoli.customer_keeper.common.models.PageResultDto;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerDto;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerSearchDto;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

class CustomCustomerRepositoryImpl implements CustomCustomerRepository {

	@PersistenceContext
	private EntityManager em;

	@Override
	public PageResultDto search(CustomerSearchDto customerSearchDto, Pageable pageable) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<CustomerDto> cq = cb.createQuery(CustomerDto.class);
		CriteriaQuery<Long> cqCount = cb.createQuery(Long.class);
		List<CustomerDto> customers = null;
		long countResult = 0;
		Root<Customer> root = applyFilters(cq, cb, customerSearchDto, false);
		cq.select(cb.construct(CustomerDto.class, root.get("id"), root.get("name"), root.get("email"),
				root.get("phone"), root.get("updatedDate")));
		cqCount.select(cb.count(applyFilters(cqCount, cb, customerSearchDto, true))).distinct(true);
		TypedQuery<CustomerDto> query = em.createQuery(cq);
		query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
		query.setMaxResults(pageable.getPageSize());
		customers = query.getResultList();
		countResult = em.createQuery(cqCount).getSingleResult();
		var totalPages = (int) ((countResult - 1) / pageable.getPageSize()) + 1;
		return new PageResultDto(pageable.getPageNumber(), totalPages, countResult, customers);
	}

	private Root<Customer> applyFilters(CriteriaQuery<?> cq, CriteriaBuilder cb, CustomerSearchDto customerSearchDto,
			boolean noSort) {
		Root<Customer> root = cq.from(Customer.class);
		List<Predicate> predicatesList = new ArrayList<>();
		List<Order> ordersList = new ArrayList<>();
		Predicate[] predicatesArray = null;

		if (customerSearchDto.name().isPresent() && !customerSearchDto.name().get().isBlank()) {
			predicatesList.add(cb.like(cb.lower(root.get("name")),
					cb.lower(cb.literal("%" + customerSearchDto.name().get() + "%"))));
		}
		if (!noSort) {
			customerSearchDto.sort().ifPresent((sortValue) -> {
				switch (sortValue) {
				case NAME: {
					ordersList.add(cb.desc(root.get("name")));
					break;
				}
				case UPDATED_DATE: {
					ordersList.add(cb.desc(root.get("updatedDate")));
					break;
				}
				default:
					break;
				}
			});
		}
		if (!predicatesList.isEmpty()) {
			predicatesArray = new Predicate[predicatesList.size()];
			predicatesArray = predicatesList.toArray(predicatesArray);
			cq.where(predicatesArray);
		}
		if (!ordersList.isEmpty()) {
			cq.orderBy(ordersList);
		}
		return root;
	}

}
