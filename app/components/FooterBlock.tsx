import React from 'react'
import { Link } from 'react-router'

export default function FooterBlock() {
  return (
    
    <div className=" text-center mb-6">
        <Link to="/">
            <p className="text-xs text-(--text-muted) font-bold ">Create your own coop sudoku rooms at sudocoop.pl</p>
        </Link>
    </div>
  )
}
