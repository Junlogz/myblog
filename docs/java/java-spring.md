## 1. Spring的重要模块

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44bcf12479f94a0e8d509ae44f5fb696~tplv-k3u1fbpfcp-watermark.image?)

**Spring Core**

核心模块， Spring 其他所有的功能基本都需要依赖于该模块，主要提供 IoC 依赖注入功能的支持。

**Spring Aspects**

该模块为与 AspectJ 的集成提供支持。

**Spring AOP**

提供了面向切面的编程实现。

**Spring Data Access/Integration ：**

Spring Data Access/Integration 由 5 个模块组成：

*   spring-jdbc : 提供了对数据库访问的抽象 JDBC。不同的数据库都有自己独立的 API 用于操作数据库，而 Java 程序只需要和 JDBC API 交互，这样就屏蔽了数据库的影响。
*   spring-tx : 提供对事务的支持。
*   spring-orm : 提供对 Hibernate 等 ORM 框架的支持。
*   spring-oxm ： 提供对 Castor 等 OXM 框架的支持。
*   spring-jms : Java 消息服务。

**Spring Web**

Spring Web 由 4 个模块组成：

*   spring-web ：对 Web 功能的实现提供一些最基础的支持。
*   spring-webmvc ： 提供对 Spring MVC 的实现。
*   spring-websocket ： 提供了对 WebSocket 的支持，WebSocket 可以让客户端和服务端进行双向通信。
*   spring-webflux ：提供对 WebFlux 的支持。WebFlux 是 Spring Framework 5.0 中引入的新的响应式框架。与 Spring MVC 不同，它不需要 Servlet API，是完全异步.

**Spring Test**

Spring 团队提倡测试驱动开发（TDD）。有了控制反转 (IoC)的帮助，单元测试和集成测试变得更简单。

Spring 的测试模块对 JUnit（单元测试框架）、TestNG（类似 JUnit）、Mockito（主要用来 Mock 对象）、PowerMock（解决 Mockito 的问题比如无法模拟 final, static， private 方法）等等常用的测试框架支持的都比较好。

## 2. Spring IOC & AOP

### 谈谈自己对于 Spring IoC 的了解

**IoC（Inverse of Control:控制反转）** 是一种设计思想，而不是一个具体的技术实现。IoC 的思想就是将原本在程序中手动创建对象的控制权，交由 Spring 框架来管理。不过， IoC 并非 Spring 特有，在其他语言中也有应用。

**为什么叫控制反转？**

*   **控制** ：指的是对象创建（实例化、管理）的权力
*   **反转** ：控制权交给外部环境（Spring 框架、IoC 容器）

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/246f38ca8c27489290976f0fada7bd7e~tplv-k3u1fbpfcp-zoom-1.image)

将对象之间的相互依赖关系交给 IoC 容器来管理，并由 IoC 容器完成对象的注入。这样可以很大程度上简化应用的开发，把应用从复杂的依赖关系中解放出来。 IoC 容器就像是一个工厂一样，当我们需要创建一个对象的时候，只需要配置好配置文件/注解即可，完全不用考虑对象是如何被创建出来的。

在实际项目中一个 Service 类可能依赖了很多其他的类，假如我们需要实例化这个 Service，你可能要每次都要搞清这个 Service 所有底层类的构造函数，这可能会把人逼疯。如果利用 IoC 的话，你只需要配置好，然后在需要的地方引用就行了，这大大增加了项目的可维护性且降低了开发难度。

在 Spring 中， IoC 容器是 Spring 用来实现 IoC 的载体， IoC 容器实际上就是个 Map（key，value），Map 中存放的是各种对象。

Spring 时代我们一般通过 XML 文件来配置 Bean，后来开发人员觉得 XML 文件来配置不太好，于是 SpringBoot 注解配置就慢慢开始流行起来。

### 谈谈自己对于 AOP 的了解

AOP(Aspect-Oriented Programming:面向切面编程)能够将那些与业务无关，却为业务模块所共同调用的逻辑或责任（例如事务处理、日志管理、权限控制等）封装起来，便于减少系统的重复代码，降低模块间的耦合度，并有利于未来的可拓展性和可维护性。

