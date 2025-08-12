import { Link } from "react-router-dom";
import useQuery from "react-router-dom";
import { uesAuth } from "../auth/AuthContext";
import RoutineForm from "../RoutineForm";

export default function RoutinesPage() {
  const { token } = useAuth();
  const { data: routines, loading, error } = useQuery("/routines", "routines");

  if (loading) return <p>Loading routines...</p>;
  if (error) return <p>Error loading routines: {error}</p>;

  return (
    <div>
      <hi>Routines</hi>

      {token && (
        <>
          <h2>Create a New Routine</h2>
          <RoutineForm />
        </>
      )}

      <ul>
        {routines.map((routine) => (
          <li key={routine.id}>
            <link to={`/routines/${routine.id}`}>{routine.name}</link>
          </li>
        ))}
      </ul>
    </div>
  );
}
