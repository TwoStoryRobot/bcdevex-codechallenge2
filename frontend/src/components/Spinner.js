import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  display: inline-block;
  animation-name: ${rotate360};

  animation-duration: ${({ duration }) => duration}s;

  ${({ timingFunction }) =>
    timingFunction && `animation-timing-function: ${timingFunction}`};

  ${({ delay }) => delay && `animation-delay: ${delay}s`};

  ${({ iterationCount }) =>
    iterationCount && `animation-iteration-count: ${iterationCount}`};

  ${({ direction }) => direction && `animation-direction: ${direction}`};

  ${({ fillMode }) => fillMode && `animation-timing-function: ${fillMode}`};

  ${({ playState }) => playState && `animation-play-state: ${playState}`};
`

Spinner.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  duration: PropTypes.number,
  timeingFunction: PropTypes.string,
  delay: PropTypes.number,
  iterationCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  direction: PropTypes.string,
  fillMode: PropTypes.string,
  playState: PropTypes.string
}

Spinner.defaultProps = {
  duration: 1,
  iterationCount: 'infinite'
}

export default Spinner
