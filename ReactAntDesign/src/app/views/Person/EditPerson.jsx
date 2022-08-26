import { Breadcrumb, SimpleCard } from 'app/components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Input, Select, Space } from 'antd'
import 'antd/dist/antd.min.css'
import { EditOutlined } from '@ant-design/icons'
import { editPerson } from './store/Person.action'
import styled from 'styled-components'
import React, { useState } from 'react'

const Container = styled('div')(() => ({
    margin: '30px',
}))

const EditPerson = () => {
    const { id: PersonId } = useParams()

    const Person = useSelector((state) =>
        state.Person.entities.find(
            (Person) => Person.id.toString() === PersonId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState(Person.name)

    const handleName = (e) => setName(e.target.value)

    const handleClick = (e) => {
        dispatch(
            editPerson({
                id: PersonId,
                name,
            })
        ).then(() => navigate('/Orders'))
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
                        { name: 'EditPerson', path: '/Person' },
                        { name: 'Form' },
                    ]}
                />
                <SimpleCard title="Edit Form">
                    <Form
                        initialValues={{ name: name }}
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
                            <Input size="large" onChange={handleName} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 6 }}>
                            <Button
                                type="primary"
                                shape="round"
                                icon={<EditOutlined />}
                                htmlType="submit"
                            >
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </SimpleCard>
            </Space>
        </Container>
    )
}

export default EditPerson
