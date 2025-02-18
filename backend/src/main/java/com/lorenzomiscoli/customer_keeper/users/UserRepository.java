package com.lorenzomiscoli.customer_keeper.users;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lorenzomiscoli.customer_keeper.users.models.UserLoginDto;

interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByUsername(String username);

	@Query(value = "SELECT new com.lorenzomiscoli.customer_keeper.users.models.UserLoginDto(u.username, u.password)"
				+ " FROM User u WHERE u.username = :username")
	Optional<UserLoginDto> findCredentialsByUsername(String username);

}
