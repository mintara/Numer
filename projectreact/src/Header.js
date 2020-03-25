import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;

class Header extends Component {
    rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5'];
    state = {
        openKeys: ['sub1'],
      };
    
      onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
      };
    render() {
        return (
            <div className="App">
                <Menu 
                    mode="horizontal"
                    style={{background:''}}
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                >
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="appstore" />
                                <span>Root of Equation</span>
                            </span>
                        }

                    >
                        <Menu.Item key="1"><a href="/bisection">Bisection</a></Menu.Item>
                        <Menu.Item key="2"><a href="/falseposition">False position</a></Menu.Item>
                        <Menu.Item key="3"><a href="/onepoint">Onepoint</a></Menu.Item>
                        <Menu.Item key="4"><a href="/newton">Newton-Raphson</a></Menu.Item>
                        <Menu.Item key="5"><a href="/secant">Secant</a></Menu.Item>
                        <Menu.Item key="6"><a href="/taylor">Taylor</a></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub3"
                        title={
                            <span>
                                <Icon type="appstore" />
                                <span>Linear Algebra</span>
                            </span>
                        }
                    >
                        <Menu.Item key="7"><a href="/cramer">Cramer-Rule</a></Menu.Item>
                        <Menu.Item key="8"><a href="/gauss">Gauss</a></Menu.Item>
                        <Menu.Item key="9"><a href="/jacobi">Jacobi</a></Menu.Item>
                        <Menu.Item key="10"><a href="/lu">LU</a></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub4"
                        title={
                            <span>
                                <Icon type="setting" />
                                <span>Integrate</span>
                            </span>
                        }
                    >   
                        <Menu.Item key="11"><a href="/ntrapzaidol">Trapzaidol</a></Menu.Item>
                        <Menu.Item key="12"><a href="/nsimson">Simson</a></Menu.Item>
                        <Menu.Item key="13"><a href="/trapzaidol">Composite Trapzaidol</a></Menu.Item>
                        <Menu.Item key="14"><a href="/simson">Composite Simson</a></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default Header;