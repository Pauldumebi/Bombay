import { PropsWithChildren, useState } from "react";
import { Layout, Menu, theme } from "antd";
import { defaultNavItems } from "./nav-items";
import { Link, useLocation } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const Index = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation()

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} breakpoint="lg">
        <div style={{ height: 12, margin: 10 }}></div>

        <Menu
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
		  theme="dark"
        >
          {defaultNavItems.map(item => {
            return (
              <Menu.Item key={item.path} icon={item.icon}>
                <Link to={item.path}>
                  {item.label}
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Index;