Spring AOP 就是基于动态代理的，如果要代理的对象，实现了某个接口，那么 Spring AOP 会使用 **JDK Proxy**，去创建代理对象，而对于没有实现接口的对象，就无法使用 JDK Proxy 去进行代理了，这时候 Spring AOP 会使用 **Cglib** 生成一个被代理对象的子类来作为代理，如下图所示：

![SpringAOPProcess](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9001cab86e4c43fd8bb56923e051fe16~tplv-k3u1fbpfcp-zoom-1.image)

当然你也可以使用 **AspectJ** ！Spring AOP 已经集成了 AspectJ ，AspectJ 应该算的上是 Java 生态系统中最完整的 AOP 框架了。

### Spring AOP 和 AspectJ AOP 有什么区别？

**Spring AOP 属于运行时增强，而 AspectJ 是编译时增强。** Spring AOP 基于代理(Proxying)，而 AspectJ 基于字节码操作(Bytecode Manipulation)。

Spring AOP 已经集成了 AspectJ ，AspectJ 应该算的上是 Java 生态系统中最完整的 AOP 框架了。AspectJ 相比于 Spring AOP 功能更加强大，但是 Spring AOP 相对来说更简单，

如果我们的切面比较少，那么两者性能差异不大。但是，当切面太多的话，最好选择 AspectJ ，它比 Spring AOP 快很多

## 3. Spring Bean

### 什么是 Spring Bean？

简单来说，Bean 代指的就是那些被 IoC 容器所管理的对象。

我们需要告诉 IoC 容器帮助我们管理哪些对象，这个是通过配置元数据来定义的。配置元数据可以是 XML 文件、注解或者 Java 配置类。

### 将一个类声明为 Bean 的注解有哪些?

*   `@Component` ：通用的注解，可标注任意类为 `Spring` 组件。如果一个 Bean 不知道属于哪个层，可以使用`@Component` 注解标注。
*   `@Repository` : 对应持久层即 Dao 层，主要用于数据库相关操作。
*   `@Service` : 对应服务层，主要涉及一些复杂的逻辑，需要用到 Dao 层。
*   `@Controller` : 对应 Spring MVC 控制层，主要用户接受用户请求并调用 Service 层返回数据给前端页面。

### Component 和 @Bean 的区别是什么？

*   `@Component` 注解作用于类，而`@Bean`注解作用于方法。
*   `@Component`通常是通过类路径扫描来自动侦测以及自动装配到 Spring 容器中（我们可以使用 `@ComponentScan` 注解定义要扫描的路径从中找出标识了需要装配的类自动装配到 Spring 的 bean 容器中）。`@Bean` 注解通常是我们在标有该注解的方法中定义产生这个 bean,`@Bean`告诉了 Spring 这是某个类的实例，当我需要用它的时候还给我。
*   `@Bean` 注解比 `@Component` 注解的自定义性更强，而且很多地方我们只能通过 `@Bean` 注解来注册 bean。比如当我们引用第三方库中的类需要装配到 `Spring`容器时，则只能通过 `@Bean`来实现。

`@Bean`注解使用示例：

```java
@Configuration
public class AppConfig {
    @Bean
    public TransferService transferService() {
        return new TransferServiceImpl();
    }

}
```

上面的代码相当于下面的 xml 配置

```xml
<beans>
    <bean id="transferService" class="com.acme.TransferServiceImpl"/>
</beans>
```

### 注入 Bean 的注解有哪些？

Spring 内置的 `@Autowired` 以及 JDK 内置的 `@Resource` 和 `@Inject` 都可以用于注入 Bean。

| Annotaion    | Package                            | Source       |
| ------------ | ---------------------------------- | ------------ |
| `@Autowired` | `org.springframework.bean.factory` | Spring 2.5+  |
| `@Resource`  | `javax.annotation`                 | Java JSR-250 |
| `@Inject`    | `javax.inject`                     | Java JSR-330 |

`@Autowire `@Resource`使用的比较多一些。`

### @Autowired和@Resource的区别

> 共同点

@Resource和@Autowired都可以作为注入属性的修饰，在接口仅有单一实现类时，两个注解的修饰效果相同，可以互相替换，不影响使用。

> ### @Autowired VS @Resource
>
> 事实上，他们的基本功能都是通过注解实现**依赖注入**，只不过`@Autowired`是`Spring`定义的，而`@Resource`是`JSR-250`定义的。大致功能基本相同，但是还有一些细节不同：

