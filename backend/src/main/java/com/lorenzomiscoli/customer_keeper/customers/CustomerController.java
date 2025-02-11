package com.lorenzomiscoli.customer_keeper.customers;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.lorenzomiscoli.customer_keeper.common.models.PageResultDto;
import com.lorenzomiscoli.customer_keeper.common.validators.ValidLogoSize;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerDto;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerSaveDto;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerLogoDto;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerSearchDto;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/customers")
class CustomerController {

	private final CustomerService customerService;

	CustomerController(CustomerService customerService) {
		this.customerService = customerService;
	}

	@GetMapping
	PageResultDto search(CustomerSearchDto customerSearchDto, Pageable pageable) {
		return customerService.search(customerSearchDto, pageable);
	}

	@GetMapping("/{id}")
	CustomerDto findById(@PathVariable int id) {
		return customerService.findById(id);
	}

	@GetMapping("/{id}/logo")
	ResponseEntity<byte[]> findLogo(@PathVariable Integer id) {
		CustomerLogoDto customerLogoDto = customerService.findLogo(id);
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.add("Content-Type", customerLogoDto.mimeType());
		return ResponseEntity.ok().headers(responseHeaders).body(customerLogoDto.logo());
	}

	@PostMapping
	ResponseEntity<Void> insert(
			@RequestPart("customer") @Valid CustomerSaveDto customerSaveDto,
			@RequestPart("logo") @ValidLogoSize Optional<MultipartFile> logo) throws IOException {
		int id = customerService.insert(customerSaveDto, logo);
		URI loc = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();
		return ResponseEntity.created(loc).build();
	}

	@PutMapping("/{id}")
	ResponseEntity<Void> update(@PathVariable int id, @RequestPart("customer") @Valid CustomerSaveDto customerSaveDto,
			@RequestPart("logo") @ValidLogoSize Optional<MultipartFile> logo) throws IOException {
		customerService.update(id, customerSaveDto, logo);
		return ResponseEntity.noContent().build();
	}

}
