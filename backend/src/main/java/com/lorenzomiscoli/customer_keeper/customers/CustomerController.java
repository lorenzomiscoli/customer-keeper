package com.lorenzomiscoli.customer_keeper.customers;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.lorenzomiscoli.customer_keeper.common.validators.ValidLogoSize;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerDTO;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerInsertDTO;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerLogoDTO;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerSearchDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/customers")
class CustomerController {

	private final CustomerService customerService;

	CustomerController(CustomerService customerService) {
		this.customerService = customerService;
	}

	@GetMapping
	List<CustomerDTO> search(CustomerSearchDTO customerSearchDto) {
		return customerService.search(customerSearchDto);
	}

	@GetMapping("/{id}/logo")
	ResponseEntity<byte[]> findLogo(@PathVariable Integer id) {
		CustomerLogoDTO customerLogoDto = customerService.findLogo(id);
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.add("Content-Type", customerLogoDto.mimeType());
		return ResponseEntity.ok().headers(responseHeaders).body(customerLogoDto.logo());
	}

	@PostMapping
	ResponseEntity<Void> insert(@RequestPart("customer") @Valid CustomerInsertDTO customerInsertDto,
			@RequestPart("logo") @ValidLogoSize Optional<MultipartFile> logo) throws IOException {
		int id = customerService.insert(customerInsertDto, logo);
		URI loc = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();
		return ResponseEntity.created(loc).build();
	}

}
