# 工厂方法

![工厂方法模式，图片来自 refactoringguru.cn](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c868d0eedaec4dfe9c30124d15f060be~tplv-k3u1fbpfcp-zoom-1.image)

工厂模式又称工厂方法模式，是一种创建型设计模式，其在父类中提供一个创建对象的方法， 允许子类决定实例化对象的类型。

这种设计模式也是 Java 开发中最常见的一种模式，它的主要意图是定义一个创建对象的接口，让其子类自己决定实例化哪一个工厂类，工厂模式使其创建过程延迟到子类进行。

简单说就是为了提供代码结构的扩展性，屏蔽每一个功能类中的具体实现逻辑。让外部可以更加简单的只是知道调用即可，同时，这也是去掉众多`ifelse`的方式。当然这可能也有一些缺点，比如需要实现的类非常多，如何去维护，怎样减低开发成本。但这些问题都可以在后续的设计模式结合使用中，逐步降低。

## 1. 模拟发奖多种商品

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5f05322a9b84f778f4714dd2dbc5832~tplv-k3u1fbpfcp-watermark.image?)

## 2. 结构图

> 模式结构图

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4197e5b1555e45ac8d4e7368e32cb4fe~tplv-k3u1fbpfcp-watermark.image?)

> 案例类结构图

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa230d68c8e542b29bc88b04fbac38e8~tplv-k3u1fbpfcp-watermark.image?)

## 3. 代码实现

### 3.1. 发奖接口
````java
public interface ICommodity {

    void sendCommodity(String uId, String commodityId, String bizId, Map<String, String> extMap) throws Exception;

}
 
````
-   所有的奖品无论是实物、虚拟还是第三方，都需要通过我们的程序实现此接口进行处理，以保证最终入参出参的统一性。
-   接口的入参包括；`用户ID`、`奖品ID`、`业务ID`以及`扩展字段`用于处理发放实物商品时的收获地址。

### 3.2. 实现奖品发放接口

> 优惠卷

```java
public class CouponCommodityService implements ICommodity {

    private CouponService couponService = new CouponService();

    public void sendCommodity(String uId, String commodityId, String bizId, Map<String, String> extMap) throws Exception {
        // 具体优惠卷实现
    }

}

```

> 实物商品

```java
public class GoodsCommodityService implements ICommodity {

    private GoodsService goodsService = new GoodsService();

    public void sendCommodity(String uId, String commodityId, String bizId, Map<String, String> extMap) throws Exception {
        // 具体实物商品实现
    }

}

```

> 第三方兑换卡

```java
public class CardCommodityService implements ICommodity {

    private IQiYiCardService iQiYiCardService = new IQiYiCardService();

    public void sendCommodity(String uId, String commodityId, String bizId, Map<String, String> extMap) throws Exception {
        // 具体第三方兑换卡实现
    }

}

```


### 3.3. 创建商店工厂

```java
public class StoreFactory {

    public ICommodity getCommodityService(Integer commodityType) {
        if (null == commodityType) return null;
        if (1 == commodityType) return new CouponCommodityService();
        if (2 == commodityType) return new GoodsCommodityService();
        if (3 == commodityType) return new CardCommodityService();
        throw new RuntimeException("不存在的商品服务类型");
    }

}
 
```

-   这里我们定义了一个商店的工厂类，在里面按照类型实现各种商品的服务。可以非常干净整洁的处理你的代码，后续新增的商品在这里扩展即可。如果你不喜欢`if`判断，也可以使用`switch`或者`map`配置结构，会让代码更加干净。
-   另外很多代码检查软件和编码要求，不喜欢if语句后面不写扩展，这里是为了更加干净的向你体现逻辑。在实际的业务编码中可以添加括号


## 总结

工厂方法的优缺点：`避免创建者与具体的产品逻辑耦合`、`满足单一职责，每一个业务逻辑实现都在所属自己的类中完成`、`满足开闭原则，无需更改使用调用方就可以在程序中引入新的产品类型`。

但这样也会带来一些问题，比如有非常多的奖品类型，那么实现的子类会极速扩张。因此也需要使用其他的模式进行优化，这些在后续的设计模式中会逐步涉及到。


# 抽象工厂

抽象工厂模式是一种创建型设计模式， 它能创建一系列相关的对象， 而无需指定其具体类。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0936da367154c57ad8859515ddbd38f~tplv-k3u1fbpfcp-watermark.image?)

## 1. 小例
假设你正在开发一款家具商店模拟器。 你的代码中包括一些类， 用于表示：

1.  一系列相关产品， 例如 `椅子`Chair 、 ​ `沙发`Sofa和 `咖啡桌`Coffee­Table 。
1.  系列产品的不同变体。 例如， 你可以使用 `现代`Modern 、 ​ `维多利亚`Victorian 、 ​ `装饰风艺术`Art­Deco等风格生成 `椅子` 、 ​ `沙发`和 `咖啡桌` 。


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37e27b7e3d7542f39199338fb72c7485~tplv-k3u1fbpfcp-watermark.image?)

你需要设法单独生成每件家具对象， 这样才能确保其风格一致。 如果顾客收到的家具风格不一样， 他们可不会开心。

此外， 你也不希望在添加新产品或新风格时修改已有代码。 家具供应商对于产品目录的更新非常频繁， 你不会想在每次更新时都去修改核心代码的。

## 2. 解决方案

