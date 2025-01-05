package com.lorenzomiscoli.customer_keeper.customers;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import com.lorenzomiscoli.customer_keeper.customers.models.CustomerDTO;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerLogoDTO;
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

	CustomerLogoDTO findLogo(Integer id) {
		Customer customer = customerRepo.findById(id).get();
		InputStream is = new BufferedInputStream(new ByteArrayInputStream(customer.getLogo()));
		String mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
		try {
			mimeType = URLConnection.guessContentTypeFromStream(is);
		} catch (IOException e) {
			// TODO add logs
		}
		return new CustomerLogoDTO(customer.getLogo(), mimeType);
	}

}
