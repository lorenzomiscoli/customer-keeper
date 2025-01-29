package com.lorenzomiscoli.customer_keeper.customers;

import org.springframework.data.domain.Pageable;

import com.lorenzomiscoli.customer_keeper.common.models.PageResultDTO;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerSearchDTO;

public interface CustomCustomerRepository {

	PageResultDTO search(CustomerSearchDTO customerSearchDto, Pageable pageable);
	
}
