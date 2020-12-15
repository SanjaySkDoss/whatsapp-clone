import React from 'react'
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
export default function Sidebarheader() {
    return (

        <div className='sidebar-header'>
            <Avatar />
            <div className='sidebar-headerRight'>

                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>
    )
}
