---
footer: true
title: Ý nghĩa của các HTTP Status Code
description: HTTP Status Code được sử dụng để thông báo nhanh cho client về kết quả của request mà nó đã gửi đi. Client sẽ có cái nhìn tổng quan nhanh về kết quả của request chứ chưa cần kiểm tra kỹ content response, ví dụ thành công hay thất bại.
authors: [ lethanh ]
date: 2024-12-05
outline: no
image: /assets/class-of-http-status-code.cLzEV2w7.jpeg
draft: false
---


Ngày nay, mỗi một giây trôi qua, có hàng triệu request HTTP được gửi đi và nhận về trên mạng global hoặc mạng internal.
HTTP là một phần không thể thiếu trong cuộc sống của chúng ta. Một trong những thành phần quan trọng nhất của HTTP là HTTP Status Code.

Một vấn đề thực tế ở Việt Nam là các lập trình thường chỉ biết đến các Status Code là `200`, `400`, `401`, `403` và `500`. Nhiều status khác như `201`, `204`, `206`, `301`... thì ít khi được sử dụng nên không được biết đến.

Nhiều khi các lập trình viên vẫn chưa phân biệt được giữa `401` và `403` hoặc khác biệt giữa các status code 2xx, 3xx, 4xx và 5xx nên khi trả về lỗi cho client khiến team Forntend hoặc bên thứ 3 không hiểu rõ vấn đề.

Một vấn đề nữa là hiện tại nhiều kiểu thiết kế `wrapper status Response` được sử dụng nên khi trả về lỗi hoặc thành công vẫn là 200 hoặc chỉ có 200 và 400.

::: details Ví dụ về `wrapper status Response`
``` shell
# Thành công (HTTP 200)
curl -X GET http://api.example.com/users/123 -H "Authorization: Bearer TOKEN"
# Response:
{
  "code": 0,
  "status": "success",
  "message": "User retrieved successfully.",
  "data": { "id": 123, "name": "John Doe" }
}

# Lỗi logic (HTTP 200)
curl -X GET http://api.example.com/users/999 -H "Authorization: Bearer TOKEN"
# Response:
{
  "code": 1001,
  "status": "error",
  "message": "User not found.",
  "data": null
}

# Request không hợp lệ (HTTP 400)
curl -X POST http://api.example.com/users -H "Authorization: Bearer TOKEN" \
     -H "Content-Type: application/json" -d '{"name":""}'
# Response:
{
  "code": 1002,
  "status": "error",
  "message": "Validation failed: 'name' field is required.",
  "data": null
}
```
:::


Bài viết này mình sẽ chia sẻ với các bạn về ý nghĩa của các HTTP Status Code thông dụng và trường hợp sử dụng chúng.

![http-status-code](images/2024-12-05-y-nghia-cua-cac-http-status-code/class-of-http-status-code.jpeg)

