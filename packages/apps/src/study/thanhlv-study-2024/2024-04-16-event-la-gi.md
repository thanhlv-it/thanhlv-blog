---
footer: true
title: Event là gì ?
authors: ["lethanh"]
date: 2024-04-16
image: /assets/1.PDIRLfIW.jpg
outline: deep
draft: false
group: 2. Message and event stream
---

[[TOC]]

##  Event là gì ?
- Event là một trong các định nghĩa chung được nhiều bên, hệ thống sử dụng để `chỉ thông tin được truyền tải giữa các đối tượng`.

- Event dịch sang tiếng việt là **Sự Kiện** trong bối cảnh phát triển phần mềm có thể được hiểu là **một thay đổi trạng thái, một hành động cụ thể, một thứ gì đó** ===> **đã xảy ra**.
Ví dụ:
1. Thành đã xuống máy tại ở Sài Gòn lúc 10h sáng ngày 20-11-2024.
2. Team phát triển đã Deploy service lúc 23h ngày 20-11-2024
- Thông thường **Event** sẽ được tạo sau khi một **Message** kết thúc, tùy nhiên điều đó không bắt buộc. (Có thể từ một Event khác, hệ thống tự phát ra, từ kết quả của một tính toán định kỳ(Định kỳ 10s đo thân nhiệt).....)
  ![Image](2024-04-16-event-la-gi/1.jpg)

### 3 thành phần chính của Event.
- **Key** : Định danh của sự kiện.
  - **Key** là định danh duy nhất của sự kiện, ví dụ key **"Tăng nhịp tim"** hoặc **"Chớp mắt"**
- **Value** : Data của sự kiện
  - "Value" là data của sự kiện này, ví dụ Key **"Tăng nhịp tim"** lên **120** thì **120** chính là **Value**
- **Timestamp** : Thời gian xảy ra sự kiện.
  - Chính là thời gian sự kiện này xảy ra ví dụ **Tuấn**  **"Tăng nhịp tim"** lên **120** lúc **10 sáng ngày 20-11-2024**
### Đặc điểm của event.
- **Thời điểm xác định**: Mỗi Event đều liên quan đến một thời điểm cụ thể Event đó xảy ra.(Ví dụ 12h)
  ![Image](2024-04-16-event-la-gi/2.jpg)

- **Thông tin**: Event mang theo thông tin liên quan đến event đó, giúp các thành phần khác trong hệ thống có thể phản ứng một cách thích hợp.
  ![Image](2024-04-16-event-la-gi/3.jpg)

- **Không đồng bộ**: Việc xử lý Event **thường** diễn ra không đồng bộ, tức là hệ thống không cần dừng lại để chờ đợi 1 event xử lý thành công.

- **Kích hoạt hành động**: Event có thể có thể được sử dụng để kích hoạt 1 hoặc nhiều hành động, quy trình(job) trong hệ thống tạo điều kiện cho việc phản ứng linh hoạt các thay đổi.

- **Tính phân tán(Broadcast Nature)**: Khác với [Message](2024-04-15-message-la-gi.md) sẽ có người nhận cụ thể vì nó là yêu cầu gửi đến thành phần khác, Event không nhất thiết phải có một người nhận cụ thể.
  - Event được phát ra để thông báo một sự kiện thay đổi trạng thái, hành động xảy ra. Ứng dụng tạo ra event và không cần biết ai sẽ nhận event và xử lý nó.
  - Các thành phần trong hệ thống có thể lắng nghe tất cả hoặc đăng ký lắng nghe các event mà hệ thống quan tâm sau đó phản ứng với event xảy ra mà không cần Evetn chỉ định trực tiếp người nhận.
    ![Image](2024-04-16-event-la-gi/4.webp)

### Vai trò của Event trong hệ thống:
- **Tăng cường tính linh hoạt**: Event giúp các thành phần trong hệ thống có thể tương tác với nhau một cách linh hoạt và không cần phải biết trước về sau

- **Phản ứng với thay đổi**: Hệ thống có thể được thiết kế để tự động phản ứng với các Event giúp xử lý các thay đổi một cách nhanh chóng và hiệu quả.

