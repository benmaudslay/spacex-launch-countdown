import React, { Component } from 'react'
import styled from 'styled-components'

class Countdown extends Component {
  state = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null
  }

  componentDidMount() {
    const { launchDate } = this.props
    this.timerID = setInterval(() => this.handleCountdownLogic(launchDate), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  handleCountdownLogic = launchDate => {
    const currentTime = new Date().getTime() / 1000
    const futureTime = launchDate
    const timeRemaining = futureTime - currentTime
    const minute = 60
    const hour = 60 * 60
    const day = 60 * 60 * 24
    let dayFloor = Math.floor(timeRemaining / day)
    let hourFloor = Math.floor((timeRemaining - dayFloor * day) / hour)
    let minuteFloor = Math.floor((timeRemaining - dayFloor * day - hourFloor * hour) / minute)
    let secondFloor = Math.floor(
      timeRemaining - dayFloor * day - hourFloor * hour - minuteFloor * minute
    )
    // const result = `${dayFloor} Days, ${hourFloor} Hours, ${minuteFloor} Minutes, ${secondFloor} Seconds`
    if (dayFloor < 10) {
      dayFloor = `0${dayFloor}`
    }

    if (hourFloor < 10) {
      hourFloor = `0${hourFloor}`
    }

    if (minuteFloor < 10) {
      minuteFloor = `0${minuteFloor}`
    }

    if (secondFloor < 10) {
      secondFloor = `0${secondFloor}`
    }

    this.setState({
      days: dayFloor,
      hours: hourFloor,
      minutes: minuteFloor,
      seconds: secondFloor
    })
  }

  render() {
    const { days, hours, minutes, seconds } = this.state
    const { children } = this.props
    return (
      <div>
        {/* <h2>Countdown:</h2> */}
        <ClockWrapper>
          <CountdownSection className="day" time={days} value="Days" />
          <CountdownSection className="hour" time={hours} value="Hours" />
          <div className="rocket">{children}</div>
          <CountdownSection className="min" time={minutes} value="Minutes" />
          <CountdownSection className="sec" time={seconds} value="Seconds" />
        </ClockWrapper>
      </div>
    )
  }
}

export default Countdown

const CountdownSection = ({ time, value }) => {
  return (
    <IndividualCount>
      <h1>{time}</h1>
      <p>{value.toUpperCase()}</p>
    </IndividualCount>
  )
}

// Styles
const ClockWrapper = styled.div`
  /* display: flex; */
  justify-content: space-evenly;
  align-items: center;
  width: 100%;

  display: grid;
  grid-template-areas: 'day hour rocket min sec';
  grid-template-columns: auto;

  .day {
    grid-area: day;
  }
  .hour {
    grid-area: hour;
  }
  .min {
    grid-area: min;
  }
  .sec {
    grid-area: sec;
  }
  .rocket {
    grid-area: rocket;
  }

  @media (max-width: 750px) {
    grid-template-areas: 'day hour min sec' 'rocket';
    grid-template-rows: auto auto;

    .sec {
      color: pink;
    }
  }
`

const IndividualCount = styled.div`
  text-align: center;
  font-size: 1.8rem;

  h1 {
    font-size: 6rem;
    margin: 0;
  }
`
