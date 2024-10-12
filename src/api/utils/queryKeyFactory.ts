export const allSpells = 'lucifer'

export const junctionById = (
    minLat: number,
    minLong: number,
    maxLat: number,
    maxLong: number
) => `junction-photo-${minLat}-${minLong}-${maxLat}-${maxLong}`

export const navigationByCoord = (
    minLat: number,
    minLong: number,
    maxLat: number,
    maxLong: number
) => `navigation-${minLat}-${minLong}-${maxLat}-${maxLong}`
