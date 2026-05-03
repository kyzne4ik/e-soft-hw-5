import { useState, type ChangeEventHandler } from "react";

type Role = "преподаватель" | "студент";

export function RoleField({ error }: { error?: string }) {
  const [role, setRole] = useState<Role | null>(null);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setRole(e.target.value as Role);
  };

  return (
    <div>
      <select name="role" value={role || ""} onChange={handleChange}>
        <option value="" selected hidden disabled>
          Выбирите роль...
        </option>
        <option value="студент">студент</option>
        <option value="преподаватель">преподаватель</option>
      </select>
      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
}
