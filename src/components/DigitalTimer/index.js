// Write your code here
import {Component} from 'react'
import './index.css'

const initial = {
  isTrue: false,
  timeClock: 25,
  timeMin: 0,
}

class DigitalTimer extends Component {
  state = initial

  componentDidCatch() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.timerId)

  onIncrement = () => {
    this.setState(prevState => ({
      timeClock: prevState.timeClock + 1,
    }))
  }

  onDecrement = () => {
    const {timeClock} = this.state

    if (timeClock > 1) {
      this.setState(prevState => ({
        timeClock: prevState.timeClock - 1,
      }))
    }
  }

  renderTimeLimitControlled = () => {
    const {timeClock, timeMin} = this.state
    const isDisable = timeMin > 0

    return (
      <div className="time-set-container">
        <p className="set">Set Timer Limit</p>
        <div className="increase-decrease-container">
          <div>
            <button
              className="decrease-button"
              type="button"
              onClick={this.onDecrement}
              disabled={isDisable}
            >
              -
            </button>
          </div>
          <p className="number">{timeClock}</p>
          <div>
            <button
              className="decrease-button"
              type="button"
              onClick={this.onIncrement}
              disabled={isDisable}
            >
              +
            </button>
          </div>
        </div>
      </div>
    )
  }

  onClickReset = () => {
    this.clearTimerInterval()
    this.setState(initial)
  }

  incrementTimeMin = () => {
    const {timeMin, timeClock} = this.state
    const timerCompleted = timeMin === timeClock * 60

    if (timerCompleted) {
      this.clearTimerInterval()
      this.setState({isTrue: false})
    } else {
      this.setState(prevState => ({timeMin: prevState.timeMin + 1}))
    }
  }

  onStartOrPauseTime = () => {
    const {timeMin, timeClock, isTrue} = this.state
    const timerCompleted = timeMin === timeClock * 60

    if (timerCompleted) {
      this.setState({timeMin: 0})
    }
    if (isTrue) {
      this.clearTimerInterval()
    } else {
      this.timerId = setInterval(this.incrementTimeMin, 1000)
    }
    this.setState(prevState => ({isTrue: !prevState.isTrue}))
  }

  renderTimerControlled = () => {
    const {isTrue} = this.state

    return (
      <div className="button-container">
        <div className="start-container">
          <div className="all-button-container">
            <button
              className="play-paused-button start-paused"
              type="button"
              onClick={this.onStartOrPauseTime}
            >
              <img
                src={
                  isTrue
                    ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                }
                alt={isTrue ? 'pause icon' : 'play icon'}
                className="play-image"
              />
              {isTrue ? 'Pause' : 'Start'}
            </button>
          </div>
        </div>

        <div className="start-container">
          <div>
            <button
              className="play-paused-button"
              type="button"
              onClick={this.onClickReset}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
                className="play-image"
              />
            </button>
          </div>
          <p className="start-paused">Reset</p>
        </div>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeMin, timeClock} = this.state
    const totalReminderTimer = timeClock * 60 - timeMin
    const minutes = Math.floor(totalReminderTimer / 60)
    const second = Math.floor(totalReminderTimer % 60)

    const stringFixingMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringFixingSecond = second > 9 ? second : `0${second}`

    return `${stringFixingMinutes}:${stringFixingSecond}`
  }

  render() {
    const {isTrue} = this.state
    return (
      <div className="app-container">
        <div className="bg-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="container">
            <div className="bg-image-container">
              <div className="timer-container">
                <h1 className="time">{this.getElapsedSecondsInTimeFormat()}</h1>
                <p className="time-condition">
                  {isTrue ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>

            <div className="bottom-container">
              {this.renderTimerControlled()}

              {this.renderTimeLimitControlled()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
