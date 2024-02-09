# Metrics and Monitoring Experiment (Basic setup)

Welcome to the Metrics and Monitoring Experiment project! 🚀 This project serves as a playground for experimenting with various metrics and monitoring tools.

## Overview

The primary goal of this project is to explore and integrate components related to metrics, monitoring, and distributed systems. The project utilizes popular tools such as Elasticsearch, Kibana, Logstash, Prometheus, Alertmanager and RabbitMQ.

## Components 🛠️

### Elasticsearch

- **Purpose:** Indexing and searching metrics data.

### Kibana

- **Purpose:** Visualizing and exploring metrics data.

### Logstash

- **Purpose:** Collecting, processing, and forwarding logs and metrics.

### Prometheus

- **Purpose:** Monitoring and alerting.

### RabbitMQ

- **Purpose:** Message broker for distributed systems.

### Alertmanager

- **Purpose:** Alert manager for rules defined in prometheus.

### APPs
`npm run start-producer` produces messages onto the message bus.
`npm run start-consumer` consumes the messages and publish them to the logstash-bus.

## License 📝

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/). Your collaboration is not just appreciated; it's essential! Thank you for being a part of this project!