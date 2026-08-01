export type SocialLink = {
  name: string;
  url: string;
  color: string;
  hoverColor: string;
};

export const socials: SocialLink[] = [
  {
    name: "YouTube",
    url: "https://youtube.com/@yourchannel",
    color: "#FF0000",
    hoverColor: "#ff4d4d",
  },
  {
    name: "Twitter / X",
    url: "https://x.com/yourhandle",
    color: "#1DA1F2",
    hoverColor: "#4db8ff",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/yourhandle",
    color: "#E4405F",
    hoverColor: "#ff6b85",
  },
  {
    name: "Telegram",
    url: "https://t.me/yourhandle",
    color: "#229ED9",
    hoverColor: "#4db8e8",
  },
  {
    name: "Discord",
    url: "https://discord.gg/yourhandle",
    color: "#5865F2",
    hoverColor: "#7c86ff",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourhandle",
    color: "#0A66C2",
    hoverColor: "#3388dd",
  },
];