*   **依赖识别方式**：@Autowired默认是**byType**可以使用@Qualifier指定Name，@Resource**默认ByName**如果**找不到则ByType**
*   **适用对象**：@Autowired可以对**构造器、方法、参数、字段**使用，@Resource只能对**方法、字段**使用
*   **提供方**：@Autowired是**Spring**提供的，@Resource是**JSR-250**提供的（J2EE提供）

## 4. Spring 框架中用到哪些设计模式

*   **工厂设计模式** : Spring 使用工厂模式通过 `BeanFactory`、`ApplicationContext` 创建 bean 对象。
*   **代理设计模式** : Spring AOP 功能的实现。
*   **单例设计模式** : Spring 中的 Bean 默认都是单例的。
*   **模板方法模式** : Spring 中 `jdbcTemplate`、`hibernateTemplate` 等以 Template 结尾的对数据库操作的类，它们就使用到了模板模式。
*   **包装器设计模式** : 我们的项目需要连接多个数据库，而且不同的客户在每次访问中根据需要会去访问不同的数据库。这种模式让我们可以根据客户的需求能够动态切换不同的数据源。
*   **观察者模式:** Spring 事件驱动模型就是观察者模式很经典的一个应用。
*   **适配器模式** : Spring AOP 的增强或通知(Advice)使用到了适配器模式、spring MVC 中也是用到了适配器模式适配`Controller`。

## 5. Spring事务

### 5.1 Spring 管理事务的方式有几种？

*   **编程式事务** ： 在代码中硬编码(不推荐使用) : 通过 `TransactionTemplate`或者 `TransactionManager` 手动管理事务，实际应用中很少使用，但是对于你理解 Spring 事务管理原理有帮助。
*   **声明式事务** ： 在 XML 配置文件中配置或者直接基于注解（推荐使用） : 实际是通过 AOP 实现（基于`@Transactional` 的全注解方式使用最多）

**事务传播行为是为了解决业务层方法之间互相调用的事务问题**。

当事务方法被另一个事务方法调用时，必须指定事务应该如何传播。例如：方法可能继续在现有事务中运行，也可能开启一个新事务，并在自己的事务中运行。

正确的事务传播行为可能的值如下:

**1.`TransactionDefinition.PROPAGATION_REQUIRED`**

使用的最多的一个事务传播行为，我们平时经常使用的`@Transactional`注解默认使用就是这个事务传播行为。如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。

**`2.TransactionDefinition.PROPAGATION_REQUIRES_NEW`**

创建一个新的事务，如果当前存在事务，则把当前事务挂起。也就是说不管外部方法是否开启事务，`Propagation.REQUIRES_NEW`修饰的内部方法会新开启自己的事务，且开启的事务相互独立，互不干扰。

**3.`TransactionDefinition.PROPAGATION_NESTED`**

如果当前存在事务，则创建一个事务作为当前事务的嵌套事务来运行；如果当前没有事务，则该取值等价于`TransactionDefinition.PROPAGATION_REQUIRED`。

**4.`TransactionDefinition.PROPAGATION_MANDATORY`**

如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常。（mandatory：强制性）

### 5.2 Spring 事务中的隔离级别有哪几种?

*   **`TransactionDefinition.ISOLATION_DEFAULT`** :使用后端数据库默认的隔离级别，MySQL 默认采用的 `REPEATABLE_READ` 隔离级别 Oracle 默认采用的 `READ_COMMITTED` 隔离级别.
*   **`TransactionDefinition.ISOLATION_READ_UNCOMMITTED`** :最低的隔离级别，使用这个隔离级别很少，因为它允许读取尚未提交的数据变更，**可能会导致脏读、幻读或不可重复读**
*   **`TransactionDefinition.ISOLATION_READ_COMMITTED`** : 允许读取并发事务已经提交的数据，**可以阻止脏读，但是幻读或不可重复读仍有可能发生**
*   **`TransactionDefinition.ISOLATION_REPEATABLE_READ`** : 对同一字段的多次读取结果都是一致的，除非数据是被本身事务自己所修改，**可以阻止脏读和不可重复读，但幻读仍有可能发生。**
*   **`TransactionDefinition.ISOLATION_SERIALIZABLE`** : 最高的隔离级别，完全服从 ACID 的隔离级别。所有的事务依次逐个执行，这样事务之间就完全不可能产生干扰，也就是说，**该级别可以防止脏读、不可重复读以及幻读**。但是这将严重影响程序的性能。通常情况下也不会用到该级别。

