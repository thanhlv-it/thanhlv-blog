---
footer: true
title: Các câu hỏi phỏng vấn
description: Các câu hỏi phỏng vấn
authors: [ lethanh ]
date: 2024-07-16
outline: deep
#image: /assets/1.tgNQEE1P.jpg
draft: true
---
# Các câu hỏi phỏng vấn

## Java
### Java core
##### Nêu 4 tính chất của OOP
###### **1. Kế thừa** : 
   - Class con có thể kế thừa tất cả các thuộc tính cũng như method của class cha, các class con có thể override các method của class cha để nâng cấp và phát triển thêm.
   - Kế thừa cho phép class mở rộng các đặc tính có sẵn mà không cần phải định nghĩa lại.
   - Chúng ta không thể khởi tạo một object cha và tham chiếu đến type của con. Bởi vì khi đó con sẽ không được khởi tạo. ===> `Con c = new Cha();`
::: details Ví dụ
   - Lớp cha động vật(`Animal`) sẽ có tên và hành động ăn và ngủ
   - Các loài động vật khác như `Dog` và `Cat` đều kế thừa từ cha và đều có `hành động ăn và ngủ` nhưng `DOg có thể sủa` và `Cat kêu meo meo`
```java
// Lớp cha Animal
class Animal {
    // Thuộc tính của lớp Animal
    protected String name;

    // Constructor của lớp Animal
    public Animal(String name) {
        this.name = name;
    }

    // Phương thức của lớp Animal
    public void eat() {
        System.out.println(name + " is eating.");
    }

    public void sleep() {
        System.out.println(name + " is sleeping.");
    }
}

// Lớp con Dog kế thừa từ lớp Animal
class Dog extends Animal {
    // Constructor của lớp Dog
    public Dog(String name) {
        super(name); // Gọi constructor của lớp cha
    }

    // Phương thức riêng của lớp Dog
    public void bark() {
        System.out.println(name + " is barking.");
    }
}

// Lớp con Cat kế thừa từ lớp Animal
class Cat extends Animal {
    // Constructor của lớp Cat
    public Cat(String name) {
        super(name); // Gọi constructor của lớp cha
    }

    // Phương thức riêng của lớp Cat
    public void meow() {
        System.out.println(name + " is meowing.");
    }
}

// Lớp Main để kiểm tra
public class Main {
    public static void main(String[] args) {
        // Tạo đối tượng Dog
        Dog dog = new Dog("Buddy");
        dog.eat();   // Gọi phương thức từ lớp cha
        dog.sleep(); // Gọi phương thức từ lớp cha
        dog.bark();  // Gọi phương thức riêng của lớp Dog

        // Tạo đối tượng Cat
        Cat cat = new Cat("Whiskers");
        cat.eat();   // Gọi phương thức từ lớp cha
        cat.sleep(); // Gọi phương thức từ lớp cha
        cat.meow();  // Gọi phương thức riêng của lớp Cat
    }
}
```
:::
######  **2. Đóng gói**: 
   - Là việc gói các dữ liệu(thuộc tính) và tạo ra các method hoạt động trên dữ liệu đó.
   - Mục đích của đóng gói che giấu chi tiết về một object và chỉ cho phép tương tác với object thông qua các method.
   - Đóng gói sẽ giúp bảo vệ dữ liệu của đối tượng không bị truy cập hoặc thay đổi bất hợp pháp từ bên ngoài.
   - Tùy ngôn ngữ mà đóng gói sẽ thể hiện khác nhau, tuy nhiên đa phần là `thuộc tính được đặt quyền truy cập private `và có `getter` và `setter`
    ::: details Ví dụ
    Đảm bảo về thay đổi dữ liệu của age phải lớn hơn 0.
    ```java
    // Lớp Person với các thuộc tính private
    public class Person {
        // Các thuộc tính private
        private String name;
        private int age;
    
        // Getter cho thuộc tính name
        public String getName() {
            return name;
        }
    
        // Setter cho thuộc tính name
        public void setName(String name) {
            this.name = name;
        }
    
        // Getter cho thuộc tính age
        public int getAge() {
            return age;
        }
    
        // Setter cho thuộc tính age
        public void setAge(int age) {
            if (age > 0) { // Kiểm tra tuổi phải lớn hơn 0
                this.age = age;
            } else {
                System.out.println("Age must be positive.");
            }
        }
    
        // Phương thức hiển thị thông tin của Person
        public void displayInfo() {
            System.out.println("Name: " + name);
            System.out.println("Age: " + age);
        }
    }
    
    // Lớp Main để kiểm tra
    public class Main {
        public static void main(String[] args) {
            // Tạo đối tượng Person
            Person person = new Person("John Doe", 30);
            // Hiển thị thông tin của Person
            person.displayInfo();
            // Thay đổi giá trị của thuộc tính name và age thông qua setter
            person.setName("Jane Doe");
            person.setAge(25);
            // Hiển thị lại thông tin của Person sau khi thay đổi
            person.displayInfo();
        }
    }
    ```
    :::
