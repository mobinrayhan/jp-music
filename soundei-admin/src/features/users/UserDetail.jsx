import { useParams } from "react-router-dom";

export default function UserDetail() {
  const { id } = useParams();

  console.log(id);

  return <div>UserDetail</div>;
}
