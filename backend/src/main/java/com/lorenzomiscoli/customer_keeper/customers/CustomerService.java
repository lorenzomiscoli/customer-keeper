package com.lorenzomiscoli.customer_keeper.customers;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.lorenzomiscoli.customer_keeper.common.exceptions.RecordNotFoundException;
import com.lorenzomiscoli.customer_keeper.common.models.PageResultDTO;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerDTO;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerSaveDto;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerLogoDTO;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerSearchDTO;

@Service
class CustomerService {

	private final CustomerRepository customerRepo;

	CustomerService(CustomerRepository customerRepo) {
		this.customerRepo = customerRepo;
	}

	PageResultDTO search(CustomerSearchDTO customerSearchDto, Pageable pageable) {
		return customerRepo.search(customerSearchDto, pageable);
	}

	CustomerDTO findById(Integer id) {
		return customerRepo.findDTOById(id)
				.orElseThrow(() -> new RecordNotFoundException("Customer with id: " + id + " could not be found"));
	}

	CustomerLogoDTO findLogo(Integer id) {
		Customer customer = customerRepo.findById(id).get();
		byte[] logo = customer.getLogo();
		String mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
		if (logo != null) {
			try {
				InputStream is = new BufferedInputStream(new ByteArrayInputStream(logo));
				mimeType = URLConnection.guessContentTypeFromStream(is);
			} catch (IOException e) {
				// TODO add logs
			}
		}
		return new CustomerLogoDTO(logo, mimeType);
	}

	int insert(CustomerSaveDto customerSaveDto, Optional<MultipartFile> logo) throws IOException {
		var customer = new Customer(customerSaveDto.name(), customerSaveDto.email(), customerSaveDto.phone());
		if (logo.isPresent()) {
			customer.setLogo(logo.get().getBytes());
		}
		customerRepo.save(customer);
		return customer.getId();
	}

	void update(Integer id, CustomerSaveDto customerSaveDto, Optional<MultipartFile> logo) throws IOException {
		Customer customer = customerRepo.findById(id)
				.orElseThrow(() -> new RecordNotFoundException("Customer with id: " + id + " could not be found"));
		customer.setName(customerSaveDto.name());
		customer.setPhone(customerSaveDto.phone());
		customer.setEmail(customerSaveDto.email());
		if (logo.isPresent()) {
			customer.setLogo(logo.get().getBytes());
		} else {
			customer.setLogo(null);
		}
		customerRepo.save(customer);
	}

}
