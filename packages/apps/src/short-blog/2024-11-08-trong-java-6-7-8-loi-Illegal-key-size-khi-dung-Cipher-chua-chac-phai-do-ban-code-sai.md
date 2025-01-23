---
footer: true
title: Trong java 6 7 8 lỗi Illegal key size khi dùng Cipher chưa chắc phải do bạn code sai mà là do Java Policy JCE.
description: Khi bạn sử dụng Cipher để mã hóa dữ liệu trong Java, bạn có thể gặp phải lỗi `Illegal key size`. Lỗi này thường xảy ra khi bạn sử dụng một key size lớn hơn 128 bits. Trong bài viết này, chúng ta sẽ tìm hiểu về lỗi này và cách khắc phục nó.
authors: [ lethanh ]
date: 2024-11-08
outline: deep
image: /assets/image.YWT8j-6y.jpg
draft: false
---

# Trong java 8 lỗi Illegal key size khi dùng Cipher chưa chắc phải do bạn code sai mà là do Java Policy JCE.

Khi bạn sử dụng Cipher để mã hóa dữ liệu trong Java, bạn có thể gặp phải lỗi `Illegal key size`. 

Lỗi này thường xảy ra khi bạn sử dụng một key size lớn hơn 128 bits. Trong bài viết này, chúng ta sẽ tìm hiểu về lỗi này và cách khắc phục nó.

## Lỗi `Illegal key size`

```java
java.security.InvalidKeyException: Illegal key size.
Caused by: java.security.InvalidKeyException: Illegal key size
        at javax.crypto.Cipher.checkCryptoPerm(Cipher.java:1039)
        at javax.crypto.Cipher.implInit(Cipher.java:805)
        at javax.crypto.Cipher.chooseProvider(Cipher.java:864)
        at javax.crypto.Cipher.init(Cipher.java:1396)
        at javax.crypto.Cipher.init(Cipher.java:1327)
        ... 36 common frames omitted 
```

Khi bạn sử dụng Cipher để mã hóa dữ liệu trong Java, bạn cần sử dụng một key size phù hợp với thuật toán mã hóa.

Ví dụ, nếu bạn sử dụng thuật toán AES, bạn cần sử dụng key size 128, 192 hoặc 256 bits.

