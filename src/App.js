import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

// Components
import Countdown from './components/Countdown'
import GlobalStyles from './global'

// Assets
import falcon9 from './assets/falcon9-render.png'
import falconHeavy from './assets/falcon-heavy-render.png'

class App extends Component {
  state = {
    mission: null,
    launchDate: null
  }

  componentDidMount() {
    fetch('https://api.spacexdata.com/v3/launches/next')
      .then(res => res.json())
      .then(data => {
        this.setState({
          mission: data,
          launchDate: data.launch_date_unix
        })
      })
  }

  render() {
    const { mission, launchDate } = this.state
    let rocketType = null
    if (mission && mission.rocket.rocket_name === 'Falcon 9') {
      rocketType = <SpaceshipImg src={falcon9} />
    } else {
      rocketType = <SpaceshipImg src={falconHeavy} />
    }

    return (
      <Container>
        <GlobalStyles />
        {mission ? (
          <Fragment>
            {/* <h1>Space X</h1> */}
            <Countdown launchDate={launchDate}>{rocketType}</Countdown>
            <SubWrapper>
              <FontWrapper weight="400">
                NEXT ROCKET: {mission.rocket.rocket_name.toUpperCase()}
              </FontWrapper>
              <FontWrapper weight="400">FLIGHT NUMBER: {mission.flight_number}</FontWrapper>
            </SubWrapper>
          </Fragment>
        ) : null}
      </Container>
    )
  }
}

export default App

// Styles
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  padding: 5vmin;
  background-color: #000;
  color: white;
  overflow: hidden;
  font-family: BrandonMedium;
`

const SpaceshipImg = styled.img`
  height: 90vmin;
`

const SubWrapper = styled.div`
  position: absolute;
  top: 0;

  display: flex;
  justify-content: space-evenly;
  width: 100%;
`

const FontWrapper = styled.div`
  font-weight: ${props => props.weight || 400};
`
