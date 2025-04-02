export interface SocialLoginButtonProps {
  social: "google" | "microsoft" | "yahoo" | "prediza";
  label?: string;
  onClick: () => void;
}