import { Link } from "react-router-dom";
import { checkIfLoggedIn } from "../../services/checkIfLoggedIn";
import { MainContext } from "../../context/StoreProvider.tsx";
import logo from "../../assets/images/back_logo.svg";
import { logout } from "../../services/logout.ts";
import { useState, useContext } from "react";
import { multipleProjectsdownloadRequest } from "../../requests/Project/download-multiple.project.request.ts";
import { ProjectData } from "../../requests/Project/get.projects.request.ts";
import { OverlayProvider } from "@uk-source-web/overlay-controller";
import Button from "@uk-source-web/button";
import { Modal, Button as ButtonAntd } from "antd";
export default function Header() {
  const isLoggedIn = checkIfLoggedIn();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // @ts-ignore
  const { cart, removeFromCart } = useContext(MainContext);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const names = cart.map((repo: ProjectData) => repo.name);
    await multipleProjectsdownloadRequest(names);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#E60000" }}>
      <div className="container-fluid">
        <img src={logo} width={40} alt="logo" className="p-2" style={{ color: "black" }} />
        <span className="navbar-brand ml-2">Project X</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse gap-2" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
          </ul>

          <div>
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="nav-link text-light">
                  Login
                </Link>
                <Link to="/register" className="nav-link text-light">
                  Register
                </Link>
              </>
            ) : (
              <div className="d-flex gap-2 align-items-center">
                <ButtonAntd type="link" onClick={showModal} className="nav-link text-light">
                  Cart
                </ButtonAntd>
                <Link to="/logout" className="nav-link text-light" onClick={logout}>
                  logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <OverlayProvider>
        <Modal
          title="Cart"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
          okText="Download all"
          okButtonProps={{
            disabled: cart.length <= 0,
            style: {
              backgroundColor: "#E60000",
              padding: "16px 24px",
              height: "44px",
              minWidth: "152px",
              fontWeight: "400",
              color: "#FFFFFF",
              borderRadius: "6px",
            },
          }}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          {cart.length > 0 ? (
            cart.map((project: ProjectData, idx: number) => {
              return (
                <div key={idx} className={"d-flex justify-content-start gap-3 card p-3 m-3 max-h-64"}>
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p>
                        <b>{project.name}</b> <small>{project.description}</small>
                      </p>
                      <div className={"d-flex justify-content-start gap-2 flex-reverse"}>
                        <Button text="Remove" appearance="primary" onClick={() => removeFromCart(project)} />
                      </div>
                    </div>
                    <p>{project.html_url}</p>
                    <p>
                      <small>
                        {new Date(project.created_at).toUTCString()} / {project.size / 1000} MB
                      </small>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center">Cart is Empty</p>
          )}
        </Modal>
      </OverlayProvider>
    </nav>
  );
}
