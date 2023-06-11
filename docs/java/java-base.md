## 1. Java面向对象有哪些特征

继承、封装、多态

*   封装：将类的某些信息隐藏在类内部，不允许外部程序直接访问，而是通过该类提供的方法来实现对隐藏信息的操作和访问。

    *   增加代码复用性封装好的东西重复使用；保护类中的信息；隐藏类的实例细节，方便修改和实现

*   继承：继承是类与类的一种关系，是一种“is a”的关系。比如“狗”继承“动物”，这里动物类是狗类的父类或者基类，狗类是动物类的子类或者派生类。

    *   子类拥有父类的所有属性和方法（除了private修饰的属性不能拥有）从而实现了实现代码的复用；
    *   final；super

*   多态：面向对象的多态性，即“一个接口，多个方法”。多态性体现在父类中定义的属性和方法被子类继承后，可以具有不同的属性或表现方式。多态性允许一个接口被多个同类使用，弥补了单继承的不足。多态概念可以用树形关系来表示。

    ​	<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8337f59cb995478fabc3fa2303086e7c~tplv-k3u1fbpfcp-zoom-1.image" style="zoom:67%;">

    *   可移植性、健壮性、灵活性

### 为什么是单继承

举个例子

```java
class A{    
    public void print(){
        System.out.println("AAAAAA");
    }
}

class B{
    public void print(){
        System.out.println("BBBBBB");
    }
}
class C extends A ,B{
}

new C().print();
```

这个栗子是不是一目了然呢？  在创建了C对象后，如果调用print函数，我们并不知道具体是调用哪个函数，所以这是不允许的。

因为类是结构性的，这样就会造成结构上的混乱。这就是多继承的菱形继承问题。

### private 属性提供了set get方法去更改属性值，但是为什么不把值直接设置为public进行更改呢？

但从这样都能更改属性值看不出来有什么区别，但是

*   如果一个属性是 public，那么外部可以**直接**对这个属性进行读取与修改；
*   如果一个属性是 private，那么外部**不可以直接**对这个属性进行读取与修改，而是通过这个类提供的 get、set 方法去访问。

也就是说，前者把控制权交给别人，而后者的控制权还在自己手中。

*   比如说一个只读属性，可以提供 get 方法给外界调用读取，但是不允许修改，那么这时候可以不提供 set 方法，或者在 set 方法中抛出异常；
*   比如我的数据格式与别人使用的格式不同，那么我可以在 get 与 set 方法中，加上进行格式转换的代码；
*   比如我的数据可以被读取与修改，但是修改时候必须经过我的验证，那么我的 set 方法中会添加数据验证的代码。

也就是说，get、set 方法的主要作用是**控制**外界对私有属性的访问。这一点，将属性声明为 public 是做不到的。

### 多态的优缺点

优点：提高了扩展性，子类可以在父类的基础上进行扩展。

缺点：父类不能访问子类的中的成员变量和成员方法。

### 多态成员访问的特点

**成员方法**：编译看左边，执行看右边

**成员变量**：编译看左边，执行看左边

例：

```java
public class Animal {
    public String name="动物";
    public void eat(){
        System.out.println("动物吃东西");
    }
    public void sleep(){
        System.out.println("动物要💤");
    }
}
```

```java
public class Cat extends Animal {
    public String name="猫";
    @Override
    public void eat() {//重写父类的方法
        System.out.println("🐱吃🐟");
    }
    public void play(){
        System.out.println("🐱玩毛球");
    }
}
```

```java
public class AnimalController {
    public static void main(String[] args) {
           //多态创建对象
        Animal a=new Cat();//父类引用指子类对象
        a.eat();
        a.sleep();
        System.out.println("名字："+a.name);
    }
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3822a824eb114a3eb55ed3d6cb5294d1~tplv-k3u1fbpfcp-watermark.image?)

> 看结果，可以知道，方法的编译看做左边，执行看右边，成员的编译看做左边，
>
> 执行看左边也就是，在方法中，以子类方法为主，在变量上，以父类的变量为主。
>
> 当父类有该方法，而子类没有该方法时，此时，结果时父类的方法。

> 区别原因

其实主要的原因时方法有重写，而成员变量则没重写(变量不能重写)

### 向上转型和向下转型

例：猫里面多加了swim方法

```java
public class Cat extends Animal {
    public String name="猫";
    @Override
    public void eat() {//重写父类的方法
        System.out.println("🐱吃🐟");
    }
    public void play(){
        System.out.println("🐱玩毛球");
    }
    public void swim(){
        System.out.println("🐱游泳");
    }
}
```

```java
public class AnimalController {
    public static void main(String[] args) {
           //多态创建对象
        Animal a = new Cat();//父类引用指子类对象
        a.eat();
        a.sleep();
        
        Cat c = (Cat) a; //将a强制类型转换(从Animal到cat)
        c.swim(); //调用子类新增方法
    }
}
```

**多态一定是采用向上转型的方法来定义对象pet的，父类只能使用子类与父类共有的方法（也就是只能使用子类覆盖的方法），而如果想用子类的所有属性的话，就强制转换成子类（通过向下转型）就好了。**

**这个实例中定义对象pet使用的是向上转型的方式是**   ` Animal a = new Cat();`  ，**那么大家肯定有一个疑问：为什么不用最方便的**  `Cat c = (Cat) a;` **的方式来定义呢？原因就是使用后者的话代码非常的僵硬，可扩展性就没有了，所以可以看出多态的一个优点：可扩展性强。**

### 两个接口中有同名方法，类实现这两个接口会发生什么

例：

```java
public interface A1 {
    void f();
}
//////////////////////////////////////
public interface A2 {
    void f();
}
//////////////////////////////////////
public class a implements A1, A2 {
  