## HTTP Status code là gì ?
Theo tài liệu rfc của HTTP thì [HTTP code](https://www.rfc-editor.org/rfc/rfc2616.html#page-39) là một số nguyên không âm gồm 3 chữ số, mỗi một số đại diện cho một ý nghĩa cụ thể.

HTTP Status Code được sử dụng để thông báo nhanh cho client về kết quả của request mà nó đã gửi đi. Client sẽ có cái nhìn tổng quan nhanh về kết quả của request chứ chưa cần kiểm tra kỹ content response, ví dụ thành công hay thất bại.

HTTP Status Code được chia thành 5 nhóm chính: `1xx`, `2xx`, `3xx`, `4xx` và `5xx`.

Mỗi nhóm sẽ có ý nghĩa cụ thể, đôi khi chỉ mang ý nghĩa chung chung và các lập viên có cái nhìn tổng quan về kết quả của request.

Tuy nhiên, có nhiều status code khi browser nhận về, browser sẽ thực hiện hành vi khác nhau, ví dụ như `301`, `302` sẽ chuyển hướng.

### Bảng tóm tắt ý nghĩa các HTTP Status Code
Thực tế có nhiều rất http status code, nhiều status code không được sử dụng nhiều nên chính mình đôi khi cũng không nhớ hết.

Mình thường dụng bảng tóm tắt ý nghĩa các HTTP Status Code để tham khảo nhanh mỗi khi cần.

| **Mã Trạng Thái** | **Mô Tả Ngắn**                                                                                                 | **Vị Trí Trong Tài Liệu** |
|-------------------|----------------------------------------------------------------------------------------------------------------|---------------------------|
| 100               | Continue - Yêu cầu đã được nhận, client có thể tiếp tục gửi phần thân của yêu cầu.                             | [Chi tiết](#100)          |
| 101               | Switching Protocols - Server đồng ý chuyển đổi giao thức.                                                      | [Chi tiết](#101)          |
| 102               | Processing - Server đang xử lý yêu cầu nhưng chưa hoàn thành.                                                  | [Chi tiết](#102)          |
| 103               | Early Hints - Gợi ý tài nguyên để tải trước mà chưa có kết quả chính thức.                                     | [Chi tiết](#103)          |
| 200               | OK - Yêu cầu đã thành công.                                                                                    | [Chi tiết](#200)          |
| 201               | Created - Yêu cầu đã thành công và một tài nguyên mới đã được tạo ra.                                          | [Chi tiết](#201)          |
| 202               | Accepted - Yêu cầu đã được chấp nhận để xử lý, nhưng chưa hoàn thành.                                          | [Chi tiết](#202)          |
| 203               | Non-Authoritative Information - Thông tin trả về không trực tiếp từ server gốc.                                | [Chi tiết](#203)          |
| 204               | No Content - Yêu cầu thành công nhưng không có nội dung nào để trả về.                                         | [Chi tiết](#204)          |
| 205               | Reset Content - Yêu cầu thành công nhưng cần reset form nhập liệu.                                             | [Chi tiết](#205)          |
| 206               | Partial Content - Server chỉ gửi một phần của tài nguyên.                                                      | [Chi tiết](#206)          |
| 207               | Multi-Status - Trả về nhiều trạng thái cho nhiều tài nguyên khác nhau.                                         | [Chi tiết](#207)          |
| 300               | Multiple Choices - Yêu cầu có nhiều đáp ứng có thể, và một lựa chọn cụ thể cần được thực hiện.                 | [Chi tiết](#300)          |
| 301               | Moved Permanently - Tài nguyên đã di chuyển vĩnh viễn đến URL mới.                                             | [Chi tiết](#301)          |
| 302               | Found - Tài nguyên được tìm thấy tạm thời tại một URL khác.                                                    | [Chi tiết](#302)          |
| 303               | See Other - Tài nguyên nên được truy cập tại một URL khác thông qua GET.                                       | [Chi tiết](#303)          |
| 304               | Not Modified - Tài nguyên không có sự thay đổi nào kể từ lần yêu cầu cuối.                                     | [Chi tiết](#304)          |
| 305               | Use Proxy - Phải sử dụng proxy để truy cập tài nguyên.                                                         | [Chi tiết](#305)          |
| 306               | Switch Proxy - Không được sử dụng nữa, đã bị loại bỏ.                                                          | [Chi tiết](#306)          |
| 307               | Temporary Redirect - Tài nguyên đã di chuyển tạm thời đến một URL khác, nhưng giữ nguyên phương thức yêu cầu.  | [Chi tiết](#307)          |
| 308               | Permanent Redirect - Tài nguyên đã di chuyển vĩnh viễn đến một URL khác, nhưng giữ nguyên phương thức yêu cầu. | [Chi tiết](#308)          |
| 400               | Bad Request - Yêu cầu không hợp lệ được gửi bởi client.                                                        | [Chi tiết](#400)          |
| 401               | Unauthorized - Yêu cầu cần xác thực.                                                                           | [Chi tiết](#401)          |
| 402               | Payment Required - Dự kiến cho tương lai, chưa chuẩn hóa.                                                      | [Chi tiết](#402)          |
| 403               | Forbidden - Yêu cầu không được phép, dù đã xác thực.                                                           | [Chi tiết](#403)          |
| 404               | Not Found - Không tìm thấy tài nguyên yêu cầu.                                                                 | [Chi tiết](#404)          |
| 405               | Method Not Allowed - Phương thức yêu cầu không được phép.                                                      | [Chi tiết](#405)          |
| 406               | Not Acceptable - Không thể trả về dữ liệu theo định dạng yêu cầu.                                              | [Chi tiết](#406)          |
| 407               | Proxy Authentication Required - Cần xác thực với proxy.                                                        | [Chi tiết](#407)          |
| 408               | Request Timeout - Server hết thời gian chờ yêu cầu từ client.                                                  | [Chi tiết](#408)          |
| 409               | Conflict - Yêu cầu làm xung đột với trạng thái tài nguyên hiện tại.                                            | [Chi tiết](#409)          |
| 410               | Gone - Tài nguyên đã bị xóa và không thể phục hồi.                                                             | [Chi tiết](#410)          |
| 411               | Length Required - Yêu cầu độ dài không được phép mà không có `Content-Length`.                                 | [Chi tiết](#411)          |
| 412               | Precondition Failed - Điều kiện tiên quyết không được thỏa mãn.                                                | [Chi tiết](#412)          |
| 413               | Payload Too Large - Payload của yêu cầu quá lớn để xử lý.                                                      | [Chi tiết](#413)          |
| 414               | URI Too Long - URI của yêu cầu quá dài.                                                                        | [Chi tiết](#414)          |
| 415               | Unsupported Media Type - Kiểu phương tiện không được hỗ trợ trong yêu cầu.                                     | [Chi tiết](#415)          |
| 416               | Range Not Satisfiable - Không thể đáp ứng phần Range yêu cầu.                                                  | [Chi tiết](#416)          |
| 417               | Expectation Failed - Expect header không được đáp ứng.                                                         | [Chi tiết](#417)          |
| 418               | I'm a teapot - Trò đùa trong RFC 2324.                                                                         | [Chi tiết](#418)          |
| 421               | Misdirected Request - Yêu cầu hướng sai máy chủ.                                                               | [Chi tiết](#421)          |
| 422               | Unprocessable Entity - Dữ liệu không hợp lệ mặc dù đúng định dạng.                                             | [Chi tiết](#422)          |
| 428               | Precondition Required - Thiếu điều kiện cần thiết trong yêu cầu.                                               | [Chi tiết](#428)          |
| 429               | Too Many Requests - Client đã gửi quá nhiều yêu cầu.                                                           | [Chi tiết](#429)          |
| 431               | Request Header Fields Too Large - Các trường header quá lớn.                                                   | [Chi tiết](#431)          |
| 500               | Internal Server Error - Lỗi không xác định từ server.                                                          | [Chi tiết](#500)          |
| 501               | Not Implemented - Server không hỗ trợ chức năng yêu cầu.                                                       | [Chi tiết](#501)          |
| 502               | Bad Gateway - Server acting as a gateway không nhận phản hồi từ upstream.                                      | [Chi tiết](#502)          |
| 503               | Service Unavailable - Server quá tải hoặc đang bảo trì.                                                        | [Chi tiết](#503)          |
| 504               | Gateway Timeout - Không nhận phản hồi từ upstream server trong khoảng thời gian quy định.                      | [Chi tiết](#504)          |
| 505               | HTTP Version Not Supported - Server không hỗ trợ phiên bản HTTP của yêu cầu.                                   | [Chi tiết](#505)          |

## HTTP Status Code 1xx: Informational
1xx là nhóm status code dùng để thông báo cho client rằng request của nó đã được nhận và đang xử lý. Client không cần phải làm gì cả.

### 100 Continue {#100}
HTTP này thông báo rằng client đã gửi request phần đầu tiên(Header) và server đã chấp nhận request và sẵn sàng body để xử lý dữ liệu, thường điều này xảy ra khi body rất lớn và client có thể gửi phần tiếp theo(Body).

Ví dụ:
Request từ client:
```
POST /upload HTTP/1.1
Host: example.com
Content-Type: application/json
Content-Length: 1024
Expect: 100-continue
```
Trong trường hợp này:

Client đang thông báo rằng yêu cầu của nó có một body với kích thước (1024 bytes) và mong đợi phản hồi 100 Continue từ Server trước khi gửi phần thân dữ liệu.

Server sẽ response :
```
HTTP/1.1 100 Continue
```
Sau đó, client gửi body của yêu cầu, ví dụ:
```
{
  "fileName": "example.txt",
  "fileContent": "Base64 encoded content here..."
}
```
Kết quả cuối cùng:
```
HTTP/1.1 201 Created
Content-Type: application/json

{
  "status": "success",
  "fileId": "12345"
}
```

```plantuml
@startuml

title HTTP 100 Continue - Step by Step

participant "Client" as C
participant "Server" as S

C -> S: POST /upload HTTP/1.1\nHost: example.com\nExpect: 100-continue\nContent-Length: 1024
note right of S: Client gửi yêu cầu POST kèm theo tiêu đề "Expect: 100-continue". Server nhận được yêu cầu và kiểm tra tính hợp lệ.

S --> C: HTTP/1.1 100 Continue
note left of C: Server trả lời với mã trạng thái 100 Continue, thông báo cho Client rằng nó có thể tiếp tục gửi dữ liệu.

C -> S: {"fileName": "example.txt",\n"fileContent": "Base64 encoded content..."}
note right of S: Client gửi dữ liệu hoàn chỉnh trong một yêu cầu POST. Dữ liệu này có thể bao gồm tên tập tin và nội dung được mã hóa Base64.

S --> C: HTTP/1.1 201 Created\n{"status": "success", "fileId": "12345"}
note left of C: Server trả lời với mã trạng thái 201 Created, cùng với JSON chứa trạng thái thành công và ID của tập tin đã được tạo.

@enduml


```
Thực tế, status code này hiện tại ít được sử dụng.

### 101 Switching Protocols {#101}

Hiện tại HTTP/2 và HTTP/3 đã rất phổ biến và được sử dụng. Tuy nhiên không phải server nào cũng hỗ trợ HTTP/2 hoặc HTTP/3.

Vì vậy mặc định client sẽ request đến server là HTTP/1.1, nếu server hỗ trợ HTTP/2 hoặc HTTP/3 thì server sẽ trả về status code 101 Switching Protocols để thông báo cho client chuyển sang giao thức mới.

Sau đó client sẽ gửi lại request theo giao thức mới.

Thực tế, status code này ít được sử dụng bởi các lập trình viên bình thường, thường các framework sẽ tự động xử lý.(Được handler bởi người viết framework, lib)


```plantuml
@startuml
title HTTP 101 Switching Protocols - WebSocket Upgrade

participant "Client" as C
participant "Server" as S

C -> S: GET /chat HTTP/1.1\nHost: example.com\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Key: abc123...\nSec-WebSocket-Version: 13
note right of S: Client gửi yêu cầu GET để nâng cấp lên WebSocket. Server nhận được yêu cầu và kiểm tra các tiêu đề.

S --> C: HTTP/1.1 101 Switching Protocols\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Accept: xyz456...
note left of C: Server trả lời với mã trạng thái 101 Switching Protocols, xác nhận việc chuyển giao giao thức và các tiêu đề "Upgrade" và "Connection".

C -> S: WebSocket message: "Hello, Server!"
note right of S: Client gửi tin nhắn WebSocket đến Server.

S --> C: WebSocket message: "Hello, Client!"
@enduml

```

Thực tế, status code này hiện tại ít được sử dụng.


#### Sử dụng tls để Switching Protocols khi ACK https
Có 1 cách nữa mà đa số được sử dụng là tại thời điểm bắt tay tls handshake, client sẽ gửi lên danh sách protocol mà nó hỗ trợ, server sẽ chọn ra protocol phù hợp và trả về cho client.

### 102 Processing {#102}
Status code này thông báo rằng server đang xử lý request nhưng chưa hoàn thành. Client có thể chờ đợi hoặc gửi request khác.

Thực tế, status code này hiện tại ít được sử dụng.

### 103 Early Hints {#103}
Status code này được sử dụng để thông báo cho client rằng client cần tài trước một số thông tin trước khi nhận response chính thức.

Ví dụ: Để hiển thị một HTMl thì client cần tải trước một số file css, js, image... để hiển thị đúng.

Thực tế, status code này hiện tại ít được sử dụng.

## HTTP Status Code 2xx: Success
HTTP Status Code 2xx là nhóm status code thông báo cho client rằng request của client đã được xử lý thành công.

### 200 OK {#200}
Status code này thông báo rằng request của client đã được xử lý thành công và thông tin được trả về trong response( Nếu có ).
```plantuml
@startuml
title HTTP 200 OK - Successful Request

participant "Client" as C
participant "Server" as S

C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu GET đến Server để truy cập tài nguyên. Server nhận và xử lý yêu cầu.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 123 \n {"data": "example"}
note left of C: Client nhận được phản hồi từ Server với dữ liệu yêu cầu.
@enduml
```
### 201 Created {#201}
Status code này thông báo rằng request của client đã được xử lý thành công và một resource mới đã được tạo ra. Thường được sử dụng khi client gửi request POST để tạo mới một resource.

Response sẽ chứa thông tin về resource mới được tạo ra.

```plantuml
@startuml

title HTTP 201 Created - Resource Created

participant "Client" as C
participant "Server" as S

C -> S: POST /create HTTP/1.1\nHost: example.com\nContent-Type: application/json\n{"name": "New Resource"}
note right of S: Client gửi yêu cầu POST để tạo tài nguyên mới. Server nhận và xử lý yêu cầu tạo tài nguyên.

S --> C: HTTP/1.1 201 Created\nLocation: /resource/12345\nContent-Type: application/json\n{"status": "success", "id": 12345}
note left of C: Client nhận được phản hồi từ Server với thông tin chi tiết về tài nguyên đã được tạo.
@enduml
```

### 202 Accepted {#202}
Status code này thông báo rằng request của client đã được chấp nhận và sẽ được xử lý sau. Thường được sử dụng khi client gửi request để xử lý một công việc nào đó mà không cần phải trả về kết quả ngay lập tức.

Ví dụ: Gửi email, chạy job build, xử lý dữ liệu lớn...

Mục đích của status code này là để thông báo cho client rằng request của nó đã được chấp nhận và sẽ được xử lý sau bởi một worker khác.

Response sẽ không chứa thông tin về kết quả của request nhưng có thể sẽ chứa thông tin về job worker sẽ xử lý request.

Ví dụ bạn gửi request để xử lý một công việc nào đó, server sẽ trả về 202 Accepted và thông tin về id của task sẽ xử lý công việc đó.

```plantuml
@startuml

title HTTP 202 Accepted - Request Accepted for Processing

participant "Client" as C
participant "Server" as S

C -> S: POST /process HTTP/1.1\nHost: example.com\nContent-Type: application/json\n{"task": "Send email"}
note right of S: Client gửi yêu cầu POST để xử lý tác vụ. Server nhận và chấp nhận yêu cầu để xử lý sau.

S --> C: HTTP/1.1 202 Accepted\nContent-Type: application/json\n{"status": "accepted", "taskId": 98765}
note left of C: Client nhận được phản hồi từ Server, cho biết yêu cầu đã được chấp nhận và sẽ được xử lý trong tương lai.

C -> S: GET /status/98765 HTTP/1.1\nHost: example.com
note right of S: Client có thể kiểm tra trạng thái của tác vụ sau.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"status": "in progress", "taskId": 98765}
note left of C: Client nhận được cập nhật trạng thái của tác vụ.
@enduml
```

### 203 Non-Authoritative Information {#203}
HTTP Status code này thông báo rằng request đã được xử lý thành công nhưng thông tin trả về không phải từ server gốc mà từ một server khác.

Các ứng dụng sử dụng các dịch vụ proxy hoặc cache có thể sử dụng mã 203 để chỉ ra rằng thông tin trả về không phải từ nguồn gốc mà từ một nguồn khác.

Thực tế, status code này hiện tại ít được sử dụng.
```plantuml
@startuml

title HTTP 203 Non-Authoritative Information

participant "Client" as C
participant "Proxy" as P
participant "Server" as S

C -> P: GET /data HTTP/1.1\nHost: example.com
note right of P: Client gửi yêu cầu GET tới Proxy để truy cập dữ liệu. Proxy kiểm tra xem nó có dữ liệu đã được lưu trữ hay không.

P -> S: GET /data HTTP/1.1\nHost: example.com
note right of S: Proxy chuyển tiếp yêu cầu đến Server để xử lý và gửi dữ liệu.

S --> P: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Original data"}
note left of P: Server xử lý yêu cầu và gửi phản hồi gốc.

P --> C: HTTP/1.1 203 Non-Authoritative Information\nContent-Type: application/json\n{"data": "Cached data"}
note left of C: Client nhận được phản hồi từ Proxy với dữ liệu được lưu trữ, kèm theo cảnh báo thông tin không chính xác.
@enduml
```


### 204 No Content {#204}
HTTP Status code này thông báo rằng request đã được xử lý thành công nhưng không có thông tin(Body) nào được trả về.

Tuy nhiên, đầu ra của phản hồi vẫn có thể chứa các thông tin hữu ích trong phần header, ví dụ như thông tin về các tài nguyên tiếp theo có thể được yêu cầu hoặc hướng dẫn về hành động tiếp theo.

Ví dụ với method `put` hoặc `delete` client chỉ cần biết là đã thành công.

```plantuml
@startuml

title HTTP 204 No Content - Successful Request with No Content

participant "Client" as C
participant "Server" as S

C -> S: DELETE /resource HTTP/1.1\nHost: example.com
note right of S: 'Client gửi yêu cầu DELETE để xóa tài nguyên. Server nhận và xử lý yêu cầu.'

S --> C: HTTP/1.1 204 No Content
note left of C: 'Client nhận được phản hồi từ Server với không có nội dung, \n báo hiệu rằng tài nguyên đã được xóa thành công.'
@enduml
```

### 205 Reset Content {#205}
HTTP Status code này thông báo rằng client cần reset lại form mà nó đã gửi đi. Thường được sử dụng trong trường hợp client gửi form và server xử lý thành công và cần client reset lại form submit.

Thực tế, status code này hiện tại ít được sử dụng.
```plantuml
@startuml

title HTTP 205 Reset Content - Request Processed, Reset Document View

participant "Client" as C
participant "Server" as S

C -> S: POST /submit-form HTTP/1.1\nHost: example.com\nContent-Type: application/x-www-form-urlencoded\n{"formData": "user input"}
note right of S: Client gửi yêu cầu POST để gửi dữ liệu từ biểu mẫu. Server nhận và xử lý dữ liệu.

S --> C: HTTP/1.1 205 Reset Content
note left of C: Client nhận được phản hồi từ Server, yêu cầu reset lại biểu mẫu hoặc màn hình hiển thị.
@enduml

```

### 206 Partial Content {#206}
HTTP Status code này thông báo rằng server đã trả về một phần dữ liệu của resource mà client yêu cầu. Thường được sử dụng khi client yêu cầu một phần dữ liệu của file lớn.

HTTP code này được sử dụng rất nhiều trong quá khứ, hiện tại 2024 thì nó đã giảm bớt.

Trong quá khứ, khi client yêu cầu một file lớn, server sẽ trả về dữ liệu theo từng phần, client sẽ nhận từng phần và hiển thị dữ liệu.

Ví dụ: Khi xem video trên mạng, client sẽ yêu cầu từng phần dữ liệu của video và hiển thị chứ không cần tải toàn bộ video lên đến vài GB về.

```plantuml
@startuml

title HTTP 206 Partial Content - Partial Response

participant "Client" as C
participant "Server" as S

C -> S: GET /file HTTP/1.1\nHost: example.com\nRange: bytes=0-1023
note right of S: Client yêu cầu một phần của tệp (0 đến 1023 byte)

S --> C: HTTP/1.1 206 Nội dung từng phần\nContent-Range: bytes 0-1023/2048\nContent-Type: application/octet-stream
note left of C: Server gửi nội dung từng phần được yêu cầu (bytes 0-1023)

C -> S: GET /file HTTP/1.1\nHost: example.com\nRange: bytes=1024-2047
note right of S: Client yêu cầu dải tiếp theo của tệp (1024 đến 2047 byte)

S --> C: HTTP/1.1 206 Nội dung từng phần\nContent-Range: bytes 1024-2047/2048\nContent-Type: application/octet-stream
note left of C: Server gửi phần tiếp theo của nội dung (bytes 1024-2047)

@enduml

```
Thực tế bây giờ kỹ thuật HLS, Dash đã phổ biến nên status code này ít được sử dụng.

### 207 Multi-Status {#207}
HTTP Status code này thông báo rằng request của client đã được xử lý thành công nhưng response chứa nhiều thông tin về trạng thái của các tài nguyên khác nhau.

Status này được sử dụng khi request của người dùng yêu cầu xử lý nhiều tài nguyên cùng một lúc và mỗi tài nguyên có một trạng thái khác nhau.

Ví dụ: Client gửi request để xóa nhiều file, server sẽ trả về 207 Multi-Status và thông tin về trạng thái của từng file.

Thực tế, status code này hiện tại ít được sử dụng.

```plantuml
@startuml

title HTTP 207 Multi-Status - Multiple Status Codes in One Response (JSON)

participant "Client" as C
participant "Server" as S

C -> S: PROPFIND /collection HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu các thuộc tính của nhiều tài nguyên trong một bộ sưu tập. 

S --> C: HTTP/1.1 207 Multi-Status\nContent-Type: application/json\n{\n  "multiStatus": [\n    {\n      "href": "/resource1",\n      "status": "200 OK"\n    },\n    {\n      "href": "/resource2",\n      "status": "404 Not Found"\n    }\n  ]\n}
note left of C: Server trả về phản hồi đa trạng thái, chứa mã trạng thái cho mỗi tài nguyên dưới định dạng JSON.
@enduml

```

## HTTP Status Code 3xx: Redirection
Hiểu đơn giản HTTP Status Code 3xx là nhóm status code thông báo cho client rằng client cần thực hiện một hành động khác để hoàn thành request.

### 300 Multiple Choices {#300}
HTTP Status code này thông báo rằng request của client có nhiều lựa chọn để chọn. Client cần chọn một trong số các lựa chọn được trả về.
Ví dụ: Client request một resource mà có nhiều phiên bản, client cần chọn một phiên bản để xem.

Thực tế, status code này hiện tại ít được sử dụng.

```plantuml
@startuml

title HTTP 300 Multiple Choices - Multiple Representations Available

participant "Client" as C
participant "Server" as S

C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu tài nguyên có nhiều biểu diễn có thể có.

S --> C: HTTP/1.1 300 Multiple Choices\nContent-Type: application/json\n{\n  "choices": [\n    {"url": "/resource/en", "language": "English"},\n    {"url": "/resource/fr", "language": "French"},\n    {"url": "/resource/es", "language": "Spanish"}\n  ]\n}
note left of C: Server trả lời với danh sách các lựa chọn có sẵn cho tài nguyên dưới dạng JSON.

C -> S: GET /resource/en HTTP/1.1\nHost: example.com
note right of S: Client chọn một trong các lựa chọn có sẵn.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"content": "English content"}
note left of C: Server trả lời với biểu diễn đã chọn trong tiếng Anh.
@enduml
```

### 301 Moved Permanently {#301}
HTTP Status code này thông báo rằng request của client đã được chuyển hướng vĩnh viễn đến một URL khác. Các công cụ tìm kiếm sẽ cập nhật URL cũ thành URL mới trong index của chúng.
Hiện tại HTTP Status code này vẫn được sử dụng rất nhiều, nó thường phục vụ cho việc một URL bị thay đổi hoặc một trang web bị chuyển địa chỉ.

Khi trình duyệt nhận được status code này, nó sẽ đọc header `Location` và chuyển hướng đến URL mới.

```plantuml
@startuml

title HTTP 301 Moved Permanently

participant "Client" as C
participant "Server" as S

C -> S: GET /old-url HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu tài nguyên đã được di chuyển vĩnh viễn

S --> C: HTTP/1.1 301 Chuyển hướng vĩnh viễn\nLocation: /new-url
note left of C: Server trả lời với mã trạng thái 301 và URL mới

C -> S: GET /new-url HTTP/1.1\nHost: example.com
note right of S: Client làm theo chuyển hướng và yêu cầu URL mới

S --> C: HTTP/1.1 200 OK\nContent-Type: text/html\n<html>Nội dung trang mới</html>
note left of C: Server trả lời với nội dung của URL mới

@enduml

```

### 302 Found (Trước đây là Moved Temporarily) {#302}
HTTP Status code này thông báo rằng request của client đã được chuyển hướng tạm thời đến một URL khác, nhưng bạn dự định sẽ phục hồi URL ban đầu sau một thời gian. Các công cụ tìm kiếm sẽ không thay đổi URL trong index.
Thực tế  302 sẽ tương tự như 301, tuy nhiên 302 sẽ nói rằng đây chỉ là tạm thời chứ không phải vĩnh viễn.

```plantuml
@startuml

title HTTP 302 Found

participant "Client" as C
participant "Server" as S

C -> S: POST /old-url HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu tài nguyên mà đã tạm thời di chuyển.

S --> C: HTTP/1.1 302 Found\nLocation: /temporary-url
note left of C: Server phản hồi với mã trạng thái 302 và URL tạm thời để chuyển hướng.

C -> S: GET /temporary-url HTTP/1.1\nHost: example.com
note right of S: Client làm theo chuyển hướng và yêu cầu URL tạm thời.

S --> C: HTTP/1.1 200 OK\nContent-Type: text/html\n<html>Temporary page content</html>
note left of C: Server phản hồi với nội dung của URL tạm thời.
@enduml
```

Thực tế HTTP Status này sẽ hỗ trợ tốt với SEO, 302 sẽ cho các công cụ tìm kiếm biết rằng đây là chuyển hướng tạm thời và không cần cập nhật lại index.

Nếu bạn muốn chuyển hướng vĩnh viễn thì nên sử dụng 301.

### 303 See Other {#303}
HTTP Status này thông báo cho client biết rằng tài nguyên mà client yêu cầu đã được tạo và nằm ở một URL khác. Client cần gửi một request mới đến URL mới để lấy thông tin.
Ví dụ sau khi submit một form thành công, chuyển hướng người dùng đến web page `cảm ơn`.

```plantuml
@startuml

title HTTP 303 See Other

participant "Client" as C
participant "Server" as S

C -> S: POST /submit-form HTTP/1.1\nHost: example.com\nContent-Type: application/x-www-form-urlencoded\nData: form_data
note right of S: Client gửi một yêu cầu `POST` để gửi dữ liệu từ biểu mẫu.

S --> C: HTTP/1.1 303 See Other\nLocation: /confirmation
note left of C: Server phản hồi với mã trạng thái 303, chỉ ra rằng Client nên thực hiện một yêu cầu `GET` tới URL mới.

C -> S: GET /confirmation HTTP/1.1\nHost: example.com
note right of S: Client làm theo chuyển hướng và gửi yêu cầu `GET` tới URL mới.

S --> C: HTTP/1.1 200 OK\nContent-Type: text/html\n<html>Confirmation page content</html>
note left of C: Server phản hồi với nội dung của trang xác nhận.
@enduml
```

Thực tế, status code này hiện tại ít được sử dụng.

### 304 Not Modified {#304}

HTTP Status code này thông báo rằng tài nguyên mà client yêu cầu không thay đổi từ lần cuối cùng client yêu cầu. Server sẽ trả về status code này và không trả về dữ liệu của tài nguyên. Client sẽ sử dụng cache để hiển thị dữ liệu.

Status code này thường được sử dụng khi client yêu cầu một tài nguyên mà đã được cache và không thay đổi từ lần cuối cùng client yêu cầu.

Thường sẽ kèm theo một số header để biểu thị hash hoặc thời gian thay đổi lần cuối của tài nguyên.

```plantuml
@startuml

title HTTP 200 OK and 304 Not Modified with Cache

participant "Client" as C
participant "Server" as S

C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu tài nguyên lần đầu tiên

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Resource content"}
note left of C: Server phản hồi với nội dung của tài nguyên
note right of C: Client lưu tài nguyên vào bộ nhớ đệm

C -> S: GET /resource HTTP/1.1\nHost: example.com\nIf-Modified-Since: <last-modified-date>
note right of S: Client gửi yêu cầu với tiêu đề `If-Modified-Since` để kiểm tra xem tài nguyên đã thay đổi hay chưa

S --> C: HTTP/1.1 304 Not Modified
note left of C: Server phản hồi với mã trạng thái 304, chỉ ra rằng không có sự thay đổi
note right of C: Client lấy tài nguyên từ bộ nhớ đệm của mình

@enduml

```

### 305 Use Proxy {#305}
HTTP Status code này thông báo rằng client cần sử dụng proxy để truy cập tài nguyên. Thường được sử dụng trong trường hợp client không thể truy cập trực tiếp tài nguyên mà cần thông qua proxy.

HTTP code này cần được trả về từ chính Origin Server, không được trả về từ Proxy. Và khi trả về sẽ kèm theo url của proxy thông qua header `Location`.

```plantuml
@startuml

title HTTP 305 Sử dụng Proxy

participant "Client" as C
participant "Server" as S
participant "Proxy" as P

C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu tài nguyên, và server chỉ định sử dụng proxy

S --> C: HTTP/1.1 305 Sử dụng Proxy\nLocation: http://proxy.example.com
note left of C: Server phản hồi với mã trạng thái 305 và URL của proxy

C -> P: GET /resource HTTP/1.1\nHost: proxy.example.com
note right of P: Client gửi yêu cầu đến Server proxy đã chỉ định

P --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Nội dung tài nguyên"}
note left of C: Proxy phản hồi với nội dung của tài nguyên

@enduml
```

Thực tế, status code này hiện tại ít được sử dụng.

### 306 Switch Proxy {#306}
Thực tế status code này không được sử dụng nữa, nó chỉ tồn tại trong HTTP/1.1 draft.

### 307 Temporary Redirect {#307}
Tuong tự như 302, status code này thông báo rằng request của client đã được chuyển hướng tạm thời đến một URL khác.
Client cần gửi một request mới đến URL mới để lấy thông tin.

Tuy nhiên, khác với 302, client sẽ không thay đổi phương thức request, nghĩa là nếu client gửi request POST thì sẽ vẫn gửi POST.

Nguyên nhân dẫn đến vấn đề này là ở phiên bản HTTP/1, HTTP STATUS 302 cũng mô tả giữ nguyên method, nhưng nhiều trinh trình duyệt chuyển hướng request POST thành GET.

Vì vậy ở phiên bản HTTP/1.1, 307 được tạo ra để giữ nguyên method của request và phân biên rõ ràng với 302.

```plantuml
@startuml

title HTTP 307 Temporary Redirect

participant "Client" as C
participant "Server" as S

C -> S: POST /old-url HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu tài nguyên mà đã tạm thời chuyển hướng

S --> C: HTTP/1.1 307 Temporary Redirect\nLocation: /new-url
note left of C: Server phản hồi với mã trạng thái 307 và URL tạm thời

C -> S: POST /new-url HTTP/1.1\nHost: example.com
note right of S: Client làm theo chuyển hướng và gửi lại cùng phương thức HTTP (POST) đến URL mới

S --> C: HTTP/1.1 200 OK\nContent-Type: text/html\n<html>New page content</html>
note left of C: Server phản hồi với nội dung của URL mới
@enduml
```

### 308 Permanent Redirect {#308}
Tương tự vấn đề của 302 và 307, 308 được tạo ra để giữ nguyên method của request và phân biên rõ ràng với 301.

HTTP Status code này thông báo rằng request của client đã được chuyển hướng vĩnh viễn đến một URL khác giống với 301 nhưng giữ nguyên method của request khi chuyển hướng.

```plantuml
@startuml

title HTTP 308 Permanent Redirect

participant "Client" as C
participant "Server" as S

C -> S: POST /old-url HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu tài nguyên mà đã được chuyển hướng vĩnh viễn

S --> C: HTTP/1.1 308 Permanent Redirect\nLocation: /new-url
note left of C: Server phản hồi với mã trạng thái 308 và URL vĩnh viễn

C -> S: POST /new-url HTTP/1.1\nHost: example.com
note right of S: Client làm theo chuyển hướng và gửi lại cùng phương thức HTTP (POST) tới URL mới

S --> C: HTTP/1.1 200 OK\nContent-Type: text/html\n<html>New page content</html>
note left of C: Server phản hồi với nội dung của URL mới
@enduml
```

## HTTP Status Code 4xx: Client Error {#4xx}
Status code 4xx là nhóm status code thông báo cho client rằng request của client không hợp lệ hoặc không thể xử lý.
Nguyên nhân có thể là do client gửi request không hợp lệ(Thiếu dữ liệu...etc...), không có quyền truy cập tài nguyên hoặc tài nguyên không tồn tại.

### 400 Bad Request {#400}
HTTP Status code này thông báo rằng request của client không hợp lệ. Thường được sử dụng khi client gửi request không đúng cú pháp, thiếu dữ liệu.
Ví dụ: Client gửi request POST nhưng không có body nhưng server yêu cầu body.
```plantuml
@startuml

title HTTP 400 Bad Request - Missing Required Parameter

participant "Client" as C
participant "Server" as S

C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu mà không có tham số truy vấn bắt buộc "userId"

note left of S: Server yêu cầu tham số "userId" để xử lý yêu cầu

S --> C: HTTP/1.1 400 Bad Request\nContent-Type: text/html\n<html>Missing required parameter: userId</html>
note left of C: Server phản hồi với mã trạng thái 400, chỉ ra rằng thiếu tham số "userId"

C -> S: GET /resource?userId=123 HTTP/1.1\nHost: example.com
note right of S: Client gửi lại yêu cầu với tham số bắt buộc "userId"

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Resource content"}
note left of C: Server phản hồi với tài nguyên đã yêu cầu sau khi tham số đúng được cung cấp
@enduml
```

### 401 Unauthorized {#401}
HTTP Status code này thông báo rằng client cần xác thực để truy cập tài nguyên. Thường được sử dụng khi client gửi request mà không có thông tin xác thực hoặc thông tin xác thực không hợp lệ.

Ví dụ khi client gửi request mà không gửi token ở trong header, hoặc token không hợp lệ.

```plantuml
@startuml

title HTTP 401 Unauthorized - No Authorization Header & Invalid Token

participant "Client" as C
participant "Server" as S

== Case 1: Missing Authorization Header ==
C -> S: GET /protected-resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu mà không có tiêu đề Authorization.

note left of S: Server yêu cầu tiêu đề Authorization để xác thực yêu cầu.

S --> C: HTTP/1.1 401 Unauthorized\nContent-Type: text/html\n<html>Missing Authorization header</html>
note left of C: Server phản hồi với mã trạng thái 401, chỉ ra rằng tiêu đề Authorization là bắt buộc.

== Case 2: Invalid Authorization Header ==
C -> S: GET /protected-resource HTTP/1.1\nHost: example.com\nAuthorization: Bearer invalid_token
note right of S: Client gửi yêu cầu với một token không hợp lệ.

note left of S: Server kiểm tra token và xác định là không hợp lệ.

S --> C: HTTP/1.1 401 Unauthorized\nContent-Type: text/html\n<html>Invalid token</html>
note left of C: Server phản hồi với mã trạng thái 401, chỉ ra rằng thông tin xác thực không hợp lệ.

== Successful Request ==
C -> S: GET /protected-resource HTTP/1.1\nHost: example.com\nAuthorization: Bearer valid_token
note right of S: Client gửi yêu cầu với một token hợp lệ.

note left of S: Server xác thực token và cấp quyền truy cập.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Protected resource content"}
note left of C: Server phản hồi với tài nguyên đã yêu cầu, vì Client đã được xác thực.
@enduml
```

Như mô tả ở trên, khi API yêu cầu xác thực, client cần gửi thông tin xác thực lên cho server, nếu không gửi hoặc gửi thông tin không hợp lệ thì server sẽ trả về `401 Unauthorized`.

### 402 Payment Required {#402}
Code này không được sử dụng, nó được tạo ra để sử dụng trong tương lai và chưa được chuẩn hóa.

### 403 Forbidden {#403}
HTTP Status code này thông báo rằng client không có quyền truy cập tài nguyên. Thường được sử dụng khi client gửi request mà không có quyền truy cập tài nguyên.

Ví dụ một tài khoản đã pass 401 nhưng khi kiểm tra quyền để truy cập tài nguyên thì không có, khi đó HTTP Status code 403 sẽ được trả về.

```plantuml
@startuml

title HTTP 403 Forbidden - Authorization Passed but Insufficient Permissions

participant "Client" as C
participant "Server" as S

== Case 1: Failed Authentication (401 Unauthorized) ==
C -> S: GET /admin-resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu mà không có tiêu đề Authorization hoặc với thông tin xác thực không hợp lệ.

note left of S: Server yêu cầu phải xác thực để kiểm tra yêu cầu.

S --> C: HTTP/1.1 401 Unauthorized\nContent-Type: text/html\n<html>Unauthorized</html>
note left of C: Server phản hồi với 401, chỉ ra rằng yêu cầu xác thực là cần thiết.

== Case 2: Authentication Passed but Lacks Permissions (403 Forbidden) ==
C -> S: GET /admin-resource HTTP/1.1\nHost: example.com\nAuthorization: Bearer valid_token
note right of S: Client gửi một token hợp lệ nhưng không có quyền truy cập yêu cầu cho tài nguyên đã yêu cầu.

note left of S: Server kiểm tra token nhưng từ chối quyền truy cập do thiếu quyền.

S --> C: HTTP/1.1 403 Forbidden\nContent-Type: text/html\n<html>Access forbidden</html>
note left of C: Server phản hồi với 403, chỉ ra rằng Client đã được xác thực nhưng không có quyền truy cập vào tài nguyên.

== Successful Request (Admin Access) ==
C -> S: GET /admin-resource HTTP/1.1\nHost: example.com\nAuthorization: Bearer admin_token
note right of S: Client gửi lại yêu cầu với thông tin xác thực cho phép quyền admin.

note left of S: Server kiểm tra token và xác nhận rằng Client có đủ quyền.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Admin resource content"}
note left of C: Server phản hồi với tài nguyên admin đã yêu cầu, vì Client có quyền truy cập cần thiết.

@enduml
```

### 404 Not Found {#404}
HTTP Status code này thông báo rằng server không tìm thấy tài nguyên mà client yêu cầu. Thường được sử dụng khi client yêu cầu một tài nguyên không tồn tại.

```plantuml
@startuml

title HTTP 404 Not Found and Successful 200 OK Response

participant "Client" as C
participant "Server" as S

== Case 1: Nonexistent Resource ==
C -> S: GET /nonexistent-resource HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu một tài nguyên mà không tồn tại trên Server.

note left of S: Server kiểm tra các route và cơ sở dữ liệu tài nguyên của nó nhưng không tìm thấy bất kỳ sự khớp nào.

S --> C: HTTP/1.1 404 Not Found\nContent-Type: text/html\n<html>Resource not found</html>
note left of C: Server phản hồi với mã 404, cho biết tài nguyên yêu cầu không tồn tại.

== Case 2: Typo in URL ==
C -> S: GET /ressource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu đến một endpoint bị đánh vần sai.

note left of S: Server không thể khớp yêu cầu với một route hợp lệ do lỗi chính tả.

S --> C: HTTP/1.1 404 Not Found\nContent-Type: text/html\n<html>Invalid endpoint</html>
note left of C: Client nhận được phản hồi 404 do URL không đúng.

== Case 3: Resource Previously Deleted ==
C -> S: GET /deleted-resource HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu một tài nguyên đã bị xóa

note left of S: Server xác nhận rằng tài nguyên từng tồn tại nhưng hiện không còn sẵn.

S --> C: HTTP/1.1 404 Not Found\nContent-Type: text/html\n<html>Resource deleted</html>
note left of C: Server phản hồi với 404, cho biết tài nguyên không còn sẵn.

== Case 4: Resource Found ==
C -> S: GET /existing-resource HTTP/1.1\nHost: example.com
note right of S: Client yêu cầu tài nguyên tồn tại trên Server.

note left of S: Server tìm thấy tài nguyên yêu cầu và chuẩn bị để giao nó.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Resource content"}
note left of C: Server phản hồi với 200, giao tài nguyên yêu cầu thành công.

@enduml
```

Lưu ý: Có thể là không tồn tại, hoặc đã bị xóa cứng hoặc đã bị xóa mềm.

### 405 Method Not Allowed {#405}
HTTP Status code này thông báo rằng phương thức request của client không được phép trên tài nguyên. Thường được sử dụng khi client gửi request với phương thức không được hỗ trợ.

Với 405 là server nhận biết được method client yêu ầu là gì, tuy nhiên server không hỗ trợ method đó.
Hiểu đơn là server nhận biết được method nhưng cố tình không hỗ trợ.

Ví dụ server chỉ hỗ trợ method GET cho endpoint `/resource` nhưng client gửi request với method POST thì server sẽ trả về 405 Method Not Allowed.

```plantuml
@startuml

title HTTP 405 Method Not Allowed and Method Allowed Response

participant "Client" as C
participant "Server" as S

== Example: Method Not Allowed ==
C -> S: POST /resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu POST đến một endpoint mà chỉ hỗ trợ GET.

note left of S: Server kiểm tra các phương thức được phép cho endpoint và phát hiện rằng POST không được hỗ trợ.

S --> C: HTTP/1.1 405 Method Not Allowed\nContent-Type: text/html\n<html>Method Not Allowed</html>
note left of C: Server phản hồi với mã 405, thông báo rằng phương thức POST không được phép trên tài nguyên.

== Example: Method Allowed ==
C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu GET đến một endpoint hỗ trợ GET.

note left of S: Server kiểm tra các phương thức được phép cho endpoint và phát hiện rằng GET được hỗ trợ.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Resource content"}
note left of C: Server phản hồi với 200, giao tài nguyên yêu cầu thành công.

@enduml
```

### 406 Not Acceptable {#406}
HTTP Status code này thông báo rằng server không thể trả về dữ liệu theo định dạng mà client yêu cầu. Thường được sử dụng khi client yêu cầu dữ liệu ở một định dạng mà server không hỗ trợ.

Khi gửi request, client cần gửi thông tin về định dạng mà nó muốn nhận dữ liệu thông qua header `Accept` và có thể thêm `Accept-Encoding` và `Accept-Language`.

Đây là định nghĩa data type mà client muốn nhận dữ liệu từ server.

Nếu server không hỗ trợ định dạng mà client yêu cầu thì server sẽ trả về 406 Not Acceptable.

```plantuml
@startuml

title HTTP 406 Not Acceptable

participant "Client" as C
participant "Server" as S

== Example: Unsupported Data Format ==
C -> S: GET /resource HTTP/1.1\nHost: example.com\nAccept: application/xml
note right of S: Client yêu cầu tài nguyên dưới định dạng XML.

note left of S: Server kiểm tra các định dạng hỗ trợ của nó và nhận thấy không hỗ trợ XML.

S --> C: HTTP/1.1 406 Not Acceptable\nContent-Type: text/html\n<html>Unsupported data format</html>
note left of C: Server phản hồi với mã 406, thông báo không thể trả dữ liệu trong định dạng yêu cầu.

== Example: Supported Data Format ==
C -> S: GET /resource HTTP/1.1\nHost: example.com\nAccept: application/json
note right of S: Client yêu cầu tài nguyên dưới định dạng JSON.

note left of S: Server kiểm tra các định dạng hỗ trợ của nó và xác nhận rằng JSON được hỗ trợ.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Resource content"}
note left of C: Server phản hồi với 200, giao tài nguyên yêu cầu dưới định dạng được hỗ trợ.

@enduml
```

### 407 Proxy Authentication Required {#407}
Khi client sử dụng một proxy trung gian để truy câp tài nguyên đến server, và proxy yêu cầu client cần xác thực để truy cập tài nguyên.

Client cần gửi kèm thông tin xác thực của proxy. Nếu client không gửi thông tin xác thực hoặc thông tin xác thực không hợp lệ thì server sẽ trả về 407 Proxy Authentication Required.

```plantuml
@startuml

title HTTP 407 Proxy Authentication Required

participant "Client" as C
participant "Proxy Server" as PS
participant "Server" as S

== Example: Proxy Authentication Required (Client does not send credentials) ==
C -> PS: GET /resource HTTP/1.1\nHost: example.com
note right of PS: Client yêu cầu tài nguyên thông qua proxy mà không gửi thông tin xác thực.

note left of PS: Server proxy nhận được yêu cầu và nhận thấy không có thông tin xác thực được cung cấp.

PS --> C: HTTP/1.1 407 Proxy Authentication Required\nContent-Type: text/html\n<html>Authentication Required</html>
note left of C: Server proxy phản hồi với mã 407, yêu cầu Client cung cấp thông tin xác thực hợp lệ.

== Example: Proxy Authentication Required (Invalid credentials) ==
C -> PS: GET /resource HTTP/1.1\nHost: example.com\nProxy-Authorization: Basic InvalidCredentials
note right of PS: Client yêu cầu tài nguyên thông qua proxy, nhưng cung cấp thông tin xác thực không hợp lệ.

note left of PS: Server proxy nhận được yêu cầu và kiểm tra các thông tin xác thực. Chúng được phát hiện là không hợp lệ.

PS --> C: HTTP/1.1 407 Proxy Authentication Required\nContent-Type: text/html\n<html>Invalid credentials</html>
note left of C: Server proxy phản hồi với mã 407 lần nữa, thông báo rằng các thông tin xác thực được cung cấp không hợp lệ.

== Example: Proxy Authentication Successful ==
C -> PS: GET /resource HTTP/1.1\nHost: example.com\nProxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
note right of PS: Client gửi yêu cầu thông qua proxy, cung cấp thông tin xác thực hợp lệ.

note left of PS: Server proxy chuyển yêu cầu đến Server chính với các thông tin xác thực hợp lệ.

PS -> S: GET /resource HTTP/1.1\nHost: example.com
note right of PS: Server nhận được yêu cầu với thông tin xác thực proxy hợp lệ.

note left of S: Server kiểm tra và xác minh các thông tin xác thực.

S --> PS: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Resource content"}
note left of PS: Server phản hồi với 200 OK, cho phép truy cập vào tài nguyên yêu cầu.

PS -> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Resource content"}
note left of C: Server proxy chuyển tiếp phản hồi thành công lại cho Client.

@enduml
```

### 408 Request Timeout {#408}

HTTP Status code này thông báo rằng server đã hết thời gian xử lý request của client. Thường được sử dụng khi server không thể xử lý request của client trong khoảng thời gian quy định.

Ví dụ server sẽ xử lý request của client trong 30s, nếu server không xử lý xong trong 30s thì sẽ trả về 408 Request Timeout.

```plantuml
@startuml

title HTTP 408 Request Timeout and Successful Response

participant "Client" as C
participant "Server" as S

== Example: Request Timeout ==
C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu tài nguyên.

note left of S: Server bắt đầu xử lý yêu cầu nhưng không hoàn thành trong thời gian cho phép.

S --> C: HTTP/1.1 408 Request Timeout\nContent-Type: text/html\n<html>Request Timeout</html>
note left of C: Server phản hồi với mã 408, cho biết yêu cầu mất quá nhiều thời gian để xử lý.

== Example: Successful Request ==
C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu tài nguyên.

note left of S: Server xử lý yêu cầu trong thời gian cho phép.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{"data": "Resource content"}
note left of C: Server phản hồi với 200, giao tài nguyên yêu cầu thành công.

@enduml
```

### 409 Conflict {#409}
Như cái tên cũng đã mô tả, HTTP Status code này thông báo rằng request của client làm xung đột với trạng thái hiện tại của tài nguyên.

Thường được sử dụng khi client gửi request mà xung đột với trạng thái hiện tại của tài nguyên.

Ví dụ: Khi client lấy về thông tin của tài nguyên và thông tin tài nguyên có trạng thái `pending`, sau đó client gửi request để cập nhật thông tin tài nguyên thành `reject` nhưng thông tin tài nguyên đã được cập nhật bởi một client khác và trạng thái của tài nguyên đã là `approved`.

Khi đó server sẽ trả về 409 Conflict.

Điều này để bảo vệ dữ liệu của tài nguyên khỏi việc bị ghi đè do nhầm lẫn.

```plantuml
@startuml

title HTTP 409 Conflict Example

participant "Client 1" as C1
participant "Client 2" as C2
participant "Server" as S

== Lần đầu lấy về trạng thái pending ==
C1 -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client 1 gửi yêu cầu để lấy thông tin tài nguyên.

note left of S: Server trả về tài nguyên với trạng thái là pending.

S --> C1: HTTP/1.1 200 OK\nContent-Type: application/json\n{"status": "pending", "data": {...}}
note left of C1: Client 1 nhận được tài nguyên với trạng thái "pending".

== Client 2 cập nhật trạng thái thành approved ==
C2 -> S: PUT /resource HTTP/1.1\nHost: example.com
note right of S: Client 2 gửi yêu cầu để cập nhật trạng thái tài nguyên thành "approved".

note left of S: Server nhận thấy trạng thái "pending" đã thay đổi thành "approved".

S --> C2: HTTP/1.1 200 OK\nContent-Type: application/json\n{"status": "approved", "message": "Resource updated successfully"}
note left of C2: Client 2 nhận thông báo cập nhật thành công.

== Client 1 cố gắng cập nhật lại thành reject ==
C1 -> S: PUT /resource HTTP/1.1\nHost: example.com
note right of S: Client 1 gửi yêu cầu để thay đổi trạng thái tài nguyên thành "reject".

note left of S: Server nhận ra rằng trạng thái hiện tại của tài nguyên đã bị thay đổi bởi Client khác và không cho phép thay đổi.

S --> C1: HTTP/1.1 409 Conflict\nContent-Type: text/html\n<html>Conflict: The resource has already been updated by another client.</html>
note left of C1: Server phản hồi với mã 409, thông báo rằng tài nguyên đã bị thay đổi bởi Client khác.

@enduml
```

### 410 Gone {#410}
HTTP Status code này thông báo rằng tài nguyên mà client yêu cầu đã không còn sẵn. Thường được sử dụng khi tài nguyên đã bị xóa và không thể phục hồi hoặc tồn tại lại trong tương lai bằng bất kỳ cách nào.


Tuy nhiên hiện tại ít được sử dụng, thường sử dụng 404 Not Found thay thế.

```plantuml
@startuml

title HTTP 410 Gone Example

participant "Client" as C
participant "Server" as S

== Trường hợp tài nguyên bị xóa ==
C -> S: GET /old-resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu để truy cập tài nguyên.

note left of S: Server kiểm tra và phát hiện tài nguyên đã bị xóa.

S --> C: HTTP/1.1 410 Gone\nContent-Type: text/html\n<html>The requested resource is no longer available.</html>
note left of C: Server phản hồi với mã 410, thông báo rằng tài nguyên đã bị xóa vĩnh viễn

@enduml
```

Hiện tại ít được sử dụng, thường sử dụng 404 Not Found thay thế. Và coi đó là một cách thông báo rằng tài nguyên không tồn tại.

### 411 Length Required {#411}
HTTP Status code này thông báo rằng server yêu cầu client cung cấp thông tin về độ dài của body trong request.

Thường được sử dụng khi client gửi request mà không có thông tin về độ dài của body.

Server cần thông tin về độ dài để xác định có đủ khả năng xử lý request hay không.
Ví dụ khi server xác định có thể xử lý thì trả về `100 Continue` để client tiếp tục gửi body.

```plantuml
@startuml

title HTTP 411 Length Required

participant "Client" as C
participant "Server" as S

C -> S: POST /data HTTP/1.1\nHost: example.com\nContent-Type: application/json
note right of S: Client gửi yêu cầu POST mà không có thông tin về độ dài của body.

note left of S: Server yêu cầu Client cung cấp thông tin về độ dài của body.

S --> C: HTTP/1.1 411 Length Required\nContent-Type: text/html\n<html>Length Required: The server requires the Content-Length header.</html>
note left of C: Server phản hồi với mã 411, yêu cầu Client cung cấp thông tin về độ dài của body trong request.

@enduml

```

### 412 Precondition Failed {#412}
HTTP code này thông báo rằng một hoặc nhiều điều kiện tiên quyết để server xử lý request của client không được client gửi lên trên header hoặc không thỏa mãn.

Một số condition có thể là `If-Match`, `If-None-Match`, `If-Modified-Since`, `If-Unmodified-Since`, `If-Range`, `If-None-Match`. Các preconditions này được sử dụng để xác minh rằng client chỉ thực hiện hành động nếu trạng thái tài nguyên đáp ứng các tiêu chí xác định, giúp tránh các xung đột hoặc lỗi không mong muốn.

```plantuml
@startuml

title Avoiding Mid-Air Collisions with ETag and If-Match

participant "Client" as C
participant "Server" as S

== Case: Precondition Not Satisfied ==

C -> S: GET /wiki-page HTTP/1.1\nHost: example.com
S --> C: HTTP/1.1 200 OK\nETag: "etag123"\nContent-Type: application/json\n{ "content": "Current page content" }
note right of C: 'Client lưu giá trị ETag `etag123`.'

... Some time passes, another user edits the page ...

C -> S: POST /wiki-page HTTP/1.1\nHost: example.com\nIf-Match: "etag123"\nContent-Type: application/json\n{ "content": "Updated page content" }
note right of S: 'Client gửi yêu cầu chỉnh sửa kèm `If-Match: "etag123"` để xác minh tài nguyên chưa thay đổi.'

S -> S: Kiểm tra giá trị ETag của tài nguyên
note left of S: 'ETag của tài nguyên đã thay đổi do chỉnh sửa trước đó.'

S --> C: HTTP/1.1 412 Precondition Failed\nContent-Type: text/html\n<html>Precondition Failed</html>
note left of C: 'Server từ chối chỉnh sửa vì tài nguyên đã thay đổi.'

== Case: Precondition Satisfied ==

C -> S: GET /wiki-page HTTP/1.1\nHost: example.com
S --> C: HTTP/1.1 200 OK\nETag: "etag456"\nContent-Type: application/json\n{ "content": "Current page content" }
note right of C: 'Client lưu giá trị ETag `etag456`.'

C -> S: POST /wiki-page HTTP/1.1\nHost: example.com\nIf-Match: "etag456"\nContent-Type: application/json\n{ "content": "Updated page content" }
note right of S: 'Client gửi yêu cầu chỉnh sửa kèm `If-Match: "etag456"`'.

S -> S: 'Kiểm tra giá trị ETag của tài nguyên'
note left of S: 'ETag khớp với giá trị hiện tại.'

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{ "message": "Page updated successfully" }
note left of C: 'Server xử lý yêu cầu và cập nhật tài nguyên thành công.'

@enduml
```

### 413 Payload Too Large {#413}

HTTP Status code này thông báo rằng server không thể xử lý request của client vì body của request quá lớn.

Mô server sẽ có thể có các giới hạn kích thước về dữ liệu body của request, nếu client gửi request với body quá lớn và server không thể sử lý thì server sẽ trả về 413 Payload Too Large.

```plantuml
@startuml

title HTTP 413 Content Too Large

participant "Client" as C
participant "Server" as S

C -> S: POST /upload HTTP/1.1\nHost: example.com\nContent-Length: 10GB\nContent-Type: application/json\n{ "file": "Large file data..." }
note right of S: Client gửi yêu cầu upload một tệp lớn với kích thước 10GB.

S -> S: Kiểm tra kích thước nội dung
note left of S: Kích thước nội dung vượt quá giới hạn mà Server cho phép (e.g., 5GB).

S --> C: HTTP/1.1 413 Content Too Large\nContent-Type: text/html\n<html>Request Entity Too Large</html>
note left of C: Server trả về lỗi 413 để thông báo rằng nội dung quá lớn.

@enduml
```

### 414 URI Too Long {#414}
HTTP Status code này thông báo rằng server không thể xử lý request của client vì URI của request quá dài.

Một số server có thể có giới hạn về độ dài của URI, nếu client gửi request với URI quá dài thì server sẽ trả về 414 URI Too Long.

```plantuml
@startuml

title HTTP 414 URI Too Long

participant "Client" as C
participant "Tomcat Server" as S

C -> S: GET /search?q=ThisIsAnExtremelyLongQueryStringThatExceedsTheServerLimit... HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu với URI có query string quá dài.

S -> S: Kiểm tra độ dài URI
note left of S: URI vượt quá giới hạn của Server (e.g., default 8KB cho Tomcat).

S --> C: HTTP/1.1 414 URI Too Long\nContent-Type: text/html\n<html>Request URI Too Long</html>
note left of C: Server trả về lỗi 414, thông báo rằng URI không hợp lệ do quá dài.

@enduml
```
::: details ví dụ:
``` shell
curl 'https://thanhlv.com/?a=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'
```
Response : `Error: URI Too Long% `
:::

### 415 Unsupported Media Type {#415}

HTTP Status code này thông báo rằng server không hỗ trợ kiểu dữ liệu của request của client.
Ví dụ client gửi request với Content-Type là XML nhưng server chỉ hỗ trợ JSON chỉ server sẽ trả về 415 Unsupported Media Type.

```plantuml
@startuml

title HTTP 415 Unsupported Media Type - Error and Success Cases

participant "Client" as C
participant "Server" as S

== Case: Error - Unsupported Media Type ==

C -> S: POST /upload HTTP/1.1\nHost: example.com\nContent-Type: text/plain\n{ "data": "This is plain text" }
note right of S: Client gửi yêu cầu với loại nội dung không hỗ trợ (text/plain).

S -> S: Kiểm tra loại nội dung
note left of S: Server nhận thấy rằng `Content-Type` không hỗ trợ.

S --> C: HTTP/1.1 415 Unsupported Media Type\nContent-Type: text/html\n<html>Unsupported Media Type</html>
note left of C: Server trả về mã lỗi 415 để thông báo rằng loại nội dung không được hỗ trợ.

== Case: Success - Supported Media Type ==

C -> S: POST /upload HTTP/1.1\nHost: example.com\nContent-Type: application/json\n{ "data": "This is JSON data" }
note right of S: Client gửi yêu cầu với loại nội dung được hỗ trợ (application/json).

S -> S: Kiểm tra loại nội dung
note left of S: Server nhận thấy rằng `Content-Type` hỗ trợ.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{ "message": "Data uploaded successfully" }
note left of C: Server xử lý yêu cầu và trả về phản hồi thành công.

@enduml
```

### 416 Range Not Satisfiable {#416}
HTTP Status code này thông báo rằng server không thể thực hiện yêu cầu của client vì giá trị của Range header không hợp lệ.
Nguyên nhân có thể là giá trị của Range header không hợp lệ về format hoặc nằm ngoài phạm vi của tài nguyên.

```plantuml
@startuml

title HTTP 416 Range Not Satisfiable - Video File Access

participant "Client" as C
participant "Server" as S

== Case: Error - Range Not Satisfiable ==

C -> S: GET /video.mp4 HTTP/1.1\nHost: example.com\nRange: bytes=5000000-6000000
note right of S: Client yêu cầu một phạm vi vượt quá kích thước file video.

S -> S: Kiểm tra phạm vi yêu cầu
note left of S: File video có kích thước chỉ 4,000,000 bytes.

S --> C: HTTP/1.1 416 Range Not Satisfiable\nContent-Range: */4000000
note left of C: Server thông báo phạm vi không hợp lệ. Kích thước tối đa của file là 4,000,000 bytes.

== Case: Success - Partial Content ==

C -> S: GET /video.mp4 HTTP/1.1\nHost: example.com\nRange: bytes=0-999999
note right of S: Client yêu cầu phạm vi hợp lệ (bytes 0-999999).

S -> S: Kiểm tra phạm vi yêu cầu
note left of S: Phạm vi yêu cầu hợp lệ, bắt đầu từ đầu file.

S --> C: HTTP/1.1 206 Partial Content\nContent-Range: bytes 0-999999/4000000\n[ video data... ]
note left of C: Server trả về đoạn video tương ứng với phạm vi được yêu cầu.

@enduml
```

### 417 Expectation Failed {#417}
HTTP Status code này thông báo rằng server không thể thực hiện yêu cầu của client vì Expect header không hợp lệ hoặc không thể được thực hiện.

Expect header thường được sử dụng để yêu cầu server thực hiện một số hành động trước khi client gửi request thực sự. Ví dụ, client có thể yêu cầu server xác nhận rằng nó hỗ trợ 100-continue trước khi gửi dữ liệu.

Khi server không hỗ trợ Expect hoặc không thể thực hiện yêu cầu, nó sẽ trả về 417 Expectation Failed.

### 418 I'm a teapot {#418}

Bắt đầu từ mộ trò đùa trong RFC 2324, HTTP Status code 418 I'm a teapot không có ý nghĩa thực tế và không nên được sử dụng trong ứng dụng thực tế.

### 421 Misdirected Request {#419}

HTTP Status code này thông báo rằng server không thể xử lý yêu cầu của client vì yêu cầu đã được gửi đến một máy chủ không đúng.

Điều này có thể xảy ra khi client gửi yêu cầu hoặc bị directed đến một máy chủ không đúng trong một cụm máy chủ hoặc khi máy chủ không thể xác định máy chủ đích của yêu cầu.

Thực tế HTTP Code này cũng ít được sử dụng.

### 422 Unprocessable Entity {#422}

HTTP Status code này thông báo rằng server không thể xử lý yêu cầu của client vì dữ liệu của yêu cầu không hợp lệ.

Với HTTP code này, server vẫn đọc hiểu được format và syntax của request là chính xác, tuy nhiên không thể sử lý do dữ liệu không hợp lệ.

Ví dụ đơn giản, server yêu cầu client gửi lên một Json có trường `content` được encode base64, nhưng client gửi lên một Json chứa trường `content` không phải là base64.

```plantuml
@startuml
title HTTP 422 Unprocessable Entity - Error and Success Cases

participant "Client" as C
participant "Server" as S

== Case: Error - Unprocessable Entity ==

C -> S: POST /upload HTTP/1.1\nHost: example.com\nContent-Type: application/json\n{ "content": "InvalidContent" }
note right of S: 'Client gửi yêu cầu với dữ liệu không hợp lệ trong trường `content` (không phải base64).'

S -> S: Kiểm tra dữ liệu trong trường `content`
note left of S: 'Server phát hiện `content` không được encode base64 hợp lệ.'

S --> C: HTTP/1.1 422 Unprocessable Entity\nContent-Type: application/json\n{ "error": "Field 'content' must be base64 encoded" }
note left of C: 'Server trả về mã lỗi 422 với thông báo chi tiết.'

== Case: Success - Valid Request ==

C -> S: POST /upload HTTP/1.1\nHost: example.com\nContent-Type: application/json\n{ "content": "QmFzZTY0RW5jb2RlZA==" }
note right of S: Client gửi yêu cầu với dữ liệu hợp lệ trong trường `content`  \n (không phải base64).
S -> S: Kiểm tra dữ liệu trong trường `content`
note left of S: Server xác nhận `content` là base64 hợp lệ.

S -> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{ "message": "Data processed successfully" }
note left of C: Server xử lý yêu cầu và trả về phản hồi thành công.

@enduml
```

Thực tế HTTP CODE này ít được sử dụng.

### 428, 429, 431 và 511
Thực tế trong RFC của HTTP/1.1 không có 3 HTTP code này, 3 HTTP code này là một phần mở rộng của HTTP/1.1 được viết trong [RFC 6585](https://datatracker.ietf.org/doc/html/rfc6585)

### 428 Precondition Required {#428}
HTTP Code này hơi giống `412 Precondition Failed`, tuy nhiên HTPP code này là server yêu cầu có các điều kiện nhưng client không gửi lên.

Ví dụ server yêu cầu client gửi lên ` If-Match` nhưng client không gửi lên.

```plantuml
@startuml

title HTTP 428 Precondition Required - Error and Success Cases

participant "Client" as C
participant "Server" as S

== Case: Error - Precondition Required ==

C -> S: PUT /resource HTTP/1.1\nHost: example.com\nContent-Type: application/json\n{ "data": "Update" }
note right of S: Client gửi yêu cầu mà không có tiêu đề điều kiện tiên quyết (e.g., If-Match).

S -> S: Kiểm tra các tiêu đề điều kiện tiên quyết
note left of S: Server phát hiện yêu cầu thiếu tiêu đề bắt buộc (e.g., If-Match).

S --> C: HTTP/1.1 428 Precondition Required\nContent-Type: application/json\n{ "error": "Missing required precondition header (e.g., If-Match)" }
note left of C: Server trả về mã lỗi 428 để yêu cầu bổ sung điều kiện tiên quyết.

== Case: Success - Precondition Met ==

C -> S: PUT /resource HTTP/1.1\nHost: example.com\nContent-Type: application/json\nIf-Match: "12345"\n{ "data": "Update" }
note right of S: Client gửi yêu cầu với tiêu đề điều kiện tiên quyết hợp lệ (If-Match).

S -> S: Kiểm tra các tiêu đề điều kiện tiên quyết
note left of S: Server xác nhận tiêu đề điều kiện tiên quyết hợp lệ.

S --> C: HTTP/1.1 200 OK\nContent-Type: application/json\n{ "message": "Resource updated successfully" }
note left of C: Server xử lý yêu cầu và trả về phản hồi thành công.

@enduml
```

### 429 Too Many Requests {#429}
Đây là mộ trong những HTTP code phổ biến nhất, thông báo rằng client đã gửi quá nhiều yêu cầu trong một khoảng thời gian nhất định.

Thông thường server sẽ cấu hình một số giới hạn về số lượng request mà client có thể gửi trong một khoảng thời gian nhất định( `Rate limit` ), nếu client vượt quá giới hạn này, server sẽ trả về 429 Too Many Requests.

Rate limit thường được sử dụng để bảo vệ server khỏi các cuộc tấn công DDoS hoặc giúp server duy trì hiệu suất tốt hơn.

Hoặc đôi khi gói cước dịch vụ bạn đăng ký với hệ thống có giới hạn số lượng request mà bạn có thể gửi trong một khoảng thời gian nhất định.


```plantuml
@startuml

title HTTP 429 Too Many Requests - Rate Limiting Example

participant "Client" as C
participant "Server" as S

== Case: Normal Request Flow ==

C -> S: GET /resource HTTP/1.1\nHost: example.com
S -> S: Xử lý yêu cầu
S --> C: HTTP/1.1 200 OK\n{ "data": "Success" }

C -> S: GET /resource HTTP/1.1\nHost: example.com
S -> S: Xử lý yêu cầu
S --> C: HTTP/1.1 200 OK\n{ "data": "Success" }

... (Requests continue normally) ...

== Case: Rate Limit Reached ==

C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client đã gửi quá 100 yêu cầu/giây.

S -> S: Kiểm tra giới hạn (rate limit)
note left of S: Server phát hiện client đã vượt quá giới hạn yêu cầu.

S --> C: HTTP/1.1 429 Too Many Requests\nRetry-After: 60\n{ "error": "Rate limit exceeded" }
note left of C: Client bị chặn trong 1 phút.

== Case: Retry After Limit Reset ==

C -> C: Chờ 1 phút (60 giây)
note right of C: Tuân thủ hướng dẫn từ server.

C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client gửi lại yêu cầu sau thời gian chờ.

S -> S: Kiểm tra giới hạn (rate limit)
note left of S: Giới hạn được reset. Yêu cầu hợp lệ.

S --> C: HTTP/1.1 200 OK\n{ "data": "Success" }

@enduml
```


### 431 Request Header Fields Too Large {#431}
Giống với 413 hoặc 414, HTTP code này thông báo rằng server không thể xử lý yêu cầu của client vì kích thước của các trường header quá lớn.

Khi có một số trường header quá lớn, server sẽ trả về 431 Request Header Fields Too Large.

Tuy nhiên HTTP Code này ít được sử dụng trong thực tế. Đa số các hệ thống sử dụng lun 400 cho điều này.

#### Ví dụ:
```shell
curl --location 'https://thanhlv.com' \
--header 'test: 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'
```
```plantuml
@startuml

title HTTP 431 Request Header Fields Too Large - Error and Fix Flow

participant "Client" as C
participant "Server" as S

== Case: Error - Header Fields Too Large ==

C -> S: POST /resource HTTP/1.1\nHost: example.com\nHeaders: {...large headers...}\nBody: {...}
note right of S: Client gửi yêu cầu với tiêu đề quá lớn (e.g., nhiều cookie, tiêu đề dài).

S -> S: Kiểm tra kích thước tiêu đề
note left of S: Server phát hiện tổng kích thước tiêu đề vượt quá giới hạn.

S --> C: HTTP/1.1 431 Request Header Fields Too Large\n{ "error": "Header fields too large" }
note left of C: Server yêu cầu client giảm kích thước tiêu đề.

== Case: Fix and Retry ==

C -> C: Giảm kích thước tiêu đề (e.g., loại bỏ tiêu đề không cần thiết)
note right of C: Client tối ưu lại tiêu đề yêu cầu.

C -> S: POST /resource HTTP/1.1\nHost: example.com\nHeaders: {...reduced headers...}\nBody: {...}
note right of S: Client gửi lại yêu cầu với tiêu đề hợp lệ.

S -> S: Kiểm tra kích thước tiêu đề
note left of S: Tiêu đề yêu cầu hợp lệ.

S --> C: HTTP/1.1 200 OK\n{ "message": "Request successful" }
note left of C: Server xử lý yêu cầu thành công.

@enduml
```

## HTTP Status Code 5xx: Server Error {#5xx}
Status code 5xx là nhóm mã lỗi HTTP dành cho các lỗi phát sinh từ phía server khi xử lý yêu cầu của client.
Khi client nhận được mã lỗi 5xx, nó biết rằng lỗi không phải từ phía client mà từ phía server.

### 500 Internal Server Error {#500}
Đây là mã lỗi phổ biến nhất trong nhóm 5xx là lỗi ám ảnh của anh em theo BE, thông báo rằng server gặp lỗi không xác định khi xử lý yêu cầu của client.

Có nhiều lỗi khác nhau có thể dẫn đến mã lỗi 500, bao gồm lỗi lập trình, lỗi cấu hình, lỗi hệ thống, lỗi cơ sở dữ liệu, v.v.

Trên server các lập trình viên vẫn chưa handler được lỗi này, nó sẽ trả về mã lỗi 500 để thông báo cho client biết rằng server gặp lỗi không xác định và báo cáo lỗi đến quản trị viên hệ thống.

```plantuml
@startuml
title HTTP 500 Internal Server Error - Example Flow

participant "Client" as C
participant "Server" as S
participant "Database" as DB

== Case: Server Error ==

C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu hợp lệ.

S -> DB: Query Database for Resource
note right of DB: Server cố gắng truy xuất dữ liệu từ cơ sở dữ liệu.

DB -> S: Error: Database Connection Failed
note left of S: Kết nối cơ sở dữ liệu thất bại.

S -> S: Log Error Internally
note left of S: Server ghi log lỗi để xử lý sau.

S --> C: HTTP/1.1 500 Internal Server Error\n{ "error": "Internal Server Error" }
note left of C: Server thông báo lỗi nội bộ đến client.
@enduml
```

### 501 Not Implemented {#501}
Mã lỗi 501 Not Implemented thông báo rằng server không hỗ trợ method được yêu cầu trong yêu cầu của client.

Nó tương tự như mã lỗi 405 Method Not Allowed, nhưng 501 được sử dụng khi server không xác định được method yêu cầu có hỗ trợ hay không.

Còn 405 được sử dụng khi server biết method và hiểu method, nhưng không cho phép sử dụng method đó. Còn 501 được sử dụng khi server không biết, không hiểu method đó.

Một ví dụ phổ biến là hệ thống proxy.
```plantuml
@startuml
title HTTP 501 Not Implemented - Proxy Example Flow

participant "Client" as C
participant "Proxy Server" as P
participant "Origin Server" as O

== Case: Unsupported Method through Proxy ==

C -> P: PATCH /resource HTTP/1.1\nHost: example.com
note right of P: Client gửi yêu cầu với phương thức PATCH qua Proxy.

P -> O: PATCH /resource HTTP/1.1\nHost: example.com
note right of O: Proxy chuyển tiếp yêu cầu đến Origin Server.

O -> P: HTTP/1.1 501 Not Implemented\n{ "error": "The PATCH method is not supported by this server." }
note left of P: Origin Server trả về lỗi 501 vì không hỗ trợ phương thức PATCH.

P --> C: HTTP/1.1 501 Not Implemented\n{ "error": "The PATCH method is not supported by the origin server." }
note left of C: Proxy phản hồi lỗi từ Origin Server đến Client.
@enduml

```

### 502 Bad Gateway {#502}

Mã lỗi 502 Bad Gateway thông báo rằng server hoạt động như một cổng thông tin (gateway) hoặc proxy, nhưng không thể nhận phản hồi từ server upstream.

Khi client nhận được mã lỗi 502, nó biết rằng client đã kết nối đến proxy hoặc gateway nhưng khi proxy hoặc gateway cố gắng kết nối đến server upstream, nó không thể nhận được phản hồi từ server upstream. (Client ---Done---> Proxy ---Error---> Server Upstream)

```plantuml
@startuml
title HTTP 502 Bad Gateway - Success and Failure Flows

participant "Client" as C
participant "Proxy Server" as P
participant "Backend Server" as B

== Case: Successful Response ==

C -> P: GET /resource HTTP/1.1\nHost: example.com
note right of P: Client gửi yêu cầu qua Proxy Server.

P -> B: GET /resource HTTP/1.1\nHost: example.com
note right of B: Proxy Server chuyển tiếp yêu cầu đến Backend Server.

B -> P: HTTP/1.1 200 OK\n{ "data": "Resource content" }
note left of P: Backend Server phản hồi thành công với dữ liệu.

P --> C: HTTP/1.1 200 OK\n{ "data": "Resource content" }
note left of C: Proxy Server gửi lại phản hồi thành công đến Client.

== Case: 502 Bad Gateway Failure ==

C -> P: GET /resource HTTP/1.1\nHost: example.com
note right of P: Client gửi yêu cầu qua Proxy Server.

P -> B: GET /resource HTTP/1.1\nHost: example.com
note right of B: Proxy Server chuyển tiếp yêu cầu đến Backend Server.

B -> P: Error: Connection error
note left of P: Backend Server gặp lỗi khi xử lý hoặc không phản hồi.

P --> C: HTTP/1.1 502 Bad Gateway\n{ "error": "Bad Gateway" }
note left of C: Proxy Server phản hồi lỗi do không nhận được phản hồi hợp lệ từ Backend Server.
@enduml
```

### 503 Service Unavailable {#503}
Đây cũng là mã lỗi phổ biến trong nhóm 5xx, thông báo rằng server không thể xử lý yêu cầu của client tại thời điểm đó.

Vấn đề có thể là do server quá tải, bảo trì, hoặc không thể xử lý yêu cầu vì lý do khác.

Thông thường khi gặp mã lỗi 503, client có thể cấu hình thử lại sau một khoảng thời gian nhất định, ví dụ sau 1 phút.

```plantuml
@startuml
title HTTP 503 Service Unavailable - Success and Failure Flows

participant "Client" as C
participant "Server" as S

== Case: Successful Response ==

C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu đến Server.

S -> S: Process Request
note left of S: Server xử lý yêu cầu thành công.

S --> C: HTTP/1.1 200 OK\n{ "data": "Resource content" }
note left of C: Server trả về phản hồi thành công đến Client.

== Case: 503 Service Unavailable Failure ==

C -> S: GET /resource HTTP/1.1\nHost: example.com
note right of S: Client gửi yêu cầu đến Server.

S -> S: Check Server Status
note left of S: Server quá tải hoặc bị tạm dừng để bảo trì.

S --> C: HTTP/1.1 503 Service Unavailable\nRetry-After: 120\n{ "error": "Service temporarily unavailable" }
note left of C: Server thông báo dịch vụ tạm thời không khả dụng và gợi ý thời gian thử lại sau.
@enduml

```

### 504 Gateway Timeout {#504}

Mã lỗi 504 Gateway Timeout thông báo rằng server hoạt động như một cổng thông tin (gateway) hoặc proxy, nhưng không thể nhận phản hồi từ server upstream trong khoảng thời gian quy định.

Một ví dụ phổ biến là có cấu hình timeout chờ xử lý yêu cầu từ proxy đến server upstream, nếu server upstream không phản hồi trong khoảng thời gian timeout, proxy sẽ trả về mã lỗi 504.

```plantuml
@startuml
title HTTP 504 Gateway Timeout - Success and Failure Flows

participant "Client" as C
participant "Proxy Server" as P
participant "Upstream Server" as U

== Case: Successful Response ==

C -> P: GET /resource HTTP/1.1\nHost: example.com
note right of P: Client gửi yêu cầu đến Proxy Server.

P -> U: GET /resource HTTP/1.1\nHost: example.com
note right of U: Proxy chuyển tiếp yêu cầu đến Upstream Server.

U -> P: HTTP/1.1 200 OK\n{ "data": "Resource content" }
note left of P: Upstream Server phản hồi thành công.

P --> C: HTTP/1.1 200 OK\n{ "data": "Resource content" }
note left of C: Proxy Server trả lại phản hồi thành công đến Client.

== Case: 504 Gateway Timeout Failure ==

C -> P: GET /resource HTTP/1.1\nHost: example.com
note right of P: Client gửi yêu cầu đến Proxy Server.

P -> U: GET /resource HTTP/1.1\nHost: example.com
note right of U: Proxy chuyển tiếp yêu cầu đến Upstream Server.

... Time passes (timeout) ...

P -> U: No Response (Timeout)
note left of P: Upstream Server không phản hồi trong thời gian quy định.

P --> C: HTTP/1.1 504 Gateway Timeout\n{ "error": "Gateway Timeout" }
note left of C: Proxy Server trả lỗi 504 thông báo timeout từ Upstream Server.
@enduml
```

### 505 HTTP Version Not Supported {#505}

Mã lỗi 505 HTTP Version Not Supported thông báo rằng server không hỗ trợ phiên bản HTTP được yêu cầu trong yêu cầu của client.

Ví dụ bạn gửi yêu cầu với HTTP/1.0 nhưng server chỉ hỗ trợ HTTP/1.1, server sẽ trả về mã lỗi 505.

```plantuml
@startuml
title HTTP 505 HTTP Version Not Supported - Example Flow

participant "Client" as C
participant "Server" as S

== Case: Unsupported HTTP Version ==

C -> S: GET /resource HTTP/1.0\nHost: example.com
note right of S: Client gửi yêu cầu sử dụng phiên bản HTTP/1.0.

S -> S: Check HTTP Version Support
note left of S: Server kiểm tra phiên bản HTTP được hỗ trợ (chỉ hỗ trợ HTTP/1.1).

S --> C: HTTP/1.1 505 HTTP Version Not Supported\n{ "error": "The HTTP version 1.0 is not supported by this server." }
note left of C: Server trả về lỗi 505 vì không hỗ trợ HTTP/1.0.
@enduml
```

### Tổng kết

Các HTTP Status Codes không chỉ giúp chúng ta hiểu rõ hơn về giao tiếp giữa client và server, mà còn giúp cải thiện chức năng của ứng dụng web bằng cách phản hồi chính xác những gì đang xảy ra trong các yêu cầu HTTP. 

Các mã trạng thái cung cấp thông tin quý giá về kết quả của yêu cầu mà không cần xử lý chi tiết nội dung trả về, giúp các nhà phát triển xác định và xử lý các vấn đề một cách hiệu quả.

### Một số lưu ý

1. **Chọn mã trạng thái phù hợp**: Đảm bảo sử dụng đúng mã status để phản ánh chính xác tình trạng request và phản hồi. Việc này giúp người dùng và các nhà phát triển khác hiểu rõ hơn về kết quả của các yêu cầu HTTP.

2. **Tránh sử dụng các mã lỗi ít gặp**: Một số mã như 418 hoặc 306 không cần thiết trong các ứng dụng thực tế và chỉ nên dùng mã nào được cập nhật theo chuẩn mới nhất của HTTP.

3. **Kiểm tra và xử lý lỗi kịp thời**: Sử dụng các mã 5xx để thông báo lỗi từ phía server và cần thêm tính năng ghi log để xử lý lỗi hiệu quả hơn nhằm tránh ảnh hưởng đến trải nghiệm người dùng.

### Chào cảm ơn

Cảm ơn bạn đã theo dõi blog này. Hy vọng rằng thông qua các thông tin và ví dụ được cung cấp, bạn có thể ứng dụng hiệu quả hơn trong việc phát triển và duy trì các dịch vụ web của mình.

Hãy tiếp tục quay lại để cập nhật thêm những kiến thức mới và mọi ý kiến đóng góp của bạn đều là vô cùng quý giá đối với chúng tôi!
