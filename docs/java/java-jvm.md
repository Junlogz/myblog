## 1. 什么情况下会发生栈内存溢出。

思路： 描述栈定义，再描述为什么会溢出，再说明一下相关配置参数，OK的话可以给面试官手写是一 个栈溢出的demo。

-   栈是线程私有的，他的生命周期与线程相同，每个方法在执行的时候都会创建一个栈帧，用来存储局部变量表，操作数栈，动态链接，方法出口等信息。局部变量表又包含基本数据类型，对象引用类型
-   如果线程请求的栈深度大于虚拟机所允许的最大深度，将抛出StackOverflowError异常，方法递归调用产生这种结果。
-   如果Java虚拟机栈可以动态扩展，并且扩展的动作已经尝试过，但是无法申请到足够的内存去完成扩展，或者在新建立线程的时候没有足够的内存去创建对应的虚拟机栈，那么Java虚拟机将抛出一 个OutOfMemory 异常。(线程启动过多)
-   参数 -Xss 去调整JVM栈的大小

## 2. 详解JVM内存模型

思路： 给面试官画一下JVM内存模型图，并描述每个模块的定义，作用，以及可能会存在的问题，如栈溢出等。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8fa5e72750b34c74b528bc37a845450e~tplv-k3u1fbpfcp-watermark.image?)
-   程序计数器：当前线程所执行的字节码的行号指示器，用于记录正在执行的虚拟机字节指令地址，线程私有。

> **字节码解释器工作时通过改变这个计数器的值来选取下一条需要执行的字节码指令，分支、循环、跳转、异常处理、线程恢复等功能都需要依赖这个计数器来完成。**

-   Java虚拟栈：存放基本数据类型、对象的引用、方法出口等，线程私有。
-   Native方法栈：和虚拟栈相似，只不过它服务于Native方法，线程私有。
-   Java堆：java内存最大的一块，所有对象实例、数组都存放在java堆，GC回收的地方，线程共享。
-   方法区：存放已被加载的类信息、常量、静态变量、即时编译器编译后的代码数据等。（即永久带）， 回收目标主要是常量池的回收和类型的卸载，各线程共享

## 3. JVM内存为什么要分成新生代，老年代，持久代。新生代中为什么 要分为Eden和Survivor。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a66ecc5516f42139b818e7d6fd5f3ed~tplv-k3u1fbpfcp-watermark.image?)

> 为什么分年老代和新生代

1、新生代：年轻代主要存放新创建的对象，内存大小相对会比较小，垃圾回收会比较频繁。

2、老年代：年老代主要存放JVM认为生命周期比较长的对象（经过 几次的新生代的垃圾回收后仍然存在），内存大小相对会比较大，垃圾回收也相对没有那么频繁。

> 为什么要分为Eden和Survivor?为什么要设置两个Survivor区？

-   如果没有Survivor，Eden区每进行一次Minor GC，存活的对象就会被送到老年代。老年代很快被 填满，触发Major GC.老年代的内存空间远大于新生代，进行一次Full GC消耗的时间比Minor GC 长得多,所以需要分为Eden和Survivor。
-   Survivor的存在意义，就是减少被送到老年代的对象，进而减少Full GC的发生，Survivor的预筛选保证，只有经历16次Minor GC还能在新生代中存活的对象，才会被送到老年代。
-   设置两个Survivor区最大的好处就是解决了碎片化，刚刚新建的对象在Eden中，经历一次Minor GC，Eden中的存活对象就会被移动到第一块survivor space S0，Eden被清空；等Eden区再满 了，就再触发一次Minor GC，Eden和S0中的存活对象又会被复制送入第二块survivor space S1（这个过程非常重要，因为这种复制算法保证了S1中来自S0和Eden两部分的存活对象占用连续 的内存空间，避免了碎片化的发生）

## 4. JVM中一次完整的GC流程是怎样的，对象如何晋升到老年代

思路： 先描述一下Java堆内存划分，再解释Minor GC，Major GC，full GC，描述它们之间转化流程。

