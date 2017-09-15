import React from 'react'
import PropTypes from 'prop-types'
import Sound from 'react-native-sound'
import moment from 'moment'
import {K} from '../utils/constants'

class SoundPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // load click sound
    this.tickSound = new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the tick sound', error);
        return;
      }
    });

    this.beepSound = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the beep sound', error);
        return;
      }
    });

    this.silenceSound = new Sound('silence.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the silence sound', error);
        return;
      }
    });

    Sound.setCategory('Playback')
    this.lastSound = moment()
    this.nowSound = moment()
  }

  componentWillUpdate(nextProps) {
    if (this.props.seconds !== nextProps.seconds) {
      this.playSound()
    }
  }

  componentWillUnmount() {
    this.tickSound.release()
    this.beepSound.release()
    this.silenceSound.release()
  }

  playSound = () => {
    const {nextSound} = this.props
    var soundFile
    if (nextSound === K.BEEPS) {
      soundFile = this.beepSound
    } else if (nextSound === K.TICKS) {
      soundFile = this.tickSound
    } else {
      soundFile = this.silenceSound
    }

    if (!soundFile) {return}

    // this.nowSound = moment()
    soundFile.play((success) => {
      if (success) {
        // var diff = this.nowSound.diff(this.lastSound)
        // console.log(nextSound + ' @ ' + this.nowSound.format('mm:ss:SSS') +
        //   ' last is' + this.lastSound.format('mm:ss:SSS') + ' diff is ' + diff);
        // if (diff > 1025 || diff < 975) {
        //   console.log('SKEW TOO GREAT!!! ' + diff)
        // }
        // this.lastSound = this.nowSound

      } else {
        console.log('playback failed due to audio decoding errors for ' + nextSound)
        // try to reload sound
        this.beepSound.release()
        this.beepSound = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the beep sound', error);
            return;
          }
        });
      }
    })
  }

  render() {
    return null
  }
}

SoundPlayer.propTypes = {
  seconds: PropTypes.number.isRequired,
  nextSound: PropTypes.string,
  tock: PropTypes.func.isRequired,
}

export default SoundPlayer
