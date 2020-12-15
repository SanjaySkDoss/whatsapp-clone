import React, { Component } from 'react'
import Sidebarheader from './sidebarheader'
import Sidebarchats from './sidebarchats'
import '../sidebar.css';
export default class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar'>
                <Sidebarheader />
                <div className='sidebar__search'>
                    <div className='sidebar__searchContainer'>

                    </div>
                </div>
                <Sidebarchats />
            </div>
        )
    }
}
