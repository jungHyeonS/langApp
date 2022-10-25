import React, { useEffect, useRef, useState } from 'react';
import { Easing, Pressable, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Animated } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

// const Box = styled.View`
const Box = styled(Animated.createAnimatedComponent(Pressable))`
background-color: tomato;
width: 200px;
height: 200px;
`
// const AnimatedBox = Animated.createAnimatedComponent(TouchableOpacity);

export default function App() {
  const [up,setUp] = useState(false);
  const POSITION = useRef(new Animated.ValueXY({x:0,y:300})).current
  const toggleUp = () => setUp((prev) => !prev)
  const moveUp = () => {
    Animated.timing(POSITION,{
      toValue : up ? 300 : -300,
      useNativeDriver:false,
    }).start(toggleUp)
  }
  const borderRadius = POSITION.y.interpolate({
    inputRange : [-300,300],
    outputRange : [100,0]
  })
  const rotation = POSITION.y.interpolate({
    inputRange:[-300,300],
    outputRange:["-360deg","360deg"]
  })
  const bgColor = POSITION.y.interpolate({
    inputRange:[-300,300],
    outputRange:["rgb(255,99,71)","rgb(71,166,255)"]
  })
  return (
    <Container>
        <Box style={{
          borderRadius,
          backgroundColor:bgColor,
          transform : [{rotateY:rotation},{translateY:POSITION.y}]
        }} onPress={moveUp}/>
    </Container>
  );
}


