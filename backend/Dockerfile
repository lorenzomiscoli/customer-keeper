FROM maven:3.9.6-amazoncorretto-21-debian AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:resolve
COPY src ./src
RUN mvn package

FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build app/target/*.jar customer-keeper.jar
CMD ["java", "-jar", "customer-keeper.jar"]