### 5.3  @Transactional(rollbackFor = Exception.class)注解了解吗？

`Exception` 分为运行时异常 `RuntimeException` 和非运行时异常。事务管理对于企业应用来说是至关重要的，即使出现异常情况，它也可以保证数据的一致性。

当 `@Transactional` 注解作用于类上时，该类的所有 public 方法将都具有该类型的事务属性，同时，我们也可以在方法级别使用该标注来覆盖类级别的定义。如果类或者方法加了这个注解，那么这个类里面的方法抛出异常，就会回滚，数据库里面的数据也会回滚。

在 `@Transactional` 注解中如果不配置`rollbackFor`属性,那么事务只会在遇到`RuntimeException`的时候才会回滚，加上 `rollbackFor=Exception.class`,可以让事务在遇到非运行时异常时也回滚。

`@Transactional` 注解一般可以作用在`类`或者`方法`上。

*   **作用于类**：当把`@Transactional` 注解放在类上时，表示所有该类的 public 方法都配置相同的事务属性信息。
*   **作用于方法**：当类配置了`@Transactional`，方法也配置了`@Transactional`，方法的事务会覆盖类的事务配置信息。

## 6. Spring3种DI方法

> Field属性注入

```java
@Service
public class BService {
    @Autowired
    AService aService;
    //...
}
```

> set 方法注入

```java
@Service
public class BService {
    AService aService;

    @Autowired
    public void setaService(AService aService) {
        this.aService = aService;
    }
}
```

> 构造方法注入

```java
@Service
public class AService {
    BService bService;
    @Autowired
    public AService(BService bService) {
        this.bService = bService;
    }
}
```

参考Spring官方文档，建议了如下的使用场景：

*   **构造器注入**：**强依赖性**（即必须使用此依赖），**不变性**（各依赖不会经常变动）
*   **Setter注入**：**可选**（没有此依赖也可以工作），**可变**（依赖会经常变动）
*   **Field注入**：大多数情况下尽量**少使用**字段注入，一定要使用的话， **@Resource相对@Autowired**对IoC容器的**耦合更低**

### Field注入的缺点

*   **不能像构造器那样注入不可变的对象**

*   **依赖对外部不可见**，外界可以看到构造器和setter，但无法看到私有字段，自然无法了解所需依赖

*   会导致**组件与IoC容器紧耦合**（这是最重要的原因，离开了IoC容器去使用组件，在注入依赖时就会十分困难）

*   导致**单元测试也必须使用IoC容器**，原因同上

Field注入虽然有很多缺点，但它的好处也不可忽略：那就是**太方便了**。使用构造器或者setter注入需要写更多业务无关的代码，十分麻烦，而字段注入大幅简化了它们。并且绝大多数情况下业务代码和框架就是强绑定的，完全松耦合只是一件理想上的事，牺牲了敏捷度去过度追求松耦合反而得不偿失。

idea的警告

> Field injection is not recommended (字段注入是不被推荐的)

**@Autowired**是**Spring**提供的，它是**特定IoC提供的特定注解**，这就导致了应用与框架的**强绑定**，一旦换用了其他的IoC框架，是**不能够支持注入**的。而 **@Resource**是**JSR-250**提供的，它是**Java标准**，我们使用的IoC容器应当去兼容它，这样即使更换容器，也可以正常工作。

## 7. Spring常用注解


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04745ab1d9654c5b82ec582dc5ccfb04~tplv-k3u1fbpfcp-watermark.image?)

> Spring1.2

*   @Transcational：事务

> spring2.0

*   @Required：**@Required** 注释应用于 bean 属性的 setter 方法，**是用于检查一个Bean的属性在配置期间是否被赋值。**

*   @Repository：用在持久层的接口上，这个注解是将接口的一个实现类交给spring管理。

    为什么有时候我们不用@Repository来注解接口,我们照样可以注入到这个接口的实现类呢?
    1、spring配置文件中配置了MapperScannerConfigurer这个bean，它会扫描持久层接口创建实现类并交给spring管理。

    2、接口上使用了@Mapper注解或者springboot中主类上使用了@MapperScan注解，和MapperScannerConfigurer作用一样。

    注：不使用@Repository注解，idea会报警告，提示找不到这个bean，直接忽略即可。
    ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efa8f774e24e41ce9531629bb72457d1~tplv-k3u1fbpfcp-zoom-1.image)

