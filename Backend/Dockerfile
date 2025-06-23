#FROM openjdk:17-jdk-slim
#VOLUME /tmp
#COPY target/taskmanager-0.0.1-SNAPSHOT.jar app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]
# Usamos una imagen base con Java 17, compatible con Spring Boot 3.x
FROM eclipse-temurin:17-jdk-alpine

# Creamos un directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el .jar generado desde Maven (ajusta el nombre si lo necesitas)
COPY target/taskmanager-0.0.1-SNAPSHOT.jar app.jar

# Exponemos el puerto que Render usará (Render escucha en 8080 por defecto)
EXPOSE 8080

# Comando de ejecución de Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
