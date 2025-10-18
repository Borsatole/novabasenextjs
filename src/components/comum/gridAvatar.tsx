
import { ImgAvatar } from "./imagemAvatar";

interface AvatarGridProps {
  avatares: string[];
  avatarSelecionado: string;
  selecionarAvatar: (avatar: string) => void;
}



export function AvatarGrid({ avatares, avatarSelecionado, selecionarAvatar } : AvatarGridProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-2">
      {avatares.map((avatar, index) => (
        <div
          key={index}
          className="relative cursor-pointer flex items-center justify-center"
          onClick={() => selecionarAvatar(avatar)}
        >
          <div
            className={`w-26 h-26 rounded-full border-2 p-1 flex ${
              avatarSelecionado === avatar
                ? "border-green-500 ring-2 ring-green-300"
                : "border-gray-200"
            }`}
          >
            <ImgAvatar src={avatar} />
          </div>
          {avatarSelecionado === avatar && (
            <div className="absolute bottom-0 right-0 bg-green-500 rounded-full w-4 h-4 border border-white flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
// AvatarGrid.propTypes = {
//   avatares: PropTypes.array.isRequired,
//   avatarSelecionado: PropTypes.string,
//   selecionarAvatar: PropTypes.func.isRequired,
// };