> spring2.5

*   @Controller

*   @Service

*   @Component

*   @RequestMapping

*   @Autowired：依赖注入

*   @Qualifier：在@Autowired中，@Qualifier用来指定Name；两个类都实现了同一个接口进行标识

Spring如何通过注解注入？
不过大家仔细想一下，为什么打上注解了就能实现接口功能了呢？换句话说，Spring怎么样找到开发者自定义的Controller把对应的请求分发到对应的方法上呢？

首先，要在Spring配置文件的头文件中引入spring-context。

其次，使用<context:component-scan>元素启动“包扫描”功能。

例如\<context:component-scan base-package="com.xxx.controller"/>

base-package是值是包的路径。意思就是，启动了报扫描功能，将com.myz.controller这个包下以及子包下的所有类扫描一遍，将标记有@Controller、@Service、@repository、@Component等注解的类注入到IOC容器中，作为Spring的Bean来管理。

这样，Spring就能找到Controller类，通过@RequestMapping注解处理对应的请求。

> Spring3

*   @Configuration用于定义配置类，可替换xml配置文件，被注解的类内部包含有一个或多个被@Bean注解的方法，这些方法将会被AnnotationConfigApplicationContext或AnnotationConfigWebApplicationContext类进行扫描，并用于构建bean定义，初始化Spring容器。

*   @ImportResource用于导入Spring的配置文件，让配置文件（如applicationContext.xml）里面的内容生效；

    ```java
    @SpringBootApplication
    @EnableSwagger2
    @ImportResource({"classpath*:applicationContext.xml"})
    public class ProductApplication {
     
       public static void main(String[] args) {
          SpringApplication.run(ProductApplication.class, args);
       }
    }
    ```

*   @ComponentScan 注解的作用就是根据指定的扫描路径，把路径中符合扫描规则的类装配到 Spring 容器中。
    *   `@ComponentScan`注解与XML文件中的`context:component-scan`标签等效。

*   `@Import`注解提供了`@Bean`注解的功能，同时还有原来`Spring`基于 xml 配置文件里的`<import>`标签组织多个分散的xml文件的功能，当然在这里是组织多个分散的`@Configuration`的类。


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9fdde9d3fce2484c9cff760f1ecdde1d~tplv-k3u1fbpfcp-watermark.image?)

例如在这个JavaConfig中再引入其他RedisConfig或者MybatisConfig；与原来`Spring`基于 xml 配置文件里的`<import>`功能一样

`第二种`是实现ImportSelector接口，那么就会把该接口重写的方法返回的内容注入到容器中去

`第三种`是实现ImportBeanDefinitionRegistrar，提供一个注册器，自己在注册器注册


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac4a9164534d4ea5b7e7dec3e8c0059f~tplv-k3u1fbpfcp-watermark.image?)

在SpringBoot的自动装配中非常重要，也是EnableXXX的前置基础。

> Spring4

*   @Conditional：条件注解，决定是否将该对象注入到容器中去
    *   实现Condition接口，重写matches方法

*   @CrossOrigin：跨域注解

> Spring5.0

*   @Indexed：加速@ComponentScan的包扫描，`减少了IO次数，只用读取一次文件`，`文件会把有被相关注解修饰的类都记录`，然后通过反射将这些Java类注入到容器中去

## 8. SringBoot的重要前提SPI

SPI，全程 Service Provider interface, 是一种服务发现机制，它通过在ClassPath路径下的META-INF/service文件夹查找文件，自动加载文件里所定义的类，这易机制为很多框架扩展提供了可能，比如在Dubbo，JDBC中都使用到了SPI机制

> 这个文件夹就相当于一个约定，需要使用某个提供好标准服务接口，都会扫描这个文件下的路径，然后具体实现
>
> 比如java.sql.Driver接口，其他不同厂商可以针对同一接口做出不同的实现，MySQL和PostgreSQL都有不同的实现提供给用户，而Java的SPI机制可以为某个接口寻找服务实现。Java中SPI机制主要思想是将装配的控制权移到程序之外，在模块化设计中这个机制尤其重要，其核心思想就是 **解耦**。


