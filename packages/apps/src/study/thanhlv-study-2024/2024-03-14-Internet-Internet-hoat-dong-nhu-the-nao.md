---
footer: true
title: Internet hoạt động như thế nào?
authors: ["lethanh"]
date: 2024-03-14
image: /assets/Arpanet_logical_map_march_1977.OzmItf4z.png
outline: deep
group: 1. Internet
---

# Internet hoạt động như thế nào?

Trong thời đại công nghệ phát triển với tốc độ chóng mặt, chúng ta thường tập trung vào việc học tập và làm việc thông qua các top layer. Tuy nhiên, để những layer này có thể hoạt động một cách trơn tru, chúng ta không thể không nhắc đến sự hỗ trợ không thể thiếu của nhiều layer nền tảng ẩn bên dưới chúng.

Trong số đó, việc hiểu rõ về cách thức hoạt động của Internet là một trong những khái niệm cơ bản và vô cùng quan trọng đối với mỗi lập trình viên

[[TOC]]

## Lịch sử của  Internet
### 1. Trước thời sơ khai (Trước công nguyên :V)
- Thực chất thì tại thời điểm này Internet vẫn chưa tồn tại. Tại thời điểm này để gửi dữ liệu giữa các máy tính với nhau chúng ta sẽ cần ghi vào đĩa CD ở máy A sau đó chuyển sang máy B để đọc.
- Một cách khác nữa là sử dụng công nghệ analog. Công nghệ analog sẽ thực hiện sử dụng các tín hiệu, thường là sóng điện từ.
  - Ví dụ: Radio(Sóng vô tuyến), điện thoại cố định(Truyền giọng nói qua dây bằng tín hiệu analog)
### 2. Mạng Internet tập trung đầu tiên.
- 1. Mạng Internet đầu tiên được sử dụng năm 1950 đến năm 1960. Tên là Mô hình tập trung (Centralized Network Model)
  - Trong mô hình này, tất cả các kết nối đều được điều khiển bởi một máy chủ trung tâm central server.   
  - Máy chủ có trách nghiệm quản lý tất cả kết nối, nhận tất thông tin từ các kết nối sau đó gửi lại đến đích
  - Trong mô hình này, nếu máy chủ gặp sự cố, toàn bộ mạng sẽ sập.
- 2. Mô hình phân phối (1960 - 1970)
  - Mô hình này không phụ thuộc vào một máy chủ trung tâm để kiểm soát họoạt động, thay vào đó các Node hoạt động cùng nhau.
  - Các máy tính sẽ gửi thông tin đến Node sau đó node sẽ gửi dữ liệu để đồng bộ hóa đến các Node khác.
  - Nếu 1 node gặp sự cố, Automatic Failover sẽ được bật, kết nối sẽ được chuyển đến Node khác.
