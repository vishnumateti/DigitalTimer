// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {startButton: false, timeInMinutes: 25, timeInSeconds: 0}

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  getDecrement = () => {
    const {timeInMinutes} = this.state
    if (timeInMinutes > 1) {
      this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes - 1}))
    }
  }

  getIncrement = () => {
    const {timeInMinutes} = this.state
    if (timeInMinutes > 1) {
      this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes + 1}))
    }
  }

  renderTimeLimitController = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const isDisabled = timeInSeconds > 0

    return (
      <div>
        <p className="set-timer-heading">Set Timer limit</p>
        <div className="set-limit-section">
          <button
            disabled={isDisabled}
            className="button"
            type="button"
            onClick={this.getDecrement}
          >
            -
          </button>
          <div className="timer-set-bg">
            <p className="time-limit">{timeInMinutes}</p>
          </div>

          <button
            disabled={isDisabled}
            className="button"
            type="button"
            onClick={this.getIncrement}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  resetButton = () => {
    this.clearTimeInterval()
    this.setState({startButton: false, timeInMinutes: 25, timeInSeconds: 0})
  }

  incrementTimeElapsedInSec = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const isTimerCompleted = timeInSeconds === timeInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({startButton: false})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  isStartOrPause = () => {
    const {startButton, timeInMinutes, timeInSeconds} = this.state

    const isTimerCompleted = timeInSeconds === timeInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeInSeconds: 0})
    }
    if (startButton) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSec, 1000)
    }

    this.setState(prevState => ({startButton: !prevState.startButton}))
  }

  renderTimerController = () => {
    const {startButton} = this.state

    const isStartIcon = startButton
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const isStartAlt = startButton ? 'pause icon' : 'play icon'
    const isStartStatus = startButton ? 'Pause' : 'Start'

    return (
      <div>
        <div className="start-button-container">
          <button
            onClick={this.isStartOrPause}
            className="button"
            type="button"
          >
            <img className="icons" alt={isStartAlt} src={isStartIcon} />
            <p>{isStartStatus}</p>
          </button>

          <button onClick={this.resetButton} className="button" type="button">
            <img
              className="icons"
              alt="reset icon"
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            />
            <p>Reset</p>
          </button>
        </div>
      </div>
    )
  }

  getTimeInMinutesAndSeconds = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const totalRemainingSeconds = timeInMinutes * 60 - timeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifyMethodInMin = minutes > 9 ? minutes : `0${minutes}`
    const stringifyMethodSec = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifyMethodInMin}:${stringifyMethodSec}`
  }

  render() {
    const {startButton} = this.state
    const isStartTimeStatus = startButton ? 'Running' : 'Paused'

    return (
      <div>
        <div className="bg-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="card-container">
            <div className="timer-bg-image">
              <div className="timer-circle">
                <h1 className="time-color">
                  {this.getTimeInMinutesAndSeconds()}
                </h1>
                <p className="pause-running">{isStartTimeStatus}</p>
              </div>
            </div>
            <div className="timer-limit-section">
              {this.renderTimerController()}
              {this.renderTimeLimitController()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
