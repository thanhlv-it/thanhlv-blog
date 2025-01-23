---
footer: true
title: Message queue là gì ?
authors: ["lethanh"]
date: 2024-04-15
image: /assets/message-queue-small-3.psV3COIL.webp
outline: deep
draft: false
group: 2. Message and event stream
---
# Message queue là gì ?

Kiến thức đầu tiên chúng ta đã cùng học với nhau là [**Message**](2024-04-15-message-la-gi.md), trong bài viết này chúng ta sẽ cùng nhau tìm hiểu về [**Message queue**](2024-04-15-message-queue-la-gi.md).

[[TOC]]

## Vậy Message queue là gì ?
![message-queue-small](2024-04-15-message-queue-la-gi/message-queue-small.webp)

Trong nhu cầu trao đổi thông tin sử dụng Message, để [gửi và nhận Message có nhiều phương pháp](2024-04-15-message-la-gi.md#cac-phuong-phap-trao-đoi-message-giua-cac-he-thong), trong đó [**Message queue (Hàng đợi tin nhấn)**](2024-04-15-message-queue-la-gi.md) là 1 trong nhiều phương pháp phổ biến được sử dụng trong các hệ thống lớn.

[**Message queue (Hàng đợi tin nhấn)**](2024-04-15-message-queue-la-gi.md) là một component trong [system's architecture](../../blog/2024-02-01-tim-hieu-ve-architecture.md#đac-điem-cua-software-architecture) hỗ trợ buffer và phân phối các Message bất đồng bộ.  
![Producer-Consumer-buffer](2024-04-15-message-queue-la-gi/Producer-Consumer-buffer.png)

Cơ chế của [**Message queue (Hàng đợi tin nhấn)**](2024-04-15-message-queue-la-gi.md) là lưu trữ các tin nhắn ([**Message**](2024-04-15-message-la-gi.md)) trong một hàng đợi(Queue) theo thứ tự tuần tự hoặc ưu tiên và sẽ được chuyển đến một đích(Thành phần nhận, Consumer ) đã chỉ định.

Những [**Message**](2024-04-15-message-la-gi.md) chưa thể gửi đến Consumer đã chỉ định sẽ tiếp tục ở trong Queue cho đến khi Consumer sẵn sàng để xử lý Message.

Trong một hệ thống có [**Message queue (Hàng đợi tin nhấn)**](2024-04-15-message-queue-la-gi.md), các tin nhắn được gửi từ một ứng dụng **A** đến ứng dụng **B** sẽ được tạm thời lưu trữ trong hàng đợi(Queue) trước khi được ứng dụng B lấy ra và xử lý. Điều này sẽ cho phép các ứng dụng làm việc độc lập với nhau, không cần kết nối trực tiếp và hoạt động trên process riêng biệt.

## Các thành phần chính của Message queue.
![message-queue-small-3](2024-04-15-message-queue-la-gi/message-queue-small-3.webp)
- **Producer**: Là (bộ phận/thành phần) tạo ra [**Message**](2024-04-15-message-la-gi.md) chứa các thông tin để tương tác với thành phần khác. [**Message**](2024-04-15-message-la-gi.md) này sẽ được truyền vào [**Message queue (Hàng đợi tin nhấn)**](2024-04-15-message-queue-la-gi.md).
- **Consumer**: Là (bộ phận/thành phần) trong hệ thống nhận [**Message**](2024-04-15-message-la-gi.md) từ Producer thông qua [**Message queue (Hàng đợi tin nhấn)**](2024-04-15-message-queue-la-gi.md) để xử lý tin nhắn.
- [**Message**](2024-04-15-message-la-gi.md): Thông tin(Thông điệp) thường được tạo dạng text hoặc JSON, tuy nhiên nó có thể là Binary hoặc bất kỳ dạng nào. [**Message**](2024-04-15-message-la-gi.md) sẽ do Producer tạo ra.
- **Message Queue**: Nơi lưu trữ tạm thời các [**Message**](2024-04-15-message-la-gi.md) cho tới khi Consumer lấy ra và xử lý.
- **Broker**: Xử lý Message và quản lý [**Message**](2024-04-15-message-la-gi.md) để đảm bảo Producer và Consumer sẽ truyền thông tin được cho nhau, Broker giúp định tuyến Message đến đúng queue, quản lý trạng thái của Queue, và đảm bảo [**Message**](2024-04-15-message-la-gi.md) được chuyển đến đúng Consumer và không bị mất message.
  - thành phần EXCHANGES sẽ nằm trong Broker, EXCHANGES sẽ giúp định tuyến Message đến đúng queue.
- **Channel** : là cơ chế truyền thông tin giữa Producer và Consumer thông qua Message Queue. Channel đóng vai trò như là một cầu nối để truyền Message qua lại giữa các bên. Mỗi channel là một kết nối riêng biệt giữa thành phần đến Broker.
  ![mesage-broker.webp](2024-04-15-message-queue-la-gi/mesage-broker.webp)

## Producers và consumers and Message Brokers
![message-queue-small-3](2024-04-15-message-queue-la-gi/message-queue-small-3.webp)

### Message producers
Producer là một thành phần thực hiện tạo ra [**Message**](2024-04-15-message-la-gi.md) hợp lệ(Format, valid) và gửi [**Message**](2024-04-15-message-la-gi.md) đó đến Queue. 

Các Producer thường đóng vai trò là nguồn cung cấp, tạo [**Message**](2024-04-15-message-la-gi.md) hoặc [**Event**](2024-04-16-event-la-gi.md) để cung cấp cho các hệ thống ví dụ [**Message queue (Hàng đợi tin nhấn)**](2024-04-15-message-queue-la-gi.md) hoặc [Event Stream](2024-04-21-event-stream-va-event-stream-platform-la-gi.md) hoặc các hệ thống khác.

Message producer cũng có thể được gọi là message publishers vì cần gửi(submit) Message đến Queue.

Message producer sẽ giao tiếp với [**Message queue (Hàng đợi tin nhấn)**](2024-04-15-message-queue-la-gi.md) trên một channel sử dụng 1 giao thức nào đó. Ví dụ AMQP thì sẽ sử dụng giao thức `Advanced Message Queuing Protocol`

### Message Consumers
Consumer là một thành phần thực hiện nhận [**Message**](2024-04-15-message-la-gi.md) từ [**Message queue (Hàng đợi tin nhấn)**](2024-04-15-message-queue-la-gi.md) và xử lý yêu cầu đó theo logic nghiệp vụ.

Các Consumer đóng vai trò là thành phần nhận [**Message**](2024-04-15-message-la-gi.md) từ [**Message queue (Hàng đợi tin nhấn)**](2024-04-15-message-queue-la-gi.md) và thực hiện xử lý yêu cầu.

### Message Brokers

Một Message Brokers được base từ Queue, chúng ta cũng có thể dễ dàng triển khai một ví dụ đơn giản ngôn ngữ.

```java
import java.util.LinkedList;
import java.util.Queue;

public class QueueExample {
    public static void main(String[] args) {
        // Tạo một Queue sử dụng LinkedList
        Queue<String> queue = new LinkedList<>();

        // Thêm các phần tử vào Queue
        queue.offer("Người 1");
        queue.offer("Người 2");
        queue.offer("Người 3");

        System.out.println("Các phần tử trong queue: " + queue);

        // Lấy ra và xóa phần tử đầu tiên của Queue
        String removedElement = queue.poll();
        System.out.println("Phần tử được lấy ra và xóa khỏi queue: " + removedElement);

        // Hiển thị các phần tử còn lại trong Queue sau khi xóa
        System.out.println("Các phần tử còn lại trong queue sau khi xóa: " + queue);
    }
}
```
Một ví đơn giản IMPL queue giới hạn xử lý yêu cầu tại 1 thời điểm với Nodejs

```javascript
const {delay} = require("../utils");

class QueueExpress {
    constructor(maxProcess) {
        this.items = [];
        this.currenProcess = 0;
        this.maxProcess = maxProcess;
        const ref = this;
        setInterval(function () {
            (async () => {
                if (ref.currenProcess < ref.maxProcess) {
                    const item = ref.dequeue();
                    if (!item) {
                        return;
                    }
                    ref.currenProcess++;
                    await item.callBack(item.req, item.res, item.next);
                    await delay(2)
                    ref.currenProcess--;
                }
            })();
        }, 2);
    }

    add(item) {
        this.items.push(item);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    // Phương thức kiểm tra hàng đợi có trống không
    isEmpty() {
        return this.items.length === 0;
    }
}

class QueueExpressData {
    constructor(req, res, next, callBack) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.callBack = callBack;
    }
}
```
Một hệ thống [**Message queue (Hàng đợi tin nhấn)**](2024-04-15-message-queue-la-gi.md) có thể đơn giản như ví dụ ở trên hoặc thêm các logic phức tạp để xử lý router rules, lưu trữ và phục hồi(persistence), bảo mật....etc..

#### Các ví dụ đơn giản đến phức tạp để triển khai Message Queue.

1. Các component impl queue sử dụng chung một folder shared cho phép đọc và ghi.
2. Một component độc lập được hỗ trợ bởi SQL database để lưu trữ (Nhiều queue nhỏ hoặc đơn giản thường sử dụng)
3. Một Broker chuyên dụng để triển khai [**Message queue (Hàng đợi tin nhấn)**](2024-04-15-message-queue-la-gi.md) có chức năng nhận Message request, lưu trữ và gửi đến queue đến người nhận [**Message**](2024-04-15-message-la-gi.md).

#### Thế nào là Message brokers?
![mesage-broker.webp](2024-04-15-message-queue-la-gi/mesage-broker.webp)
Khi Message queue được triển khai bằng chiến lược cuối cùng(3) thì chúng được gọi là Message Brokers.

Message brokers là một component độc lập trong quá trình setup, nó đứng giữa và quản lý quá trình giao tiếp giữa Producers và consumers

Vì là một component độc lập nên các Message brokers thường có các tính năng sau

1. Permissions control(Quản lý quyền đọc, ghi)
2. Message validation.
3. Failure recovery
4. Message routing rules
5. Communication protocol (giao thức giao tiếp, có thể sử dụng các protocol khác hoặc tự impl)
6. ...

Các Brokers thường được tối ưu hóa để concurrency and throughput tốt và khả năng phục hồi khi có sự cố.



### Ví dụ Message queue
- Bạn và bạn bè(**producer**) vào 1 nhà hàng và thực hiện yêu cầu gọi món ăn(**Message request**) và giao nó cho người phục vụ(**Message Queue**), người phục vụ sẽ giữ và giao tất cả các yêu cầu món ăn(**Message Order**) đến nhà bếp(**Consumer**) nơi thực hiện phục vụ yêu cầu.

- Sau khi đầu bếp (**producer**) hoàn thành nấu tất cả món ăn trong yêu cầu(**Xử lý yêu cầu hoàn tất**), đầu bếp sẽ thực yêu cầu gửi món ăn cho khách hàng(**Message request**) bằng cách giao nó cho người phục vụ(**Message Queue**), người phục vụ sẽ giữ và giao tất cả món ăn(**Message Order**) cho khách hàng(**Consumer**).

### Hợp động giữa producers và Consumers

Producers và Consumers hoạt động trên các process hoặc hệ thống độc lập, hợp đồng duy nhất tồn tại giữa Producers và Consumers là [Format Message](2024-04-15-message-la-gi.md#message-la-gi-1) thứ mà họ sử dụng để giao tiếp và hiểu yêu cầu của nhau.

Format Message có thể ở nhiều trạng: Json, XML, Text, Byte,...etc..


:::warning Lưu ý:
Đối với Message Queue, Message Queue sẽ không được thực hiện **Message transformation**. Hiểu đơn giản là không được thay đổi thông điệp gốc sang thông điệp mới.

Vì vậy các Message có thể được mã hóa bởi **producer**, miễn là trong hợp đồng [Format Message](2024-04-15-message-la-gi.md#message-la-gi-1) có điều này.

:::

### Thông tin thêm
Hầu hết và best nhất là Consumers là các thành phần độc lập và thường sẽ chỉ thực hiện làm các nghiệm vụ duy nhất: Mail Service nhận yêu cầu gửi email và trách nghiệm duy nhất của nó là gửi Email.

Một hệ thống tách rời tốt là Consumer không nên biết và có bất cứ thông tin gì về Producer mà chỉ phụ thuộc vào các Message hợp lệ nhận được từ Message Queue.

## Các chiến lược consumer nhận message(message transfer models)
Một câu hỏi là : Message queue cần gửi Message đến Consumer, vậy làm cách nào để Consumers biết rằng đang có tin nhắn trong queue cần xử lý ?

Tùy thuộc vào cách triển khai của Consumer, Message Queue thường hỗ cả 2 loại sau. Chiến lược Poling strategy này được thực hiện theo khoảng thời gian đã setup trước ở phía consumer

### Chiến lược Pull Model.

Trong model này, Consumer sẽ kết nối đến Message queue và định kỳ kiểm tra queue
![message-queue-consumer-pull-model.webp](2024-04-15-message-queue-la-gi/message-queue-consumer-pull-model.webp)

Phương giáp này được gọi là Pull bởi vì consumer là người kiểm tra định kỳ xem liệu có Message nào có sẵn để consume không.

### Chiến lược Push model

Trong model này, sau khi một Message được gửi từ Producer và được thêm vào Message Queue, Message queue sẽ chủ động gửi Message đến Consumer đang chờ đợi nhận Message.
![message-queue-consumer-push-model.webp](2024-04-15-message-queue-la-gi/message-queue-consumer-push-model.webp)

Message được gửi đến Consumer theo một rate config mà tốc độ của consumer có thể xử lý hoặc theo cấu hình từ phía consumer khi kết nối đến Message broker

## Các chiến lược đăng ký nhận Message (Consumer Subscription Methods)
Ngoài chiến lược consumer nhận message chúng ta cũng cần quan tâm đến cách consumer có thể đăng ký nhận message từ Message queue để đảm bảo rằng họ nhận được đúng Message.
Message cần được chuyển đến đúng người để tránh nhẫm lẫn.

Có nhiều chiến lược đăng ký, nhưng 2 chiến lược này là phổ biến nhất.

### Chiến lược xếp hàng các công nhân( Direct worker queue method )

Phương pháp này giúp đạt được sự phẩn bổ tải giữa nhiều instance của cùng một consumer.
![consumer-sub-model-direct-worker.webp](2024-04-15-message-queue-la-gi/consumer-sub-model-direct-worker.webp)

Trong chiến lược này, produces và consumer chỉ cần biết tên của Queue, bằng cách này Produce có thể biết nơi cần push Message và Consumer sẽ biết nơi nhận Message.

Các consumer sẽ cạnh tranh để nhận được Message, mỗi Message được gửi từ Producer đến Message Queue sẽ chỉ được chuyển cho một Consumer.

Theo cách này một consumer trong tập hợp nhiều instance của consumer sẽ chỉ nhận thấy 1 số Message trong tổng số rất nhiều Message được gửi đến Queue.

Một trong những ứng dụng phổ biến của chiến lược này là phân phối các nghiệm vụ đến các worker. Consumer có thể dễ dàng mở rộng bằng cách thêm nhiều instance.

Ví dụ: Cần gửi email cho 1 tỉ người, Một tỷ Message sẽ được push dần dần đến Queue và các Consumer sẽ nhận Message và thực hiện gửi email.

<video controls>
  <source src="/study/thanhlv-study-2024/2024-04-15-message-queue-la-gi/video_queue.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

### Chiến lược Publish/subscribe (Publish/subscribe method)

Chiến lược này Message sẽ được gửi đến một topic chứ không phải một Queue. Mỗi Consumer được kết nối đến Broker sẽ duy trì một Queue riêng để nhận các Message từ topic.

Không giống như chiến lược **Direct worker queue method**, với chiến lược này Nhiều Consumer có logic khác nhau cùng nhận 1 Message sẽ thực hiện các chức năng khác nhau.

**Ví dụ:** Một tin nhắn "**Mua hàng thành công**" được gửi đến topic "**Mua hàng thành công topic**".

- Một consumer chịu trách nghiệm tạo ra Hóa Đơn PDF sau đó push Message đến Queue để cho consumer gửi Email xử lý.

- Một consumer chịu trách nghiệm push thông báo đến ứng dụng di động của người dùng.

![consumer-sub-model-publish-subscribe.webp](2024-04-15-message-queue-la-gi/consumer-sub-model-publish-subscribe.webp)

Consumer đăng ký một topic, và khi có một Message mới. Message đó sẽ được sao chép và gửi đến tất cả các Queue của người đăng ký Topics. Chiến lược này sử dụng **observer pattern paradigm**

Chiến lược này chúng ta có thể dễ ràng bổ xung thêm chức năng, ví dụ chúng ta có thể thêm một Consumer lưu trữ data để dành cho phân tích dữ liệu.

<video controls>
  <source src="/study/thanhlv-study-2024/2024-04-15-message-queue-la-gi/video_queue_topic.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

## Mô tả đơn giản các thức hoạt động của Message Queue.
1. Producer tạo ra Message cần truyền đi. Message này sẽ được truyền vào Message Queue thông qua Channel và được lưu trữ tạm thời tại đây.
2. Consumer lấy(Chủ động lấy) hoặc nhận Message(Queue chủ động gửi đến) từ Message Queue. Thông tin thường được lấy theo cơ chế FIFO(First in - First out), tuy nhiên vẫn có thể can thiệp vào cơ chế này thông qua định ra mức độ ưu tiên của Message.
   - Tùy cách triển khai của Message Queue mà Consumer sẽ chủ động lấy dữ liệu hoặc bị động hoặc có thể hỗ trợ cả 2. 
3. Sau khi Consumer nhận được Message sẽ xử lý Message và thực hiện các hành động tùy vào logic nghiệp vụ của hệ thống.

## Ưu điểm của Message Queue
1. **Tăng cường khả năng mở rộng**: Bởi vì Producer và Consumer được deploy trên các process hoặc máy chủ riêng biệt và giao tiếp thông qua trung gian Message Queue nên có thể dễ ràng mở rộng quy mô của Consumer để tăng tốc độ xử lý.
2. **Ngôn ngữ đáp ứng yêu cầu**: Bởi vì Producer và Consumer là các thành phần độc lập nên có thể lựa chọn ngôn ngữ phát triển riêng cho từng thành phần để tối ưu chi phí, hiệu suất....
3. **Đồng bộ hoặc không đồng bộ:** :Message có thể được gửi một cách đồng bộ, Producer sẽ chờ đợi phản hồi của Consumer trước khi tiếp tục, hoặc không đồng bộ nơi Producer tiếp tục công việc mà không cần chờ phản hồi.
4. **Tăng mức độ tin cậy**: Đảm bảo Message chắc chắn sẽ được gửi đến Consumer. Ngay cả khi thời điểm Producer gửi Message Consumer không sẵn sàng thì sau khi sẵn sàng Consumer sẽ xử lý yêu cầu.
   - Message được lưu trữ trong Queue cho đến khi thành phần Consumer sẵn sàng nhận.
   - Giảm duy cơ mất Message và yêu cầu không được thực hiện, đảm bảo chắc chắn luôn nhận được tin nhắn ngay lập tức hoặc tương lai.
5. **Loại bỏ giao tiếp giữa các ứng dụng**:  Loại bỏ giao tiếp giữa các ứng dụng, các giao tiếp sẽ thực hiện thông qua Message Queue, với cách thông thường Ứng dụng có thể sẽ cần kết nối đến hàng chục, trăm thành phần khác, nhưng nếu sử dụng Message Queue thì chỉ cần kết nối đến Message Queue.
6. **Căn bằng lưu lượng**: Bởi vì tin nhắn thường được gửi từ Message Queue đến Consumer, vì vậy Message Queue có thể cân bằng lưu lượng truy cập đột biến, đảm bảo hệ thống không bị quá tải và sập khi có yêu cầu tăng đột biến.

## Nhược điểm của Message Queue.
- **Độ trễ trong xử lý**: Việc sử dụng message queue có thể gây ra độ trễ trong xử lý do thời gian cần thiết để đưa thông điệp vào hàng đợi và sau đó xử lý chúng. Điều này có thể không phù hợp với các ứng dụng yêu cầu thời gian thực hoặc phản hồi tức thì.
- **Quản lý trạng thái phức tạp**: Khi sử dụng message queue, việc quản lý trạng thái của các thông điệp trở nên phức tạp hơn, đặc biệt là trong các hệ thống phân tán với số lượng lớn các thông điệp và các tiến trình xử lý.
- **Tăng độ phức tạp của hệ thống**: Việc tích hợp và quản lý message queue đòi hỏi phải thêm một lớp trung gian vào hệ thống, làm tăng độ phức tạp của kiến trúc hệ thống và yêu cầu kỹ năng cao hơn từ nhà phát triển để thiết kế và bảo trì.
- **Khả năng mất mát dữ liệu**: Trong một số trường hợp, nhất là khi hệ thống gặp sự cố, có khả năng mất mát thông điệp nếu message queue không được cấu hình để đảm bảo độ tin cậy cao hoặc không có cơ chế sao lưu và phục hồi dữ liệu hiệu quả.
- **Tài nguyên và chi phí**: Việc duy trì một hệ thống message queue đòi hỏi tài nguyên máy chủ và băng thông mạng, đặc biệt là với các hệ thống lớn và phức tạp. Điều này có thể dẫn đến chi phí cao hơn cho cơ sở hạ tầng và quản lý.
- **Khó khăn trong việc debug và giám sát**: Việc theo dõi và giám sát luồng thông điệp trong message queue có thể trở nên khó khăn, đặc biệt là khi xử lý lỗi hoặc tìm kiếm nguyên nhân của sự cố trong hệ thống phân tán.
- **Nguy cơ sập toàn hệ thống**: Nếu hệ thống Message Queue bị sập, nguy cơ toàn hệ thống bị sập có thể xảy ra, vì mọi giao tiếp đều thông qua Message Queue. Vì vậy khi triển khai xử dụng Message Queue cần phòng ngừa điều này.

## Một số Message Queue phổ biến
- RabbitMQ
- Amazon SQS (Simple Queue Service)
- ActiveMQ
- RocketMQ
- Kafka (Là một Event Stream nhưng cũng có thể sử dụng Kafka như một Message Queue)

## Tổng kết
1. **Message Queue là gì?**: Là một thành phần kiến trúc hệ thống giúp buffer và phân phối các request bất đồng bộ, lưu trữ tin nhắn trong hàng đợi và chuyển đến Consumer khi sẵn sàng.
2. **Các thành phần chính**: Bao gồm Producer (tạo Message), Consumer (nhận và xử lý Message), Message (thông tin dạng text, JSON, Binary, etc.), Message Queue (nơi lưu trữ tạm thời Message), và Broker (quản lý và định tuyến Message).
3. **Producers và Consumers**: Producer tạo và gửi Message đến Queue, trong khi Consumer nhận và xử lý Message từ Queue.
4. **Message Brokers**: Là một thành phần độc lập quản lý giao tiếp giữa Producers và Consumers, có khả năng xử lý permissions, validation, failure recovery, routing rules, và communication protocols.
5. **Chiến lược nhận Message**: Bao gồm Pull Model (Consumer định kỳ kiểm tra và lấy Message) và Push Model (Queue chủ động gửi Message đến Consumer).
6. **Chiến lược đăng ký nhận Message**: Bao gồm Direct worker queue method (phân phối tải giữa các instance của Consumer) và Publish/subscribe method (gửi Message đến nhiều Consumer với logic khác nhau).
7. **Ưu điểm của Message Queue**: Tăng khả năng mở rộng, độc lập ngôn ngữ, hỗ trợ đồng bộ và không đồng bộ, tăng độ tin cậy, giảm giao tiếp trực tiếp giữa các ứng dụng, và căn bằng lưu lượng.
8. **Nhược điểm của Message Queue**: Gây ra độ trễ, quản lý trạng thái phức tạp, tăng độ phức tạp hệ thống, nguy cơ mất mát dữ liệu, chi phí tài nguyên và quản lý cao, khó khăn trong debug và giám sát, và nguy cơ sập toàn hệ thống.
9. Một số Message Queue phổ biến: Bao gồm RabbitMQ, Amazon SQS, ActiveMQ, RocketMQ, và Kafka.


## REF:
- https://hookdeck.com/blog/introduction-message-queue
- https://hookdeck.com/blog/message-queues-deep-dive
- https://teymorian.medium.com/message-queue-and-message-broker-explained-in-easy-terms-terminology-ca99356a96dc
