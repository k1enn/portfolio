// Maps profile.json social `icon` names to their react-icons component.
// Shared by Header (island), Connect, and Footer so social data lives only
// in profile.json — the component reference can't be serialized to JSON.
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { SiCodeforces } from "react-icons/si";

export const SOCIAL_ICONS = {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  SiCodeforces,
};
