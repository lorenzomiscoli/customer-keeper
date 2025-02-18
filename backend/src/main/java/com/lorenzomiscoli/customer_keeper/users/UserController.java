package com.lorenzomiscoli.customer_keeper.users;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lorenzomiscoli.customer_keeper.users.models.UserDto;
import com.lorenzomiscoli.customer_keeper.users.models.UserLoginDto;
import com.lorenzomiscoli.customer_keeper.users.models.UserPasswordUpdateDto;
import com.lorenzomiscoli.customer_keeper.users.models.UserUpdateDto;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api/users")
class UserController {

	private final UserService userService;

	UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/authenticated")
	ResponseEntity<UserDto> findByAuth(@RequestHeader("Authorization") String auth) {
		UserLoginDto user = BasicAuthUtil.parseAuth(auth);
		return ResponseEntity.ok(userService.findDtoByUsername(user.username()));
	}

	@PatchMapping("/authenticated/password")
	ResponseEntity<Void> updatePwd(@RequestHeader("Authorization") String auth,
			@RequestBody @Valid UserPasswordUpdateDto userPwdUpdateDto) {
		UserLoginDto user = BasicAuthUtil.parseAuth(auth);
		userService.updatePwd(user.username(), userPwdUpdateDto.oldPassword(), userPwdUpdateDto.newPassword());
		return ResponseEntity.noContent().build();
	}

	@PatchMapping("/authenticated")
	ResponseEntity<Void> update(@RequestHeader("Authorization") String auth,
			@RequestBody @Valid UserUpdateDto userUpdateDto) {
		UserLoginDto user = BasicAuthUtil.parseAuth(auth);
		userService.update(user.username(), userUpdateDto);
		return ResponseEntity.noContent().build();
	}

}
