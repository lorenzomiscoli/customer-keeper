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
		cq.select(cb.construct(CustomerDTO.class, root.get("id"), root.get("name")));
		TypedQuery<CustomerDTO> query = em.createQuery(cq);
		return query.getResultList();
	}

	private Root<Customer> applyFilters(CriteriaQuery<?> cq, CriteriaBuilder cb, CustomerSearchDTO customerSearchDto) {
		Root<Customer> root = cq.from(Customer.class);
		List<Predicate> predicatesList = new ArrayList<Predicate>();
		Predicate[] predicatesArray = null;

		if (customerSearchDto.name().isPresent()) {
			predicatesList.add(cb.like(cb.lower(root.get("name")),
					cb.lower(cb.literal("%" + customerSearchDto.name().get() + "%")))
			);
		}
		if (!predicatesList.isEmpty()) {
			predicatesArray = new Predicate[predicatesList.size()];
			predicatesArray = predicatesList.toArray(predicatesArray);
			cq.where(predicatesArray);
		}
		return root;
	}

}
