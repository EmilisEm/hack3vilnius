export interface imageId {
    id: string
}

export interface imageUrlResponse {
    data: [imageId]
}

export interface imageDataResponse {
    id: string,
    thumb_2048_url: string
}