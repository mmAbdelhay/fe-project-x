import Container from "./Home.style";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/StoreProvider.tsx";
import { getProjectsRequest, ProjectData } from "../../requests/Project/get.projects.request.ts";
import LoadingCube from "../../components/SmallComponents/Loading/LoadingCube.tsx";
import { downloadProjectRequest } from "../../requests/Project/download.project.request.ts";
import { Drawer } from "antd";
import { getProjectsByTagRequest } from "../../requests/Project/list-by-tag.projects.request.ts";
import { getReadmeFileRequest } from "../../requests/Project/get-readme.project.request.ts";
import SearchInput from "@uk-source-web/search-input";
import Button from "@uk-source-web/button";
import Paragraph from "@uk-source-web/paragraph";

function Home(): JSX.Element {
  // @ts-ignore
  const { user, addToCart } = useContext(MainContext);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [readMeFileContent, setReadMeFileContent] = useState<string>("");

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    setLoading(true);
    const projects = await getProjectsRequest();
    if (projects) {
      setTimeout(() => {
        setProjects(projects);
        setLoading(false);
      }, 2500);
    } else {
      setErrorMessage("No projects found");
      setLoading(false);
    }
  };

  const handleTagChange = async () => {
    const projects: ProjectData[] = await getProjectsByTagRequest(search);
    if (projects) {
      setProjects(projects);
      setErrorMessage("");
    } else {
      setErrorMessage("No projects found");
    }
  };

  const handleGetReadmeFileBtn = async (repo: string) => {
    setReadMeFileContent("");
    setOpenDrawer(true);
    const response = await getReadmeFileRequest(repo);
    if (response) {
      setReadMeFileContent(response);
    } else {
      setReadMeFileContent("No Readme File Found");
    }
  };

  if (loading) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center" style={{ top: "250px" }}>
        <LoadingCube />
      </div>
    );
  }

  if (errorMessage.length) {
    return (
      <Container className={"container mt-3"}>
        <div className={"d-flex justify-content-between"}>
          <div>
            <p>Welcome {user?.email} to project-x</p>
          </div>
        </div>
        <div className="w-25 my-2 mx-3">
          <SearchInput
            textInput={{
              id: "search",
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
              placeholder: "Search by tag",
            }}
            fieldWrapper={{
              width: "default",
              label: "",
              showLabel: false,
            }}
            onClear={() => setSearch("")}
            searchIconButton={{
              onClick: handleTagChange,
            }}
          />
        </div>
        <div className="text-center">{errorMessage}</div>
      </Container>
    );
  }

  return (
    <Container className={"container mt-3"}>
      <div className={"d-flex justify-content-between"}>
        <div>
          <p>Welcome {user?.email} to project-x</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SearchInput
          textInput={{
            id: "search",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
            placeholder: "Search by tag",
          }}
          fieldWrapper={{
            width: "default",
            label: "",
            showLabel: false,
          }}
          searchIconButton={{
            onClick: handleTagChange,
          }}
        />
        {projects?.length > 0 &&
          projects?.map((project: ProjectData, idx: number) => {
            return (
              <div key={idx} className={"d-flex justify-content-start gap-3 card p-3 m-2"}>
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p>
                      <b>{project.name}</b> <small>{project.description}</small>
                      <button
                        className={`btn btn-sm btn-outline ml-4`}
                        onClick={() => handleGetReadmeFileBtn(project.name)}
                      >
                        📖
                      </button>
                    </p>
                    <div className={"d-flex justify-content-start gap-2 flex-reverse"}>
                      <Button
                        text="Download"
                        appearance="primary"
                        onClick={() => {
                          downloadProjectRequest(project.name);
                        }}
                      />
                      <Button
                        text="Add to cart"
                        appearance="primary"
                        onClick={() => {
                          addToCart(project);
                        }}
                      />
                    </div>
                  </div>
                  <Paragraph size={2}> {project.html_url}</Paragraph>
                  <Paragraph size={1}>
                    {new Date(project.created_at).toUTCString()} / {project.size / 1000} MB
                  </Paragraph>
                </div>
                <Drawer title="Readme File" open={openDrawer} onClose={() => setOpenDrawer(false)} width={1024}>
                  <div dangerouslySetInnerHTML={{ __html: readMeFileContent }} />
                </Drawer>
              </div>
            );
          })}
      </div>
    </Container>
  );
}

export default Home;
