package edu.sas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sas.domain.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
