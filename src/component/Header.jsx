
import React, { useContext } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Avatar, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { UserContext } from "../context/UseContext";
import { CartContext } from "../context/CartContext";
export const AcmeLogo = () => (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
        <path
            clipRule="evenodd"
            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </svg>
);

function Header() {
    const { user } = useContext(UserContext);
    const { product } = useContext(CartContext)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    console.log('--product---->', product);

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];


    return (

        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <AcmeLogo />
                    <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive>
                    <Link to='/' color="foreground"  >
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem >
                    <Link href="#" aria-current="page">
                        Contact Us
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        About us
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {
                    user.isLogin ? <NavbarItem className="hidden lg:flex">
                        <Avatar className="flex justify-content-center  align-items-center" src={user.userInfo.photoUrl} size="md" />
                        <Link to={'/profile'} className=" ms-2 pt-1" >Profile</Link>


                    </NavbarItem> :
                        <NavbarItem className="hidden lg:flex">
                            <Link to={'/signin'} >Login</Link>
                        </NavbarItem>


                }
                <Link to={'/cart'}>
                    <Badge count={product.length} >

                        <ShoppingCartOutlined className="text-2xl" />
                    </Badge>
                </Link>

                <NavbarItem>
                    <Button to={'/signup'} as={Link} color="primary" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}

export default Header