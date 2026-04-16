import "./globals.css";

export const metadata = {
  title: "Demo - AI Assistant",
  description: "A demo website with AI assistant chat widget",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