Tuy nhiên, nếu phiên bản java là java 8 và thấp hơn [8u161](https://www.oracle.com/java/technologies/javase/8u161-relnotes.html), mặc định Java chỉ hỗ trợ key size 128 bits cho AES. Nếu bạn sử dụng key size lớn hơn 128 bits, bạn sẽ gặp phải lỗi `Illegal key size`.

https://bugs.java.com/bugdatabase/view_bug.do?bug_id=8170157

## Bảng dưới đấy cho thấy các phiên bản mặc định hỗ trợ key size lớn hơn 128 bits và link download chính sách JCE cho phiên bản thấp hơn.

| Phiên bản Java      | Phiên bản bắt đầu hỗ trợ                                  |
|---------------------|-----------------------------------------------------------|
| Java 6              | 6u181                                                     |
| Java 7              | 7u171                                                     |
| Java 8              | 8u161                                                     |
| Java 9 hoặc mới hơn | 9 hoặc mới hơn bắt đầu hỗ trợ ngay bản đầu tiên phát hành |

Một điều hạnh phúc là từ bản Java 9 mặc định đã hỗ trợ key size lớn hơn 128 bits cho AES vì vậy không cần lo lắng về điều này.

## Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy Files là gì ?
Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy Files là các tệp chính sách của Java cho phép ứng dụng sử dụng mã hóa mạnh với độ dài khóa không giới hạn, chẳng hạn như AES-256.

Trước Java 8u161, các phiên bản Java mặc định chỉ hỗ trợ mã hóa lên đến 128-bit vì [chính sách hạn chế xuất khẩu mật mã từ Hoa Kỳ](https://en.wikipedia.org/wiki/Export_of_cryptography_from_the_United_States#Current_status). Để sử dụng các thuật toán với độ dài khóa lớn hơn như 192-bit hoặc 256-bit (cần cho AES-192 và AES-256), người dùng phải tải và cài đặt các tệp chính sách JCE không giới hạn từ trang web của Oracle.

![](images/2024-11-08-trong-java-6-7-8-loi-Illegal-key-size-khi-dung-Cipher-chua-chac-phai-do-ban-code-sai/image.jpg)


## Chính sách hạn chế xuất khẩu mật mã từ Hoa Kỳ là gì ?
Chính sách hạn chế xuất khẩu mật mã từ Hoa Kỳ là một bộ quy định do chính phủ Hoa Kỳ  đưa ra để kiểm soát việc xuất khẩu các công nghệ mã hóa mạnh ra ngoài lãnh thổ Hoa Kỳ. Mục tiêu của chính sách này là hạn chế sự phát triển và sử dụng các công nghệ mã hóa mạnh tại các quốc gia hoặc tổ chức mà Hoa Kỳ cho là có nguy cơ gây tổn hại đến an ninh quốc gia hoặc lợi ích chiến lược của mình.

Các quy định này được quản lý bởi Bureau of Industry and Security (BIS) thuộc Bộ Thương mại Hoa Kỳ, và chúng bao gồm các quy tắc về việc xuất khẩu phần mềm, phần cứng và công nghệ mã hóa, trong đó có yêu cầu về độ dài khóa mã hóa.

Các điểm chính trong chính sách:
- **Giới hạn độ dài khóa mã hóa**: Ban đầu, Hoa Kỳ chỉ cho phép xuất khẩu các sản phẩm mã hóa có độ dài khóa tối đa là 56-bit (thường là đối với DES). Các sản phẩm với độ dài khóa mạnh hơn (như AES-128, AES-192, AES-256) bị hạn chế xuất khẩu.
- **Mã hóa mạnh (Strong Encryption)**: Các thuật toán mã hóa với khóa dài hơn (như AES-256) hoặc những sản phẩm sử dụng mã hóa mạnh bị coi là có tiềm năng được sử dụng cho mục đích quân sự hoặc có thể bị lạm dụng trong các hoạt động gián điệp. Điều này khiến các công ty phải tuân thủ các quy định chặt chẽ để xuất khẩu phần mềm hoặc phần cứng mã hóa ra nước ngoài.
- **Giấy phép xuất khẩu**: Các công ty muốn xuất khẩu công nghệ mã hóa mạnh phải xin giấy phép từ chính phủ Hoa Kỳ. Quá trình này thường rất phức tạp và yêu cầu kiểm tra chi tiết về công nghệ và các quốc gia mục tiêu.

## Tôi vẫn muốn sử dụng java 6 7 8 ở phiên bản chưa hỗ trợ, làm thế nào để khắc phục lỗi `Illegal key size` ?
Nếu bạn đang sử dụng các phiên bản 6 7 8 và đang trong các phiên bản chưa hỗ trợ thì có thể vào link dưới đây để tải `Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy`


| Phiên bản Java      | Link tải JCE |
|---------------------|--------------|
| Java 6              | https://www.oracle.com/java/technologies/jce-6-download.html        |
| Java 7              | https://www.oracle.com/java/technologies/javase-jce7-downloads.html        |
| Java 8              | https://www.oracle.com/java/technologies/javase-jce8-downloads.html        |

## Tóm tắt
- Lỗi Illegal key size xảy ra khi sử dụng key size lớn hơn 128 bits trong Java 8 và các phiên bản thấp hơn.
- Để sử dụng key size lớn hơn 128 bits trong các phiên bản Java cũ hơn, cần cài đặt Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy Files.
- JCE Unlimited Strength Jurisdiction Policy Files cho phép sử dụng mã hóa mạnh với độ dài khóa không giới hạn.
- Các phiên bản Java hỗ trợ key size lớn hơn 128 bits: Java 6u181, Java 7u171, Java 8u161, Java 9 và các phiên bản mới hơn.

