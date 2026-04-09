import React from 'react'
import { Link, useNavigate } from 'react-router'

export default function FooterBlock({ confirmExit = false }: { confirmExit?: boolean }) {
    const navigate = useNavigate();

    const handleHomeClick = (e: React.MouseEvent) => {
        if (confirmExit) { //checks if user needs to confirm exit
            e.preventDefault();
            const confirmed = window.confirm("You are in the game lobby. Are you sure you want to leave?");
            if (confirmed) {
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
