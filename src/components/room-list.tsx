import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRooms } from '@/http/use-rooms'
import { dayjs } from '@/lib/dayjs'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'



export function RoomList() {

     const { data, isLoading } = useRooms()

    return (

        <Card className='bg-zinc-950 text-white'>
            <CardHeader>
                <CardTitle>Salas recentes</CardTitle>
                <CardDescription className=' text-zinc-300'>
                    Acesso rápido para as salas criadas recentemente
                </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>

                {isLoading && <p className='text-muted-foreground text-sm'>Carregando salas...</p>}

                {data?.map((room) => {
                    return <Link key={room.id} to={`/room/${room.id}`}
                        className='flex items-center justify-between p-3 rounded-lg  border border-zinc-500 hover:bg-zinc-600'>

                        <div className=' flex-1 flex flex-col gap-1'>
                            <h3 className='font-medium'>{room.name}</h3>

                            <div className='flex items-center gap-2'>
                                <Badge className=' text-xs'>
                                    {dayjs(room.createdAt).toNow()}
                                </Badge>
                                <Badge className=' text-xs'>
                                    {room.questionsCount} pergunta(s)
                                </Badge>
                            </div>
                        </div>

                        <span className='flex items-center gap-1 text-sm'>
                            Entrar
                            <ArrowRight className=' size-3' />
                        </span>
                    </Link>
                })}
            </CardContent>
        </Card>

    )
}