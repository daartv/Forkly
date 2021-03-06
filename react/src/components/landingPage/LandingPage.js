import React, { Component } from 'react'

/**
 * Grid Layout
 */
import ReactGridLayout from 'react-grid-layout'

const style = {
  background: {
    backgroundImage: 'url(assets/images/sprinkleLips_2.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  title: {
    fontSize: '70px',
    color: 'white',
    marginLeft: '5vw',
    marginTop: '45vh',
    fontFamily: 'sans-serif'
  }
}

class LandingPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { background, title } = style
    var layout = [
      {i: 'top', x: 0, y: 0, w: 12, h: 0.5, static: false},
      {i: 'title', x: 0, y: 0.5, w: 4, h: 19, static: false},
      {i: 'body', x: 5, y: 0.5, w: 8, h: 19, static: false},
      {i: 'bottom', x: 0, y: 19.5, w: 12, h: 0.5, static: false}
    ]
    return (
      <div style={background}>
        <ReactGridLayout className='layout' layout={layout} cols={12} rowHeight={31} width={window.innerWidth}>
          <div key={'top'} />
          <div key={'title'}>
            <h1 style={title}>forkly</h1>
            <h3 />
          </div>
          <div key={'body'} />
          <div key={'bottom'} />
        </ReactGridLayout>
      </div>
    )
  }
};

export default LandingPage