-   Java堆 = 老年代 + 新生代
-   新生代 = Eden + S0 + S1
-   当 Eden 区的空间满了， Java虚拟机会触发一次 Minor GC，以收集新生代的垃圾，存活下来的对象，则会转移到 Survivor区。
-   `大对象`（需要大量连续内存空间的Java对象，如那种很长的字符串）`直接进入老年态`；
-   如果对象在Eden出生，并经过第一次Minor GC后仍然存活，并且被Survivor容纳的话，年龄设为 1，每熬过一次Minor GC，年龄+1，`若年龄超过一定限制（15）`，则被晋升到`老年态`。即`长期存活的对象`进入老年态。
-   老年代满了而`无法容纳更多的对象`，Minor GC 之后通常就会进行Full GC，Full GC 清理整个内存堆 – 包括`年轻代和年老代`。
-   Major GC 发生在`老年代的GC`，`清理老年区`，经常会伴随至少一次Minor GC，比Minor GC慢10 倍以上。

## 5. 你知道哪几种垃圾收集器，各自的优缺点，重点讲下cms和G1，包括原理，流程，优缺点。

思路： 一定要记住典型的垃圾收集器，尤其cms和G1，它们的原理与区别，涉及的垃圾回收算法。

1）几种垃圾收集器：

-   年轻代

    -   Serial收集器： 单线程的收集器，收集垃圾时，必须stop the world，使用复制算法。
    -   ParNew收集器： Serial收集器的多线程版本，也需要stop the world，复制算法。
    -   Parallel Scavenge收集器： 新生代收集器，复制算法的收集器，并发的多线程收集器，目标是达到一个可控的吞吐量。如果虚拟机总共运行100分钟，其中垃圾花掉1分钟，吞吐量就是99%。

-   老年代

    -   Serial Old收集器： 是Serial收集器的老年代版本，单线程收集器，使用标记整理算法。
    -   Parallel Old收集器： 是Parallel Scavenge收集器的老年代版本，使用多线程，标记-整理算法。
    -   CMS(Concurrent Mark Sweep) 收集器： 是一种以获得最短回收停顿时间为目标的收集器，标 记清除算法，运作过程：初始标记，并发标记，重新标记，并发清除，收集结束会产生大量空间碎片。

-   G1收集器： 标记整理算法实现，运作流程主要包括以下：初始标记，并发标记，最终标记，筛选标记。不会产生空间碎片，可以精确地控制停顿。

2）CMS收集器和G1收集器的区别：

-   CMS收集器是老年代的收集器，可以配合新生代的Serial和ParNew收集器一起使用；
-   G1收集器收集范围是老年代和新生代，不需要结合其他收集器使用；
-   CMS收集器以最小的停顿时间为目标的收集器；
-   G1收集器可预测垃圾回收的停顿时间
-   CMS收集器是使用“标记-清除”算法进行的垃圾回收，容易产生内存碎片
-   G1收集器使用的是“标记-整理”算法，进行了空间整合，降低了内存空间碎片。

## 6. JVM内存模型的相关知识了解多少，比如重排序，内存屏障， happen-before，主内存，工作内存。

思路： 先画出Java内存模型图，结合例子volatile ，说明什么是重排序，内存屏障，最好能给面试官写 以下demo说明。

> Java内存模型图：


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f74daa1a51fa4135a17d71afe876cb13~tplv-k3u1fbpfcp-watermark.image?)

Java内存模型规定了所有的`变量都存储在主内存`中，每条`线程还有自己的工作内存`，线程的工作内存中保存了该线程中是用到的变量的主内存副本拷贝，`线程对变量的所有操作都必须在工作内存`中进行，`而不能直接读写主内存`。不同的线程之间也`无法直接访问对方工作内存中的变量`，线程间变量的传递均需 要自己的工作内存和主存之间进行数据同步进行。

> 指令重排序

在这里，先看一段代码

```java
public class PossibleReordering {
    static int x = 0, y = 0;
    static int a = 0, b = 0;
public static void main(String[] args) throws InterruptedException {
    Thread one = new Thread(new Runnable() { 
        public void run() { 
            a = 1; x = b; 
        }
    });
    Thread other = new Thread(new Runnable() { 
        public void run() { 
            b = 1; y = a; 
        }
    }); 
    one.start();
    other.start(); 
    one.join();
    other.join(); 
    System.out.println(“(” + x + “,” + y + “)”);}
```

运行结果可能为(1,0)、(0,1)或(1,1)，也可能是(0,0)。

