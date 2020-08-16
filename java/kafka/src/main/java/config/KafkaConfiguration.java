package config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.kafka.core.ProducerFactory;

import controller.User;

public class KafkaConfiguration {
	@Bean
	public ProducerFactory<String, User> producerFactory() {
		Map<String, Object> config = new HashMap<>();
		
	}
}
