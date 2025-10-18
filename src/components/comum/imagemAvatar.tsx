
import * as React from "react";

interface ImgAvatarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  src: string ;
}

export function ImgAvatar({ src }: ImgAvatarProps) {
  return (
    <img
      alt="Avatar"
      className="rounded-full w-full object-cover"
      src={`${import.meta.env.VITE_API}/Backend/Usuario/avatar/${src || ""}`}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = "https://placehold.co/100x100";
      }}
    />
  );
}