###### **3. Đa hình**: 
Đa hình là các method có cùng tên nhưng tùy vào hoàn cảnh sẽ có cách thức hoạt động khác nhau.
Đa hình có 2 kiểu là `override` và `overloading`  
   - **Override**: Khi một class con kế thừa một class cha, nó khả năng ghi đè hành động của cha để hành động ở con sẽ khác với cha.
      ::: details Ví dụ
            - Nhìn ở ví dụ dưới, có một method ở cha là `makeSound`. Class `Dog` và `Cat` đều kế thừa từ `Animal` với override `makeSound` để với Dog và Cat sẽ kêu khác nhau
      ```java
      // Lớp cha Animal
      class Animal {
          // Thuộc tính của lớp Animal
          protected String name;
      
          // Constructor của lớp Animal
          public Animal(String name) {
              this.name = name;
          }
      
          // Phương thức của lớp Animal
          public void makeSound() {
              System.out.println(name + " is making a sound.");
          }
      }
      
      // Lớp con Dog kế thừa từ lớp Animal
      class Dog extends Animal {
          // Constructor của lớp Dog
          public Dog(String name) {
              super(name); // Gọi constructor của lớp cha
          }
      
          // Ghi đè phương thức makeSound của lớp cha
          @Override
          public void makeSound() {
              System.out.println(name + " is barking.");
          }
      }
      
      // Lớp con Cat kế thừa từ lớp Animal
      class Cat extends Animal {
          // Constructor của lớp Cat
          public Cat(String name) {
              super(name); // Gọi constructor của lớp cha
          }
      
          // Ghi đè phương thức makeSound của lớp cha
          @Override
          public void makeSound() {
              System.out.println(name + " is meowing.");
          }
      }
      
      // Lớp Main để kiểm tra
      public class Main {
          public static void main(String[] args) {
              // Tạo đối tượng Dog
              Dog dog = new Dog("Buddy");
              dog.makeSound(); // Gọi phương thức makeSound đã được ghi đè
      
              // Tạo đối tượng Cat
              Cat cat = new Cat("Whiskers");
              cat.makeSound(); // Gọi phương thức makeSound đã được ghi đè
          }
      }
      ```
      :::
   - **Overload method**: Hay dịch tiếng việt là **Nạp chồng phương thức** là một kỹ thuật cho phép một method có nhiều phiên bản(Version) có cùng tên trong một class nhưng khác nhau về param.
     - Các param kể đến là khác nhau về số lượng, kiểu dữ liệu.
     - Mục đích của Overload là để tăng tính linh hoạt và khả năng mở rộng của code, giúp các method có thể sử lý các tính huống khác nhau.
       ::: details Ví dụ 1
         - Ví dụ đầu tiên đơn giản trong Java đó là StringBuilder 
         - Cùng một method tên là `append` nhưng chấp nhận nhiều kiểu dữ liệu.
        ![java-javacore-oop-overload.png](images/2024-07-16-cac-cau-hoi-phong-van/java-javacore-oop-overload.png)
       :::
       ::: details Ví dụ 2
       - Ví dụ thứ 2 là về tính tổng các số.
        ```java
        public class MathUtils {
        
            // Phương thức tính tổng hai số nguyên
            public int add(int a, int b) {
                return a + b;
            }
        
            // Phương thức tính tổng ba số nguyên
            public int add(int a, int b, int c) {
                return a + b + c;
            }
        
            // Phương thức tính tổng hai số thực
            public double add(double a, double b) {
                return a + b;
            }
        
            // Phương thức tính tổng ba số thực
            public double add(double a, double b, double c) {
                return a + b + c;
            }
        
            public static void main(String[] args) {
                MathUtils mathUtils = new MathUtils();
                
                // Sử dụng các phương thức nạp chồng
                System.out.println("Sum of 2 and 3: " + mathUtils.add(2, 3)); // Gọi phương thức add(int, int)
                System.out.println("Sum of 2, 3 and 4: " + mathUtils.add(2, 3, 4)); // Gọi phương thức add(int, int, int)
                System.out.println("Sum of 2.5 and 3.5: " + mathUtils.add(2.5, 3.5)); // Gọi phương thức add(double, double)
                System.out.println("Sum of 2.5, 3.5 and 4.5: " + mathUtils.add(2.5, 3.5, 4.5)); // Gọi phương thức add(double, double, double)
            }
        }
        
        ```
       :::