首先， 抽象工厂模式建议为系列中的每件产品明确声明接口 （例如椅子、 沙发或咖啡桌）。 然后， 确保所有产品变体都继承这些接口。 例如， 所有风格的椅子都实现 `椅子`接口； 所有风格的咖啡桌都实现 `咖啡桌`接口， 以此类推。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b87a7a6d852f4594a07f844a32673c8b~tplv-k3u1fbpfcp-watermark.image?)

接下来， 我们需要声明*抽象工厂*——包含系列中所有产品构造方法的接口。 例如 `create­Chair`创建椅子 、 ​ `create­Sofa`创建沙发和 `create­Coffee­Table`创建咖啡桌 。 这些方法必须返回**抽象**产品类型， 即我们之前抽取的那些接口： ​ `椅子` ， ​ `沙发`和 `咖啡桌`等等。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4802ac5629a41f0b8be3887e7493699~tplv-k3u1fbpfcp-watermark.image?)

那么该如何处理产品变体呢？ 对于系列产品的每个变体， 我们都将基于 `抽象工厂`接口创建不同的工厂类。 每个工厂类都只能返回特定类别的产品， 例如， ​ `现代家具工厂`Modern­Furniture­Factory只能创建 `现代椅子`Modern­Chair 、 ​ `现代沙发`Modern­Sofa和 `现代咖啡桌`Modern­Coffee­Table对象。

## 3. 模式结构

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee406ae05c274ee9bd7a84a5ed44595d~tplv-k3u1fbpfcp-watermark.image?)

## 4. 案例场景模拟

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10895c34945f4fb7a64b287b7a03ce77~tplv-k3u1fbpfcp-watermark.image?)

**抽象工厂模型结构**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04b32bb17b8349e9b35b22d5f4f81485~tplv-k3u1fbpfcp-watermark.image?)
-   `ICacheAdapter`，定义了适配接口，分别包装两个集群中差异化的接口名称。`EGMCacheAdapter`、`IIRCacheAdapter`
-   `JDKProxy`、`JDKInvocationHandler`，是代理类的定义和实现，这部分也就是抽象工厂的另外一种实现方式。通过这样的方式可以很好的把原有操作Redis的方法进行代理操作，通过控制不同的入参对象，控制缓存的使用。

## 5. 代码实现
### 5.1 定义适配接口
```java
public interface ICacheAdapter {

    String get(String key);

    void set(String key, String value);

    void set(String key, String value, long timeout, TimeUnit timeUnit);

    void del(String key);

}
```

-   这个类的主要作用是让所有集群的提供方，能在统一的方法名称下进行操作。也方面后续的拓展。

### 5.2 实现集群使用服务

> EGMCacheAdapter

```java
public class EGMCacheAdapter implements ICacheAdapter {

    private EGM egm = new EGM();

    public String get(String key) {
        return egm.gain(key);
    }

    public void set(String key, String value) {
        egm.set(key, value);
    }

    public void set(String key, String value, long timeout, TimeUnit timeUnit) {
        egm.setEx(key, value, timeout, timeUnit);
    }

    public void del(String key) {
        egm.delete(key);
    }
}

 
```

> IIRCacheAdapter

```java
public class IIRCacheAdapter implements ICacheAdapter {

    private IIR iir = new IIR();

    public String get(String key) {
        return iir.get(key);
    }

    public void set(String key, String value) {
        iir.set(key, value);
    }

    public void set(String key, String value, long timeout, TimeUnit timeUnit) {
        iir.setExpire(key, value, timeout, timeUnit);
    }

    public void del(String key) {
        iir.del(key);
    }

}
```

### 5.3 定义抽象工程代理类和实现
> JDKProxy

```java
public static <T> T getProxy(Class<T> interfaceClass, ICacheAdapter cacheAdapter) throws Exception {
    InvocationHandler handler = new JDKInvocationHandler(cacheAdapter);
    ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
    Class<?>[] classes = interfaceClass.getInterfaces();
    return (T) Proxy.newProxyInstance(classLoader, new Class[]{classes[0]}, handler);
}
```
-   这里主要的作用就是完成代理类，同时对于使用哪个集群有外部通过入参进行传递。

> JDKInvocationHandler

```java
public class JDKInvocationHandler implements InvocationHandler {

    private ICacheAdapter cacheAdapter;

    public JDKInvocationHandler(ICacheAdapter cacheAdapter) {
        this.cacheAdapter = cacheAdapter;
    }

    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        return ICacheAdapter.class.getMethod(method.getName(), ClassLoaderUtils.getClazzByArgs(args)).invoke(cacheAdapter, args);
    }

}

```

-   在代理类的实现中其实也非常简单，通过穿透进来的集群服务进行方法操作。
-   另外在`invoke`中通过使用获取方法名称反射方式，调用对应的方法功能，也就简化了整体的使用。
-   到这我们就已经将整体的功能实现完成了，关于抽象工厂这部分也可以使用非代理的方式进行实现。

### 5.4 测试


```java
@Test  
public void test_CacheService() throws Exception {  
    CacheService proxy_EGM = JDKProxy.getProxy(CacheServiceImpl.class, new EGMCacheAdapter());  
    proxy_EGM.set("user_name_01","张三");  
    String val01 = proxy_EGM.get("user_name_01");  
    System.out.println(val01);  
  
    CacheService proxy_IIR = JDKProxy.getProxy(CacheServiceImpl.class, new IIRCacheAdapter());  
    proxy_IIR.set("user_name_01","李四");  
    String val02 = proxy_IIR.get("user_name_01");  
    System.out.println(val02);  
}
```