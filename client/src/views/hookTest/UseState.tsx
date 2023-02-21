import React, { MutableRefObject, useRef, useState } from "react";

const App: React.FC = () => {
    const [info, setInfo] = useState({
        name: '张三',
        age: 14,
        sex: '男'
    });
    const changeUserName = () => {
        setInfo({
            ...info,
            name: info.name == '李四' ? '张三' : '李四'
        })
    }
    const hello: MutableRefObject<undefined> = useRef()
    return ( <>
        <p>helllo</p>
        <button onClick={changeUserName}>点击</button>
        <div>{JSON.stringify(info)}</div>
    </> );
}
 
export default App;