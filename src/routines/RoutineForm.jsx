import useMutation from "../api/useMutation";
import { useState } from "react";

export default function RoutineForm() {
  const {
    mutate: addRoutine,
    loading,
    error,
  } = useMutation("POST", "/routines", ["routines"]);

  const [formError, setFormError] = useState(null);

  const handleSubmit = async (formData) => {
    const name = formData.get("name");
    const goal = formData.get("goal");

    if (!name || !goal) {
      setFormError("Both name and goal are required.");
      return;
    }

    setFormError(null);
    await addRoutine({ name, goal });
  };

  return (
    <form action={handleSubmit}>
      <label>
        Routine Name:
        <input type="text" name="name" required />
      </label>
      <label>
        Goal:
        <input type="text" name="goal" required />
      </label>
      <button>{loading ? "Creating..." : "Create Routine"}</button>
      {formError && <p style={{ color: "red" }}>{formError}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
