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

### useState

```typescript
const [info, setInfo] = useState({
      name: '张三',
      age: 14,
      sex: '男'
});
const changeUserName = () => {
    // 修改时，需要展开重新赋值，不能去修改Info原值
    setInfo({
        ...info,
        name: info.name == '李四' ? '张三' : '李四'
    })
}
```

### useEffect

如果你熟悉 React class 的生命周期函数，你可以把 `useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

用一个hook解决三个hook的重复代码，并且可以根据每一个变化值进行控制

默认情况下，它在第一次渲染之后和每次更新之后都会执行。你可能会更容易接受 effect 发生在“渲染之后”这种概念，不用再去考虑“挂载”还是“更新”。React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。

数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用。有些副作用可能需要清除，所以需要返回一个函数，比如挂载时设置定时器，卸载时取消定时器。

```typescript
class Example extends Component {
  constructor (props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    this.id = setInterval(() => {
      this.setState({count: this.state.count + 1})
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.id)
  }
  render() { 
    return <h1>{this.state.count}</h1>;
  }
}
```

使用 Hook 的示例

```typescript
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []); // 只要传递数组作为 useEffect 的第二个可选参数即可，如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行


  // useEffect回调函数使用asnyc不被允许，会造成该函数延迟返回
  useEffect(async () => {
    const id = await getId()
  }, []);
  return <h1>{count}</h1>
}
```

### useRef

绑定DOM元素，函数组件没有实例，无法通过Ref获取, Ref获取的必须是类组件

### React.memo

`React.memo` 等效于 `PureComponent`

如果你的函数组件在给定相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

它适用于函数组件，但不适用于 class 组件, 且它只比较 props。默认情况下其只会对复杂对象做浅层对比（你也可以通过第二个参数指定一个自定义的比较函数来比较新旧 props。如果函数返回 true，就会跳过更新。）

如果函数组件被 React.memo 包裹，且其实现中拥有 useState 或 useContext 的 Hook，当 context 发生变化时，它仍会重新渲染。

#### [`useMemo`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo)

Hook 允许你通过「记住」上一次计算结果的方式在多次渲染的之间缓存计算结果：

### 如何避免向下传递回调？

我们已经发现大部分人并不喜欢在组件树的每一层手动传递回调。尽管这种写法更明确，但这给人感觉像错综复杂的管道工程一样麻烦。

在大型的组件树中，我们推荐的替代方案是通过 context 用 [`useReducer`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer) 往下传一个 `dispatch` 函数：

```typescript
const TodosDispatch = React.createContext(null);

function TodosApp() {
  // 提示：`dispatch` 不会在重新渲染之间变化
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}
```

`TodosApp` 内部组件树里的任何子节点都可以使用 `dispatch` 函数来向上传递 actions 到 `TodosApp`：

```typescript
function DeepChild(props) {
  // 如果我们想要执行一个 action，我们可以从 context 中获取 dispatch。
  const dispatch = useContext(TodosDispatch);

  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }

  return (
    <button onClick={handleClick}>Add todo</button>
  );
}
```


### `Fragment-<></>只为了React逻辑实现，不会渲染到DOM之上`

```ts
<Fragment></Fragment> = <></> // Fragment可以添加循环key值
```

### React.FC

```
interface IProps {
username: string
}
// 可以在FC<>里面添加props类型约束
React.FC<IProps> = ({username}) => {
}
```

### 状态提升

所谓状态提升，即父组件将数据和操作方法传递给子组件，子组件使用对应方法操纵父组件的状态内容，反向数据流来解耦

```tsx
const DeleletButton: React.FC<{
    user: IUser;
    onDelete: (user: IUser) => void
}> = ({user, onDelete}) => {
    function deleteInner() {
	// 此处可添加异步请求，判断是否可删除再删除，反向数据控制
        onDelete(user)
    }
    return <><button onClick={deleteInner}>删除</button></>
}

const App: React.FC = () => {
    const [userList, setUserList] = useState(_userList)
    function deleteUser (user: IUser) {
        setUserList(userList.filter(ele => ele.id != user.id))
    }
    return ( <>
        <ul>
            {
            userList.map(user => 
            <Fragment key={user.id}>
                <li>
                    {user.name} <DeleletButton user={user} onDelete={deleteUser}></DeleletButton>
                </li>
            </Fragment>)
            }
        </ul>
    </> );
}
```

### useRef，React.createRef() | React.forwardRef

获取DOM，谨慎使用，可能造成XSS攻击

```tsx
// 第一种方式
const divRef = useRef<HTMLDivElement>(null)
    function changeContent() {
        if(divRef.current) {
            divRef.current.innerHTML = "你好啊"
        }
    }
<div ref={divRef}>你好</div>
<button onClick={changeContent}></button>

// 第二种方式
// 此处直接拿取还拿不到，尚未挂载，需要加到useEffect中
    const inputRef = React.createRef<HTMLInputElement>()
    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.focus()
        }
    })
<input type="text" ref={inputRef}/>

```

```tsx
// 推荐使用以下方式防止XSS
<div dangerouslySetInnerHTML={{__html:"<h1>我才更好</h1>"}}></div>
```

#### React.forwardRef

由于函数式组件无法拿取到*`子组件`*的实例，需要通过forwardRef去拿，如果是类子组件可以直接使用ref拿取。不推荐，推荐使用状态提升，事件回调，具有耦合性

```tsx
const ChildFC = React.forwardRef((props, ref: Ref<HTMLInputElement>) => {
        return (<>
            <input ref={ref}/>
        </>)
    })
const fcRef = useRef<HTMLInputElement>(null);
    function fcRefClick() {
        if(fcRef.current) {
            fcRef.current.focus()
        }
    }
<div>
	<ChildFC ref={fcRef}></ChildFC>
	<button onClick={fcRefClick}>聚焦</button>
</div>
```

### Hook

不要在循环中hook，hook会引起视图更新，循环hook会造成无限循环

usestate `<number>`(0)  // 次数number可写可不写，使用了ts的类型推断

```tsx
const [count, setCount] = useState(0)
// 其中setCount是异步函数
在for(let i = 0; i < 10; i++) {
	// 如果不是频繁计算，以下两种方式等同，但是频繁计算需要使用箭头函数
	cetCount(c + 1)
	// 使用箭头函数，始终将上一次的结果赋值到此处作为形参，可解决闭包问题
	setCount((c) => c + 1)
}
```

#### useEffect

页面初始化和页面变动时就会触发useEffect,所以可以在useEffect中添加监控字段，[]只在初始化调用，按需添加字段即可，会造成闭包问题
