## TS

### 类型断言

* 由于尖括号的写法类似 `xml`标签，在 `JSX`中可能引起混淆，因此，TS不允许在 `JSX`中使用尖括号的写法，我们在进行类型断言时应使用 `as`操作符。

### 内置元素 与 基于值的元素

#### 内置元素

* 内置元素会在特殊接口 `JSX.IntrinsicElements`上查找。默认情况下，如果没有指定这个接口，则不会对内置元素进行类型检查。**但如果这个接口存在，则内置元素会作为该接口上的属性进行类型检查。**

  ```typescript
  declare namespace JSX {
    interface IntrinsicElements {
      [x:string]: any;
    }
  }
  <foo />; // ok
  <bar />; // ok
  ```

#### 基于值的元素

* 只需根据作用域内的标识符进行查找。

  ```typescript
  import MyComponent from "./myComponent";
  <MyComponent />; // ok
  ```
* 基于值的元素有两种方式来定义：**函数组件** `Function Component(FC)` 和 **类组件** `Class Component`。

* **函数组件**
  组件如其名，是由 `JS`函数来定义的，函数的第一个参数为接收的属性对象 `props`。TS强制函数的返回值必须满足 `JSX.Element`的约束。

  ```typescript
  // 定义props的形状
  interface FooProp {
    name: string;
    X: number;
    Y: number;
  }
  declare function AnotherComponent(prop: { name: string });
  // 函数组件可以是普通的函数
  function ComponentFoo(prop: FooProp) {
    return <AnotherComponent name={prop.name} />;
  }
  // 也可以是箭头函数表达式
  const Button = (prop: { value: string }, context: { color: string }) => (
    <button />
  );
  复制代码
  ```
  可以看到，函数组件就是一个 `JS`函数，因此，**函数重载**也完全适用。

  ```typescript
  interface ClickableProps {
    children: JSX.Element[] | JSX.Element;
  }

  interface HomeProps extends ClickableProps {
    home: JSX.Element;
  }

  interface SideProps extends ClickableProps {
    side: JSX.Element | string;
  }

  function MainButton(prop: HomeProps): JSX.Element;
  function MainButton(prop: SideProps): JSX.Element;
  function MainButton(prop: ClickableProps): JSX.Element {
    // ...
  }
  复制代码
  ```
  在以前，函数组件被认为是 无状态组件，即 `Stateless Function Components (SFC)`。但是在react最近的版本中，使用hooks可以使函数组件具有像类组件一样的状态。因此， **类型 `SFC`及其别名 `StatelessComponent`被弃用了** 。
* **类组件**
  类组件的类型可以定义，不过在此之前，或许我们得先了解两个术语：元素类 类型，和元素实例 类型。

  * 元素类 类型
    以 `<Expr>`为例，元素类的类型为 `Expr`，如果该组件是使用 `ES6`的 `class`定义出来的，则类的类型为其构造函数和静态成员；如果该组件是由工厂函数定义出来的，则类的类型为该函数。
  * 元素实例 类型
    一旦类的类型确立好之后，元素实例类型便由类类型的**构造签名**或**调用签名**的返回值的联合类型来决定。同样的，在 `ES6`的 `class`的情况下，元素实例类型就是 `class`的实例的类型；如果是工厂函数的情况下，则元素实例的类型是函数返回值的类型。

    ```typescript
    class MyComponent {
      render() {}
    }
    // 对于class，使用构造签名
    const myComponent = new MyComponent();
    // 则元素类类型为 MyComponent
    // 元素实例类型为 { render: () => void }
    function MyFactoryFunction() {
      return {
        render: () => {},
      };
    }

    // 对于工厂函数，使用调用签名
    const myComponent = MyFactoryFunction();
    // 元素类类型为 MyFactoryFunction
    // 元素实例类型为 { render: () => void }
    复制代码
    ```
    元素实例类型 必须符合 `JSX.ElementClass`的约束，否则会报错。默认情况下 `JSX.ElementClass`为 `{}`，但是可以自由扩充其属性/方法来限制相应组件的类型。

    ```typescript
    declare namespace JSX {
      interface ElementClass {
        // 扩充一个 render 字段
        render: any;
      }
    }
    class MyComponent {
      render() {}
    }
    function MyFactoryFunction() {
      return { render: () => {} };
    }
    <MyComponent />; // ok
    <MyFactoryFunction />; // ok
    // 以下两个，不符合JSX.ElementClass的约束，用作类组件会报错
    class NotAValidComponent {}
    function NotAValidFactoryFunction() {
      return {};
    }
    <NotAValidComponent />; // 报错
    <NotAValidFactoryFunction />; // 报错
    ```
