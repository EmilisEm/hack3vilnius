import { Spinner } from '@/components/ui/spinner'
import React from 'react'

const LoadingPage = () => (
    <center className="flex align-middle justify-center h-full">
        <div className="flex items-center gap-3">
            <Spinner>Loading...</Spinner>
        </div>
    </center>
)

export default LoadingPage
