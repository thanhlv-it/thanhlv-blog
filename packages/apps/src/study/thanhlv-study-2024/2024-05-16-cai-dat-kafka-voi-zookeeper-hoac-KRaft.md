---
footer: true
title: Cài đặt Kafka với Zookeeper và Kraft
authors: ["lethanh"]
date: 2024-05-16
outline: deep
#image: /assets/event-and-message.UHUxhQ9h.jpeg
draft: false
group: 2.1 Kafka
---

# Cài đặt Kafka với Zookeeper và Kraft

Trong bài viết này, chúng ta sẽ cùng nhau bước vào hành trình khám phá Kafka đầu tiên khám phá Kafka bằng việc tìm hiểu các thành phần cần thiết để cài đặt kafka cũng như cách cài đặt kafka.
[[TOC]]

## Tại sao Kafka cần Zookeeper hoặc Kraft ?
**Đây là ý kiến cá nhân, là sự cảm nhận của mình nên có thể đúng hoặc sai.**
Một lưu ý trước tiên đó là Zookeeper là một component riêng và độc lập, còn Kraft là một thành phần nằm sẵn trong kafka từ phiên bản 2.8.0

Zookeeper hoặc Kraft đóng vai trò giúp quản lý, đồng bộ trạng thái, cấu hình của Kafka Cluster, một số khía cạnh chính khi sử dụng trong Kafka là:
- Quản lý metadata: Lưu trữ và quản lý các metadata liên quan đến Kafka Cluster bao gồm thông tin về Brokers, topic, partitions và replicas.
- Đồng bộ há và điều phối : Đóng vai trò là người điều phối, giúp đảm bảo các Brokers trong Cluster có trạng thái nhất quán, cũng cung cấp tính năng đồng bộ hóa các cấu hình và gửi các thay đổi đến các nodes trong cluster.
- Bầu Leader Partition: Bầu chọn Leader cho các Partition đảm bảo mỗi Partition có một Leader để xử lý yêu cầu ghi và đọc.
- Quản lý trạng thái của Brokers: Zookeeper theo dõi trạng thái hoạt động của các Broker trong Cluster thông qua cơ chế chế [heartbeat](https://demanejar.github.io/posts/hdfs-introduction/#:~:text=C%C6%A1%20ch%E1%BA%BF%20heartbeat,datanode%20%C4%91%C3%B3%20c%C3%B2n%20ho%E1%BA%A1t%20%C4%91%E1%BB%99ng.)
  - Khi một brokers định kỳ không gửi trạng thái báo cáo đang hoạt động đến Zookeeper, Zookeeper coi broker đó là đã chết và thông báo cho các Brokers khác trong Cluster để cho các brokers khác biết và thực hiện các thao tác phục hồi cần thiết.
- Rebalancing: Khi có sự thêm hoặc loại bỏ một brokers trong cluster, Zookeeper giúp điều phối quá trình rebalancing, đảm bảo dữ liệu được phân phối trên các Broker và các partition được sao chép.
## Zookeeper là gì ?
![Zookeeper-Architecture](2024-05-16-cai-dat-kafka-voi-zookeeper-hoac-KRaft/Zookeeper-Architecture.png)
Zookeeper là một open source cho centralized service để duy trì thông tin cấu hình, đặt tên và cung cấp đồng bộ hóa cho các ứng dụng phân tán.

Zookeeper Cho phép các process phân tán phối hợp với nhau thông qua một Share hierarchical namespace(Chia sẽ hệ thống tệp phân cấp), nó giống như một [File system](https://vi.wikipedia.org/wiki/H%E1%BB%87_th%E1%BB%91ng_t%E1%BA%ADp_tin)
![what-is-file-system-1.png](2024-05-16-cai-dat-kafka-voi-zookeeper-hoac-KRaft/what-is-file-system-1.png)
Trong đó mỗi một folder trong Share hierarchical namespace được gọi là Znodes. Mỗi Znodes trong Zookeeper name space được xác định bởi một path. Và mọi Znodes đều có cha mẹ có đường dẫn là prefix của Znodes hiện tại. Ngoại lệ duy nhaast là Root("/") sẽ không có cha mẹ.

::: details Ví dụ về Znodes
```
/opt/containerd/lib/
```

Nhìn vào đường dẫn ở trên chúng ta có thể nhận thấy là đang có 4 Znodes.
1. Znode Root chính là "/" đầu tiên từ trái qua phải, Znodes đầu tiên chứa các con là "opt"
 và có thể có nhiều con khác nữa.
2. Znode thứ 2 trong phân cấp có cha là **Root** là **Opt**
3. Znode thứ 3 trong phân cấp có cha là **opt** là **containerd**
4. Znode thứ 4 trong phân cấp có cha là **containerd** là **lib**
:::

Và giống như các [File system](https://vi.wikipedia.org/wiki/H%E1%BB%87_th%E1%BB%91ng_t%E1%BA%ADp_tin) khác,Znode cha không thể bị xóa nếu có các Znode con. Vì vậy muốn xóa Znode cha thì tất cả các Znode con cũng sẽ bị xóa.

Và Zookeeper để duy trì thông tin cấu hình, vì vậy các data trong Znode thường đo bằng kilobyte, thậm chí là byte.

::: details REF
https://cwiki.apache.org/confluence/display/ZOOKEEPER/ProjectDescription
:::

### Các tính năng chính của ZooKeeper bao gồm.
- **Đồng bộ hóa**: Zookeeper giúp đồng bộ hóa trạng thái giữa các node trong hệ thống phân tán, đảm bảo tất cả các node đều có dữ liệu nhất quán.
- **Đặt tên và cấu hình service**: ZooKeeper cung cấp một không gian tên phân cấp (giống như cấu trúc thư mục trong hệ thống tập tin) để lưu trữ và quản lý thông tin cấu hình, giúp các ứng dụng truy cập và quản lý cấu hình một cách dễ dàng.
- **Service discovery**:  Zookeeper có thể đụược sử dụng để theo dõi các node trong một cụm và quản lý thông tin về các service đang chạy trên các node đó, giúp các ứng dụng khác tìm và sử dụng các service này một cách hiệu quả.
- **Session Management**: Zookeeper quản lý các session cho các client kết nối đến nó. Mỗi client sẽ có một session làm việc riêng với Zookeeper và Zookeeper đảm bảo rằng trạng thái được duy trì liên tục vào Session đó.
  - Nếu một client mất kết nối, Zookeeper có thể phát hiện và xử lý tình huống đó và đồng thời thông báo cho các client khác về sự thay đổi trạng thái.
- **Nhất quán dữ liệu giữa các node**:
  - Zookeeper đảm bảo tính nhất quán của dữ liệu thông qua một thuật toán tên là : Zab (ZooKeeper Atomic Broadcast) thuật toán này đảm bảo rằng tất cả các thay đổi đối với cấu trúc dữ liệu của Zookeeper được áp dụng một cách đồng bộ trên tất cả các Node trong cụm.
- **Cơ chế Watchers**: Cơ chế này cho phép các client đăng ký nhận thông báo khi có sự thay đổi đối với dữ liệu mà họ quan tâm. Khi có dữ liệu tại một znode thay đổi, các client đăng ký watcher sẽ nhận đưược thông báo, điều này giúp các ứng dụng phản ứng nhanh chóng với các thay đổi trong cấu hình hoặc trạng thái của hệ thống

![Zookeeper-Architecture](2024-05-16-cai-dat-kafka-voi-zookeeper-hoac-KRaft/Zookeeper-Architecture.png)
Zookeeper duy trì một cấu chúc dữ liệu phân cấp và lưu trữ các dữ liệu trong các Node gọi là Znodes. Mỗi Znodes có thể chứa dữ liệu và có thể có các Znode con. Zookeeper đảm bảo rằng tất cả các bản sao của cơ sở dữ liệu các nó trên các node(Node zookeeper) khác nhau đều được cập nhật với trạng thái nhất quán.

### Setup Kafka với Zookeeper.

Chúng ta sẽ tìm hiểu cách setup thông qua docker và cài trực tiếp trên máy chủ. 

Mỗi loại sẽ có setup kiểu single-node(Dành cho môi trường phát triển local) và cluster dành cho môi trường Release.

Tuy nhiên vì là học tập nên tại thời điểm này mình sẽ học cài với docker, cài trực tiếp trên máy chủ mình sẽ cập nhật sau.

#### Docker
##### Single-node
docker-compose.yml
```docker-compose.yml
version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.4.4
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - 22181:2181
    volumes:
      - ./data/zoo/data:/var/lib/zookeeper/data
      - ./data/zoo/log:/var/lib/zookeeper/log
  kafka:
    image: confluentinc/cp-kafka:7.4.4
    depends_on:
      - zookeeper
    ports:
      - 29092:29092
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092,PLAINTEXT_HOST://localhost:29092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    volumes:
      - ./data/broker/data:/var/lib/kafka/data
  init-topic-kafka:
    image: confluentinc/cp-kafka:7.4.4
    depends_on:
      - kafka
    entrypoint: [ '/bin/sh', '-c' ]
    command: |
      "
      # sleep 15
      sleep 15
      # blocks until kafka is reachable
      kafka-topics --bootstrap-server kafka:9092 --list
      
      echo -e 'Creating kafka topics'
      kafka-topics --bootstrap-server kafka:9092 --create --if-not-exists --topic my-topic-2 --replication-factor 1 --partitions 1
      
      echo -e 'Successfully created the following topics:'
      kafka-topics --bootstrap-server kafka:9092 --list
      "
```
##### Cluster

docker-compose.yml

Thực tế khi setup Cluster thì các Kafka không kết nối trực tiếp đến nhau, Để setup thành một Cluster thì có 2 cách sau.
1. Tất cả Kafka node cùng kết nối đến một `zookeeper`.
![apache-kafka-architecture.webp](2024-05-16-cai-dat-kafka-voi-zookeeper-hoac-KRaft/apache-kafka-architecture.webp)
2. Tạo các Cluster `zookeeper`. Khi Kafka kết nối đên Cluster bằng cách kết nối 1-N các Node ở zookeeper trong Cluster `zookeeper`.
  1. Thông thường Kafka sẽ kết nối đến tất cả các node `zookeeper` và số node `zookeeper` hiếm khi hay đổi.

```docker-compose.yml
version: '3'
services:
  zookeeper-1:
    image: confluentinc/cp-zookeeper:7.4.4
    container_name: "zookeeper-1"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
      ZOOKEEPER_SERVER_ID: 1
      ZOOKEEPER_SERVERS: zookeeper-1:2888:3888;zookeeper-2:2888:3888
    ports:
      - 22181:2181
    volumes:
      - ./data/zoo_1/data:/var/lib/zookeeper/data
      - ./data/zoo_1/log:/var/lib/zookeeper/log
    networks:
      - example-network
  zookeeper-2:
    image: confluentinc/cp-zookeeper:7.4.4
    container_name: "zookeeper-2"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
      ZOOKEEPER_SERVER_ID: 2
      ZOOKEEPER_SERVERS: zookeeper-1:2888:3888;zookeeper-2:2888:3888
    ports:
      - 22182:2181
    volumes:
      - ./data/zoo_2/data:/var/lib/zookeeper/data
      - ./data/zoo_2/log:/var/lib/zookeeper/log
    networks:
      - example-network
  kafka-1:
    image: confluentinc/cp-kafka:7.4.4
    container_name: "kafka-1"
    depends_on:
      - zookeeper-1
    ports:
      - 29092:29092
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper-1:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka-1:9092,PLAINTEXT_HOST://localhost:29092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    volumes:
      - ./data/broker-1/data:/var/lib/kafka/data
    networks:
      - example-network
  kafka-2:
    image: confluentinc/cp-kafka:7.4.4
    container_name: "kafka-2"
    depends_on:
      - zookeeper-2
    ports:
      - 29093:29093
    environment:
      KAFKA_BROKER_ID: 2
      KAFKA_ZOOKEEPER_CONNECT: zookeeper-2:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka-2:9092,PLAINTEXT_HOST://localhost:29093
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    volumes:
      - ./data/broker-2/data:/var/lib/kafka/data
    networks:
      - example-network
  init-kafka:
    image: confluentinc/cp-kafka:7.4.4
    networks:
      - example-network
    entrypoint: [ '/bin/sh', '-c' ]
    command: |
      "
      # sleep 15
      # sleep 15
      # blocks until kafka is reachable
      kafka-topics --bootstrap-server kafka-1:9092 --list
      
      echo -e 'Creating kafka topics'
      kafka-topics --bootstrap-server kafka-2:9091 --create --if-not-exists --topic my-topic-2 --replication-factor 2 --partitions 5
      
      echo -e 'Successfully created the following topics:'
      kafka-topics --bootstrap-server kafka-1:9092 --list
      "
networks:
  example-network:
    external: true
```
### Setup Kafka với kraft.
https://docs.confluent.io/platform/current/installation/docker/config-reference.html#required-ak-configurations-for-kraft-mode
##### Cluster
create_cluster_id.sh
Tạo ngẫu nhiên ID cụm
```
/bin/bash

file_path="/tmp/clusterID/clusterID"

if [ ! -f "$file_path" ]; then
  /bin/kafka-storage random-uuid > /tmp/clusterID/clusterID
  echo "Cluster id has been  created..."
fi
```

Thực hiện chạy cụm, như tài liệu ở trên có nói, để xác định chạy cụm với Zookeeper hay Kraft thì sẽ có 1 số biến cần config để xác định đó là Kraft, nếu không mặc định sẽ là Zookeeper.
- `KAFKA_PROCESS_ROLES`, `KAFKA_NODE_ID`, `KAFKA_CONTROLLER_QUORUM_VOTERS`, `KAFKA_CONTROLLER_LISTENER_NAMES` và `CLUSTER_ID` nếu dùng biến môi trường hoặc có thể dùng file trên máy chủ.

docker-compose.yml
```
version: "3"
services:
#  kafka-gen:
#    image: confluentinc/cp-kafka:7.4.4
#    hostname: kafka-gen
#    container_name: kafka-gen
#    volumes:
#      - ./scripts/create_cluster_id.sh:/tmp/create_cluster_id.sh
#      - ./clusterID:/tmp/clusterID
#    command: "bash -c '/tmp/create_cluster_id.sh'"

  kafka1:
    image: confluentinc/cp-kafka:7.4.4
    hostname: kafka1
    container_name: kafka1
    ports:
      - "39092:39092"
    environment:
      KAFKA_LISTENERS: BROKER://kafka1:19092,EXTERNAL://kafka1:39092,CONTROLLER://kafka1:9093
      KAFKA_ADVERTISED_LISTENERS: BROKER://kafka1:19092,EXTERNAL://localhost:39092
      KAFKA_INTER_BROKER_LISTENER_NAME: BROKER
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: CONTROLLER:PLAINTEXT,BROKER:PLAINTEXT,EXTERNAL:PLAINTEXT
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
      KAFKA_PROCESS_ROLES: 'controller,broker'
      KAFKA_NODE_ID: 1
      KAFKA_CONTROLLER_QUORUM_VOTERS: '1@kafka1:9093,2@kafka2:9093,3@kafka3:9093'
      KAFKA_METADATA_LOG_SEGMENT_MS: 15000
      KAFKA_METADATA_MAX_RETENTION_MS: 1200000
      KAFKA_METADATA_LOG_MAX_RECORD_BYTES_BETWEEN_SNAPSHOTS: 2800
      KAFKA_LOG_DIRS: '/tmp/kraft-combined-logs'
      CLUSTER_ID: 'LLvEj5aqR46S0qSIwFUhyw'
    volumes:
      - ./data/broker-1/data:/var/lib/kafka/data
    command: "bash -c '/etc/confluent/docker/run'"
    networks:
      - example-network

  kafka2:
    image: confluentinc/cp-kafka:7.4.4
    hostname: kafka2
    container_name: kafka2
    ports:
      - "39093:39093"
    environment:
      KAFKA_LISTENERS: BROKER://kafka2:19093,EXTERNAL://kafka2:39093,CONTROLLER://kafka2:9093
      KAFKA_ADVERTISED_LISTENERS: BROKER://kafka2:19093,EXTERNAL://localhost:39093
      KAFKA_INTER_BROKER_LISTENER_NAME: BROKER
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: CONTROLLER:PLAINTEXT,BROKER:PLAINTEXT,EXTERNAL:PLAINTEXT
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
      KAFKA_PROCESS_ROLES: 'controller,broker'
      KAFKA_NODE_ID: 2
      KAFKA_CONTROLLER_QUORUM_VOTERS: '1@kafka1:9093,2@kafka2:9093,3@kafka3:9093'
      KAFKA_METADATA_LOG_SEGMENT_MS: 15000
      KAFKA_METADATA_MAX_RETENTION_MS: 1200000
      KAFKA_METADATA_LOG_MAX_RECORD_BYTES_BETWEEN_SNAPSHOTS: 2800
      KAFKA_LOG_DIRS: '/tmp/kraft-combined-logs'
      CLUSTER_ID: 'LLvEj5aqR46S0qSIwFUhyw'
    volumes:
      - ./data/broker-2/data:/var/lib/kafka/data
    command: "bash -c '/etc/confluent/docker/run'"
    networks:
      - example-network

  kafka3:
    image: confluentinc/cp-kafka:7.4.4
    hostname: kafka3
    container_name: kafka3
    ports:
      - "39094:39094"
    environment:
      KAFKA_LISTENERS: BROKER://kafka3:19094,EXTERNAL://kafka3:39094,CONTROLLER://kafka3:9093
      KAFKA_ADVERTISED_LISTENERS: BROKER://kafka3:19094,EXTERNAL://localhost:39094
      KAFKA_INTER_BROKER_LISTENER_NAME: BROKER
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: CONTROLLER:PLAINTEXT,BROKER:PLAINTEXT,EXTERNAL:PLAINTEXT
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
      KAFKA_PROCESS_ROLES: 'controller,broker'
      KAFKA_NODE_ID: 3
      KAFKA_CONTROLLER_QUORUM_VOTERS: '1@kafka1:9093,2@kafka2:9093,3@kafka3:9093'
      KAFKA_METADATA_LOG_SEGMENT_MS: 15000
      KAFKA_METADATA_MAX_RETENTION_MS: 1200000
      KAFKA_METADATA_LOG_MAX_RECORD_BYTES_BETWEEN_SNAPSHOTS: 2800
      KAFKA_LOG_DIRS: '/tmp/kraft-combined-logs'
      CLUSTER_ID: 'LLvEj5aqR46S0qSIwFUhyw'
    volumes:
      - ./data/broker-3/data:/var/lib/kafka/data
    command: "bash -c '/etc/confluent/docker/run'"
    networks:
      - example-network
  kafka-ui:
    container_name: kafka-ui
    restart: unless-stopped
    image: 'provectuslabs/kafka-ui:latest'
    ports:
      - "8080:8080"
    environment:
      - KAFKA_CLUSTERS_0_BOOTSTRAP_SERVERS=localhost:39092,localhost:39093,localhost:39094
      - KAFKA_CLUSTERS_0_NAME=LLvEj5aqR46S0qSIwFUhyw
    networks:
      - example-network
networks:
  example-network:
    external: true
```
- Các file config sẽ nằm ở trong folder `/etc/kafka/`
![kafka-folder-config.png](2024-05-16-cai-dat-kafka-voi-zookeeper-hoac-KRaft/kafka-folder-config.png)

##
Trong bài viết này mình sẽ chỉ làm đơn giản về cách thứ setup Kafka, mình sẽ có một bài khác nói về chi tiết các cách thức cài đặt kafka cũng như ưu và nhược điểm.

# REF:
- https://www.baeldung.com/ops/kafka-docker-setup
- https://viblo.asia/p/007-simple-kafka-producer-client-api-voi-java-WAyK86PplxX
- https://stackoverflow.com/questions/61002881/docker-compose-doesnt-save-data-in-volume/61008432#61008432
- Kafka tool view: https://kafkatool.com/ 
- https://aws.amazon.com/blogs/big-data/best-practices-for-running-apache-kafka-on-aws/
