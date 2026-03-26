interface LobbyPlayerCardProps {
  number: number
  isMe?: boolean
}

export default function LobbyPlayerCard({ number, isMe }: LobbyPlayerCardProps) {
  return (
    <div className={isMe ? "text-[var(--primary)] font-bold" : ""}>
      Player {number} {isMe && "(You)"}
    </div>
  )
}