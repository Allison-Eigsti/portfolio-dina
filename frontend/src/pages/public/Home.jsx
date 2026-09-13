import { useContext } from 'react'
import { PortfolioContext } from '@/context/PortfolioContext';

function Home(){
    
    const { projects } = useContext(PortfolioContext);

    return(
        <>
            <p>Home</p>
            <ul>
                {projects.map((project) => (
                    <li key={project._id}>{project.title}</li>
                ))}
            </ul>
        </>
    )
}

export default Home