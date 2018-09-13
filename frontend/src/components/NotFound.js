import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import background from '../images/background.jpeg'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  overflow: none;
  padding: 0;
  margin: 0;

  background-image: url('${background}');
  background-size: cover;
`

const Transparency = styled.div`
  display: grid;
  grid-template-rows: 2fr .5fr 1fr;
  grid-template-columns: 1fr;
  /* grid-row-gap: 10px */

  background-color: rgba(0, 0, 0, 0.64);
  color: #fff;

  padding: 25px 100px;
  border-radius: 5px;
`

const TitleText = styled(Typography)`
  grid-row: 1;
  place-self: center;
  && {
    font-weight: 400;
    color: #fff;
  }
`

const IntroText = styled(Typography)`
  grid-row: 2;
  place-self: center;
  && {
    color: #fff;
    font-weight: 300;
    font-size: 16px;
    margin-bottom: 15px;
  }
`

const ButtonContainer = styled.div`
  grid-row: 3;
  place-self: center;
`

const NotFound = ({ history: { goBack } }) => (
  <Container>
    <Transparency>
      <TitleText variant="display4">
        404
      </TitleText>
      <IntroText variant="subheading" component="p">
        Uh oh! We can't find what you're looking for.
      </IntroText>
      <ButtonContainer>
        <Button
          variant="raised"
          color="primary"
          onClick={goBack}
        >
          Whoops! Go Back
        </Button>
      </ButtonContainer>
    </Transparency>
  </Container>
)

NotFound.propTypes = {
  history: PropTypes.object.isRequired,
}

export default NotFound
