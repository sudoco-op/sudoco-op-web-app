import React from 'react'
import { Link } from 'react-router'
import { House } from 'lucide-react'

export default function HeaderBlock() {
  return (
    
    <div className="w-full h-full py-3 bg-[var(--bg-sidebar)] backdrop-blur-md border-b border-[var(--border-color)]">
        <Link to="/">
            <House className="mx-4" size={36} />
        </Link>
    </div>
  )
}
