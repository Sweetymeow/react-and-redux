import React from 'react'
import PropTypes from 'prop-types';
import { Button, Container, Grid, Header,Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

class FoodBasket extends React.Component {
  render () {
    return (
      <section className="foodcontainer">
        <Header as="h2" content="水果篮子" />
        <Container fluid>
          <Grid columns={2} stackable>
            <Grid.Row columns = {2} >
              <Grid.Column>
                <Segment>当前</Segment>
                <div className="content"> 0个苹果，0克</div>
              </Grid.Column>
              <Grid.Column>
                <Segment>吃掉</Segment>
                 <div className="content">2个苹果，480克</div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Column width = { 6 } >
              <Segment>Content</Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </section>
    )
  }
}

export default FoodBasket;
