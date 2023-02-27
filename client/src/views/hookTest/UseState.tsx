
import React, { Fragment, MouseEventHandler, MutableRefObject, Ref, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from '../../hooks/storeHook'
import { RootState } from "../../store/store";
import { getUserInfoAsyncThunk } from "../../store/userInfoSlice";

interface IUser {
    name: string,
    id: number
}
const _userList:IUser[] = []

for(let i = 0; i< 10; i++) {
    _userList.push({
        name: 'username' + i,
        id: i
    })
}

const DeleletButton: React.FC<{
    user: IUser;
    onDelete: (user: IUser) => void
}> = ({user, onDelete}) => {
    function deleteInner() {
        onDelete(user)
    }
    return <><button onClick={deleteInner}>删除</button></>
}

const App: React.FC = () => {
    const userInfo = useAppSelector((state: RootState) => state.userInfo)
    const dispatch = useAppDispatch()

    const [userList, setUserList] = useState(_userList)
    function deleteUser (user: IUser) {
        setUserList(userList.filter(ele => ele.id != user.id))
    }

    const divRef = useRef<HTMLDivElement>(null)
    function changeContent() {
        if(divRef.current) {
            divRef.current.innerHTML = "你好啊"
        }
    }
    // 此处直接拿取还拿不到，尚未挂载，需要加到useEffect中
    const inputRef = React.createRef<HTMLInputElement>()
    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.focus()
        }
    })

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

    const [timeCount, setTimeCount] = useState(10)
    const timer = useRef<NodeJS.Timer>()
    useEffect(() => {
        console.log(timeCount)
        timer.current = setInterval(() => {
            setTimeCount((c) => c - 1)
        }, 1000)
        // 这里就会造成闭包，无法清除
        if(timeCount == 0) {
            clearInterval(timer.current)
        }
        // 返回时要清除掉定时器
        return () => {
            clearInterval(timer.current)
        }
        // 这里要监控count值才行
    }, [timeCount])

    useEffect(() => {
        dispatch(getUserInfoAsyncThunk())
    }, [])

    return ( <>
        <div ref={divRef}>你好</div>
        <button onClick={changeContent}></button>
        <div dangerouslySetInnerHTML={{__html:"<h1>我才更好</h1>"}}></div>
        <input type="text" ref={inputRef}/>

        <div>{JSON.stringify(userInfo)}</div>
        <div>
            <ChildFC ref={fcRef}></ChildFC>
            <button onClick={fcRefClick}>聚焦</button>
        </div>
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
 
export default App;