大多数现代微处理器都会采用将指令乱序执行（out-of-order execution，简 称OoOE或OOE）的方法，在条件允许的情况下，直接运行当前有能力立即执行的后续指令，避开获取 下一条指令所需数据时造成的等待。`通过乱序执行的技术，处理器可以大大提高执行效率`。而这就是`指令重排`。

> 内存屏障

内存屏障，也叫内存栅栏，是一种CPU指令，用于控制特定条件下的重排序和内存可见性问题。

-   LoadLoad屏障：对于这样的语句Load1; LoadLoad; Load2，在Load2及后续读取操作要读取的 数据被访问前，保证Load1要读取的数据被读取完毕。
-   StoreStore屏障：对于这样的语句Store1; StoreStore; Store2，在Store2及后续写入操作执行 前，保证Store1的写入操作对其它处理器可见。
-   LoadStore屏障：对于这样的语句Load1; LoadStore; Store2，在Store2及后续写入操作被刷出 前，保证Load1要读取的数据被读取完毕。
-   StoreLoad屏障：对于这样的语句Store1; StoreLoad; Load2，在Load2及后续所有读取操作执行前，保证Store1的写入对所有处理器可见。它的开销是四种屏障中最大的。 在大多数处理器的实现中，这个屏障是个万能屏障，兼具其它三种内存屏障的功能。

> happen-before原则

0.  程序顺序规则

    -   某个线程中的每个动作都happens-before该线程中该动作后面的动作。

0.  锁定规则

    -   某个线程（对象锁）上的unlock动作happens-before同一个管程上后续的lock动作。

    ```java
    class HappensBeforeLock {
        private int value = 0;
        
        public synchronized void setValue(int value) {
            this.value = value;
        }
        
        public synchronized int getValue() {
            return value;
        }
    }
    ​
    ```

    > 上面这段代码，setValue和getValue两个方法共享同一个监视器锁。假设setValue方法在线程A中执行，getValue方法在线程B中执行。setValue方法会先对value变量赋值，然后释放锁。getValue方法会先获取到同一个锁后，再读取value的值。所以根据锁定原则，线程A中对value变量的修改，可以被线程B感知到。

0.  volatile变量规则

0.  线程启动规则

    -   调用start方法时，会将start方法之前所有操作的结果同步到主内存中，新线程创建好后，需要从主内存获取数据。这样在start方法调用之前的所有操作结果对于新创建的线程都是可见的。

0.  线程结束规则

    -   假设两个线程s、t。在线程s中调用t.join()方法。则线程s会被挂起，等待t线程运行结束才能恢复执行。当t.join()成功返回时，s线程就知道t线程已经结束了。所以根据本条原则，在t线程中对共享变量的修改，对s线程都是可见的。

0.  中断规则

    -   假设两个线程A和B，A先做了一些操作operationA，然后调用B线程的interrupt方法。当B线程感知到自己的中断标识被设置时(通过抛出InterruptedException，或调用interrupted和isInterrupted),operationA中的操作结果对B都是可见的。

0.  终结器规则

    -   一个对象的构造函数执行结束Happens-Before它的finalize()方法的开始。 “结束”和“开始”表明在时间上，一个对象的构造函数必须在它的finalize()方法调用时执行完。 根据这条原则，可以确保在对象的finalize方法执行时，该对象的所有field字段值都是可见的。

0.  传递性规则

    -   如果操作A Happens-Before B，B Happens-Before C，那么可以得出操作A Happens-Before C。

## 7. 简单说说你了解的类加载器，可以打破双亲委派么，怎么打破。

思路： 先说明一下什么是类加载器，可以给面试官画个图，再说一下类加载器存在的意义，说一下双亲 委派模型，最后阐述怎么打破双亲委派模型。

0.  什么是类加载器？

类加载器 就是根据指定全限定名称将class文件加载到JVM内存，转为Class对象。

-   `启动类加载器（Bootstrap ClassLoader）`：由C++语言实现（针对HotSpot）,负责将存放在 \lib目录或-Xbootclasspath参数指定的路径中的类库加载到内存中。
-   `扩展类加载器（Extension ClassLoader）`：负责加载\lib\ext目录或 java.ext.dirs系统变量指定的路径中的所有类库。
-   `应用程序类加载器（Application ClassLoader）`。负责加载用户类路径（classpath）上 的指定类库，我们可以直接使用这个类加载器。一般情况，如果我们没有自定义类加载 器默认就是用这个加载器。
-   `（自定义）其他类加载器`：由Java语言实现，继承自抽象类ClassLoader。

