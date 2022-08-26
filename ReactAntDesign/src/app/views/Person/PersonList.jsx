import React, { useEffect, useState } from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletePerson, fetchPerson, message } from './store/Person.action'
import 'antd/dist/antd.min.css'
import { PlusOutlined, EditFilled, DeleteFilled } from '@ant-design/icons'
import styled from 'styled-components'
import { Spin, Button, Table, Space, Modal, Alert } from 'antd'

const Container = styled('div')(() => ({
    margin: '30px',
}))

const StyledIcon = styled('div')(() => ({
    fontSize: '20px',
    color: 'gray',
}))

const PersonList = () => {
    const [showAlert, setShowAlert] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { entities } = useSelector((state) => state.Person)
    const loading = useSelector((state) => state.Person.loading)

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Are you sure, you want to delete this row?',
            okText: 'Yes',
            okType: 'danger',
            onOk: () => {
                dispatch(deletePerson({ id }))
                setTimeout(() => {
                    setShowAlert(true)
                }, 2)
            },
        })
    }

    const handleEdit = (id) => {
        navigate(`/Person/edit/${id}`)
    }

    const handleAdd = () => {
        navigate(`/Person/add`)
    }

    useEffect(() => {
        dispatch(fetchPerson())
    }, [dispatch])

    const rows = entities.map((entity, idCounter) => {
        idCounter += 1
        return { id: idCounter, ...entity }
    })

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            align: 'left',
        },
        {
            key: 'Actions',
            title: 'Actions',
            render: (record) => {
                return (
                    <>
                        <Space>
                            <StyledIcon>
                                <EditFilled
                                    onClick={() => {
                                        handleEdit(record.id)
                                    }}
                                />
                            </StyledIcon>
                            <StyledIcon>
                                <DeleteFilled
                                    onClick={() => {
                                        handleDelete(record.id)
                                    }}
                                />
                            </StyledIcon>
                        </Space>
                    </>
                )
            },
        },
    ]
    return (
        <Container>
            <Space
                direction="vertical"
                size="middle"
                style={{ display: 'flex' }}
            >
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Entities', path: '/Person' },
                            { name: 'Person' },
                        ]}
                    />
                </div>

                <Button
                    type="primary"
                    shape="round"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        handleAdd()
                    }}
                >
                    Add Person
                </Button>

                <SimpleCard title="Person">
                    {loading ? (
                        <div
                            title="loading"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Spin size="large" />
                        </div>
                    ) : (
                        <div style={{ height: 430, width: '100%' }}>
                            {message !== '' ? (
                                <Alert
                                    message={message}
                                    type="success"
                                    showIcon
                                    action={
                                        <Button size="small" type="text">
                                            UNDO
                                        </Button>
                                    }
                                    closable
                                />
                            ) : (
                                <></>
                            )}
                            <Table
                                dataSource={rows}
                                columns={columns}
                                pagination={{ pageSize: 5 }}
                            ></Table>
                        </div>
                    )}
                </SimpleCard>
            </Space>
        </Container>
    )
}

export default PersonList
