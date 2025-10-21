import { FoxLogo } from './FoxLogo';

export const Header: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
      {/* Logo with white background */}
      <div className="flex items-center justify-center mb-4">
        <div className="bg-white bg-opacity-90 rounded-full p-2 shadow-lg">
          <FoxLogo />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center tracking-wide">Froxy</h1>
      <p className="text-center text-sm mt-1 text-orange-100">Chat Protection</p>
    </div>
  );
};
