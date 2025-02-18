package com.lorenzomiscoli.customer_keeper.users;

import java.util.Base64;

import com.lorenzomiscoli.customer_keeper.users.models.UserLoginDto;

class BasicAuthUtil {

	static UserLoginDto parseAuth(String authorization) {
		var pair = new String(Base64.getDecoder().decode(authorization.replace("Basic", "").trim()));
		var username = pair.split(":")[0];
		var password = pair.split(":")[1];
		return new UserLoginDto(username, password);
	}

}