### 2. Thời Kỳ Sơ Khai (1960s - 1974s)
- 1960. Dự án [ARPANET](https://vi.wikipedia.org/wiki/ARPANET) (`Advanced Research Projects Agency Network`) của Cơ Quan Dự án Nghiên cứu Tiên Tiến Quốc Phòng Hoa Kỳ khởi xướng, đánh dấu bước đầu tiên của Internet.
![Arpanet_logical_map_march_1977](2024-03-14-Internet-Internet-hoat-dong-nhu-the-nao/Arpanet_logical_map_march_1977.png)
  - ARPANET đã tạo ra 2 giao thức và 1 cấu trúc mạng là nền tảng của Internet ở sau này.
  - 1. Giao thức chuyển mạch gói ([Packet Switching](https://vi.wikipedia.org/wiki/Chuy%E1%BB%83n_m%E1%BA%A1ch_g%C3%B3i)):
     - ARPANET sử dụng một kỹ thuật gọi là chuyển mạch gói ([packet switching](https://vi.wikipedia.org/wiki/Chuy%E1%BB%83n_m%E1%BA%A1ch_g%C3%B3i)), nơi thông tin được chia thành các đơn vị nhỏ gọi là gói (packets).
       Mỗi gói chứa thông tin địa chỉ của người nhận, cho phép nó được chuyển từ một nút mạng (node) này sang nút khác thông qua các đường truyền dữ liệu khác nhau(nhiều router khác nhau), không cần phải theo một đường cố định.
  - 2. Giao thức NCP ([Network Control Protocol](https://en.wikipedia.org/wiki/Network_Control_Protocol_(ARPANET)))
     - Giao thức kết nối đầu tiên là NCP sau đó là TCP sau này. NCP đảm bảo rằng dữ liệu được gửi và nhận một cách chính xác và nó quản lý việc chia nhỏ dữ liệu thành Packet và tạo lại dữ liệu khi đến đích.
  - 3. Cấu trúc mạng phi tập trung
    - Kết nối đầu tiên với [ARPANET](https://vi.wikipedia.org/wiki/ARPANET) được thực hiện vào ngày 29 tháng 10 năm 1969, giữa IMP tại UCLA và IMP tại SRI
- 1972. Ray Tomlinson phát minh ra email.
- 1973. Giao thức mạng TCP/IP được phát triển bởi Vint Cerf và Bob Kahn
         ![SRI_First_Internetworked_Connection_diagram](2024-03-14-Internet-Internet-hoat-dong-nhu-the-nao/SRI_First_Internetworked_Connection_diagram.jpg)
### 3. Phát Triển và Mở Rộng (1974 - 1989)
- 1974. Thuật ngữ `Internet` được sử dụng lần đầu trong một bài báo của Vint Cerf và Bob Kahn
- 1976. Phòng thí nghiệm của AT&T phát mình ra truyền tệp mạng FTP
- 1982. Giao thức TPC/IP được chuẩn hóa giúp phổ biến mạng kết nối.
- 1983. Giao thức TCP/IP là chuẩn trong quân sự Mỹ. Các máy tính kết nối với hệ thống ARPANET của Mỹ đều cần phải dùng chuẩn này.
- 1984. Tim Berners-Lee tại CERN đề xuất hệ thống thông tin liên kết siêu văn bản, là cơ sở của World Wide Web.
### 4. Sự Bùng Nổ của World Wide Web (1990s)
- 1990. Dự án ARPANET chính thức ngừng hoạt động.
        Tim Berners-Lee bắt đầu viết WorldWideWeb, trình duyệt web đầu tiên sau hai năm vận động hành lang ban quản lý CERN. Ông đã xây dựng tất cả các công cụ cần thiết cho một web hoạt động như giao thức truyền tải siêu văn bản (HTTP) 0.9, ngôn ngữ đánh dấu siêu văn bản (HTML), trình duyệt web đầu tiên (cũng là trình soạn thảo HTML và có thể truy cập các nhóm tin Usenet và các tệp FTP), phần mềm máy chủ HTTP đầu tiên (sau này được gọi là CERN httpd), máy chủ web đầu tiên và các trang web đầu tiên mô tả chính dự án.
- 1991. World Wide Web (WWW)  được công bố.

## Internet hoạt động như thế nào?
### 3 thành phần chính
Dù thiết kế có sự thay đổi ở từng thời điểm khác nhau nhưng nhìn chung mạng internet gồm 3 thành phần chính.
- Các máy tính
- Các thiết bị mạng đóng vai trò kết nối các máy tính với nhau
- Phần mềm hỗ trợ kết nối.

### ví dụ
- Khi bạn truy cập vào một web hoặc gửi dữ liệu qua terminal, FPT...etc.. thiết bị của bạn sẽ gửi yêu cầu qua các dây cáp(Cáp quang, dây đồng điện thoại) tới máy chủ nhà phân phối mạng (FPT, VNPT...etc..)
- Yêu cầu của bạn có thể sẽ cần đi qua một số router khác nữa trước khi đi tới máy chủ(Nếu ở trong nước) hoặc cáp quang ngoài biển hoặc dất liền để ra thế giới.
- Yêu cầu của bạn sau khi đi qua nhiều router sẽ đến máy chủ nhà phân phối của máy chủ web. Nhà điều phối sẽ thực hiện gửi dữ liệu đến máy chủ web.
- Máy chủ web thực hiện xử lý dữ liệu sau đó thực hiện gửi ngược lại dữ liệu về client.

Lưu ý: Các loại kết nối không dây như wifi, 3G/4G/5G tuy không kết nối qua dây nhưng cũng dựa trên những loại cáp vật lý để truy cập Internet.

## Lợi và hại của Internet
### Lợi ích của mạng Internet
- Nơi lưu trữ kho tàng kiến thức khổng lồ, dễ dàng liên lạc vượt qua khoảng cách địa lý.
- Kinh doanh, buôn bán
- Một thế giới ảo,(Nghe nhạc, xem phim)
- Giúp kết nối mọi người
- ...
### Tác động tiêu cực của Internet
- Khiến con người lười vận động.
- Khó kiểm soát được nội dung độc hại.
- Lừa đảo của internet
- ...

## Tổng kết
- Internet là một hệ thống phức tạp, bao gồm nhiều lớp và thành phần từ phần cứng đến phần mềm.
- Trước Internet, trao đổi dữ liệu giữa máy tính dựa vào đĩa CD hoặc công nghệ analog như radio và điện thoại.
- Lịch sử Internet bắt đầu từ dự án ARPANET của thập niên 1960, đặt nền móng cho mạng lưới toàn cầu.
- Các giao thức như chuyển mạch gói và NCP, sau này là TCP/IP, đã được phát triển, làm cơ sở cho Internet hiện đại.
- Sự phát triển qua các giai đoạn dẫn đến sự ra đời của World Wide Web vào đầu những năm 1990.
- Khi truy cập web hoặc gửi dữ liệu, yêu cầu từ thiết bị của người dùng đi qua nhiều router đến máy chủ.
- Internet mang lại lợi ích như kho tàng kiến thức, kết nối mọi người và hỗ trợ kinh doanh.
- Tuy nhiên, Internet cũng có tác động tiêu cực như sự lười vận động và khó kiểm soát nội dung độc hại.
- Lừa đảo trực tuyến là một trong những vấn đề nghiêm trọng liên quan đến Internet.
