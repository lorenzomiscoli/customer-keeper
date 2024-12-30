package com.lorenzomiscoli.customer_keeper.customers;

import java.util.List;

import org.springframework.stereotype.Service;

import com.lorenzomiscoli.customer_keeper.customers.models.CustomerDTO;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerSearchDTO;

@Service
class CustomerService {

	private final CustomerRepository customerRepo;

	CustomerService(CustomerRepository customerRepo) {
		this.customerRepo = customerRepo;
	}

	List<CustomerDTO> search(CustomerSearchDTO customerSearchDto) {
		return customerRepo.search(customerSearchDto);
	}

}
