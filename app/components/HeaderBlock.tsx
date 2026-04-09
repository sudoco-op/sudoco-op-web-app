import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { House } from 'lucide-react'

export default function HeaderBlock() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = (e: React.MouseEvent) => {
    // check if user in the "lobby"
    const isInLobby = location.pathname.startsWith('/game-lobby/');

    if (isInLobby) {
      e.preventDefault(); 

      const confirmExit = window.confirm("You are in the game lobby. Are you sure you want to leave?");
      
      if (confirmExit) {
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