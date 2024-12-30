package com.lorenzomiscoli.customer_keeper.customers;

import java.util.List;

import com.lorenzomiscoli.customer_keeper.customers.models.CustomerDTO;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerSearchDTO;

public interface CustomCustomerRepository {

	List<CustomerDTO> search(CustomerSearchDTO customerSearchDto);
	
}
