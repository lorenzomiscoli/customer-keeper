package com.lorenzomiscoli.customer_keeper.customers;

import org.springframework.data.domain.Pageable;

import com.lorenzomiscoli.customer_keeper.common.models.PageResultDto;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerSearchDto;

public interface CustomCustomerRepository {

	PageResultDto search(CustomerSearchDto customerSearchDto, Pageable pageable);
	
}
