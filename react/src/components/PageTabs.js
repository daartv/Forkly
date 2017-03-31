import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import RecipeGrid from './RecipeGrid'
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class PageTabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      value: event.value,
    });
  };

  render() {
    const stats = this.props.stats
    return (
      <Tabs
      value={this.state.value}
      onChange={this.handleChange}
      >
        <Tab label="Tab A" value="a">
          <div>
            <h2 style={styles.headline}></h2>
            <RecipeGrid stats={stats} />
          </div>
        </Tab>
        <Tab label="Tab B" value="b">
          <div>
            <h2 style={styles.headline}></h2>
             <RecipeGrid stats={stats} />
          </div>
        </Tab>
      </Tabs>
    );
  }
}
export default PageTabs