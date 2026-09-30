export const FOUNDER_SLUG = "anonymous";
export const PJ_SLUG = "pj";
export const BEMA_SLUG = "bema";

export interface ProfileAccent {
  from: string;
  to: string;
  badgeBg: string;
  badgeText: string;
  pageBg?: string;
  textColor?: string;
}

export function getAccent(slug?: string): ProfileAccent {
  if (slug === FOUNDER_SLUG) {
    return {
      from: "#cfa544",
      to: "#1f1f1f",
      badgeBg: "rgba(207,165,68,0.15)",
      badgeText: "#b8862e",
      pageBg: "#072830",
      textColor: "#f0f0f0",
    };
  }
  

  if (slug === BEMA_SLUG) {
    return{
      pageBg: "#f3f3f3",
      from: "#6c63ff",
    to: "#3ecf8e",
    badgeBg: "rgba(108,99,255,0.12)",
    badgeText: "#6c63ff",
      
    };
  }
  return {
    from: "#6c63ff",
    to: "#3ecf8e",
    badgeBg: "rgba(108,99,255,0.12)",
    badgeText: "#6c63ff",
  };

}