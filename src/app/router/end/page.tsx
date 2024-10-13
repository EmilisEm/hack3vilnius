import { ArrowLeft, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function AfterTripEnd() {
    return (
        <div className="h-full bg-background p-4 space-y-4">
            <h1 className="text-2xl font-bold text-center">Trip Completed!</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Trip Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-primary" />
                        <span>5.2 km</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-primary" />
                        <span>32 minutes</span>
                    </div>
                </CardContent>
            </Card>

            <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">
                    <Link href="/router/home" className="flex flex-row">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        New trip
                    </Link>
                </Button>
                <Button variant="destructive">
                    <Link href="/router/report" className="flex flex-row">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Report Problem
                    </Link>
                </Button>
            </div>
        </div>
    )
}
