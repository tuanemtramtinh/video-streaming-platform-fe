export const RoleType = {
  Admin: "admin",
  Teacher: "teacher",
  Student: "student",
} as const;

export type RoleTypeType = (typeof RoleType)[keyof typeof RoleType];
