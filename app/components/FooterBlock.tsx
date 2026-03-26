import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router'

export default function FooterBlock() {

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
        <div className=" text-center mb-6" >
            <Link to="/" onClick={handleHomeClick}>
                <p className="text-xs text-(--text-muted) font-bold ">Create your own coop sudoku rooms at sudocoop.pl</p>
            </Link>
        </div>
    )
}
