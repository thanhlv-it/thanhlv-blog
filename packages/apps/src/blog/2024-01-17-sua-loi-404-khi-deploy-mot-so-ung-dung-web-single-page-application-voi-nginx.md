---
footer: true
title: Sửa lỗi 404 khi deploy một số ứng dụng web Single Page Application với Nginx
description: Tại thời điểm hiện tại (17-01-2024), các công ty sử dụng Single Page Application(SPA) đang khá là phổ biến. Trong số đó, ba framework nổi bật nhất chính là Angular, Vue.js, và React.
authors: [ "lethanh" ]
date: 2024-01-17
image: /assets/1.8xAG0WGk.jpg
outline: deep
---
# Sửa lỗi 404 khi deploy một số ứng dụng web Single Page Application với Nginx
![img](images/2024-01-17-sua-loi-404-khi-deploy-mot-so-ung-dung-web-single-page-application-voi-nginx/1.jpg)

Tại thời điểm hiện tại (17-01-2024), các công ty sử dụng **Single Page Application(SPA)** đang khá là phổ biến. Trong số đó, ba framework nổi bật nhất chính là Angular, Vue.js, và React.
<br/>
Khi bạn tiến hành triển khai (deploy) một SPA lần đầu tiên, hoặc thậm chí deploy nhiều lần mà không tham gia vào quá trình cấu hình, bạn có thể sẽ gặp phải lỗi 404 khi truy cập vào website. Điều này thường khiến nhiều người phát triển cảm thấy bối rối.
<br/>
Hãy cùng nhau tìm hiểu nguyên nhân dẫn đến vấn đề này cũng như cách khắc phục để đảm bảo trải nghiệm người dùng không bị gián đoạn.

[[TOC]]

## Hiểu vấn đề

Khi chúng ta nói về việc chuyển đổi giữa các màn hình, việc thay đổi đường dẫn trên thanh URL trở nên cần thiết. Mỗi đường dẫn URL biểu thị một tài nguyên cụ thể mà người dùng muốn truy cập.
<br/>
Trong trường hợp của các ứng dụng sử dụng server-side rendering, mỗi khi một URL được gửi lên server, server sẽ xử lý yêu cầu và phản hồi bằng cách trả về tài nguyên bao gồm mã HTML và các dữ liệu cần thiết cho người dùng.

Tuy nhiên, với ứng dụng SPA tại phía front-end, chúng ta chỉ có một tệp HTML duy nhất là `index.html`. Bất kỳ thay đổi màn hình nào hay cập nhật các thành phần trên giao diện người dùng, đều được thực hiện thông qua JavaScript. Nó cho phép cập nhật nội dung động mà không cần phải tải lại trang web, đem lại trải nghiệm liền mạch và nhanh chóng cho người dùng.
<br/>
Tính năng đó trên **Single Page Applications (SPA)** thường được gọi là **router**.
<br/>
**Router** giúp người dùng có khả năng dễ dàng di chuyển giữa các trang (pages) khác nhau mà không cần phải tải lại trang web. Điều này tạo điều kiện thuận lợi để truy cập vào các nội dung và tài nguyên đặc trưng của từng trang một cách mượt mà và nhanh chóng.
<br/>

### ví dụ

Ví dụ: **A** sử dụng trình duyệt để truy cập vào website front-end thông qua đường dẫn `domain.com`. Kế tiếp, **A** nhấn vào nút 'Order' để chuyển hướng đến trang đặt hàng tại `domain.com/order`.
<br/>
Khi **A** nhấp vào nút `Order` trên một trang web dạng SPA, một đoạn code JavaScript sẽ được kích hoạt để điều hướng URL trên thanh địa chỉ của trình duyệt thành `domain.com/order`. Đồng thời, script này sẽ thao tác trên cây DOM: loại bỏ một số phần tử cũ và thêm vào các phần tử mới vào trang. Đơn giản hóa quá trình này, ta có thể hiểu rằng nó thực chất là quá trình xóa đi và sau đó chèn các đoạn HTML mới để cập nhật nội dung trang phù hợp với yêu cầu của người dùng.
<br/>
Quá trình điều chỉnh URL trong trình duyệt khi sử dụng SPA không đồng nghĩa với việc tải lại toàn bộ website. Thực tế là chúng ta vẫn ở trên trang `index.html`. Các thao tác diễn ra chỉ bao gồm việc cập nhật URL, loại bỏ một số phần HTML cũ và chèn thêm những đoạn HTML mới để phản ánh đúng trạng thái và nội dung mới người dùng muốn xem.
<br/>
Đây là nơi mà vấn đề thường gặp phải khi triển khai ứng dụng front-end lên server sử dụng Nginx. Theo mặc định, khi một URL được truy cập, Nginx sẽ tìm kiếm file HTML tương ứng để phục vụ. Tuy nhiên, trong trường hợp của SPA, chỉ có một file `index.html`, nên khi truy cập trực tiếp vào một đường dẫn không phải là trang chủ, Nginx không thể tìm thấy file HTML khớp và kết quả là nó sẽ trả về lỗi 404 cho người dùng.

