
import React from 'react';
import { Button, Checkbox, Form, Input, message  } from 'antd';
import './login.css'
import { useNavigate } from 'react-router-dom';
import {
    apiLogin, LoginParam
} from '../../utils/apis/userApi'
const App: React.FC = () => {
    const navigate = useNavigate()
    const onFinish = async (values: LoginParam) => {
        let {code, data, msg} = await apiLogin(values)
        if(code !== 0) {
            message.open({
                type: 'error',
                content: msg,
                duration: 3,
            });
        } else {
            console.log(data)
            console.log('Success:', values);
            navigate('/aa')
        }
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const [loginForm] = Form.useForm()

    const userName= Form.useWatch('username', loginForm);
    console.log(userName)
    return (<>
        <div className="view col jc-c ai-c">
            <div className="login-form col jc-c">
            <Form 
                form={loginForm}
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="userId"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                    登录
                    </Button>
                </Form.Item>
            </Form>
            </div>
        </div>
    </>)
};
export default App;