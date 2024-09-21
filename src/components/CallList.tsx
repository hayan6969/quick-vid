//@ts-nocheck
'use client'
import { useGetCalls } from '@/hooks/useGetCalls'
import { CallRecording } from '@stream-io/node-sdk'
import { Call } from '@stream-io/video-react-sdk'
import { Heading1 } from 'lucide-react'
import Loader from './Loader'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard'
type props ={
    type: 'upcoming' | 'ended' | 'recordings'
}

function CallList({type}:props) {
    const router = useRouter()
    
    const {endedCalls,upcomingCalls,callRecordings,isLoading}=useGetCalls()
    const [recordings,setRecordings]=useState<CallRecording[]>()
    const getCalls=()=>{
        switch(type){
            case 'upcoming':
                return upcomingCalls
            case 'ended':
                return endedCalls
            case 'recordings':
                return callRecordings
            default:
                return []
        }

        
    }

    const getNoCallsMessage=()=>{
        switch(type){
            case 'upcoming':
                return 'No Upcoming Calls'
            case 'ended':
                return 'No Previous Calls'
            case 'recordings':
                return 'No Recordings available'
            default:
                return ''
        }

        
    }

    useEffect(()=>{

        const fetchRecordings=async()=>{
            const callData=await Promise.all(callRecordings.map((meeting)=>
                meeting.queryRecordings()
            ))
            
            const recordings=callData
            .filter(call=> call.recordings.length>0)
            .flatMap(call=>call.recordings)
            setRecordings(recordings)
            
        }
       

        if(type==='recordings')  fetchRecordings()
    
    },[type,callRecordings])

const calls=getCalls()
const noCallsMessage = getNoCallsMessage()
if(isLoading) return <Loader />
    return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {
            calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
                <MeetingCard
                key={(meeting as Call).id}
                icon={
                    type=== 'ended'
                    ? '/icons/previous.svg'
                    : type==='upcoming'
                    ? '/icons/upcoming.svg'
                    : '/icons/recordings.svg'
                }
                title={(meeting as Call).state?.custom?.description?.substring(0,20) || 'Personal Meeting' || meeting.filename?.substring(0,20)}
                date={
                    (meeting as Call).state?.startsAt?.toLocaleString() || (meeting as CallRecording).start_time.toLocaleString()
                }
                isPreviousMeeting={
                    type==='ended'

                }
                buttonIcon1={
                    type==='recordings'
                    ? '/icons/play.svg'
                    : undefined
                }
                handleClick={
                    type==='recordings'
                    ? ()=>router.push(`${meeting.url}`) :  ()=>router.push (`/meeting/${meeting.id}`)
                }
                link={
                    type==='recordings'
                    ? (meeting as CallRecording).url
                    : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                }
                buttonText={
                    type==='recordings'
                    ? 'Play Recording'
                    :'Start'
                }
                
                />
            )) : (
                <h1>{noCallsMessage}</h1>
            )
        }
    </div>
  )
}

export default CallList