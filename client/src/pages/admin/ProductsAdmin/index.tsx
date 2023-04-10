import {
  Button,
  Col,
  Image,
  Input,
  Popconfirm,
  Row,
  Space,
  Table,
  notification,
} from "antd";
import React, { useEffect } from "react";
import { deleteProduct, getProducts } from "../../../api/product.api";
import {
  EOrderBy,
  ESortBy,
  TProduct,
  TQueryParamsProduct,
} from "../../../@types/product.type";
import { ColumnsType } from "antd/es/table";
import { TResError } from "../../../@types/common.type";
import CEModal from "./components/CEModal";

const baseQueryParams = {
  _page: 1,
  _limit: 4,
  _orderBy: EOrderBy.DESC,
  _sortBy: ESortBy.CREATED_AT,
};

export default function ProductsAdmin() {
  const [products, setProducts] = React.useState<TProduct[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [params, setParams] =
    React.useState<TQueryParamsProduct>(baseQueryParams);
  const [isOpenCEModal, setIsOpenCEModal] = React.useState(false);
  const [productEdit, setProductEdit] = React.useState<TProduct | null>(null);

  useEffect(() => {
    const fetchAllProduct = async () => {
      const { data } = await getProducts(params);
      setProducts(data.data?.docs as TProduct[]);
      setTotal(data.data?.totalDocs as number);
    };
    fetchAllProduct();
  }, [params]);

  const handleDelete = async (id: string) => {
    try {
      const { data } = await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
      notification.success({ message: data.message });
    } catch (error) {
      notification.error({ message: (error as TResError).message });
    }
  };
  const columns: ColumnsType<TProduct> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      sorter: true,
      filterSearch: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
    },
    {
      title: "Image",
      key: "image",
      render(_: any, record: TProduct) {
        return (
          <Image src={record.image} alt={record.name} width={120} height={60} />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render(_: any, record: TProduct) {
        return (
          <Space size={5}>
            <Button
              onClick={() => {
                setIsOpenCEModal(true);
                setProductEdit(record);
              }}
              type="link"
            >
              Edit
            </Button>
            <Popconfirm
              placement="topRight"
              title="Are you sure?"
              onConfirm={() => handleDelete(record._id)}
            >
              <Button type="link">Delete</Button>
            </Popconfirm>
          </Space>
        );
      },
      fixed: "right",
      width: 180,
    },
  ];

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    const { current, pageSize } = pagination;
    const { order, field } = sorter;
    const _page = current;
    const _limit = pageSize;
    const _sort = field;
    const _order = order === "ascend" ? EOrderBy.ASC : EOrderBy.DESC;
    setParams({ ...params, _page, _limit, _sortBy: _sort, _orderBy: _order });
  };
  console.log(params);
  return (
    <div>
      <Row justify="space-between">
        <Col>
          <Button
            onClick={() => {
              setIsOpenCEModal(true);
              setProductEdit(null);
            }}
            style={{ marginBottom: 12 }}
            type="primary"
          >
            Add+
          </Button>
        </Col>
        <Col>
          <Input.Search
            onSearch={(value) => {
              setParams((prev) => ({ ...prev, _page: 1, _search: value }));
            }}
            name="search"
            placeholder="Search"
            allowClear
          />
        </Col>
      </Row>
      <Table
        pagination={{
          current: params._page || 1,
          pageSize: params._limit,
          total,
          showSizeChanger: true,
          pageSizeOptions: ["4", "8", "12"],
        }}
        onChange={handleChange}
        dataSource={products}
        columns={columns}
      />
      <CEModal
        isOpenCEModal={isOpenCEModal}
        setIsOpenCEModal={setIsOpenCEModal}
        setProductEdit={setProductEdit}
        productEdit={productEdit}
        setProducts={setProducts}
      />
    </div>
  );
}
