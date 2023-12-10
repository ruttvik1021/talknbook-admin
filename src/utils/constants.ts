export enum ROLES {
  SUPERADMIN = "SUPERADMIN",
  USER = "USER",
}

export type navRoute = {
  label: string;
  href: string;
  subRoutes?: { label: string; href: string }[];
};
