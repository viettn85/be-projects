package edu.sas.bootstrap;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import edu.sas.domain.Customer;
import edu.sas.repositories.CustomerRepository;

@Component
public class BootstrapData implements CommandLineRunner{
	
	private final CustomerRepository customerRepository;
	
	public BootstrapData(CustomerRepository customerRepository) {
		super();
		this.customerRepository = customerRepository;
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Loading data...");
		
		Customer c1 = new Customer();
		c1.setFirstname("Firstname 1");
		c1.setLastname("Lastname 1");
		customerRepository.save(c1);
		Customer c2 = new Customer();
		c2.setFirstname("Firstname 2");
		c2.setLastname("Lastname 2");
		customerRepository.save(c2);
		Customer c3 = new Customer();
		c3.setFirstname("Firstname 3");
		c3.setLastname("Lastname 3");
		customerRepository.save(c3);
		
		System.out.println("Customer saved: " + customerRepository.count());
		
	}
	
}
