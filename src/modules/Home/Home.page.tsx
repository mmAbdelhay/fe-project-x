import Container from "./Home.style"
import Image from "../../assets/images/Logo_vodafone.png";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {MainContext} from "../../context/StoreProvider.tsx";
import {getProjectsRequest, ProjectData} from "../../requests/Project/get.projects.request.ts";
import {deleteProjectRequest} from "../../requests/Project/delete.project.request.ts";

function Home(): JSX.Element {
    // @ts-ignore
    const {user} = useContext(MainContext);
    const [projects, setProjects] = useState<ProjectData[]>([])

    useEffect(() => {
        (async () => {
            let projects = await getProjectsRequest();
            setProjects(projects)
        })()
    }, []);

    const deleteProject = (project: ProjectData) => {
        deleteProjectRequest(project.id).then(() => {
            setProjects(prevState => prevState.filter(obj => obj.id !== project.id))
        })
    }

    return (
        <Container className={'container mt-3'}>
            <div className={'d-flex justify-content-between'}>
                <div>
                    <p>Welcome {user?.name} to project-x</p>
                    <p>Logged in email: {user?.email}</p>
                </div>
            </div>
            <div className={'d-flex justify-content-center align-content-center mt-5'}>
                <img src={Image} width={200} alt="image"/>
            </div>
            <div>
                <h5>Your projects</h5>
                <ul className={'p-3'}>
                    {projects.length > 0 && projects.map(project => {
                        return (
                            <div key={project.id} className={'d-flex justify-content-start gap-3'}>
                                <li className={'mt-3'}>
                                    <div>Name : {project.name}, Environment : {project.Environment?.name}</div>
                                </li>
                                <button className={`btn btn-sm btn-danger float-end mt-3`}
                                        onClick={() => deleteProject(project)}>
                                    Delete
                                </button>
                            </div>
                        )
                    })}
                </ul>
                <Link to="projects">
                    Create new project
                </Link>
            </div>
        </Container>
    );
}

export default Home;