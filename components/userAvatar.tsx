"use client"

import { User } from "lucide-react"

interface AvatarProps {
  src?: string | null
  size?: number
  isCircle?: boolean
  className?: string
}

export default function Avatar({
  src,
  size = 40,
  isCircle = false,
  className = "",
}: AvatarProps) {
  const dimension = `${size}px`
  const shapeClass = isCircle ? "rounded-full" : "rounded-2xl"

  if (src) {
    return (
      <img
        src={src}
        alt="User Avatar"
        style={{ width: dimension, height: dimension }}
        className={`${shapeClass} object-cover bg-gray-200 ${className}`}
      />
    )
  }

  return (
    <div
      style={{ width: dimension, height: dimension }}
      className={`flex items-center justify-center bg-gray-200 ${shapeClass} ${className}`}
    >
      <User size={size * 0.5} />
    </div>
  )
}