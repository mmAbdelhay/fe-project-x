import Container from "./Projects.style";
import Input from "../../components/SmallComponents/Input.tsx";
import {useEffect, useState} from "react";
import {EnvironmentData, getEnvironmentRequest} from "../../requests/Environment/get.environments.request.ts";
import Button from "../../components/SmallComponents/Button.tsx";
import {createProjectRequest} from "../../requests/Project/post.project.request.ts";
import {useNavigate} from "react-router-dom";

const Projects = (): JSX.Element => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [githubUsername, setGithubUsername] = useState("");
    const [githubEmail, setGithubEmail] = useState("");
    const [environmentId, setEnvironmentId] = useState<string>();
    const [haveBackEnd, setHaveBackEnd] = useState<boolean>();
    const [environments, setEnvironments] = useState<EnvironmentData[]>([]);

    useEffect(() => {
        (async () => {
            let environments = await getEnvironmentRequest();
            setEnvironments(environments);
        })();
    }, []);

    const createProject = async (e: any) => {
        e.preventDefault();

        try {
            await createProjectRequest({
                name,
                githubUsername,
                githubEmail,
                environmentId,
                haveBackEnd
            });
            navigate('/')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Container className={'container card m-5 p-3'}>
            <h3>Create new project</h3>
            <form onSubmit={createProject}>

                <Input label={'Project name'} type={'text'} onInputChange={(value: string) => setName(value)}/>
                <Input label={'Github email'} type={'email'} onInputChange={(value: string) => setGithubEmail(value)}/>
                <Input label={'Github username'} type={'text'}
                       onInputChange={(value: string) => setGithubUsername(value)}/>

                <div className="form-group mt-3 ">
                    <select className="form-select" id={'environmentId'}
                            onChange={e => setEnvironmentId(e.target.value)}>
                        <option>{environments.length > 0 ? 'Project environment' : 'No environments'}</option>
                        {environments.map(environment => {
                            return <option key={environment.id} value={environment.id}>{environment.name}</option>
                        })}
                    </select>
                </div>

                <div className="form-check mt-3 pl-2">
                    <input className="form-check-input" type="checkbox" checked={haveBackEnd}
                           onChange={() => setHaveBackEnd(!haveBackEnd)}
                           id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Have backend infra
                    </label>
                </div>

                <Button bg={'success'} text={'create'}/>
            </form>
        </Container>
    );
};

export default Projects;