- **Tách biệt nghiệp vụ**:  Event giúp tách biệt nghiệp vụ và logic xử lý làm cho hệ thống dễ quản lý và bảo trì.
  - Các thành phần không phụ thuộc trực tiếp vào nhau để hoàn thành nghiệm vụ, thay vào đó tương tác thông qua nhận và gửi event
- 
- **Tối ưu hóa hiệu suất**:  Việc sử dụng Event có thể giúp tối ưu hóa hiệu suất hệ thống bằng cách giảm thiểu sự phụ thuộc và chờ đợi giữa các thành phần.

### Ví dụ về hệ thống đặt hàng.

#### **Bối cảnh:** 
- Khi một khách hàng hoàn tất quá trình đặt hàng trên web thương mai điện tử, hệ thống sẽ tạo ra một event **"Đặt hàng mới"**. (Ví dụ sẽ là Thanh toán khi nhận hàng)

#### Quá trình xử lý event
- 1. Hệ thống phát ra Event **"Đặt hàng mới"**.
  - Hệ thống đặt hàng tạo và phát ra event **"Đặt hàng mới"**, bao gồm tất cả thông tin cần thiết về đơn hàng, ID đơn hàng, thông tin sản phẩm, thông tin khách hàng, tổng giá trị đơn.
- 2. **Xử lý kho hàng:**
  - Hệ thống quản lý kho hàng sẽ lắng nghẹ event **"Đặt hàng mới"**. Khi nhận được event, nó kiểm tra sự có sẵn của sản phẩm trong kho. Nếu thiếu hàng nó sẽ phát ra Event **"Yêu cầu bổ xung hàng"** để thông báo cho bộ phận bán hàng.
- 3. **Xử lý thanh toán :** 
  - Hệ thống thanh toán sẽ lắng nghe Event **"Đặt hàng mới"**. Dựa trên thông tin đơn hàng, tiến hành xác minh và xử lý thanh từ khách hàng.
  - Nếu thanh toán thành công, hệ thống sẽ phát Event **"Thanh toán thành công"**; nếu thất bại hệ thống phát Event **"Thanh toán thất bại"**
  - Nếu thanh toán khi nhận hàng sẽ không làm gì cả.
- 4. **Xử lý thông báo**
  - Hệ thống thông báo sẽ lắng nghe Events **"Đặt hàng mới"** , **"Thanh toán thành công"**, **"Thanh toán thất bại"**, **"Yêu cầu bổ xung hàng"**
  - Tuy thuộc vào Event và các cài đặt nhận thông báo của người dùng, hệ thống sẽ gửi thông báo đến người dùng khi nhận được Event (APp, SMS, Email...)
- 5. **Xử lý vận chuyển**.
  - Hệ thống Xử lý vận chuyển sẽ lắng nghe Events **"Đặt hàng mới"** , **"Thanh toán thành công"**.
  - Trong trường hợp thanh toán nhận hàng, khi nhận được  **"Đặt hàng mới"** thì hệ thống sẽ tự động tiến hành logic xử lý vận chuyển
  - Trong trường hợp thanh toán trước sẽ đợi Event **"Thanh toán thành công"**

## Tổng kết
- Event là khái niệm cốt lõi trong xây dựng hệ thống phần mềm dựa trên sự kiện. Mỗi Event là một sự kiện đã xảy ra(Thay đổi trạng thái, thiệt độ) hoặc hành động đã xảy ra....

- Event không chỉ thông báo sự kiện, nó còn có thể kích hoat các sự kiện khác (Lắng nghe sau đó kích hoạt sự kiện mới), tạo ra hệ thống linh hoạt.

- Event có thời điểm xác định, mang các thông tin liên quan đến Event, không đồng bộ và có tính phân tán không cần người nhận cụ thể.

- Trong hệ thống phần mềm, Event tăng tính linh hoạt, phản ứng thay đổi, tách biệt nghiệp vụ và tối ưu hiệu suất.



# REF:
https://viblo.asia/p/domain-events-la-gi-924lJ8j8KPM
