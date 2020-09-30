import React from 'react'
import { Card,CardContent,Typography } from '@material-ui/core'

export default function InfoBox({title,cases,total}) {
    return (
        <Card>
         <CardContent>
         {/*Title*/}
         <Typography color="primary">{title}</Typography>

         {/*Number of cases */}
         <h3>{cases}</h3>

         {/* 1.2m total */}
         <Typography color="primary">{total} Total</Typography>
         </CardContent>
        </Card>
    )
}
  