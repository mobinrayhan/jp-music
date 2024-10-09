"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-200 py-2">
      <small className="custom-container block tracking-wider">
        &copy; Copyright soundei {new Date().getFullYear()}
      </small>
    </footer>
  );
}