当服务的提供者提供了一种接口的实现之后，需要在classpath下的`META-INF/services/`目录里创建一个以服务接口命名的文件，这个文件里的内容就是这个接口的具体的实现类。当其他的程序需要这个服务的时候，就可以通过查找这个jar包（一般都是以jar包做依赖）的`META-INF/services/`中的配置文件，配置文件中有接口的具体实现类名，可以根据这个类名进行加载实例化，就可以使用该服务了。JDK中查找服务的实现的工具类是：`java.util.ServiceLoader`。

> 实例

我们现在需要使用一个内容搜索接口，搜索的实现可能是基于文件系统的搜索，也可能是基于数据库的搜索。

*   先定义好接口

```java
public interface Search {
    public List<String> searchDoc(String keyword);   
}
  
        @pdai: 代码已经复制到剪贴板
    
```

*   文件搜索实现

```java
public class FileSearch implements Search{
    @Override
    public List<String> searchDoc(String keyword) {
        System.out.println("文件搜索 "+keyword);
        return null;
    }
}
  
        @pdai: 代码已经复制到剪贴板
    
```

*   数据库搜索实现

```java
public class DatabaseSearch implements Search{
    @Override
    public List<String> searchDoc(String keyword) {
        System.out.println("数据搜索 "+keyword);
        return null;
    }
}
  
        @pdai: 代码已经复制到剪贴板
    
```

*   resources 接下来可以在resources下新建META-INF/services/目录，然后新建接口全限定名的文件：`com.cainiao.ys.spi.learn.Search`，里面加上我们需要用到的实现类

```xml
com.cainiao.ys.spi.learn.FileSearch
```

*   测试方法

```java
public class TestCase {
    public static void main(String[] args) {
        ServiceLoader<Search> s = ServiceLoader.load(Search.class);
        Iterator<Search> iterator = s.iterator();
        while (iterator.hasNext()) {
           Search search =  iterator.next();
           search.searchDoc("hello world");
        }
    }
}
    
```

可以看到输出结果：文件搜索 hello world

如果在`com.cainiao.ys.spi.learn.Search`文件里写上两个实现类，那最后的输出结果就是两行了。

这就是因为`ServiceLoader.load(Search.class)`在加载某接口时，会去`META-INF/services`下找接口的全限定名文件，再根据里面的内容加载相应的实现类。

这就是spi的思想，接口的实现由provider实现，provider只用在提交的jar包里的`META-INF/services`下根据平台定义的接口新建文件，并添加进相应的实现类内容就好。

著作权归<https://pdai.tech所有。> 链接：<https://pdai.tech/md/java/advanced/java-advanced-spi.html>

### SPI机制的缺陷

通过上面的解析，可以发现，我们使用SPI机制的缺陷：

*   不能按需加载，需要遍历所有的实现，并实例化，然后在循环中才能找到我们需要的实现。如果不想用某些实现类，或者某些类实例化很耗时，它也被载入并实例化了，这就造成了浪费。
*   获取某个实现类的方式不够灵活，只能通过 Iterator 形式获取，不能根据某个参数来获取对应的实现类。
*   多个并发多线程使用 ServiceLoader 类的实例是不安全的。

## 9. Spring 中的 bean 的作用域有哪些?

`singleton` : 唯一 bean 实例，在Spring的IoC容器中只存在一个对象实例，所有该对象的引用都共享这个实例

`prototype` : 每次请求都会创建一个新的 bean 实例。

`request` : 每一次 HTTP 请求都会产生一个新的 bean，该 bean 仅在当前 HTTP request 内有效。

`session` : 每一次 HTTP 请求都会产生一个新的 bean，该 bean 仅在当前 HTTP session 内

有效。

## 10 普通Java对象和Spring所管理的Bean实例的过程是有区别的

1.  Java源码被编译为class文件
2.  等到类需要被初始化时(比如new 反射等)
3.  class文件被虚拟机通过类加载器加载到JVM
4.  初始化对象供我们使用

> 简单来说,可以理解为它是用Class对象做为模板进而创建出具体的实例

而spring所管理的bean不同的是,除了Class对象之外,还会使用beanDefinition实例来描述对象的信息

比如可以在spring所管理的Bean有一系列的描述 : @Scope, @Lazy, @DependsOn

