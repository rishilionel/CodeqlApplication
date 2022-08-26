import { Breadcrumb, SimpleCard } from 'app/components'
import styled from 'styled-components'
import { Form, Button, Input, Select, Space, InputNumber } from 'antd'
import 'antd/dist/antd.min.css'
import { PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPerson } from './store/Person.action'

const Container = styled('div')(() => ({
    margin: '30px',
}))

const AddPerson = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = (values) => {
        dispatch(addPerson(values))
        navigate('/Person')
    }

    return (
        <Container>
            <Space
                direction="vertical"
                size="middle"
                style={{ display: 'flex' }}
            >
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddPerson', path: '/Person' },
                        { name: 'Form' },
                    ]}
                />
                <SimpleCard title="Add Form">
                    <Form
                        autoComplete="off"
                        wrapperCol={{ span: 10 }}
                        layout="vertical"
                        onFinish={(values) => {
                            handleClick(values)
                        }}
                        onFinishFailed={(error) => {
                            console.log({ error })
                        }}
                    >
                        <Form.Item
                            name="Name"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input size="large" placeholder="Type Name" />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 6 }}>
                            <Button
                                type="primary"
                                shape="round"
                                icon={<PlusOutlined />}
                                htmlType="submit"
                            >
                                Add
                            </Button>
                        </Form.Item>
                    </Form>
                </SimpleCard>
            </Space>
        </Container>
    )
}

export default AddPerson
