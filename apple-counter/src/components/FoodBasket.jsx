import React from 'react'
// import PropTypes from 'prop-types';
import { Button, Container, Grid, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import FruitItem from './FruitItem';

class FoodBasket extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  render () {
    return (
      <section className="foodcontainer">
        <Header as="h2" content="水果篮子" />
        <Container>
          <Grid padded columns={2} textAlign='center' stackable>
            <Grid.Row columns = {2} >
              <Grid.Column>
                <Segment>
                  <Header as="h4">当前</Header>
                  <div className="content"> 0个苹果，0克</div>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Header as="h4">吃掉</Header>
                  <div className="content">2个苹果，480克</div>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            {/*<Grid.Column className="foodList">
              <div className="empty-tip">Shopping List is EMPTY</div>
            </Grid.Column>*/}
            <Grid.Row>
              <div className="empty-tip">Shopping List is EMPTY</div>
            </Grid.Row>

            <Grid.Row>
              <Button>GET NEW FOOD</Button>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
    )
  }
}

export default FoodBasket;