### 双亲委派模型

-   双亲委派模型工作过程是：

> 如果一个类加载器收到类加载的请求，它首先不会自己去尝试加载这个类，而是把这个请求委派给父类加载器完成。每个类加载器都是如此，只有当父加载器在自己的搜索范围内找不到指定的 类时（即ClassNotFoundException），子加载器才会尝试自己去加载。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/209ba89c483848e089a08df3591f88d0~tplv-k3u1fbpfcp-watermark.image?)
```java
protected Class<?> loadClass(String name, boolean resolve)
        throws ClassNotFoundException
    {
        synchronized (getClassLoadingLock(name)) {
            // First, check if the class has already been loaded
            Class<?> c = findLoadedClass(name);
            if (c == null) {
                long t0 = System.nanoTime();
                try {
                    if (parent != null) {
                        c = parent.loadClass(name, false);
                    } else {
                        c = findBootstrapClassOrNull(name);
                    }
                } catch (ClassNotFoundException e) {
                    // ClassNotFoundException thrown if class not found
                    // from the non-null parent class loader
                }
​
                if (c == null) {
                    // If still not found, then invoke findClass in order
                    // to find the class.
                    long t1 = System.nanoTime();
                    c = findClass(name);
```

### 为什么需要双亲委派模型？

在这里，先想一下，如果没有双亲委派，那么用户是不是可以`自己定义一个java.lang.Object的同名 类，java.lang.String的同名类`，并把它放到ClassPath中,那么`类之间的比较结果及类的唯一性将无法保证`，因此，为什么需要双亲委派模型？`防止内存中出现多份同样的字节码`

### 怎么打破双亲委派模型？

打破双亲委派机制则不仅要继承ClassLoader类，还要重写`loadClass`和`findClass`方法。

## 8. 说说你知道的几种主要的JVM参数

1）堆栈配置相关

-   -Xmx3550m： 最大堆大小为3550m。
-   -Xms3550m： 设置初始堆大小为3550m。
-   -Xmn2g： 设置年轻代大小为2g。
-   -Xss128k： 每个线程的堆栈大小为128k。
-   -XX:MaxTenuringThreshold=0： 设置垃圾最大年龄。如果设置为0的话，则年轻代对象不经过 Survivor区，直接进入年老代。

2）垃圾收集器相关

-

## 9. 判定为GC的不可达对象一定就会被回收嘛


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a25ded08be2949148ecfdbf0b06f556d~tplv-k3u1fbpfcp-watermark.image?)

## 10. 可以做为GC ROOT的根对象有哪些

-   静态变量（方法区中的类静态属性引用的**对象**）
-   常量（方法区中常量引用的**对象**）
-   栈帧中的局部变量表中的元素
-   JNI本地方法栈中引用的对象

## 11. 什么是浮动垃圾

浮动垃圾就是在`CMS并发清理阶段，用户线程还在运行`，伴随着用户线程的运行就会有新的垃圾产生，这一部分垃圾出现在标记过程之后，`CMS无法在当次收集中处理它们，只好留到下一次GC的时候再清理`，这就是浮动垃圾

## 12. 类加载机制


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54432166fb8f453bb42f6d5f5f660736~tplv-k3u1fbpfcp-watermark.image?)

-   装载：

1）ClassFile -- > 字节流 -- > 类加载器

2）将这个字节流所代表的静态存储结构转化为方法区的运行时数据结构

3）在我们的堆中生成一个代表这个类的java.lang.Class对象，作为方法区这些数据的入口

-   链接

    -   验证

        -   文件格式验证
        -   元数据验证
        -   字节码验证
        -   符号引用验证

    -   准备

        -   为类的静态变量分配内存，并赋值（当前类型的默认值）

        ```java
        private static int a = 1;
        ```

        在准备阶段他的值就是0

    -   解析

        -   解析是从运行时常量池中的符号引用动态确定具体值的过程
        -   符号引用转换成直接引用

-   初始化

    -   方法执行到了Clinit阶段，初始化静态变量的值、初始化静态代码块、初始化当前类的父类

## 13. 类加载器有哪些


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5af59472eb3b4d18aa59f98dcb95f32a~tplv-k3u1fbpfcp-watermark.image?)