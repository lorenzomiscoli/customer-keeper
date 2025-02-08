package com.lorenzomiscoli.customer_keeper.customers;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.lorenzomiscoli.customer_keeper.customers.models.CustomerDTO;

interface CustomerRepository extends CrudRepository<Customer, Integer>, CustomCustomerRepository {

	@Query(value = "SELECT new com.lorenzomiscoli.customer_keeper.customers.models.CustomerDTO("
			+ "c.id, c.name, c.email, c.phone, c.updatedDate) FROM Customer c WHERE c.id = :id")
	Optional<CustomerDTO> findDTOById(Integer id);

}
