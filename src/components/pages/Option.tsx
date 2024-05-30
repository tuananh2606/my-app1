import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  TableProps,
} from "antd";

import { useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { createPost } from "../../actions";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { deletePost, updatePost } from "../../features/post/postSlice";
import useFetch from "../../hooks/useFetch";
import { Post } from "../../type";

interface DataType extends Post {}

interface AddModalProps {
  name: string;
  type: string;
}

interface UpdateModalProps extends DataType, AddModalProps {}

const Option = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalProps, setModalProps] = useState<
    AddModalProps | UpdateModalProps
  >({
    name: "Add",
    type: "add",
  });
  const { data, loading } = useFetch<DataType[]>("/posts?_start=0&_limit=20");

  const intl = useIntl();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const postState = useAppSelector((state) => state.post);

  const newData = useMemo(
    () =>
      data ? [...(data as DataType[]), ...(postState.posts as DataType[])] : [],
    [data, postState.posts]
  );

  const showModal = (record: AddModalProps | UpdateModalProps) => {
    setModalProps({ ...record });
    if (record.type === "update") {
      const recordFounded = newData.find(
        (item) => item.id === (record as UpdateModalProps).id
      );
      form.setFieldsValue({ ...recordFounded });
    } else {
      form.resetFields();
    }

    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: DataType) => {
    const { id, ...rest } = values;

    if (modalProps?.type === "add") {
      dispatch(createPost({ ...rest }));
    }
    if (modalProps?.type === "update") {
      dispatch(updatePost(values));
    }
    form.resetFields();
  };

  const confirm = (id: number | undefined) => {
    dispatch(deletePost(id));
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      key: "body",
      dataIndex: "body",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            onClick={() =>
              showModal({
                ...record,
                name: intl.formatMessage({ id: "modal.title.update" }),
                type: "update",
              })
            }
          >
            <FormattedMessage id="edit" />
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => confirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger ghost>
              <FormattedMessage id="delete" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        okButtonProps={{
          form: "create-form",
          htmlType: "submit",
        }}
        title={<FormattedMessage id="modal.title.create" />}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
      >
        <Form
          id="create-form"
          layout="vertical"
          form={form}
          name="register"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="id"
            label="Id"
            rules={[
              {
                required: true,
                message: "Please input ID",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="userId"
            label="User Id"
            rules={[
              {
                required: true,
                message: "Please input userId",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="body"
            label="Body"
            rules={[
              {
                required: true,
                message: "Please confirm your body!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Flex vertical gap={10}>
        <Button
          className="justify-start w-max"
          type="primary"
          onClick={() =>
            showModal({
              name: "Add new record",
              type: "add",
            })
          }
        >
          <FormattedMessage id="add" />
        </Button>
        <Table
          rowSelection={{
            type: "checkbox",
          }}
          dataSource={newData as DataType[]}
          loading={loading || postState.status === "pending" ? true : false}
          columns={columns}
          rowKey={(record) => record.id + ""}
        />
      </Flex>
    </>
  );
};
export default Option;
