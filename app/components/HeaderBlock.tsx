import React from 'react'
import { Link, useNavigate } from 'react-router'
import { House } from 'lucide-react'

export default function HeaderBlock({ confirmExit = false }: { confirmExit?: boolean }) {
  const navigate = useNavigate();

  const handleHomeClick = (e: React.MouseEvent) => {
    if (confirmExit) {//checks if user needs to confirm exit
      e.preventDefault();
      const confirmed = window.confirm("You are in the game lobby. Are you sure you want to leave?");
      if (confirmed) {
        navigate("/");
      }
    }
  };

  return (
    <div className="w-full h-full py-3 bg-[var(--bg-sidebar)] backdrop-blur-md border-b border-[var(--border-color)]">
      <Link to="/" onClick={handleHomeClick}>
        <House className="mx-4" size={36} />
      </Link>
    </div>
  )
}