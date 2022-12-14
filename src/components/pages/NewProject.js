import { useHistory } from "react-router-dom"

import ProjectsForm from '../project/ProjectsForm'

import styles from './NewProject.module.css'

function NewProject() {

    const history = useHistory();

    function createPost(project) {
        if (project.name === '' || project.budget === '' || !project.category ) {
            alert('É necessário preencher todos os campos!')
        }else {
        //initialize cost and services
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            //redirect
            history.push('/projects', { message: 'Projeto criado com sucesso!' });
        })
        .catch((err) => console.log(err))
    }}

    return (
        <div className={styles.newproject_conteiner}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar serviços</p>
            <ProjectsForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProject