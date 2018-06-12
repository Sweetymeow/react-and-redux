import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Segment, Header } from 'semantic-ui-react';

class FruitItem extends React.Component {
  render () {
    return (
      <Segment className="appleItem">
        <Grid column={3}>
          <Grid.Row>
            <Grid.Column>
              <img src="./images/apple.png" alt="Apple"/>
            </Grid.Column>
            <Grid.Column>
              <Header as="h3">Apple No.1</Header>
              <p>235 g / per</p>
            </Grid.Column>
            <Grid.Column>
              <Button> GET </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default FruitItem;
