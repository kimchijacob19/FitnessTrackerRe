import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import SetForm from "./SetForm";

export default function RoutineDetail() {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const { date: routines, loading, error } = useQuery("/routines", "routines");

  const routine = routines?.find((r) => r.id === Number(routineId));

  const {
    mutate: deleteRoutine,
    loading: deleting,
    error: deleteError,
  } = useMutation("DELETE", `/routines/${routineId}`, ["routines"], () => {
    navigate("/routines");
  });

  if (loading || !routines) return <p>Loading routine...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!routine) return <p>Retine not found.</p>;

  return (
    <div>
      <h2>{routine.name}</h2>
      <p>
        <strong>Goal:</strong> {routine.goal}
      </p>
      <p>
        <strong>Created by:</strong> {routine.creatorName}
      </p>

      {token && (
        <button onClick={() => deleteRoutine()}>
          {deleting
            ? "Deleting..."
            : deleteError
            ? deleteError
            : "Delete Routine"}
        </button>
      )}

      <h3>Sets</h3>
      {routine.activities.length === 0 ? (
        <p>No sets yet. Add one below!</p>
      ) : (
        <ul>
          {routine.activities.map((set) => (
            <li key={set.id}>
              {set.name} — {set.count} reps
              {token && (
                <DeleteSetButton routineActivityId={set.routineActivityId} />
              )}
            </li>
          ))}
        </ul>
      )}

      {token && <SetForm routineId={routineId} />}
    </div>
  );
}

function DeleteSetButton({ routinActivityId }) {
  const {
    mutate: deleteSet,
    loading,
    error,
  } = useMutation("DELETE", `/routine_activities/${routineActivityId}`, [
    "routines",
  ]);

  return (
    <button onClick={() => deleteSet()}>
      {loading ? "Removing..." : error ? error : "Delete Set"}
    </button>
  );
}
