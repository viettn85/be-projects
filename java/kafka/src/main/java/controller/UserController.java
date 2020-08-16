package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kafka")
public class UserController {
	
	@Autowired
	KafkaTemplate<String, String> kafkaTemplate;
	
	@Autowired
	KafkaTemplate<String, User> kafkaTemplateForUser;
	
	private static final String TOPIC = "topic1";
	
	@GetMapping("/publish/msg/{message}")
	public String publishMessage(@PathVariable("message") final String message) {
		kafkaTemplate.send(TOPIC, message);
		return "Message published";
	}
	
	@GetMapping("/publish/user/{name}")
	public String publishUserInfo(@PathVariable("name") final String name) {
		kafkaTemplateForUser.send(TOPIC, new User(name, "IT", 3000L));
		return "Message published";
	}
}
