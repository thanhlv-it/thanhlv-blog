---
footer: true
title: Message là gì ?
authors: ["lethanh"]
date: 2024-04-15
image: /assets/1.1Jqj7e7N.jpg
outline: deep
draft: false
group: 2. Message and event stream
---
## Các loại chỉ thông tin được truyền tải giữa các đối tượng

[[TOC]]

Mở đầu học về `Message and event stream` thì mình sẽ giải thích các kiến thức cơ bản trước. Kiến thức đầu tiên là hiểu về **Message**.

Ngày nay, 1 ngày có hàng tỉ GB dữ liệu được truyền tải, giao tiếp giữa các hệ thống hoặc giữa hệ thống và khách hàng.

Tuy nhiên dữ liệu là một thứ khó để hiểu nếu chưa được làm mịn và xử lý, Trong các ngữ cảnh khác nhau thì dữ liệu có thể khác nhau, để dễ hiểu hơn về dữ liệu chúng ta gửi và nhận chúng ta thường sẽ phân loại và định nghĩa thông tin được truyền tải giữa các đối tượng.

Có một số định nghĩa chung được nhiều bên sử dụng, có thể xem ở dưới đây.

- Các loại chỉ thông tin được truyền tải giữa các đối tượng
  1. Gói tin (Packet)
     - Ngữ cảnh : Truyền dữ liệu qua mạng và internet, được sử dụng nhiều trong giao thức TCP/IP.
     - [Định nghĩa](https://en.wikipedia.org/wiki/Network_packet): Một đơn vị(Unit) được truyền qua mạng, chứa dữ liệu và thông tin điều khiển như địa chỉ nguồn, đích và thông tin khác như số thứ tự (sequence number), kiểm tra lỗi (error checking),...
  2. Frame (Khung)
     - Ngữ cảnh : Tầng liên kết dữ liệu trong mô hình OSI, truyền thông Ethernet và các mạng khác.
     - [Định nghĩa](https://en.wikipedia.org/wiki/Frame_(networking)): Một đơn vị dữ liệu trong tầng liên kết dữ liệu của mô hình OSI, Một frame bao gồm header (phần đầu), payload (phần dữ liệu), và trailer (phần cuối). Header chứa các thông tin như địa chỉ MAC (địa chỉ vật lý của thiết bị mạng), điều khiển lỗi và điều khiển truy cập vào phương trình mạng.
  3. Lệnh (Command)
     - Ngữ cảnh : Tương tác giữa các hệ thống hoặc người dùng với hệ thống(Lệnh điều khiển...etc..)
     - [Định nghĩa](https://en.wikipedia.org/wiki/Command_(computing)): Thông tin chứa yêu cầu hoặc hướng dẫn để thực hiện một hành động cụ thể trên hệ thống.
  4. Truy vấn (Query)
     - Ngữ cảnh : Sử dụng để tìm kiếm thông tin
     - Định nghĩa: Query trong Computing and technology là một yêu cầu để truy xuất dữ liệu trên database hoặc các hệ thống thông tin.
  5. Thông báo (Notification)
     - Ngữ cảnh: Ứng dụng và hệ thống gửi thông báo cho người dùng về sự kiện hoặc trạng thái
     - [Định nghĩa](https://en.wikipedia.org/wiki/Notification) :  Thông tin được gửi từ một hệ thống hoặc ứng dụng để thông báo về một sự kiện hoặc trạng thái.
  6. Sự kiện (Event)
     - Ngữ cảnh: Lập trình sự kiện, hệ thống giám sát, hệ thống phản ứng sự kiện...
     - [Định nghĩa](https://en.wikipedia.org/wiki/Event_(computing)): Một hành động hoặc trạng thái đã xảy ra và được phát hiện và thông báo trong hệ thống.
  7. Log Entry (Bản ghi log)
     - Ngữ cảnh: Giám sát hệ thống, phân tích sự kiện...
     - [Định nghĩa](https://en.wikipedia.org/wiki/Logging_(computing)): Một mục trong tệp hoặc hệ thống nhật ký, ghi lại các sự kiện hoặc hành động trong hệ thống.
  8. Siêu dữ liệu (Metadata)
     - Ngữ cảnh: Quản lý thông tin, tài liệu, hệ thống lưu trữ dữ liệu.
     - [Định nghĩa](https://en.wikipedia.org/wiki/Metadata):  Metadata là "dữ liệu cung cấp thông tin về dữ liệu khác", nhưng không phải nội dung của chính dữ liệu đó.
  9. Thông điệp (Message)
     - Ngữ cảnh: Giao tiếp thông qua các hệ thống như email, tin nhắn văn bản,hệ thống giao tiếp với nhau...
     - [Định nghĩa](https://en.wikipedia.org/wiki/Message): Thông tin được truyền từ người gửi đến người nhận qua một kênh truyền thông cụ thể.
  - Và nhiều khai niệm khác hoặc bạn có thể tự định nghĩa ra khái niệm của bạn, nhóm hoặc tổ chức của bạn.
- Khi nào có thể sử dụng các khái niệm này?
  1. Truyền dữ liệu qua mạng: Sử dụng "Gói tin (Packet)" và "Khung (Frame)" để mô tả các đơn vị dữ liệu truyền qua mạng.
  2. Giao tiếp giữa người dùng: Sử dụng "Thông điệp (Message)" và "Thông báo (Notification)" trong ngữ cảnh gửi email, tin nhắn văn bản, và thông báo ứng dụng.
  3. Tương tác hệ thống: Sử dụng "Lệnh (Command)" và "Truy vấn (Query)" khi mô tả các yêu cầu và hành động giữa người dùng và hệ thống
  4. Giám sát và phản ứng: Sử dụng "Sự kiện (Event)" và "Log Entry (Bản ghi log)" để mô tả các hành động và tình huống trong hệ thống.
  5. Quản lý thông tin: Sử dụng "Siêu dữ liệu (Metadata)" khi cần mô tả và quản lý các đặc tính của dữ liệu khác.

## Vậy Message là gì ?
Message là một trong các định nghĩa chung được nhiều bên, hệ thống sử dụng để `chỉ thông tin được truyền tải giữa các đối tượng`.

- **Đầu tiên**, **Message** Có nghĩa là **Tin nhắn** hoặc **Thông điệp** là một thông tin ở dạng dữ liệu được gửi từ A đến B(Từ hệ thống A đến hệ thống B) và được B nhận.

- **Thứ hai**, **Message** thường đi kèm với metadata, tức là các thông tin mô tả về Message. Metadata này có thể gồm nhiều thông tin, người gửi, thời gian gửi, người nhận...

- **Thứ ba**, Format của dữ liệu **Message** sẽ là một hợp đồng giữa A và B. hợp đồng này gồm nhiều thứ ví dụ: Định dạng tin nhắn(Json), thuật toán mã hóa, các dữ liệu require trong Json....
  - Thông thường Format này sẽ được hệ thống nhận tin nhắn, tức B xác định. Tuy nhiên nhiều trường hợp có thể A xác định và B sẽ làm theo.

- **Thứ tư**, **Message** được mang ý nghĩa giả định người gửi sẽ gửi dữ liệu và sẽ có một người nhận. Từ dữ liệu của người gửi, người nhận có thể thực hiện các hành động tương ứng hoặc không làm gì cả, điều này phụ thuộc vào nghiệp vụ của người nhận.
  - Nếu nghiệp vụ của người nhận(B) có thực hiện một hành động nào đó khi nhận Message, nhưng hành động không được thực hiện tức là đã bị phạm một **business rule** nào đó của bên B.
    - Thông thường, đây là bước đầu tiên của một quá trình dẫn đến, A nhận được dữ liệu của B(HTML), B thay đổi dữ liệu....
      ![Image](2024-04-15-message-la-gi/1.jpg)
  
### **Tóm gọn Message là gì**
- Message là một yêu cầu thường chứa một khối lượng dữ liệu được chuyển từ một hệ thống sang hệ thống khác để thực hiện các hành động xử lý hoặc trao đổi thông tin. 

## Đặc điểm của Message
- **Đóng gói thông tin**: Message chứ dữ liệu hoặc thông tin được đóng gói. Thông tin này có thể bảo gồm tin nhắn, câu lệnh, dữ liệu cần truyền đạt...

- **Có cấu trúc**: Message thường có một cấu trúc xác định, bảo gồm các metadata và nội dung(body). Metadata có thể chứa các thông tin về loại message, người gửi, người nhận và nhiều thuộc tính khác. Phần body chứa dữ liệu thực sự cần gửi đi.

- **Đồng bộ hoặc không đồng bộ:** :Message có thể được gửi một cách đồng bộ, người gửi sẽ chờ đợi phản hồi của người nhận trước khi tiếp tục, hoặc không đồng bộ nơi người gửi tiếp tục công việc mà không cần chờ phản hồi.

- **Độc lập với giao thức**: Message có thể được gửi qua nhiều giao thức khác nhau, HTTP, HTTPS, FTP, SMTP, MIME...

- **Bảo mật**: Message có thể được mã hóa và ký để đảm bảo tính bảo mật, toàn vẹn và xác thực nguồn gốc giúp bảo vệ khỏi sự nghe, nhìn lén và thay đổi hoặc giả mạo.

- **Giao tiếp giữa các chệ thống**: Message là phương tiện chính hiện tại sử dụng để giao tiếp giữa các hệ thống, dịch vụ và ứng dụng. Message cho phép chúng ta trao đổi dữ liệu linh hoạt và hiệu quả.

- **Định hướng người nhận(Recipient Orientation)**: Mỗi message được tạo ra sẽ gửi đi sẽ xác định đến 1 hoặc N người nhận message để đảm bảo rằng message đến đúng người hoặc hệ thống cần nó.

## Ví dụ về Message
### **Ví dụ 1**
Application **A** gửi Message đến Application **B** yêu cầu lấy về danh sách học sinh(Tin nhắn được gửi thông qua giao thức **HTTP**).
  - 1. **A** gửi **Message** đến B yều cầu lấy danh sách học sinh thông qua giao thức **HTTP**
  - 2. **B** nhận được yêu cầu và kiểm tra đúng các định dạng format của **HTTP** và đúng **business rule**(User ở **A** có quyền đọc...)
    - Nếu **A** gửi sai format hoặc vi phạm business rule thì B sẽ từ chối yêu cầu.
  - 3. **B** sử lý yêu cầu và gửi trả lại phản hồi cho **A**.

### **Ví dụ 2**
Gửi thư từ nhà của **A** ở **Hà Nội** đến **B** ở **Đà Nẵng** yêu cầu vay 500k VND
  - 1. **A** thực hiện viết Message vào giấy để giở thư đến cho **B**.

  - 2. **A** sẽ sử dụng giao thức gửi thư qua bưu điện vì vậy cần sử dụng **format bao thư** kèm theo **Metadata** người gửi và người nhận.

  - 3. Sau khi hoàn thành đầy đủ, giao thức bưu điện sẽ gửi thư đến **B** ở **Đà Nẵng**.

  - 4. Sau khi B nhận thư, tiến hành đọc và xử lý các yêu cầu dựa trên **business rule**( Chơi thân không? Mình có 500k VND không ...)

  - 5. Nếu thỏa mãn **business rule** B sẽ gửi Message lại đến B với 500K VND họặc không thỏa mãn sẽ gửi lại Message từ chối yêu cầu đến A thông qua giao thức bưu điện.

## Các phương pháp trao đổi Message giữa các hệ thống.
- **Remote Procedure Calls (RPC)**: Một kỹ thuật sử dụng để cho phép một ứng dụng thực hiện call một method trên ứng dụng khác thông qua network.  RPC ẩn đi chi tiết về giao tiếp mạng, cho phép nhà phát triển tập trung vào logic nghiệp vụ. Ví dụ phổ biến bao gồm gRPC và XML-RPC
- **Socket Programming** : Cho phép giao tiếp 2 chiều giữa một kết nối, Socket có thể được sử dụng để nhận dữ liệu thông qua TCP, UDP.
- **APIs**: Các API (Application Programming Interfaces) như RESTful APIs hoặc GraphQL APIs cho phép các ứng dụng giao tiếp với nhau và trao đổi thông tin một cách có cấu trúc.
- **Message Queuing**: Message Queuing (MQ) cho phép các ứng dụng gửi và nhận Message một cách đáng tin cậy và hiệu quả. Ví dụ phổ biến bao gồm RabbitMQ
- Và rất nhiều phương pháp khác.

## Tổng kết
- **Message** là một yêu cầu chứa dữ liệu được gửi từ hệ thống này sang hệ thống khác, có mục đích xử lý hoặc trao đổi thông tin.

- **Không chỉ là dữ liệu**, Message mang giá trị, ý nghĩa và mục đích, đóng vai trò là cầu nối giữa các thành phần trong hệ thống, tạo luồng thông tin liên tục.

- **Metadata đi kèm với Message** mô tả thông tin về người gửi, thời gian gửi, người nhận, giúp quản lý và xử lý Message hiệu quả.

- **Format dữ liệu của Message** thường được xác định bởi hợp đồng giữa hệ thống gửi và hệ thống nhận, thường là JSON, bao gồm cả thuật toán mã hóa và dữ liệu cần thiết.

- **Mục đích** của việc gửi Message là để truyền đạt thông tin hoặc yêu cầu thực hiện một công việc cụ thể giữa các thành phần trong hệ thống.

- **Có nhiều phương pháp trao đổi message** như Message Queue, APIs, RPC...
