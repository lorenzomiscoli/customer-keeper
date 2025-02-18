package com.lorenzomiscoli.customer_keeper.users;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lorenzomiscoli.customer_keeper.common.exceptions.InvalidValueException;
import com.lorenzomiscoli.customer_keeper.common.exceptions.RecordNotFoundException;
import com.lorenzomiscoli.customer_keeper.users.models.UserDto;
import com.lorenzomiscoli.customer_keeper.users.models.UserLoginDto;
import com.lorenzomiscoli.customer_keeper.users.models.UserUpdateDto;

@Service
public class UserService {

	private final UserRepository userRepo;

	private final PasswordEncoder encoder;

	UserService(UserRepository userRepo, PasswordEncoder encoder) {
		this.userRepo = userRepo;
		this.encoder = encoder;
	}

	User findByUsername(String username) {
		return userRepo.findByUsername(username).orElseThrow(
				() -> new RecordNotFoundException("User with username: " + username + " could not be found"));
	}

	UserDto findDtoByUsername(String username) {
		return userRepo.findByUsername(username).map(User::toDto).orElseThrow(
				() -> new RecordNotFoundException("User with username: " + username + " could not be found"));
	}

	public Optional<UserLoginDto> findCredentialsByUsername(String username) {
		return userRepo.findCredentialsByUsername(username);
	}

	void updatePwd(String username, String oldPwd, String newPwd) {
		var user = findByUsername(username);
		if (!encoder.matches(oldPwd, user.getPassword())) {
			throw new InvalidValueException("Old password doesn't match the current one");
		}
		if (oldPwd.equals(newPwd)) {
			throw new InvalidValueException("New password cannot be equal to old password");
		}
		user.setPassword(encoder.encode(newPwd));
		userRepo.save(user);
	}

	void update(String username, UserUpdateDto userUpdateDto) {
		var user = findByUsername(username);
		user.setName(userUpdateDto.name());
		user.setLastname(userUpdateDto.lastname());
		user.setEmail(userUpdateDto.email());
		userRepo.save(user);
	}

}
