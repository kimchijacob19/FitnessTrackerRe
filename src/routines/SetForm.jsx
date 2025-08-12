import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useState } from "react";

export default function SetForm({ routineId }) {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  const {
    mutate: addSet,
    loading: submitting,
    error: submitError,
  } = useMutation("POST", "/routine_activities", ["routines"]);

  const [formError, setFormError] = useState(null);

  const handleSubmit = async (formData) => {
    const activityId = formData.get("activityId");
    const count = formData.get("count");

    if (!activityId || !count) {
      setFormError("All fields are required.");
      return;
    }

    setFormError(null);
    await addSet({
      routineId: Number(routineId),
      activityId: Number(activityId),
      count: Number(count),
    });
  };

  if (loading || !activities) return <p>Loading activities...</p>;
  if (error) return <p>Error loading activities: {error}</p>;

  return (
    <form action={handleSubmit}>
      <label>
        Select Activity:
        <select name="activityId" required>
          <option value="">-- Choose an activity --</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Reps:
        <input type="number" name="count" min="1" required />
      </label>

      <button>{submitting ? "Adding..." : "Add Set"}</button>

      {formError && <p style={{ color: "red" }}>{formError}</p>}
      {submitError && <p style={{ color: "red" }}>{submitError}</p>}
    </form>
  );
}
