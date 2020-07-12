package edu.sas.services;

import java.util.List;

import edu.sas.domain.Customer;

public interface CustomerService {
	Customer findCustomerById(Long id);
	
	List<Customer> findAllCustomers();

	Customer saveCustomer(Customer customer);
}
