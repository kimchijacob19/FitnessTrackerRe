import { Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/** Shows a list of activities. */
export default function ActivityList() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  if (loading || !activities) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.id}>
          <Link to={`/activities/${activity.id}`}>
            <h3>{activity.name}</h3>
          </Link>
          <p>{activity.description}</p>
        </li>
      ))}
    </ul>
  );
}
