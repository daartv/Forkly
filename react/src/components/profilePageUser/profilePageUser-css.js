const style = {
  dashboard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '0 10%',
    alignItems: 'center'
  },

  leftDashboard: {
    flexDirection: 'column',
    width: '30%',
    padding: '0 20px'
  },

  rightDashboard: {
    flexDirection: 'column',
    width: '60%',
    padding: '0 20px',
    wrap: 'nowrap'
  },
  statsBar: {
    width: '100%',
    margin: 20,
    display: 'table',
    padding: '2% 5%',
    borderSpacing: '10px',
    tableLayout: 'fixed'
  },

  profilePic: {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'
  },

  statDetail: {
    textAlign: 'center',
    display: 'table-cell',
        // justifyContent: 'space-around',
    padding: '2% 5%',
    wordWrap: 'break-word'
  }
}

export default style