######  **4. Trừu tượng**: 
   - Tính trừu tượng liên quan đến việc ẩn dấu chi tiết của object mà chỉ cung cấp các thuộc tính và method cần thiết để sử dụng object đó.
   - Trừu tượng sẽ giúp người dùng tập trung cho việc object đó sẽ hỗ trợ làm những gì thay vì cách thức object đó làm.
   - Đối với java, tính trừu tượng được thể hiển bằng cách sử dụng `abstract class` hoặc `interface`
     ::: details Ví dụ 1 về `Abstract class`
        ```java
        // Lớp trừu tượng Animal được khai báo với keyword abstract
        abstract class Animal {
            // Phương thức trừu tượng được khai báo với keyword abstract
            abstract void makeSound();
            
            // Phương thức không trừu tượng
            public void sleep() {
                System.out.println("Zzz...");
            }
        }
        // Lớp Dog kế thừa từ lớp trừu tượng Animal
        class Dog extends Animal {
            // Triển khai phương thức trừu tượng
            void makeSound() {
                System.out.println("Woof woof");
            }
        }
        // Lớp Cat kế thừa từ lớp trừu tượng Animal
        class Cat extends Animal {
            // Triển khai phương thức trừu tượng
            void makeSound() {
                System.out.println("Meow meow");
            }
        }
        public class Main {
            public static void main(String[] args) {
                Animal dog = new Dog();
                Animal cat = new Cat();
                
                dog.makeSound(); // In ra "Woof woof"
                cat.makeSound(); // In ra "Meow meow"
                
                dog.sleep(); // In ra "Zzz..."
                cat.sleep(); // In ra "Zzz..."
            }
        }
        ```
     :::
     ::: details Ví dụ 2 về `interface`
       ```
        // Giao diện Animal
        interface Animal {
            void makeSound();
            void sleep();
        }
        
        // Lớp Dog triển khai giao diện Animal
        class Dog implements Animal {
            public void makeSound() {
                System.out.println("Woof woof");
            }
            
            public void sleep() {
                System.out.println("Zzz...");
            }
        }
        
        // Lớp Cat triển khai giao diện Animal
        class Cat implements Animal {
            public void makeSound() {
                System.out.println("Meow meow");
            }
            
            public void sleep() {
                System.out.println("Zzz...");
            }
        }
        
        public class Main {
            public static void main(String[] args) {
                Animal dog = new Dog();
                Animal cat = new Cat();
                
                dog.makeSound(); // In ra "Woof woof"
                cat.makeSound(); // In ra "Meow meow"
                
                dog.sleep(); // In ra "Zzz..."
                cat.sleep(); // In ra "Zzz..."
            }
        }
        
        ```
     ::: 
   - Khi nào sử dụng `abstract class` hoặc `interface`
   - **Abstract class**: Nếu bạn muốn định nghĩa một class cha cho tất cả các class có cùng bản chất, một số thuộc tính và method giống nhau thì bạn có thể sử dụng `Abstract class`.
     ::: details Ví dụ về `abstract class`
       ```
       // Lớp trừu tượng Animal
       abstract class Animal {
           // Các thuộc tính chung của tất cả loài động vật
           protected String name;
           protected int age;
           
           // Constructor
           public Animal(String name, int age) {
               this.name = name;
               this.age = age;
           }
           
           // Phương thức trừu tượng mà mỗi con vật sẽ khác nhau
           abstract void makeSound();
           
           // Phương thức không trừu tượng các côn vật có hành động giống nhau
           public void sleep() {
               System.out.println(name + " is sleeping. Zzz...");
           }
           
           // Phương thức để in thông tin về động vật
           public void printInfo() {
               System.out.println("Name: " + name);
               System.out.println("Age: " + age);
           }
       }
       
       // Lớp Dog kế thừa từ lớp trừu tượng Animal
       class Dog extends Animal {
           // Constructor
           public Dog(String name, int age) {
               super(name, age);
           }
           
           // Triển khai phương thức trừu tượng về cách kêu của Dog là gau gau
           @Override
           void makeSound() {
               System.out.println(name + " says: Woof woof");
           }
           
           // Phương thức riêng của Dog cho việc đi lấy bóng
           public void fetch() {
               System.out.println(name + " is fetching the ball.");
           }
           // Phương thức riêng của Dog cho việc vẫy đuôi
           public void wagTail() {
               System.out.println(name + " is wagging its tail.");
           }
       }
       
       // Lớp Cat kế thừa từ lớp trừu tượng Animal
       class Cat extends Animal {
           // Constructor
           public Cat(String name, int age) {
               super(name, age);
           }
           
           // Triển khai phương thức trừu tượng về cách kêu của Cat là meo meo
           @Override
           void makeSound() {
               System.out.println(name + " says: Meow meow");
           }
           
           // Phương thức riêng của Cat cho việc cào đồ vật
           public void scratch() {
               System.out.println(name + " is scratching the furniture.");
           }
       }
       
       public class Main {
           public static void main(String[] args) {
               Animal dog = new Dog("Buddy", 3);
               Animal cat = new Cat("Whiskers", 2);
               
               // Thông tin và hành vi của chó
               dog.printInfo();
               dog.makeSound();
               dog.sleep();
               
               // Gọi phương thức riêng của Dog
               ((Dog) dog).fetch();
               ((Dog) dog).wagTail();
               
               System.out.println();
               
               // Thông tin và hành vi của mèo
               cat.printInfo();
               cat.makeSound();
               cat.sleep();
               
               // Gọi phương thức riêng của Cat
               ((Cat) cat).scratch();
           }
       }
       ```
     :::
     - Khi thiết kế `Abstract class` chúng ta sẽ nghĩ về kiểu của đối tượng. Ví dụ thiết kế `Abstract class` cho đối tượng `Animal` thì đối với một `Animal` sẽ có các` thuộc tính` và `method chung nào`
   - **Interface**: Với interface chúng ta có thể sử dụng để định nghĩa các chức năng mà class sẽ hỗ trợ.
     ::: details Ví dụ 1 về `Interface`
        ```java
        interface Drawable {
            void draw();
        }
        
        class Circle implements Drawable {
            public void draw() {
                System.out.println("Drawing a circle");
            }
        }
        
        class Rectangle implements Drawable {
            public void draw() {
                System.out.println("Drawing a rectangle");
            }
        }
        
        ```
     :::
     - Khi thiết kế `Interface` chúng ta sẽ nghĩ về chức năng hoặc hành động sẽ hỗ trợ chữ không xác định rõ kiểu đối tượng.
  - Ví dụ về kết hợp cả `abstract class` và `interface`
    ::: details Ví dụ về kết hợp cả `abstract class` và `interface`
       ```
       // Interface chung AnimalBehavior cho tất cả động vật
       interface AnimalBehavior {
           void makeSound();
           void move();
       }
       
       // Interface riêng cho Dog
       interface DogBehavior {
           void fetch();
           void wagTail();
       }
       
       // Interface riêng cho Cat
       interface CatBehavior {
           void scratch();
           void purr();
       }
       
       // Abstract class Animal
       abstract class Animal implements AnimalBehavior {
           protected String name; // thuộc tính chung
           protected int age; // thuộc tính chung
           
           public Animal(String name, int age) {
               this.name = name;
               this.age = age;
           }
           
           public void sleep() {
               System.out.println(name + " is sleeping. Zzz...");
           }
           
           public void printInfo() {
               System.out.println("Name: " + name);
               System.out.println("Age: " + age);
           }
       }
       
       // Lớp Dog kế thừa từ abstract class Animal và triển khai DogBehavior
       class Dog extends Animal implements DogBehavior {
           public Dog(String name, int age) {
               super(name, age);
           }
           
           @Override
           public void makeSound() {
               System.out.println(name + " says: Woof woof");
           }
           
           @Override
           public void move() {
               System.out.println(name + " is running.");
           }
           
           @Override
           public void fetch() {
               System.out.println(name + " is fetching the ball.");
           }
           
           @Override
           public void wagTail() {
               System.out.println(name + " is wagging its tail.");
           }
       }
       
       // Lớp Cat kế thừa từ abstract class Animal và triển khai CatBehavior
       class Cat extends Animal implements CatBehavior {
           public Cat(String name, int age) {
               super(name, age);
           }
           
           @Override
           public void makeSound() {
               System.out.println(name + " says: Meow meow");
           }
           
           @Override
           public void move() {
               System.out.println(name + " is stalking.");
           }
           
           @Override
           public void scratch() {
               System.out.println(name + " is scratching the furniture.");
           }
           
           @Override
           public void purr() {
               System.out.println(name + " is purring.");
           }
       }
       ```
    :::
