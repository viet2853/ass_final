import React from "react";
import { Layout, Typography, Menu, MenuProps } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const items2: MenuProps["items"] = [
  getItem(<Link to="/admin">Dashboard</Link>, "1", <PieChartOutlined />),
  getItem(<Link to="/admin/products">Product</Link>, "2", <DesktopOutlined />),
  getItem(
    <Link to="/admin/categories">Category</Link>,
    "3",
    <ContainerOutlined />
  ),
  getItem(<Link to="/admin/users">User</Link>, "4", <UserAddOutlined />),
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Title } = Typography;
  const { Header, Content, Footer, Sider } = Layout;
  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Link to="/">
          <Title style={{ color: "#fff", margin: 0 }} level={3}>
            VIETNT
          </Title>
        </Link>
      </Header>
      <Layout>
        <Sider width={200} theme="dark">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#fff",
            }}
          >
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
