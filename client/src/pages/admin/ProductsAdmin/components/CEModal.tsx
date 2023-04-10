import { Form, Input, Modal, Select, notification } from "antd";
import React, { useEffect } from "react";
import { TProduct } from "../../../../@types/product.type";
import { getCategories } from "../../../../api/category.api";
import { TCategory } from "../../../../@types/category.type";
import { createProduct, updateProduct } from "../../../../api/product.api";

type IProps = {
  productEdit?: TProduct | null;
  setProductEdit: React.Dispatch<React.SetStateAction<TProduct | null>>;
  isOpenCEModal: boolean;
  setIsOpenCEModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProducts: React.Dispatch<React.SetStateAction<TProduct[]>>;
};
export default function CEModal({
  isOpenCEModal,
  setIsOpenCEModal,
  setProductEdit,
  productEdit,
  setProducts,
}: IProps) {
  const [form] = Form.useForm();
  const [categories, setCategories] = React.useState<TCategory[]>([]);
  useEffect(() => {
    async function fetchAllCategories() {
      const { data } = await getCategories();
      setCategories(data.data as TCategory[]);
    }
    fetchAllCategories();
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      name: productEdit?.name,
      price: productEdit?.price,
      description: productEdit?.description,
      categoryId: productEdit?.categoryId,
      image: productEdit?.image,
    });
  }, [productEdit]);

  const onClose = () => {
    form.resetFields();
    setProductEdit(null);
    setIsOpenCEModal(false);
  };

  const onFinish = (values: any) => {
    if (productEdit) {
      (async () => {
        const { data } = await updateProduct(productEdit._id, values);
        setProducts((prev) => {
          return prev.map((product) => {
            if (product._id === productEdit._id) {
              return { ...product, ...values };
            }
            return product;
          });
        });
        notification.success({ message: data.message });
      })();
    } else {
      (async () => {
        const { data } = await createProduct(values);
        setProducts((prev) => {
          return [data.data as TProduct, ...prev];
        });
        notification.success({ message: data.message });
      })();
    }
    onClose();
  };

  return (
    <Modal
      open={isOpenCEModal}
      title="Create/Edit incorporation type"
      onOk={() => form.submit()}
      onCancel={onClose}
      okText="Save"
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "name is required!",
            },
          ]}
        >
          <Input placeholder="Please type" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: "Price is required!",
            },
          ]}
        >
          <Input placeholder="Please type price" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Description is required!",
            },
          ]}
        >
          <Input placeholder="Please type description" />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          rules={[
            {
              required: true,
              message: "Image is required!",
            },
          ]}
        >
          <Input placeholder="Please type image link" />
        </Form.Item>
        <Form.Item name="categoryId">
          <Select placeholder="Select a category" optionFilterProp="children">
            {categories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
