import { useHistory } from "react-router-dom";

export default function Card({ tech }) {
  const history = useHistory();

  return (
    <div>
      <span> {tech} </span>
    </div>
  );
}