<https://www.cnblogs.com/tanghaorong/p/14165477.html>

*   @Scope
    *   可以用在类上和方法上，用来配置bean的作用域，等效于bean xml中的bean元素中的scope属性
*   @Lazy
    *   Spring IoC（ApplicationContext）容器一般都会在启动的时候实例化所有单实例 Bean。但是如果我们想要 Spring 在启动的时候延迟加载 Bean，即在调用某个 Bean 的时候再去初始化
    *   @Lazy等效于bean.xml中bean元素的lazy-init属性
*   @DenpendsOn
    *   用于指定某个类的创建依赖的bean对象先创建。简单来说就是这个组件要依赖于另一个组件，也就是说被依赖的组件会比该组件先注册到IOC容器中。
    *   可以用在任意类型和方法上，等效于bean xml中的bean元素中的depend-on属性。

> 可以理解为Class只描述了类的信息, 而BeanDefinition描述了对象的信息

## 11 Bean的生命周期

<https://juejin.cn/post/6979398918429736996#comment>

对于普通的 Java 对象来说，它们的生命周期就是：

*   实例化
*   该对象不再被使用时通过垃圾回收机制进行回收

而对于 Spring Bean 的生命周期来说：

*   实例化 Instantiation
*   属性注入 Populate
*   初始化 Initialization
*   使用 bean
*   销毁 Destruction

> 实例化 -> 属性赋值 -> 初始化 -> 使用 -> 销毁

*   创建阶段主要是创建对象，这里我们看到，对象的创建权交由Spring管理了，不再是我们手动new了，这也是IOC的概念。

*   属性填充阶段主要是进行依赖的注入，将当前对象依赖的bean对象，从Spring容器中找出来，然后填充到对应的属性中去。

*   初始化bean阶段做的事情相对比较复杂，包括回调各种Aware接口、回调各种初始化方法、生成AOP代理对象也在该阶段进行，该阶段主要是完成初始化回调，后面我们慢慢分析。

*   使用bean阶段，主要是bean创建完成，在程序运行期间，提供服务的阶段。

*   销毁bean阶段，主要是容器关闭或停止服务，对bean进行销毁处理。

> 大概流程

1.  spring在启动时会扫描xml/注解/JavaConfig中需要被spring管理的bean信息

2.  接着将这些信息封装成BeanDefinition，最后会把这些信息放在一个beanDefinitionMap中
    *   这个Map的key就是beanName, value则是BeanDefinition对象

3.  到这里其实就是把定义的元数据加载起来, 目前真实对象还没实例化

4.  接着会遍历这里beanDefinitionMap,执行BeanFactoryPostProcessor这个Bean工厂后置处理器的逻辑, 比如平时定义的占位符信息, 就是通过BeanFactoryPostProcessor的子类注入进去的,也可以用自定义的,不过运用的比较少

### 实例化

在Spring里面是通过反射来实现的, 一般情况下会通过反射选择合适的构造器来把对象实例化,

但这里把对象实例化, 只是把对象给创建出来, 而对象具体的属性是还没注入的.

*   比如我的对象是UserService, UserService对象依赖着RoleService对象, 这时候RoleService还是null的


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0db09afcacb0457d9ded8243f16dcf9c~tplv-k3u1fbpfcp-watermark.image?)

![01\_创建bean.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1960950d22104a639e09de10d2bff105~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

### 接下来就是把对象相关属性给注入 - 属性赋值

本阶段完成了Spring的核心功能之一：依赖注入，包括`自动注入`、`@Autowired注入`、`@Resource注入`等。Spring会根据bean的注入模型(`默认不自动注入`)，选择根据名称自动注入还是根据类型自动注入。然后调用`InstantiationAwareBeanPostProcessor#postProcessProperties()`完成@Autowired和@Resource的属性注入。

### 初始化

1.  首先判断该Bean是否实现了Aware相关接口, 如果存在则填充相关资源,

*   比如项目中需要通过代码程序的方式去获取指定的spring Bean, 会抽取一个工具类去实现ApplicationContextAware接口, 来获取ApplicationContext对象, 进而获取Spring bean;

2.  处理完Aware相关的接口后, 就会到BeanPostProcessor后置处理器, 后主处理器有两个方法, 一个是before, 一个是after.

*   这个BeanPostProcessor后置处理器是AOP实现的关键, 关键子类AnnotationAwareAspectAutoProxyCreator

3.  BeanPostProcessor相关子类的before方法执行完后, 就执行init相关方法

*   比如@PostConstruct, 实现了Initializing Bean接口, 定义的init- method方法, 顺序也是这3个顺序
*   这些是spring给我们的`拓展`

4.  基本重要的流程已经走完了, 我们就可以获取到对象去使用了
5.  销毁的时候就看有没有配置相关的destory方法, 执行就完事了


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ff15be01a614cf08aa6e105ff157558~tplv-k3u1fbpfcp-watermark.image?)

