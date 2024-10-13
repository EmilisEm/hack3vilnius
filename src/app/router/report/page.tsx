'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

const streets = [
    'Main Street',
    'Broadway',
    'Park Avenue',
    'Elm Street',
    'Oak Lane',
    'Cedar Road',
    'Maple Drive',
    'Pine Street',
    'Willow Way',
    'Birch Boulevard',
]

const problemTypes = [
    { id: 1, label: 'Pothole' },
    { id: 2, label: 'Broken Traffic Light' },
    { id: 3, label: 'Blocked Bike Lane' },
    { id: 4, label: 'Missing Signage' },
    { id: 5, label: 'Dangerous Intersection' },
    { id: 6, label: 'Other' },
]

export default function ReportProblemPage() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [time, setTime] = useState('')
    const [street, setStreet] = useState('')
    const [problemType, setProblemType] = useState('')
    const [description, setDescription] = useState('')

    return (
        <Card className="w-full max-w-2xl mx-auto mt-4">
            <CardHeader>
                <CardTitle>Report a Problem</CardTitle>
                <CardDescription>
                    Let us know about issues you&apos;ve encountered on your
                    bike route.
                </CardDescription>
            </CardHeader>
            <form>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="problem-type">Type of Problem</Label>
                        <Select
                            value={problemType}
                            onValueChange={setProblemType}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a problem type" />
                            </SelectTrigger>
                            <SelectContent>
                                {problemTypes.map((type) => (
                                    <SelectItem
                                        key={type.id}
                                        value={type.id.toString()}
                                    >
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Street</Label>
                        <Select
                            value={street}
                            onValueChange={setStreet}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a street" />
                            </SelectTrigger>
                            <SelectContent>
                                {streets.map((s) => (
                                    <SelectItem key={s} value={s}>
                                        {s}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                        className={cn(
                                            'w-full justify-start text-left font-normal',
                                            !date && 'text-muted-foreground'
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? (
                                            format(date, 'PPP')
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="rounded-md border"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time">Time</Label>
                            <Input
                                type="time"
                                id="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Please provide details about the problem..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">
                        Submit Report
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
