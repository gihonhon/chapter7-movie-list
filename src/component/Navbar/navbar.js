import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as SearchIcon } from "@fortawesome/free-solid-svg-icons";
import {
  faEnvelope as emailIcon,
  faEye as eyeIcon,
  faEyeSlash as eyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Logo, account } from "../../asset/index_image";
import "./navbar.css";

// import Login from "../modal/login";
// import Register from "../modal/register";

const NavBar = () => {
  const navigate = useNavigate();

  const searchRes = async (e) => {
    e.preventDefault();
    let data = e.target[0].value;

    navigate(`/search/${data}`);
  };

  // validation
  let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Login & Register State
  const [login, setLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowProfile = () => setShowProfile(true);
  const handleCloseProfile = () => setShowProfile(false)

  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [sandi, setSandi] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailRegis, setEmailRegis] = useState("");
  const [sandiRegis, setSandiRegis] = useState("");
  const [sandiConfirm, setSandiConfirm] = useState("");

  const [showPass, setShowPass] = useState(true);
  const [pass, setPass] = useState("password");
  const [typeInput, setTypeInput] = useState(false);

  const Eye = () => {
    if (pass === "password") {
      setPass("text");
      setShowPass(false);
      setTypeInput(true);
    } else {
      setPass("password");
      setShowPass(true);
      setTypeInput(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://notflixtv.herokuapp.com/api/v1/users/login",
        {
          email: email,
          password: sandi,
        }
      );
      localStorage.setItem("token", JSON.stringify(res.data.data.token));
      localStorage.setItem("user", JSON.stringify(res.data.data.first_name));
      localStorage.setItem("image", JSON.parse(res.data.data.image));
      localStorage.setItem("log", JSON.stringify(res.data.data));
      setUser(res.data.data);
      setSandi("");
      setEmail("");
      setShowLogin(false);
      setLogin(true);
      Swal.fire("Tolol!", "Login Berhasil", "success");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Blokk",
        text: "Dasar tolol",
      });
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    setLogin(token);
    setLogin(true);
    const user = JSON.parse(localStorage.getItem("log"));
    setUser(user);
  }, [login]);

  const handleSubmitRegis = async () => {
    try {
      const resReg = await axios.post(
        "https://notflixtv.herokuapp.com/api/v1/users",
        {
          first_name: firstName,
          last_name: lastName,
          email: emailRegis,
          password: sandiRegis,
          password_confirmation: sandiConfirm,
        }
      );
      setShowRegister(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "oops..",
        text: "Email or Password Wrong!",
      });
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Log Out",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Succes Log Out", "", "success");
        setTimeout(function () {
          window.location.reload(1);
        }, 1500);
        localStorage.clear();
      } else if (result.isDenied) {
        Swal.fire("Cancel", "", "info");
      }
    });
  };


  let token = localStorage.getItem("token");
  let profile = localStorage.getItem("user");
  let image = localStorage.getItem("image");

  // const [passConfirm, setPassConfirm] = useState("")

  return (
    <Navbar bg="transparant">
      <Container fluid>
        <Nav style={{ cursor: "pointer" }}>
          <img
            style={{ marginLeft: "2rem" }}
            src={Logo}
            onClick={() => navigate("/")}
          />
        </Nav>
        <Nav className="nav__search">
          <Form className="d-flex" onSubmit={(e) => searchRes(e)}>
            <Form.Control
              type="text"
              name="search"
              aria-label="Search"
              placeholder="What do you want to watch?"
            />
            <FontAwesomeIcon icon={SearchIcon} />
          </Form>
        </Nav>

        {token && login && token.length ? (
          <Nav className="nav_login" style={{display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center', paddingRight: '3rem'}}>
            <h2 style={{fontSize: '1.25rem', lineHeight: '1.75rem', color: 'white'}}>Halo, {JSON.parse(profile)}</h2>

            {user.image || user.picture ? (
              <img onClick={handleShowProfile} className="profile-picture" src={JSON.parse(image) || JSON.parse(user.picture)} />
            ) : (
              <img className="profile-picture" src={account} />
            )}

            <Modal
            size="md"
            show={showProfile}
            onHide={handleCloseProfile}
            backdrop="static"
            keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "16px" }}>
                  Your Account
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form></Form>
              </Modal.Body>
              <Modal.Footer style={{ justifyContent: "flex-start" }}>
                <Button variant="danger" onClick={handleLogout}>Log Out</Button>
              </Modal.Footer>
            </Modal>
          </Nav>
          
        ) : (
          <Nav className="nav__button">
            <Button variant="outline-danger" onClick={handleShowLogin}>
              Login
            </Button>

            <Modal
              size="md"
              show={showLogin}
              onHide={handleCloseLogin}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "16px" }}>
                  Log in Your Account
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group style={{ marginBottom: "1.5rem" }}>
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        borderRadius: "9999px",
                        border: "1px solid rgba(153, 153, 153, 1)",
                        color: "black",
                      }}
                    />
                    {email.match(emailRegex) === null ? (
                      <span style={{color: 'red'}}>Please Input a Valid Email</span>
                    ) : (
                      ""
                    )}
                    <div className="icon icon-email">
                      <FontAwesomeIcon icon={emailIcon} />
                    </div>
                  </Form.Group>

                  <Form.Group style={{ marginBottom: "1.5rem" }}>
                    <Form.Control
                      style={{
                        border: "1px solid rgba(153, 153, 153, 1)",
                        color: "black",
                        borderRadius: "9999px",
                      }}
                      type={pass}
                      placeholder="Password"
                      onChange={(e) => setSandi(e.target.value)}
                      className={`${typeInput ? "typeInputPass" : ""} formPass`}
                    />
                    <div className="icon icon-pass">
                      <FontAwesomeIcon
                        onClick={Eye}
                        icon={showPass ? eyeIcon : eyeSlash}
                      />
                    </div>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer style={{ justifyContent: "flex-start" }}>
                <Button type="submit" variant="danger" onClick={handleSubmit}>
                  Login
                </Button>
                {/* Todo */}
                <GoogleLogin
                size="large"
                text="continue_with"
                onSuccess={(response) => {
                  console.log(response);
                  let decode = jwt_decode(response.credential);
                  console.log(decode);
                  localStorage.setItem("token", JSON.stringify(response.credential));
                  localStorage.setItem("image", JSON.stringify(decode.picture));
                  localStorage.setItem("user", JSON.stringify(decode.name));
                  localStorage.setItem("log", JSON.stringify(decode));
                  setUser(decode);
                  setLogin(true);
                  Swal.fire("Login Success", "", 'success');
                }}
                onError={() => {
                  console.log('Login Failed')
                }}
                />
              </Modal.Footer>
            </Modal>

            <Button variant="danger" onClick={handleShowRegister}>
              Register
            </Button>
            <Modal
              size="md"
              show={showRegister}
              onHide={handleCloseRegister}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "16px" }}>
                  Create Account
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group style={{ marginBottom: "1.5rem" }}>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                      style={{
                        borderRadius: "9999px",
                        border: "1px solid rgba(153, 153, 153, 1)",
                        color: "black",
                      }}
                    />
                  </Form.Group>

                  <Form.Group style={{ marginBottom: "1.5rem" }}>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                      style={{
                        borderRadius: "9999px",
                        border: "1px solid rgba(153, 153, 153, 1)",
                        color: "black",
                      }}
                    />
                  </Form.Group>

                  <Form.Group style={{ marginBottom: "1.5rem" }}>
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      onChange={(e) => setEmailRegis(e.target.value)}
                      style={{
                        borderRadius: "9999px",
                        border: "1px solid rgba(153, 153, 153, 1)",
                        color: "black",
                      }}
                    />
                    <div className="icon icon-emailRegis">
                      <FontAwesomeIcon icon={emailIcon} />
                    </div>
                  </Form.Group>

                  <Form.Group style={{ marginBottom: "1.5rem" }}>
                    <Form.Control
                      type={pass}
                      placeholder="Password"
                      onChange={(e) => setSandiRegis(e.target.value)}
                      style={{
                        borderRadius: "9999px",
                        border: "1px solid rgba(153, 153, 153, 1)",
                        color: "black",
                      }}
                      className={`${typeInput ? "type_password" : ""} formPass`}
                    />
                    <div className="icon icon-passRegis">
                      <FontAwesomeIcon
                        onClick={Eye}
                        icon={showPass ? eyeIcon : eyeSlash}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group style={{ marginBottom: "1.5rem" }}>
                    <Form.Control
                      type={pass}
                      placeholder="Password Confirmation"
                      onChange={(e) => setSandiConfirm(e.target.value)}
                      style={{
                        borderRadius: "9999px",
                        border: "1px solid rgba(153, 153, 153, 1)",
                        color: "black",
                      }}
                      className={`${typeInput ? "type_password" : ""} formPass`}
                    />
                    <div className="icon icon-passRegisConf">
                      <FontAwesomeIcon
                        onClick={Eye}
                        icon={showPass ? eyeIcon : eyeSlash}
                      />
                    </div>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer style={{ justifyContent: "flex-start" }}>
                <Button variant="danger" onClick={handleSubmitRegis}>
                  Register Now
                </Button>
              </Modal.Footer>
            </Modal>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
