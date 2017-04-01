import React, { Component } from 'react'
/**
 * Components
 */
import NavMain from '../navMain/NavMain'
/**
 * Grid Layout
 */
import ReactGridLayout from 'react-grid-layout'
/**
 * Styles
 */
import style from './main-css'

const { background, nav } = style

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const layout = [
      {i: 'a', x: 0, y: 0, w: 12, h: 0.5, static: true},
      {i: 'b', x: 0, y: 1, w: 4, h: 19.5, static: true},
      {i: 'c', x: 5, y: 1, w: 8, h: 19.5, static: true},
      {i: 'd', x: 0, y: 20.5, w: 12, h: 0.5, static: true}
    ]
    return (
      <div style={background}>
        <ReactGridLayout className='layout' layout={layout} cols={12} rowHeight={30} width={window.innerWidth}>
          <div key={'a'} />
          <div key={'b'} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <NavMain />
          </div>
          <div key={'c'} />
          <div key={'d'} />
        </ReactGridLayout>
      </div>
    )
  }
};

export default Main
