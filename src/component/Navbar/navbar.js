import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onLogin, onRegister } from "../../reducer/logRegSlice";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { Modal, Input, Form } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as SearchIcon } from "@fortawesome/free-solid-svg-icons";
import {
  faEnvelope as emailIcon,
  faCircleUser as usersIcons,
} from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "antd/dist/antd.css";
import { Logo, account } from "../../asset/index_image";
import "./navbar.css";

const NavigateBar = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isModalRegisOpen, setIsModalRegisOpen] = useState(false);
  const [isModalProfileOpen, setIsModalProfileOpen] = useState(false);

  const [form] = Form.useForm();

  // Login
  const showModalLogin = () => {
    setIsModalLoginOpen(true);
  };
  const handleOkLogin = () => {
    setIsModalLoginOpen(false);
  };
  const handleCancelLogin = () => {
    setIsModalLoginOpen(false);
  };

  // Regis
  const showModalRegis = () => {
    setIsModalRegisOpen(true);
  };
  const handleOkRegis = () => {
    setIsModalRegisOpen(false);
  };
  const handleCancelRegis = () => {
    setIsModalRegisOpen(false);
  };

  // Profile
  const showModalProfile = () => {
    setIsModalProfileOpen(true);
  };
  const handleOkProfile = () => {
    setIsModalProfileOpen(false);
  };
  const handleCancelProfile = () => {
    setIsModalProfileOpen(false);
  };

  // handleEvent
  const handleChangeSearch = (e) => {
    setData(e.target.value);
  };

  const onSubmitSearch = () => {
    navigate(`search/${data}`);
  };

  const onFinishLogin = async (values) => {
    dispatch(onLogin(values));
    setIsModalLoginOpen(false);
    form.resetFields();
  };

  const onFinishRegis = async (values) => {
    dispatch(onRegister(values));
    setIsModalRegisOpen(false);
    form.resetFields();
  };

  const isUserLogin = JSON.parse(localStorage.getItem("token"));
  const name = JSON.parse(localStorage.getItem("name"));
  const image = JSON.parse(localStorage.getItem("image"));

  const logOut = () => {
    Swal.fire({
      title: "Sure to Log Out?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Log Out Success", "Bye Users", "success");
        setTimeout(function () {
          window.location.reload(1);
        }, 1500);
        localStorage.clear();
      } else if (result.isDenied) {
        Swal.fire("Cancel", "", "info");
      }
    });
  };

  return (
    <GoogleOAuthProvider clientId="67751698887-k04h2k8e4sirhvgj6chtevcb0cqok6q8.apps.googleusercontent.com">
      <div className="container__navigate">
        <img className="logo__nav" src={Logo} onClick={() => navigate("/")} />
        <div className="search__nav">
          <input
            type="text"
            placeholder="What do you want to search"
            onChange={(e) => handleChangeSearch(e)}
            onSubmit={() => onSubmitSearch()}
          />
          <FontAwesomeIcon
            style={{ paddingRight: "0", fontSize: "1rem" }}
            icon={SearchIcon}
            onClick={() => onSubmitSearch()}
          />
        </div>

        <div className="login__regis">
          {isUserLogin === null ? (
            <>
              <button onClick={showModalLogin} className="login__btn">
                Login
              </button>
              <Modal
                title="Log in to your account"
                open={isModalLoginOpen}
                onOk={handleOkLogin}
                onCancel={handleCancelLogin}
                footer={null}
              >
                <Form
                  name="login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinishLogin}
                  form={form}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Please Input a Valid Email",
                      },
                      {
                        required: true,
                        message: "Please input your E-mail",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Email Address"
                      suffix={<FontAwesomeIcon icon={emailIcon} />}
                      style={{ borderRadius: "9999px", marginBottom: "0.5rem" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Password"
                      style={{ borderRadius: "9999px", marginBottom: "0.5rem" }}
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: "0" }}>
                    <div className="button__submit">
                      <button type="submit">Login</button>

                      <div className="google__login">
                        <GoogleLogin
                          onSuccess={(response) => {
                            // localStorage.setItem(
                            //     "token",
                            //     JSON.stringify(credentialResponse.credential)
                            //   );
                            //   localStorage.setItem(
                            //     "name",
                            //     JSON.stringify("Google")
                            //   );
                            //   localStorage.setItem(
                            //     "image",
                            //     JSON.stringify(
                            //       "https://assets.nationbuilder.com/themes/5d1ad55ac2948011ce17704b/attachments/original/1553643295/login.png?1553643295"
                            //     )
                            //   );
                            let decode = jwt_decode(response.credential);
                            localStorage.setItem(
                              "token",
                              JSON.stringify(response.credential)
                            );
                            localStorage.setItem(
                              "name",
                              JSON.stringify(decode.name)
                            );
                            localStorage.setItem(
                              "image",
                              JSON.stringify(decode.picture)
                            );
                            Swal.fire("Login Success", "Success", "success");
                            setTimeout(function () {
                              window.location.reload(1);
                            }, 1500);
                          }}
                          onError={() => {
                            console.log("error");
                          }}
                          shape="circle"
                        />
                      </div>
                    </div>
                  </Form.Item>
                </Form>
              </Modal>
              <button onClick={showModalRegis} className="regis__btn">
                Register
              </button>
              <Modal
                title="Create Your Account"
                open={isModalRegisOpen}
                onOk={handleOkRegis}
                onCancel={handleCancelRegis}
                footer={null}
              >
                <Form
                  className="regis__form"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinishRegis}
                >
                  <Form.Item
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="First Name"
                      suffix={<FontAwesomeIcon icon={usersIcons} />}
                      style={{ borderRadius: "9999px", marginBottom: "0.5rem" }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="last_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Last Name"
                      suffix={<FontAwesomeIcon icon={usersIcons} />}
                      style={{ borderRadius: "9999px", marginBottom: "0.5rem" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please Input your E-mail",
                      },
                      {
                        type: "email",
                        message: "Please input valid E-mail",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Email Address"
                      suffix={<FontAwesomeIcon icon={emailIcon} />}
                      style={{ borderRadius: "9999px", marginBottom: "0.5rem" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Password"
                      style={{ borderRadius: "9999px", marginBottom: "0.5rem" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirm_password"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Your Confirmation Password not valid")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Password Confirmation"
                      style={{ borderRadius: "9999px", marginBottom: "0.5rem" }}
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: "0" }}>
                    <div className="button__submit">
                      <button type="submit">Register</button>
                    </div>
                  </Form.Item>
                </Form>
              </Modal>
            </>
          ) : (
            <>
              <div className="profile__wrapper">
                <div className="profile__display" onClick={showModalProfile}>
                  <h3>{name}</h3>
                  <img src={account} />

                  {/* <img src={
                                    image === null ? "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png" : profile
                                }/> */}
                </div>
                <Modal
                  title="Profile Menu"
                  open={isModalProfileOpen}
                  onOk={handleOkProfile}
                  onCancel={handleCancelProfile}
                  footer={null}
                >
                  <Form.Item style={{ marginBottom: "0" }}>
                    <div className="button__submit">
                      <button onClick={logOut}>logOut</button>
                    </div>
                  </Form.Item>
                </Modal>
              </div>
              {/* <button onClick={logOut} className="regis__btn">Log Out</button> */}
            </>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default NavigateBar;
