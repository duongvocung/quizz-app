import { Dropdown, Menu } from "antd";
import React from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function Header() {
   const  navigator = useNavigate()

    function handleMenuClick(e) {
        if (e.key === 'abc') {
            localStorage.clear()
            navigator('/')
        }
   
    }

   

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item
            key={`abc`}
                >
                <div
                >
                    Sign out
                </div>
                
            </Menu.Item>
        </Menu>
    );
    return (
        <div style={{display:"flex" , justifyContent:"space-around"}}>
            <h3>Quizz App</h3>
            <Dropdown overlay={menu}>
                <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                >
                    {localStorage.getItem('user')} <DownOutlined />
                </a>
            </Dropdown>
        </div>
    );
}

export default Header;