## 12. Spring解决循环依赖

从上面我们知道, 对象属性注入, 在对象实例化之后的

> 大致过程

1.  首先A对象实例化, 然后对属性进行注入, 发现依赖B对象
2.  B对象此时还没创建出来, 所以转头去实例化B对象
3.  B对象实例化后, 发现需要依赖A对象, A对象已经实例化了, 所以B对象最终能够完成创建
4.  B对象返回到A对象的属性注入的方法上, A对象最终也完成创建
5.  大概的过程就是这样

> 原理

原理是运用了三级缓存

这里的三级换成其实就是三个Map

*   SingletonObject (一级, 日常获取Bean的地方)
*   earlySingletonObject (二级, 已实例化, 但是还没进行属性注入, 由三级缓存放进来)
*   singletonFactories(三级, Value是一个对象工厂 )

> 结合刚刚的过程

1.  A对象实例化后, 属性注入之前, 其实会把A对象放入三级缓存中;
    *   key是BeanName, Value是ObjectFatory

2.  等到A对象属性注入时, 发现依赖B, 又要去实例化B时

3.  B属性注入需要获取A, 这里就是从三级缓存中拿处ObjectFactory, 拿到对应的Bean (也就是对象A)

4.  把三级缓存的A记录干掉, 再放到二级缓存中
    *   二级缓存存储的key是BeanName, Value就是Bean, 这里的Bean还没完成属性注入

5.  等到完成初始化后, 就会把二级缓存给remove掉, 然后放入一级缓存中, 我们自己去getBean的时候, 实际上拿到的就是以及缓存

## 13 为什么需要三级缓存 不是二级缓存

只要两个缓存确实可以做到解决循环依赖的问题，但是有一个前提这个bean没被AOP进行切面代理，如果这个bean被AOP进行了切面代理，那么只使用两个缓存是无法解决问题，下面来看一下bean被AOP进行了切面代理的场景

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9d73decec7d4618b53c83f53d07cf82~tplv-k3u1fbpfcp-watermark.image?)
我们发现AService的testAopProxy被AOP代理了，看看传入的匿名内部类的getEarlyBeanReference返回的是什么对象


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48460ca0afbb43eda7c42cf36ca6c774~tplv-k3u1fbpfcp-watermark.image?)

发现singletonFactory.getObject()返回的是一个AService的代理对象，还是被CGLIB代理的。再看一张再执行一遍singletonFactory.getObject()返回的是否是同一个AService的代理对象


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75e9403a9b9a4129a105625c566d52be~tplv-k3u1fbpfcp-watermark.image?)

我们会发现再执行一遍singleFactory.getObject()方法又是一个新的代理对象，这就会有问题了，因为AService是单例的，每次执行singleFactory.getObject()方法又会产生新的代理对象，假设这里只有一级和三级缓存的话，我每次从三级缓存中拿到singleFactory对象，执行getObject()方法又会产生新的代理对象，这是不行的，因为AService是单例的

所有这里我们要借助二级缓存来解决这个问题，将执行了singleFactory.getObject()产生的对象放到二级缓存中去，后面去二级缓存中拿，没必要再执行一遍singletonFactory.getObject()方法再产生一个新的代理对象，保证始终只有一个代理对象。还有一个注意的点

> 既然singleFactory.getObject()返回的是代理对象，那么注入的也应该是代理对象，我们可以看到注入的确实是经过CGLIB代理的AService对象。**所以如果没有AOP的话确实可以两级缓存就可以解决循环依赖的问题，如果加上AOP，两级缓存是无法解决的，不可能每次执行singleFactory.getObject()方法都给我产生一个新的代理对象，所以还要借助另外一个缓存来保存产生的代理对象**
