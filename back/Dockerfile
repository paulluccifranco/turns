FROM eclipse-temurin:21-jdk-alpine
ADD target/back-0.0.1-SNAPSHOT.jar back-0.0.1-SNAPSHOT.jar
ENV JAVA_OPTS=""
ENV OPTS=""
ENTRYPOINT java $JAVA_OPTS -jar back-0.0.1-SNAPSHOT.jar $OPTS
