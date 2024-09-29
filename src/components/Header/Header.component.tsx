import { Link } from "react-router-dom";
import { checkIfLoggedIn } from "../../services/checkIfLoggedIn";
import { MainContext } from "../../context/StoreProvider.tsx";

import { logout } from "../../services/logout.ts";
import { Button, Modal } from "antd";
import { useState, useContext } from "react";
import { multipleProjectsdownloadRequest } from "../../requests/Project/download-multiple.project.request.ts";
import { ProjectData } from "../../requests/Project/get.projects.request.ts";

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
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container-fluid">
        <span className="navbar-brand">Project X</span>
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
                <Button type="link" onClick={showModal} className="nav-link text-light">
                  Cart
                </Button>
                <Link to="/logout" className="nav-link text-light" onClick={logout}>
                  logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        title="Cart"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        styles={{
          body: {
            maxHeight: "50vh",
            overflowY: "auto",
          },
        }}
        width={800}
        okText="Download all"
        okButtonProps={{ danger: true, disabled: cart.length <= 0 }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        {cart.length > 0 ? (
          cart.map((project: ProjectData, idx: number) => {
            return (
              <div key={idx} className={"d-flex justify-content-start gap-3 card p-3 m-2 max-h-64"}>
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p>
                      <b>{project.name}</b> <small>{project.description}</small>
                    </p>
                    <div className={"d-flex justify-content-start gap-2 flex-reverse"}>
                      <button className={`btn btn-sm btn-danger float-end`} onClick={() => console.log("test")}>
                        ↓
                      </button>
                      <button className={`btn btn-sm btn-danger float-end`} onClick={() => removeFromCart(project)}>
                        -
                      </button>
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
    </nav>
  );
}
