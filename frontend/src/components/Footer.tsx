export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 px-6 text-center font-mono text-sm text-moss-600">
      © {year} Hassan Mahmud. All rights reserved.
    </footer>
  );
}
