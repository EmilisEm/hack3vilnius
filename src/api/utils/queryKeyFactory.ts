export const allSpells = 'lucifer'

export const junctionById = (
    minLong: number,
    minLat: number,
    maxLong: number,
    maxLat: number
) => `junction-photo-${minLat}-${minLong}-${maxLat}-${maxLong}`

export const navigationByCoord = (
    minLong: number,
    minLat: number,
    maxLong: number,
    maxLat: number
) => `navigation-${minLat}-${minLong}-${maxLat}-${maxLong}`