    @Override
    public void f() {
        System.out.println("fff");
    }
}
　　
```

假设有两个接口包含相同的方法名和签名，是可以正常编译的，因为a中的f()既是A1中的f()也是A2中的f()。因为既然a这个类没有发生编译错误，那就说明它既实现A1也实现了A2，也就是说A1中的f()与A2中的f()在实现类a中是相安无事的。

> 变更接口中的方法返回类型

```java
public interface A1 {
    int f();
}
//////////////////////////////////////
public interface A2 {
    void f();
}
//////////////////////////////////////
public class a implements A1, A2 {
  
    @Override
    public void f() {
        System.out.println("fff");
    }
}
```

*   就会报编译错误

## 2. ArrayList和LinkedList的区别

*   ArrayList是基于索引的数据接口，底层是数组，访问的话时间复杂度O(1)，增删插入操作慢
*   LinkedList是以元素列表的形式存储数据，每个元素和前一个以及后一个元素链接在一起，查找的时间复杂度是O(n),增删插入操作快

## 3. String和StringBuilder、StringBuffer的区别

Java平台提供了两种类型的字符串：String和StringBuffer/Stringbuilder，它们可以存储和操作字符串，其中String是只读字符串，也就意味着String引用的字符串内容是不能被改变的。而StringBuffer/StringBuilder类表示的字符串对象可以直接进行修改。StringBuilder是Java5中引入的，它和StringBuffer的方法完全相同，区别在于它是单线程环境下使用，因为它的所有方面都没有被synchronized修饰，因此它的效率也比StringBuffer要高。

## 4. 阐述final、finally、finalize的区别：

*   final

    修饰符（关键字）有三种用法：如果一个类被声明为final,意味着它不能再派生出新的子类，即不能被继承，因此它和abstract是反义词。将变量声明为final,可以保证它们在使用中不被改变，被声明为final的变量必须在声明时给定初值，而在以后的引用中只能读取不可修改。被声明为final的方法也同样只能使用，不能在子类中被重写。

*   finally

    通常放在try.catch.的后面构造总是执行代码块，这就意味着程序无论正常执行还是发生异常，这里的代码只要JVM不关闭都能执行，可以将释放外部资源的代码写在finally块中。

*   finalize

    Object类中定义的方法，Java中允许使用finalize()方法在垃圾收集器将对象从内存中清除出去之前做必要的清理工作。这个方法是由垃圾收集器在销毁对象时调用的，通过重写finalize()方法  可以整理系统资源或者执行其他清理工作。

## 5. Java中的异常处理机制的简单原理和应用

异常是指java程序运行时（非编译）所发生的非正常情况或错误。

Java使用面向对象的方式来处理异常，它把程序中发生的每个异常也都分别封装到一个对象中，该对象中包含有异常的信息。

Java可以自定义异常类，所有异常的根类为`java.lang.Throwable`,`Throwable`下面又派生了两个子类：

*   `Error`和`Exception`

    *   Error表示应用程序本身无法克服和恢复的一种严重问题，程序只有退出的份了，例如说内存溢出和线程死锁等系统问题。

    *   Exception表示程序还能够克服和恢复的问题，其中又分为运行时异常和检查异常，运行时异常是软件本身缺陷所导致的问题，也就是软件开发人员考虑不周所导致的问题，软件使用者无法克服和恢复这种问题，但在这种问题下还可以让软件系统继续运行或者让软件死掉。

        例如，数组越界(ArrayIndexOutOfBoun dsException)、空指针异常(NullPointerException)、类转换异常(ClassCast-  Exception)；检查异常是运行环境的变化或异常所导致的问题，是用户能够克服的问题，例如，网络断线，硬盘空间不够，发生这样的异常后，程序不应该死掉。

Java为运行时异常和检查异常提供了不同的解决方案，编译器强制检查异常必须`try...catch`处理或用`throws`声明继续抛给上层调用方法处理，所以检查异常也称为`checked`异常，而运行异常可以处理也可以不处理，所以编译器不强制用`try...catch`处理或用`throws`声明，所以运行异常也称为`Runtime`异常。

## 6.接口和抽象类有什么共同点和区别？

**共同点** ：

*   都不能被实例化。
*   都可以包含抽象方法。
*   都可以有默认实现的方法（Java 8 可以用 `default` 关键在接口中定义默认方法）。

**区别** ：

*   实现：抽象类的子类使用 extends 来继承；接口必须使用 implements 来实现接口。
*   构造函数：抽象类可以有构造函数；接口不能有。
*   实现数量：类可以实现很多个接口；但是只能继承一个抽象类。
*   访问修饰符：接口中的方法默认使用 public 修饰；抽象类中的方法可以是任意访问修饰符。
*   成员变量：接口中的成员变量只能是 `public static final` 类型的，不能被修改且必须有初始值，而抽象类的成员变量默认 default，可在子类中被重新定义，也可被重新赋值。

## 7. 深拷贝和浅拷贝区别了解吗？什么是引用拷贝？

*   **浅拷贝**：浅拷贝会在堆上创建一个新的对象（区别于引用拷贝的一点），不过，如果原对象内部的属性是引用类型的话，浅拷贝会直接复制内部对象的引用地址，也就是说拷贝对象和原对象共用同一个内部对象。
*   **深拷贝** ：深拷贝会完全复制整个对象，包括这个对象所包含的内部对象。

上面的结论没有完全理解的话也没关系，我们来看一个具体的案例！

**浅拷贝**

浅拷贝的示例代码如下，我们这里实现了 `Cloneable` 接口，并重写了 `clone()` 方法。

`clone()` 方法的实现很简单，直接调用的是父类 `Object` 的 `clone()` 方法。

```java
public class Address implements Cloneable{
    private String name;
    // 省略构造函数、Getter&Setter方法
    @Override
    public Address clone() {
        try {
            return (Address) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}

public class Person implements Cloneable {
    private Address address;
    // 省略构造函数、Getter&Setter方法
    @Override
    public Person clone() {
        try {
            Person person = (Person) super.clone();
            return person;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}
```

测试 ：

```java
Person person1 = new Person(new Address("武汉"));
Person person1Copy = person1.clone();
// true
System.out.println(person1.getAddress() == person1Copy.getAddress());
```

**深拷贝**

这里我们简单对 `Person` 类的 `clone()` 方法进行修改，连带着要把 `Person` 对象内部的 `Address` 对象一起复制。

```java
@Override
public Person clone() {
    try {
        Person person = (Person) super.clone();
        person.setAddress(person.getAddress().clone());
        return person;
    } catch (CloneNotSupportedException e) {
        throw new AssertionError();
    }
}
```

测试 ：

```java
Person person1 = new Person(new Address("武汉"));
Person person1Copy = person1.clone();
// false
System.out.println(person1.getAddress() == person1Copy.getAddress());
```

从输出结构就可以看出，虽然 `person1` 的克隆对象和 `person1` 包含的 `Address` 对象已经是不同的了。

**那什么是引用拷贝呢？** 简单来说，引用拷贝就是两个不同的引用指向同一个对象。

结合图：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85c2d4d99c6d4a53a6a324e2ce5739ff~tplv-k3u1fbpfcp-watermark.image?)

## 8. JDBC 中的 PreparedStatement 相比 Statement 的好处？

预编译语句java.sql.PreparedStatement ,扩展自Statement,不但具有Statement的所有能 力而且具有更强大的功能。不同的是，PreparedStatement 是在创建语句对象的同时给出要 执行的sql 语句。这样，sql 语句就会被系统进行预编译，执行的速度会有所增加， 尤其是在执行大语句的时候，效果更加理想。

## 9. 多线程有几种实现方法?同步有几种实现方法?

多线程有两种实现方法，分别是继承Thread 类与实现Runnable 接口。同步的实现方面有两种，分别是synchronized,wait与notify 。

*   a. wait():使一个线程处于等待状态，并且释放所持有的对象的lock。

*   b. sleep():使一个正在运行的线程处于睡眠状态，是一个静态方法，调用此方法要捕捉 InterruptedException 异常。

*   c. notify():唤醒一个处于等待状态的线程，注意的是在调用此方法的时候，并不能确切的 唤醒某一个等待状态的线程，而是由JVM 确定唤醒哪个线程，而且不是按优先级。

*   d. allnotity():唤醒所有处入等待状态的线程，注意并不是给所有唤醒线程一个对象的锁， 而是让它们竞争。

## 11. Java 中实现多态的机制是什么?

重写，重载

方法的重写Overriding 和重载Overloading 是Java 多态性的不同表现。

重写Overriding 是 父类与子类之间多态性的一种表现，重载Overloading 是一个类中多态性的一种表现。

*   如果在子类中定义某方法与其父类有相同的名称和参数，我们说该方法被重写(Overriding)。子类的对象使用这个方法时，将调用子类中的定义，对它而言，父类中的定义如同被“屏蔽” 了。

*   如果在一个类中定义了多个同名的方法，它们或有不同的参数个数或有不同的参数类型， 则称为方法的重载(Overloading)。Overloaded 的方法是可以改变返回值的类型。

## 12. 说出 ArrayList,Vector, LinkedList 的存储性能和特性

*   ArrayList 和 Vector 都是使用数组方式存储数据，此数组元素数大于实际存储的数据以便增加和插入元素，它们都允许直接按序号索引元素，但是插入元素要涉及数组元素移动等内存操作，所以索引数据快而插入数据慢，Vector 由于使用了 synchronized 方法（线程安全），通常性能上较 ArrayList 差。

*   LinkedList 使用双向链表实现存储，按序号索引数据需要进行前向或后向遍历，但是插入数据时只需要记录本项的前后项即可，所以插入速度较快。

## 13. Collection 和 Collections 的区别。

*   Collection 是集合类的上级接口，继承与他的接口主要有 Set 和 List。

*   Collections 是针对集合类的一个帮助类，他提供一系列静态方法实现对各种集合的搜索、排序、线程安全化等操作

## 14. HashMap 和 Hashtable 的区别。

HashMap 是 Hashtable 的轻量级实现（非线程安全的实现），他们都完成了 Map 接口，主要区别在于 HashMap 允许空（null）键值（key），由于非线程安全，效率上可能高于 Hashtable。

HashMap 允许将 null 作为一个 entry 的 key 或者 value，而 Hashtable 不允许。

HashMap 把 Hashtable 的 contains 方法去掉了，改成 containsvalue 和 containsKey。 因为 contains 方法容易让人引起误解。 Hashtable 继承自 Dictionary 类，而 HashMap 是 Java1.2 引进的 Map interface 的一个实现。

最大的不同是，Hashtable 的方法是 Synchronize 的，而 HashMap 不是，在多个线程访问 Hashtable 时，不需要自己为它的方法实现同步，而 HashMap 就必须为之提供外同步。 Hashtable 和 HashMap 采用的 hash/rehash 算法都大概一样，所以性能不会有很大的差异。

## 15. 线程的基本概念、线程的基本状态以及状态之间的关系

*   一个程序中可以有多条执行线索同时执行，一个线程就是程序中的一条执行线索，每个线程上都关联有要执行的代码，即可以有多段程序代码同时运行，每个程序至少都有一个线程， 即main 方法执行的那个线程。如果只是一个cpu，它怎么能够同时执行多段程序呢？这是 从宏观上来看的，cpu一会执行a线索，一会执行b 线索，切换时间很快，给人的感觉是 a,b 在同时执行，好比大家在同一个办公室上网，只有一条链接到外部网线，其实，这条网线一会为a传数据，一会为b 传数据，由于切换时间很短暂，所以，大家感觉都在同时上网。

*   状态：就绪，运行，synchronize 阻塞，wait和sleep 挂起，结束。

*   wait 必须在 synchronized内部调用。调用线程的start 方法后线程进入就绪状态，线程调度系统将就绪状态的线程转为运行状态，遇到synchronized 语句时，由运行状态转为阻塞，当 synchronized 获得锁后，由阻塞转为运行，在这种情况可以调用wait 方法转为挂起状态， 当线程关联的代码执行完后，线程变为结束状态。

## 16. Redis5种数据结构

*   String字符串
*   list列表
*   hash字典
*   set集合
*   zset有序集合

## 17. 动态代理的两种方式

*   JDK动态代理：利用反射机制生成一个实现代理接口的匿名类，在调用具体方法前调用InvokeHandler来处理。
*   CGLIB动态代理：利用asm开源包，对代理对象类的class文件加载进来，通过修改其字节码生成子类来处理。

## 18. Arraylist 和 Vector 的区别?

*   `ArrayList` 是 `List` 的主要实现类，底层使用 `Object[ ]`存储，适用于频繁的查找工作，线程不安全 ；
*   `Vector` 是 `List` 的古老实现类，底层使用`Object[ ]` 存储，线程安全的

## 19. 无序性和不可重复性的含义是什么

1、什么是无序性？无序性不等于随机性 ，无序性是指存储的数据在底层数组中并非按照数组索引的顺序添加 ，而是根据数据的哈希值决定的。

2、什么是不可重复性？不可重复性是指添加的元素按照 equals()判断时 ，返回 false，需要同时重写 equals()方法和 HashCode()方法

## 20. ==和equals的区别

**`==`** 对于基本类型和引用类型的作用效果是不同的：

*   对于基本数据类型来说，`==` 比较的是值。
*   对于引用数据类型来说，`==` 比较的是对象的内存地址。

> 因为 Java 只有值传递，所以，对于 == 来说，不管是比较基本数据类型，还是引用数据类型的变量，其本质比较的都是值，只是引用类型变量存的值是对象的地址。

**`equals()`** 不能用于判断基本数据类型的变量，只能用来判断两个对象是否相等。`equals()`方法存在于`Object`类中，而`Object`类是所有类的直接或间接父类，因此所有的类都有`equals()`方法。

`equals()` 方法存在两种使用情况：

*   **类没有重写 `equals()`方法** ：通过`equals()`比较该类的两个对象时，等价于通过“==”比较这两个对象，使用的默认是 `Object`类`equals()`方法。
*   **类重写了 `equals()`方法** ：一般我们都重写 `equals()`方法来比较两个对象中的属性是否相等；若它们的属性相等，则返回 true(即，认为这两个对象相等)。

## 21.  hashCode() 与 equals()

**答案**

> 因为Hash比equals方法的开销要小，速度更快，所以在涉及到hashcode的容器中（比如HashSet），判断自己是否持有该对象时，会先检查hashCode是否相等，如果hashCode不相等，就会直接认为不相等，并存入容器中，不会再调用equals进行比较。
>
> 这样就会导致，即使该对象已经存在HashSet中，但是因为hashCode不同，还会再次被存入。
>
> 因此要重写hashCode保证：如果equals判断是相等的，那hashCode值也要相等。

**equals和hashCode同时存在的意义**

`equals`和`hashCode`都是用来判断两个对象想不想等的，那么问题来了？

为什么需要两个呢？

*   equals - 保证比较对象是否是绝对相等的
*   hashCode - 保证在最快的时间内判断两个对象是否相等，可能有误差值

一个是保证可靠，一个是保证性能。也就是说：

*   同一个对象的hashCode一定相等，不同对象的hashCode也可能相等，这是因为hashCode是根据地址hash出来的一个int 32 位的整型数字，相等是在所难免。
*   equals比较的是两个对象的地址，同一个对象地址肯定相同，不同的对象地址一定不同，可靠性是这么来的。

**hashCode() 有什么用？**

`hashCode()` 的作用是获取哈希码（`int` 整数），也称为散列码。这个哈希码的作用是确定该对象在哈希表中的索引位置。

`hashCode()`定义在 JDK 的 `Object` 类中，这就意味着 Java 中的任何类都包含有 `hashCode()` 函数。另外需要注意的是： `Object` 的 `hashCode()` 方法是本地方法，也就是用 C 语言或 C++ 实现的，该方法通常用来将对象的内存地址转换为整数之后返回。

散列表存储的是键值对(key-value)，它的特点是：**能根据“键”快速的检索出对应的“值”。这其中就利用到了散列码！（可以快速找到所需要的对象**

**如果只重写equals**

*   无论是`Effective Java`，还是`阿里巴巴Java规范手册`都是要求重写equals，必须重写hashCode。
*   **两个相等的对象必须具有相等的散列码（Java关键约定）**

那么不重写的后果是什么呢？

> 举一个例子：
>
> 如果一个只重写了**equals(比较所有属性是否相等)**的类 new 出了两个**属性相同的对象**。这时可以得到的信息是这个属性相同的对象地址肯定不同，但是equals是true，hashCode返回的是不相等的(一般不会出现hash碰撞)。
>
> 也就是说这个类对象违背了Java对于两个对象相等的约定。违背约定的原因是 **可靠的equals判断两个对象是相等的，但是他们两个的散列码确是不相等的。**

总结来说：

*   equals 为 true ， hashCode 必须相等
*   hashCode 相等时 ， equals 可以不用为 true （也就是hash碰撞的时候）

## 22. JVM JRE JDK


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a353fec0c72d4804b3d7519b1c99fdb2~tplv-k3u1fbpfcp-watermark.image?)

### JVM

Java 虚拟机（JVM）是运行 Java 字节码的虚拟机。JVM 有针对不同系统的特定实现（Windows，Linux，macOS），目的是使用相同的字节码，它们都会给出相同的结果。字节码和不同系统的 JVM 实现是 Java 语言“一次编译，随处可以运行”的关键所在。

**JVM 并不是只有一种！只要满足 JVM 规范，每个公司、组织或者个人都可以开发自己的专属 JVM。** 也就是说我们平时接触到的 HotSpot VM 仅仅是是 JVM 规范的一种实现而已。

除了我们平时最常用的 HotSpot VM 外，还有 J9 VM、Zing VM、JRockit VM 等 JVM 。

### JRE

JRE 是 Java 运行时环境。它是运行已编译 Java 程序所需的所有内容的集合，包括 Java 虚拟机（JVM），Java 类库，java 命令和其他的一些基础构件。但是，它不能用于创建新程序。

### JDK

JDK 是 Java Development Kit 缩写，它是功能齐全的 Java SDK。它拥有 JRE 所拥有的一切，还有编译器（javac）和工具（如 javadoc 和 jdb）。它能够创建和编译程序。

## 23. 什么是字节码?采用字节码的好处是什么?

在 Java 中，JVM 可以理解的代码就叫做字节码（即扩展名为 `.class` 的文件），它不面向任何特定的处理器，只面向虚拟机。Java 语言通过字节码的方式，在一定程度上解决了传统解释型语言执行效率低的问题，同时又保留了解释型语言可移植的特点。所以， Java 程序运行时相对来说还是高效的（不过，和 C++，Rust，Go 等语言还是有一定差距的），而且，由于字节码并不针对一种特定的机器，因此，Java 程序无须重新编译便可在多种不同操作系统的计算机上运行。

**Java 程序从源代码到运行的过程如下图所示：**


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53651647bb024ddea1977223e091d6b6~tplv-k3u1fbpfcp-watermark.image?)

我们需要格外注意的是 `.class->机器码` 这一步。在这一步 JVM 类加载器首先加载字节码文件，然后通过解释器逐行解释执行，这种方式的执行速度会相对比较慢。而且，有些方法和代码块是经常需要被调用的(也就是所谓的热点代码)，所以后面引进了 JIT（just-in-time compilation） 编译器，而 JIT 属于运行时编译。当 JIT 编译器完成第一次编译后，其会将字节码对应的机器码保存下来，下次可以直接使用。而我们知道，机器码的运行效率肯定是高于 Java 解释器的。这也解释了我们为什么经常会说 **Java 是编译与解释共存的语言**

**为什么说 Java 语言“编译与解释并存”？**

这是因为 Java 语言既具有编译型语言的特征，也具有解释型语言的特征。因为 Java 程序要经过先编译，后解释两个步骤，由 Java 编写的程序需要先经过编译步骤，生成字节码（`.class` 文件），这种字节码必须由 Java 解释器来解释执行。

## 24. Collection 子接口之 Queue

### Queue 与 Deque 的区别

`Queue` 是单端队列，只能从一端插入元素，另一端删除元素，实现上一般遵循 **先进先出（FIFO）** 规则。

`Queue` 扩展了 `Collection` 的接口，根据 **因为容量问题而导致操作失败后处理方式的不同** 可以分为两类方法: 一种在操作失败后会抛出异常，另一种则会返回特殊值。

| `Queue` 接口 | 抛出异常      | 返回特殊值      |
| ---------- | --------- | ---------- |
| 插入队尾       | add(E e)  | offer(E e) |
| 删除队首       | remove()  | poll()     |
| 查询队首元素     | element() | peek()     |

`Deque` 是双端队列，在队列的两端均可以插入或删除元素。

`Deque` 扩展了 `Queue` 的接口, 增加了在队首和队尾进行插入和删除的方法，同样根据失败后处理方式的不同分为两类：

| `Deque` 接口 | 抛出异常          | 返回特殊值           |
| ---------- | ------------- | --------------- |
| 插入队首       | addFirst(E e) | offerFirst(E e) |
| 插入队尾       | addLast(E e)  | offerLast(E e)  |
| 删除队首       | removeFirst() | pollFirst()     |
| 删除队尾       | removeLast()  | pollLast()      |
| 查询队首元素     | getFirst()    | peekFirst()     |
| 查询队尾元素     | getLast()     | peekLast()      |

事实上，`Deque` 还提供有 `push()` 和 `pop()` 等其他方法，可用于模拟栈。

### ArrayDeque 与 LinkedList 的区别

`ArrayDeque` 和 `LinkedList` 都实现了 `Deque` 接口，两者都具有队列的功能，但两者有什么区别呢？

*   `ArrayDeque` 是基于可变长的数组和双指针来实现，而 `LinkedList` 则通过链表来实现。
*   `ArrayDeque` 不支持存储 `NULL` 数据，但 `LinkedList` 支持。
*   `ArrayDeque` 是在 JDK1.6 才被引入的，而`LinkedList` 早在 JDK1.2 时就已经存在。
*   `ArrayDeque` 插入时可能存在扩容过程, 不过均摊后的插入操作依然为 O(1)。虽然 `LinkedList` 不需要扩容，但是每次插入数据时均需要申请新的堆空间，均摊性能相比更慢。

从性能的角度上，选用 `ArrayDeque` 来实现队列要比 `LinkedList` 更好。此外，`ArrayDeque` 也可以用于实现栈。

## 25. ArrayList动态扩容

> ArrayList是List接口的实现类，它是支持根据需要而动态增长的数组。java中标准数组是定长的，在数组被创建之后，它们不能被加长或缩短。这就意味着在创建数组时需要知道数组的所需长度，但有时我们需要动态程序中获取数组长度。ArrayList就是为此而生的,但是它不是线程安全的，外ArrayList按照插入的顺序来存放数据
> ①ArrayList扩容发生在add()方法调用的时候， 调用ensureCapacityInternal()来扩容的，
> 通过方法calculateCapacity(elementData, minCapacity)获取需要扩容的长度:
> ②ensureExplicitCapacity方法可以判断是否需要扩容：
> ③ArrayList扩容的关键方法grow():
> 获取到ArrayList中elementData数组的内存空间长度 扩容至原来的1.5倍
> ④调用Arrays.copyOf方法将elementData数组指向新的内存空间时newCapacity的连续空间
> 从此方法中我们可以清晰的看出其实ArrayList扩容的本质就是计算出新的扩容数组的size后实例化，并将原有数组内容复制到新数组中去。

## 26. 反射

什么是反射？

反射就是Reflection，Java的反射是指程序在运行期可以拿到一个对象的所有信息。

反射之所以被称为框架的灵魂，主要是因为它赋予了我们在运行时分析类以及执行类中方法的能力。

通过反射你可以获取任意一个类的所有属性和方法，你还可以调用这些方法和属性。

**反射机制优缺点**

*   **优点** ： 可以让咱们的代码更加灵活、为各种框架提供开箱即用的功能提供了便利
*   **缺点** ：让我们在运行时有了分析操作类的能力，这同样也增加了安全问题。比如可以无视泛型参数的安全检查（泛型参数的安全检查发生在编译时）。另外，反射的性能也要稍差点，不过，对于框架来说实际是影响不大的。

## 27.IO

### 什么是序列化?什么是反序列化?

如果我们需要持久化 Java 对象比如将 Java 对象保存在文件中，或者在网络传输 Java 对象，这些场景都需要用到序列化。

简单来说：

*   **序列化**： 将数据结构或对象转换成二进制字节流的过程
*   **反序列化**：将在序列化过程中所生成的二进制字节流转换成数据结构或者对象的过程

对于 Java 这种面向对象编程语言来说，我们序列化的都是对象（Object）也就是实例化后的类(Class)，但是在 C++这种半面向对象的语言中，struct(结构体)定义的是数据结构类型，而 class 对应的是对象类型。

综上：**序列化的主要目的是通过网络传输对象或者说是将对象存储到文件系统、数据库、内存中。**

### Java 序列化中如果有些字段不想进行序列化，怎么办？

对于不想进行序列化的变量，使用 `transient` 关键字修饰。

`transient` 关键字的作用是：阻止实例中那些用此关键字修饰的的变量序列化；当对象被反序列化时，被 `transient` 修饰的变量值不会被持久化和恢复。

关于 `transient` 还有几点注意：

*   `transient` 只能修饰变量，不能修饰类和方法。
*   `transient` 修饰的变量，在反序列化后变量值将会被置成类型的默认值。例如，如果是修饰 `int` 类型，那么反序列后结果就是 `0`。
*   `static` 变量因为不属于任何对象(Object)，所以无论有没有 `transient` 关键字修饰，均不会被序列化。

### 获取用键盘输入常用的两种方法

方法 1：通过 `Scanner`

```java
Scanner input = new Scanner(System.in);
String s  = input.nextLine();
input.close();
```

方法 2：通过 `BufferedReader`

```java
BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
String s = input.readLine();
```

### Java 中 IO 流分为几种?

*   按照流的流向分，可以分为输入流和输出流；
*   按照操作单元划分，可以划分为字节流和字符流；
*   按照流的角色划分为节点流和处理流。

Java IO 流共涉及 40 多个类，这些类看上去很杂乱，但实际上很有规则，而且彼此之间存在非常紧密的联系， Java IO 流的 40 多个类都是从如下 4 个抽象类基类中派生出来的。

*   InputStream/Reader: 所有的输入流的基类，前者是字节输入流，后者是字符输入流。
*   OutputStream/Writer: 所有输出流的基类，前者是字节输出流，后者是字符输出流。

### 既然有了字节流,为什么还要有字符流?

问题本质想问：**不管是文件读写还是网络发送接收，信息的最小存储单元都是字节，那为什么 I/O 流操作要分为字节流操作和字符流操作呢？**

回答：字符流是由 Java 虚拟机将字节转换得到的，问题就出在这个过程还算是非常耗时，并且，如果我们不知道编码类型就很容易出现乱码问题。所以， I/O 流就干脆提供了一个直接操作字符的接口，方便我们平时对字符进行流操作。如果音频文件、图片等媒体文件用字节流比较好，如果涉及到字符的话使用字符流比较好。

## 28. Java支持的数据类型有哪些？什么是自动拆装箱？

Java 中有 8 种基本数据类型，分别为：

1.  6 种数字类型：
    *   4 种整数型：`byte`、`short`、`int`、`long`
    *   2 种浮点型：`float`、`double`
2.  1 种字符类型：`char`
3.  1 种布尔型：`boolean`。

这八种基本类型都有对应的包装类分别为：`Byte`、`Short`、`Integer`、`Long`、`Float`、`Double`、`Character`、`Boolean` 。

**什么是自动拆装箱？**

*   **装箱**：将基本类型用它们对应的引用类型包装起来；
*   **拆箱**：将包装类型转换为基本数据类型；

从字节码中，我们发现装箱其实就是调用了 包装类的`valueOf()`方法，拆箱其实就是调用了 `xxxValue()`方法。

## 29. 什么是值传递和引用传递？

形参实参

**形式参数**：在定义函数名和函数体时使用的参数，目的是用来接收调用该函数是传入的参数。

**实际参数**：在调用有参函数是，**主调函数**和**被调函数**之间有**数据传递关系**。在主调函数中调用一个函数时，函数名后面括号中的参数，称为实际的参数。

```java
public static void main(String[] args) {
   pt.sout("Hollis");//实际参数为 Hollis
}

public static void sout(String name) { //形式参数为 name
   System.out.println(name);
}
```

**值传递与引用传递**

**值传递**：是指在调用一个有参函数时，会把实际参数**复制一份**传递到函数中。这样在函数中如果对参数进行修改，将**不会影响到实际参数**。

**引用传递**：是指在调用一个有参函数时，直接把实际参数的地址传递到函数中，那么，如果在函数中对参数所进行的修改，**将影响到实际参数**。

## 30. == 和 equals() 的区别

**`==`** 对于基本类型和引用类型的作用效果是不同的：

*   对于基本数据类型来说，`==` 比较的是值。
*   对于引用数据类型来说，`==` 比较的是对象的内存地址

**`equals()`** 不能用于判断基本数据类型的变量，只能用来判断两个对象是否相等。`equals()`方法存在于`Object`类中，而`Object`类是所有类的直接或间接父类，因此所有的类都有`equals()`方法。

`Object` 类 `equals()` 方法：

```java
public boolean equals(Object obj) {
     return (this == obj);
}
```

`equals()` 方法存在两种使用情况：

*   **类没有重写 `equals()`方法** ：通过`equals()`比较该类的两个对象时，等价于通过“==”比较这两个对象，使用的默认是 `Object`类`equals()`方法。
*   **类重写了 `equals()`方法** ：一般我们都重写 `equals()`方法来比较两个对象中的属性是否相等；若它们的属性相等，则返回 true(即，认为这两个对象相等)。

## 31. Main方法可以继承/重载/被其他方法调用嘛

### main方法能重载么？

这个是可以的，比如说我们给它重载一个方法：

```java
public class Main {
    public static void main(String args) {
        System.out.println("hello world:" + args);
    }

    public static void main(String[] args) {
        main("test");
    }
}
```

编译运行，很显然没啥问题，除了 JVM 规定的作为应用程序入口的 main 方法之外，其他的 main 方法都是比较普通的方法。

### main方法能被其他方法调用么？

```java
public class Main {
    private static int times = 3;

    public static void main2(String[] args) {
        times--;
        main(args);
    }

    public static void main(String[] args) {
        System.out.println("main方法执行:" + times);
        if (times <= 0) {
            System.exit(0);
        }
        main2(args);
    }
}
```

运行一下代码，可以发现代码能正常执行：

    main方法执行:3
    main方法执行:2
    main方法执行:1
    main方法执行:0

所以说即使是作为应用程序入口的 main 方法，也是可以被其他方法调用的，但要注意程序的关闭方式，别陷入死循环了。

### main方法可以继承么？

我们以前了解过，当类继承时，子类可以继承父类的方法和变量，那么当父类定义了 main 方法，而子类没有 main 方法时，能继承父类的 main 方法，从而正常的运行程序么？

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("hello world");
    }
}COPY
```

定义子类：

```java
public class Main2 extends Main {
}COPY
```

这时候我们运行子类 Main2，可以发现，同样打印了hello world，这说明 main 方法也是可以继承的。那么还有一种隐藏的情况也很显然了，子类定义自己的 main 方法，隐藏掉父类中的实现，那么这也是可以的。

```java
public class Main2 extends Main {
    public static void main(String [] args) {
        System.out.println("hello world Main2");
    }
}COPY
```

这时候就会打印子类自己的内容了：`hello world Main2`。

这么来看，除了main方法作为应用程序的入口比较特殊外，其他情况下与正常的静态方法是没什么区别的。

## 32 Int与Integer的区别

*   Integer是int的包装类；int是基本数据类型；

*   Integer变量必须实例化后才能使用；int变量不需要；

*   Integer实际是对象的引用，指向此new的Integer对象；int是直接存储数据值 ；

*   Integer的默认值是null；int的默认值是0。

*   泛型不支持int，但是支持Integer

*   int 存储在栈中，Integer 对象的引用存储在栈空间中，对象的数据存储在堆空间中。
