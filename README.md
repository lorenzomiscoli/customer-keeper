# Customer Keeper

Web application to manage customer information.

## Preview

https://github.com/user-attachments/assets/34983697-6270-4376-b5ba-5deb4f12482b

## Features
- Manage customers
- Basic security authentication
- Clean and modern design

## Configuration

The application relies on a configuration YAML file named **application.yml** which is read when the program is started.

This file must be placed inside the resources folder of the backend project (backend/src/main/resources).


Configuration file example:

```yaml
server:
    port: 8080
   datasource:
      driver-class-name: org.postgresql.Driver
      url: jdbc:postgresql://customer-keeper-db/CustomerKeeper
      username: sa
      password: 0Ruxe@h6Tho0asWeC9nO
allowedOrigins: http://localhost, http://localhost:4200, http://localhost:80
```

The above file is configured to start the project using **Docker**, if you intend to use another database just change the datasource.

The application is protected by basic authentication so you'll need to provide the following credentials:

- username: admin
- password: admin_manager

You can then change password in the user settings section.

## Contributing

Contributions to Customer Keeper are always welcome!

See the [contribution guide](CONTRIBUTING.md) if you want to be a part of this project, it takes less than 2 minutes to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for more details.
