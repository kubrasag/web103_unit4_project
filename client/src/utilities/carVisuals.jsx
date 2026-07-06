import React from 'react'

export const renderWheel = (cx, cy, wheelType) => {
  if (wheelType === 'Sport') {
    return (
      <g>
        <circle cx={cx} cy={cy} r="14" fill="#222" stroke="#c0392b" strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line
            key={angle}
            x1={cx}
            y1={cy}
            x2={cx + 10 * Math.cos((angle * Math.PI) / 180)}
            y2={cy + 10 * Math.sin((angle * Math.PI) / 180)}
            stroke="#e74c3c"
            strokeWidth="2"
          />
        ))}
      </g>
    )
  }

  if (wheelType === 'Off-road') {
    return (
      <g>
        <circle cx={cx} cy={cy} r="15" fill="#111" stroke="#555" strokeWidth="4" strokeDasharray="3,2" />
        <circle cx={cx} cy={cy} r="6" fill="#888" />
      </g>
    )
  }

  return (
    <g>
      <circle cx={cx} cy={cy} r="12" fill="#333" stroke="#999" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="4" fill="#ccc" />
    </g>
  )
}

export const renderRoof = (roofType, colorHex) => {
  if (roofType === 'Convertible') {
    return (
      <g>
        <rect x="55" y="35" width="30" height="15" rx="4" fill="#555" />
        <rect x="95" y="35" width="30" height="15" rx="4" fill="#555" />
      </g>
    )
  }

  if (roofType === 'Sunroof') {
    return (
      <g>
        <rect x="40" y="30" width="100" height="30" rx="10" fill={colorHex} />
        <rect x="70" y="35" width="35" height="18" rx="4" fill="#a5d8ff" opacity="0.8" />
      </g>
    )
  }

  return <rect x="40" y="30" width="100" height="30" rx="10" fill={colorHex} />
}