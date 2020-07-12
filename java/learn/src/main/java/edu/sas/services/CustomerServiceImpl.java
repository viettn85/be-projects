package edu.sas.services;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.sas.domain.Customer;
import edu.sas.repositories.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService{
	
	private final CustomerRepository customerRepository;

	public CustomerServiceImpl(CustomerRepository customerRepository) {
		super();
		this.customerRepository = customerRepository;
	}

	@Override
	public Customer findCustomerById(Long id) {
		return customerRepository.findById(id).get();
	}

	@Override
	public List<Customer> findAllCustomers() {
		return customerRepository.findAll();
	}

	@Override
	public Customer saveCustomer(Customer customer) {
		return customerRepository.save(customer);
	}

}
