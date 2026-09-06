export const COLORS = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  secondary: "#14B8A6",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  white: "#FFFFFF",
  text: "#0F172A",
  textSecondary: "#64748B",
  gray: "#94A3B8",
  border: "#E2E8F0",
  success: "#16A34A",
  warning: "#D97706",
  danger: "#DC2626",
  inactive: "#64748B",
};

export type SubjectStatus = "active" | "pending" | "inactive";

export const STATUS_COLORS: Record<SubjectStatus, string> = {
  active: COLORS.success,
  pending: COLORS.warning,
  inactive: COLORS.inactive,
};
