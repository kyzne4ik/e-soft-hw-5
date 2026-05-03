import type { SelectHTMLAttributes } from "react";

export type Role = "преподаватель" | "студент";

export function RoleField(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select name="role" {...props}>
      <option value="" selected hidden disabled>
        Выбирите роль...
      </option>
      <option value="студент">студент</option>
      <option value="преподаватель">преподаватель</option>
    </select>
  );
}