### Default config hay sử dụng

```
location  {
             server_name domain.com;
             root /var/www/webfe;
             try_files $uri $uri/ =404;
         }
```
Khi người dùng cố gắng truy cập trực tiếp vào URL `domain.com/order`, Nginx sẽ thử tìm trong thư mục `/var/www/webfe` để tìm file `order.html` để trả về cho client. Nhưng trong trường hợp của một ứng dụng SPA, không có file `order.html` riêng biệt nào cả—chỉ có duy nhất `index.html` là tồn tại.

Do đó, như bạn đã nhận thấy, khi Nginx không tìm thấy file phù hợp, nó sẽ trả về một trang 404, biểu thị rằng tài nguyên được yêu cầu không tồn tại trên server.

## Sửa lỗi 404 khi deploy Single Page Application với Nginx.

Bản chất của một Single Page Application (SPA) là tất cả các yêu cầu đều khởi động từ `index.html`. Do đó, cần thiết phải cấu hình Nginx để hiểu rằng: nếu không tìm thấy file tương ứng với URL được yêu cầu, thay vì trả về lỗi 404, nó sẽ trả về file `index.html`. Điều này cho phép framework JavaScript trên trình duyệt nắm quyền và hiển thị trang hoặc thành phần phù hợp đối với URL đó.

### Bước 1: truy cập vào file config
Để giải quyết vấn đề này, chúng ta cần bắt đầu bằng cách chỉnh sửa file cấu hình của Nginx. Thông thường, file cấu hình mặc định sẽ nằm trong file có tên là `default` hoặc nằm trong tập các file cấu hình khác nhau tùy thuộc vào cách bạn tổ chức cấu hình cho các site trên máy chủ của mình.
```
sudo nano /etc/nginx/sites-enabled/default
```

### Bước 2: sửa file config để trả về index.html khi gặp lỗi 404
Tiếp theo, chúng ta sẽ cấu hình để Nginx hiểu rằng nếu không tìm thấy file phù hợp cho một URL cụ thể, thay vì trả về lỗi 404, server sẽ trả về file `index.html`. Điều này thường được thực hiện bằng cách thêm hoặc sửa đổi mục `try_files` trong block `server` của file cấu hình Nginx để chuyển hướng tất cả các yêu cầu tới `index.html`, từ đó cho phép ứng dụng SPA xử lý đường dẫn.

```
location {
          server_name domain.com;
          root /var/www/webfe;
          try_files $uri $uri /index.html;
        }
```

### Bước 3: lưu file config và tiến hành cập nhật cấu hình cho Nginx
Sau khi đã chỉnh sửa xong file cấu hình, bạn cần lưu lại các thay đổi. Tiếp theo, là cập nhật cấu hình cho Nginx bằng cách thực hiện reload cấu hình hoặc restart dịch vụ Nginx. Để reload mà không cần phải khởi động lại toàn bộ dịch vụ, bạn có thể sử dụng lệnh:

```
sudo nginx -s reload
```

Nếu bạn muốn restart hoàn toàn dịch vụ Nginx, bạn có thể sử dụng lệnh:

```
sudo systemctl restart nginx
```

hoặc

```
sudo service nginx restart
```

Cả hai phương pháp đều sẽ áp dụng các cấu hình mới mà không làm gián đoạn quá trình vận hành hiện tại của máy chủ.

### Bước 4: Tận hưởng thành quả
Truy cập website và và tận hưởng ^^
