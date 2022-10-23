import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Animated } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`


// const Box = styled(Animated.createAnimatedComponent(TouchableOpacity))`
const Box = styled.View`
background-color: tomato;
width: 200px;
height: 200px;
`
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const Y = new Animated.Value(0)
  const moveUp = () => {
    // Animated.timing(Y,{
    //   toValue :-200,
    //   useNativeDriver:true
    // }).start()

    Animated.spring(Y,{
      toValue :-200,
      bounciness:15,
      useNativeDriver:true
    }).start()
  }
  return (
    <Container>
      <TouchableOpacity onPress={moveUp} >
        <AnimatedBox style={{
          transform : [{translateY:Y}]
        }}/>
      </TouchableOpacity>
      
    </Container>
  );
}


