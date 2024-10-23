

import { UserResponseProvider } from "./../../context/UserResponseContext"; // Ajusta la ruta según sea necesario

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserResponseProvider>
      {children}
    </UserResponseProvider>
  );
}
