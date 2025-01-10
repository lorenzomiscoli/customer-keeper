package com.lorenzomiscoli.customer_keeper.customers;

import java.util.ArrayList;
import java.util.List;

import com.lorenzomiscoli.customer_keeper.customers.models.CustomerDTO;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerSearchDTO;

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
	public List<CustomerDTO> search(CustomerSearchDTO customerSearchDto) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<CustomerDTO> cq = cb.createQuery(CustomerDTO.class);
		Root<Customer> root = applyFilters(cq, cb, customerSearchDto);
		cq.select(cb.construct(CustomerDTO.class, root.get("id"), root.get("name"), root.get("updatedDate")));
		TypedQuery<CustomerDTO> query = em.createQuery(cq);
		return query.getResultList();
	}

	private Root<Customer> applyFilters(CriteriaQuery<?> cq, CriteriaBuilder cb, CustomerSearchDTO customerSearchDto) {
		Root<Customer> root = cq.from(Customer.class);
		List<Predicate> predicatesList = new ArrayList<>();
		List<Order> ordersList = new ArrayList<>();
		Predicate[] predicatesArray = null;

		if (customerSearchDto.name().isPresent() && !customerSearchDto.name().get().isBlank()) {
			predicatesList.add(cb.like(cb.lower(root.get("name")),
					cb.lower(cb.literal("%" + customerSearchDto.name().get() + "%"))));
		}

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
