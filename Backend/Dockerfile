#FROM openjdk:17-jdk-slim
#VOLUME /tmp
#COPY target/taskmanager-0.0.1-SNAPSHOT.jar app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]

# Etapa 1: Construcción del JAR
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa 2: Imagen final más liviana
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copiamos solo el JAR ya compilado
COPY --from=build /app/target/taskmanager-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

