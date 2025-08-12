import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";

export default function ActivityDetail() {
  const { activityId } = useParams();
  const { token } = useAuth();

  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  const activity = activities?.find((act) => act.id === Number(activityId));

  if (loading || !activities) return <p>Loading activity...</p>;
  if (error) return <p>Error loading activities: {error}</p>;
  if (!activity) return <p>Activity not found.</p>;

  return (
    <div>
      <h2>{activity.name}</h2>
      <p>{activity.description}</p>
      <p>
        <strong>Created by:</strong> {activity.creatorName}
      </p>

      {token && (
        <p style={{ color: "gray" }}>
          Deleting activities is not supported by the public API.
        </p>
      )}
    </div>
  );
}
