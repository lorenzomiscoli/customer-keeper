package com.lorenzomiscoli.customer_keeper.customers;

import org.springframework.data.repository.CrudRepository;

interface CustomerRepository extends CrudRepository<Customer, Integer>, CustomCustomerRepository {
}
