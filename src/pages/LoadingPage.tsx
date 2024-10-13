import { Spinner } from '@/components/ui/spinner'
import React from 'react'

const LoadingPage = () => {
    ;<div className="flex items-center gap-3">
        <Spinner>Loading...</Spinner>
        <Spinner className="text-blue-600">
            <span className="text-blue-600">Loading with custom style</span>
        </Spinner>
    </div>
}

export default LoadingPage
