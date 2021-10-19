import { Button } from "@material-ui/core";

export default function Card({ tech, deleteTech }) {
  return (
    <div className="card">
      <span> Título: {tech.title} </span>
      <span> Status: {tech.status} </span>
      <Button onClick={() => deleteTech(tech.id)}>Deletar</Button>
    </div>
  );
}
